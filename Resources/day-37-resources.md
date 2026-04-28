# 📚 Day 37 Resources - Fetching Data in React

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Fetching Data | https://react.dev/learn/you-might-not-need-an-effect#fetching-data |
| React: useEffect | https://react.dev/reference/react/useEffect |
| MDN: Fetch API | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |
| MDN: AbortController | https://developer.mozilla.org/en-US/docs/Web/API/AbortController |
| JSONPlaceholder API | https://jsonplaceholder.typicode.com |
| MDN: async/await | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Data Fetching in React | https://youtu.be/1yAfGIR3ZVQ |
| useEffect with Fetch | https://youtu.be/0ZJgIjIuY5U |
| Loading Skeletons | https://youtu.be/3eR3B9yOaE8 |
| AbortController Tutorial | https://youtu.be/Aj3R0Gsz8TQ |

## 📝 Data Fetching Cheatsheet

### Basic Fetch on Mount
```jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setError(err))
}, [])
```

### Async/Await in useEffect
```jsx
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch('/api/data')
      const data = await res.json()
      setData(data)
    } catch (err) {
      setError(err)
    }
  }
  fetchData()
}, [])
```

### With AbortController
```jsx
useEffect(() => {
  const controller = new AbortController()
  
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err)
    })
  
  return () => controller.abort()
}, [])
```

## ✅ Loading State Patterns

| Pattern | Use Case |
|---------|----------|
| `if (loading) return <Spinner />` | Simple loading |
| Skeleton UI | Better UX, shows layout |
| Progress bar | Long operations |
| Skeletons with animation | Polished feel |

## 🛠️ Free APIs for Practice

| API | Endpoint | Description |
|-----|----------|-------------|
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/users` | Fake users |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/posts` | Fake posts |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/comments` | Fake comments |
| Random User | `https://randomuser.me/api/` | Random user data |
| Dog CEO | `https://dog.ceo/api/breeds/image/random` | Random dog images |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Infinite loop | No dependency array | Add `[]` or proper deps |
| State update on unmounted component | Fetch completes after unmount | Use AbortController |
| CORS error | API doesn't allow cross-origin | Use proxy or CORS-enabled API |
| Loading stuck at true | No error handling | Add catch/finally |
| useEffect can't be async | Wrong syntax | Define async inside |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React Query (TanStack Query) | https://tanstack.com/query/latest |
| SWR (stale-while-revalidate) | https://swr.vercel.app |
| Error Boundaries | https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary |

