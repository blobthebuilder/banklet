package db

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/blobthebuilder/banklet/internal/models"
	"github.com/jackc/pgx"
	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDatabase() error {
    dbURL := os.Getenv("DATABASE_URL")
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    var err error
    DB, err = pgxpool.New(ctx, dbURL)
    if err != nil {
        return fmt.Errorf("unable to connect to database: %w", err)
    }

    err = DB.Ping(ctx)
    if err != nil {
        return fmt.Errorf("unable to ping database: %w", err)
    }

    fmt.Println("Connected to Postgres!")

    err = Migrate()
    if err != nil{
        return fmt.Errorf("schema migration failed: %w", err)
    }
    fmt.Println("schema migration successful")

    return nil
}

func AddItem(ctx context.Context, itemID, userGoogleID, accessToken string) error {
	_, err := DB.Exec(ctx,
		`INSERT INTO items (id, user_google_id, access_token)
		 VALUES ($1, $2, $3)`,
		itemID, userGoogleID, accessToken)
	return err
}

func AddBankNameForItem(ctx context.Context, itemID, bankName string) error {
	_, err := DB.Exec(ctx,
		`UPDATE items SET bank_name = $1 WHERE id = $2`,
		bankName, itemID)
	return err
}

func AddAccount(ctx context.Context, accountID, user_google_id, itemID, name string) error {
	_, err := DB.Exec(ctx,
		`INSERT INTO accounts (id, user_google_id, item_id, name)
		 VALUES ($1, $2, $3, $4)`,
		accountID, user_google_id, itemID, name)
	return err
}

type BankItem struct {
	ID       string `json:"id"`
	BankName string `json:"bank_name"`
}

func GetBankNamesForUser(ctx context.Context, db *pgxpool.Pool, userID string) ([]BankItem, error) {
	query := `SELECT id, bank_name FROM items WHERE user_google_id = $1`

	rows, err := db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []BankItem
	for rows.Next() {
		var item BankItem
		if err := rows.Scan(&item.ID, &item.BankName); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, nil
}

type Item struct {
	UserGoogleID      string
	ItemID			  string
	AccessToken       string
	TransactionCursor sql.NullString
}

func GetAccessTokenForUserAndItem(ctx context.Context, itemID string, googleID string) (string, error) {
	query := `SELECT access_token FROM items 
              WHERE id = $1 AND user_google_id = $2`

	row := DB.QueryRow(ctx, query, itemID, googleID)
	fmt.Println("Querying access token for item:", itemID, "and user:", googleID)

	var accessToken string
	if err := row.Scan(&accessToken); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return "", fmt.Errorf("no item found for user")
		}
		return "", fmt.Errorf("failed to get access token: %w", err)
	}

	return accessToken, nil
}


func RemoveItem(ctx context.Context, itemID string, googleID string) error {
	query := `
		DELETE FROM items
		WHERE id = $1 AND user_google_id = $2
	`
	fmt.Println("Removing item with ID:", itemID, "for user:", googleID)
	res, err := DB.Exec(ctx, query, itemID, googleID)
	if err != nil {
		fmt.Println("Error deleting bank item:", err)
		return fmt.Errorf("failed to delete bank item: %w", err)
	}

	rowsAffected := res.RowsAffected()
	if rowsAffected == 0 {
		fmt.Println("No item was deleted — check if the itemID and googleID are correct")
		return fmt.Errorf("no item deleted: check itemID or user mismatch")
	}

	fmt.Println("Item removed successfully")
	return nil
}

func GetItemIDsForUser(ctx context.Context, googleID string) ([]Item, error){
	query := `
		SELECT id, user_google_id
		FROM items
		WHERE user_google_id = $1
	`

	rows, err := DB.Query(ctx, query, googleID)
	if err != nil {
		fmt.Println("Error querying items:", err)
		return nil, fmt.Errorf("failed to query items: %w", err)
	}
	defer rows.Close()

	var items []Item
	for rows.Next() {
		var item Item
		if err := rows.Scan(&item.ItemID, &item.UserGoogleID); err != nil {
			fmt.Println("Error scanning item row:", err)
			return nil, fmt.Errorf("failed to scan item row: %w", err)
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Row iteration error:", err)
		return nil, fmt.Errorf("row iteration error: %w", err)
	}

	return items, nil
}

func GetItemInfo(ctx context.Context, itemID string) (*Item, error) {
	query := `
		SELECT id, user_google_id, access_token, transaction_cursor
		FROM items
		WHERE id = $1
	`

	var info Item
	err := DB.QueryRow(ctx, query, itemID).Scan(
		&info.ItemID,
		&info.UserGoogleID,
		&info.AccessToken,
		&info.TransactionCursor,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to get item info: %w", err)
	}

	return &info, nil
}

type ExecResult struct {
	Changes int64
}

func AddNewTransaction(ctx context.Context, stxObj models.SimpleTransaction) (*ExecResult, error) {
	query := `
		INSERT INTO transactions
		(id, user_google_id, account_id, category, date, authorized_date, name, amount, currency_code)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`

	res, err := DB.Exec(ctx, query,
		stxObj.ID,
		stxObj.UserGoogleID,
		stxObj.AccountID,
		stxObj.Category,
		stxObj.Date,
		stxObj.AuthorizedDate,
		stxObj.Name,
		stxObj.Amount,
		stxObj.CurrencyCode,
	)
	if err != nil {
		return nil, fmt.Errorf("AddNewTransaction failed: %w", err)
	}

	return &ExecResult{Changes: res.RowsAffected()}, nil
}

func ModifyExistingTransaction(ctx context.Context, stx models.SimpleTransaction) (*ExecResult, error) {
	query := `
		UPDATE transactions
		SET account_id = $1,
		    category = $2,
		    date = $3,
		    authorized_date = $4,
		    name = $5,
		    amount = $6,
		    currency_code = $7
		WHERE id = $8
	`

	res, err := DB.Exec(ctx, query,
		stx.AccountID,
		stx.Category,
		stx.Date,
		stx.AuthorizedDate,
		stx.Name,
		stx.Amount,
		stx.CurrencyCode,
		stx.ID,
	)
	if err != nil {
		return nil, fmt.Errorf("ModifyExistingTransaction failed: %w", err)
	}

	return &ExecResult{Changes: res.RowsAffected()}, nil
}

func generateRandomUUID() (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func MarkTransactionAsRemoved(ctx context.Context, transactionID string) (*ExecResult, error) {
	// Create a new unique ID by appending a "-REMOVED-" suffix plus a random string
	randomUUID, err := generateRandomUUID()
	if err != nil {
		return nil, fmt.Errorf("failed to generate UUID: %w", err)
	}
	updatedID := transactionID + "-REMOVED-" + randomUUID

	query := `
		UPDATE transactions 
		SET id = $1, is_removed = 1 
		WHERE id = $2
	`

	res, err := DB.Exec(ctx, query, updatedID, transactionID)
	if err != nil {
		return nil, fmt.Errorf("MarkTransactionAsRemoved failed: %w", err)
	}

	return &ExecResult{Changes: res.RowsAffected()}, nil
}

func SaveCursorForItem(ctx context.Context, transactionCursor string, itemID string) error {
	query := `
		UPDATE items 
		SET transaction_cursor = $1 
		WHERE id = $2
	`

	_, err := DB.Exec(ctx, query, transactionCursor, itemID)
	if err != nil {
		return fmt.Errorf("SaveCursorForItem failed: %w", err)
	}

	return nil
}

func GetTransactionsByUserGoogleID(ctx context.Context, userGoogleID string) ([]models.SimpleTransaction, error) {
    query := `
        SELECT id, user_google_id, account_id, category, date, authorized_date, name, amount, currency_code
        FROM transactions
        WHERE user_google_id = $1
        ORDER BY date DESC
    `

    rows, err := DB.Query(ctx, query, userGoogleID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var txns []models.SimpleTransaction
    for rows.Next() {
        var t models.SimpleTransaction
        err := rows.Scan(
            &t.ID,
            &t.UserGoogleID,
            &t.AccountID,
            &t.Category,
            &t.Date,
            &t.AuthorizedDate,
            &t.Name,
            &t.Amount,
            &t.CurrencyCode,
        )
        if err != nil {
            return nil, err
        }
        txns = append(txns, t)
    }
    return txns, nil
}