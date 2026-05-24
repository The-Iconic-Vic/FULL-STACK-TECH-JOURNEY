# 📘 React TypeScript Conversion Reference

## Migration Strategy

### Step 1: Install Dependencies

```bash
npm install -D typescript @types/react @types/react-dom
```

### Step 2: Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Step 3: Rename Files

```bash
# Entry point
mv src/main.jsx src/main.tsx

# App component
mv src/App.jsx src/App.tsx

# Components
mv src/components/Component.jsx src/components/Component.tsx
mv src/pages/Page.jsx src/pages/Page.tsx
```

---

## Component Types

### `React.FC<Props>` Pattern

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Without React.FC (also valid)
const Button = ({ children, onClick, variant = 'primary', disabled = false }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
```

### Children Types

```tsx
// ReactNode - any renderable content
interface CardProps {
  children: React.ReactNode;
}

// ReactElement - single React element
interface WrapperProps {
  children: React.ReactElement;
}

// Function as child
interface RenderPropProps {
  children: (data: Data) => React.ReactNode;
}
```

---

## State Types

### useState

```tsx
// Type inference (no annotation needed)
const [count, setCount] = useState(0);        // number
const [name, setName] = useState('');         // string
const [isActive, setIsActive] = useState(false); // boolean

// Explicit type (for null or union)
const [user, setUser] = useState<User | null>(null);
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

// Array
const [todos, setTodos] = useState<Todo[]>([]);

// Object
const [form, setForm] = useState<FormData>({ email: '', password: '' });
```

### useReducer

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

---

## Ref Types

### DOM Refs

```tsx
// Input ref
const inputRef = useRef<HTMLInputElement>(null);

// Button ref
const buttonRef = useRef<HTMLButtonElement>(null);

// Div ref
const divRef = useRef<HTMLDivElement>(null);

// Form ref
const formRef = useRef<HTMLFormElement>(null);

// Generic element
const elementRef = useRef<HTMLElement>(null);

// Usage
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

### Mutable Refs

```tsx
// Interval ID
const intervalRef = useRef<number | null>(null);

// Previous value
const prevValueRef = useRef<string>('');

// Any mutable value
const countRef = useRef<number>(0);
```

---

## Event Handler Types

### Mouse Events

```tsx
// Button click
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log('Clicked');
};

// Div click
const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
  console.log(e.clientX, e.clientY);
};

// Generic element
const handleGenericClick = (e: React.MouseEvent<HTMLElement>) => {
  const target = e.currentTarget;
};
```

### Change Events

```tsx
// Input change
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Select change
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelected(e.target.value);
};

// Textarea change
const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setText(e.target.value);
};

// Generic form element
const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};
```

### Form Events

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  // handle submission
};
```

### Keyboard Events

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    submit();
  }
  if (e.key === 'Escape') {
    cancel();
  }
};
```

---

## Context Types

### Creating Typed Context

```tsx
// types.ts
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// AuthContext.tsx
import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<void> => {
    // login logic
  };

  const value: AuthContextType = { user, token, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

## Custom Hook Types

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
    fetch(url, options)
      .then(res => res.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error: error.message }));
  }, [url]);

  return state;
}
```

### useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## API Types

### Response Types

```tsx
// Generic API response
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

// Error response
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### Model Types

```tsx
// User model
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Task model
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Create DTO (Data Transfer Object)
export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

// Update DTO (all fields optional)
export type UpdateTask = Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>>;
```

### API Client

```tsx
class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers
      }
    });
    
    const data = await response.json();
    
    return {
      data,
      status: response.status,
      message: data.message || (response.ok ? 'Success' : 'Error'),
      success: response.ok
    };
  }
  
  async getTasks(): Promise<ApiResponse<Task[]>> {
    return this.request('/tasks');
  }
  
  async createTask(task: CreateTask): Promise<ApiResponse<Task>> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
  }
}
```

---

## Type-Safe Error Handling

### Discriminated Union Pattern

```tsx
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

async function fetchData(): Promise<Result<Task[]>> {
  try {
    const response = await api.getTasks();
    if (response.success) {
      return { success: true, data: response.data };
    }
    return { success: false, error: response.message };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Usage
const result = await fetchData();
if (result.success) {
  console.log(result.data); // TypeScript knows this is Task[]
} else {
  console.error(result.error); // TypeScript knows this is string
}
```

---

## Quick Reference Table

| Pattern | Type | Example |
|---------|------|---------|
| Component Props | `interface Props` | `interface ButtonProps { ... }` |
| Component | `React.FC<Props>` | `const Button: React.FC<ButtonProps>` |
| useState | `useState<T>` | `const [user, setUser] = useState<User \| null>(null)` |
| useRef (DOM) | `useRef<HTMLElement>` | `const inputRef = useRef<HTMLInputElement>(null)` |
| useRef (mutable) | `useRef<T>` | `const countRef = useRef<number>(0)` |
| Click Event | `React.MouseEvent<HTMLButtonElement>` | `(e: React.MouseEvent<HTMLButtonElement>) => void` |
| Change Event | `React.ChangeEvent<HTMLInputElement>` | `(e: React.ChangeEvent<HTMLInputElement>) => void` |
| Form Event | `React.FormEvent<HTMLFormElement>` | `(e: React.FormEvent<HTMLFormElement>) => void` |
| Context | `createContext<T \| undefined>` | `const AuthContext = createContext<AuthType \| undefined>(undefined)` |
| API Response | `ApiResponse<T>` | `Promise<ApiResponse<User[]>>` |
| Result (error handling) | `Result<T>` | `Promise<Result<Task[]>>` |
