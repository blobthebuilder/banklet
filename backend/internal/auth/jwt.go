package auth

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret []byte // unexported package-level variable

func InitAuth() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET is not set in environment")
	}
	jwtSecret = []byte(secret)
}

func CreateJWT(email string, googleID string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"google_id": googleID,
		"exp":   time.Now().Add(7 * 24 * time.Hour).Unix(), // expires in 1 wk
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func ValidateJWT(tokenStr string) (email string, googleID string, err error) {
	fmt.Println("Validating JWT token:", tokenStr)
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		email, _ := claims["email"].(string)
		googleID, _ := claims["google_id"].(string)
		fmt.Println("JWT token validated successfully:", email, googleID)
		return email, googleID, nil
	}

	return "", "", err
}