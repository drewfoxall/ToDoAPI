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

// GET /todos/:id
func (h *TodoHandler) GetTodoByID(c *gin.Context) {
	id := c.Param("id")

	var todo models.Todo

	result := h.DB.First(&todo, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Todo not found",
		})
		return
	}

	c.JSON(http.StatusOK, todo)
}

//Update /Todos/:id

func (h *TodoHandler) UpdateTodo(c *gin.Context) {
	id := c.Param("id")

	var todo models.Todo

	result := h.DB.First(&todo, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Todo Not found",
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
	todo.Completed = updatedTodo.Completed

	h.DB.Save(&todo)

	c.JSON(http.StatusOK, todo)
}

// Delete Todos
func (h *TodoHandler) DeleteTodo(c *gin.Context) {

	id := c.Param("id")

	var todo models.Todo

	result := h.DB.First(&todo, id)

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
