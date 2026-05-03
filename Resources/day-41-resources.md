# 📚 Day 41 Resources - useReducer Hook

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: useReducer | https://react.dev/reference/react/useReducer |
| React: useReducer vs useState | https://react.dev/learn/extracting-state-logic-into-a-reducer |
| React: Scaling Up with Reducer and Context | https://react.dev/learn/scaling-up-with-reducer-and-context |
| Redux Documentation | https://redux.js.org |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| useReducer Tutorial | https://youtu.be/oUOjZ0jTqJY |
| useReducer vs useState | https://youtu.be/6ThXsUwLWvc |
| useReducer + Context Pattern | https://youtu.be/6ThXsUwLWvc |
| Shopping Cart with useReducer | https://youtu.be/2wCpkOk2uCg |

## 📝 useReducer Cheatsheet

### Basic Syntax
```jsx
const [state, dispatch] = useReducer(reducer, initialState)
const [state, dispatch] = useReducer(reducer, initialArg, init)
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
dispatch({ type: 'SET_COUNT', payload: 10 })

// Object payload
dispatch({ type: 'UPDATE_USER', payload: { id, name } })
```

## ✅ Action Types as Constants

```jsx
export const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_COUNT: 'SET_COUNT',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR'
}
```

## 🔄 Common Reducer Patterns

### Counter
```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 }
    case 'DECREMENT': return { count: state.count - 1 }
    case 'RESET': return { count: 0 }
    default: return state
  }
}
```

### Data Fetching
```jsx
const initialState = { data: null, loading: false, error: null }

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS': return { ...state, loading: false, data: action.payload }
    case 'FETCH_ERROR': return { ...state, loading: false, error: action.payload }
    default: return state
  }
}
```

### Shopping Cart
```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': return [...state, { ...action.payload, quantity: 1 }]
    case 'REMOVE_ITEM': return state.filter(item => item.id !== action.payload)
    case 'UPDATE_QUANTITY': return state.map(item =>
      item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
    )
    case 'CLEAR_CART': return []
    default: return state
  }
}
```

## 🆚 useReducer vs useState

| Feature | useState | useReducer |
|---------|----------|------------|
| Complexity | Simple | Complex |
| State type | Independent | Related values |
| Updates | Direct setter | Action dispatch |
| Predictability | Moderate | High |
| Testing | Harder | Easy |
| Best for | Form inputs | Shopping cart, data fetching |

## 🔗 useReducer + Context

```jsx
// Context setup
const MyContext = createContext()

function MyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

// Usage in components
const { state, dispatch } = useContext(MyContext)
dispatch({ type: 'ACTION', payload: data })
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| State not updating | Mutating state directly | Use spread operator |
| Reducer not called | Wrong action type | Check action.type spelling |
| Multiple dispatches not working | Using same value | Use functional update or separate calls |
| Component not re-rendering | Same object reference | Return new object |
| Action payload undefined | Missing payload in dispatch | Ensure payload is passed |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Redux Toolkit (Production Redux) | https://redux-toolkit.js.org |
| Zustand (Modern state management) | https://github.com/pmndrs/zustand |
| Jotai (Atomic state) | https://jotai.org |
| XState (State machines) | https://xstate.js.org |

