# 📅 Day 40: Context API - Solving Prop Drilling

**Date:** May 1, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Context API, Prop Drilling, Provider Pattern, useContext

---

## 📋 Learning Objectives

- ✅ Understand what prop drilling is and why it's a problem
- ✅ Create a Context with `createContext()`
- ✅ Use Provider component to provide values
- ✅ Consume context with `useContext` hook
- ✅ Build theme context for dark/light mode
- ✅ Build shopping cart context for global state
- ✅ Understand performance considerations

---

## 🎯 Part 1: Context API Fundamentals

### What is Prop Drilling?

Prop drilling is passing props through multiple levels of components that don't need the data, just to get it to a deeply nested component.

```jsx
// ❌ Prop Drilling Problem
function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <Layout user={user}>           {/* Level 1 - doesn't need user */}
      <Header user={user}>         {/* Level 2 - doesn't need user */}
        <Navbar user={user}>       {/* Level 3 - doesn't need user */}
          <UserMenu user={user}>   {/* Level 4 - doesn't need user */}
            <Avatar name={user.name} />  {/* Level 5 - NEEDS user */}
          </UserMenu>
        </Navbar>
      </Header>
    </Layout>
  )
}
```

**Problems with Prop Drilling:**
- Components receive props they don't need
- Hard to refactor (change prop name in many places)
- Makes code harder to read and maintain
- Increases complexity

---

### Context API Solution

Context provides a way to share data across the component tree without passing props manually.

```jsx
// ✅ Context API Solution
const UserContext = createContext()

function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <UserContext.Provider value={user}>
      <Layout>
        <Header>
          <Navbar>
            <UserMenu>
              <Avatar />  {/* Can access user directly */}
            </UserMenu>
          </Navbar>
        </Header>
      </Layout>
    </UserContext.Provider>
  )
}

function Avatar() {
  const user = useContext(UserContext)  // Direct access!
  return <img src={user.avatar} alt={user.name} />
}
```

---

### createContext()

Creates a Context object.

```jsx
import { createContext } from 'react'

const ThemeContext = createContext()
const ThemeContext = createContext(defaultValue)  // With default value
```

---

### Provider Component

Every Context object comes with a Provider component that makes the value available to all child components.

```jsx
function App() {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemedComponent />
    </ThemeContext.Provider>
  )
}
```

**Important:** Components will only consume context if they are descendants of the Provider.

---

### useContext Hook

Consumes the context value.

```jsx
import { useContext } from 'react'

function ThemedComponent() {
  const { theme, setTheme } = useContext(ThemeContext)
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}
```

---

### Complete Context Pattern

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

// App.jsx
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
```

---

## 🎨 Part 2: Common Use Cases

### Theme Context

```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
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

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

---

### User Authentication Context

```jsx
// contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      const userData = await response.json()
      setUser(userData)
      localStorage.setItem('token', userData.token)
    } finally {
      setLoading(false)
    }
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

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

---

### Shopping Cart Context

```jsx
// contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

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

  const clearCart = () => setCart([])

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      itemCount: getTotalItems(),
      totalPrice: getTotalPrice()
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

---

### Language/Translation Context

```jsx
// contexts/LanguageContext.jsx
import { createContext, useContext, useState } from 'react'

const translations = {
  en: { welcome: 'Welcome', goodbye: 'Goodbye' },
  es: { welcome: 'Bienvenido', goodbye: 'Adiós' },
  fr: { welcome: 'Bienvenue', goodbye: 'Au revoir' }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
```

---

## ⚡ Part 3: Performance Considerations

### Context Re-renders All Consumers

When a Context value changes, ALL components consuming that context re-render.

```jsx
// ❌ Bad - one context for everything
const AppContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [cart, setCart] = useState([])
  
  // Any change to user, theme, or cart causes ALL consumers to re-render
  return (
    <AppContext.Provider value={{ user, theme, cart, setUser, setTheme, setCart }}>
      <AppContent />
    </AppContext.Provider>
  )
}
```

---

### Splitting Contexts for Different Concerns

```jsx
// ✅ Good - separate contexts for different concerns
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
```

---

### Memoizing Context Value

```jsx
import { useMemo } from 'react'

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const value = useMemo(() => ({
    cart,
    addToCart: () => {},
    removeFromCart: () => {},
    getTotal: () => {}
  }), [cart])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
```

---

### When NOT to Use Context

| Use Props | Use Context |
|-----------|-------------|
| Parent to child communication | Global state (theme, auth, cart) |
| Simple component trees | Deep component trees |
| Non-reusable components | Data needed by many components |
| Static data | State that changes frequently |

---

## 📝 Quick Reference

### Context Creation
```jsx
const MyContext = createContext(defaultValue)
```

### Provider
```jsx
<MyContext.Provider value={value}>
  {children}
</MyContext.Provider>
```

### Consumer (useContext)
```jsx
const value = useContext(MyContext)
```

### Custom Hook Pattern
```jsx
function useMyContext() {
  const context = useContext(MyContext)
  if (!context) throw new Error('Must be used within Provider')
  return context
}
```

---

## ✅ Day 40 Checklist

- [ ] Understand prop drilling problem
- [ ] Create context with createContext()
- [ ] Wrap components with Provider
- [ ] Consume context with useContext
- [ ] Build Theme Context project
- [ ] Build Shopping Cart Context project
- [ ] Split contexts for performance
- [ ] Use custom hooks for contexts
- [ ] Persist context state to localStorage
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Prop drilling** is passing props through components that don't need them
2. **Context provides a way to share data** without passing props manually
3. **createContext()** creates a Context object with Provider and Consumer
4. **Provider component** makes value available to all descendants
5. **useContext hook** consumes the context value
6. **Always create custom hooks** for contexts (useTheme, useCart, useAuth)
7. **Split contexts** for different concerns to optimize performance
8. **Context re-renders all consumers** when value changes
9. **Not everything needs context** - props are fine for shallow trees

