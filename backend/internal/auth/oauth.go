package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"github.com/blobthebuilder/banklet/internal/db"
	"github.com/blobthebuilder/banklet/internal/models"
)

type AuthResponse struct {
	Email string `json:"email"`
	Token string `json:"token"`
}

var googleOauthConfig *oauth2.Config

func InitGoogleOAuth() {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	if clientID == "" || clientSecret == "" {
		log.Fatal("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment")
	}

	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/auth/google/callback",
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}


func LoginHandler(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL("random-state-string", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	state := r.FormValue("state")
	if state != "random-state-string" {
		http.Error(w, "Invalid OAuth state", http.StatusBadRequest)
		return
	}

	code := r.FormValue("code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Code exchange failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	client := googleOauthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		http.Error(w, "Failed getting user info: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	userInfo := struct {
		Email string `json:"email"`
		GoogleID string `json:"id"`
	}{}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		http.Error(w, "Failed to decode user info: "+err.Error(), http.StatusInternalServerError)
		return
	}

	ctx := context.Background()

	user, err := getUserByGoogleID(ctx, db.DB, userInfo.GoogleID)
	if err != nil {
		http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	
	if user == nil {
		fmt.Println("creating user")
		newUser, err := createUser(ctx, db.DB, userInfo.GoogleID, userInfo.Email)
		if err != nil {
			http.Error(w, "Failed to create user: "+err.Error(), http.StatusInternalServerError)
			return
		}
		user = newUser
	}

	jwtToken, err := CreateJWT(userInfo.Email, userInfo.GoogleID)
	fmt.Println("JWT Token:", jwtToken)
	if err != nil {
		http.Error(w, "Failed to create token", http.StatusInternalServerError)
		return
	}
	/*
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(struct {
		User  *models.User `json:"user"`
		Token string       `json:"token"`
	}{
		User:  user,
		Token: jwtToken,
	})
	*/

	http.Redirect(w, r, "http://localhost:5173/dashboard", http.StatusSeeOther)
}

func getUserByGoogleID(ctx context.Context, db *pgxpool.Pool, googleID string) (*models.User, error) {
    user := &models.User{}
    err := db.QueryRow(ctx, "SELECT id, google_id, email, created_at FROM users WHERE google_id=$1", googleID).
        Scan(&user.ID, &user.GoogleID, &user.Email, &user.CreatedAt)
    if err != nil {
        if errors.Is(err, pgx.ErrNoRows) {
            return nil, nil
        }
        return nil, err
    }
    return user, nil
}

func createUser(ctx context.Context, db *pgxpool.Pool, googleID, email string) (*models.User, error) {
    user := &models.User{}
    err := db.QueryRow(ctx,
        `INSERT INTO users (google_id, email, created_at) VALUES ($1, $2, $3) RETURNING id, google_id, email, created_at`,
        googleID, email, time.Now(),
    ).Scan(&user.ID, &user.GoogleID, &user.Email, &user.CreatedAt)
    if err != nil {
        return nil, err
    }
    return user, nil
}