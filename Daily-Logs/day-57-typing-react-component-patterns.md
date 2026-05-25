# 📅 Day 57: Typing React Component Patterns

**Date:** May 25, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Component Props Patterns, Advanced Prop Patterns, Forwarding Refs

---

## 📋 Learning Objectives

- ✅ Use `React.FC<Props>` vs direct function typing
- ✅ Type children prop with `React.ReactNode`
- ✅ Set default props in TypeScript components
- ✅ Create polymorphic components with `as` prop
- ✅ Spread rest props with proper typing
- ✅ Use `React.forwardRef` with TypeScript
- ✅ Type refs with generics and `useImperativeHandle`

---

## 📦 Part 1: Component Props Patterns

### React.FC<Props> vs Direct Typing

There are two common ways to type functional components in React.

```tsx
// Method 1: React.FC<Props> (provides children implicitly)
interface ButtonProps {
    variant: 'primary' | 'secondary';
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};

// Method 2: Direct typing (more explicit, preferred by many)
const Button = ({ variant, onClick, children }: ButtonProps) => {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};
```

**Difference:** `React.FC` automatically includes `children` prop. Direct typing requires you to add `children?: React.ReactNode` if needed.

---

### Children Prop Types

```tsx
// Basic children
interface CardProps {
    children: React.ReactNode;  // Any renderable content
}

// Multiple children
interface LayoutProps {
    header: React.ReactNode;
    sidebar: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
}

// Function as child (render prop)
interface DataProviderProps {
    children: (data: User[]) => React.ReactNode;
}

// React elements only (no text or numbers)
interface WrapperProps {
    children: React.ReactElement;
}

// Multiple React elements
interface ListProps {
    children: React.ReactElement[];
}
```

---

### Default Props in TypeScript

```tsx
interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: React.ReactNode;
}

// Method 1: Default values in destructuring (recommended)
const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    children 
}: ButtonProps) => {
    return (
        <button className={`btn btn-${variant} btn-${size}`} disabled={disabled}>
            {children}
        </button>
    );
};

// Method 2: Default props property (legacy)
Button.defaultProps = {
    variant: 'primary',
    size: 'md',
    disabled: false
};
```

---

## 🎯 Part 2: Advanced Prop Patterns

### Polymorphic Components (as Prop)

Allows a component to render as different HTML elements.

```tsx
interface TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    color?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    weight?: 'normal' | 'bold' | 'light';
    children: React.ReactNode;
}

const Text = ({ as: Component = 'p', color, size, weight, children }: TextProps) => {
    const className = `text text-${size} text-${weight}`;
    const style = color ? { color } : {};
    
    return (
        <Component className={className} style={style}>
            {children}
        </Component>
    );
};

// Usage
<Text as="h1" size="xl" weight="bold">Heading</Text>
<Text as="span" color="blue">Inline text</Text>
```

---

### Generic Polymorphic Component (Advanced)

Using TypeScript generics to properly type the `as` prop.

```tsx
type PolymorphicProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const PolymorphicText = <T extends React.ElementType = 'p'>({
    as,
    children,
    ...restProps
}: PolymorphicProps<T>) => {
    const Component = as || 'p';
    return <Component {...restProps}>{children}</Component>;
};

// Usage - gets all props of the rendered element type
<PolymorphicText as="h1" id="main-title" className="title">
    Heading
</PolymorphicText>
```

---

### Rest Props Spreading with Types

```tsx
interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

// Rest props capture all remaining props
const Button = ({ variant = 'primary', children, ...restProps }: ButtonProps) => {
    return (
        <button className={`btn btn-${variant}`} {...restProps}>
            {children}
        </button>
    );
};

// Now Button accepts all native button props
<Button 
    variant="primary" 
    onClick={() => {}} 
    disabled={false}
    type="submit"
>
    Click me
</Button>
```

---

### Omit and Pick for Props Manipulation

```tsx
// Base props interface
interface BaseInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

// Native input props
type NativeInputProps = React.ComponentPropsWithoutRef<'input'>;

// Combine: all BaseInputProps + selected native props
type InputProps = BaseInputProps & Pick<NativeInputProps, 'placeholder' | 'disabled'>;

const Input = ({ label, name, value, onChange, error, ...nativeProps }: InputProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...nativeProps}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};
```

---

## 🔄 Part 3: Forwarding Refs

### React.forwardRef with TypeScript

```tsx
interface InputProps {
    label: string;
    type?: 'text' | 'email' | 'password';
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = 'text', error }, ref) => {
        return (
            <div>
                <label>{label}</label>
                <input ref={ref} type={type} />
                {error && <span className="error">{error}</span>}
            </div>
        );
    }
);

// Usage in parent
const Parent = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const focusInput = () => {
        inputRef.current?.focus();
    };
    
    return <Input ref={inputRef} label="Username" />;
};
```

---

### Generic forwardRef

For components that need to forward ref to different element types.

```tsx
interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

// Forward ref as HTMLButtonElement
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', children }, ref) => {
        return (
            <button ref={ref} className={`btn btn-${variant}`}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
```

---

### useImperativeHandle with Types

Expose specific methods from a child component to parent.

```tsx
// Define the exposed methods interface
export interface CustomInputHandle {
    focus: () => void;
    clear: () => void;
    getValue: () => string;
}

interface CustomInputProps {
    label: string;
    defaultValue?: string;
}

const CustomInput = React.forwardRef<CustomInputHandle, CustomInputProps>(
    ({ label, defaultValue = '' }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [value, setValue] = useState(defaultValue);
        
        useImperativeHandle(ref, () => ({
            focus: () => {
                inputRef.current?.focus();
            },
            clear: () => {
                setValue('');
                inputRef.current?.focus();
            },
            getValue: () => value
        }), [value]);
        
        return (
            <div>
                <label>{label}</label>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        );
    }
);

// Usage in parent
const Parent = () => {
    const inputRef = useRef<CustomInputHandle>(null);
    
    const handleClear = () => {
        inputRef.current?.clear();
    };
    
    const handleGetValue = () => {
        console.log(inputRef.current?.getValue());
    };
    
    return (
        <>
            <CustomInput ref={inputRef} label="Username" />
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleGetValue}>Get Value</button>
        </>
    );
};
```

---

## 🧩 Part 4: Component Composition Patterns

### Compound Components

```tsx
interface CardProps {
    children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
    return <div className="card">{children}</div>;
};

interface CardHeaderProps {
    children: React.ReactNode;
}

const CardHeader = ({ children }: CardHeaderProps) => {
    return <div className="card-header">{children}</div>;
};

interface CardBodyProps {
    children: React.ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
    return <div className="card-body">{children}</div>;
};

// Attach subcomponents to main component
Card.Header = CardHeader;
Card.Body = CardBody;

// Usage
<Card>
    <Card.Header>Title</Card.Header>
    <Card.Body>Content goes here</Card.Body>
</Card>
```

---

### Render Props Pattern

```tsx
interface MouseTrackerProps {
    children: (position: { x: number; y: number }) => React.ReactNode;
}

const MouseTracker = ({ children }: MouseTrackerProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };
    
    return (
        <div onMouseMove={handleMouseMove} style={{ height: '100%' }}>
            {children(position)}
        </div>
    );
};

// Usage
<MouseTracker>
    {({ x, y }) => (
        <p>Mouse position: {x}, {y}</p>
    )}
</MouseTracker>
```

---

## 📝 Quick Reference

### Component Patterns Cheatsheet

| Pattern | Syntax | Use Case |
|---------|--------|----------|
| Basic Props | `interface Props { name: string }` | Simple components |
| Children | `children: React.ReactNode` | Wrapper components |
| Default Props | `const Component = ({ prop = 'default' }: Props) => {}` | Optional props |
| Polymorphic | `as?: T extends ElementType` | Flexible rendering |
| Forward Ref | `React.forwardRef<T, Props>` | Access DOM nodes |
| Render Props | `children: (data) => ReactNode` | Shared logic |
| Compound | `Component.SubComponent` | Related components |

### Ref Types

| Ref Target | Type |
|------------|------|
| HTMLDivElement | `React.RefObject<HTMLDivElement>` |
| HTMLInputElement | `React.RefObject<HTMLInputElement>` |
| HTMLButtonElement | `React.RefObject<HTMLButtonElement>` |
| Custom Component | `React.RefObject<CustomHandle>` |

---

## ✅ Day 57 Checklist

- [ ] Type component props with interfaces
- [ ] Type children prop with `React.ReactNode`
- [ ] Set default props in destructuring
- [ ] Create polymorphic component with `as` prop
- [ ] Spread rest props with proper typing
- [ ] Use `Pick` and `Omit` for props manipulation
- [ ] Forward refs with `React.forwardRef`
- [ ] Use `useImperativeHandle` to expose methods
- [ ] Build Polymorphic Text Component
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **`React.FC` includes children automatically** - but many prefer explicit typing
2. **Use destructuring defaults for optional props** - cleaner than `.defaultProps`
3. **`React.ReactNode` is the most flexible children type** - accepts anything renderable
4. **Polymorphic components use generic type parameters** - restrict to valid HTML tags
5. **Spread rest props with `...restProps`** - passes all native attributes
6. **`React.forwardRef` requires two type parameters** - ref type and props type
7. **`useImperativeHandle` exposes custom methods** - great for form components
8. **Compound components attach subcomponents as properties** - intuitive API

