# 📘 Custom Hooks Reference

## What are Custom Hooks?

Custom hooks are JavaScript functions that start with `use` and can call other React hooks. They allow you to extract and reuse component logic across multiple components.

```jsx
// Without custom hook (code duplication)
function ComponentA() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prev => !prev)
  // ...
}

function ComponentB() {
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

function ComponentA() {
  const [isOpen, toggle] = useToggle()
}

function ComponentB() {
  const [isOpen, toggle] = useToggle()
}
```

---

## Rules for Custom Hooks

| Rule | Explanation |
|------|-------------|
| Start with `use` | React uses this to check hook rules |
| Call hooks at top level | No conditions, loops, or nested functions |
| Only call from React functions | Components or other custom hooks |
| Return values, not JSX | Hooks provide logic, not UI |

---

## Common Custom Hooks

### useToggle

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
const [isModalOpen, toggleModal, openModal, closeModal] = useToggle(false)
```

---

### useLocalStorage

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
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

---

### useFetch

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
const { data, loading, error, refetch } = useFetch('/api/users')
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

### useWindowSize

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
const { width, height } = useWindowSize()
const isMobile = width < 768
```

---

### useDebounce

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
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearch = useDebounce(searchTerm, 300)

useEffect(() => {
  if (debouncedSearch) {
    searchAPI(debouncedSearch)
  }
}, [debouncedSearch])
```

---

### usePrevious

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
const [count, setCount] = useState(0)
const prevCount = usePrevious(count)
// prevCount is previous value before the last render
```

---

### useInterval

```jsx
import { useEffect, useRef } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// Usage
useInterval(() => {
  setSeconds(prev => prev + 1)
}, 1000)
```

---

### useEventListener

```jsx
import { useEffect, useRef } from 'react'

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)
    element.addEventListener(eventName, eventListener)
    
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

// Usage
useEventListener('resize', () => {
  console.log('Window resized')
})

useEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
})
```

---

### useMediaQuery

```jsx
import { useState, useEffect } from 'react'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

// Usage
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
const isMobile = useMediaQuery('(max-width: 768px)')
```

---

### useHover

```jsx
import { useState, useRef, useEffect } from 'react'

function useHover() {
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return [ref, isHovering]
}

// Usage
const [hoverRef, isHovering] = useHover()
return <div ref={hoverRef}>{isHovering ? 'Hovering!' : 'Hover me'}</div>
```

---

### useOnClickOutside

```jsx
import { useEffect, useRef } from 'react'

function useOnClickOutside(handler) {
  const ref = useRef(null)

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])

  return ref
}

// Usage
const modalRef = useOnClickOutside(() => closeModal())
return <div ref={modalRef}>Modal content</div>
```

---

## Custom Hook Best Practices

### Do's ✅

```jsx
// 1. Return values, not JSX
function useFetch(url) {
  return { data, loading, error }  // ✅
}

// 2. Keep focused on one thing
function useLocalStorage(key) { }  // ✅

// 3. Use useCallback for functions
const toggle = useCallback(() => {
  setValue(prev => !prev)
}, [])  // ✅

// 4. Handle cleanup
useEffect(() => {
  const id = setInterval(tick, delay)
  return () => clearInterval(id)  // ✅
}, [delay])
```

### Don'ts ❌

```jsx
// 1. Don't return JSX
function useModal() {
  return <div>Modal</div>  // ❌
}

// 2. Don't call hooks conditionally
if (condition) {
  const [value] = useState()  // ❌
}

// 3. Don't call from regular functions
function regularFunction() {
  const [state] = useState()  // ❌
}
```

---

## Testing Custom Hooks

```jsx
// Using React Hooks Testing Library
import { renderHook, act } from '@testing-library/react'
import useToggle from './useToggle'

test('useToggle toggles value', () => {
  const { result } = renderHook(() => useToggle(false))
  
  expect(result.current[0]).toBe(false)
  
  act(() => {
    result.current[1]()
  })
  
  expect(result.current[0]).toBe(true)
})
```

---

## Custom Hook Template

```jsx
import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Brief description of what the hook does
 * @param {type} param1 - Description of param1
 * @returns {type} - Description of return value
 */
function useCustomHook(param1, param2) {
  // State
  const [data, setData] = useState(null)
  
  // Refs
  const ref = useRef(null)
  
  // Callbacks
  const doSomething = useCallback(() => {
    // logic
  }, [param1])
  
  // Effects
  useEffect(() => {
    // side effects
    doSomething()
    
    return () => {
      // cleanup
    }
  }, [doSomething])
  
  // Return values
  return { data, doSomething }
}

export default useCustomHook
