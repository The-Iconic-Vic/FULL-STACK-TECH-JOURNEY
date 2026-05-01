# 📚 Day 40 Resources - Context API

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Passing Data Deeply with Context | https://react.dev/learn/passing-data-deeply-with-context |
| React: useContext Reference | https://react.dev/reference/react/useContext |
| React: createContext Reference | https://react.dev/reference/react/createContext |
| React: Scoping Context with Providers | https://react.dev/learn/passing-data-deeply-with-context#using-and-providing-context-from-the-same-component |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| React Context API Tutorial | https://youtu.be/5LrDIWkK_Bc |
| useContext Hook Explained | https://youtu.be/5LrDIWkK_Bc |
| Shopping Cart with Context | https://youtu.be/2wCpkOk2uCg |
| Theme Switcher with Context | https://youtu.be/6NtNy28wIos |

## 📝 Context API Cheatsheet

### Create Context
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

## ✅ Common Context Examples

### Theme Context
```jsx
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggle = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### Auth Context
```jsx
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Cart Context
```jsx
const CartContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  
  const addToCart = (item) => {
    setCart(prev => [...prev, item])
  }
  
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Context value is undefined | Missing Provider | Wrap app with Provider |
| Components not re-rendering | Value reference not changing | Create new object reference |
| Too many re-renders | All consumers re-render | Split contexts |
| `useContext` returns undefined | Used outside Provider | Add error check in custom hook |
| Performance issues | Large context object | Split into smaller contexts |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Context vs Redux | https://react.dev/learn/scaling-up-with-reducer-and-context |
| Avoiding Deep Re-renders | https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions |
| Context DevTools | https://react.dev/learn/react-developer-tools |
