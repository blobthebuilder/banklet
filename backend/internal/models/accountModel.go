package models

type AccountBalance struct {
	AccountID string  `json:"AccountID"`
	ItemID    string  `json:"ItemID"`
	Name      string  `json:"Name"`
	Current   float64 `json:"Current"`
	Available float64 `json:"Available"`
	Currency  string  `json:"Currency"`
	Type      string
	Subtype   string
}

type Account struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	Bank       string  `json:"bank"`
	Type       string  `json:"type"`
	Balance    float64 `json:"balance"`
	LastUpdate string  `json:"lastUpdate"`
	Status     string  `json:"status"`
	Gradient   string  `json:"gradient"`
}