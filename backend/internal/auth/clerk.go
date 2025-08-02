package auth

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

var clerkClient clerk.Client

func InitClerk() {
	var err error
	clerkClient, err = clerk.NewClient(os.Getenv("CLERK_SECRET_KEY"))
	if err != nil {
		panic(err)
	}
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "missing auth header", http.StatusUnauthorized)
			return
		}

		token := authHeader[len("Bearer "):]

		sessionClaims, err := clerkClient.VerifyToken(token)
		if err != nil {
			http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

	
		ctx := context.WithValue(r.Context(), GoogleIDKey, sessionClaims.Subject)
		//ctx = context.WithValue(ctx, UserEmailKey, sessionClaims.)
		// You now have sessionClaims.Subject (user ID) and other claims
		fmt.Println("User ID authorized:", sessionClaims.Subject)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
