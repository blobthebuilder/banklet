package db

import "context"

func Migrate() error {
	query := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		google_id TEXT UNIQUE NOT NULL,
		email TEXT UNIQUE NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS profiles (
		id SERIAL PRIMARY KEY,
		user_google_id INTEGER NOT NULL REFERENCES users(google_id) ON DELETE CASCADE,
		name TEXT,
		avatar_url TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS items (
		id TEXT PRIMARY KEY,
		user_google_id TEXT NOT NULL,
		access_token TEXT NOT NULL,
		bank_name TEXT,
		is_active INTEGER DEFAULT 1,
		FOREIGN KEY (user_google_id) REFERENCES users(google_id) ON DELETE CASCADE
		);
	
	CREATE TABLE IF NOT EXISTS accounts (
		id TEXT PRIMARY KEY,
		item_id TEXT NOT NULL,
		name TEXT,
		FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
		);

	CREATE TABLE IF NOT EXISTS transactions (
		id TEXT PRIMARY KEY, 
		user_google_id TEXT NOT NULL,
		account_id TEXT NOT NULL, category TEXT, date TEXT,
		authorized_date TEXT, name TEXT, amount REAL, currency_code TEXT,
		is_removed INTEGER NOT NULL DEFAULT 0,
		FOREIGN KEY(user_google_id) REFERENCES users(google_id) ON DELETE CASCADE,
		FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE
		);
	`

	_, err := DB.Exec(context.Background(), query)
	return err
}
