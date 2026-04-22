# 📚 Day 31 Resources - Props & Children

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Passing Props to a Component | https://react.dev/learn/passing-props-to-a-component |
| React: Component Props | https://react.dev/reference/react/Component#props |
| React: JSX in Depth (Props) | https://react.dev/learn/javascript-in-jsx-with-curly-braces |
| React: Children Prop | https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children |
| React: Rendering Lists (map) | https://react.dev/learn/rendering-lists |
| React: Conditional Rendering | https://react.dev/learn/conditional-rendering |
| React: Passing Functions as Props | https://react.dev/learn/responding-to-events |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| React Props Explained | https://youtu.be/mr1TNTBn8aE |
| Children Prop Tutorial | https://youtu.be/3PDcE7tDnUk |
| Prop Drilling Explained | https://youtu.be/3pY5c6L2I2M |
| Component Composition Patterns | https://youtu.be/3PDcE7tDnUk |
| Reusable Components with Props | https://youtu.be/cF2P0FgH9MY |

## 📝 Props Cheatsheet

### Passing Props
```jsx
// String
<Component name="Victor" />

// Number
<Component age={25} />

// Boolean
<Component isActive={true} />
<Component isActive />  // shorthand

// Array
<Component items={['a', 'b', 'c']} />

// Object
<Component user={{ name: 'Victor', age: 25 }} />

// Function
<Component onClick={handleClick} />

// Variable
<Component name={userName} />

// Expression
<Component age={birthYear + 5} />

// Spread
<Component {...userProps} />
```

### Receiving Props
```jsx
// Without destructuring
function Component(props) {
  return <div>{props.name}</div>
}

// With destructuring (recommended)
function Component({ name, age }) {
  return <div>{name} is {age}</div>
}

// With default values
function Component({ name = "Guest", age = 0 }) {
  return <div>{name} is {age}</div>
}

// With rest
function Component({ name, ...rest }) {
  return <div>{name} {JSON.stringify(rest)}</div>
}
```

## 📝 Children Cheatsheet

### Basic Usage
```jsx
// Parent
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>

// Child
function Card({ children }) {
  return <div className="card">{children}</div>
}
```

### Children Patterns
```jsx
// Single child
<Wrapper>{content}</Wrapper>

// Multiple children
<Wrapper>
  <h2>Title</h2>
  <p>Paragraph</p>
  <button>Click</button>
</Wrapper>

// No children
<Wrapper />

// Function as child (render prop)
<DataFetcher>
  {(data) => <Display data={data} />}
</DataFetcher>

// Conditional children
<Wrapper>
  {isLoading && <Spinner />}
  {!isLoading && data && <Content data={data} />}
</Wrapper>
```

## 📝 Prop Drilling Solutions

| Solution | Best For | Complexity |
|----------|----------|------------|
| Component Composition | Avoiding unnecessary drilling | Low |
| Context API | Medium apps, theme, auth | Medium |
| Zustand | Small to medium apps | Low |
| Redux | Large apps, complex state | High |

## 🛠️ VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| ES7+ React/Redux/React-Native snippets | React snippets |
| Prettier | Code formatting |
| React DevTools | Browser extension |

## ✅ Common Snippets (ES7 Extension)

| Shortcut | Output |
|----------|--------|
| `rafce` | Arrow function component with export |
| `rfc` | Regular function component |
| `usestate` | useState hook |
| `clg` | console.log |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Props not received | Wrong prop name | Check spelling and case |
| `undefined` prop | Prop not passed | Add default value |
| `children` not rendering | Missing `{children}` | Add `{children}` in return |
| Function prop not working | Wrong call signature | Check function parameters |
| Props mutating | Direct modification | Never modify props directly |
| Prop drilling | Deep component tree | Use composition or Context |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Component Composition | https://react.dev/learn/passing-props-to-a-component |
| Composition vs Inheritance | https://react.dev/learn/composition-vs-inheritance |
| Render Props Pattern | https://react.dev/learn/reusing-logic-with-render-props |
| Higher-Order Components | https://react.dev/learn/reusing-logic-with-higher-order-components |
