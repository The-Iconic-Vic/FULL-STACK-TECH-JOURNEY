**Date:** April 30, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** React Router Setup, Navigation, Route Parameters

---

## 📋 Learning Objectives

- ✅ Install and configure React Router DOM
- ✅ Use BrowserRouter, Routes, and Route components
- ✅ Create navigation with Link and NavLink components
- ✅ Style active navigation links
- ✅ Implement programmatic navigation with useNavigate
- ✅ Extract URL parameters with useParams
- ✅ Handle 404 pages for unknown routes

---

## 🧭 Part 1: React Router Setup

### What is React Router?

React Router is the standard library for routing in React applications. It enables navigation between different views without page refresh.

```bash
# Installation
npm install react-router-dom
```

---

### Basic Setup

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

**BrowserRouter** - Wraps your entire app, enables routing functionality.

---

### Defining Routes

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
```

| Component | Purpose |
|-----------|---------|
| `Routes` | Wraps all Route definitions |
| `Route` | Defines a path and which component to render |
| `path="*"` | Catch-all for 404 pages |

---

## 🔗 Part 2: Navigation

### Link Component (instead of `<a>`)

```jsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
```

**Why Link instead of `<a>`?**
- Prevents full page reload
- Preserves React state
- Faster navigation
- Handles browser history

---

### NavLink with Active Styling

```jsx
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
        end
      >
        Home
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        About
      </NavLink>
    </nav>
  )
}
```

**CSS for active link:**
```css
.active {
  color: #00d4ff;
  border-bottom: 2px solid #00d4ff;
}
```

**`end` prop** - Ensures exact match for parent routes (prevents "/" from matching "/about")

---

### Programmatic Navigation (useNavigate)

```jsx
import { useNavigate } from 'react-router-dom'

function PostPage() {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)  // Go back one page
  }

  const goToNextPost = () => {
    navigate(`/post/${nextId}`)  // Navigate to specific route
  }

  const goHome = () => {
    navigate('/')  // Navigate to home
  }

  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <button onClick={goToNextPost}>Next →</button>
    </div>
  )
}
```

**useNavigate options:**
| Syntax | Behavior |
|--------|----------|
| `navigate(-1)` | Go back one page |
| `navigate(1)` | Go forward one page |
| `navigate('/path')` | Navigate to specific route |
| `navigate('/path', { state: { data } })` | Pass state data |

---

## 📍 Part 3: Route Parameters

### URL Parameters (useParams)

```jsx
// Route definition
<Route path="/post/:id" element={<PostPage />} />

// Component using the parameter
import { useParams } from 'react-router-dom'

function PostPage() {
  const { id } = useParams()
  
  // Fetch post with id
  const { data: post } = useFetch(`/api/posts/${id}`)
  
  return <h1>Post ID: {id}</h1>
}
```

**Multiple parameters:**
```jsx
// Route: /category/:category/post/:postId
<Route path="/category/:category/post/:postId" element={<PostPage />} />

// Component
const { category, postId } = useParams()
```

---

### Query Parameters (useSearchParams)

```jsx
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Get query parameter
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  
  // Update query parameters
  const handleSearch = (term) => {
    setSearchParams({ q: term, page: '1' })
  }
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p>Searching for: {query}</p>
      <p>Page: {page}</p>
    </div>
  )
}
```

---

### Navigation with State

```jsx
// Passing state
navigate('/profile', { state: { userId: 123, fromHome: true } })

// Receiving state
import { useLocation } from 'react-router-dom'

function ProfilePage() {
  const location = useLocation()
  const { userId, fromHome } = location.state || {}
  
  return <div>User ID: {userId}</div>
}
```

---

## 📁 Complete Routing Example

### Folder Structure
```
src/
├── main.jsx          # BrowserRouter wrapper
├── App.jsx           # Routes definition
├── components/
│   └── Navbar.jsx    # Navigation links
└── pages/
    ├── HomePage.jsx
    ├── AboutPage.jsx
    ├── ContactPage.jsx
    ├── PostPage.jsx
    └── NotFoundPage.jsx
```

### main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### App.jsx
```jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
```

### Navbar.jsx
```jsx
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
        About
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
        Contact
      </NavLink>
    </nav>
  )
}
```

### PostPage.jsx (Dynamic Route)
```jsx
import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, loading } = useFetch(`/api/posts/${id}`)

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to="/">← Home</Link>
    </div>
  )
}
```

### NotFoundPage.jsx (404)
```jsx
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}
```

---

## 📝 Quick Reference

### Setup
```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom'
```

### Route Definition
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/user/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Navigation
```jsx
// Link
<Link to="/about">About</Link>

// NavLink with active styling
<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>

// Programmatic
const navigate = useNavigate()
navigate('/about')
navigate(-1)
```

### Parameters
```jsx
// URL parameters
const { id } = useParams()

// Query parameters
const [searchParams, setSearchParams] = useSearchParams()
const query = searchParams.get('q')
```

---

## ✅ Day 39 Checklist

- [ ] Install react-router-dom
- [ ] Wrap app with BrowserRouter
- [ ] Define routes with Routes and Route
- [ ] Create navigation with Link
- [ ] Style active links with NavLink
- [ ] Implement programmatic navigation with useNavigate
- [ ] Extract URL parameters with useParams
- [ ] Create 404 page for unknown routes
- [ ] Build Blog with Routing project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **BrowserRouter must wrap your entire app** - usually in main.jsx
2. **Use `Link` instead of `<a>` tags** - prevents full page reloads
3. **`NavLink` provides `isActive` state** - perfect for active styling
4. **`useNavigate` for programmatic navigation** - go back, forward, or to specific routes
5. **`useParams` extracts URL parameters** - like :id from /post/:id
6. **`useSearchParams` for query strings** - like ?q=search&page=2
7. **Always include a 404 route** - `path="*"` catches unknown URLs
8. **The `end` prop prevents partial matching** - important for root routes

