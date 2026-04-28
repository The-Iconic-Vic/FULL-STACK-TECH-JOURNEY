# 📘 React Fetching Data Reference

## Basic Data Fetch Pattern

### Fetch on Component Mount

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

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

---

## Async/Await Pattern

```jsx
import { useState, useEffect } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch('https://api.example.com/data')
        
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
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />

  return <DataDisplay data={data} />
}
```

---

## Fetch with Dependencies (Re-fetch on Change)

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) return

    async function search() {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${query}`)
        const data = await response.json()
        setResults(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [query]) // Re-fetch when query changes

  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {results.map(result => <Result key={result.id} {...result} />)}
    </div>
  )
}
```

---

## AbortController Pattern

### Basic AbortController

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
      {error && <Error message={error} onRetry={() => fetchResults()} />}
      {results.map(result => <ResultItem key={result.id} {...result} />)}
      {!loading && !error && results.length === 0 && <EmptyState />}
    </div>
  )
}
```

---

## Loading States

### Basic Spinner

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

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Loading Skeleton

```jsx
function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array(count).fill().map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
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
  margin-bottom: 10px;
}

.skeleton-text {
  height: 14px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-text.short {
  width: 60%;
}
```

---

## Error States

### Basic Error Component

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

### Inline Error Message

```jsx
function InlineError({ message, onClose }) {
  return (
    <div className="inline-error">
      <span>⚠️ {message}</span>
      <button onClick={onClose}>×</button>
    </div>
  )
}
```

---

## Empty States

```jsx
function EmptyState({ message, onClear, onRefresh }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>No Results Found</h3>
      <p>{message}</p>
      <div className="empty-actions">
        <button onClick={onClear} className="clear-btn">Clear Search</button>
        <button onClick={onRefresh} className="refresh-btn">Refresh</button>
      </div>
    </div>
  )
}
```

---

## Complete Data Fetch Hook (Custom Hook)

```jsx
import { useState, useEffect, useCallback } from 'react'

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    const controller = new AbortController()

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

    return () => controller.abort()
  }, [url, options])

  useEffect(() => {
    const cleanup = refetch()
    return () => {
      if (cleanup && typeof cleanup === 'function') cleanup()
    }
  }, [refetch])

  return { data, loading, error, refetch }
}

// Usage
function UserList() {
  const { data: users, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/users')

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState error={error} onRetry={refetch} />
  
  return users.map(user => <UserCard key={user.id} user={user} />)
}
```

---

## Conditional Rendering Order

```jsx
function DataView() {
  const { data, loading, error } = useFetch('/api/data')

  // Order matters: loading first, then error, then empty, then data
  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorState error={error} />
  if (!data || data.length === 0) return <EmptyState />
  
  return <DataDisplay data={data} />
}
```

---

## Preventing Race Conditions

```jsx
function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return

    let isActive = true
    const controller = new AbortController()

    async function search() {
      try {
        const response = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        })
        const data = await response.json()
        if (isActive) {
          setResults(data)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isActive) {
          console.error(err)
        }
      }
    }

    search()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [query])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}
```

---

## API Response Handling

```javascript
// Check response.ok
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`)
}

// Handle different status codes
switch(response.status) {
  case 404:
    throw new Error('Resource not found')
  case 401:
    throw new Error('Please log in')
  case 429:
    throw new Error('Rate limit exceeded')
  case 500:
    throw new Error('Server error')
  default:
    throw new Error(`HTTP ${response.status}`)
}
```

---

## Retry Logic

```jsx
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
    }
  }
}
```

---

## Best Practices Summary

| Practice | Why |
|----------|-----|
| Use AbortController | Prevents memory leaks |
| Check response.ok | HTTP errors don't throw |
| Handle loading state | User feedback |
| Handle error state | User can retry |
| Show empty state | Clear communication |
| Use dependency array | Controls when effect runs |
| Extract fetch logic | Reusability |
| Use async function inside useEffect | Proper syntax |
