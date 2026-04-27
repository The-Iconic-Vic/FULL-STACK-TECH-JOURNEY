# 📘 React useEffect Reference

## What is useEffect?

useEffect is a React Hook that lets you synchronize a component with external systems (side effects).

```jsx
import { useEffect } from 'react'

function Component() {
  useEffect(() => {
    // Side effect code here
    console.log('This runs after render')
  })
}
```

---

## useEffect Syntax

```jsx
useEffect(setup, dependencies?)
```

| Parameter | Description |
|-----------|-------------|
| `setup` | Function containing the side effect code |
| `dependencies` | Optional array of values that trigger re-run |

---

## Dependency Array Patterns

### No Dependency Array - Runs After Every Render

```jsx
useEffect(() => {
  console.log('Runs after EVERY render')
})
```

**Use case:** Rarely used - can cause performance issues

---

### Empty Array `[]` - Runs Once After Mount

```jsx
useEffect(() => {
  console.log('Runs only once after component mounts')
  loadInitialData()
  setupSubscription()
}, [])
```

**Use cases:**
- Fetch initial data from API
- Load data from localStorage
- Set up event listeners
- Initialize third-party libraries

---

### With Values - Runs When Dependencies Change

```jsx
useEffect(() => {
  console.log('Count changed to:', count)
  localStorage.setItem('count', count)
  document.title = `Count: ${count}`
}, [count])

// Multiple dependencies
useEffect(() => {
  console.log('Count OR name changed')
}, [count, name])
```

**Use cases:**
- Save to localStorage
- Update document title
- Filter data
- Fetch data when search term changes

---

## Cleanup Functions

Return a function from useEffect to clean up.

```jsx
useEffect(() => {
  // Setup
  const intervalId = setInterval(() => {
    console.log('Tick')
  }, 1000)

  // Cleanup - runs before next effect and on unmount
  return () => {
    clearInterval(intervalId)
  }
}, [])
```

### When Cleanup Runs

```jsx
function Demo() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Setup - count:', count)

    return () => {
      console.log('Cleanup - count:', count)
    }
  }, [count])

  // Initial mount: "Setup - count: 0"
  // Click increment: "Cleanup - count: 0" then "Setup - count: 1"
  // Unmount: "Cleanup - count: 1"
}
```

---

## Common Side Effects and Cleanup

### Timers (setInterval / setTimeout)

```jsx
// setInterval
useEffect(() => {
  const intervalId = setInterval(() => {
    setSeconds(prev => prev + 1)
  }, 1000)

  return () => clearInterval(intervalId)
}, [])

// setTimeout
useEffect(() => {
  const timeoutId = setTimeout(() => {
    console.log('Delayed action')
  }, 1000)

  return () => clearTimeout(timeoutId)
}, [])
```

### Event Listeners

```jsx
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

### API Calls with AbortController

```jsx
useEffect(() => {
  const abortController = new AbortController()

  async function fetchData() {
    try {
      const response = await fetch(url, {
        signal: abortController.signal
      })
      const data = await response.json()
      setData(data)
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error)
      }
    }
  }

  fetchData()

  return () => abortController.abort()
}, [url])
```

### localStorage

```jsx
// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('key')
  if (saved) {
    setValue(JSON.parse(saved))
  }
}, [])

// Save on change
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(value))
}, [value])
```

### Document Title

```jsx
useEffect(() => {
  document.title = title
}, [title])
```

### Subscription (e.g., WebSocket)

```jsx
useEffect(() => {
  const socket = new WebSocket('wss://example.com')

  socket.onmessage = (event) => {
    setMessage(event.data)
  }

  return () => {
    socket.close()
  }
}, [])
```

---

## Common Mistakes and Solutions

### Mistake 1: Infinite Loop

```jsx
// ❌ INFINITE LOOP
function Bad() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1)  // Updates state → effect reruns
  }) // No dependencies

  return <div>{count}</div>
}

// ✅ FIX
function Good() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 10) {
      setCount(count + 1)
    }
  }, [count]) // Only runs when count changes

  return <div>{count}</div>
}
```

### Mistake 2: Object Dependency

```jsx
// ❌ Object creates new reference each render
function Bad({ user }) {
  useEffect(() => {
    fetchData(user)
  }, [user]) // Runs on every render!

  return <div>...</div>
}

// ✅ FIX - use primitive values
function Good({ user }) {
  useEffect(() => {
    fetchData(user)
  }, [user.id]) // Only depends on ID

  return <div>...</div>
}
```

### Mistake 3: Function Dependency

```jsx
// ❌ Function creates new reference each render
function Bad() {
  const fetchData = () => { /* ... */ }

  useEffect(() => {
    fetchData()
  }, [fetchData]) // Runs on every render!

  return <div>...</div>
}

// ✅ FIX - use useCallback
function Good() {
  const fetchData = useCallback(() => {
    /* ... */
  }, []) // Stable reference

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <div>...</div>
}
```

### Mistake 4: Missing Dependency

```jsx
// ❌ Missing dependency
function Bad({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, []) // userId missing - effect won't update when userId changes

  return <div>{user?.name}</div>
}

// ✅ FIX - add dependency
function Good({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId]) // Re-fetch when userId changes

  return <div>{user?.name}</div>
}
```

### Mistake 5: Unnecessary Dependencies

```jsx
// ❌ Unnecessary dependency
function Bad() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count, name]) // name is not used in effect!

  return <div>...</div>
}

// ✅ FIX - remove unnecessary dependency
function Good() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count]) // Only depends on what it uses

  return <div>...</div>
}
```

---

## Multiple Effects

You can have multiple useEffect hooks in one component. They run in order.

```jsx
function Component() {
  useEffect(() => {
    console.log('Effect 1 runs first')
  }, [])

  useEffect(() => {
    console.log('Effect 2 runs second')
  }, [])

  useEffect(() => {
    console.log('Effect 3 runs third')
  }, [])

  return <div>...</div>
}
```

---

## Conditional Effects

You cannot conditionally call useEffect (Rules of Hooks). Instead, put condition inside.

```jsx
// ❌ Cannot conditionally call useEffect
if (condition) {
  useEffect(() => { ... }, [])
}

// ✅ Put condition inside
useEffect(() => {
  if (condition) {
    // do something
  }
}, [condition])
```

---

## useEffect vs useLayoutEffect

| Feature | useEffect | useLayoutEffect |
|---------|-----------|-----------------|
| Timing | After paint (async) | Before paint (sync) |
| Use case | Most side effects | DOM measurements, preventing flicker |
| Performance | Better | Can block painting |

```jsx
useLayoutEffect(() => {
  // Runs synchronously before browser paints
  // Use for measuring DOM elements
  const height = elementRef.current.offsetHeight
}, [])
```

---

## Debugging useEffect

```jsx
function DebugExample({ userId }) {
  useEffect(() => {
    console.log('Effect ran - userId:', userId)

    return () => {
      console.log('Effect cleaned up - userId:', userId)
    }
  }, [userId])

  return <div>Check console</div>
}
```

---

## Performance Tips

```jsx
// ❌ BAD: Creating new object in dependency
useEffect(() => {
  fetchData({ id: userId })
}, [{ id: userId }]) // New object each render!

// ✅ GOOD: Use primitive value
useEffect(() => {
  fetchData({ id: userId })
}, [userId]) // Stable primitive

// ❌ BAD: Effect runs on every keystroke
useEffect(() => {
  searchAPI(searchTerm)
}, [searchTerm])

// ✅ GOOD: Debounce the search
useEffect(() => {
  const timeoutId = setTimeout(() => {
    searchAPI(searchTerm)
  }, 500)

  return () => clearTimeout(timeoutId)
}, [searchTerm])
```

---

## Complete Example

```jsx
function DocumentTitleUpdater() {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // Effect 1: Load saved title on mount
  useEffect(() => {
    const saved = localStorage.getItem('title')
    if (saved) setTitle(saved)
  }, [])

  // Effect 2: Update document title
  useEffect(() => {
    if (title) {
      document.title = title
      localStorage.setItem('title', title)
    }
  }, [title])

  // Effect 3: Time interval with cleanup
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Effect 4: Log mount/unmount
  useEffect(() => {
    console.log('Component mounted')
    return () => console.log('Component unmounted')
  }, [])

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <p>Current time: {time}</p>
    </div>
  )
}
