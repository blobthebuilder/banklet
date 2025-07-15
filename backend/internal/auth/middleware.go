package auth

import (
	"context"
	"net/http"
	"strings"
)

type contextKey string

const (
	UserEmailKey contextKey = "userEmail"
	GoogleIDKey    contextKey = "googleID"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Missing or invalid Authorization header", http.StatusUnauthorized)
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		email, userID, err := ValidateJWT(tokenStr)
		if err != nil {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserEmailKey, email)
		ctx = context.WithValue(ctx, GoogleIDKey, userID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}