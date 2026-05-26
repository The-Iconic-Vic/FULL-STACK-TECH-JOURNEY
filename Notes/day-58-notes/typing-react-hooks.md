# 📘 Typing React Hooks with TypeScript

## useState

### Type Inference

TypeScript automatically infers the type from the initial value.

```tsx
// Inferred types
const [count, setCount] = useState(0);        // count: number
const [name, setName] = useState('');         // name: string
const [isActive, setIsActive] = useState(false); // isActive: boolean

// Problem: empty array infers never[]
const [todos, setTodos] = useState([]);       // todos: never[] (too restrictive!)
```

### Explicit Type Parameters

```tsx
// Null initial value
const [user, setUser] = useState<User | null>(null);

// Empty array
const [items, setItems] = useState<Item[]>([]);

// Union type
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

// Complex object
const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
});

// Primitive with explicit type (unnecessary but valid)
const [count, setCount] = useState<number>(0);
```

### Functional Updates

```tsx
setCount(prev => prev + 1);  // prev is typed as number
setUser(prev => prev ? { ...prev, name: 'New' } : null);
```

---

## useReducer

### Basic Typing

```tsx
// State type
type CounterState = {
    count: number;
    loading: boolean;
    error: string | null;
};

// Action type (discriminated union)
type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' }
    | { type: 'SET_COUNT'; payload: number }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

// Reducer function
const reducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'RESET':
            return { ...state, count: 0 };
        case 'SET_COUNT':
            return { ...state, count: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;  // TypeScript ensures all cases handled
    }
};

// Usage
const [state, dispatch] = useReducer(reducer, {
    count: 0,
    loading: false,
    error: null
});

dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET_COUNT', payload: 10 });
```

### With Initialization Function

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
    }
};

const init = (initialCount: number): State => ({
    count: initialCount
});

const [state, dispatch] = useReducer(reducer, 10, init);
```

---

## useEffect

### No Special Typing

```tsx
// Basic effect
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);

// With cleanup
useEffect(() => {
    const handleResize = () => console.log('resized');
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
```

### AbortController Pattern

```tsx
useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
        try {
            const response = await fetch('/api/data', { signal });
            const data = await response.json();
            setData(data);
        } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
                setError(error.message);
            }
        }
    };
    
    fetchData();
    
    return () => controller.abort();
}, [url]);
```

### TypeScript Catches Missing Dependencies

```tsx
const [count, setCount] = useState(0);

// ❌ ESLint/TypeScript warning: missing dependency 'count'
useEffect(() => {
    console.log(count);
}, []);

// ✅ Correct
useEffect(() => {
    console.log(count);
}, [count]);
```

---

## useRef

### DOM Refs

```tsx
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const formRef = useRef<HTMLFormElement>(null);
const selectRef = useRef<HTMLSelectElement>(null);
const textareaRef = useRef<HTMLTextAreaElement>(null);
const anchorRef = useRef<HTMLAnchorElement>(null);
const imageRef = useRef<HTMLImageElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);
const videoRef = useRef<HTMLVideoElement>(null);
const audioRef = useRef<HTMLAudioElement>(null);
const paragraphRef = useRef<HTMLParagraphElement>(null);
const headingRef = useRef<HTMLHeadingElement>(null);
const sectionRef = useRef<HTMLElement>(null);
const elementRef = useRef<HTMLElement>(null);

// Usage with optional chaining
useEffect(() => {
    inputRef.current?.focus();
    console.log(inputRef.current?.value);
}, []);
```

### Common DOM Element Types

| Element | Type |
|---------|------|
| `<div>` | `HTMLDivElement` |
| `<span>` | `HTMLSpanElement` |
| `<p>` | `HTMLParagraphElement` |
| `<h1>`-`<h6>` | `HTMLHeadingElement` |
| `<input>` | `HTMLInputElement` |
| `<button>` | `HTMLButtonElement` |
| `<form>` | `HTMLFormElement` |
| `<select>` | `HTMLSelectElement` |
| `<textarea>` | `HTMLTextAreaElement` |
| `<a>` | `HTMLAnchorElement` |
| `<img>` | `HTMLImageElement` |
| `<canvas>` | `HTMLCanvasElement` |
| `<video>` | `HTMLVideoElement` |
| `<audio>` | `HTMLAudioElement` |
| `<iframe>` | `HTMLIFrameElement` |
| Generic | `HTMLElement` |

### Mutable Refs (Non-DOM)

```tsx
// Timer ref
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const timeoutRef = useRef<NodeJS.Timeout | null>(null);
const animationRef = useRef<number | null>(null);

// Start interval
intervalRef.current = setInterval(() => {
    setCount(c => c + 1);
}, 1000);

// Clear interval
clearInterval(intervalRef.current);
intervalRef.current = null;

// Previous value
const previousCountRef = useRef<number>(count);

useEffect(() => {
    previousCountRef.current = count;
}, [count]);

// Render count (doesn't trigger re-render)
const renderCountRef = useRef<number>(0);
renderCountRef.current++;

// Any mutable value
const isMountedRef = useRef<boolean>(true);
const dataRef = useRef<Data | null>(null);
const subscriptionRef = useRef<Subscription | null>(null);
```

---

## useImperativeHandle

### Basic Pattern

```tsx
// Define the handle interface
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
        }), [value]);  // Dependencies array
        
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

// Parent component
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

### Form Handle Pattern

```tsx
interface FormHandle {
    submit: () => void;
    reset: () => void;
    validate: () => boolean;
    getValues: () => Record<string, string>;
    setField: (name: string, value: string) => void;
}

interface FormProps {
    initialValues?: Record<string, string>;
    onSubmit: (values: Record<string, string>) => void;
    children?: React.ReactNode;
}

const Form = React.forwardRef<FormHandle, FormProps>(
    ({ initialValues = {}, onSubmit, children }, ref) => {
        const [values, setValues] = useState(initialValues);
        const [errors, setErrors] = useState<Record<string, string>>({});
        
        const validate = (): boolean => {
            // validation logic
            return Object.keys(errors).length === 0;
        };
        
        useImperativeHandle(ref, () => ({
            submit: () => {
                if (validate()) {
                    onSubmit(values);
                }
            },
            reset: () => {
                setValues(initialValues);
                setErrors({});
            },
            validate: validate,
            getValues: () => values,
            setField: (name: string, value: string) => {
                setValues(prev => ({ ...prev, [name]: value }));
            }
        }), [values, errors]);
        
        return <form>{children}</form>;
    }
);
```

---

## Custom Hook Typing

### useLocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T): void => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}
```

### useFetch

```tsx
interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const controller = new AbortController();
        
        fetch(url, { ...options, signal: controller.signal })
            .then(res => res.json())
            .then(data => setState({ data, loading: false, error: null }))
            .catch(error => {
                if (error.name !== 'AbortError') {
                    setState({ data: null, loading: false, error: error.message });
                }
            });
        
        return () => controller.abort();
    }, [url]);

    return state;
}
```

### useInterval

```tsx
function useInterval(callback: () => void, delay: number | null): void {
    const savedCallback = useRef(callback);
    
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
```

---

## Quick Reference

### useState
```tsx
useState<T>(initial: T): [T, Dispatch<SetStateAction<T>>]
```

### useReducer
```tsx
useReducer<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
```

### useRef (DOM)
```tsx
useRef<T>(initial: T | null): RefObject<T>
```

### useRef (Mutable)
```tsx
useRef<T>(initial: T): MutableRefObject<T>
```

### useImperativeHandle
```tsx
useImperativeHandle<T, R extends T>(
    ref: Ref<T>,
    createHandle: () => R,
    deps?: DependencyList
): void
```

### Common HTML Element Types
```tsx
HTMLDivElement, HTMLInputElement, HTMLButtonElement, HTMLFormElement
HTMLSelectElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLImageElement
HTMLCanvasElement, HTMLVideoElement, HTMLAudioElement, HTMLElement (generic)
