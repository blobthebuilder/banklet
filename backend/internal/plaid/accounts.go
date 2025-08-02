package plaid

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/blobthebuilder/banklet/internal/auth"
	"github.com/blobthebuilder/banklet/internal/db"
	"github.com/blobthebuilder/banklet/internal/models"
	"github.com/plaid/plaid-go/v31/plaid"
)

func GetBalancesHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    googleID, ok := ctx.Value(auth.GoogleIDKey).(string)
    if !ok || googleID == "" {
        http.Error(w, "missing user ID in context", http.StatusUnauthorized)
        return
    }
    // Extract the access token (you could also look it up using user_google_id)
    accessTokens, err := db.GetAccessTokensByGoogleID(ctx, googleID)
    if err != nil{
        fmt.Println("error getting access tokens", err )
    }

    if len(accessTokens) == 0 {
        http.Error(w, "no access tokens found for user", http.StatusBadRequest)
        return
    }

    var allBalances []models.AccountBalance 
    for _, token := range accessTokens {
        balances, err := getAllAccountBalances(ctx, token)
        if err != nil {
            // Log error and skip this token
            fmt.Printf("error fetching balances for token %s: %v\n", token, err)
            continue
        }
        allBalances = append(allBalances, balances...)
    }

    // If no balances were fetched, return an error
    if len(allBalances) == 0 {
        http.Error(w, "failed to fetch balances for all accounts", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(allBalances)
}

// GetAllAccountBalances fetches balances for all accounts for a given access token
func getAllAccountBalances(ctx context.Context, accessToken string) ([]models.AccountBalance, error) {
    // Create the request object
    req := plaid.NewAccountsGetRequest(accessToken)

    // Call the API (client.PlaidApi must be your initialized plaid.APIClient)
    resp, _, err := client.PlaidApi.AccountsGet(ctx).AccountsGetRequest(*req).Execute()
    if err != nil {
        return nil, fmt.Errorf("failed to fetch accounts: %w", err)
    }

   var balances []models.AccountBalance
    for _, acct := range resp.Accounts {
        var current, available float64
        if acct.Balances.Current.IsSet() && acct.Balances.Current.Get() != nil {
            current = *acct.Balances.Current.Get()
        }
        if acct.Balances.Available.IsSet() && acct.Balances.Available.Get() != nil {
            available = *acct.Balances.Available.Get()
        }

        var currency string
        if acct.Balances.IsoCurrencyCode.IsSet() && acct.Balances.IsoCurrencyCode.Get() != nil {
            currency = *acct.Balances.IsoCurrencyCode.Get()
        }

        var subtype string
        if acct.Subtype.IsSet() && acct.Subtype.Get() != nil {
            subtype = string(*acct.Subtype.Get())
        }

        b := models.AccountBalance{
            AccountID: acct.AccountId,
            Name:      acct.Name,
            Current:   current,
            Available: available,
            Currency:  currency,
            Type:   string(acct.Type),
            Subtype: subtype,
        }
        balances = append(balances, b)
    }

    return balances, nil
}

func GetAccountsHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()

    // Extract userGoogleID from context (set by auth middleware)
    userGoogleID, ok := ctx.Value(auth.GoogleIDKey).(string)
    if !ok || userGoogleID == "" {
        http.Error(w, "unauthorized: missing user ID", http.StatusUnauthorized)
        return
    }

    // Get all access tokens for the user from DB
    accessTokens, err := db.GetAccessTokensByGoogleID(ctx, userGoogleID)
    if err != nil {
        http.Error(w, fmt.Sprintf("failed to get access tokens: %v", err), http.StatusInternalServerError)
        return
    }
    if len(accessTokens) == 0 {
        http.Error(w, "no access tokens found for user", http.StatusNotFound)
        return
    }

    // Get all bank names (items) for user
    bankItems, err := db.GetBankNamesForUser(ctx, userGoogleID)
    if err != nil {
        http.Error(w, fmt.Sprintf("failed to get bank names: %v", err), http.StatusInternalServerError)
        return
    }

    // Create a map for quick lookup: itemID -> bankName
    bankNameMap := make(map[string]string)
    for _, item := range bankItems {
        bankNameMap[item.ID] = item.BankName
    }

    var allAccounts []models.Account 

    for _, token := range accessTokens {
        balances, err := getAllAccountBalances(ctx, token)
        if err != nil {
            http.Error(w, fmt.Sprintf("failed to fetch account balances: %v", err), http.StatusInternalServerError)
            return
        }

        itemID, err := db.GetItemIDForAccessToken(ctx, token)
        if err != nil{
            http.Error(w, fmt.Sprintf("failed to fetch itemIds: %v", err), http.StatusInternalServerError)
        }

        for _, bal := range balances {
            bankName := bankNameMap[itemID] // lookup bank name by AccountID
            if bankName == "" {
                bankName = "Unknown Bank"
            }

            if (bal.Type != "credit"){
                if (bal.Type == "loan"){
                    bal.Available = -bal.Available
                }
                acc := models.Account{
                    ID:         bal.AccountID,
                    Name:       bal.Name,
                    Bank:       bankName,
                    Type:       bal.Subtype,
                    Balance:    bal.Available,
                    LastUpdate: "1 day ago",
                    Status:     "syncing",
                    Gradient:   "from-orange-500 to-red-600",
                }

                allAccounts = append(allAccounts, acc)
                
            }
            
        }
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(allAccounts)
}
