package plaid

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/blobthebuilder/banklet/internal/models"
	"github.com/plaid/plaid-go/v31/plaid"
)

func GetBalancesHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()

    // Extract the access token (you could also look it up using user_google_id)
    accessToken := r.URL.Query().Get("access_token")
    if accessToken == "" {
        http.Error(w, "missing access_token query param", http.StatusBadRequest)
        return
    }

    balances, err := getAllAccountBalances(ctx, accessToken)
    if err != nil {
        http.Error(w, fmt.Sprintf("failed to fetch balances: %v", err), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(balances)
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

        b := models.AccountBalance{
            AccountID: acct.AccountId,
            Name:      acct.Name,
            Current:   current,
            Available: available,
            Currency:  currency,
        }
        balances = append(balances, b)
    }

    return balances, nil
}