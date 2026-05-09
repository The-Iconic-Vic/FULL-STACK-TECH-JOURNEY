# 📘 CORS & React-Backend Integration Reference

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a security mechanism implemented by browsers that restricts web pages from making requests to a different domain than the one that served the page.

### Same-Origin vs Cross-Origin

| Comparison | Same Origin | Cross Origin |
|------------|-------------|--------------|
| Protocol | http:// vs http:// | http:// vs https:// |
| Domain | example.com vs example.com | example.com vs api.example.com |
| Port | 3000 vs 3000 | 3000 vs 5000 |

**Example of cross-origin request:**
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Different ports → Different origins → CORS error!
```

### The CORS Error Message
```
Access to fetch at 'http://localhost:5000/api/todos' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

---

## CORS Configuration in Express

### Installation
```bash
npm install cors
```

### Basic Setup (Allow All - Development Only)
```javascript
const cors = require('cors');
app.use(cors());
```

### Production Setup (Specific Origin)
```javascript
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Allow Multiple Origins
```javascript
const allowedOrigins = ['http://localhost:5173', 'https://myapp.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
```

### CORS Options

| Option | Description | Example |
|--------|-------------|---------|
| `origin` | Allowed origin(s) | `'http://localhost:5173'` |
| `credentials` | Allow cookies/auth headers | `true` |
| `methods` | Allowed HTTP methods | `['GET', 'POST']` |
| `allowedHeaders` | Allowed request headers | `['Content-Type', 'Authorization']` |
| `exposedHeaders` | Headers exposed to client | `['X-Total-Count']` |
| `maxAge` | How long preflight results are cached | `86400` |

---

## Vite Proxy Configuration

### Why Use Proxy?
- Eliminates CORS errors in development
- Allows using relative paths in frontend code
- No need to change code when deploying

### vite.config.js
```javascript
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
        rewrite: (path) => path  // Keep path as-is
      }
    }
  }
})
```

### Proxy Options

| Option | Description |
|--------|-------------|
| `target` | Backend server URL |
| `changeOrigin` | Changes origin of request to target |
| `rewrite` | Modifies request path |
| `secure` | Verifies SSL certificates |

---

## API Service in React

### Basic API Service (Fetch)
```javascript
// services/api.js
const API_BASE = 'http://localhost:5000/api'

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
  
  const data = await response.json()
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error(data.error || 'Request failed')
  }
  
  return data
}

export default apiFetch
```

### With Vite Proxy (No Hardcoded URL)
```javascript
// When using proxy, use relative paths
const response = await fetch('/api/todos', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Axios Version
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
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

export default api
```

---

## Authentication Context

### AuthContext.jsx
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (authToken) => {
    try {
      const data = await apiFetch('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setUser(data.user)
    } catch (error) {
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    const { token: newToken, user: userData } = data
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    return data
  }

  const register = async (name, email, password) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    })
    const { token: newToken, user: userData } = data
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = { token, user, loading, login, register, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
```

---

## Running Both Servers

### Method 1: Two Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Method 2: Concurrently Package
```bash
npm install --save-dev concurrently
```

```json
// package.json (in root)
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev"
  }
}
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| CORS error | Backend not configured | Add `cors()` middleware |
| 401 Unauthorized | Invalid/missing token | Check token in localStorage |
| 404 Not Found | Wrong API endpoint | Check URL in fetch |
| `apiFetch is not defined` | Wrong import | Use `import apiFetch from './api'` |
| Network error | Backend not running | Start backend server |
| Token not saved | localStorage not used | Save token after login |

---

## Development vs Production

### Development
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Use Vite proxy to avoid CORS

### Production
- Both on same domain (e.g., `https://myapp.com`)
- Build frontend and serve from backend
- No CORS issues when same origin

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Serve from backend
cd backend
app.use(express.static('../frontend/dist'))
```

---

## Quick Reference

### CORS Setup
```bash
npm install cors
```

```javascript
app.use(cors({ origin: 'http://localhost:5173' }))
```

### Vite Proxy
```javascript
proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } }
```

### Token Storage
```javascript
localStorage.setItem('token', token)
localStorage.getItem('token')
localStorage.removeItem('token')
```

### API Request with Token
```javascript
fetch('/api/todos', {
  headers: { 'Authorization': `Bearer ${token}` }
})
