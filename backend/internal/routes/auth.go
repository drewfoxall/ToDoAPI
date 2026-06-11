package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaoan1122/todo-api/internal/handlers"
	"gorm.io/gorm"
)

func RegisterAuthRoutes(router *gin.Engine, db *gorm.DB) {
	authHandler := handlers.NewAuthHandler(db)

	router.POST("/register", authHandler.Register)
	router.POST("/login", authHandler.Login)
}
