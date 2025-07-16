package plaid

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strings"
	"time"

	"github.com/plaid/plaid-go/v31/plaid"

	"github.com/blobthebuilder/banklet/internal/auth"
	"github.com/blobthebuilder/banklet/internal/db"
)



func renderError(w http.ResponseWriter, originalErr error) {
	log.Println("Error:", originalErr)  // Log the error to console
	if plaidError, err := plaid.ToPlaidError(originalErr); err == nil {
		// Return 200 and allow frontend to render the error.
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"error": plaidError})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(map[string]string{"error": originalErr.Error()})
}

func CreateLinkToken(w http.ResponseWriter, r *http.Request) {
	linkToken, err := linkTokenCreate(nil)
	if err != nil {
		fmt.Println("Error creating link token:", err)
		renderError(w, err)
		return
	}
	fmt.Println("Link token created successfully:", linkToken)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"link_token": linkToken})
}

func linkTokenCreate(
	paymentInitiation *plaid.LinkTokenCreateRequestPaymentInitiation,
) (string, error) {
	ctx := context.Background()

	countryCodes := convertCountryCodes(strings.Split(PLAID_COUNTRY_CODES, ","))
	redirectURI := PLAID_REDIRECT_URI

	user := plaid.LinkTokenCreateRequestUser{
		ClientUserId: time.Now().String(),
	}

	request := plaid.NewLinkTokenCreateRequest(
		"Banklet",
		"en",
		countryCodes,
		user,
	)

	products := convertProducts(strings.Split(PLAID_PRODUCTS, ","))
	if paymentInitiation != nil {
		request.SetPaymentInitiation(*paymentInitiation)
		request.SetProducts([]plaid.Products{plaid.PRODUCTS_PAYMENT_INITIATION})
	} else {
		request.SetProducts(products)
	}

	if containsProduct(products, plaid.PRODUCTS_STATEMENTS) {
		statementConfig := plaid.NewLinkTokenCreateRequestStatements(
			time.Now().Local().Add(-30*24*time.Hour).Format("2006-01-02"),
			time.Now().Local().Format("2006-01-02"),
		)
		request.SetStatements(*statementConfig)
	}

	if containsProduct(products, plaid.PRODUCTS_CRA_BASE_REPORT) ||
		containsProduct(products, plaid.PRODUCTS_CRA_INCOME_INSIGHTS) ||
		containsProduct(products, plaid.PRODUCTS_CRA_PARTNER_INSIGHTS) {
		request.SetUserToken(userToken)
		request.SetConsumerReportPermissiblePurpose(plaid.CONSUMERREPORTPERMISSIBLEPURPOSE_ACCOUNT_REVIEW_CREDIT)
		request.SetCraOptions(*plaid.NewLinkTokenCreateRequestCraOptions(60))
	}

	if redirectURI != "" {
		request.SetRedirectUri(redirectURI)
	}

	linkTokenCreateResp, _, err := client.PlaidApi.LinkTokenCreate(ctx).LinkTokenCreateRequest(*request).Execute()

	if err != nil {
		// Log HTTP status code and body for more insight
		return "", err
	}

	return linkTokenCreateResp.GetLinkToken(), nil
}

func GetAccessToken(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetAccessToken called")
	
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}
	publicToken := r.FormValue("public_token")
	fmt.Println("public token:", publicToken)
	ctx := context.Background()

	exchangePublicTokenResp, _, err := client.PlaidApi.ItemPublicTokenExchange(ctx).ItemPublicTokenExchangeRequest(
		*plaid.NewItemPublicTokenExchangeRequest(publicToken),
	).Execute()
	if err != nil {
		fmt.Println("Error exchanging public token:", err)
		renderError(w, err)
		return
	}
	fmt.Print("Exchange Public Token Response: ", exchangePublicTokenResp)

	accessToken = exchangePublicTokenResp.GetAccessToken()
	fmt.Println("access token: " + publicToken)

	itemID = exchangePublicTokenResp.GetItemId()

	googleID, ok := r.Context().Value(auth.GoogleIDKey).(string)
	if !ok || googleID == "" {
		fmt.Println("Google ID not found in context")
		http.Error(w, "Google ID not found in context", http.StatusUnauthorized)
		return
	}

	if err := db.AddItem(ctx, itemID, googleID, accessToken); err != nil {
		fmt.Println("add item failed", err)
		http.Error(w, "Failed to add item: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// 2. Populate bank name
	if err := populateBankName(ctx, accessToken, itemID); err != nil {
		fmt.Println("populate bank name failed", err)
		http.Error(w, "Failed to get bank name: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// 3. Populate account names
	if err := populateAccountNames(ctx, accessToken); err != nil {
		fmt.Println("populate account name failed", err)
		http.Error(w, "Failed to get account names: "+err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("access token: " + accessToken)
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"access_token": accessToken,
		"item_id":      itemID,
	})
}

func convertCountryCodes(countryCodeStrs []string) []plaid.CountryCode {
	countryCodes := []plaid.CountryCode{}

	for _, countryCodeStr := range countryCodeStrs {
		countryCodes = append(countryCodes, plaid.CountryCode(countryCodeStr))
	}

	return countryCodes
}

func convertProducts(productStrs []string) []plaid.Products {
	products := []plaid.Products{}

	for _, productStr := range productStrs {
		products = append(products, plaid.Products(productStr))
	}

	return products
}

func containsProduct(products []plaid.Products, product plaid.Products) bool {
	for _, p := range products {
		if p == product {
			return true
		}
	}
	return false
}

func Transactions(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	var cursor *string

	var added []plaid.Transaction
	var modified []plaid.Transaction
	var removed []plaid.RemovedTransaction
	hasMore := true

	for hasMore {
		request := plaid.NewTransactionsSyncRequest(accessToken)
		if cursor != nil {
			request.SetCursor(*cursor)
		}
		resp, _, err := client.PlaidApi.TransactionsSync(ctx).TransactionsSyncRequest(*request).Execute()
		if err != nil {
			renderError(w, err)
			return
		}

		nextCursor := resp.GetNextCursor()
		cursor = &nextCursor

		if *cursor == "" {
			time.Sleep(2 * time.Second)
			continue
		}

		added = append(added, resp.GetAdded()...)
		modified = append(modified, resp.GetModified()...)
		removed = append(removed, resp.GetRemoved()...)
		hasMore = resp.GetHasMore()
	}

	sort.Slice(added, func(i, j int) bool {
		return added[i].GetDate() < added[j].GetDate()
	})

	latestTransactions := added
	if len(added) > 9 {
		latestTransactions = added[len(added)-9:]
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"latest_transactions": latestTransactions,
	})
}

func populateBankName(ctx context.Context, accessToken, itemID string) error {
	fmt.Println("populateBankName called with accessToken:", accessToken, " and itemID:", itemID)
	itemResp, _, err := client.PlaidApi.ItemGet(ctx).ItemGetRequest(
		*plaid.NewItemGetRequest(accessToken),
	).Execute()

	if err != nil {
		return fmt.Errorf("failed to get item: %w", err)
	}

	institutionID := itemResp.GetItem().InstitutionId
	if !institutionID.IsSet() {
		return nil // No institution ID to fetch
	}

	instResp, _, err := client.PlaidApi.InstitutionsGetById(ctx).InstitutionsGetByIdRequest(
		*plaid.NewInstitutionsGetByIdRequest(
			*itemResp.GetItem().InstitutionId.Get(),
			convertCountryCodes(strings.Split(PLAID_COUNTRY_CODES, ",")),
		),
	).Execute()
	if err != nil {
		return fmt.Errorf("failed to get institution: %w", err)
	}

	bankName := instResp.GetInstitution().Name

	// Now save bankName in your DB
	if err := db.AddBankNameForItem(ctx, itemID, bankName); err != nil {
		fmt.Print("Failed to save bank name:", err)
		return fmt.Errorf("failed to save bank name: %w", err)
	}

	return nil
}


func populateAccountNames(ctx context.Context, accessToken string) error {
	accountsResp, _, err := client.PlaidApi.AccountsGet(ctx).AccountsGetRequest(
		*plaid.NewAccountsGetRequest(accessToken),
	).Execute()
	if err != nil {
		return fmt.Errorf("failed to get accounts: %w", err)
	}

	itemID := accountsResp.GetItem().ItemId

	for _, acct := range accountsResp.GetAccounts() {
		err := db.AddAccount(ctx, acct.GetAccountId(), itemID, acct.GetName())
		if err != nil {
			log.Printf("failed to save account %s: %v", acct.GetAccountId(), err)
		}
	}

	return nil
}