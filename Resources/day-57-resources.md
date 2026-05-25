# 📚 Day 57 Resources - Typing React Component Patterns

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React TypeScript Cheatsheet | https://react-typescript-cheatsheet.netlify.app/ |
| React: Forwarding Refs | https://react.dev/reference/react/forwardRef |
| React: useImperativeHandle | https://react.dev/reference/react/useImperativeHandle |
| TypeScript: React Component Types | https://www.typescriptlang.org/docs/handbook/react-&-webpack.html |
| React: Render Props | https://react.dev/reference/react/Children |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| React TypeScript Component Patterns | https://youtu.be/5Z2yu0m8w5Y |
| forwardRef with TypeScript | https://youtu.be/6ThXsUwLWvc |
| Polymorphic Components | https://youtu.be/2jM5l1QxE1g |
| Compound Components Pattern | https://youtu.be/3PDcE7tDnUk |

## 📝 Component Patterns Cheatsheet

### Basic Component
```tsx
interface Props { name: string; }
const Component: React.FC<Props> = ({ name }) => <div>{name}</div>;
```

### Children Prop
```tsx
interface Props { children: React.ReactNode; }
```

### Default Props
```tsx
const Component = ({ variant = 'primary' }: Props) => {}
```

### Polymorphic Component
```tsx
type Props<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;
const Component = <T extends ElementType = 'div'>({ as, ...props }: Props<T>) => {
    const Element = as || 'div';
    return <Element {...props} />;
};
```

### Forward Ref
```tsx
const Component = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
    <div ref={ref} {...props} />
));
```

### Compound Component
```tsx
const Card = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
Card.Header = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
```

## ✅ Common Types Reference

| Type | Description |
|------|-------------|
| `React.ReactNode` | Any renderable content |
| `React.ReactElement` | Single React element |
| `React.ComponentPropsWithoutRef<'button'>` | Native button props |
| `React.HTMLAttributes<HTMLElement>` | Generic HTML attributes |
| `React.ButtonHTMLAttributes<HTMLButtonElement>` | Button-specific attributes |
| `React.DOMAttributes<T>` | DOM event handlers |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Property 'children' does not exist` | Using direct typing without children | Add `children: React.ReactNode` to props |
| `Ref is not assignable` | Wrong ref type | Use `React.forwardRef<T, Props>` |
| `as prop not working` | Missing generic type | Use `T extends ElementType` generic |
| `Rest props not typed` | Missing spread types | Use `ComponentPropsWithoutRef<T>` |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React TypeScript Cheatsheet (Advanced) | https://react-typescript-cheatsheet.netlify.app/docs/advanced/ |
| Patterns for React with TypeScript | https://github.com/typescript-cheatsheets/react |
| React + TypeScript: Component Patterns | https://www.carlrippon.com/react-component-patterns-with-typescript/ |

