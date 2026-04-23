# 📅 Day 32: State & Events in React

**Date:** April 23, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** useState Hook, Event Handling, Forms in React

---

## 📋 Learning Objectives

- ✅ Understand what hooks are and the Rules of Hooks
- ✅ Use useState syntax: `const [state, setState] = useState(initialValue)`
- ✅ Read and update state
- ✅ Understand that state changes trigger re-renders
- ✅ Handle events in React (onClick, onChange, onSubmit)
- ✅ Pass arguments to event handlers
- ✅ Use the event object
- ✅ Build controlled components for forms
- ✅ Handle form submission with onSubmit and preventDefault

---

## 🪝 Part 1: useState Hook

### What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from functional components.

**Rules of Hooks:**
1. **Only call hooks at the top level** - not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - not from regular JavaScript functions

```jsx
// ✅ Correct
function Component() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  
  if (true) {
    // ❌ Wrong - hook in condition
    // const [x, setX] = useState(0)
  }
  
  return <div>{count}</div>
}

// ❌ Wrong - hook in regular function
function normalFunction() {
  const [state, setState] = useState(0)
}
```

---

### useState Syntax

```jsx
import { useState } from 'react'

function Counter() {
  // Array destructuring: [currentState, setterFunction]
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Victor')
  const [isActive, setIsActive] = useState(true)
  const [todos, setTodos] = useState([])
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

**What useState returns:**
- First item: current state value
- Second item: function to update that state
- The setter function triggers a re-render

---

### Reading State

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Victor',
    age: 25,
    city: 'Lagos'
  })
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>
      <p>Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
    </div>
  )
}
```

---

### Updating State

```jsx
// Updating primitive values
const [count, setCount] = useState(0)

// Direct update
setCount(5)

// Using previous value (recommended for updates based on previous state)
setCount(prevCount => prevCount + 1)

// Multiple updates
setCount(prev => prev + 1)
setCount(prev => prev + 1) // This works correctly
```

**Why use functional update?**
```jsx
// ❌ Problem: Multiple updates may not work correctly
const handleClick = () => {
  setCount(count + 1)  // count = 0, becomes 1
  setCount(count + 1)  // count = 0, becomes 1 again (not 2!)
}

// ✅ Solution: Functional update
const handleClick = () => {
  setCount(prev => prev + 1)  // 0 → 1
  setCount(prev => prev + 1)  // 1 → 2
}
```

---

### Updating Objects in State

```jsx
const [user, setUser] = useState({ name: 'Victor', age: 25 })

// ❌ Wrong - mutates state directly
user.age = 26
setUser(user)

// ✅ Correct - create new object
setUser({ ...user, age: 26 })

// Updating nested objects
const [state, setState] = useState({
  user: { name: 'Victor', address: { city: 'Lagos' } }
})

setState({
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: 'Abuja'
    }
  }
})
```

---

### Updating Arrays in State

```jsx
const [todos, setTodos] = useState([])

// Add to end
setTodos([...todos, newTodo])

// Add to beginning
setTodos([newTodo, ...todos])

// Remove by filter
setTodos(todos.filter(todo => todo.id !== id))

// Update by map
setTodos(todos.map(todo =>
  todo.id === id ? { ...todo, completed: true } : todo
))

// Insert at index
const newArray = [...todos]
newArray.splice(index, 0, newItem)
setTodos(newArray)
```

---

### State Triggers Re-renders

When state changes, React re-renders the component and all its children.

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  
  console.log('Component re-rendered') // Runs every time count changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

**Important:** React batches state updates for performance.

---

## 🎯 Part 2: Events in React

### Event Handling Syntax

```jsx
// HTML (vanilla JS)
<button onclick="handleClick()">Click</button>

// React
<button onClick={handleClick}>Click</button>
```

**Differences from HTML:**
- Events use camelCase (`onClick` not `onclick`)
- Pass function reference (not string)

---

### Common Events

| Event | Usage |
|-------|-------|
| `onClick` | Button clicks, div clicks |
| `onChange` | Input, select, textarea changes |
| `onSubmit` | Form submission |
| `onMouseEnter` | Mouse enters element |
| `onMouseLeave` | Mouse leaves element |
| `onFocus` | Element gains focus |
| `onBlur` | Element loses focus |
| `onKeyPress` | Key press (deprecated, use onKeyDown) |
| `onKeyDown` | Key is pressed |
| `onKeyUp` | Key is released |

---

### Event Handlers

```jsx
function Button() {
  // Named function
  const handleClick = () => {
    console.log('Button clicked')
  }
  
  // Inline function
  const handleMouseEnter = () => console.log('Mouse entered')
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  )
}
```

---

### Passing Arguments to Event Handlers

```jsx
function TodoList() {
  const deleteTodo = (id) => {
    console.log(`Deleting todo ${id}`)
  }
  
  return (
    <div>
      {/* Using arrow function */}
      <button onClick={() => deleteTodo(1)}>Delete 1</button>
      
      {/* Using bind */}
      <button onClick={deleteTodo.bind(null, 2)}>Delete 2</button>
    </div>
  )
}
```

---

### Event Object

React passes a synthetic event object to event handlers.

```jsx
function Input() {
  const handleChange = (event) => {
    console.log(event.target.value)     // Current input value
    console.log(event.target.name)      // Input name attribute
    console.log(event.type)             // 'change'
    console.log(event.target.checked)   // For checkboxes
  }
  
  const handleKeyDown = (event) => {
    console.log(event.key)              // 'Enter', 'Escape', 'ArrowUp'
    console.log(event.code)             // 'Enter', 'Escape', 'ArrowUp'
    
    if (event.key === 'Enter') {
      console.log('Enter pressed')
    }
  }
  
  return (
    <div>
      <input 
        name="username"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
```

---

### Preventing Default Behavior

```jsx
function Form() {
  const handleSubmit = (event) => {
    event.preventDefault()  // Prevents page refresh
    console.log('Form submitted')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## 📝 Part 3: Forms in React

### Controlled Components

In React, form elements whose value is controlled by React state are called "controlled components".

```jsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <p>Email: {email}</p>
    </div>
  )
}
```

**Benefits:**
- Single source of truth
- Instant validation
- Conditional rendering of values
- Easy to reset form

---

### Handling Multiple Inputs

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: ''
  })
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  return (
    <div>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <label>
        <input
          name="agree"
          type="checkbox"
          checked={formData.agree}
          onChange={handleChange}
        />
        I agree to terms
      </label>
    </div>
  )
}
```

---

### Form Submission

```jsx
function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (text.trim()) {
      onAddTodo(text)
      setText('')  // Reset form
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  )
}
```

---

### Form Validation

```jsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  
  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email is required'
    if (!email.includes('@')) newErrors.email = 'Invalid email'
    if (!password) newErrors.password = 'Password is required'
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted', { email, password })
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
          placeholder="Email"
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
```

---

## 📝 Quick Reference

### useState
```jsx
// Basic
const [state, setState] = useState(initialValue)

// Functional update
setState(prev => prev + 1)

// Object update
setState({ ...state, key: newValue })

// Array update
setState([...state, newItem])
```

### Event Handlers
```jsx
// Basic
<button onClick={handleClick}>

// With argument
<button onClick={() => handleClick(id)}>

// With event object
<input onChange={(e) => handleChange(e.target.value)}>

// Prevent default
<form onSubmit={(e) => e.preventDefault()}>
```

### Controlled Input
```jsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

## ✅ Day 32 Checklist

- [ ] Understand useState hook and Rules of Hooks
- [ ] Create state with `const [state, setState] = useState(initial)`
- [ ] Update primitive state
- [ ] Update object state (spread operator)
- [ ] Update array state (map, filter, spread)
- [ ] Understand state triggers re-renders
- [ ] Handle onClick, onChange, onSubmit events
- [ ] Pass arguments to event handlers
- [ ] Use event object (target.value, key)
- [ ] Use preventDefault for form submission
- [ ] Build controlled form components
- [ ] Build Counter App
- [ ] Build Todo List App
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **useState returns an array** with current state and setter function
2. **State updates trigger re-renders** - React re-renders component when state changes
3. **Use functional updates** when new state depends on previous state
4. **Never mutate state directly** - always create new objects/arrays
5. **React events use camelCase** (`onClick` not `onclick`)
6. **Pass function reference**, not function call (`onClick={handleClick}` not `onClick={handleClick()}`)
7. **Controlled components** have their value controlled by React state
8. **Always call `event.preventDefault()`** in form handlers

