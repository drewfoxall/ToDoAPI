package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/xiaoan1122/todo-api/internal/models"
	"gorm.io/gorm"
)

type TodoHandler struct {
	DB *gorm.DB
}

func NewTodoHandler(db *gorm.DB) *TodoHandler {
	return &TodoHandler{DB: db}
}

// GET /todos
func (h *TodoHandler) GetTodos(c *gin.Context) {
	var todos []models.Todo

	h.DB.Find(&todos)

	c.JSON(http.StatusOK, todos)
}

// POST /todos
func (h *TodoHandler) CreateTodo(c *gin.Context) {
	var todo models.Todo

	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	h.DB.Create(&todo)

	c.JSON(http.StatusCreated, todo)
}
