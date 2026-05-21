package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/xiaoan1122/todo-api/internal/database"
	"github.com/xiaoan1122/todo-api/internal/models"
	"github.com/xiaoan1122/todo-api/internal/routes"
)

func main() {
	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	log.Println("DB_NAME:", os.Getenv("DB_NAME"))

	// Connect database
	db, err := database.Connect()
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Auto migrate
	err = db.AutoMigrate(&models.Todo{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	// Create Gin router
	router := gin.Default()

	// Health check route
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	routes.RegisterTodoRoutes(router, db)

	// Start server
	port := os.Getenv("PORT")
	router.Run(":" + port)
}
