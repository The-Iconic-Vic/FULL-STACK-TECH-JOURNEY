# Todo Frontend - Full Stack Todo App

React frontend for the Todo application with authentication.

## Technologies Used
- React 18
- React Router DOM v6
- Axios for API calls
- Context API for state management
- CSS Modules / CSS (inline styles for simplicity)

## Features
- User registration and login
- Protected routes (requires authentication)
- Add, complete, and delete todos
- Todos are user-specific
- Token stored in localStorage
- Auto-logout on token expiration

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | User login form |
| `/register` | RegisterPage | User registration form |
| `/` | TodoPage | Todo management (protected) |

## Components

| Component | Purpose |
|-----------|---------|
| TodoForm | Form to add new todos |
| TodoList | List of all todos |
| TodoItem | Individual todo with toggle/delete |
| Navbar | Navigation bar with logout |

## Context

### AuthContext
Provides authentication state and methods:
- `user` - Current user object
- `token` - JWT token
- `loading` - Auth loading state
- `login(email, password)` - Login function
- `register(name, email, password)` - Register function
- `logout()` - Logout function

## Installation

```bash
cd frontend
npm install
npm run dev
Vite Proxy Configuration
The frontend uses Vite proxy to avoid CORS issues:

javascript
// vite.config.js
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
API Service
All API calls go through services/api.js which automatically:

Adds JWT token to requests

Handles 401 responses (redirects to login)

Sets base URL to /api

Folder Structure
text
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── TodoPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── auth.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md