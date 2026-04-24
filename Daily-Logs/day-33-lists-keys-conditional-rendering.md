# 📅 Day 33: Lists, Keys, and Conditional Rendering

**Date:** April 24, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Rendering Lists, Keys, Conditional Rendering, Fragments

---

## 📋 Learning Objectives

- ✅ Use `.map()` to render arrays of components
- ✅ Understand the importance of the `key` prop
- ✅ Know what happens without proper keys
- ✅ Apply best practices for keys (unique, stable IDs)
- ✅ Use conditional rendering with `if` statements, ternary operator, `&&` operator
- ✅ Handle multiple conditions and switch statements
- ✅ Use fragments (`<> </>` or `<Fragment>`) to avoid wrapper divs

---

## 📝 Part 1: Rendering Lists

### Using `.map()` to Render Arrays

In React, you use the `map()` function to transform an array of data into an array of JSX elements.

```jsx
function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h3>{movie.title}</h3>
          <p>Year: {movie.year}</p>
          <p>Rating: {movie.rating}/10</p>
        </div>
      ))}
    </div>
  )
}
```

**Common Pattern:**
```jsx
// Data array
const items = ['Apple', 'Banana', 'Orange']

// Render list
<ul>
  {items.map(item => <li key={item}>{item}</li>)}
</ul>
```

---

### The `key` Prop

Keys help React identify which items have changed, been added, or been removed.

```jsx
// ✅ Good - using unique ID
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}

// ✅ Acceptable - using unique string
{users.map(user => (
  <UserCard key={user.email} user={user} />
))}

// ❌ Bad - using index (causes issues with reordering)
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}
```

**Why Keys Matter:**

Without proper keys, React may:
- Re-render the wrong components
- Lose component state during reordering
- Cause performance issues

**Best Practices for Keys:**
- Use stable, unique IDs from your data (database ID)
- Never use array index unless list is static and never reordered
- Keys must be unique among siblings, not globally
- Keys are not passed as props to children

```jsx
// Keys are not accessible in the child component
function TodoItem({ todo }) {
  // props.key is NOT available
  return <div>{todo.text}</div>
}
```

---

### What Happens Without Keys?

```jsx
// Without keys
<ul>
  {todos.map(todo => <li>{todo.text}</li>)}
</ul>

// React shows warning: "Warning: Each child in a list should have a unique 'key' prop"
```

**Consequences:**
- React cannot track items efficiently
- Reordering causes entire list to re-render
- Input focus may be lost
- Animations may break

---

## 🎯 Part 2: Conditional Rendering

### If Statements (Outside JSX)

```jsx
function UserGreeting({ isLoggedIn, user }) {
  let content
  
  if (isLoggedIn) {
    content = <h1>Welcome back, {user.name}!</h1>
  } else {
    content = <h1>Please log in</h1>
  }
  
  return <div>{content}</div>
}
```

### Ternary Operator (`condition ? true : false`)

```jsx
function UserGreeting({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  )
}

// Nested ternary (use sparingly)
function StatusMessage({ status }) {
  return (
    <div>
      {status === 'success' ? '✅ Success!' :
       status === 'error' ? '❌ Error!' :
       status === 'loading' ? '⏳ Loading...' :
       'Unknown status'}
    </div>
  )
}
```

### Logical AND (`&&`) Operator

Use `&&` when you want to render something OR nothing.

```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <div className="alert">{message}</div>}
      <p>Main content</p>
    </div>
  )
}

// Multiple conditions with &&
function UserBadge({ user }) {
  return (
    <div>
      {user.isAdmin && user.isVerified && (
        <span className="admin-badge">Admin Verified</span>
      )}
    </div>
  )
}
```

**Important:** Be careful with falsy values like `0` or empty string.

```jsx
// ❌ Problem: 0 will render "0"
{items.length && <p>Items: {items.length}</p>}

// ✅ Solution: convert to boolean
{items.length > 0 && <p>Items: {items.length}</p>}
```

### Switch Statement (Outside JSX)

```jsx
function StatusPage({ status }) {
  let content
  
  switch(status) {
    case 'success':
      content = <SuccessComponent />
      break
    case 'error':
      content = <ErrorComponent />
      break
    case 'loading':
      content = <LoadingSpinner />
      break
    default:
      content = <div>Unknown status</div>
  }
  
  return <div>{content}</div>
}
```

### Multiple Conditions Pattern

```jsx
function FilteredList({ items, filter }) {
  // Apply multiple filters
  const filtered = items.filter(item => {
    if (filter.category && item.category !== filter.category) return false
    if (filter.minPrice && item.price < filter.minPrice) return false
    if (!filter.showInStock && !item.inStock) return false
    return true
  })
  
  return (
    <div>
      {filtered.length === 0 ? (
        <p>No items match your filters</p>
      ) : (
        filtered.map(item => <ItemCard key={item.id} item={item} />)
      )}
    </div>
  )
}
```

---

## 🔍 Part 3: Fragment Pattern

### What are Fragments?

Fragments let you group multiple elements without adding extra DOM nodes.

```jsx
// ❌ Problem: adds extra div to DOM
function Component() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  )
}

// ✅ Solution: Fragment (short syntax)
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  )
}

// ✅ Solution: Fragment (explicit syntax)
import { Fragment } from 'react'

function Component() {
  return (
    <Fragment>
      <h1>Title</h1>
      <p>Paragraph</p>
    </Fragment>
  )
}
```

### Why Fragments are Better

| Problem | Fragment Solution |
|---------|-------------------|
| Extra div breaks CSS Grid/Flexbox | No extra wrapper |
| Invalid HTML (div inside tr) | Clean HTML |
| Increased DOM size | Smaller DOM |
| Unnecessary nesting | Cleaner component tree |

### Keyed Fragments for Lists

```jsx
function DefinitionList({ terms }) {
  return (
    <dl>
      {terms.map(term => (
        <Fragment key={term.id}>
          <dt>{term.name}</dt>
          <dd>{term.definition}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
```

---

## 📝 Quick Reference

### Rendering Lists
```jsx
// Basic list
{items.map(item => <div key={item.id}>{item.name}</div>)}

// List with conditional
{items.length > 0 ? (
  items.map(item => <div key={item.id}>{item.name}</div>)
) : (
  <p>No items</p>
)}
```

### Conditional Rendering Patterns
```jsx
// Ternary
{condition ? <TrueComponent /> : <FalseComponent />}

// AND (render or nothing)
{condition && <Component />}

// If-else (outside JSX)
if (condition) {
  return <Component />
}
return <OtherComponent />

// Multiple conditions
{status === 'success' && <Success />}
{status === 'error' && <Error />}
{status === 'loading' && <Loading />}
```

### Fragment Syntax
```jsx
// Short syntax (common)
<>
  <Child1 />
  <Child2 />
</>

// Explicit syntax
<Fragment>
  <Child1 />
  <Child2 />
</Fragment>

// Keyed fragment (for lists)
<Fragment key={id}>
  <dt>Term</dt>
  <dd>Definition</dd>
</Fragment>
```

---

## ✅ Day 33 Checklist

- [ ] Use `.map()` to render arrays of components
- [ ] Add unique `key` prop to each list item
- [ ] Understand consequences of using index as key
- [ ] Use ternary operator for conditional rendering
- [ ] Use `&&` operator for simple conditions
- [ ] Use `if` statements outside JSX for complex logic
- [ ] Use fragments to avoid wrapper divs
- [ ] Build Task Manager with filtering
- [ ] Build Movie List with filters and sorting
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Always use keys** - React needs them to track list items efficiently
2. **Use stable IDs as keys** - never use array index for dynamic lists
3. **map() is the standard way** to convert data arrays to JSX
4. **Ternary operator** is best for simple if/else in JSX
5. **&& operator** is perfect for "render if condition" patterns
6. **Fragments avoid extra DOM nodes** - use `<> </>` instead of `<div>` wrappers
7. **Empty states need conditional rendering** - show message when no data
8. **Multiple filters combine with &&** in filter functions

