package plaid

import (
	"github.com/blobthebuilder/banklet/internal/models"
	"github.com/plaid/plaid-go/v31/plaid"
)

// SimpleTransaction represents the fields we care about from Plaid

// FromPlaidTransaction converts a Plaid transaction into a SimpleTransaction
func SimplifyTransactionFromPlaid(txn plaid.Transaction, userGoogleID string) models.SimpleTransaction {
	// Get category
	category := ""
	if txn.PersonalFinanceCategory.IsSet() && txn.PersonalFinanceCategory.Get().Primary != "" {
		category = txn.PersonalFinanceCategory.Get().Primary
	}

	// Prefer merchant name if set, otherwise fallback to name
	name := txn.GetName()
	if txn.MerchantName.IsSet() && *txn.MerchantName.Get() != "" {
		name = *txn.MerchantName.Get()
	}

	// Authorized date
	authorizedDate := ""
	if txn.AuthorizedDate.IsSet() && *txn.AuthorizedDate.Get() != "" {
		authorizedDate = *txn.AuthorizedDate.Get()
	}

	// Pending transaction ID
	var pendingID *string
	if txn.PendingTransactionId.IsSet() && *txn.PendingTransactionId.Get() != ""{
		val := txn.PendingTransactionId.Get()
		pendingID = val
	}

	return models.SimpleTransaction{
		ID:                   txn.TransactionId,
		UserGoogleID:         userGoogleID,
		AccountID:            txn.AccountId,
		Category:             category,
		Date:                 txn.Date,
		AuthorizedDate:       authorizedDate,
		Name:                 name,
		Amount:               txn.Amount,
		CurrencyCode:         txn.GetIsoCurrencyCode(),
		PendingTransactionID: pendingID,
	}
}
