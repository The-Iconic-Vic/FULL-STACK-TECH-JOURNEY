# 📚 Day 30 Resources - JSX Deep Dive & Components

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Writing Markup with JSX | https://react.dev/learn/writing-markup-with-jsx |
| React: JavaScript in JSX with Curly Braces | https://react.dev/learn/javascript-in-jsx-with-curly-braces |
| React: Your First Component | https://react.dev/learn/your-first-component |
| React: Passing Props to Component | https://react.dev/learn/passing-props-to-a-component |
| React: Conditional Rendering | https://react.dev/learn/conditional-rendering |
| React: Rendering Lists | https://react.dev/learn/rendering-lists |
| React: Fragments | https://react.dev/reference/react/Fragment |
| React: CSS Modules | https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JSX Explained | https://youtu.be/7fPXI_MnBOY |
| React Components Tutorial | https://youtu.be/cF2P0FgH9MY |
| Component Composition | https://youtu.be/3PDcE7tDnUk |
| CSS Modules in React | https://youtu.be/6Xm6S8Z3gOk |
| Styling React Components | https://youtu.be/jx5hDOpNfKs |

## 📝 JSX Cheatsheet

### Embedding JavaScript
```jsx
{variable}
{expression}
{function()}
{condition ? 'True' : 'False'}
{isLoading && <Spinner />}
```

### JSX vs HTML
| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |
| `style="color: red"` | `style={{ color: 'red' }}` |
| `<!-- comment -->` | `{/* comment */}` |

### Fragments
```jsx
// Short syntax
<>...</>

// Explicit
<Fragment>...</Fragment>

// With key
<Fragment key={id}>...</Fragment>
```

## 📝 Component Cheatsheet

### Basic Component
```jsx
function Component({ prop1, prop2 }) {
  return <div>{prop1}</div>
}
export default Component
```

### Component with Children
```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

### Component Composition
```jsx
function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </Layout>
  )
}
```

## 📝 Styling Cheatsheet

### CSS Modules
```css
/* Component.module.css */
.container { padding: 20px; }
.title { color: blue; }
```

```jsx
import styles from './Component.module.css'
<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

### Inline Styles
```jsx
<div style={{ 
  color: 'red', 
  fontSize: '16px',
  marginTop: '20px'
}}>
  Content
</div>
```

### Conditional Classes
```jsx
<div className={`base ${isActive ? 'active' : ''}`}>
<div className={['base', isActive && 'active'].filter(Boolean).join(' ')}>
```

## 🛠️ VS Code Extensions

| Extension | Purpose | ID |
|-----------|---------|-----|
| ES7+ React/Redux/React-Native snippets | React snippets | dsznajder.es7-react-js-snippets |
| Prettier | Code formatting | esbenp.prettier-vscode |
| ESLint | Code linting | dbaeumer.vscode-eslint |
| CSS Modules | CSS Module support | clarkbdo.css-modules |

## ✅ Common Snippets (ES7 Extension)

| Shortcut | Output |
|----------|--------|
| `rafce` | Arrow function component with export |
| `rfc` | Regular function component |
| `rfce` | Function component with export |
| `usestate` | useState hook |
| `useeffect` | useEffect hook |
| `clg` | console.log |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `'className' not recognized` | Using `class` instead of `className` | Change to `className` |
| Multiple root elements error | Returning multiple elements without wrapper | Use Fragment `<> </>` |
| `children is not defined` | Forgot to destructure children | Add `{ children }` to props |
| Styles not applying | CSS Module import path wrong | Check `import styles from './file.module.css'` |
| `key` prop warning | List without unique key | Add `key={item.id}` to mapped elements |
| Component not rendering | Missing export | Add `export default ComponentName` |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Thinking in React | https://react.dev/learn/thinking-in-react |
| Component Composition Patterns | https://react.dev/learn/passing-props-to-a-component |
| Styling in React | https://react.dev/learn/styling |
| React Developer Tools | https://react.dev/learn/react-developer-tools |

