# 📘 JSX & Components Reference

## JSX Rules

### Embedding JavaScript with `{}`

```jsx
// Variables
const name = "Victor"
<h1>Hello, {name}!</h1>

// Expressions
<p>2 + 2 = {2 + 2}</p>

// Ternary operators
<span>{isLoggedIn ? 'Welcome' : 'Please login'}</span>

// Function calls
<p>Current time: {new Date().toLocaleTimeString()}</p>

// Object properties
<p>Name: {user.name}</p>

// Array methods
<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
```

### What Cannot Go in `{}`

```jsx
// ❌ Statements (if, for, while)
{ if (x > 5) { return 'Big' } }

// ❌ Multiple expressions without wrapper
{ const x = 5; x * 2 }

// ❌ Objects directly (except for style)
{ { key: 'value' } }

// ✅ Call a function that returns value
{calculateValue()}

// ✅ Use ternary
{condition ? 'True' : 'False'}

// ✅ Use logical operators
{isLoggedIn && <Dashboard />}
```

---

## JSX vs HTML

| Feature | HTML | JSX |
|---------|------|-----|
| Class attribute | `class` | `className` |
| For attribute | `for` | `htmlFor` |
| Tab index | `tabindex` | `tabIndex` |
| Inline style | `style="color: red"` | `style={{ color: 'red' }}` |
| Event handlers | `onclick` | `onClick` |
| Self-closing | Optional for void elements | Required for all without children |
| Comments | `<!-- -->` | `{/* */}` |
| Fragments | Not available | `<> </>` |

---

## Self-Closing Tags

```jsx
// HTML void elements (self-close in JSX)
<img src="image.jpg" alt="description" />
<br />
<hr />
<input type="text" />
<meta charSet="UTF-8" />

// Custom components
<Avatar src="photo.jpg" />
<Icon name="star" size="large" />
<Spinner />
```

---

## Fragments

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

// Explicit Fragment syntax
import { Fragment } from 'react'

function Component() {
  return (
    <Fragment>
      <h1>Title</h1>
      <p>Paragraph</p>
    </Fragment>
  )
}

// Fragment with key (for lists)
function ItemList({ items }) {
  return (
    <>
      {items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </>
  )
}
```

---

## Comments in JSX

```jsx
function Component() {
  return (
    <div>
      {/* Single line comment */}
      
      {/* Multi-line
         comment */}
      
      <h1>Title</h1>
      
      {/* 
        Comments can also
        span multiple lines
        like this
      */}
      
      {/* Inline comment in JSX */}<span>Content</span>
    </div>
  )
}
```

---

## Component Creation

### Functional Component (Modern)

```jsx
// Basic
function Welcome() {
  return <h1>Hello, World!</h1>
}

// With props
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  )
}

// With default props
function Welcome({ name = "Guest", age = 0 }) {
  return <h1>Hello, {name}!</h1>
}

// Arrow function
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>

// With children
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

### Export/Import

```jsx
// Named export
export function Button() { ... }
export function Link() { ... }

// Named import
import { Button, Link } from './components'

// Default export
function Button() { ... }
export default Button

// Default import
import Button from './Button'

// Mixed export
export default Button
export { Link, Icon }

// Mixed import
import Button, { Link, Icon } from './components'
```

---

## Component Composition

### Nesting Components

```jsx
// Avatar.jsx
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />
}

// Card.jsx
function Card({ children }) {
  return <div className="card">{children}</div>
}

// App.jsx
function App() {
  return (
    <Card>
      <Avatar src="photo.jpg" alt="Profile" />
      <h2>Victor Innocent</h2>
      <p>Full-Stack Developer</p>
    </Card>
  )
}
```

### Children Prop

```jsx
// Component that accepts children
function Container({ children, className }) {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  )
}

// Usage
<Container className="dark">
  <h1>Title</h1>
  <p>Content goes here</p>
  <button>Click</button>
</Container>
```

---

## Props

### Passing Props

```jsx
// Single props
<User name="Victor" age={25} isAdmin={true} />

// Spread props
const user = { name: 'Victor', age: 25, email: 'vic@example.com' }
<User {...user} />

// Children as prop
<Card>
  <h2>Title</h2>
</Card>

// Render prop pattern
<DataFetcher url="/api/users">
  {(data) => <UserList users={data} />}
</DataFetcher>
```

### Props Destructuring

```jsx
// Without destructuring
function User(props) {
  return <h1>{props.name}</h1>
}

// With destructuring
function User({ name, age, email }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
      <p>{email}</p>
    </div>
  )
}

// Default values
function User({ name = "Guest", age = 0 }) {
  return <h1>{name} ({age})</h1>
}

// Rest props
function Button({ children, variant, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  )
}
```

---

## Styling in React

### CSS Modules

```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background: darkblue;
}

.primary {
  background: green;
}

.large {
  padding: 15px 30px;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css'

function Button({ primary, large, children }) {
  return (
    <button 
      className={`
        ${styles.button} 
        ${primary ? styles.primary : ''} 
        ${large ? styles.large : ''}
      `}
    >
      {children}
    </button>
  )
}
```

### Inline Styles

```jsx
function Button({ primary, children }) {
  const buttonStyle = {
    backgroundColor: primary ? 'blue' : 'gray',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
  
  return <button style={buttonStyle}>{children}</button>
}

// Dynamic inline styles
<div style={{ 
  color: isActive ? 'green' : 'red',
  fontSize: `${size}px`,
  marginTop: spacing * 8 + 'px'
}}>
  Content
</div>
```

### Conditional Styling

```jsx
// Using ternary
<div className={isActive ? 'active' : 'inactive'}>Content</div>

// Using template literal
<div className={`base ${isActive ? 'active' : ''} ${size}`}>Content</div>

// Using array join
<div className={['base', isActive && 'active', size].filter(Boolean).join(' ')}>

// Using clsx library (popular alternative)
import clsx from 'clsx'
<div className={clsx('base', { active: isActive }, size)}>
```

---

## Conditional Rendering

```jsx
// If-else with ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical && operator
{isLoading && <Spinner />}

// Multiple conditions
{status === 'success' && <Success />}
{status === 'error' && <Error />}
{status === 'loading' && <Loading />}

// IIFE (Immediately Invoked Function Expression)
{(() => {
  if (isLoggedIn) return <Dashboard />
  if (isGuest) return <GuestView />
  return <Login />
})()}

// Separate function
function renderContent() {
  if (isLoggedIn) return <Dashboard />
  return <Login />
}
{renderContent()}
```

---

## Lists and Keys

```jsx
// Basic list
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// With index (only if no unique id)
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// Complex list item
{users.map(user => (
  <UserCard 
    key={user.id}
    name={user.name}
    email={user.email}
    avatar={user.avatar}
  />
))}

// Fragment with key (for table rows)
{items.map(item => (
  <Fragment key={item.id}>
    <tr><td>{item.name}</td></tr>
    <tr><td>{item.details}</td></tr>
  </Fragment>
))}
```

---

## Common Patterns

### Container/Presentational Pattern

```jsx
// Container (handles logic)
function UserContainer() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser().then(data => {
      setUser(data)
      setLoading(false)
    })
  }, [])
  
  if (loading) return <Spinner />
  return <UserProfile user={user} />
}

// Presentational (handles display)
function UserProfile({ user }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}
```

### Compound Components

```jsx
// Select component with compound children
function Select({ children, value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      {children}
    </select>
  )
}

function Option({ value, children }) {
  return <option value={value}>{children}</option>
}

// Usage
<Select value={color} onChange={setColor}>
  <Option value="red">Red</Option>
  <Option value="blue">Blue</Option>
  <Option value="green">Green</Option>
</Select>
```

### Render Props

```jsx
// Component that provides data via render prop
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }
  
  return (
    <div onMouseMove={handleMouseMove}>
      {children(position)}
    </div>
  )
}

// Usage
<MouseTracker>
  {({ x, y }) => (
    <p>Mouse position: {x}, {y}</p>
  )}
</MouseTracker>
