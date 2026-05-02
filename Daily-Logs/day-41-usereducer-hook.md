# 📅 Day 41: useReducer Hook (Advanced State Management)

**Date:** May 2, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** useReducer, Reducer Functions, Action Patterns, Context Integration

---

## 📋 Learning Objectives

- ✅ Understand when useState isn't enough for complex state logic
- ✅ Write reducer functions: `(state, action) => newState`
- ✅ Use `useReducer(reducer, initialState)` hook
- ✅ Dispatch actions with `dispatch({ type: 'ACTION', payload: data })`
- ✅ Use action types as constants
- ✅ Compare useReducer vs useState
- ✅ Combine useReducer with Context for global state

---

## 🎯 Part 1: useReducer Fundamentals

### When useState Isn't Enough

`useState` works great for independent state values, but becomes messy when state has complex transitions or when multiple state updates depend on each other.

```jsx
// ❌ Messy with useState
const [count, setCount] = useState(0)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

// Multiple setState calls
setLoading(true)
try {
  const data = await fetchData()
  setCount(data.count)
  setLoading(false)
} catch (err) {
  setError(err)
  setLoading(false)
}
```

```jsx
// ✅ Clean with useReducer
const [state, dispatch] = useReducer(reducer, initialState)

// Single dispatch
dispatch({ type: 'FETCH_START' })
try {
  const data = await fetchData()
  dispatch({ type: 'FETCH_SUCCESS', payload: data.count })
} catch (err) {
  dispatch({ type: 'FETCH_ERROR', payload: err })
}
```

---

### Reducer Function

A reducer is a pure function that takes the current state and an action, and returns the new state.

```javascript
// Reducer signature
function reducer(state, action) {
  // Returns new state based on action type
  return newState
}

// Example counter reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      return state
  }
}
```

**Important:** Reducers must be **pure**:
- No side effects (API calls, localStorage)
- No random values (Math.random())
- No date/time (Date.now())
- Always return the same output for same input

---

### useReducer Hook

```jsx
import { useReducer } from 'react'

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  )
}
```

**useReducer returns:**
- `state`: Current state value
- `dispatch`: Function to send actions to the reducer

---

### Dispatching Actions

```jsx
// Simple action (no payload)
dispatch({ type: 'INCREMENT' })
dispatch({ type: 'RESET' })

// Action with payload
dispatch({ type: 'SET_VALUE', payload: 10 })
dispatch({ type: 'UPDATE_USER', payload: { id: 1, name: 'Victor' } })

// Multiple actions in sequence
dispatch({ type: 'FETCH_START' })
try {
  const data = await api.getUser()
  dispatch({ type: 'FETCH_SUCCESS', payload: data })
} catch (error) {
  dispatch({ type: 'FETCH_ERROR', payload: error.message })
}
```

---

## 📦 Part 2: Action Patterns

### Action Types as Constants

Using constants prevents typos and enables autocomplete.

```jsx
// constants.js
export const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_VALUE: 'SET_VALUE'
}

// reducer.js
import { ACTIONS } from './constants'

function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 }
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 }
    case ACTIONS.RESET:
      return { count: 0 }
    case ACTIONS.SET_VALUE:
      return { count: action.payload }
    default:
      return state
  }
}

// Component
dispatch({ type: ACTIONS.INCREMENT })
dispatch({ type: ACTIONS.SET_VALUE, payload: 10 })
```

---

### Action Payload Patterns

```jsx
// Simple payload
{ type: 'SET_COUNT', payload: 5 }

// Object payload
{ type: 'UPDATE_USER', payload: { id: 1, name: 'Victor' } }

// Multiple payload properties (without nested object)
{ type: 'UPDATE_USER', id: 1, name: 'Victor' }

// Array payload
{ type: 'ADD_ITEMS', payload: [item1, item2] }

// No payload
{ type: 'RESET' }
```

---

### Common Reducer Patterns

#### Loading/Success/Error Pattern

```jsx
const initialState = {
  data: null,
  loading: false,
  error: null
}

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
```

#### Toggle Pattern

```jsx
function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { isOpen: !state.isOpen }
    case 'OPEN':
      return { isOpen: true }
    case 'CLOSE':
      return { isOpen: false }
    default:
      return state
  }
}
```

#### Array Operations Pattern

```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { ...action.payload, quantity: 1 }]
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}
```

---

### useReducer vs useState Comparison

| Feature | useState | useReducer |
|---------|----------|------------|
| Complexity | Simple state | Complex state logic |
| State type | Independent values | Related state values |
| Updates | Direct setter | Action-based dispatch |
| Predictability | Moderate | High (actions describe intent) |
| Testing | Harder | Easy (pure reducer) |
| Code size | Smaller | Larger (for simple state) |
| Best for | Form inputs, toggles | Shopping cart, data fetching |

```jsx
// When to use useState
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [isActive, setIsActive] = useState(false)

// When to use useReducer
const [cart, dispatch] = useReducer(cartReducer, [])
dispatch({ type: 'ADD_ITEM', payload: product })
dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: 2 } })
```

---

## 🔗 Part 3: Combining with Context

### useReducer + Context = Mini Redux

```jsx
// contexts/CartContext.jsx
import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { ...action.payload, quantity: 1 }]
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, [])
  
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }
  
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

---

### Action Creators Pattern

```jsx
// reducers/cartReducer.js
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      // logic
    case CART_ACTIONS.REMOVE_ITEM:
      // logic
    default:
      return state
  }
}

// contexts/CartContext.jsx
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, [])

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product })
  }

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id })
  }

  // Action creators for derived state
  const itemCount = state.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      itemCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}
```

---

## 📝 Quick Reference

### useReducer Syntax
```jsx
const [state, dispatch] = useReducer(reducer, initialState)
const [state, dispatch] = useReducer(reducer, initialArg, initFunction)
```

### Reducer Template
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* updates */ }
    default:
      return state
  }
}
```

### Dispatch Patterns
```jsx
// No payload
dispatch({ type: 'INCREMENT' })

// With payload
dispatch({ type: 'SET_VALUE', payload: 10 })

// Object payload
dispatch({ type: 'UPDATE_USER', payload: { id, name } })
```

### Common Action Types
| Type | Pattern |
|------|---------|
| CRUD | `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_ITEM` |
| Fetch | `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR` |
| Toggle | `TOGGLE`, `OPEN`, `CLOSE` |
| Form | `UPDATE_FIELD`, `RESET_FORM`, `SET_ERRORS` |

---

## ✅ Day 41 Checklist

- [ ] Understand when to use useReducer vs useState
- [ ] Write reducer function with switch statement
- [ ] Use useReducer hook in component
- [ ] Dispatch actions with type and payload
- [ ] Define action types as constants
- [ ] Handle loading/success/error patterns
- [ ] Combine useReducer with Context API
- [ ] Build Counter with useReducer project
- [ ] Build Shopping Cart with useReducer project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **useReducer is for complex state logic** - when state updates depend on each other
2. **Reducers are pure functions** - no side effects, predictable
3. **Actions describe what happened** - `{ type: 'INCREMENT' }` not `{ type: 'ADD_ONE' }`
4. **Always return a new state object** - never mutate state directly
5. **Use constants for action types** - prevents typos, enables autocomplete
6. **Combine with Context** - creates a mini Redux-like architecture
7. **useState is simpler** - don't overuse useReducer for simple state
8. **Derived state can be computed** - don't store in reducer if it can be calculated

