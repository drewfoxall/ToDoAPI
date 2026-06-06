package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/xiaoan1122/todo-api/internal/database"
	"github.com/xiaoan1122/todo-api/internal/middleware"
	"github.com/xiaoan1122/todo-api/internal/models"
	"github.com/xiaoan1122/todo-api/internal/routes"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	log.Println("DB_NAME:", os.Getenv("DB_NAME"))

	// Connect database
	log.Println("Connecting to database...")

	db, err := database.Connect()
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	log.Println("Database connected")

	// Auto migrate
	log.Println("Running migrations...")

	err = db.AutoMigrate(&models.Todo{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Migrations complete")

	// Create Gin router
	log.Println("Creating router...")

	router := gin.Default()

	// CORS middleware
	router.Use(cors.New(middleware.Cors()))

	// Health check route
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	log.Println("Registering routes...")

	routes.RegisterTodoRoutes(router, db)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Starting server on port", port)
	err = db.AutoMigrate(
		&models.User{},
		&models.Todo{},
	)
	err = router.Run(":" + port)
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
