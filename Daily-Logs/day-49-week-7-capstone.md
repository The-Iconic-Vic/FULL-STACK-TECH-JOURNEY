# 📅 Day 49: Week 7 Capstone - Full-Stack Task Management System

**Date:** May 10, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topic:** Week 7 Capstone - Full-Stack Task Management System

---

## 📋 Project Overview

This is the Week 7 Capstone project – a complete full-stack Task Management System combining everything learned in Weeks 5-7: React, React Router, Context API, JWT authentication, Node.js, Express, MongoDB, and full CRUD operations.

---

## 🎯 Capstone Requirements Checklist

### Backend Requirements

| Feature | Status | Implementation |
|---------|--------|----------------|
| User Model (email, password, name) | ✅ | Mongoose schema with bcrypt hashing |
| Task Model (title, description, status, priority, dueDate, user) | ✅ | Mongoose schema with timestamps |
| POST /api/auth/register | ✅ | User registration with validation |
| POST /api/auth/login | ✅ | Login with JWT token |
| GET /api/auth/me | ✅ | Get current user (protected) |
| GET /api/tasks | ✅ | Get user's tasks with filters |
| GET /api/tasks/:id | ✅ | Get single task |
| POST /api/tasks | ✅ | Create task |
| PUT /api/tasks/:id | ✅ | Update task |
| DELETE /api/tasks/:id | ✅ | Delete task |
| PATCH /api/tasks/:id/status | ✅ | Update status only |

### Frontend Requirements

| Feature | Status | Implementation |
|---------|--------|----------------|
| Login page | ✅ | Email/password form |
| Register page | ✅ | Name/email/password form |
| Dashboard page | ✅ | Task list with filters |
| Create/Edit Task page | ✅ | Form for task creation/editing |
| Profile page | ✅ | Update name/password |
| Protected routes | ✅ | Cannot access without login |
| AuthContext | ✅ | login/logout/register functions |
| Token in localStorage | ✅ | Persistent login |
| Axios interceptor | ✅ | Adds token to all requests |
| Task filtering | ✅ | By status, priority, due date |
| Task sorting | ✅ | By due date, priority, creation |
| Task search | ✅ | Search by title |
| Loading states | ✅ | Spinner components |
| Error handling | ✅ | User-friendly messages |
| Logout button | ✅ | Clears token and redirects |

---

## 🏗️ Project Structure

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
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskFilters.jsx
    │   │   ├── TaskStats.jsx
    │   │   ├── Navbar.jsx
    │   │   └── LoadingSpinner.jsx
    │   └── utils/
    │       └── helpers.js
    └── README.md
```

---

## 📊 Database Schemas

### User Schema

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now }
}
```

### Task Schema

```javascript
{
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## 🔌 API Endpoints

### Auth Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Task Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get all user tasks | Private |
| GET | `/api/tasks/:id` | Get single task | Private |
| POST | `/api/tasks` | Create task | Private |
| PUT | `/api/tasks/:id` | Update task | Private |
| DELETE | `/api/tasks/:id` | Delete task | Private |
| PATCH | `/api/tasks/:id/status` | Update status only | Private |

### Query Parameters for GET /api/tasks

| Parameter | Values | Description |
|-----------|--------|-------------|
| `status` | pending, in-progress, completed | Filter by status |
| `priority` | low, medium, high | Filter by priority |
| `dueDate` | today, week, overdue | Filter by due date |
| `sort` | dueDate, priority, createdAt | Sort field |
| `order` | asc, desc | Sort order |
| `search` | string | Search in title |

---

## 🎨 Frontend Pages

### Login Page
- Email input
- Password input
- Submit button
- Link to register
- Error message display

### Register Page
- Name input
- Email input
- Password input
- Confirm password input
- Submit button
- Link to login

### Dashboard Page
- Task list display
- Task filters (status, priority, due date)
- Task sort options
- Search by title
- Task statistics (total, by status)
- Add task button
- Edit/delete task actions

### Task Form Page
- Title input (required)
- Description textarea
- Status dropdown (pending, in-progress, completed)
- Priority dropdown (low, medium, high)
- Due date picker
- Submit button
- Delete button (for edit mode)

### Profile Page
- Name display and edit
- Email display (read-only)
- Password change form
- Current password
- New password
- Confirm new password

---

## 🔐 Authentication Flow

```
1. User registers
   Frontend → POST /api/auth/register → Backend
   → Hash password → Save user → Return JWT
   → Store token in localStorage → Redirect to dashboard

2. User logs in
   Frontend → POST /api/auth/login → Backend
   → Verify credentials → Return JWT
   → Store token in localStorage → Redirect to dashboard

3. Protected API calls
   Frontend → Axios interceptor adds Bearer token
   → Backend verifies JWT → Returns data
   → If 401, redirect to login

4. Logout
   Frontend → Remove token from localStorage
   → Clear AuthContext state → Redirect to login
```

---

## 📱 Component Breakdown

### TaskCard
- Displays task title, status, priority, due date
- Action buttons (edit, delete, status toggle)
- Color coding by priority (red=high, yellow=medium, green=low)
- Status badge styling

### TaskFilters
- Status filter tabs (All, Pending, In Progress, Completed)
- Priority filter dropdown
- Due date filter (All, Today, This Week, Overdue)
- Sort dropdown
- Search input

### TaskStats
- Total tasks count
- Tasks by status counts
- Completion percentage
- Progress bar

### Navbar
- Logo/Home link
- Dashboard link
- Profile link
- Logout button
- User name display

### LoadingSpinner
- Centered spinner animation
- Used for all async operations

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials fails
- [ ] Get current user with valid token
- [ ] Get current user without token fails
- [ ] Create task with valid data
- [ ] Create task without title fails
- [ ] Get user's tasks
- [ ] Get single task
- [ ] Update task
- [ ] Delete task
- [ ] Update task status only

### Frontend Tests
- [ ] Register page submits correctly
- [ ] Login page submits correctly
- [ ] Protected routes redirect to login
- [ ] Dashboard loads tasks
- [ ] Add new task
- [ ] Edit existing task
- [ ] Delete task with confirmation
- [ ] Update task status
- [ ] Filter tasks by status
- [ ] Filter tasks by priority
- [ ] Filter tasks by due date
- [ ] Sort tasks
- [ ] Search tasks by title
- [ ] Update profile name
- [ ] Update password
- [ ] Logout clears token

---

## 🔑 Key Takeaways

1. **Full-stack development combines frontend and backend** - React for UI, Node/Express for API, MongoDB for data
2. **JWT authentication is essential** for protecting user data
3. **Context API with useReducer** provides global state management
4. **Axios interceptors** simplify adding auth tokens to requests
5. **Proper error handling** improves user experience
6. **Loading states** prevent user confusion during async operations
7. **Protected routes** ensure only authenticated users access certain pages
8. **Filtering, sorting, and searching** are essential for good UX
9. **MongoDB relationships** (user reference) link tasks to users
10. **Validation** (frontend and backend) ensures data integrity

