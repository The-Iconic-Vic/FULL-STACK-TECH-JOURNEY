# 📅 Day 58: Typing Hooks - useState, useEffect, useRef

**Date:** May 26, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** useState, useReducer, useEffect, useRef, useImperativeHandle

---

## 📋 Learning Objectives

- ✅ Type `useState<T>` with explicit type parameters
- ✅ Use `useReducer` with typed state and discriminated union actions
- ✅ Type cleanup functions in `useEffect`
- ✅ Use `useRef<HTMLElement>(null)` for DOM refs
- ✅ Type mutable refs with `useRef<T>`
- ✅ Type `useImperativeHandle` with custom interfaces

---

## 🎯 Part 1: Typing useState

### Type Inference

TypeScript automatically infers the type from the initial value.

```tsx
// TypeScript infers these types
const [count, setCount] = useState(0);        // count: number
const [name, setName] = useState('');         // name: string
const [isActive, setIsActive] = useState(false); // isActive: boolean
const [todos, setTodos] = useState([]);       // todos: never[] (BAD!)
```

**Problem with empty array:** TypeScript infers `never[]` which is too restrictive.

```tsx
// ❌ Wrong - TypeScript infers never[]
const [todos, setTodos] = useState([]);
// todos: never[] - can't add items!

// ✅ Correct - explicit type parameter
const [todos, setTodos] = useState<Todo[]>([]);
```

---

### Explicit Type Parameters

Use explicit type parameters when:

1. Initial value is `null` or `undefined`
2. Initial value is an empty array
3. You want to be explicit about the type

```tsx
// null initial value
const [user, setUser] = useState<User | null>(null);

// empty array
const [items, setItems] = useState<Item[]>([]);

// union type
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

// complex object
const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
});
```

---

### Generic Type Parameters in useState

`useState` is a generic function: `useState<T>(initial: T): [T, (value: T) => void]`

```tsx
// TypeScript's internal typing for useState
function useState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];

// Example of what happens behind the scenes
type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (value: T) => void;
```

---

## 🔄 Part 2: Typing useReducer

### Basic useReducer Typing

`useReducer` requires typing the state and actions.

```tsx
// Define State type
type CounterState = {
    count: number;
    loading: boolean;
    error: string | null;
};

// Define Action type with discriminated union
type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' }
    | { type: 'SET_COUNT'; payload: number }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

// Reducer function
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
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
            return state;
    }
};

// Use in component
const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    loading: false,
    error: null
});

// Dispatch actions
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET_COUNT', payload: 10 });
dispatch({ type: 'SET_LOADING', payload: true });
```

---

### useReducer with Initialization Function

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
    }
};

// Initialization function
const init = (initialCount: number): State => ({
    count: initialCount
});

const [state, dispatch] = useReducer(reducer, 10, init);
```

---

## ⚡ Part 3: Typing useEffect and useLayoutEffect

### Basic useEffect (No Special Typing)

`useEffect` doesn't require type parameters for common use cases.

```tsx
// No return (void)
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);

// With cleanup function
useEffect(() => {
    const handleResize = () => console.log('resized');
    window.addEventListener('resize', handleResize);
    
    // Cleanup returns void or function
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
```

---

### AbortController with TypeScript

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
}, []);
```

---

### TypeScript detects missing dependencies

```tsx
const [count, setCount] = useState(0);

// ❌ TypeScript warns: React Hook useEffect has a missing dependency: 'count'
useEffect(() => {
    console.log(count);
}, []); // Missing count dependency

// ✅ Correct
useEffect(() => {
    console.log(count);
}, [count]); // count included
```

---

## 📌 Part 4: Typing useRef

### DOM Refs

```tsx
// For DOM elements
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const formRef = useRef<HTMLFormElement>(null);

// Usage
useEffect(() => {
    inputRef.current?.focus();  // Optional chaining because ref may be null
}, []);

return <input ref={inputRef} type="text" />;
```

**Common DOM Element Types:**

| Element | Type |
|---------|------|
| `<div>` | `HTMLDivElement` |
| `<input>` | `HTMLInputElement` |
| `<button>` | `HTMLButtonElement` |
| `<form>` | `HTMLFormElement` |
| `<select>` | `HTMLSelectElement` |
| `<textarea>` | `HTMLTextAreaElement` |
| `<a>` | `HTMLAnchorElement` |
| `<img>` | `HTMLImageElement` |
| `<canvas>` | `HTMLCanvasElement` |

---

### Mutable Refs (non-DOM)

Mutable refs hold values across renders without causing re-renders.

```tsx
// Timer ref
const intervalRef = useRef<NodeJS.Timeout | null>(null);

// Start timer
intervalRef.current = setInterval(() => {
    setCount(c => c + 1);
}, 1000);

// Clear timer
clearInterval(intervalRef.current);
intervalRef.current = null;

// Previous value ref
const previousCountRef = useRef<number>(count);

useEffect(() => {
    previousCountRef.current = count;
}, [count]);

// Any mutable value
const renderCountRef = useRef<number>(0);
renderCountRef.current++;
```

---

### Generic Type for Mutable Ref

```tsx
// useRef is generic: useRef<T>(initialValue): MutableRefObject<T>
const ref = useRef<number>(0);     // ref.current is number
const ref2 = useRef<string>('');    // ref.current is string
const ref3 = useRef<MyType | null>(null); // ref.current can be MyType or null
```

---

## 🛠️ Part 5: Typing useImperativeHandle

### Basic useImperativeHandle

```tsx
// Define the handle interface
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
        }), [value]);  // Dependencies array
        
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

// Parent component
const Parent = () => {
    const inputRef = useRef<CustomInputHandle>(null);
    
    const handleClear = () => {
        inputRef.current?.clear();
    };
    
    return (
        <>
            <CustomInput ref={inputRef} label="Username" />
            <button onClick={handleClear}>Clear</button>
        </>
    );
};
```

---

### useImperativeHandle with Multiple Methods

```tsx
interface FormHandle {
    submit: () => void;
    reset: () => void;
    validate: () => boolean;
    getValues: () => Record<string, string>;
}

const Form = React.forwardRef<FormHandle, FormProps>((props, ref) => {
    const [values, setValues] = useState({});
    
    useImperativeHandle(ref, () => ({
        submit: () => {
            if (validate()) {
                onSubmit(values);
            }
        },
        reset: () => {
            setValues({});
        },
        validate: () => {
            return Object.values(values).every(v => v !== '');
        },
        getValues: () => values
    }), [values]);
    
    // ... form JSX
});
```

---

## 📝 Quick Reference

### useState Types
```tsx
// Inference
const [count, setCount] = useState(0);

// Explicit
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
```

### useReducer Types
```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => { ... };
const [state, dispatch] = useReducer(reducer, initialState);
```

### useRef Types
```tsx
// DOM ref
const inputRef = useRef<HTMLInputElement>(null);

// Mutable ref
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const countRef = useRef<number>(0);
```

### useImperativeHandle Types
```tsx
interface Handle {
    method: () => void;
}

useImperativeHandle(ref, () => ({ method: () => {} }), []);
```

---

## ✅ Day 58 Checklist

- [ ] Type `useState<T>` with explicit parameters for null/empty arrays
- [ ] Type `useReducer` with discriminated union actions
- [ ] Use AbortController in `useEffect` with proper error handling
- [ ] Type DOM refs with specific HTML element types
- [ ] Use mutable refs for timers and values across renders
- [ ] Type `useImperativeHandle` with custom interfaces
- [ ] Build Typed Counter with useReducer project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Always type `useState` with explicit `T`** for null or empty array initial values
2. **`useReducer` requires typed state AND typed actions** - use discriminated unions
3. **`useEffect` doesn't need type parameters** - dependencies matter more
4. **`useRef<HTMLElement>(null)` for DOM refs** - use optional chaining `.current?.method()`
5. **Mutable refs use `useRef<T>(initialValue)`** - no `null` needed for non-DOM
6. **`useImperativeHandle` requires an interface** - defines what parent can access
7. **AbortController fetch needs error name check** - ignore AbortError

