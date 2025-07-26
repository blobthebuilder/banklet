package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/blobthebuilder/banklet/internal/auth"
	"github.com/blobthebuilder/banklet/internal/db"
	"github.com/blobthebuilder/banklet/internal/plaid"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)




func init (){
	err := godotenv.Load()
	if err != nil {
    	log.Println("No .env file found")
  	}

	auth.InitAuth()
	auth.InitGoogleOAuth()
	db.InitDatabase()
	plaid.InitPlaidClient()
}

func main() {

	r := chi.NewRouter()

	
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	//test
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Backend is alive!"))
	})

	// oauth
	r.Get("/auth/google/login", auth.LoginHandler)
	r.Get("/auth/google/callback", auth.CallbackHandler)
	r.Post("/auth/logout", auth.LogoutHandler)

	r.Get("/api/auth/check", func(w http.ResponseWriter, r *http.Request) {
    	auth.AuthMiddleware(http.HandlerFunc(auth.AuthCheckHandler)).ServeHTTP(w, r)
	})

	//plaid
	r.Group(func(protected chi.Router) {
		protected.Use(auth.AuthMiddleware) // Apply middleware

		// creating token
		protected.Post("/api/tokens/create_link_token", plaid.CreateLinkToken)
		protected.Post("/api/tokens/get_access_token", plaid.GetAccessToken)

		protected.Get("/api/banks/list", plaid.ListBanks)
		protected.Delete("/api/banks/{bank_id}", plaid.DeleteBank)

		protected.Get("/api/transactions", plaid.Transactions)
	})

	 c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"},
        AllowedMethods:   []string{"GET", "POST", "OPTIONS", "DELETE"},
        AllowedHeaders:   []string{"Authorization", "Content-Type"},
        AllowCredentials: true,
    })

	handler := c.Handler(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("Server running on http://localhost:" + port)
	http.ListenAndServe(":"+port, handler)
}