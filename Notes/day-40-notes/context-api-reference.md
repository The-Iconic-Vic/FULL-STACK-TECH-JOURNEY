# 📘 Context API Reference

## What is the Context API?

Context provides a way to share data across the component tree without passing props manually at every level. It solves the "prop drilling" problem.

```
Without Context (Prop Drilling)
App -> Layout -> Header -> Navbar -> UserMenu -> Avatar
      (user)    (user)    (user)    (user)     (user)

With Context
App (Provider)
  └── Avatar (Consumer - direct access!)
```

---

## Core API

### createContext()

Creates a Context object.

```jsx
import { createContext } from 'react'

// Without default value
const ThemeContext = createContext()

// With default value
const ThemeContext = createContext('light')
```

**Returns:** An object with `Provider` and `Consumer` properties.

---

### Provider

Makes context value available to all descendants.

```jsx
<ThemeContext.Provider value="dark">
  <ThemedComponent />
</ThemeContext.Provider>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `value` | any | The value to pass to consumers |

**Rules:**
- Every Provider can only be used with its matching Context
- Components read context from the nearest matching Provider ancestor
- If no Provider is found, the default value from createContext() is used

---

### useContext

Consumes context value.

```jsx
import { useContext } from 'react'

function ThemedComponent() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>Content</div>
}
```

**Returns:** The current context value from the nearest Provider.

---

## Complete Example

### Step 1: Create Context
```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### Step 2: Wrap App with Provider
```jsx
// App.jsx
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <MainContent />
    </ThemeProvider>
  )
}
```

### Step 3: Consume Context
```jsx
// components/Navbar.jsx
import { useTheme } from '../contexts/ThemeContext'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </nav>
  )
}
```

---

## Common Context Patterns

### 1. Theme Context
```jsx
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 2. Auth Context
```jsx
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser(token).then(setUser).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const user = await api.login(email, password)
    setUser(user)
    localStorage.setItem('token', user.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### 3. Cart Context
```jsx
const CartContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}
```

---

## Multiple Contexts

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

function AppContent() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { totalItems } = useCart()
  const { t } = useLanguage()
  
  return (
    <div className={theme}>
      <h1>{t('welcome')}, {user?.name}</h1>
      <p>Cart items: {totalItems}</p>
    </div>
  )
}
```

---

## Performance Optimization

### Problem: Context Re-renders All Consumers

When context value changes, ALL components using that context re-render.

```jsx
// ❌ Bad - one context for everything
const AppContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [cart, setCart] = useState([])
  
  // Any state change re-renders ALL consumers
  return (
    <AppContext.Provider value={{ user, theme, cart, setUser, setTheme, setCart }}>
      <AppContent />
    </AppContext.Provider>
  )
}
```

### Solution 1: Split Contexts

```jsx
// ✅ Good - separate contexts
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </AuthProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
```

### Solution 2: Memoize Context Value

```jsx
function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const value = useMemo(() => ({
    cart,
    addToCart: (product) => {},
    removeFromCart: (id) => {},
    totalItems: cart.reduce((sum, i) => sum + i.quantity, 0)
  }), [cart])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
```

### Solution 3: Split Provider Values

```jsx
// Instead of one object with everything
<ThemeContext.Provider value={{ theme, setTheme }}>

// Split into separate contexts
<ThemeValueContext.Provider value={theme}>
  <ThemeSetterContext.Provider value={setTheme}>
```

---

## When to Use Context

| Use Context | Use Props Instead |
|-------------|-------------------|
| Theme (dark/light mode) | Parent to child communication |
| User authentication | Simple component trees |
| Shopping cart | Non-reusable components |
| Language/i18n | Static data |
| Global notifications | Form state (use local state) |

---

## Context vs Redux

| Feature | Context | Redux |
|---------|---------|-------|
| Setup | Simple | Complex |
| Performance | Can cause many re-renders | Optimized |
| DevTools | Basic | Excellent |
| Middleware | No | Yes (thunk, saga) |
| Best for | Small to medium apps | Large apps with complex state |

---

## Debugging Context

### React DevTools
- Context providers appear in component tree
- Can inspect current context values
- Shows which components are consuming context

### Custom Hook with Debugging
```jsx
function useTheme() {
  const context = useContext(ThemeContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!context) {
      console.warn('useTheme must be used within ThemeProvider')
    }
  }
  return context
}
```

---

## Common Mistakes

| Mistake | Solution |
|---------|----------|
| Not providing fallback | Add error in custom hook |
| One context for everything | Split into multiple contexts |
| Not memoizing value | Use useMemo |
| Overusing context | Use props for simple cases |
| Missing Provider | Wrap app with Provider |
| Default value misused | Provider overrides default |
