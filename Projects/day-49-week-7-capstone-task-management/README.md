# 📋 Task Management System - Week 7 Capstone

## Project Overview

A complete full-stack Task Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to register, login, and manage their tasks with full CRUD operations, filtering, sorting, and search capabilities.

## Features

### Authentication
- User registration with email/password
- User login with JWT token
- Protected routes (cannot access dashboard without login)
- Token stored in localStorage
- Logout functionality

### Task Management
- Create new tasks (title, description, status, priority, due date)
- View all tasks in a dashboard
- Edit existing tasks
- Delete tasks with confirmation
- Update task status (pending, in-progress, completed)
- Task filtering by status, priority, due date
- Task sorting by creation date, due date, priority
- Search tasks by title

### User Profile
- View profile information
- Update name (feature coming)
- Change password (feature coming)

### UI Features
- Responsive design (mobile + desktop)
- Loading states for all API calls
- Error handling with user-friendly messages
- Task statistics (total, by status, completion percentage)
- Priority color coding (High=Red, Medium=Yellow, Low=Green)
- Status badges

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React 18
- React Router DOM v6
- Axios for API calls
- Context API for state management
- CSS Modules (inline styles for simplicity)

## Project Structure

```
week-7-capstone-task-management/
├── backend/
│   ├── .env
│   ├── server.js
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   └── utils/
│       └── validators.js
│
└── frontend/
    ├── src/
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── TaskFormPage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskFilters.jsx
    │   │   ├── TaskStats.jsx
    │   │   └── LoadingSpinner.jsx
    │   └── utils/
    │       └── helpers.js
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all user's tasks | Private |
| GET | `/:id` | Get single task | Private |
| POST | `/` | Create new task | Private |
| PUT | `/:id` | Update task | Private |
| DELETE | `/:id` | Delete task | Private |
| PATCH | `/:id/status` | Update task status | Private |

### Query Parameters for GET `/api/tasks`

| Parameter | Values | Description |
|-----------|--------|-------------|
| `status` | pending, in-progress, completed | Filter by status |
| `priority` | low, medium, high | Filter by priority |
| `dueDate` | today, week, overdue | Filter by due date |
| `sort` | createdAt, dueDate, priority | Sort field |
| `order` | asc, desc | Sort order |
| `search` | string | Search by title |

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (see .env.example below)
# Start the server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task_management_db
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## Running the Application

1. **Start MongoDB** (if using local):
   ```bash
   mongod
   ```

2. **Start Backend Server** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend Server** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open browser** to `http://localhost:5173`

## Usage

1. **Register** a new account with name, email, and password
2. **Login** with your email and password
3. **Create tasks** using the "New Task" button or form
4. **Manage tasks**:
   - Click checkbox to mark as complete
   - Click edit icon to edit task
   - Click delete icon to delete task
   - Use filters to sort and filter tasks
   - Search tasks by title
5. **View statistics** on the dashboard (total, pending, in-progress, completed)

## API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Get tasks (replace TOKEN)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Full Stack","priority":"high"}'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check MongoDB is running or Atlas connection string |
| Port 5000 already in use | Change PORT in .env or kill process using port |
| Module not found | Run `npm install` in both folders |
| CORS error | Check FRONTEND_URL in backend .env |
| 401 Unauthorized | Clear localStorage, login again |
| Tasks not loading | Check token in localStorage, verify backend is running |

## Future Enhancements

- [ ] Email verification on registration
- [ ] Password reset functionality
- [ ] Task categories/tags
- [ ] Task sharing with other users
- [ ] File attachments for tasks
- [ ] Task comments
- [ ] Due date reminders
- [ ] Dark/light theme toggle
- [ ] Export tasks to CSV/PDF

