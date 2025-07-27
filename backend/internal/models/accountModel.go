package models

type AccountBalance struct {
	AccountID string  `json:"account_id"`
	Name      string  `json:"name"`
	Current   float64 `json:"current"`
	Available float64 `json:"available"`
	Currency  string  `json:"currency"`
}