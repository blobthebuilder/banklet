package db

import (
	"context"
	"fmt"
	"os"
	"time"

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

func AddAccount(ctx context.Context, accountID, itemID, name string) error {
	_, err := DB.Exec(ctx,
		`INSERT INTO accounts (id, item_id, name)
		 VALUES ($1, $2, $3)`,
		accountID, itemID, name)
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