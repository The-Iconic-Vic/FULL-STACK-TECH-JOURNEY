# 📅 Day 56: Convert Your React App to TypeScript

**Date:** May 24, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Migration Strategy, Typing React Patterns, Typing API Calls

---

## 📋 Learning Objectives

- ✅ Rename `.jsx` files to `.tsx` gradually
- ✅ Install type definitions for React and ReactDOM
- ✅ Use `React.FC<Props>` for functional components
- ✅ Type `useState<T>` with generics
- ✅ Type `useRef<HTMLElement>` for DOM refs
- ✅ Type event handlers (`React.MouseEvent`, `React.ChangeEvent`)
- ✅ Type Context with `createContext<T>`
- ✅ Create interfaces for API request/response shapes

---

## 🚀 Part 1: Migration Strategy

### Step-by-Step Migration

**Step 1: Install TypeScript and type definitions**

```bash
npm install -D typescript @types/react @types/react-dom
```

**Step 2: Create `tsconfig.json`**

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

**Step 3: Rename files**

```bash
# Rename entry point
mv src/main.jsx src/main.tsx

# Rename App component
mv src/App.jsx src/App.tsx

# Rename components one by one
mv src/components/Navbar.jsx src/components/Navbar.tsx
mv src/components/TaskCard.jsx src/components/TaskCard.tsx
# ... and so on
```

**Step 4: Fix type errors incrementally**

- Use `any` temporarily as a TODO
- Fix one component at a time
- Run `npm run dev` after each change

---

### Migration Tips

| Tip | Why |
|-----|-----|
| Start from leaf components | Fewer dependencies |
| Use `any` as a temporary escape hatch | Keep the app running |
| Commit after each working component | Easy rollback |
| Run TypeScript compiler in watch mode | `tsc --noEmit --watch` |

---

## ⚛️ Part 2: Typing React Patterns

### `React.FC<Props>` for Functional Components

```tsx
// Props interface
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

// Using React.FC
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
  // ...
};
```

---

### Typing `useState<T>`

```tsx
// TypeScript infers from initial value
const [count, setCount] = useState(0);           // count is number
const [name, setName] = useState('');            // name is string
const [isActive, setIsActive] = useState(false); // isActive is boolean

// Explicit type (useful for null or union types)
const [user, setUser] = useState<User | null>(null);
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

// Array state
const [todos, setTodos] = useState<Todo[]>([]);

// Object state
const [formData, setFormData] = useState<FormData>({
  email: '',
  password: ''
});
```

---

### Typing `useRef`

```tsx
// DOM element ref
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);

// Usage
useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} type="text" />;

// Mutable value ref (not DOM)
const intervalRef = useRef<number | null>(null);
const previousValueRef = useRef<string>('');
```

**Common HTML element types:**

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

---

### Typing Event Handlers

```tsx
// Click event
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log('Button clicked');
};

// Change event (input, select, textarea)
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Form submit event
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // handle form submission
};

// Keyboard event
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    submit();
  }
};

// Generic event (when element type doesn't matter)
const handleGenericChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setValue(e.target.value);
};
```

---

### Typing Context

```tsx
// types.ts
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// AuthContext.tsx
import { createContext, useContext } from 'react';

// Create context with default value (null or undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook with type guard
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<void> => {
    // login logic
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

### Typing Custom Hooks

```tsx
// useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
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

// useFetch.ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error: error.message }));
  }, [url]);

  return state;
}
```

---

## 🌐 Part 3: Typing API Calls

### API Response Types

```tsx
// types/index.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Task types
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

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type TaskUpdate = Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>>;
```

---

### Typed API Client

```tsx
// services/api.ts
import { ApiResponse, User, Task, NewTask, TaskUpdate } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
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
  
  // Auth endpoints
  async register(name: string, email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }
  
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }
  
  async getMe(): Promise<ApiResponse<{ user: User }>> {
    return this.request('/auth/me');
  }
  
  // Task endpoints
  async getTasks(): Promise<ApiResponse<Task[]>> {
    return this.request('/tasks');
  }
  
  async getTask(id: number): Promise<ApiResponse<Task>> {
    return this.request(`/tasks/${id}`);
  }
  
  async createTask(task: NewTask): Promise<ApiResponse<Task>> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
  }
  
  async updateTask(id: number, updates: TaskUpdate): Promise<ApiResponse<Task>> {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }
  
  async deleteTask(id: number): Promise<ApiResponse<null>> {
    return this.request(`/tasks/${id}`, { method: 'DELETE' });
  }
  
  async updateTaskStatus(id: number, status: Task['status']): Promise<ApiResponse<Task>> {
    return this.request(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }
}

export const api = new ApiClient();
```

---

### Type-Safe Error Handling

```tsx
// Type-safe API call with discriminated union
type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

async function fetchTasks(): Promise<ApiResult<Task[]>> {
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
const result = await fetchTasks();
if (result.success) {
  console.log(result.data); // TypeScript knows this is Task[]
} else {
  console.error(result.error); // TypeScript knows this is string
}
```

---

## 📝 Quick Reference

### File Extensions

| Extension | When to Use |
|-----------|-------------|
| `.tsx` | React components with JSX |
| `.ts` | Non-component files (utils, hooks, services, types) |
| `.d.ts` | Declaration files (types only) |

### Common Types Summary

```typescript
// Props
interface Props { name: string; }

// State
const [state, setState] = useState<Type>(initial);

// Ref
const ref = useRef<HTMLElement>(null);

// Event
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// Context
const Context = createContext<Type | undefined>(undefined);

// API Response
interface ApiResponse<T> { data: T; success: boolean; message: string; }
```

---

## ✅ Day 56 Checklist

- [ ] Install TypeScript and type definitions
- [ ] Create `tsconfig.json`
- [ ] Rename `.jsx` files to `.tsx`
- [ ] Rename entry point to `main.tsx`
- [ ] Type all components with `React.FC<Props>`
- [ ] Type all state with `useState<T>`
- [ ] Type all refs with `useRef<HTMLElement>`
- [ ] Type all event handlers
- [ ] Type Context with `createContext<T>`
- [ ] Create interfaces for API requests/responses
- [ ] Type API client methods
- [ ] Convert entire MERN Task Manager frontend to TypeScript
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Rename incrementally** - one component at a time, keep app running
2. **Use `React.FC<Props>`** - provides `children` type automatically
3. **`useState<T>` with explicit type** - for null or union types
4. **`useRef<HTMLElement>`** - for DOM element references
5. **Event handlers need type** - `React.MouseEvent<HTMLButtonElement>`
6. **Context needs type guard** - throw error if used outside provider
7. **API responses should be generic** - `ApiResponse<T>` pattern
8. **Use discriminated unions for error handling** - type-safe success/error paths

