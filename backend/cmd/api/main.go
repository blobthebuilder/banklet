package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/blobthebuilder/budgeteer/internal/auth"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
    	log.Println("No .env file found")
  	}
	auth.InitAuth()
	auth.InitGoogleOAuth()

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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("Server running on http://localhost:" + port)
	http.ListenAndServe(":"+port, r)
}