# 📘 Props & Children Reference

## Props Fundamentals

### Passing Props

```jsx
// Parent component
function App() {
  const user = { name: 'Victor', age: 25 }
  
  return (
    <div>
      {/* String prop */}
      <Greeting name="Victor" />
      
      {/* Number prop */}
      <AgeDisplay age={25} />
      
      {/* Boolean prop */}
      <Toggle isActive={true} />
      <Toggle isActive />  {/* shorthand */}
      
      {/* Array prop */}
      <ItemList items={['apple', 'banana']} />
      
      {/* Object prop */}
      <UserCard user={user} />
      
      {/* Function prop */}
      <Button onClick={handleClick} />
      
      {/* Spread props */}
      <UserCard {...user} />
    </div>
  )
}
```

### Receiving Props

```jsx
// Without destructuring
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>
}

// With destructuring (recommended)
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age}</h1>
}

// With default values
function Greeting({ name = "Guest", age = 0 }) {
  return <h1>Hello, {name}! You are {age}</h1>
}

// With rest operator
function Greeting({ name, ...otherProps }) {
  console.log(otherProps) // { age: 25, city: 'NYC' }
  return <h1>Hello, {name}!</h1>
}

// Nested destructuring
function UserCard({ user: { name, email, address: { city } } }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{city}</p>
    </div>
  )
}
```

---

## Prop Types

### Primitive Types
```jsx
// String
<UserCard name="Alice" />

// Number
<UserCard age={28} />

// Boolean
<UserCard isActive={true} />
<UserCard isActive />  // equals true

// Null / Undefined
<UserCard optionalProp={null} />
```

### Complex Types
```jsx
// Array
<UserCard hobbies={['coding', 'reading']} />

// Object
<UserCard address={{ city: 'NYC', zip: '10001' }} />

// Function
<UserCard onFollow={handleFollow} />

// JSX Element
<UserCard icon={<StarIcon />} />
```

---

## Children Prop

### Basic Usage
```jsx
// Parent
function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>Content</p>
    </Card>
  )
}

// Child
function Card({ children }) {
  return <div className="card">{children}</div>
}
```

### Children Patterns

```jsx
// Single child
<Card><p>Only one child</p></Card>

// Multiple children
<Card>
  <h2>Title</h2>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card>

// No children (self-closing)
<Card />

// Mixed content
<Card>
  Before content
  <div>JSX element</div>
  After content
</Card>

// Expression as child
<Card>{isLoggedIn ? <Dashboard /> : <Login />}</Card>

// Array as child
<Card>
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</Card>

// Function as child (render prop)
<DataFetcher>
  {(data) => <Display data={data} />}
</DataFetcher>
```

### Children Utilities

```jsx
import { Children } from 'react'

function Container({ children }) {
  // Count children
  const count = Children.count(children)
  
  // Convert to array
  const array = Children.toArray(children)
  
  // Map over children
  const mapped = Children.map(children, child => {
    return <div className="wrapped">{child}</div>
  })
  
  // Single child validation
  const single = Children.only(children)
  
  return <div>{children}</div>
}
```

---

## Wrapper Components

### Card Component
```jsx
function Card({ children, title, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-title">{title}</div>}
      <div className="card-content">{children}</div>
    </div>
  )
}
```

### Modal Component
```jsx
function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
```

### Container Component
```jsx
function Container({ children, maxWidth = '1200px', padding = '1rem' }) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding }}>
      {children}
    </div>
  )
}
```

### Layout Component
```jsx
function Layout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        {sidebar && <aside className="layout-sidebar">{sidebar}</aside>}
        <main className="layout-main">{children}</main>
      </div>
      {footer && <footer className="layout-footer">{footer}</footer>}
    </div>
  )
}
```

---

## Passing Functions as Props

### Event Handlers
```jsx
// Parent
function App() {
  const handleClick = (id) => {
    console.log(`Clicked item ${id}`)
  }
  
  return <Item id={1} onClick={handleClick} />
}

// Child
function Item({ id, onClick }) {
  return <button onClick={() => onClick(id)}>Click</button>
}
```

### Callback Props
```jsx
// Parent
function App() {
  const [data, setData] = useState(null)
  
  const onDataReceived = (newData) => {
    setData(newData)
  }
  
  return <DataFetcher onSuccess={onDataReceived} />
}

// Child
function DataFetcher({ onSuccess }) {
  useEffect(() => {
    fetchData().then(data => onSuccess(data))
  }, [])
  
  return <div>Loading...</div>
}
```

---

## Prop Drilling

### Problem Example
```jsx
// Props passed through multiple levels
function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <Layout user={user}>           {/* Level 1 */}
      <Header user={user}>         {/* Level 2 */}
        <Navbar user={user}>       {/* Level 3 */}
          <UserMenu user={user}>   {/* Level 4 */}
            <Avatar name={user.name} />  {/* Level 5 - needs it */}
          </UserMenu>
        </Navbar>
      </Header>
    </Layout>
  )
}
```

### Solutions

**1. Component Composition**
```jsx
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
```

**2. Context API (Preview)**
```jsx
const UserContext = createContext()

function App() {
  const [user, setUser] = useState({ name: 'Victor' })
  
  return (
    <UserContext.Provider value={user}>
      <Layout>
        <Header>
          <Navbar>
            <UserMenu>
              <Avatar />
            </UserMenu>
          </Navbar>
        </Header>
      </Layout>
    </UserContext.Provider>
  )
}

function Avatar() {
  const user = useContext(UserContext)
  return <img src={user.avatar} alt={user.name} />
}
```

---

## Common Patterns

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
</Select>
```

### Render Props
```jsx
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  return (
    <div onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      {children(position)}
    </div>
  )
}

// Usage
<MouseTracker>
  {({ x, y }) => <p>Mouse at {x}, {y}</p>}
</MouseTracker>
```

### Higher-Order Component (HOC)
```jsx
function withLogger(Component) {
  return function WrappedComponent(props) {
    useEffect(() => {
      console.log(`${Component.name} mounted`)
      return () => console.log(`${Component.name} unmounted`)
    }, [])
    
    return <Component {...props} />
  }
}

// Usage
const UserCardWithLogger = withLogger(UserCard)
```

---

## Props Best Practices

### Do's ✅
```jsx
// Use descriptive prop names
<UserCard firstName="Alice" lastName="Johnson" />

// Destructure props
function UserCard({ firstName, lastName }) { }

// Set default values
function Button({ variant = 'primary' }) { }

// Use spread for remaining props
function Button({ variant, ...rest }) {
  return <button className={`btn-${variant}`} {...rest} />
}
```

### Don'ts ❌
```jsx
// Don't use non-descriptive names
<UserCard a="Alice" b="Johnson" />

// Don't modify props directly
function UserCard({ user }) {
  user.name = 'Modified' // ❌ Never mutate props
  return <div>{user.name}</div>
}

// Don't pass unnecessary props
<Child prop1={value1} prop2={value2} prop3={value3} /> // If only prop1 is used
