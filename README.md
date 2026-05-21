# Todo API — Golang RESTful Backend

A RESTful Todo API built with Go, Gin, PostgreSQL, GORM, and Docker.

This project was created to strengthen backend engineering skills in:
- Golang
- REST API architecture
- Gin web framework
- PostgreSQL
- Docker containerization
- Database integration with GORM
- Backend project structure and API design

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Go (Golang) | Backend programming language |
| Gin | HTTP web framework |
| PostgreSQL | Relational database |
| GORM | ORM for database interaction |
| Docker | Containerized PostgreSQL environment |
| Postman | API testing |
| Git/GitHub | Version control |

---

## Features

- RESTful API architecture
- CRUD operations for todos
- PostgreSQL database persistence
- JSON request/response handling
- Dockerized database setup
- Environment variable configuration
- Modular project structure
- GORM database integration

---

## Project Structure

```text
todo-api/
│
├── cmd/
│   └── server/
│       └── main.go
│
├── internal/
│   ├── database/
│   ├── handlers/
│   ├── models/
│   └── routes/
│
├── .env
├── docker-compose.yml
├── go.mod
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/todos` | Retrieve all todos |
| GET | `/todos/:id` | Retrieve todo by ID |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

---

## Getting Started

### 1. Clone Repository

```bash
git clone git@github.com:drewfoxall/ToDoAPI.git
cd ToDoAPI
```

---

### 2. Install Dependencies

```bash
go mod tidy
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=todoapp
PORT=8080
```

---

### 4. Start PostgreSQL with Docker

```bash
docker compose up -d
```

---

### 5. Run the Server

```bash
go run cmd/server/main.go
```

Server will run on:

```text
http://localhost:8080
```

---

## Example Request

### Create Todo

```http
POST /todos
```

```json
{
  "title": "Learn Golang",
  "completed": false
}
```

---

## Future Improvements

- Request validation
- Authentication with JWT
- Swagger/OpenAPI documentation
- Unit and integration testing
- Database migrations
- CI/CD pipeline
- Redis caching
- Structured logging
- Clean Architecture implementation

---

## Learning Goals

This project was built to develop practical backend engineering experience with:
- HTTP APIs
- RESTful design principles
- Database integration
- Containerized development environments
- Backend architecture in Go
- CRUD application development

---

## Author

Andrew Foxall

GitHub: https://github.com/drewfoxall
