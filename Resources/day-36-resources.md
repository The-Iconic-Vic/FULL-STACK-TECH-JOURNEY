# 📚 Day 36 Resources - useEffect Hook

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: useEffect | https://react.dev/reference/react/useEffect |
| React: Synchronizing with Effects | https://react.dev/learn/synchronizing-with-effects |
| React: You Might Not Need an Effect | https://react.dev/learn/you-might-not-need-an-effect |
| React: Lifecycle of Reactive Effects | https://react.dev/learn/lifecycle-of-reactive-effects |
| React: Separating Events from Effects | https://react.dev/learn/separating-events-from-effects |
| MDN: setInterval | https://developer.mozilla.org/en-US/docs/Web/API/setInterval |
| MDN: AbortController | https://developer.mozilla.org/en-US/docs/Web/API/AbortController |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| useEffect Tutorial | https://youtu.be/0ZJgIjIuY5U |
| useEffect Dependency Array | https://youtu.be/jQc_bFeS9aA |
| Cleanup Functions | https://youtu.be/6ThXsUwLWvc |
| Common useEffect Mistakes | https://youtu.be/QQYeipc_cik |

## 📝 useEffect Cheatsheet

### Basic Syntax
```jsx
useEffect(() => {
  // side effect
}, [dependencies])
```

### Dependency Patterns
| Pattern | Runs |
|---------|------|
| `useEffect(fn)` | After every render |
| `useEffect(fn, [])` | Once after mount |
| `useEffect(fn, [count])` | When count changes |
| `useEffect(fn, [count, name])` | When count OR name changes |

### Cleanup Pattern
```jsx
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe()
}, [])
```

## ✅ Common Patterns

### Fetch Data on Mount
```jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data))
}, [])
```

### Save to localStorage
```jsx
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(value))
}, [value])
```

### Update Document Title
```jsx
useEffect(() => {
  document.title = title
}, [title])
```

### Set Interval with Cleanup
```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)
  return () => clearInterval(intervalId)
}, [])
```

### Event Listener with Cleanup
```jsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

### Fetch with AbortController
```jsx
useEffect(() => {
  const controller = new AbortController()
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err)
    })
  return () => controller.abort()
}, [url])
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Infinite loop | Effect updates state without condition | Add condition or dependency |
| Stale closure | Missing dependency | Add all used values to deps |
| Memory leak | No cleanup | Return cleanup function |
| Effect runs too often | Too many dependencies | Remove unnecessary deps |
| Object dependency | New object each render | Use primitive values |
| Function dependency | New function each render | Use useCallback |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| useReducer Hook | https://react.dev/reference/react/useReducer |
| useCallback Hook | https://react.dev/reference/react/useCallback |
| useMemo Hook | https://react.dev/reference/react/useMemo |
| useRef Hook | https://react.dev/reference/react/useRef |
| Custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks |

