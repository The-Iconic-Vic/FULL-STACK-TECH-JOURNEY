# 📘 React Fundamentals Reference

## What is React?

React is a JavaScript library for building user interfaces, maintained by Meta (Facebook).

**Core Principles:**
- Component-based architecture
- Declarative programming
- Virtual DOM for performance
- Unidirectional data flow

---

## React vs Vanilla JavaScript

| Feature | Vanilla JS | React |
|---------|------------|-------|
| DOM updates | Manual | Automatic |
| UI updates | Imperative | Declarative |
| Code organization | Any way | Components |
| State management | Manual | Hooks |
| Performance | Can be slow | Optimized |

### Imperative (Vanilla JS)
```javascript
// You tell HOW to do it
const btn = document.getElementById('myButton');
btn.addEventListener('click', () => {
  const counter = document.getElementById('counter');
  let count = parseInt(counter.textContent);
  count++;
  counter.textContent = count;
});
```

### Declarative (React)
```javascript
// You tell WHAT you want
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

---

## Virtual DOM Explained

```
Real DOM Tree          Virtual DOM Tree
    html                    html
     │                        │
    body                    body
     │                        │
    div                     div
     │                        │
   button                   button

State Change → New Virtual DOM → Diff → Only update changed parts
```

**Process:**
1. State changes
2. React creates new Virtual DOM
3. Compares with previous Virtual DOM (diffing)
4. Calculates minimal changes
5. Updates real DOM only where needed

---

## Component Architecture

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
│   └── Content
│       └── PostList
│           └── PostCard (x3)
└── Footer
```

### Benefits
- **Reusability:** Use same component multiple times
- **Isolation:** Changes in one don't affect others
- **Testability:** Test components in isolation
- **Maintainability:** Easy to find and fix issues

---

## React Project Setup with Vite

### Step 1: Create Project
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

### Step 2: Project Structure
```
my-app/
├── index.html          # Entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite config
├── public/             # Static assets
│   └── vite.svg
└── src/
    ├── main.jsx        # Entry component
    ├── App.jsx         # Root component
    ├── App.css         # Global styles
    ├── components/     # Reusable components
    └── assets/         # Images, fonts
```

### Step 3: Run Development Server
```bash
npm run dev      # Starts dev server at localhost:5173
npm run build    # Builds for production
npm run preview  # Previews production build
```

---

## JSX (JavaScript XML)

### JSX Syntax Rules

| Rule | Wrong | Correct |
|------|-------|---------|
| className | `class="btn"` | `className="btn"` |
| Self-closing | `<img>` | `<img />` |
| Multiple elements | `<h1></h1><p></p>` | `<><h1></h1><p></p></>` |
| JavaScript in JSX | `{name}` | Works! |

### JSX Examples

```jsx
// Variables
const name = "Victor"
<h1>Hello, {name}!</h1>

// Expressions
<h1>2 + 2 = {2 + 2}</h1>
<p>{isLoggedIn ? 'Welcome back' : 'Please login'}</p>

// Functions
<h1>Hello, {formatName(user)}!</h1>

// Inline styles
<div style={{ backgroundColor: 'blue', padding: '10px' }}>

// Events
<button onClick={handleClick}>Click me</button>
```

### JSX vs HTML

```jsx
// HTML
<div class="container" onclick="handleClick()">
  <img src="image.jpg" alt="description">
  <label for="name">Name:</label>
</div>

// JSX
<div className="container" onClick={handleClick}>
  <img src="image.jpg" alt="description" />
  <label htmlFor="name">Name:</label>
</div>
```

---

## Functional Components

### Basic Component
```jsx
function Welcome() {
  return <h1>Hello, World!</h1>
}

export default Welcome
```

### Component with Props
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>
}

// Usage
<Welcome name="Victor" />
```

### Destructuring Props
```jsx
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  )
}
```

### Default Props
```jsx
function Welcome({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>
}
```

---

## CSS Modules

### Creating CSS Module
```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

.button:hover {
  background: darkblue;
}
```

### Using CSS Module
```jsx
import styles from './Button.module.css'

function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  )
}
```

### Multiple Classes
```jsx
// CSS
.primary { background: blue; }
.large { padding: 15px 30px; }

// JSX
<button className={`${styles.primary} ${styles.large}`}>
  Click me
</button>
```

---

## ReactDOM Rendering

### Basic Rendering
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### StrictMode
- Highlights potential problems
- Does not render in production
- Helps with:
  - Deprecated API warnings
  - Side-effect detection
  - Legacy API warnings

---

## Component Import/Export

### Named Export
```jsx
// Button.jsx
export function Button() { ... }
export function Link() { ... }

// Usage
import { Button, Link } from './Button'
```

### Default Export
```jsx
// Button.jsx
function Button() { ... }
export default Button

// Usage
import Button from './Button'
```

### Export All
```jsx
// index.js (barrel file)
export { default as Button } from './Button'
export { default as Card } from './Card'

// Usage
import { Button, Card } from './components'
```

---

## Common React Snippets (VS Code)

| Shortcut | Output |
|----------|--------|
| `rafce` | Arrow function component with export |
| `rfc` | Regular function component |
| `usestate` | useState hook |
| `useeffect` | useEffect hook |
| `clg` | console.log |

---

## Troubleshooting

### Common Errors

| Error | Solution |
|-------|----------|
| `Module not found` | Check import path |
| `'React' is not defined` | Add `import React from 'react'` |
| `JSX not allowed` | File must be `.jsx` not `.js` |
| `Can't find module 'vite'` | Run `npm install` |
| `Port already in use` | Run `npm run dev -- --port 3000` |

### Development Tips
1. Always check browser console for errors
2. Use React DevTools extension
3. Keep components small and focused
4. Use meaningful component names
5. Follow file naming conventions (PascalCase for components)

---

## VS Code Extensions for React

| Extension | Purpose |
|-----------|---------|
| ES7+ React/Redux/React-Native snippets | Code snippets |
| Prettier | Code formatting |
| ESLint | Code linting |
| React DevTools | Browser extension |
| Tailwind CSS IntelliSense | CSS help |

### Recommended VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.jsx": "javascriptreact",
    "*.css": "tailwindcss"
  }
}
