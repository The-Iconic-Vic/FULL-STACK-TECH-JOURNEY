# 📘 React Lists & Conditional Rendering Reference

## Rendering Lists with .map()

### Basic Array Rendering
```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange']
  
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  )
}
```

### Rendering Array of Objects
```jsx
function MovieList({ movies }) {
  return (
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          year={movie.year}
          rating={movie.rating}
        />
      ))}
    </div>
  )
}
```

### Rendering with Conditional
```jsx
function TodoList({ todos }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## The key Prop

### Rules for Keys
```jsx
// ✅ Good - stable unique ID from database
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}

// ✅ Acceptable - unique string
{users.map(user => <UserCard key={user.email} user={user} />)}

// ✅ Acceptable - combination of fields (if guaranteed unique)
{items.map(item => <div key={`${item.type}-${item.id}`}>{item.name}</div>)}

// ❌ Bad - array index (causes issues with reordering/dynamic lists)
{todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}

// ❌ Bad - non-unique key
{items.map(item => <div key={item.category}>{item.name}</div>)}

// ❌ Bad - using random values (changes every render)
{items.map(item => <div key={Math.random()}>{item.name}</div>)}
```

### When Index as Key is Acceptable
- List is static (never changes)
- List is never reordered
- List items have no unique IDs

```jsx
// Acceptable: static navigation menu
const navItems = ['Home', 'About', 'Contact']

<nav>
  {navItems.map((item, index) => (
    <a key={index} href={`/${item.toLowerCase()}`}>{item}</a>
  ))}
</nav>
```

---

## Conditional Rendering

### Ternary Operator
```jsx
// Basic ternary
{isLoggedIn ? <LogoutButton /> : <LoginButton />}

// With multiple lines
{isLoading ? (
  <div className="spinner">Loading...</div>
) : (
  <div className="content">{data}</div>
)}

// Nested ternary (use sparingly)
{status === 'success' ? (
  <SuccessMessage />
) : status === 'error' ? (
  <ErrorMessage />
) : (
  <LoadingSpinner />
)}
```

### Logical AND (&&)
```jsx
// Simple condition
{isLoading && <Spinner />}

// With multiple conditions
{user && user.isAdmin && <AdminPanel />}

// Be careful with falsy values
{items.length && <p>Items: {items.length}</p>}  // ❌ renders "0" when empty
{items.length > 0 && <p>Items: {items.length}</p>}  // ✅ good
```

### If Statements (Outside JSX)
```jsx
function Dashboard({ user, isLoading, error }) {
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  if (error) {
    return <ErrorMessage message={error.message} />
  }
  
  if (!user) {
    return <LoginPrompt />
  }
  
  return <UserDashboard user={user} />
}
```

### Switch Statement (Outside JSX)
```jsx
function StatusPage({ status, data }) {
  switch(status) {
    case 'loading':
      return <LoadingSpinner />
    case 'success':
      return <SuccessMessage data={data} />
    case 'error':
      return <ErrorMessage error={data} />
    default:
      return <InitialState />
  }
}
```

### IIFE (Immediately Invoked Function Expression)
```jsx
function UserCard({ user }) {
  return (
    <div>
      {(() => {
        if (user.isAdmin) {
          return <span className="admin-badge">Admin</span>
        }
        if (user.isVerified) {
          return <span className="verified-badge">Verified</span>
        }
        return <span className="user-badge">Member</span>
      })()}
      <h3>{user.name}</h3>
    </div>
  )
}
```

---

## Fragment Patterns

### Basic Fragment
```jsx
// Short syntax (most common)
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  )
}

// Explicit syntax
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

### Keyed Fragments (for lists)
```jsx
function DefinitionList({ terms }) {
  return (
    <dl>
      {terms.map(term => (
        <Fragment key={term.id}>
          <dt>{term.term}</dt>
          <dd>{term.definition}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
```

### When to Use Fragments
```jsx
// 1. Table rows (tr must have td children)
function TableRows({ data }) {
  return (
    <>
      {data.map(row => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.value}</td>
        </tr>
      ))}
    </>
  )
}

// 2. CSS Grid/Flexbox layouts (extra div breaks layout)
function GridItems({ items }) {
  return (
    <>
      {items.map(item => (
        <div key={item.id} className="grid-item">
          {item.content}
        </div>
      ))}
    </>
  )
}

// 3. Returning multiple elements from component
function TextGroup() {
  return (
    <>
      <h1>Main Title</h1>
      <h2>Subtitle</h2>
    </>
  )
}
```

---

## Common Patterns

### Filter and Map Combined
```jsx
function FilteredList({ items, filterText }) {
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  )
  
  return (
    <div>
      {filteredItems.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Sort and Map Combined
```jsx
function SortedList({ items, sortBy }) {
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })
  
  return (
    <div>
      {sortedItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### Search, Filter, Sort Chain
```jsx
function ProcessedList({ items, searchTerm, category, sortBy }) {
  const processed = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => category === 'all' || item.category === category)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return a.price - b.price
      return 0
    })
  
  return (
    <div>
      {processed.length === 0 ? (
        <EmptyState />
      ) : (
        processed.map(item => <ItemCard key={item.id} item={item} />)
      )}
    </div>
  )
}
```

### Toggle Filter State
```jsx
function TodoApp() {
  const [filter, setFilter] = useState('all')
  const [todos, setTodos] = useState(initialTodos)
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })
  
  return (
    <div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
```

---

## Performance Tips

### Avoid Inline Functions in Map (for large lists)
```jsx
// ❌ Bad - creates new function on each render
{items.map(item => (
  <button onClick={() => handleClick(item.id)}>{item.name}</button>
))}

// ✅ Good - pass id to handler
{items.map(item => (
  <button onClick={() => handleClick(item.id)}>{item.name}</button>
))}
// But if list is large, consider useCallback

// ✅ Better - separate component with memo
const ItemButton = React.memo(({ item, onCLick }) => (
  <button onClick={() => onClick(item.id)}>{item.name}</button>
))
```

### Memoize Filtered Data
```jsx
import { useMemo } from 'react'

function ItemList({ items, filter, sortBy }) {
  const processedItems = useMemo(() => {
    let result = [...items]
    
    if (filter) {
      result = result.filter(item => item.category === filter)
    }
    
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    return result
  }, [items, filter, sortBy])
  
  return (
    <div>
      {processedItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### Extract List Item Component
```jsx
// ✅ Good - separate component for list items
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
