package models

import "time"

type User struct {
    ID        int       `json:"id"`
    GoogleID  string    `json:"google_id"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}