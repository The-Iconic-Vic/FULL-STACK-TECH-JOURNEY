# 📅 Day 29: React Fundamentals & Environment Setup

**Date:** April 20, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** React Introduction, Vite Setup, Components, JSX

---

## 📋 Learning Objectives

- ✅ Understand what React is and why it's used
- ✅ Differentiate between library and framework
- ✅ Understand the virtual DOM concept
- ✅ Learn component-based architecture
- ✅ Set up a React project with Vite
- ✅ Create your first React component
- ✅ Understand JSX syntax

---

## ⚛️ Part 1: What is React?

### React is a Library, Not a Framework

| Library | Framework |
|---------|-----------|
| Focused on one thing (UI) | Full-featured (routing, state, HTTP, etc.) |
| You choose additional tools | Everything is included |
| More flexible | More opinionated |
| Smaller learning curve | Steeper learning curve |

**Examples:**
- **Libraries:** React, jQuery, Lodash
- **Frameworks:** Angular, Vue (full framework), Next.js (React framework)

---

### Why React?

| Problem | React Solution |
|---------|----------------|
| DOM manipulation is slow | Virtual DOM for performance |
| UI code becomes messy | Component-based architecture |
| State management is hard | One-way data flow |
| Reusing UI is difficult | Reusable components |

---

### The Virtual DOM

React creates a lightweight copy of the actual DOM (called Virtual DOM). When state changes:

1. React creates a new Virtual DOM tree
2. Compares with previous Virtual DOM (diffing)
3. Calculates the minimal changes needed
4. Updates only those elements in the real DOM

```
State Change → New Virtual DOM → Diff → Real DOM Update (only changed parts)
```

**Benefits:**
- Performance optimization
- Batched updates
- Cross-platform (React Native uses same concept)

---

### Declarative vs Imperative

**Imperative (Vanilla JavaScript - HOW to do it):**
```javascript
const element = document.getElementById('myDiv');
element.style.backgroundColor = 'blue';
element.textContent = 'Hello';
```

**Declarative (React - WHAT to display):**
```jsx
<div style={{ backgroundColor: 'blue' }}>Hello</div>
```

You tell React WHAT you want, React handles HOW.

---

### Component-Based Architecture

Everything in React is a component - reusable, independent pieces of UI.

```
App
├── Header
│   ├── Logo
│   └── NavLinks
├── Main
│   ├── Sidebar
│   └── Content
│       ├── PostList
│       └── PostCard
└── Footer
```

**Benefits:**
- Reusable across the app
- Isolated (changes in one don't affect others)
- Easier to test
- Easier to maintain

---

## 🛠️ Part 2: Setting Up React

### Two Main Approaches

| Method | Status | Recommendation |
|--------|--------|----------------|
| Create React App (CRA) | Deprecated | ❌ Not recommended |
| Vite | Modern standard | ✅ Recommended |

---

### Setting Up with Vite

```bash
# Create a new React project
npm create vite@latest my-first-react-app -- --template react

# Navigate to project
cd my-first-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

### Folder Structure Explained

```
my-first-react-app/
│
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
│
├── public/                 # Static assets (served as-is)
│   └── vite.svg
│
└── src/                    # Source code
    ├── main.jsx            # Entry point (renders App)
    ├── App.jsx             # Main App component
    ├── App.css             # App styles
    ├── components/         # Reusable components
    │   └── Greeting.jsx
    └── assets/             # Images, fonts, etc.
```

---

### package.json Explained

```json
{
  "name": "my-first-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",           // Start dev server
    "build": "vite build",   // Build for production
    "preview": "vite preview" // Preview production build
  },
  "dependencies": {
    "react": "^18.2.0",      // React core
    "react-dom": "^18.2.0"   // React DOM renderer
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1", // React plugin for Vite
    "vite": "^5.0.8"                  // Vite bundler
  }
}
```

---

## 📝 Part 3: Your First React Component

### What is JSX?

JSX = JavaScript + XML (HTML-like syntax in JavaScript)

```jsx
// JSX (looks like HTML, but it's JavaScript)
const element = <h1 className="title">Hello, World!</h1>

// Same as:
const element = React.createElement('h1', { className: 'title' }, 'Hello, World!')
```

**JSX Rules:**
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- Self-closing tags: `<img />`, `<input />`
- Wrap multiple elements in `<></>` (Fragment)

---

### Creating a Functional Component

```jsx
// Greeting.jsx
function Greeting() {
  const name = "Victor"
  
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React</p>
    </div>
  )
}

export default Greeting
```

**Component Rules:**
- Name starts with capital letter
- Returns JSX
- Can only return ONE parent element
- Use `export default` to make it available

---

### Using a Component

```jsx
// App.jsx
import Greeting from './components/Greeting'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Greeting />
    </div>
  )
}

export default App
```

---

### Rendering to the DOM

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### CSS Modules for Component Styling

```css
/* Greeting.module.css */
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
}
```

```jsx
// Greeting.jsx
import styles from './Greeting.module.css'

function Greeting() {
  return (
    <div className={styles.card}>
      Hello, World!
    </div>
  )
}
```

**Benefits of CSS Modules:**
- Scoped to the component (no conflicts)
- Class names are hashed automatically
- No naming collisions

---

## 📝 Quick Reference

### Component Template
```jsx
function ComponentName() {
  return (
    <div>
      {/* JSX content */}
    </div>
  )
}
export default ComponentName
```

### JSX Expressions
```jsx
// Variables
const name = "Victor"
<h1>Hello, {name}!</h1>

// Functions
<h1>Hello, {getName()}!</h1>

// Conditional rendering
{isLoggedIn ? <LogoutButton /> : <LoginButton />}

// Lists
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

### Vite Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## ✅ Day 29 Checklist

- [ ] Understand React as a UI library
- [ ] Understand virtual DOM concept
- [ ] Understand component-based architecture
- [ ] Install Node.js on your computer
- [ ] Install VS Code React extensions
- [ ] Create React project with Vite
- [ ] Understand folder structure
- [ ] Create a functional component
- [ ] Use JSX syntax
- [ ] Use CSS Modules for styling
- [ ] Render component to DOM
- [ ] Build Greeting component mini-project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **React is a library, not a framework** — focused only on UI
2. **Virtual DOM improves performance** — only updates what changed
3. **Components are reusable building blocks** — like LEGO pieces
4. **Vite is the modern way** to start React projects (not Create React App)
5. **JSX looks like HTML** but it's JavaScript with special syntax
6. **Components must start with capital letters** — distinguishes from HTML tags
7. **CSS Modules scope styles to components** — no more CSS conflicts
8. **ReactDOM.render is the entry point** — mounts your app to the DOM

---

*Day 29 - React Fundamentals & Environment Setup*
```