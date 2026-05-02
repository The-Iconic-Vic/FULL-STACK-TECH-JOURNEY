# 📘 useReducer Reference

## What is useReducer?

useReducer is a React hook for managing complex state logic. It's an alternative to useState when state transitions are complicated or when multiple state values are related.

```jsx
import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  )
}
```

---

## Reducer Function

### Basic Structure

```jsx
function reducer(state, action) {
  // action: { type: string, payload?: any }
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* updates */ }
    default:
      return state
  }
}
```

### Rules for Reducers
- Must be **pure** (no side effects)
- Cannot mutate state directly
- Must return a new state object
- Should handle unknown actions by returning current state

---

## useReducer Syntax

```jsx
// Basic
const [state, dispatch] = useReducer(reducer, initialState)

// With init function (lazy initialization)
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

### Example with Init Function

```jsx
function init(initialCount) {
  return { count: initialCount }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)
  // ...
}
```

---

## Dispatching Actions

### Action Patterns

```jsx
// No payload
dispatch({ type: 'INCREMENT' })

// Single value payload
dispatch({ type: 'SET_COUNT', payload: 10 })

// Object payload
dispatch({ type: 'UPDATE_USER', payload: { id: 1, name: 'Victor' } })

// Multiple properties (without nested object)
dispatch({ type: 'UPDATE_USER', id: 1, name: 'Victor' })

// Array payload
dispatch({ type: 'ADD_ITEMS', payload: [item1, item2] })
```

### Action Types as Constants

```jsx
// actions.js
export const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_VALUE: 'SET_VALUE'
}

// reducer.js
import { ACTIONS } from './actions'

function reducer(state, action) {
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

## Common Reducer Patterns

### Counter Pattern

```jsx
const initialState = { count: 0 }

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'SET_COUNT':
      return { count: action.payload }
    default:
      return state
  }
}
```

### Todo List Pattern

```jsx
const initialState = []

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed)
    default:
      return state
  }
}
```

### Async Data Pattern

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

// Usage
function DataFetcher() {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    fetch('/api/data')
      .then(res => res.json())
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }))
  }, [])

  if (state.loading) return <Loading />
  if (state.error) return <Error message={state.error} />
  return <Data data={state.data} />
}
```

### Shopping Cart Pattern

```jsx
const initialState = []

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.id !== action.payload.id)
      }
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

### Form Pattern

```jsx
const initialState = {
  values: { name: '', email: '', password: '' },
  errors: {},
  touched: {}
}

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload
      return {
        ...state,
        values: { ...state.values, [name]: value }
      }
    }
    case 'BLUR': {
      const { name } = action.payload
      return {
        ...state,
        touched: { ...state.touched, [name]: true }
      }
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}
```

---

## useReducer vs useState

| Aspect | useState | useReducer |
|--------|----------|------------|
| Complexity | Simple state | Complex state logic |
| State updates | Direct setter | Action-based dispatch |
| Readability | Good for simple | Better for complex |
| Testing | Harder | Easy (pure reducer) |
| Predictability | Moderate | High |
| Code size | Smaller for simple | Smaller for complex |
| Best for | Form inputs, toggles | Shopping cart, data fetching |

### When to Use useState

```jsx
// Simple independent values
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [isActive, setIsActive] = useState(false)
```

### When to Use useReducer

```jsx
// Complex state with related transitions
const [cart, dispatch] = useReducer(cartReducer, [])
dispatch({ type: 'ADD_ITEM', payload: product })
dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: 2 } })

// State with multiple sub-values
const [state, dispatch] = useReducer(dataReducer, initialState)
dispatch({ type: 'FETCH_START' })
dispatch({ type: 'FETCH_SUCCESS', payload: data })
```

---

## useReducer + Context (Mini Redux)

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

  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      cart: state, 
      addToCart, 
      removeFromCart, 
      totalItems, 
      totalPrice 
    }}>
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

## Lazy Initialization

Use when initial state requires expensive computation.

```jsx
function init(initialCount) {
  // Expensive calculation only runs once
  const savedCount = localStorage.getItem('count')
  return { count: savedCount ? parseInt(savedCount) : initialCount }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, 0, init)
  
  // Save to localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem('count', state.count)
  }, [state.count])
  
  return <div>Count: {state.count}</div>
}
```

---

## Debugging with useReducer

### Console Logging

```jsx
function reducer(state, action) {
  console.log('Action:', action)
  console.log('Previous state:', state)
  
  const newState = // ... reducer logic
  
  console.log('Next state:', newState)
  return newState
}
```

### Redux DevTools Integration

```jsx
// Requires redux-devtools-extension
import { useReducer } from 'react'
import { devToolsEnhancer } from '@redux-devtools/extension'

// Not directly compatible, but you can use middleware
```

---

## Common Mistakes

| Mistake | Solution |
|---------|----------|
| Mutating state directly | Use spread operator: `{ ...state, count: state.count + 1 }` |
| Forgetting default case | Return current state for unknown actions |
| Side effects in reducer | Move side effects to useEffect |
| Missing action type constants | Use constants to prevent typos |
| Overusing useReducer | Use useState for simple state |
| Not handling loading/error | Include loading and error states |

---

## Testing Reducers

```javascript
// counterReducer.test.js
import { counterReducer } from './counterReducer'

describe('counterReducer', () => {
  test('increments count', () => {
    const state = { count: 0 }
    const action = { type: 'INCREMENT' }
    const newState = counterReducer(state, action)
    expect(newState.count).toBe(1)
  })

  test('decrements count', () => {
    const state = { count: 5 }
    const action = { type: 'DECREMENT' }
    const newState = counterReducer(state, action)
    expect(newState.count).toBe(4)
  })

  test('resets count', () => {
    const state = { count: 10 }
    const action = { type: 'RESET' }
    const newState = counterReducer(state, action)
    expect(newState.count).toBe(0)
  })

  test('returns same state for unknown action', () => {
    const state = { count: 5 }
    const action = { type: 'UNKNOWN' }
    const newState = counterReducer(state, action)
    expect(newState).toBe(state)
  })
})
