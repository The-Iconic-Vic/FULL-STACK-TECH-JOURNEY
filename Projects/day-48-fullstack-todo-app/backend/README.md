# Todo API Backend - Full Stack Todo App

## Backend for Full Stack Todo Application

This is the backend API for the Todo application with JWT authentication.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |

### Todo Routes (`/api/todos`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all user's todos | Private |
| GET | `/:id` | Get single todo | Private |
| POST | `/` | Create new todo | Private |
| PUT | `/:id` | Update todo | Private |
| DELETE | `/:id` | Delete todo | Private |

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todo_fullstack_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
Installation
bash
cd backend
npm install
npm run dev
API Response Format
Success Response
json
{
  "success": true,
  "data": { ... }
}
Error Response
json
{
  "success": false,
  "error": "Error message"
}
Authentication
Include JWT token in Authorization header:

text
Authorization: Bearer your_jwt_token_here