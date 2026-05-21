package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/xiaoan1122/todo-api/internal/handlers"
	"gorm.io/gorm"
)

func RegisterTodoRoutes(router *gin.Engine, db *gorm.DB) {
	handler := handlers.NewTodoHandler(db)

	router.GET("/todos", handler.GetTodos)
	router.GET("/todos/:id", handler.GetTodoByID)
	router.POST("/todos", handler.CreateTodo)
	router.PUT("/todos/:id", handler.UpdateTodo)
	router.DELETE("/todos/:id", handler.DeleteTodo)
}
