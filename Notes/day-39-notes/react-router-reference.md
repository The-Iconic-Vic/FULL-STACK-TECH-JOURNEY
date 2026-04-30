# 📘 React Router Reference

## Installation

```bash
npm install react-router-dom
```

---

## Core Components

### BrowserRouter
Wraps the entire application to enable routing.

```jsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

### Routes
Container for all Route definitions (replaces Switch in v6).

```jsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
```

### Route
Defines a path and what component to render.

| Prop | Description |
|------|-------------|
| `path` | URL path pattern |
| `element` | Component to render |
| `index` | Index route (default child) |

```jsx
<Route path="/user/:id" element={<UserProfile />} />
<Route index element={<Dashboard />} />
```

---

## Navigation Components

### Link
Replaces `<a>` tags, prevents page reload.

```jsx
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
<Link to="/user/123">User 123</Link>
<Link to="/" replace>Home (replaces history)</Link>
```

### NavLink
Link with active state styling.

```jsx
import { NavLink } from 'react-router-dom'

// Basic
<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
  Home
</NavLink>

// With style object
<NavLink to="/" style={({ isActive }) => ({
  color: isActive ? 'blue' : 'black'
})}>
  Home
</NavLink>

// End prop - prevents partial matching on parent routes
<NavLink to="/" end>Home</NavLink>
```

---

## Navigation Hooks

### useNavigate
Programmatic navigation.

```jsx
import { useNavigate } from 'react-router-dom'

function Component() {
  const navigate = useNavigate()

  // Navigate to route
  navigate('/about')
  
  // Go back/forward
  navigate(-1)  // back
  navigate(1)   // forward
  
  // Replace current entry
  navigate('/home', { replace: true })
  
  // With state
  navigate('/profile', { state: { userId: 123 } })

  return <button onClick={() => navigate('/contact')}>Contact</button>
}
```

### useLocation
Access current location object.

```jsx
import { useLocation } from 'react-router-dom'

function Component() {
  const location = useLocation()
  
  console.log(location.pathname)    // '/about'
  console.log(location.search)      // '?q=react'
  console.log(location.hash)        // '#section'
  console.log(location.state)       // { from: '/home' }
  console.log(location.key)         // 'default'

  return <div>Current path: {location.pathname}</div>
}
```

### useParams
Access URL parameters.

```jsx
import { useParams } from 'react-router-dom'

// Route: /user/:userId/post/:postId
function PostPage() {
  const { userId, postId } = useParams()
  
  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Post ID: {postId}</p>
    </div>
  )
}
```

### useSearchParams
Read and modify query parameters.

```jsx
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Read
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  
  // Update
  const handleSearch = (term) => {
    setSearchParams({ q: term, page: '1' })
  }
  
  // Append multiple
  const applyFilters = (filters) => {
    setSearchParams(prev => {
      prev.set('category', filters.category)
      prev.set('sort', filters.sort)
      return prev
    })
  }
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p>Current page: {page}</p>
    </div>
  )
}
```

---

## Route Parameters

### Path Parameters

```jsx
// Route definition
<Route path="/products/:category/:productId" element={<ProductPage />} />

// Component
function ProductPage() {
  const { category, productId } = useParams()
  // category: "electronics", productId: "123"
}
```

### Optional Parameters (v6.5+)

```jsx
// Optional using ? suffix
<Route path="/products/:category?/:productId?" element={<Products />} />
```

### Catch-all (Splat) Routes

```jsx
// Matches /files, /files/documents, /files/images/logo.png
<Route path="/files/*" element={<FileBrowser />} />

// Component
function FileBrowser() {
  const { "*": splat } = useParams()
  // splat: "documents" or "images/logo.png"
}
```

---

## Nested Routes

```jsx
// App.jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

// Layout.jsx (Outlet renders child routes)
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <header>Header</header>
      <Outlet />  {/* Dashboard, About, or Settings render here */}
      <footer>Footer</footer>
    </div>
  )
}
```

### Outlet
Renders the matched child route component.

```jsx
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

---

## Route Protection (Private Routes)

```jsx
// PrivateRoute component
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
```

---

## Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  )
}
```

---

## Common Patterns

### Active Link with Custom Class

```jsx
<NavLink 
  to="/" 
  className={({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  Home
</NavLink>
```

### Breadcrumbs

```jsx
import { useMatches } from 'react-router-dom'

function Breadcrumbs() {
  const matches = useMatches()
  
  return (
    <div className="breadcrumbs">
      {matches.map((match, i) => (
        <span key={i}>
          <Link to={match.pathname}>
            {match.handle?.crumb}
          </Link>
          {i < matches.length - 1 && ' / '}
        </span>
      ))}
    </div>
  )
}
```

### Return to Previous Page

```jsx
function BackButton() {
  const navigate = useNavigate()
  return <button onClick={() => navigate(-1)}>← Back</button>
}
```

### Scroll to Top on Navigation

```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

// In App.jsx
<BrowserRouter>
  <ScrollToTop />
  <App />
</BrowserRouter>
```

---

## Error Handling

### 404 Not Found

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}
```

### Error Boundary Route

```jsx
<Route 
  path="/" 
  element={<Home />} 
  errorElement={<ErrorPage />}
/>
```

---

## Complete Example

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

// App.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PostPage from './pages/PostPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

// components/Layout.jsx
import { Outlet, NavLink } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

---

## Quick Reference Table

| Component/Hook | Purpose |
|----------------|---------|
| `BrowserRouter` | Enables routing in app |
| `Routes` | Container for Route components |
| `Route` | Defines path-component mapping |
| `Link` | Navigation without page reload |
| `NavLink` | Link with active state |
| `Outlet` | Renders nested routes |
| `useNavigate` | Programmatic navigation |
| `useParams` | Access URL parameters |
| `useLocation` | Access current URL |
| `useSearchParams` | Access/manage query params |
| `Navigate` | Redirect component |
