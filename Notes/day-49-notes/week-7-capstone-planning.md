# 📘 Week 7 Capstone Planning

## Project Overview

Build a complete full-stack Task Management System with user authentication and full CRUD operations using React, Node.js, Express, and MongoDB.

---

## 📋 Requirements Checklist

### Backend Requirements

| Feature | Status | Implementation |
|---------|--------|----------------|
| User Model | ✅ | email (unique), password (hashed), name, createdAt |
| Task Model | ✅ | title, description, status, priority, dueDate, user reference |
| POST /api/auth/register | ✅ | Create user, hash password, return JWT |
| POST /api/auth/login | ✅ | Verify credentials, return JWT |
| GET /api/auth/me | ✅ | Get current user from token |
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
| Task Form page | ✅ | Create/Edit task |
| Profile page | ✅ | Update name/password |
| Protected routes | ✅ | Auth check wrapper |
| AuthContext | ✅ | Global auth state |
| Token storage | ✅ | localStorage persistence |
| Axios interceptor | ✅ | Auto-add token to requests |
| Task filtering | ✅ | By status, priority, due date |
| Task sorting | ✅ | By due date, priority, creation |
| Task search | ✅ | Search by title |
| Loading states | ✅ | Spinner components |
| Error handling | ✅ | User-friendly messages |

---

## 🏗️ Database Schemas

### User Schema

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

### Task Schema

```javascript
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
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
  dueDate: {
    type: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
```

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/register` | Register user | `{ name, email, password }` | `{ token, user }` |
| POST | `/login` | Login user | `{ email, password }` | `{ token, user }` |
| GET | `/me` | Get current user | - | `{ user }` |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/` | Get all tasks | Query params | `{ tasks, count }` |
| GET | `/:id` | Get single task | - | `{ task }` |
| POST | `/` | Create task | `{ title, description, status, priority, dueDate }` | `{ task }` |
| PUT | `/:id` | Update task | `{ title, description, status, priority, dueDate }` | `{ task }` |
| DELETE | `/:id` | Delete task | - | `{ message }` |
| PATCH | `/:id/status` | Update status | `{ status }` | `{ task }` |

### Query Parameters for GET /api/tasks

| Parameter | Values | Example |
|-----------|--------|---------|
| `status` | `pending`, `in-progress`, `completed` | `?status=pending` |
| `priority` | `low`, `medium`, `high` | `?priority=high` |
| `dueDate` | `today`, `week`, `overdue` | `?dueDate=today` |
| `sort` | `dueDate`, `priority`, `createdAt` | `?sort=dueDate` |
| `order` | `asc`, `desc` | `?order=desc` |
| `search` | string | `?search=meeting` |

---

## 📁 Folder Structure

### Backend Structure

```
backend/
├── .env
├── server.js
├── config/
│   ├── database.js      # MongoDB connection
│   └── config.js        # Environment variables
├── models/
│   ├── User.js          # User schema
│   └── Task.js          # Task schema
├── routes/
│   ├── authRoutes.js    # Auth endpoints
│   └── taskRoutes.js    # Task endpoints
├── controllers/
│   ├── authController.js # Auth logic
│   └── taskController.js # Task logic
├── middleware/
│   ├── authMiddleware.js # JWT verification
│   └── errorHandler.js   # Error handling
└── utils/
    └── validators.js     # Input validation
```

### Frontend Structure

```
frontend/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
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
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Component Specifications

### TaskCard Component

```jsx
// props: task, onUpdate, onDelete
// displays: title, description, status, priority, dueDate
// actions: status toggle, edit, delete
// styling: priority-based color coding
```

### TaskFilters Component

```jsx
// props: filters, onFilterChange, onSortChange, onSearch
// displays: status tabs, priority select, due date select, sort select, search input
```

### TaskStats Component

```jsx
// props: tasks
// displays: total count, counts by status, completion percentage, progress bar
```

### Navbar Component

```jsx
// props: user, onLogout
// displays: logo, navigation links, user name, logout button
```

### LoadingSpinner Component

```jsx
// props: size, color
// displays: centered spinner animation
```

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Register  │────▶│    Login    │────▶│  Dashboard  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   JWT Token │     │  API Calls  │
                    │ (localStorage)│    │ (with token)│
                    └─────────────┘     └─────────────┘
```

### Token Flow

1. **Register/Login**: Backend returns JWT token
2. **Store**: Frontend saves token in localStorage
3. **Attach**: Axios interceptor adds `Authorization: Bearer ${token}` header
4. **Verify**: Backend middleware validates token
5. **Expire**: On 401, frontend redirects to login

---

## 📊 API Response Formats

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

---

## 🧪 Testing Checklist

### Backend Testing

- [ ] Register with valid data returns 201 and token
- [ ] Register with existing email returns 400
- [ ] Login with valid credentials returns 200 and token
- [ ] Login with invalid credentials returns 401
- [ ] GET /me with valid token returns user
- [ ] GET /me without token returns 401
- [ ] Create task with valid data returns 201
- [ ] Create task without title returns 400
- [ ] GET /tasks returns user's tasks only
- [ ] GET /tasks/:id returns correct task
- [ ] GET /tasks/:id with wrong user returns 403
- [ ] PUT /tasks/:id updates task
- [ ] DELETE /tasks/:id deletes task
- [ ] PATCH /tasks/:id/status updates status only

### Frontend Testing

- [ ] Register page submits and redirects
- [ ] Login page submits and redirects
- [ ] Protected routes redirect to login
- [ ] Dashboard loads tasks on mount
- [ ] Add task form submits correctly
- [ ] Edit task loads existing data
- [ ] Delete task shows confirmation
- [ ] Status filter updates task list
- [ ] Priority filter works
- [ ] Due date filter works
- [ ] Sort works
- [ ] Search works
- [ ] Profile page updates name
- [ ] Password change works
- [ ] Logout clears token and redirects

---

## 🚀 Deployment Checklist

### Backend Deployment (Render/Heroku)

- [ ] Set environment variables
- [ ] Update MongoDB connection string
- [ ] Set CORS origin to frontend URL
- [ ] Build and deploy

### Frontend Deployment (Netlify/Vercel)

- [ ] Update API_BASE_URL to deployed backend
- [ ] Build production bundle
- [ ] Deploy

---

## 🔑 Key Decisions

| Decision | Rationale |
|----------|-----------|
| JWT for authentication | Stateless, works well with React |
| Axios interceptors | Clean token management |
| Context API for auth | Global state without Redux complexity |
| MongoDB for database | Flexible schema, easy with Node.js |
| Status enum fields | Prevents invalid values |
| Separate status update endpoint | Common use case for task management |
| Debounced search | Performance optimization |
| Confirmation dialogs | Prevents accidental deletions |
| Priority color coding | Visual hierarchy |
| Loading states | Better UX during async operations |
