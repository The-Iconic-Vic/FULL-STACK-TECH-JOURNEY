# 📚 Day 34 Resources - Managing Complex State

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Updating Objects in State | https://react.dev/learn/updating-objects-in-state |
| React: Updating Arrays in State | https://react.dev/learn/updating-arrays-in-state |
| React: useState Reference | https://react.dev/reference/react/useState |
| React: Immutability | https://react.dev/learn/updating-objects-in-state#why-is-mutating-state-not-recommended |
| Immer Documentation | https://immerjs.github.io/immer/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Updating Objects in State | https://youtu.be/4FhJkX18fS8 |
| Updating Arrays in State | https://youtu.be/3PDcE7tDnUk |
| Shopping Cart with React | https://youtu.be/2wCpkOk2uCg |
| Managing Complex State | https://youtu.be/7UstS0hsHgI |

## 📝 Object Updates Cheatsheet

### Basic Update
```jsx
setObj({ ...obj, key: newValue })
```

### Nested Update
```jsx
setObj({
  ...obj,
  nested: { ...obj.nested, key: newValue }
})
```

### Functional Update
```jsx
setObj(prev => ({ ...prev, key: prev.key + 1 }))
```

### Delete Property
```jsx
const { keyToRemove, ...rest } = obj
setObj(rest)
```

## 📝 Array Updates Cheatsheet

| Operation | Code |
|-----------|------|
| Add to end | `setArr([...arr, newItem])` |
| Add to start | `setArr([newItem, ...arr])` |
| Remove by filter | `setArr(arr.filter(item => item.id !== id))` |
| Update by map | `setArr(arr.map(item => item.id === id ? {...item, updated: true} : item))` |
| Insert at index | `setArr([...arr.slice(0, idx), newItem, ...arr.slice(idx)])` |
| Remove last | `setArr(arr.slice(0, -1))` |
| Remove first | `setArr(arr.slice(1))` |

## ✅ Common Patterns Summary

### Shopping Cart
```jsx
// Add or increment
setCart(prev => {
  const existing = prev.find(item => item.id === id)
  if (existing) {
    return prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  }
  return [...prev, { ...product, quantity: 1 }]
})

// Update quantity
setCart(prev => prev.map(item =>
  item.id === id ? { ...item, quantity: newQty } : item
))

// Remove
setCart(prev => prev.filter(item => item.id !== id))
```

### Todo List
```jsx
// Add
setTodos([...todos, { id: Date.now(), text, completed: false }])

// Toggle
setTodos(todos.map(todo =>
  todo.id === id ? { ...todo, completed: !todo.completed } : todo
))

// Delete
setTodos(todos.filter(todo => todo.id !== id))
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Component not re-rendering | Direct mutation | Use spread operator |
| Nested update not working | Missing spread at inner level | Spread at each level |
| Array push not working | Using push() directly | Use `[...arr, item]` |
| Input losing focus | Key changing on rerender | Use stable key or index |
| State update batching | Multiple updates | Use functional updates |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Immer for Complex State | https://immerjs.github.io/immer/update-patterns |
| React State Management | https://react.dev/learn/managing-state |
| Choosing State Structure | https://react.dev/learn/choosing-the-state-structure |

