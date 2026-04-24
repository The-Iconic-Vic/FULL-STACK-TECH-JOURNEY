# 📚 Day 33 Resources - Lists, Keys & Conditional Rendering

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: Rendering Lists | https://react.dev/learn/rendering-lists |
| React: Conditional Rendering | https://react.dev/learn/conditional-rendering |
| React: Fragment | https://react.dev/reference/react/Fragment |
| React: Keys | https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key |
| React: Why Keys Matter | https://react.dev/learn/rendering-lists#where-to-get-your-key |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| React Lists and Keys | https://youtu.be/0oS1HJiIQ9Q |
| Conditional Rendering | https://youtu.be/7UstS0hsHgI |
| React Fragments | https://youtu.be/UNqU8RTLch0 |
| Filtering and Sorting in React | https://youtu.be/3PDcE7tDnUk |

## 📝 List Rendering Cheatsheet

### Basic List
```jsx
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### Conditional List
```jsx
{items.length === 0 ? (
  <p>No items</p>
) : (
  items.map(item => <div key={item.id}>{item.name}</div>)
)}
```

### Filtered List
```jsx
const filtered = items.filter(item => item.active)
{filtered.map(item => <div key={item.id}>{item.name}</div>)}
```

## 📝 Conditional Rendering Cheatsheet

### Ternary Operator
```jsx
{condition ? <True /> : <False />}
```

### Logical AND
```jsx
{condition && <Component />}
```

### If-Else Outside JSX
```jsx
if (loading) return <Spinner />
if (error) return <Error />
return <Content />
```

### Multiple Conditions
```jsx
{status === 'success' && <Success />}
{status === 'error' && <Error />}
{status === 'loading' && <Loading />}
```

## 📝 Fragment Cheatsheet

### Short Syntax
```jsx
<>
  <h1>Title</h1>
  <p>Content</p>
</>
```

### Explicit Syntax
```jsx
<Fragment>
  <h1>Title</h1>
  <p>Content</p>
</Fragment>
```

### Keyed Fragment
```jsx
<Fragment key={item.id}>
  <dt>{item.term}</dt>
  <dd>{item.def}</dd>
</Fragment>
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Missing key warning | No key prop | Add unique `key` |
| Using index as key | Reordering list | Use stable ID |
| Extra div in DOM | Wrapper div | Use Fragment |
| 0 showing in UI | Falsy value in && | Use `length > 0 &&` |
| Filter not updating | Missing state | Call setState properly |
| List not re-rendering | Key not unique | Ensure unique keys |

## ✅ Key Best Practices

| Practice | Why |
|----------|-----|
| Use stable IDs for keys | Helps React track items |
| Avoid index as key | Causes issues with reordering |
| Use fragments instead of divs | Cleaner DOM, better CSS |
| Convert to boolean in && | Prevents rendering 0 |
| Memoize filtered data | Performance optimization |
| Extract list item component | Cleaner code, memoization |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React List Best Practices | https://react.dev/learn/rendering-lists#best-practices |
| Understanding React Keys | https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/ |
| Conditional Rendering Patterns | https://react.dev/learn/conditional-rendering |
| Fragments vs Divs | https://react.dev/reference/react/Fragment |

