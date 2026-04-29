# 📚 Day 38 Resources - Custom Hooks

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Reusing Logic with Custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks |
| React: Built-in Hooks | https://react.dev/reference/react |
| React: Hook Rules | https://react.dev/warnings/invalid-hook-call-warning |
| React: Custom Hook Examples | https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Custom Hooks Tutorial | https://youtu.be/6ThXsUwLWvc |
| useFetch Custom Hook | https://youtu.be/1yAfGIR3ZVQ |
| useLocalStorage Hook | https://youtu.be/01YKQ0tJFtE |
| Advanced Custom Hooks | https://youtu.be/6opKJ6ZtTME |

## 📝 Custom Hook Cheatsheet

### Basic Template
```jsx
function useCustomHook(initialValue) {
  const [state, setState] = useState(initialValue)
  
  const doSomething = useCallback(() => {
    // logic
  }, [])
  
  useEffect(() => {
    // side effects
  }, [state])
  
  return { state, doSomething }
}
```

### Common Hooks

| Hook | Returns | Use Case |
|------|---------|----------|
| `useToggle` | `[value, toggle, setTrue, setFalse]` | Boolean toggles |
| `useLocalStorage` | `[storedValue, setValue]` | Persist data |
| `useFetch` | `{ data, loading, error, refetch }` | API calls |
| `useWindowSize` | `{ width, height }` | Responsive layouts |
| `useDebounce` | `debouncedValue` | Search inputs |
| `usePrevious` | `previousValue` | Compare changes |
| `useInterval` | - | Timers |
| `useEventListener` | - | Global events |

## ✅ Custom Hook Rules Summary

| Rule | Example |
|------|---------|
| Start with `use` | `useToggle`, `useFetch` |
| Call hooks at top level | No conditions, loops |
| Return values, not JSX | `return { data }` |
| Can call other hooks | `useState`, `useEffect` |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Hook not working | Missing `use` prefix | Rename to `useSomething` |
| Infinite loop | Missing dependency array | Add proper dependencies |
| Stale closure | Missing dependencies | Include all used values |
| Multiple renders | New function each render | Use `useCallback` |
| Not updating | Missing effect cleanup | Return cleanup function |

## 🎯 Practice Exercise

### Create a useForm Hook

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }, [])
  
  const handleSubmit = useCallback((callback) => {
    return (e) => {
      e.preventDefault()
      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length === 0) {
        callback(values)
      } else {
        setErrors(validationErrors)
      }
    }
  }, [values])
  
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])
  
  return { values, errors, handleChange, handleSubmit, reset }
}
```

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React Hooks Library | https://github.com/react-hookz/web |
| Awesome React Hooks | https://github.com/rehooks/awesome-react-hooks |
| useHooks.com | https://usehooks.com |
| Testing Custom Hooks | https://react-hooks-testing-library.com |

