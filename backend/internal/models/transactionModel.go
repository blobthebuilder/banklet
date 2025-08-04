package models

import "github.com/plaid/plaid-go/v31/plaid"

type SyncSummary struct {
	Added    int64
	Removed  int64
	Modified int64
}

type SyncData struct {
	Added      []plaid.Transaction
	Removed    []plaid.RemovedTransaction
	Modified   []plaid.Transaction
	NextCursor string
}

type SimpleTransaction struct {
	ID                   string
	UserGoogleID         string
	AccountID            string
	Category             string
	Date                 string
	AuthorizedDate       string
	Name                 string
	Amount               float64
	CurrencyCode         string
	PendingTransactionID *string
}

type CategorySpending struct {
	Category   string
	TotalSpent float64
}