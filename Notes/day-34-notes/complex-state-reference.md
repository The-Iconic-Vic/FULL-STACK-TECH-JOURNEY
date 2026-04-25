# 📘 Complex State Reference

## Immutability in React

### Why Immutability Matters

React uses **shallow comparison** to detect state changes. When you mutate state directly, the object reference remains the same, so React doesn't know to re-render.

```jsx
// ❌ BAD - Direct mutation (React may not detect change)
const [user, setUser] = useState({ name: 'Victor' })
user.name = 'New Name'
setUser(user)  // Same object reference!

// ✅ GOOD - New object (React detects change)
setUser({ ...user, name: 'New Name' })  // New object reference
```

---

## Updating Objects

### Basic Object Updates

```jsx
const [user, setUser] = useState({ name: 'Victor', age: 25 })

// Update single property
setUser({ ...user, age: 26 })

// Update multiple properties
setUser({ ...user, name: 'Victor Updated', age: 26 })

// Functional update (depends on previous)
setUser(prev => ({ ...prev, age: prev.age + 1 }))

// Add new property
setUser({ ...user, email: 'victor@example.com' })

// Conditional update
setUser({ ...user, ...(condition && { extra: 'value' }) })
```

### Deleting Object Properties

```jsx
const [user, setUser] = useState({ name: 'Victor', age: 25, temp: 'remove' })

// Method 1: Destructuring with rest
const { temp, ...rest } = user
setUser(rest)

// Method 2: Using delete (not recommended - mutates)
const newUser = { ...user }
delete newUser.temp
setUser(newUser)

// Method 3: Conditional spread
const { [keyToRemove]: _, ...clean } = user
setUser(clean)
```

### Nested Object Updates

```jsx
const [state, setState] = useState({
  user: {
    profile: {
      name: 'Victor',
      settings: {
        theme: 'dark',
        notifications: true
      }
    }
  }
})

// Update one level deep
setState({
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: 'New Name'
    }
  }
})

// Update two levels deep
setState({
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      settings: {
        ...state.user.profile.settings,
        theme: 'light'
      }
    }
  }
})

// Using functional update for nested
setState(prev => ({
  ...prev,
  user: {
    ...prev.user,
    profile: {
      ...prev.user.profile,
      settings: {
        ...prev.user.profile.settings,
        theme: 'light'
      }
    }
  }
}))
```

### Helper for Nested Updates

```jsx
function updateNested(state, path, value) {
  const keys = path.split('.')
  const lastKey = keys.pop()
  const target = keys.reduce((obj, key) => obj[key], state)
  
  return {
    ...state,
    [keys[0]]: {
      ...state[keys[0]],
      [keys[1]]: {
        ...state[keys[0]][keys[1]],
        [lastKey]: value
      }
    }
  }
}

// Usage
setState(prev => updateNested(prev, 'user.profile.settings.theme', 'light'))
```

---

## Updating Arrays

### Adding Items

```jsx
const [items, setItems] = useState([])

// Add to end (most common)
setItems([...items, newItem])

// Add to beginning
setItems([newItem, ...items])

// Add multiple items
setItems([...items, ...newItems])

// Add at specific index
const addAtIndex = (index, newItem) => {
  setItems([
    ...items.slice(0, index),
    newItem,
    ...items.slice(index)
  ])
}

// Conditional add
setItems(prev => condition ? [...prev, newItem] : prev)
```

### Removing Items

```jsx
const [items, setItems] = useState([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' }
])

// Remove by id (most common)
setItems(items.filter(item => item.id !== idToRemove))

// Remove by index
setItems(items.filter((_, index) => index !== indexToRemove))

// Remove first item
setItems(items.slice(1))

// Remove last item
setItems(items.slice(0, -1))

// Remove multiple by condition
setItems(items.filter(item => item.name !== 'B'))

// Remove first occurrence of value
setItems(items.filter((item, index) => 
  index !== items.findIndex(i => i.name === 'B')
))
```

### Updating Items

```jsx
// Update by id (most common)
setItems(items.map(item =>
  item.id === id ? { ...item, completed: true } : item
))

// Update by index
setItems(items.map((item, index) =>
  index === indexToUpdate ? { ...item, ...updates } : item
))

// Update all items
setItems(items.map(item => ({ ...item, processed: true })))

// Toggle boolean property
setItems(items.map(item =>
  item.id === id ? { ...item, completed: !item.completed } : item
))

// Update with condition
setItems(items.map(item =>
  item.category === 'electronics' 
    ? { ...item, discount: 0.1 }
    : item
))
```

### Replacing Items

```jsx
// Replace entire array
setItems(newArray)

// Replace at index
setItems(items.map((item, index) =>
  index === indexToReplace ? replacementItem : item
))

// Replace if condition matches
setItems(items.map(item =>
  item.id === id ? replacementItem : item
))
```

### Sorting Arrays

```jsx
// Sort and update
setItems([...items].sort((a, b) => a.name.localeCompare(b.name)))

// Sort by numeric property
setItems([...items].sort((a, b) => a.price - b.price))

// Sort with functional update
setItems(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)))
```

---

## Common Patterns

### Shopping Cart Pattern

```jsx
function ShoppingCart() {
  const [cart, setCart] = useState([])

  // Add or increment quantity
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id))
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  // Remove item
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  )
}
```

### Todo List Pattern

```jsx
function TodoList() {
  const [todos, setTodos] = useState([])

  // Add todo
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  // Toggle complete
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Edit todo
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Clear completed
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // Get counts
  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length
}
```

### Form State Pattern

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zip: ''
    }
  })

  // Update simple field
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Update nested field
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      address: { street: '', city: '', zip: '' }
    })
  }
}
```

### Recipe Book Pattern

```jsx
function RecipeBook() {
  const [recipes, setRecipes] = useState([])

  // CRUD operations
  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }])
  }

  const updateRecipe = (id, updates) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...updates } : recipe
    ))
  }

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  // Toggle favorite
  const toggleFavorite = (id) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    ))
  }

  // Search
  const searchRecipes = (term) => {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    )
  }
}
```

---

## Performance Tips

### useMemo for Derived State

```jsx
import { useMemo } from 'react'

function ItemList({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.category === filter || filter === 'all'
    )
  }, [items, filter])

  return filteredItems.map(item => <Item key={item.id} {...item} />)
}
```

### useCallback for Event Handlers

```jsx
import { useCallback } from 'react'

function Parent() {
  const handleUpdate = useCallback((id, newValue) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, value: newValue } : item
    ))
  }, [])

  return <Child onUpdate={handleUpdate} />
}
```

### Immutable Update Libraries

```jsx
// Immer (recommended for complex nested state)
import { produce } from 'immer'

const [state, setState] = useState(initialState)

const updateNested = () => {
  setState(produce(draft => {
    draft.user.profile.settings.theme = 'light'
  }))
}
```

---

## Common Mistakes

| Mistake | Why Wrong | Correct Way |
|---------|-----------|-------------|
| `state.key = value` | Direct mutation | `{ ...state, key: value }` |
| `array.push(item)` | Direct mutation | `[...array, item]` |
| `array[index] = value` | Direct mutation | `array.map((item,i) => i===index ? value : item)` |
| `delete object.key` | Direct mutation | Destructuring with rest |
| `Object.assign(state, updates)` | Mutates original | `{ ...state, ...updates }` |
| `array.sort()` | Mutates original | `[...array].sort()` |
| `array.reverse()` | Mutates original | `[...array].reverse()` |
