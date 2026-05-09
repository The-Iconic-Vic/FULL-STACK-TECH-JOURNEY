# 📚 Day 48 Resources - CORS & Connecting React to Backend

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: CORS Explained | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS |
| Express CORS Middleware | https://expressjs.com/en/resources/middleware/cors.html |
| Vite Proxy Configuration | https://vitejs.dev/config/server-options.html#server-proxy |
| React Context Documentation | https://react.dev/reference/react/useContext |
| localStorage API | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| CORS Explained in 5 Minutes | https://youtu.be/4KHiSt0FJYw |
| React + Express Full Stack App | https://youtu.be/7CqJlxBYj-M |
| JWT Authentication with React | https://youtu.be/7nafaH9Sddw |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Postman | Test backend APIs | https://postman.com |
| React DevTools | Debug React components | Chrome Web Store |
| MongoDB Compass | View database | https://mongodb.com/products/compass |

## 📝 Commands Cheatsheet

### Backend Setup
```bash
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

### Frontend Setup
```bash
cd frontend
npm create vite@latest . -- --template react
npm install react-router-dom
```

### Run Both Servers
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## 🔧 CORS Configuration Cheatsheet

### Basic (Allow All)
```javascript
app.use(cors())
```

### Specific Origin
```javascript
app.use(cors({ origin: 'http://localhost:5173' }))
```

### Full Options
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

## 🔗 Vite Proxy Cheatsheet

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

## 📦 API Service Cheatsheet

### Fetch Version
```javascript
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    }
  })
  return response.json()
}
```

### Axios Version
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS error | No cors middleware | Add `app.use(cors())` |
| `apiFetch is not defined` | Wrong import | Use `import apiFetch from './api'` |
| 401 Unauthorized | Invalid/expired token | Check token in localStorage |
| Network error | Backend not running | Start backend with `npm run dev` |
| Token not saved | localStorage not used | Save after login |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| CORS in Depth | https://web.dev/articles/cross-origin-resource-sharing |
| Vite Proxy Guide | https://vitejs.dev/config/server-options |
| React Authentication Patterns | https://react.dev/reference/react/useContext |

