package plaid

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/blobthebuilder/banklet/internal/auth"
	"github.com/blobthebuilder/banklet/internal/db"
	"github.com/go-chi/chi/v5"
	"github.com/plaid/plaid-go/v31/plaid"
)

func ListBanks(w http.ResponseWriter, r *http.Request) {
	googleID, ok := r.Context().Value(auth.GoogleIDKey).(string)
	if !ok || googleID == "" {
		http.Error(w, "Unauthorized - Google ID missing", http.StatusUnauthorized)
		return
	}

	items, err := db.GetBankNamesForUser(r.Context(), db.DB, googleID)
	if err != nil {
		http.Error(w, "Failed to fetch bank names: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func DeleteBank(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	googleID, ok := ctx.Value(auth.GoogleIDKey).(string)
	if !ok || googleID == "" {
		fmt.Println("Google ID not found in context")
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	bankID := chi.URLParam(r, "bank_id")
	if bankID == "" {
		fmt.Println("Bank ID not provided")
		http.Error(w, "Missing bank ID", http.StatusBadRequest)
		return
	}
	fmt.Println("Deleting bank with ID:", bankID, "for user:", googleID)
	// get access id by itemId and user Id, then plaid client remove by access token
	accessToken, err := db.GetAccessTokenForUserAndItem(ctx, bankID, googleID)
	if err != nil {
		fmt.Printf("Error getting item: %v", err)
		return
	}

	fmt.Println("Access token:", accessToken)
	
	err = db.RemoveItem(ctx, bankID, googleID)
	if err != nil {
		fmt.Printf("Error removing item from database: %v", err)
		http.Error(w, "Failed to remove bank", http.StatusInternalServerError)
		return
	}

	req := *plaid.NewItemRemoveRequest(accessToken)
	_, _, err = client.PlaidApi.ItemRemove(ctx).ItemRemoveRequest(req).Execute()
	if err != nil {
		fmt.Print("Error removing item from Plaid:", err)
		return 
	}
	

	
	
	w.WriteHeader(http.StatusOK)
}