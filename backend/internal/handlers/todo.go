package handlers

import (
	"log"
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

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	var todos []models.Todo

	h.DB.Where("user_id = ?", userID).Find(&todos)

	c.JSON(http.StatusOK, todos)
}

// POST /todos
func (h *TodoHandler) CreateTodo(c *gin.Context) {

	userID, exists := c.Get("userID")
	log.Println("Creating todo for user:", userID)

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	var todo models.Todo

	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	todo.UserID = userID.(uint)
	log.Println("Todo.UserID =", todo.UserID)

	h.DB.Create(&todo)

	c.JSON(http.StatusCreated, todo)
}

// GET /todos/:id
func (h *TodoHandler) GetTodoByID(c *gin.Context) {

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	id := c.Param("id")

	var todo models.Todo

	result := h.DB.Where(
		"id = ? AND user_id = ?",
		id,
		userID,
	).First(&todo)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Todo not found",
		})
		return
	}

	c.JSON(http.StatusOK, todo)
}

// PUT /todos/:id
func (h *TodoHandler) UpdateTodo(c *gin.Context) {

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	id := c.Param("id")

	var todo models.Todo

	result := h.DB.Where(
		"id = ? AND user_id = ?",
		id,
		userID,
	).First(&todo)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Todo not found",
		})
		return
	}

	var updatedTodo models.Todo

	if err := c.ShouldBindJSON(&updatedTodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	todo.Title = updatedTodo.Title

	h.DB.Save(&todo)

	c.JSON(http.StatusOK, todo)
}

// DELETE /todos/:id
func (h *TodoHandler) DeleteTodo(c *gin.Context) {

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	id := c.Param("id")

	var todo models.Todo

	result := h.DB.Where(
		"id = ? AND user_id = ?",
		id,
		userID,
	).First(&todo)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Todo not found",
		})
		return
	}

	h.DB.Delete(&todo)

	c.JSON(http.StatusOK, gin.H{
		"message": "Todo deleted successfully",
	})
}
