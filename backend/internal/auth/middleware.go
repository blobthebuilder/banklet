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
		tokenStr := ""

		authHeader := r.Header.Get("Authorization")
		if strings.HasPrefix(authHeader, "Bearer ") {
			tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
		} else {
			cookie, err := r.Cookie("token")
			if err != nil {
				http.Error(w, "Missing token", http.StatusUnauthorized)
				return
			}
			tokenStr = cookie.Value
		}


		email, googleID, err := ValidateJWT(tokenStr)
		if err != nil {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserEmailKey, email)
		ctx = context.WithValue(ctx, GoogleIDKey, googleID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func AuthCheckHandler(w http.ResponseWriter, r *http.Request) {
  userID, ok := r.Context().Value(UserEmailKey).(string)
  if !ok || userID == "" {
    http.Error(w, "Unauthorized", http.StatusUnauthorized)
    return
  }

  w.WriteHeader(http.StatusOK)
  w.Write([]byte(`{"status":"ok"}`))
}