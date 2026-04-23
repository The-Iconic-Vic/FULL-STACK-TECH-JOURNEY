# 📘 React State & Events Reference

## useState Hook

### Basic Syntax
```jsx
import { useState } from 'react'

function Component() {
  const [state, setState] = useState(initialValue)
  return <div>{state}</div>
}
```

### useState with Different Types

```jsx
// Number
const [count, setCount] = useState(0)

// String
const [name, setName] = useState('')

// Boolean
const [isActive, setIsActive] = useState(false)

// Array
const [items, setItems] = useState([])

// Object
const [user, setUser] = useState({ name: '', age: 0 })

// Null (for loading states)
const [data, setData] = useState(null)
```

---

## Updating State

### Primitive Values
```jsx
// Direct value
setCount(10)

// Functional update (when depends on previous)
setCount(prev => prev + 1)
setCount(prev => prev - 1)
```

### Objects
```jsx
// ❌ Wrong - mutates state
user.name = 'New Name'
setUser(user)

// ✅ Correct - create new object
setUser({ ...user, name: 'New Name' })

// For nested objects
setUser({
  ...user,
  address: {
    ...user.address,
    city: 'New City'
  }
})
```

### Arrays
```jsx
// Add to end
setItems([...items, newItem])

// Add to beginning
setItems([newItem, ...items])

// Remove by filter
setItems(items.filter(item => item.id !== id))

// Update by map
setItems(items.map(item =>
  item.id === id ? { ...item, completed: true } : item
))

// Insert at index
const newItems = [...items]
newItems.splice(index, 0, newItem)
setItems(newItems)

// Remove by index
const newItems = [...items]
newItems.splice(index, 1)
setItems(newItems)
```

---

## Rules of Hooks

1. **Only call hooks at the top level** - not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - functional components or custom hooks

```jsx
// ✅ Correct
function Component() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  
  useEffect(() => {
    // Effect here
  }, [])
  
  return <div>{count}</div>
}

// ❌ Wrong - hook in condition
function Component({ shouldUseHook }) {
  if (shouldUseHook) {
    const [state, setState] = useState(0) // ❌
  }
}

// ❌ Wrong - hook in loop
function Component() {
  for (let i = 0; i < 5; i++) {
    const [state, setState] = useState(0) // ❌
  }
}
```

---

## Event Handling

### Common Events

```jsx
// Click
<button onClick={handleClick}>Click</button>

// Change (input, textarea, select)
<input onChange={handleChange} />

// Submit
<form onSubmit={handleSubmit}>...</form>

// Mouse enter/leave
<div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>

// Focus/Blur
<input onFocus={handleFocus} onBlur={handleBlur} />

// Keyboard
<input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
```

### Event Handler Patterns

```jsx
// Named function
function Component() {
  const handleClick = () => {
    console.log('Clicked')
  }
  return <button onClick={handleClick}>Click</button>
}

// Inline arrow function
<button onClick={() => console.log('Clicked')}>Click</button>

// With parameters
const deleteItem = (id) => {
  console.log(`Deleting ${id}`)
}
<button onClick={() => deleteItem(1)}>Delete</button>

// With event object
const handleChange = (e) => {
  console.log(e.target.value)
}
<input onChange={handleChange} />
```

---

## Event Object Properties

```jsx
function handleEvent(e) {
  // Common properties
  e.target           // Element that triggered event
  e.currentTarget    // Element event listener is attached to
  e.type             // Event type ('click', 'change', etc.)
  e.preventDefault() // Prevent default behavior
  e.stopPropagation() // Stop event bubbling
  
  // Mouse events
  e.clientX / e.clientY  // Mouse position relative to viewport
  e.pageX / e.pageY      // Mouse position relative to page
  
  // Keyboard events
  e.key              // Key value ('Enter', 'a', 'ArrowUp')
  e.code             // Physical key code ('Enter', 'KeyA')
  e.ctrlKey          // Ctrl key pressed?
  e.shiftKey         // Shift key pressed?
  e.altKey           // Alt key pressed?
  
  // Form events
  e.target.value     // Input value
  e.target.name      // Input name attribute
  e.target.checked   // Checkbox checked state
  e.target.files     // File input files
}
```

---

## Controlled Components

### Text Input
```jsx
const [value, setValue] = useState('')

<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Textarea
```jsx
const [value, setValue] = useState('')

<textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Select Dropdown
```jsx
const [value, setValue] = useState('')

<select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

### Checkbox
```jsx
const [isChecked, setIsChecked] = useState(false)

<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

### Radio Buttons
```jsx
const [selected, setSelected] = useState('')

<input
  type="radio"
  value="option1"
  checked={selected === 'option1'}
  onChange={(e) => setSelected(e.target.value)}
/>
<input
  type="radio"
  value="option2"
  checked={selected === 'option2'}
  onChange={(e) => setSelected(e.target.value)}
/>
```

### Multiple Inputs (One Handler)
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  age: ''
})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
}

<input name="name" value={formData.name} onChange={handleChange} />
<input name="email" value={formData.email} onChange={handleChange} />
<input name="age" value={formData.age} onChange={handleChange} />
```

---

## Form Submission

### Basic Form
```jsx
function Form() {
  const [value, setValue] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()  // Prevents page refresh
    console.log('Submitted:', value)
    setValue('')        // Reset form
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Form with Validation
```jsx
function Form() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  
  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email required'
    if (!email.includes('@')) newErrors.email = 'Invalid email'
    if (!password) newErrors.password = 'Password required'
    if (password.length < 6) newErrors.password = 'Minimum 6 characters'
    return newErrors
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length === 0) {
      console.log('Success', { email, password })
      setEmail('')
      setPassword('')
      setErrors({})
    } else {
      setErrors(newErrors)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## Counter Pattern

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  
  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev - 1)
  const reset = () => setCount(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

---

## Todo List Pattern

```jsx
function TodoList() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

---

## Common Mistakes

| Mistake | Solution |
|---------|----------|
| Direct mutation | Use spread operator |
| Calling setState in loop | Batch updates or use functional updates |
| Forgetting event.preventDefault() | Always call in form handlers |
| Missing key in lists | Add unique `key` prop |
| Using index as key | Use unique ID when possible |
| Hooks conditionally | Always call at top level |
| setState with same value | React may not re-render |
| Updating state with current value | Use functional update `prev => prev + 1` |
