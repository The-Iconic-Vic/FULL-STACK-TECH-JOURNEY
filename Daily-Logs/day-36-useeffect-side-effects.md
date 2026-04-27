# 📅 Day 36: useEffect Hook - Side Effects in React

**Date:** April 27, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** useEffect Fundamentals, Dependency Array, Cleanup Functions

---

## 📋 Learning Objectives

- ✅ Understand what side effects are in React
- ✅ Use useEffect syntax: `useEffect(() => {}, [dependencies])`
- ✅ Know that effects run after render by default
- ✅ Use empty array `[]` for effects that run once after mount
- ✅ Understand dependency array and when effects re-run
- ✅ Avoid common mistakes and infinite loops
- ✅ Return cleanup functions to prevent memory leaks
- ✅ Clean up timers, event listeners, and subscriptions

---

## 🎯 Part 1: useEffect Fundamentals

### What are Side Effects?

Side effects are operations that interact with the outside world or modify something outside the component's scope.

**Examples of Side Effects:**
- API calls (fetching data)
- Timers (setTimeout, setInterval)
- Direct DOM manipulation
- localStorage operations
- Console logging
- Subscribing to external events

```jsx
// ❌ Not a side effect - pure calculation
const doubled = count * 2

// ✅ Side effects - need useEffect
document.title = `Count: ${count}`
localStorage.setItem('count', count)
fetch('/api/data')
setInterval(() => {}, 1000)
```

---

### Why useEffect?

In React, rendering must be pure (no side effects). useEffect allows you to run side effects after React has updated the DOM.

```jsx
import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  // This runs AFTER React updates the DOM
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

---

### useEffect Syntax

```jsx
useEffect(() => {
  // Side effect code here
  // This runs after every render by default
})
```

**Three parts of useEffect:**

| Part | Description |
|------|-------------|
| **Setup function** | The code that runs the side effect |
| **Dependency array** | Controls when the effect runs |
| **Cleanup function** | Optional function returned to clean up |

---

### When useEffect Runs

```jsx
function Component() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // Runs after EVERY render (count OR name changes)
  useEffect(() => {
    console.log('Runs after every render')
  })

  // Runs only ONCE after initial render (mount)
  useEffect(() => {
    console.log('Runs only once - after mount')
  }, [])

  // Runs when 'count' changes
  useEffect(() => {
    console.log('Count changed:', count)
  }, [count])

  // Runs when 'count' OR 'name' changes
  useEffect(() => {
    console.log('Count or name changed')
  }, [count, name])

  return <div>{count}</div>
}
```

---

## 🔗 Part 2: Dependency Array

### Empty Array `[]` - Run Once

```jsx
useEffect(() => {
  // This runs only once after the component mounts
  console.log('Component mounted')
  loadInitialData()
  setupSubscription()
}, [])
```

**Use cases:**
- Fetching initial data from API
- Setting up event listeners
- Loading data from localStorage
- Subscribing to external stores

---

### No Array - Run After Every Render

```jsx
useEffect(() => {
  // This runs after EVERY render
  // ⚠️ Usually a bad idea - can cause performance issues
  console.log('Rendered')
  document.title = `Count: ${count}`
})
```

**Why this is usually bad:**
- Can cause infinite loops (if effect updates state)
- Performance degradation
- Unnecessary repeated operations

---

### With Values - Run When Dependencies Change

```jsx
useEffect(() => {
  // This runs when 'count' changes
  localStorage.setItem('count', count)
}, [count])

useEffect(() => {
  // This runs when 'count' OR 'name' changes
  console.log('Count or name changed')
}, [count, name])

useEffect(() => {
  // This runs when object property changes
  fetchUserData(user.id)
}, [user.id]) // Only depends on the ID, not the whole object
```

---

### Common Mistakes and Infinite Loops

```jsx
// ❌ INFINITE LOOP: effect updates state, state triggers effect
function BadComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1)  // Updates count → effect runs again
  }) // No dependency array = runs after every render

  return <div>{count}</div>
}

// ✅ FIX: Add dependency or condition
function GoodComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 10) {
      setCount(count + 1)
    }
  }, [count]) // Only runs when count changes, stops at 10

  return <div>{count}</div>
}
```

```jsx
// ❌ OBJECT DEPENDENCY causes infinite loop (new object each render)
function BadComponent({ user }) {
  useEffect(() => {
    fetchData(user)
  }, [user]) // user is a new object each render!

  return <div>...</div>
}

// ✅ FIX: Use primitive dependencies
function GoodComponent({ user }) {
  useEffect(() => {
    fetchData(user)
  }, [user.id]) // Only depends on the ID

  return <div>...</div>
}
```

```jsx
// ❌ FUNCTION DEPENDENCY causes infinite loop
function BadComponent() {
  const fetchData = () => { /* ... */ }

  useEffect(() => {
    fetchData()
  }, [fetchData]) // New function each render!

  return <div>...</div>
}

// ✅ FIX: Use useCallback
function GoodComponent() {
  const fetchData = useCallback(() => {
    // fetch logic
  }, []) // Stable reference

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <div>...</div>
}
```

---

## 🧹 Part 3: Cleanup Functions

### Why Cleanup?

Cleanup prevents memory leaks and unwanted behavior when components unmount or before re-running effects.

```jsx
useEffect(() => {
  // Setup code
  const subscription = subscribeToSomething()

  // Cleanup code - runs before next effect and on unmount
  return () => {
    subscription.unsubscribe()
  }
}, [dependencies])
```

---

### Cleaning Up Timers

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Set up timer
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Clean up timer when component unmounts
    return () => {
      clearInterval(intervalId)
      console.log('Timer cleaned up')
    }
  }, []) // Empty array = setup once

  return <div>Seconds: {seconds}</div>
}
```

---

### Cleaning Up Event Listeners

```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div>Window width: {width}</div>
}
```

---

### Cleaning Up API Calls (AbortController)

```jsx
function SearchComponent({ query }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        const response = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        })
        const data = await response.json()
        setResults(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error)
        }
      }
    }

    fetchData()

    // Cancel fetch if component unmounts or query changes
    return () => controller.abort()
  }, [query])

  return <div>{results.map(...)}</div>
}
```

---

### Cleanup Order

```jsx
function EffectOrder() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Effect setup - count:', count)

    return () => {
      console.log('Effect cleanup - count:', count)
    }
  }, [count])

  return <button onClick={() => setCount(c + 1)}>Increment</button>
}

// Initial mount: "Effect setup - count: 0"
// Click increment: "Effect cleanup - count: 0" then "Effect setup - count: 1"
// Unmount: "Effect cleanup - count: 1"
```

---

## 📝 Quick Reference

### useEffect Patterns

| Pattern | Syntax | Use Case |
|---------|--------|----------|
| Run once | `useEffect(fn, [])` | Initial data load, subscriptions |
| Run on change | `useEffect(fn, [dep])` | Save to localStorage, update title |
| Run on multiple | `useEffect(fn, [dep1, dep2])` | Filtered data |
| Run after every render | `useEffect(fn)` | ⚠️ Avoid usually |
| Cleanup | `useEffect(() => { return cleanup }, [])` | Timers, listeners, subscriptions |

### Common Side Effects

| Side Effect | Setup | Cleanup |
|-------------|-------|---------|
| Timer | `setInterval()` | `clearInterval()` |
| Timeout | `setTimeout()` | `clearTimeout()` |
| Event listener | `addEventListener()` | `removeEventListener()` |
| API call | `fetch()` | `AbortController.abort()` |
| Subscription | `subscribe()` | `unsubscribe()` |
| DOM manipulation | Direct DOM access | Reset DOM |

---

## ✅ Day 36 Checklist

- [ ] Understand what side effects are in React
- [ ] Use useEffect to run code after render
- [ ] Use empty array `[]` for one-time effects
- [ ] Add dependencies to control when effects run
- [ ] Avoid infinite loops (don't update state without condition)
- [ ] Return cleanup functions from useEffect
- [ ] Clean up intervals with `clearInterval`
- [ ] Clean up event listeners with `removeEventListener`
- [ ] Build Document Title Updater project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **useEffect runs after render** - not during rendering
2. **Empty array `[]` = run once** after component mounts
3. **Dependencies control when effect re-runs** - only when they change
4. **No array = runs after every render** - usually a bad idea
5. **Always clean up** timers, listeners, and subscriptions
6. **Cleanup runs before next effect** and on unmount
7. **Avoid infinite loops** - don't update state unconditionally
8. **Use primitive dependencies** - objects/functions cause unnecessary re-runs

