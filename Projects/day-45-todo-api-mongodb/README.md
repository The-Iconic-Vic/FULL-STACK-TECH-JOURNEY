# Todo API with MongoDB - Day 45 Project

## Project Overview
A REST API for todo management with MongoDB database using Mongoose ODM.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- dotenv for environment variables

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos?completed=true` | Filter by status |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| DELETE | `/api/todos` | Delete all todos |

## Database Schema

```javascript
{
  title: String (required, max 100 chars),
  completed: Boolean (default: false),
  createdAt: Date (default: now),
  timestamps: true (auto createdAt, updatedAt)
}
Setup Instructions
Step 1: Create MongoDB Atlas Account
Go to https://www.mongodb.com/cloud/atlas

Sign up for free account

Create a new cluster (FREE tier M0)

Create database user (save username/password)

Add IP address (0.0.0.0/0 for anywhere)

Get connection string

Step 2: Set up project
bash
cd day-45-todo-api-mongodb
npm install
Step 3: Configure environment variables
Create .env file:

env
PORT=3000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/todo_db
Step 4: Run the server
bash
npm start
# or for auto-restart
npm run dev
Testing with cURL
bash
# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn MongoDB"}'

# Get all todos
curl http://localhost:3000/api/todos

# Get active todos
curl "http://localhost:3000/api/todos?completed=false"

# Update todo
curl -X PUT http://localhost:3000/api/todos/ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/ID_HERE
Data Flow
text
Client Request → Express Route → Controller → Mongoose Model → MongoDB Atlas
        ↑                                    ↓
        ←───────────────────────────────────┘
Key Features
MongoDB Atlas cloud database

Mongoose schema validation

Async/await error handling

Environment variables for security

Request logging middleware

Proper HTTP status codes