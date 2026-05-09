# 📅 Day 48: CORS & Connecting React to Backend

**Date:** May 9, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topics:** CORS, React-Backend Integration, Proxy Configuration, Full Stack Todo App

---

## 📋 Learning Objectives

- ✅ Understand what CORS is and why browsers block cross-origin requests
- ✅ Install and configure the `cors` package in Express
- ✅ Run both frontend and backend servers simultaneously
- ✅ Fetch data from React to backend API
- ✅ Handle authentication tokens in React
- ✅ Store JWT tokens in localStorage
- ✅ Set up Vite proxy to avoid CORS in development
- ✅ Build a complete full-stack todo application

---

## 🌐 Part 1: CORS Explained

### What is CORS?

CORS (Cross-Origin Resource Sharing) is a security mechanism implemented by browsers that restricts web pages from making requests to a different domain than the one that served the page.

```
Frontend: http://localhost:5173
Backend:  http://localhost:5000

Different ports = Different origins = CORS error!
```

### The CORS Error

```
Access to fetch at 'http://localhost:5000/api/todos' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

### Why CORS Exists

Prevents malicious websites from making unauthorized requests to other sites.

---

## 🔧 Part 2: Configuring CORS in Express

### Installation

```bash
npm install cors
```

### Basic CORS Setup

```javascript
const cors = require('cors');

// Allow all origins (not recommended for production)
app.use(cors());
```

### Production CORS Configuration

```javascript
const corsOptions = {
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### CORS Options

| Option | Description |
|--------|-------------|
| `origin` | Allowed origin(s) |
| `credentials` | Allow cookies/auth headers |
| `methods` | Allowed HTTP methods |
| `allowedHeaders` | Allowed request headers |
| `exposedHeaders` | Headers exposed to client |

---

## 🔗 Part 3: Connecting React to Backend

### Two Servers Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   React Frontend │     │  Express Backend │
│   Port: 5173     │────▶│   Port: 5000     │
│   (Vite)         │     │   (API)          │
└─────────────────┘     └─────────────────┘
```

### Option 1: Vite Proxy (Development)

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

**Benefits:**
- No CORS errors in development
- Use relative paths in frontend (`/api/todos`)

### Option 2: Full URL (Direct)

```javascript
const API_BASE = 'http://localhost:5000/api'

const response = await fetch(`${API_BASE}/todos`)
```

---

## 🔐 Part 4: Authentication Tokens in React

### Storing Token in localStorage

```javascript
// After login
localStorage.setItem('token', token)

// Retrieving token
const token = localStorage.getItem('token')

// Removing on logout
localStorage.removeItem('token')
```

### Adding Token to Requests

```javascript
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })
  
  return response.json()
}
```

### Axios Interceptors (Alternative)

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Request interceptor - adds token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - handles 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 🧩 Part 5: Full Stack Todo App Architecture

### Project Structure

```
day-48-fullstack-todo-app/
├── backend/
│   ├── .env
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   └── config/
│       └── database.js
│
└── frontend/
    ├── src/
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── TodoPage.jsx
    │   ├── services/
    │   │   └── api.js
    │   └── utils/
    │       └── auth.js
    ├── index.html
    └── vite.config.js
```

---

## 🔄 Part 6: Authentication Flow

### Flow Diagram

```
1. User registers
   React → POST /api/auth/register → Backend → Hash password → Save user → Return JWT → Save in localStorage

2. User logs in
   React → POST /api/auth/login → Backend → Verify credentials → Return JWT → Save in localStorage

3. Protected API call
   React → GET /api/todos (with Bearer token) → Backend → Verify JWT → Return user's todos

4. Logout
   React → Remove token from localStorage → Redirect to login
```

---

## 📝 Quick Reference

### CORS Setup
```bash
npm install cors
```

```javascript
app.use(cors({ origin: 'http://localhost:5173' }))
```

### Vite Proxy
```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

### Token Management
```javascript
// Save
localStorage.setItem('token', token)

// Get
const token = localStorage.getItem('token')

// Remove
localStorage.removeItem('token')
```

### API Request with Token
```javascript
fetch('/api/todos', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

---

## ✅ Day 48 Checklist

- [ ] Understand CORS and why browsers block cross-origin requests
- [ ] Install and configure `cors` package in Express
- [ ] Run both frontend and backend servers simultaneously
- [ ] Set up Vite proxy for development
- [ ] Store JWT token in localStorage after login
- [ ] Add token to Authorization header in API requests
- [ ] Handle 401 unauthorized responses (redirect to login)
- [ ] Build complete full-stack todo application
- [ ] Test registration, login, and todo CRUD operations
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **CORS is a browser security feature** - blocks cross-origin requests by default
2. **Use `cors` middleware in Express** - configure allowed origins
3. **Vite proxy bypasses CORS in development** - forward `/api` requests to backend
4. **Store JWT in localStorage** - persists across page reloads
5. **Add token to Authorization header** - `Bearer ${token}` format
6. **Handle 401 responses** - redirect to login page when token expires
7. **Run both servers simultaneously** - two terminals or concurrently package
8. **Environment variables for API URL** - different for dev/production

