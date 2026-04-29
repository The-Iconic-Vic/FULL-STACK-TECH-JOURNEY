# 📅 Day 38: Custom Hooks

**Date:** April 29, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Creating Custom Hooks, Reusing Logic, Custom Hook Examples

---

## 📋 Learning Objectives

- ✅ Understand what custom hooks are and when to use them
- ✅ Follow naming convention: `useSomething`
- ✅ Extract repetitive logic into reusable custom hooks
- ✅ Create custom hooks that call other hooks
- ✅ Build common custom hooks (useToggle, useLocalStorage, useFetch, useWindowSize)
- ✅ Understand best practices for custom hooks

---

## 🎣 Part 1: Creating Custom Hooks

### What are Custom Hooks?

Custom hooks are JavaScript functions that start with `use` and can call other React hooks. They allow you to extract component logic into reusable functions.

```jsx
// Without custom hook (repetitive)
function Component1() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prev => !prev)
  // ...
}

function Component2() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prev => !prev)
  // ...
}

// With custom hook (reusable)
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(prev => !prev), [])
  return [value, toggle]
}

function Component1() {
  const [isOpen, toggle] = useToggle()
  // ...
}

function Component2() {
  const [isOpen, toggle] = useToggle()
  // ...
}
```

---

### Naming Convention

Custom hooks **MUST** start with `use` followed by a capital letter.

```jsx
// ✅ Correct
function useLocalStorage() { }
function useFetch() { }
function useWindowSize() { }

// ❌ Wrong
function localstorage() { }
function fetchData() { }
function getWindowSize() { }
```

---

### Custom Hooks Can Call Other Hooks

```jsx
function useLocalStorage(key, initialValue) {
  // ✅ Can call useState and useEffect inside custom hook
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
```

---

### Rules for Custom Hooks

1. **Start with `use`** - React uses this to check for hook rules violations
2. **Call hooks at the top level** - no conditions or loops
3. **Only call hooks from React functions** - components or custom hooks
4. **Return values, not JSX** - custom hooks return data/ functions, not UI

---

## 📦 Part 2: Common Custom Hook Examples

### useToggle - Boolean Toggle

```jsx
import { useState, useCallback } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse]
}

// Usage
function Modal() {
  const [isOpen, toggleModal, openModal, closeModal] = useToggle(false)

  return (
    <>
      <button onClick={openModal}>Open</button>
      {isOpen && (
        <div className="modal">
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  )
}
```

---

### useLocalStorage - Persist State

```jsx
import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16)

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <input 
        type="range" 
        value={fontSize} 
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
    </div>
  )
}
```

---

### useFetch - Reusable Data Fetching

```jsx
import { useState, useEffect, useCallback, useRef } from 'react'

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Usage
function UserList() {
  const { data: users, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  if (loading) return <Spinner />
  if (error) return <Error onRetry={refetch} />

  return users.map(user => <UserCard key={user.id} user={user} />)
}
```

---

### useFetch with Caching

```jsx
const cache = new Map()

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    const cacheKey = `${url}-${JSON.stringify(options)}`
    
    // Check cache first
    if (cache.has(cacheKey)) {
      setData(cache.get(cacheKey))
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      
      // Store in cache
      cache.set(cacheKey, result)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

---

### useWindowSize - Track Window Dimensions

```jsx
import { useState, useEffect } from 'react'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize()
  const isMobile = width < 768

  return (
    <div>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  )
}
```

---

### useDebounce - Debounce Values

```jsx
import { useState, useEffect } from 'react'

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Usage
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearch) {
      searchAPI(debouncedSearch)
    }
  }, [debouncedSearch])

  return (
    <input 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
```

---

### usePrevious - Track Previous Value

```jsx
import { useRef, useEffect } from 'react'

function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// Usage
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>Now: {count}</p>
      <p>Before: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

---

## 📝 Part 3: Best Practices

### Do's ✅

```jsx
// 1. Return values, not JSX
function useFetch(url) {
  return { data, loading, error }  // ✅
}

// 2. Keep focused on one thing
function useLocalStorage(key) { }  // ✅ - handles one key
function useFormValidation() { }    // ✅ - handles validation only

// 3. Use useCallback for functions returned
function useToggle() {
  const [value, setValue] = useState(false)
  const toggle = useCallback(() => setValue(prev => !prev), [])  // ✅
  return [value, toggle]
}

// 4. Handle cleanup
function useInterval(callback, delay) {
  useEffect(() => {
    const id = setInterval(callback, delay)
    return () => clearInterval(id)  // ✅
  }, [callback, delay])
}
```

### Don'ts ❌

```jsx
// 1. Don't return JSX
function useModal() {
  return <div>Modal</div>  // ❌
}

// 2. Don't hook conditionally
function useToggle(condition) {
  if (condition) {
    const [value, setValue] = useState(false)  // ❌
  }
}

// 3. Don't call hooks from regular functions
function regularFunction() {
  const [state, setState] = useState()  // ❌
}
```

---

## 📝 Quick Reference

### Custom Hook Template

```jsx
import { useState, useEffect, useCallback } from 'react'

function useCustomHook(param1, param2) {
  // State
  const [data, setData] = useState(null)

  // Effects
  useEffect(() => {
    // side effects
  }, [param1])

  // Callbacks
  const doSomething = useCallback(() => {
    // logic
  }, [])

  // Return values
  return { data, doSomething }
}
```

### Common Custom Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `useToggle` | Boolean toggle | `[value, toggle]` |
| `useLocalStorage` | Persist state | `[value, setValue]` |
| `useFetch` | Data fetching | `{ data, loading, error, refetch }` |
| `useWindowSize` | Track window | `{ width, height }` |
| `useDebounce` | Debounce values | `debouncedValue` |
| `usePrevious` | Previous value | `previousValue` |

---

## ✅ Day 38 Checklist

- [ ] Understand what custom hooks are
- [ ] Follow naming convention `useSomething`
- [ ] Extract repetitive logic into custom hooks
- [ ] Create useToggle custom hook
- [ ] Create useLocalStorage custom hook
- [ ] Create useFetch custom hook with caching
- [ ] Create useWindowSize custom hook
- [ ] Use custom hooks across multiple components
- [ ] Follow best practices for custom hooks
- [ ] Build Custom Hooks Demo project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Custom hooks start with `use`** - React uses this convention
2. **Extract reusable logic** - Don't repeat yourself
3. **Custom hooks can call other hooks** - useState, useEffect, etc.
4. **Return values, not JSX** - hooks provide logic, not UI
5. **Keep hooks focused** - one responsibility per hook
6. **Use useCallback for returned functions** - prevents unnecessary re-renders
7. **Handle cleanup** - prevent memory leaks
8. **Test hooks independently** - easier to debug

