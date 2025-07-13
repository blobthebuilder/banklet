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
