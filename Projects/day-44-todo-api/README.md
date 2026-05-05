# Todo API - Day 44 Project

## Project Overview
A simple REST API for todo management built with Express.js. Demonstrates CRUD operations, route parameters, query strings, and middleware.

## Technologies Used
- Node.js
- Express.js
- In-memory storage (no database required)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| DELETE | `/api/todos` | Delete all todos |

## Query Parameters

| Endpoint | Parameter | Example |
|----------|-----------|---------|
| `GET /api/todos` | `?completed=true/false` | `/api/todos?completed=false` |

## Request/Response Examples

### GET /api/todos
```json
{
  "total": 3,
  "todos": [
    { "id": 1, "title": "Learn Express.js", "completed": false },
    { "id": 2, "title": "Build a REST API", "completed": false },
    { "id": 3, "title": "Test with Postman", "completed": true }
  ]
}
POST /api/todos
Request Body:

json
{
  "title": "New Task",
  "completed": false
}
Response (201 Created):

json
{
  "id": 4,
  "title": "New Task",
  "completed": false
}
PUT /api/todos/:id
Request Body:

json
{
  "title": "Updated Task",
  "completed": true
}
DELETE /api/todos/:id
Response:

json
{
  "message": "Todo deleted successfully",
  "deleted": { "id": 1, "title": "Learn Express.js", "completed": false }
}
Setup Instructions
bash
cd day-44-todo-api
npm install
npm start
# or with auto-restart: npm run dev
Testing with cURL
bash
# Get all todos
curl http://localhost:3000/api/todos

# Get single todo
curl http://localhost:3000/api/todos/1

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","completed":false}'

# Update todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/1
Testing with Postman
Open Postman

Create new request

Set method and URL

For POST/PUT: Body → raw → JSON

Send request

Key Concepts Demonstrated
Concept	Implementation
Route parameters	req.params.id
Query strings	req.query.completed
Request body	req.body
Status codes	200, 201, 404, 500
Middleware	Logging, JSON parsing
Error handling	404 handler, error middleware
text
