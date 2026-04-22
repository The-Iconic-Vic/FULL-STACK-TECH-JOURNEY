**File:** `daily-logs/day-31-props-children.md`

```markdown
# 📅 Day 31: Props - Passing Data Between Components

**Date:** April 22, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Props Fundamentals, Children Prop, Prop Drilling

---

## 📋 Learning Objectives

- ✅ Pass props to components like HTML attributes
- ✅ Receive and use props in child components
- ✅ Destructure props for cleaner code
- ✅ Set default values for props
- ✅ Pass any JavaScript data type (strings, numbers, arrays, objects, functions)
- ✅ Use `props.children` for wrapper components
- ✅ Understand prop drilling and its problems

---

## 📦 Part 1: Props Fundamentals

### What are Props?

Props (short for "properties") are read-only data passed from a parent component to a child component. They make components dynamic and reusable.

```jsx
// Parent component passes props
function App() {
  return (
    <div>
      <Greeting name="Victor" age={25} />
    </div>
  )
}

// Child component receives props
function Greeting(props) {
  return <h1>Hello, {props.name}! You are {props.age} years old.</h1>
}
```

**Key Characteristics:**
- Props are **read-only** (cannot be modified by child)
- Props flow **down** (parent → child)
- Props make components **reusable**

---

### Passing Props

Props are passed like HTML attributes.

```jsx
// String prop (with quotes)
<UserCard name="Alice Johnson" />

// Number prop (with curly braces)
<UserCard age={28} />

// Boolean prop
<UserCard isActive={true} />
<UserCard isActive />  // shorthand for true

// Array prop
<UserCard hobbies={['coding', 'reading', 'gaming']} />

// Object prop
<UserCard address={{ city: 'New York', zip: '10001' }} />

// Function prop
<UserCard onFollow={handleFollow} />

// Variable prop
const userName = "Bob Smith"
<UserCard name={userName} />

// Expression prop
<UserCard age={25 + 5} />
```

---

### Receiving Props

```jsx
// Method 1: Using props object
function UserCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.email}</p>
    </div>
  )
}

// Method 2: Destructuring (recommended)
function UserCard({ name, email, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>Age: {age}</p>
    </div>
  )
}

// Method 3: Destructuring with rest
function UserCard({ name, email, ...rest }) {
  console.log(rest) // { age: 25, location: 'NYC' }
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  )
}
```

---

### Default Props

```jsx
// Method 1: Default value in destructuring
function Button({ variant = 'primary', size = 'medium', children }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  )
}

// Method 2: Default props object (legacy)
Button.defaultProps = {
  variant: 'primary',
  size: 'medium'
}
```

---

### Passing All Props with Spread

```jsx
// Parent
const userProps = {
  name: 'Alice',
  age: 28,
  email: 'alice@example.com',
  location: 'NYC'
}

<UserCard {...userProps} />

// Equivalent to:
<UserCard name="Alice" age={28} email="alice@example.com" location="NYC" />
```

---

### Passing Functions as Props

```jsx
// Parent component
function App() {
  const handleFollow = (userId) => {
    console.log(`Followed user ${userId}`)
  }

  return <UserCard id={1} onFollow={handleFollow} />
}

// Child component
function UserCard({ id, onFollow }) {
  return (
    <div>
      <h3>User {id}</h3>
      <button onClick={() => onFollow(id)}>Follow</button>
    </div>
  )
}
```

---

## 👶 Part 2: Children Prop

### What is `props.children`?

`props.children` is a special prop that contains anything passed between the opening and closing tags of a component.

```jsx
// Parent component passing children
function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is card content</p>
      <button>Click me</button>
    </Card>
  )
}

// Child component using children
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}
```

---

### Building Wrapper Components

**Card Component:**
```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}
```

**Modal Component:**
```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}

// Usage
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <h2>Modal Title</h2>
  <p>Modal content goes here</p>
  <button>Confirm</button>
</Modal>
```

---

### Layout Components

**Container Component:**
```jsx
function Container({ children, maxWidth = '1200px' }) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding: '0 1rem' }}>
      {children}
    </div>
  )
}
```

**Layout Component:**
```jsx
function Layout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        <aside className="layout-sidebar">{sidebar}</aside>
        <main className="layout-main">{children}</main>
      </div>
      <footer className="layout-footer">{footer}</footer>
    </div>
  )
}
```

---

### Children Types

```jsx
function ChildrenDemo({ children }) {
  // Children can be:
  // - String: "Hello"
  // - Element: <h1>Title</h1>
  // - Array: [<div>1</div>, <div>2</div>]
  // - Function: {(data) => <div>{data}</div>}
  // - Nothing: undefined
  
  console.log(React.Children.count(children)) // Number of children
  console.log(React.Children.toArray(children)) // Convert to array
  
  return <div>{children}</div>
}
```

---

## 🔌 Part 3: Prop Drilling (Introduction)

### What is Prop Drilling?

Prop drilling occurs when you need to pass data through multiple levels of components that don't need the data themselves.

```jsx
// Problem: Prop drilling
function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <Layout user={user}>           {/* Level 1 */}
      <Header user={user}>         {/* Level 2 */}
        <Navbar user={user}>       {/* Level 3 */}
          <UserMenu user={user}>   {/* Level 4 - actually needs it */}
            <Avatar name={user.name} />
          </UserMenu>
        </Navbar>
      </Header>
    </Layout>
  )
}
```

**Problems with Prop Drilling:**
- Hard to maintain (change prop name in many places)
- Components receive props they don't need
- Makes code harder to refactor
- Increases complexity

---

### Solutions Preview

| Solution | When to Use | Week |
|----------|-------------|------|
| **Context API** | Medium-sized apps, theme, auth | Week 6 |
| **State Management (Redux/Zustand)** | Large apps, complex state | Week 7 |
| **Component Composition** | Avoid drilling by restructuring | Today |

---

### Component Composition as Alternative

Instead of drilling, restructure components:

```jsx
// Instead of drilling user through every component
function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <Layout>
      <Header>
        <Navbar>
          <UserMenu>
            <Avatar name={user.name} />
          </UserMenu>
        </Navbar>
      </Header>
    </Layout>
  )
}

// Better: Pass the component that needs the data
function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <Layout>
      <Header>
        <Navbar>
          <UserMenu>
            {user && <Avatar name={user.name} />}
          </UserMenu>
        </Navbar>
      </Header>
    </Layout>
  )
}
```

---

## 📝 Quick Reference

### Props Syntax

| Prop Type | Syntax | Example |
|-----------|--------|---------|
| String | `prop="value"` | `name="Alice"` |
| Number | `prop={42}` | `age={25}` |
| Boolean | `prop` or `prop={true}` | `isActive` |
| Array | `prop={[1,2,3]}` | `items={['a','b']}` |
| Object | `prop={{ key: 'value' }}` | `user={{ name: 'Alice' }}` |
| Function | `prop={handleClick}` | `onClick={handleClick}` |
| Variable | `prop={variable}` | `name={userName}` |
| Expression | `prop={2+2}` | `age={birthYear + 5}` |

### Children Patterns

```jsx
// Single child
<Card><p>Content</p></Card>

// Multiple children
<Card>
  <h2>Title</h2>
  <p>Content</p>
  <button>Action</button>
</Card>

// No children (self-closing)
<Card />

// Function as child
<DataFetcher>
  {(data) => <Display data={data} />}
</DataFetcher>
```

### Destructuring Props

```jsx
// Basic
function Component({ prop1, prop2 }) { }

// With default
function Component({ prop1 = 'default', prop2 }) { }

// With rest
function Component({ prop1, ...rest }) { }

// Nested
function Component({ user: { name, age } }) { }
```

---

## ✅ Day 31 Checklist

- [ ] Pass props to child components
- [ ] Receive and destructure props
- [ ] Set default values for props
- [ ] Pass strings, numbers, arrays, objects as props
- [ ] Pass functions as props (event handlers)
- [ ] Use `props.children` for wrapper components
- [ ] Build reusable Button component
- [ ] Build Card/Container components
- [ ] Map over array to render multiple components
- [ ] Understand prop drilling problem
- [ ] Build User Profile Gallery project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Props are read-only** — children cannot modify parent props
2. **Destructuring props** makes code cleaner and more readable
3. **Default values** ensure components work without explicit props
4. **`props.children` enables composition** — wrap any content
5. **Functions as props** enable child-to-parent communication
6. **Prop drilling** is passing props through many levels (avoid when possible)
7. **Component composition** can reduce prop drilling
8. **Context API** and **state management** are solutions for deeper prop drilling

---

*Day 31 - Props - Passing Data Between Components*
```