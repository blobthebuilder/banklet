package plaid

import (
	"encoding/json"
	"net/http"

	"github.com/blobthebuilder/banklet/internal/auth"
	"github.com/blobthebuilder/banklet/internal/db"
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