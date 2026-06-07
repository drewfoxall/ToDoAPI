# Todo API — Full-Stack Task Management Application

A full-stack Todo application built with Go, Gin, PostgreSQL, React, TypeScript, Docker, and JWT authentication.

This project was created to develop practical experience with modern backend and frontend development while following industry-standard architecture and development practices.

## Objectives

This project focuses on strengthening skills in:

* Golang backend development
* RESTful API design
* Gin web framework
* PostgreSQL database management
* JWT authentication and authorization
* React and TypeScript frontend development
* Docker containerization
* Database integration with GORM
* Full-stack application architecture
* API security and middleware

---

## Tech Stack

### Backend

| Technology  | Purpose                          |
| ----------- | -------------------------------- |
| Go (Golang) | Backend programming language     |
| Gin         | HTTP web framework               |
| PostgreSQL  | Relational database              |
| GORM        | ORM for database interaction     |
| JWT         | Authentication and authorization |
| bcrypt      | Secure password hashing          |

### Frontend

| Technology | Purpose                                 |
| ---------- | --------------------------------------- |
| React      | Frontend UI library                     |
| TypeScript | Type-safe frontend development          |
| Vite       | Frontend tooling and development server |

### Development & Infrastructure

| Technology     | Purpose                               |
| -------------- | ------------------------------------- |
| Docker         | Containerized development environment |
| Docker Compose | Service orchestration                 |
| Postman        | API testing                           |
| Git & GitHub   | Version control                       |

---

## Features

### Implemented

* RESTful API architecture
* PostgreSQL database integration
* Dockerized database environment
* CRUD operations for todos
* GORM Auto-Migrations
* Environment variable configuration
* Modular project structure
* CORS middleware configuration
* JWT authentication middleware
* React frontend foundation
* TypeScript frontend setup

### In Progress

* User registration
* User login
* JWT token generation
* Protected frontend routes
* React Todo management interface

### Planned

* User-specific todos
* Persistent authentication
* Form validation
* Responsive UI design
* Swagger/OpenAPI documentation
* Unit and integration testing
* CI/CD pipeline
* Structured logging
* Role-based authorization
* Production Docker deployment

---

## Getting Started

### Prerequisites

* Go 1.24+
* Node.js
* Docker Desktop
* Git

---

### Clone Repository

```bash
git clone https://github.com/drewfoxall/ToDoAPI.git
cd ToDoAPI
```

---

## Backend Setup

Install dependencies:

```bash
cd backend
go mod tidy
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todoapp

JWT_SECRET=your_secret_key

PORT=8080
```

Start PostgreSQL:

```bash
docker compose up -d
```

Run the API:

```bash
go run cmd/server/main.go
```

Backend will be available at:

```text
http://localhost:8080
```

---

## Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---
## Security

* JWT-based authentication
* Password hashing with bcrypt
* Environment-based configuration
* Protected API routes
* CORS configuration for frontend/backend communication

---

## Learning Goals

This project is being built to gain hands-on experience with:

* Backend API development in Go
* Authentication and authorization
* Database modeling and ORM usage
* Frontend/backend integration
* Dockerized development workflows
* Full-stack application architecture
* Production-ready project organization

## Author

**Andrew Foxall**

GitHub: https://github.com/drewfoxall
