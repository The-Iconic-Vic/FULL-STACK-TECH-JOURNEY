# 📚 Day 32 Resources - State & Events in React

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: State: A Component's Memory | https://react.dev/learn/state-a-components-memory |
| React: useState Hook | https://react.dev/reference/react/useState |
| React: Responding to Events | https://react.dev/learn/responding-to-events |
| React: Updating State with useState | https://react.dev/learn/updating-state-with-useState |
| React: Forms | https://react.dev/learn/forms |
| React: Hooks Rules | https://react.dev/reference/rules/rules-of-hooks |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| useState Hook Tutorial | https://youtu.be/O6P86uwfdR0 |
| React Events Tutorial | https://youtu.be/4UZrsTqkcW4 |
| Forms in React | https://youtu.be/tIdNeoHniBY |
| Todo App with useState | https://youtu.be/rh3gQmT9X2k |
| React State Management | https://youtu.be/4FhJkX18fS8 |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| React DevTools | Inspect state | Chrome Web Store |
| Vite | Build tool | https://vitejs.dev |
| VS Code Extensions | React snippets | Built-in marketplace |

## 📝 useState Cheatsheet

### Basic Syntax
```jsx
const [state, setState] = useState(initialValue)
```

### Update Patterns
```jsx
// Direct
setState(newValue)

// Functional (when depends on previous)
setState(prev => prev + 1)

// Object
setState({ ...state, key: newValue })

// Array - add
setState([...state, newItem])

// Array - remove
setState(state.filter(item => item.id !== id))

// Array - update
setState(state.map(item =>
  item.id === id ? { ...item, updated: true } : item
))
```

## 📝 Event Handlers Cheatsheet

### Common Events
```jsx
// Click
<button onClick={handleClick}>

// Change
<input onChange={handleChange}>

// Submit
<form onSubmit={handleSubmit}>

// Key press
<input onKeyDown={handleKeyDown}>

// Mouse enter/leave
<div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
```

### Handler Patterns
```jsx
// Named function
const handleClick = () => console.log('clicked')

// Inline
<button onClick={() => console.log('clicked')}>

// With parameter
<button onClick={() => handleDelete(id)}>

// With event object
<input onChange={(e) => setValue(e.target.value)}>
```

## 📝 Controlled Component Cheatsheet

### Input Types
```jsx
// Text
<input value={value} onChange={(e) => setValue(e.target.value)} />

// Checkbox
<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />

// Radio
<input type="radio" checked={selected === 'opt1'} onChange={() => setSelected('opt1')} />

// Select
<select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="opt1">Option 1</option>
</select>

// Textarea
<textarea value={value} onChange={(e) => setValue(e.target.value)} />
```

## ✅ Common Snippets (ES7 Extension)

| Shortcut | Output |
|----------|--------|
| `usestate` | useState hook |
| `clg` | console.log |
| `rafce` | React arrow component |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| State not updating | Direct mutation | Use spread operator |
| Double increment not working | Using value instead of function | Use `prev => prev + 1` |
| Form refreshes page | Missing preventDefault | Add `e.preventDefault()` |
| Input not updating | Missing onChange | Add onChange handler |
| Event not working | Wrong case `onclick` | Use `onClick` |
| State in condition | Hook rule violation | Move to top level |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React State Management | https://react.dev/learn/managing-state |
| Choosing the State Structure | https://react.dev/learn/choosing-the-state-structure |
| Sharing State Between Components | https://react.dev/learn/sharing-state-between-components |
| Preserving and Resetting State | https://react.dev/learn/preserving-and-resetting-state |
