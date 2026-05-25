# 📘 React Component Patterns with TypeScript

## Component Props Patterns

### Basic Component Props

```tsx
interface ButtonProps {
    variant: 'primary' | 'secondary';
    onClick: () => void;
    children: React.ReactNode;
}

// Method 1: React.FC (includes children implicitly)
const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};

// Method 2: Direct typing (preferred by many)
const Button = ({ variant, onClick, children }: ButtonProps) => {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};
```

### Children Prop Types

```tsx
// Any renderable content
interface CardProps {
    children: React.ReactNode;
}

// Single React element (no text)
interface WrapperProps {
    children: React.ReactElement;
}

// Multiple elements
interface ListProps {
    children: React.ReactElement[];
}

// Function as child (render prop)
interface DataProviderProps {
    children: (data: User[]) => React.ReactNode;
}

// Render prop with specific return type
interface MouseTrackerProps {
    children: (position: { x: number; y: number }) => React.ReactNode;
}
```

### Optional Props and Default Values

```tsx
interface ButtonProps {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: React.ReactNode;
}

// Default values in destructuring (recommended)
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

// Alternative: defaultProps (legacy, avoid)
Button.defaultProps = {
    variant: 'primary',
    size: 'md',
    disabled: false
};
```

---

## Advanced Prop Patterns

### Polymorphic Components (as Prop)

```tsx
// Basic polymorphic (limited element types)
interface TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Text = ({ as: Component = 'p', color, size, children }: TextProps) => {
    return <Component style={{ color }} className={`text-${size}`}>{children}</Component>;
};

// Generic polymorphic (full type safety)
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

// Usage - gets all native props of the rendered element
<PolymorphicText as="h1" id="main-title" className="heading">
    Title
</PolymorphicText>
```

### Rest Props Spreading

```tsx
interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

const Button = ({ variant = 'primary', children, ...restProps }: ButtonProps) => {
    return (
        <button className={`btn btn-${variant}`} {...restProps}>
            {children}
        </button>
    );
};

// Now accepts all native button props
<Button 
    variant="primary" 
    onClick={() => {}} 
    disabled={false}
    type="submit"
    aria-label="Submit"
>
    Submit
</Button>
```

### Props Manipulation (Pick, Omit)

```tsx
// Base props
interface BaseInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

// Native input props
type NativeInputProps = React.ComponentPropsWithoutRef<'input'>;

// Pick specific native props
type InputProps = BaseInputProps & Pick<NativeInputProps, 'placeholder' | 'disabled' | 'maxLength'>;

// Omit unwanted native props
type InputWithOmit = BaseInputProps & Omit<NativeInputProps, 'name' | 'value' | 'onChange'>;

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

## Forwarding Refs

### Basic forwardRef

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

// Usage
const Parent = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const focusInput = () => {
        inputRef.current?.focus();
    };
    
    return <Input ref={inputRef} label="Username" />;
};
```

### Generic forwardRef with DisplayName

```tsx
interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

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

### useImperativeHandle with Types

```tsx
// Define exposed methods interface
export interface CustomInputHandle {
    focus: () => void;
    clear: () => void;
    getValue: () => string;
    setValue: (value: string) => void;
}

interface CustomInputProps {
    label: string;
    defaultValue?: string;
    placeholder?: string;
}

const CustomInput = React.forwardRef<CustomInputHandle, CustomInputProps>(
    ({ label, defaultValue = '', placeholder }, ref) => {
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
            getValue: () => value,
            setValue: (newValue: string) => {
                setValue(newValue);
                inputRef.current?.focus();
            }
        }), [value]);
        
        return (
            <div>
                <label>{label}</label>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        );
    }
);

// Parent component using the exposed methods
const Parent = () => {
    const inputRef = useRef<CustomInputHandle>(null);
    
    const handleClear = () => {
        inputRef.current?.clear();
    };
    
    const handleGetValue = () => {
        console.log(inputRef.current?.getValue());
    };
    
    const handleSetValue = () => {
        inputRef.current?.setValue('New Value');
    };
    
    return (
        <>
            <CustomInput ref={inputRef} label="Username" />
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleGetValue}>Get Value</button>
            <button onClick={handleSetValue}>Set Value</button>
        </>
    );
};
```

---

## Component Composition Patterns

### Compound Components

```tsx
// Main component
interface CardProps {
    children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
    return <div className="card">{children}</div>;
};

// Subcomponents
interface CardHeaderProps {
    children: React.ReactNode;
    action?: React.ReactNode;
}

const CardHeader = ({ children, action }: CardHeaderProps) => {
    return (
        <div className="card-header">
            <h3>{children}</h3>
            {action && <div className="card-action">{action}</div>}
        </div>
    );
};

interface CardBodyProps {
    children: React.ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
    return <div className="card-body">{children}</div>;
};

interface CardFooterProps {
    children: React.ReactNode;
}

const CardFooter = ({ children }: CardFooterProps) => {
    return <div className="card-footer">{children}</div>;
};

// Attach subcomponents
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Usage
<Card>
    <Card.Header action={<button>Edit</button>}>Title</Card.Header>
    <Card.Body>Content goes here</Card.Body>
    <Card.Footer>Footer text</Card.Footer>
</Card>
```

### Render Props Pattern

```tsx
// Generic data provider
interface DataProviderProps<T> {
    url: string;
    children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

function DataProvider<T>({ url, children }: DataProviderProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);
    
    return <>{children(data, loading, error)}</>;
}

// Usage
<DataProvider<User> url="/api/user">
    {(user, loading, error) => {
        if (loading) return <Spinner />;
        if (error) return <Error message={error.message} />;
        return <div>Welcome, {user?.name}</div>;
    }}
</DataProvider>
```

---

## Higher-Order Components (HOC) with TypeScript

```tsx
interface WithLoadingProps {
    loading: boolean;
}

function withLoading<P extends WithLoadingProps>(
    WrappedComponent: React.ComponentType<P>
) {
    return function WithLoadingComponent(props: Omit<P, keyof WithLoadingProps>) {
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            // Simulate loading
            const timer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timer);
        }, []);
        
        return <WrappedComponent {...(props as P)} loading={loading} />;
    };
}

// Usage
interface UserListProps {
    users: User[];
    loading: boolean;
}

const UserListComponent = ({ users, loading }: UserListProps) => {
    if (loading) return <Spinner />;
    return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
};

const UserList = withLoading(UserListComponent);
```

---

## Quick Reference Table

| Pattern | Syntax | Key Type |
|---------|--------|----------|
| Component Props | `interface Props { ... }` | `React.FC<Props>` or direct typing |
| Children | `children: React.ReactNode` | `React.ReactNode` |
| Default Props | `const Comp = ({ prop = 'default' }: Props) => {}` | TypeScript default values |
| Polymorphic | `as?: T extends ElementType` | `React.ComponentPropsWithoutRef<T>` |
| Forward Ref | `React.forwardRef<T, Props>` | `React.ForwardRefRenderFunction` |
| Imperative Handle | `useImperativeHandle(ref, () => ({ ... }))` | Custom interface |
| Render Props | `children: (data) => ReactNode` | Generic function type |
| Compound | `Component.SubComponent = SubComp` | Namespace pattern |
| HOC | `function withX<P>(Comp: ComponentType<P>)` | `Omit<P, 'extraProp'>` |

### Ref Types

| Element | Ref Type |
|---------|----------|
| HTMLDivElement | `React.RefObject<HTMLDivElement>` |
| HTMLInputElement | `React.RefObject<HTMLInputElement>` |
| HTMLButtonElement | `React.RefObject<HTMLButtonElement>` |
| HTMLFormElement | `React.RefObject<HTMLFormElement>` |
| Custom Component | `React.RefObject<CustomHandle>` |
