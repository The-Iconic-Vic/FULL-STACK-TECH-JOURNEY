# 📅 Day 30: JSX Deep Dive & Components

**Date:** April 21, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** JSX Rules, Component Composition, Styling in React

---

## 📋 Learning Objectives

- ✅ Embed JavaScript expressions in JSX with `{}`
- ✅ Understand JSX vs HTML differences (className, htmlFor)
- ✅ Use self-closing tags and Fragments (`<> </>`)
- ✅ Write comments in JSX
- ✅ Compose multiple components together
- ✅ Build component trees
- ✅ Style React components with CSS Modules

---

## 📝 Part 1: JSX Rules & Features

### What is JSX?

JSX = JavaScript + XML. It allows you to write HTML-like syntax inside JavaScript.

```jsx
// JSX (looks like HTML, but it's JavaScript)
const element = <h1 className="title">Hello, World!</h1>

// Same as:
const element = React.createElement('h1', { className: 'title' }, 'Hello, World!')
```

---

### Embedding JavaScript with `{}`

Use curly braces `{}` to embed any JavaScript expression.

```jsx
function Greeting({ name, age, isLoggedIn }) {
  return (
    <div>
      {/* Variables */}
      <h1>Hello, {name}!</h1>
      
      {/* Expressions */}
      <p>Next year you will be {age + 1} years old</p>
      
      {/* Ternary operator */}
      <p>Status: {isLoggedIn ? 'Logged In' : 'Guest'}</p>
      
      {/* Function calls */}
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      
      {/* Arrays (join automatically) */}
      <p>{['React', 'is', 'awesome'].join(' ')}</p>
    </div>
  )
}
```

**What cannot go in `{}`:**
- Statements (if, for, while)
- Multiple expressions without wrapper
- Objects directly (unless for style)

```jsx
// ❌ Wrong - statements not allowed
{ if (true) { return 'Hello' } }

// ❌ Wrong - multiple expressions
{ const x = 5; x * 2 }

// ✅ Correct - use ternary
{ condition ? 'True' : 'False' }

// ✅ Correct - call function
{calculateSomething()}
```

---

### JSX vs HTML Differences

| HTML | JSX | Why |
|------|-----|-----|
| `class` | `className` | `class` is reserved in JavaScript |
| `for` | `htmlFor` | `for` is reserved in JavaScript |
| `tabindex` | `tabIndex` | camelCase for consistency |
| `onclick` | `onClick` | camelCase for consistency |
| `style="color: red"` | `style={{ color: 'red' }}` | Object syntax |

```jsx
// HTML: <div class="container" for="name" onclick="handleClick()">

// JSX:
<div 
  className="container" 
  htmlFor="name" 
  onClick={handleClick}
  style={{ backgroundColor: 'blue', padding: '10px' }}
>
  Content
</div>
```

---

### Self-Closing Tags

All tags can be self-closing.

```jsx
// HTML: <img src="image.jpg" alt="description">

// JSX:
<img src="image.jpg" alt="description" />

// Also works for custom components:
<Avatar src="image.jpg" />
<Icon name="star" />
<Input type="text" />
```

**Rules:**
- Tags without children MUST be self-closing
- Self-closing tags end with `/>`

---

### Fragments (`<> </>`)

Fragments let you return multiple elements without adding an extra DOM node.

```jsx
// ❌ Problem: extra div wrapper
function Component() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  )
}

// ✅ Solution 1: Fragment shorthand
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  )
}

// ✅ Solution 2: Explicit Fragment
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

**When to use Fragments:**
- Returning multiple elements from a component
- Tables (avoid invalid HTML with extra divs)
- CSS Grid/Flexbox layouts (extra divs break layout)

---

### Comments in JSX

```jsx
function Component() {
  return (
    <div>
      {/* This is a JSX comment */}
      <h1>Title</h1>
      
      {/* Multi-line
          comment */}
      <p>Paragraph</p>
      
      {/* 
        Comments can also 
        span multiple lines 
        like this 
      */}
    </div>
  )
}
```

**Rules:**
- Comments go inside `{/* */}`
- Cannot use `//` or `/* */` directly in JSX

---

## 🧩 Part 2: Component Composition

### Creating Components

```jsx
// Avatar.jsx
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />
}
export default Avatar

// Title.jsx
function Title({ children }) {
  return <h2 className="title">{children}</h2>
}
export default Title

// Description.jsx
function Description({ children }) {
  return <p className="description">{children}</p>
}
export default Description
```

---

### Importing and Nesting Components

```jsx
// Card.jsx - Composing components together
import Avatar from './Avatar'
import Title from './Title'
import Description from './Description'

function Card({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatar} alt={user.name} />
      <Title>{user.name}</Title>
      <Description>{user.bio}</Description>
    </div>
  )
}
export default Card
```

---

### Component Tree

```
App
├── Header
│   ├── Logo
│   └── Nav
│       ├── NavLink (Home)
│       ├── NavLink (About)
│       └── NavLink (Contact)
├── Main
│   ├── Sidebar
│   │   ├── ProfileCard
│   │   └── MenuList
│   └── Content
│       └── ProductGrid
│           ├── ProductCard
│           ├── ProductCard
│           └── ProductCard
└── Footer
```

### Organizing Components in Folders

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Icon.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   └── features/
│       ├── ProductCard.jsx
│       ├── ProductGrid.jsx
│       └── UserProfile.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── App.jsx
```

---

### Props: Passing Data to Components

```jsx
// Parent component
function App() {
  const user = { name: 'Victor', age: 25 }
  
  return (
    <div>
      {/* Passing individual props */}
      <Greeting name="Victor" age={25} />
      
      {/* Passing an object */}
      <Profile user={user} />
      
      {/* Passing children */}
      <Card>
        <h3>Card Title</h3>
        <p>Card content goes here</p>
      </Card>
    </div>
  )
}

// Child component receiving props
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>
}
```

---

### Children Prop

The `children` prop allows you to pass JSX content between component tags.

```jsx
// Card component that accepts children
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

// Usage
<Card title="Welcome">
  <p>This content will be passed as children</p>
  <button>Click me</button>
</Card>
```

---

## 🎨 Part 3: Styling in React

### Method 1: Regular CSS Import

```css
/* App.css */
.container {
  padding: 20px;
  background: #f0f0f0;
}
```

```jsx
// App.jsx
import './App.css'

function App() {
  return <div className="container">Content</div>
}
```

**Pros:** Simple, familiar  
**Cons:** Global scope (styles can conflict)

---

### Method 2: CSS Modules (Recommended)

CSS Modules scope styles to the component automatically.

```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
  padding: 10px;
}

.button:hover {
  background: darkblue;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css'

function Button() {
  return <button className={styles.button}>Click</button>
}
```

**Pros:** Scoped styles, no conflicts, auto-generated unique class names  
**Cons:** Need to import styles object

---

### Method 3: Inline Styles

```jsx
function Button({ primary }) {
  const buttonStyle = {
    backgroundColor: primary ? 'blue' : 'gray',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  }
  
  return <button style={buttonStyle}>Click</button>
}
```

**Pros:** Dynamic styles, no extra files  
**Cons:** No pseudo-classes (:hover), no media queries, less performant

---

### Method 4: CSS-in-JS Libraries (Brief Intro)

```jsx
// Styled Components example (not in project)
import styled from 'styled-components'

const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px;
  
  &:hover {
    background: darkblue;
  }
`
```

---

## 📝 Quick Reference

### JSX Rules Summary

| Rule | Example |
|------|---------|
| Embed JS with `{}` | `<h1>{name}</h1>` |
| Use `className` | `<div className="box">` |
| Use `htmlFor` | `<label htmlFor="name">` |
| Self-closing tags | `<img src="..." />` |
| Fragments | `<>...</>` |
| Comments | `{/* comment */}` |
| CamelCase events | `onClick`, `onChange` |

### Component Patterns

```jsx
// Basic component
function Component() {
  return <div>Content</div>
}

// Component with props
function Component({ prop1, prop2 }) {
  return <div>{prop1} {prop2}</div>
}

// Component with children
function Component({ children }) {
  return <div className="wrapper">{children}</div>
}
```

### Styling Methods Comparison

| Method | Scope | Dynamic | Pseudo-classes | Performance |
|--------|-------|---------|----------------|-------------|
| Regular CSS | Global | No | Yes | Good |
| CSS Modules | Scoped | No | Yes | Good |
| Inline Styles | Scoped | Yes | No | Medium |
| Styled Components | Scoped | Yes | Yes | Medium |

---

## ✅ Day 30 Checklist

- [ ] Embed JavaScript in JSX with `{}`
- [ ] Use `className` instead of `class`
- [ ] Use self-closing tags correctly
- [ ] Use Fragments (`<> </>`) to avoid extra divs
- [ ] Write comments in JSX
- [ ] Create multiple components
- [ ] Import and nest components
- [ ] Pass props between components
- [ ] Use children prop for composition
- [ ] Style with CSS Modules
- [ ] Build Product Card Grid project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **JSX is not HTML** — `className`, `htmlFor`, camelCase events
2. **`{}` embeds JavaScript** — variables, expressions, function calls
3. **Fragments avoid extra DOM nodes** — use `<> </>` for multiple elements
4. **Components are reusable** — import and compose them together
5. **Props flow down** — parent passes data to children
6. **Children prop enables composition** — wrap content inside components
7. **CSS Modules are best for scoped styles** — no className conflicts
8. **Organize components in folders** — keeps project maintainable

