# 📅 Day 37: Fetching Data in React

**Date:** April 28, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Fetching Data, useEffect, Loading/Error States, AbortController

---

## 📋 Learning Objectives

- ✅ Fetch data inside useEffect on component mount
- ✅ Use async/await inside useEffect (define async function inside)
- ✅ Handle loading and error states
- ✅ Store fetched data in state
- ✅ Show loading spinner/skeleton while fetching
- ✅ Display error messages with retry button
- ✅ Show empty state for no results
- ✅ Cancel fetch when component unmounts with AbortController
- ✅ Prevent state updates on unmounted components

---

## 🌐 Part 1: Fetching on Component Mount

### Basic Data Fetch Pattern

```jsx
import { useState, useEffect } from 'react'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

---

### Async/Await Inside useEffect

Since useEffect cannot be async directly, define an async function inside.

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true)
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])
```

**Why can't useEffect be async directly?**

```jsx
// ❌ This doesn't work - useEffect must return nothing or cleanup function
useEffect(async () => {
  const data = await fetchData()
  setData(data)
}, [])

// ✅ Correct - async function inside
useEffect(() => {
  async function fetchData() {
    const data = await fetchData()
    setData(data)
  }
  fetchData()
}, [])
```

---

### Complete Data Fetch Pattern

```jsx
function DataFetcher({ url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />

  return <DataDisplay data={data} />
}
```

---

## 🎨 Part 2: Loading & Error UI

### Loading States

**Basic Spinner:**
```jsx
function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  )
}
```

**Loading Skeleton:**
```jsx
function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array(count).fill().map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
        </div>
      ))}
    </div>
  )
}
```

```css
.skeleton-card {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton-title {
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
}

.skeleton-text {
  height: 14px;
  background: #e0e0e0;
  border-radius: 4px;
}
```

---

### Error States

```jsx
function ErrorState({ error, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Failed to Load Data</h3>
      <p>{error}</p>
      <button onClick={onRetry} className="retry-btn">
        🔄 Try Again
      </button>
    </div>
  )
}
```

---

### Empty States

```jsx
function EmptyState({ message, onClear }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>No Results Found</h3>
      <p>{message}</p>
      <button onClick={onClear} className="clear-btn">
        Clear Search
      </button>
    </div>
  )
}
```

---

### Conditional Rendering Pattern

```jsx
function UserDirectory() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState error={error} onRetry={fetchUsers} />
  if (users.length === 0) return <EmptyState />

  return <UserGrid users={users} />
}
```

---

## 🛑 Part 3: AbortController

### Why AbortController?

When a component unmounts while a fetch is in progress, you get a warning:

```
Warning: Can't perform a React state update on an unmounted component.
```

AbortController lets you cancel the fetch to prevent this.

---

### Basic AbortController Usage

```jsx
useEffect(() => {
  const controller = new AbortController()

  async function fetchData() {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      })
      const data = await response.json()
      setData(data)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    }
  }

  fetchData()

  return () => controller.abort()
}, [url])
```

---

### Complete AbortController Pattern

```jsx
function SearchComponent({ query }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) return

    const controller = new AbortController()

    async function fetchResults() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        setResults(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchResults()

    return () => controller.abort()
  }, [query])

  return (
    <div>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      {results.map(result => <ResultItem key={result.id} {...result} />)}
    </div>
  )
}
```

---

### Race Condition Prevention

Without AbortController, fast typing can cause race conditions (later requests may finish before earlier ones).

```jsx
// ❌ Potential race condition
useEffect(() => {
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => setResults(data))
}, [query]) // If query changes rapidly, responses may come out of order

// ✅ AbortController prevents race conditions
useEffect(() => {
  const controller = new AbortController()

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setResults(data))
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err)
    })

  return () => controller.abort()
}, [query])
```

---

## 📝 Quick Reference

### Data Fetching Pattern

```jsx
useEffect(() => {
  const controller = new AbortController()

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setData(data)
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
  return () => controller.abort()
}, [url])
```

### Loading States

| Type | Use When |
|------|----------|
| Spinner | Simple loading indication |
| Skeleton | Better UX, shows layout |
| Progress bar | Long operations |

### Error States

| Type | Use When |
|------|----------|
| Toast | Non-critical errors |
| Inline message | Form errors |
| Full page | Critical failures |

### Conditional Rendering Order

```jsx
if (loading) return <Loading />
if (error) return <Error onRetry={retry} />
if (!data.length) return <Empty />
return <Data />
```

---

## ✅ Day 37 Checklist

- [ ] Fetch data inside useEffect on component mount
- [ ] Use async/await inside useEffect (define async function inside)
- [ ] Handle loading state with spinner or skeleton
- [ ] Handle error state with message and retry button
- [ ] Store fetched data in state
- [ ] Show empty state for no results
- [ ] Implement AbortController to cancel fetch on unmount
- [ ] Prevent state updates on unmounted components
- [ ] Build User Directory project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Fetch inside useEffect** - with empty dependency array for initial load
2. **Use async function inside useEffect** - cannot make useEffect async directly
3. **Three states to manage** - loading, error, data
4. **Always show loading feedback** - users need to know something is happening
5. **Error messages should have retry option** - empowers users to recover
6. **AbortController prevents memory leaks** - cancel fetch on unmount
7. **Check for AbortError** - don't treat cancellation as error
8. **Conditional rendering order matters** - loading → error → empty → data

