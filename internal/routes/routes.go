package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaoan1122/todo-api/internal/handlers"
	"github.com/xiaoan1122/todo-api/internal/middleware"
	"gorm.io/gorm"
)

func RegisterTodoRoutes(router *gin.Engine, db *gorm.DB) {

	handler := handlers.NewTodoHandler(db)

	authorized := router.Group("/")
	authorized.Use(middleware.AuthMiddleware())

	authorized.GET("/todos", handler.GetTodos)
	authorized.GET("/todos/:id", handler.GetTodoByID)
	authorized.POST("/todos", handler.CreateTodo)
	authorized.PUT("/todos/:id", handler.UpdateTodo)
	authorized.DELETE("/todos/:id", handler.DeleteTodo)
}
