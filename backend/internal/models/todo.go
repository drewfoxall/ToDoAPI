package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Title     string `json:"title"`
	Type      string `json:"type"`
	Completed bool   `json:"completed"`
}
