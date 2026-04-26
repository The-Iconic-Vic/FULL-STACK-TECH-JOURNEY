# 📚 Day 35 Resources - Week 5 Capstone Project

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Components and Props | https://react.dev/learn/your-first-component |
| React: State Management | https://react.dev/learn/managing-state |
| React: useState Reference | https://react.dev/reference/react/useState |
| React: useMemo Reference | https://react.dev/reference/react/useMemo |
| React: useEffect Reference | https://react.dev/reference/react/useEffect |
| React: Custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks |
| React: CSS Modules | https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/ |
| MDN: localStorage | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| MDN: JSON.stringify | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Full Stack Todo App | https://youtu.be/2wCpkOk2uCg |
| React Todo App Tutorial | https://youtu.be/rh3gQmT9X2k |
| Custom Hooks Tutorial | https://youtu.be/6ThXsUwLWvc |
| Dark Mode in React | https://youtu.be/6NtNy28wIos |
| Export/Import JSON in React | https://youtu.be/01YKQ0tJFtE |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Debugging, React DevTools | Built into Chrome |
| Vite | Build tool | https://vitejs.dev |
| React DevTools | Inspect component tree | Chrome Web Store |
| JSON Formatter | View exported JSON | https://jsonformatter.org |

## 📝 React Patterns Summary

### Custom Hook Pattern
```javascript
function useLocalStorage(key, initialValue) {
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

### useMemo for Performance
```javascript
const filteredAndSorted = useMemo(() => {
  let result = [...todos]
  // filter and sort logic
  return result
}, [todos, filter, sortBy, searchTerm])
```

### Conditional Class Names
```javascript
<div className={`${styles.item} ${isCompleted ? styles.completed : ''}`}>
```

### Dark Mode Pattern
```javascript
const [theme, setTheme] = useLocalStorage('theme', 'light')

useEffect(() => {
  document.body.className = theme
}, [theme])
```

## ✅ Capstone Checklist

### Planning Phase
- [ ] Design component tree
- [ ] Plan state structure
- [ ] Identify props needed
- [ ] Decide styling approach

### Development Phase
- [ ] Create Header component
- [ ] Create StatsDashboard
- [ ] Create TodoForm
- [ ] Create FilterBar
- [ ] Create TodoList
- [ ] Create TodoItem
- [ ] Create ExportImport
- [ ] Add localStorage persistence
- [ ] Add dark/light theme
- [ ] Add bulk delete
- [ ] Add search functionality
- [ ] Make responsive

### Testing Phase
- [ ] Test all CRUD operations
- [ ] Test filter, sort, search
- [ ] Test localStorage persistence
- [ ] Test dark mode
- [ ] Test export/import
- [ ] Test responsive layout
- [ ] Test edge cases (empty states)

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| State not persisting | No localStorage | Add `useLocalStorage` hook |
| Filter not updating | Missing dependency in useMemo | Add filter to dependency array |
| Dark mode not persisting | Not saving to localStorage | Save theme preference |
| Search not working | Case-sensitive | Use `.toLowerCase()` |
| Bulk delete not updating | State mutation | Use `filter()` immutably |
| JSON import fails | Invalid format | Validate JSON before parsing |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React Performance Optimization | https://react.dev/learn/render-and-commit |
| Advanced React Patterns | https://react.dev/learn/keeping-components-pure |
| Compound Components | https://react.dev/learn/passing-props-to-a-component |
| Render Props Pattern | https://react.dev/learn/reusing-logic-with-render-props |
