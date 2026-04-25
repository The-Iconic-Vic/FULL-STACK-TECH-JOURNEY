 📅 Day 34: Managing Complex State

**Date:** April 25, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Updating Objects in State, Updating Arrays in State, Immutability

---

## 📋 Learning Objectives

- ✅ Understand the importance of immutability in React state
- ✅ Use spread operator (`...`) to copy objects
- ✅ Update nested objects correctly
- ✅ Never mutate arrays directly (no push, pop, splice)
- ✅ Add items to arrays using spread operator
- ✅ Remove items using `filter()`
- ✅ Update items using `map()`
- ✅ Insert items at specific positions

---

## 🎯 Part 1: Updating Objects in State

### Why Immutability Matters

React uses shallow comparison to detect changes. If you mutate state directly, React may not detect the change and won't re-render.

```jsx
// ❌ WRONG - Mutating state directly
const [user, setUser] = useState({ name: 'Victor', age: 25 })

function updateName(newName) {
  user.name = newName  // Direct mutation!
  setUser(user)        // React may not detect change
}

// ✅ CORRECT - Creating new object
function updateName(newName) {
  setUser({ ...user, name: newName })
}
```

---

### Updating Objects - Basic

```jsx
const [user, setUser] = useState({ name: 'Victor', age: 25 })

// Update single property
setUser({ ...user, age: 26 })

// Update multiple properties
setUser({ ...user, name: 'Victor Updated', age: 26 })

// Using functional update (when depends on previous)
setUser(prev => ({ ...prev, age: prev.age + 1 }))
```

---

### Updating Nested Objects

```jsx
const [user, setUser] = useState({
  name: 'Victor',
  age: 25,
  address: {
    city: 'Lagos',
    street: 'Main St',
    zip: '100001'
  }
})

// Update nested property (spread at each level)
setUser({
  ...user,
  address: {
    ...user.address,
    city: 'Abuja'
  }
})

// Update deeply nested
const [state, setState] = useState({
  user: {
    profile: {
      name: 'Victor',
      settings: {
        theme: 'dark'
      }
    }
  }
})

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
```

---

### Using Object.assign()

Alternative to spread operator for copying objects.

```jsx
// Using Object.assign()
setUser(Object.assign({}, user, { age: 26 }))

// Multiple properties
setUser(Object.assign({}, user, { name: 'New Name', age: 30 }))
```

---

### Adding New Properties

```jsx
const [user, setUser] = useState({ name: 'Victor' })

// Add new property
setUser({ ...user, age: 25, city: 'Lagos' })

// Add with computed key
const key = 'email'
setUser({ ...user, [key]: 'victor@example.com' })
```

---

### Deleting Properties

```jsx
const [user, setUser] = useState({ name: 'Victor', age: 25, temp: 'remove me' })

// Delete property using destructuring and rest
const { temp, ...rest } = user
setUser(rest)
```

---

## 📦 Part 2: Updating Arrays in State

### Never Mutate Arrays Directly

| ❌ Wrong (Direct Mutation) | ✅ Correct (Immutability) |
|---------------------------|---------------------------|
| `array.push(newItem)` | `[...array, newItem]` |
| `array.pop()` | `array.slice(0, -1)` |
| `array.splice(index, 1)` | `array.filter((_, i) => i !== index)` |
| `array[index] = newValue` | `array.map((item, i) => i === index ? newValue : item)` |

---

### Adding Items to Arrays

```jsx
const [items, setItems] = useState([])

// Add to end (most common)
setItems([...items, newItem])

// Add to beginning
setItems([newItem, ...items])

// Add multiple items
setItems([...items, ...newItems])

// Conditional add
setItems(prev => [...prev, ...(condition ? [newItem] : [])])
```

---

### Removing Items from Arrays

```jsx
const [items, setItems] = useState([{ id: 1, name: 'A' }, { id: 2, name: 'B' }])

// Remove by filter (by property)
setItems(items.filter(item => item.id !== idToRemove))

// Remove by index
setItems(items.filter((_, index) => index !== indexToRemove))

// Remove first item
setItems(items.slice(1))

// Remove last item
setItems(items.slice(0, -1))

// Remove first occurrence of value
setItems(items.filter((item, index) => index !== items.indexOf(value)))
```

---

### Updating Items in Arrays

```jsx
const [items, setItems] = useState([{ id: 1, completed: false }, { id: 2, completed: false }])

// Update by id using map
setItems(items.map(item =>
  item.id === id ? { ...item, completed: true } : item
))

// Update by index
setItems(items.map((item, index) =>
  index === indexToUpdate ? { ...item, ...updates } : item
))

// Update all items
setItems(items.map(item => ({ ...item, processed: true })))
```

---

### Inserting Items at Specific Position

```jsx
// Insert at index
const insertAtIndex = (array, index, newItem) => {
  return [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index)
  ]
}

setItems(insertAtIndex(items, 2, newItem))

// Insert at beginning (index 0)
setItems([newItem, ...items])

// Insert at end
setItems([...items, newItem])
```

---

### Replacing Entire Array

```jsx
// Replace with new array
setItems(newArray)

// Reset to empty
setItems([])

// Replace after transformation
setItems(items.map(item => transform(item)))
```

---

### Toggle Item (Checkbox pattern)

```jsx
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build app', completed: false }
])

const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}
```

---

### Shopping Cart Pattern

```jsx
// Add to cart (or increase quantity)
const addToCart = (product) => {
  setCart(prevCart => {
    const existing = prevCart.find(item => item.id === product.id)
    
    if (existing) {
      // Update quantity using map
      return prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      // Add new item with quantity 1
      return [...prevCart, { ...product, quantity: 1 }]
    }
  })
}

// Update quantity
const updateQuantity = (id, newQuantity) => {
  if (newQuantity <= 0) {
    setCart(prev => prev.filter(item => item.id !== id))
  } else {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }
}

// Remove item
const removeItem = (id) => {
  setCart(prev => prev.filter(item => item.id !== id))
}
```

---

### Recipe Book Pattern

```jsx
// Add new recipe
const addRecipe = (newRecipe) => {
  setRecipes([...recipes, { ...newRecipe, id: Date.now(), favorite: false }])
}

// Update recipe
const updateRecipe = (updatedRecipe) => {
  setRecipes(recipes.map(recipe =>
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
  ))
}

// Delete recipe
const deleteRecipe = (id) => {
  setRecipes(recipes.filter(recipe => recipe.id !== id))
}

// Toggle favorite
const toggleFavorite = (id) => {
  setRecipes(recipes.map(recipe =>
    recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
  ))
}
```

---

## 📝 Quick Reference

### Object Updates
```jsx
// Update property
setObj({ ...obj, key: newValue })

// Update nested
setObj({ ...obj, nested: { ...obj.nested, key: newValue } })

// Delete property
const { [key]: _, ...rest } = obj
setObj(rest)
```

### Array Updates
```jsx
// Add to end
setArr([...arr, newItem])

// Add to beginning
setArr([newItem, ...arr])

// Remove by filter
setArr(arr.filter(item => item.id !== id))

// Update by map
setArr(arr.map(item => item.id === id ? { ...item, updated: true } : item))

// Insert at index
setArr([...arr.slice(0, index), newItem, ...arr.slice(index)])
```

---

## ✅ Day 34 Checklist

- [ ] Understand why immutability matters in React
- [ ] Use spread operator to copy objects
- [ ] Update nested objects correctly
- [ ] Never mutate arrays directly
- [ ] Add items to arrays using spread
- [ ] Remove items using `filter()`
- [ ] Update items using `map()`
- [ ] Build Shopping Cart project
- [ ] Build Recipe Book project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Never mutate state directly** - always create new objects/arrays
2. **Spread operator (`...`) is your friend** - for copying objects and arrays
3. **Use `map()` for updating array items** - returns new array with transformed items
4. **Use `filter()` for removing items** - returns new array without excluded items
5. **Nested updates require spreading at every level** - each level needs its own spread
6. **Functional updates are safer** when new state depends on previous state
7. **Shopping cart pattern** - combine add/update/remove in clean patterns
8. **Recipe book pattern** - full CRUD operations on array of objects

