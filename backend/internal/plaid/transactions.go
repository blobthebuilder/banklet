package plaid

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/blobthebuilder/banklet/internal/auth"
	"github.com/blobthebuilder/banklet/internal/db"
	"github.com/blobthebuilder/banklet/internal/models"
	"github.com/plaid/plaid-go/v31/plaid"
)

func SyncTransactions(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	googleID, ok := r.Context().Value(auth.GoogleIDKey).(string)
	if !ok || googleID == "" {
		http.Error(w, "Unauthorized - Google ID missing", http.StatusUnauthorized)
		return
	}

	// 2. Get all items for that user
	items, err := db.GetItemIDsForUser(ctx, googleID)
	if err != nil {
		log.Printf("Failed to get item IDs for user %s: %v", googleID, err)
		http.Error(w, "Failed to get item IDs", http.StatusInternalServerError)
		return
	}

	log.Printf("Items for user %s: %+v", googleID, items)

	// 3. For each item, call syncTransactionsForItem
	var completeResults []interface{} // adjust to your result struct
	for _, item := range items {
		result, err := syncTransactionsForItem(ctx, item.ItemID)
		if err != nil {
			log.Printf("Error syncing transactions for item %s: %v", item.ItemID, err)
			// You can choose to continue on error or return here
			http.Error(w, "Failed to sync transactions", http.StatusInternalServerError)
			return
		}
		completeResults = append(completeResults, result)
	}

	// 4. Respond with JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"completeResults": completeResults,
	})
}

func syncTransactionsForItem(ctx context.Context, itemID string) (models.SyncSummary, error) {
	var summary models.SyncSummary

	// Step 1: Retrieve access token and cursor from DB
	itemInfo, err := db.GetItemInfo(ctx, itemID)
	if err != nil {
		return summary, fmt.Errorf("failed to get item info: %w", err)
	}

	// Step 2: Fetch new sync data from Plaid
	cursor := ""
	if itemInfo.TransactionCursor.Valid {
		cursor = itemInfo.TransactionCursor.String
	}
	allData, err := fetchNewSyncData(ctx, itemInfo.AccessToken, cursor, 3)
	if err != nil {
		return summary, fmt.Errorf("failed to fetch sync data: %w", err)
	}

	// Step 3: Add new transactions
	for _, txn := range allData.Added {
		stx := SimplifyTransactionFromPlaid(txn, itemInfo.UserGoogleID)
		result, err := db.AddNewTransaction(ctx, stx)
		if err == nil {
			summary.Added += result.Changes
		} else {
			fmt.Printf("failed to add transaction %s: %v\n", txn.TransactionId, err)
		}
	}
	
	// Step 4: Modify existing transactions
	for _, txn := range allData.Modified {
		stx := SimplifyTransactionFromPlaid(txn, itemInfo.UserGoogleID)
		result, err := db.ModifyExistingTransaction(ctx, stx)
		if err == nil {
			summary.Modified += result.Changes
		} else {
			fmt.Printf("failed to modify transaction %s: %v\n", txn.TransactionId, err)
		}
	}

	
	// Step 5: Mark removed transactions
	for _, txn := range allData.Removed {
		result, err := db.MarkTransactionAsRemoved(ctx, txn.TransactionId)
		if err == nil {
			summary.Removed += result.Changes
		} else {
			fmt.Printf("failed to mark transaction %s as removed: %v\n", txn.TransactionId, err)
		}
	}

	// Step 6: Save the updated cursor to the DB
	err = db.SaveCursorForItem(ctx, allData.NextCursor, itemID)
	if err != nil {
		return summary, fmt.Errorf("failed to save cursor: %w", err)
	}
	
	fmt.Printf("Sync summary for item %s: %+v\n", itemID, summary)
	return summary, nil
}

func fetchNewSyncData(
	ctx context.Context,
	accessToken string,
	initialCursor string,
	retriesLeft int,
) (*models.SyncData, error) {
	if retriesLeft <= 0 {
		fmt.Println("Too many retries! Returning empty data.")
		return &models.SyncData{
			Added:      []plaid.Transaction{},
			Removed:    []plaid.RemovedTransaction{},
			Modified:   []plaid.Transaction{},
			NextCursor: initialCursor,
		}, nil
	}

	allData := &models.SyncData{
		Added:      []plaid.Transaction{},
		Removed:    []plaid.RemovedTransaction{},
		Modified:   []plaid.Transaction{},
		NextCursor: initialCursor,
	}

	keepGoing := true
	
	for keepGoing {
		req:= plaid.NewTransactionsSyncRequest(accessToken)

		req.SetCursor(allData.NextCursor)
		req.SetOptions(plaid.TransactionsSyncRequestOptions{
			IncludePersonalFinanceCategory: plaid.PtrBool(true),
		})

		resp, httpResp, err := client.PlaidApi.TransactionsSync(ctx).TransactionsSyncRequest(*req).Execute()
		if err != nil {
			// Retry after a delay
			fmt.Printf("Plaid API error: %v\n", err)

			// If it's a Plaid API error, we can extract details
			if apiErr, ok := err.(plaid.GenericOpenAPIError); ok {
				fmt.Printf("Plaid error body: %s\n", string(apiErr.Body()))
			}

			if httpResp != nil {
				fmt.Printf("Status Code: %d\n", httpResp.StatusCode)
			}

			fmt.Printf("Error during sync: %v. Retrying...\n", err)
			time.Sleep(1 * time.Second)
			return fetchNewSyncData(ctx, accessToken, initialCursor, retriesLeft-1)
		}

		allData.Added = append(allData.Added, resp.GetAdded()...)
		allData.Modified = append(allData.Modified, resp.GetModified()...)
		allData.Removed = append(allData.Removed, resp.GetRemoved()...)
		allData.NextCursor = resp.GetNextCursor()

		fmt.Printf(
			"Added: %d Modified: %d Removed: %d\n",
			len(resp.GetAdded()), len(resp.GetModified()), len(resp.GetRemoved()),
		)

		keepGoing = resp.GetHasMore()
	}

	return allData, nil
}

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	googleID, ok := r.Context().Value(auth.GoogleIDKey).(string)
	if !ok || googleID == "" {
		http.Error(w, "Unauthorized - Google ID missing", http.StatusUnauthorized)
		return
	}

	limitStr := r.URL.Query().Get("limit")
    if limitStr == "" {
        limitStr = "10" // Default to 10 if not provided
    }

	limit, err := strconv.Atoi(limitStr)
    if err != nil || limit <= 0 {
        http.Error(w, "Invalid limit parameter", http.StatusBadRequest)
        return
    }

	txns, err := db.GetTransactionsByUserGoogleID(ctx, googleID, limit)
	if err != nil{
		fmt.Printf("error getting transactions by google id %s ", googleID)
	}

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "transactions": txns,
    })
}

func getStartAndEndOfMonth(t time.Time) (time.Time, time.Time) {
	// Start of the month is the first day at midnight
	startOfMonth := time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, t.Location())
	// End of the month is the last day at one second before midnight
	endOfMonth := startOfMonth.AddDate(0, 1, 0).Add(-time.Second)
	return startOfMonth, endOfMonth
}


func GetCategorySpending(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	googleID, ok := r.Context().Value(auth.GoogleIDKey).(string)
	if !ok || googleID == "" {
		http.Error(w, "Unauthorized - Google ID missing", http.StatusUnauthorized)
		return
	}

	queryParams := r.URL.Query()
	startDateStr := queryParams.Get("startDate")
	endDateStr := queryParams.Get("endDate")

	var startDate, endDate time.Time
	var err error

	if startDateStr != "" && endDateStr != "" {
		startDate, err = time.Parse("2006-01-02", startDateStr)
		if err != nil {
			http.Error(w, "Invalid startDate format. Use YYYY-MM-DD.", http.StatusBadRequest)
			return
		}
		endDate, err = time.Parse("2006-01-02", endDateStr)
		if err != nil {
			http.Error(w, "Invalid endDate format. Use YYYY-MM-DD.", http.StatusBadRequest)
			return
		}
	} else {
		// Default to the current calendar month
		startDate, endDate = getStartAndEndOfMonth(time.Now())
	}

	txns, err := db.GetCategorySpendingByUserGoogleID(ctx, googleID, startDate, endDate)
	if err != nil{
		log.Printf("error getting category spending for google id %s: %v", googleID, err)
		http.Error(w, "Failed to retrieve spending data", http.StatusInternalServerError)
		return
	}

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "transactions": txns,
    })
}