# 📘 Typing React Context with TypeScript

## 🎯 What is React Context?

React Context provides a way to pass data through the component tree without prop drilling. When combined with TypeScript, context becomes type-safe and self-documenting.

```typescript
// Without TypeScript - error prone
const ThemeContext = React.createContext();

// With TypeScript - type safe
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);
```

---

## 📝 Core Context Patterns

### Pattern 1: Simple Context (Single Value)

Best for: Simple values that don't change often (theme, language, feature flags)

```typescript
// 1. Define the type
interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

// 2. Create context with undefined default
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// 3. Create Provider
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const value: ThemeContextValue = { theme, setTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Create custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Pattern 2: Context + useReducer (Complex State)

Best for: Complex state logic with multiple actions (auth, shopping cart, todos)

```typescript
// 1. Define state and action types
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// 2. Create reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true, loading: false, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, isAuthenticated: false, loading: false, error: action.payload };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, loading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// 3. Create contexts (split for performance)
const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction> | undefined>(undefined);

// 4. Create Provider
function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

// 5. Create custom hooks
function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within AuthProvider');
  }
  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within AuthProvider');
  }
  return context;
}

function useAuth() {
  return {
    state: useAuthState(),
    dispatch: useAuthDispatch(),
  };
}
```

### Pattern 3: Context with Action Creators (Best DX)

Best for: Creating a clean API for consumers

```typescript
// 1. Create action creator hook
function useAuthActions() {
  const dispatch = useAuthDispatch();
  
  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await api.login(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  }, [dispatch]);
  
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);
  
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);
  
  return { login, logout, clearError };
}

// 2. Create combined hook
function useAuth() {
  const state = useAuthState();
  const actions = useAuthActions();
  return { ...state, ...actions };
}

// 3. Usage - clean and simple
function LoginButton() {
  const { login, loading } = useAuth();
  return <button onClick={() => login(email, password)} disabled={loading}>
    Login
  </button>;
}
```

### Pattern 4: Context Splitting (Performance)

Best for: Preventing unnecessary re-renders

```typescript
// ❌ BAD - One context causes all consumers to re-render
const AppContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

// ✅ GOOD - Split contexts for selective subscription
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

// Component that only needs state
function DisplayCount() {
  const { count } = useAppState(); // Only re-renders when count changes
  return <div>{count}</div>;
}

// Component that only needs dispatch
function IncrementButton() {
  const dispatch = useAppDispatch(); // Never re-renders (dispatch is stable)
  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>;
}
```

---

## 🔧 Complete Context Examples

### Example 1: Theme Context with System Preference

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSystemPreference: boolean;
  useSystemPreference: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPreference(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadStoredTheme(): Theme | null {
  const stored = localStorage.getItem('theme');
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isSystemPreference, setIsSystemPreference] = useState(true);

  useEffect(() => {
    const stored = loadStoredTheme();
    if (stored) {
      setThemeState(stored);
      setIsSystemPreference(false);
    } else {
      setThemeState(getSystemPreference());
      setIsSystemPreference(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    setIsSystemPreference(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const useSystemPreference = () => {
    setThemeState(getSystemPreference());
    setIsSystemPreference(true);
    localStorage.removeItem('theme');
  };

  const value: ThemeContextValue = { theme, toggleTheme, setTheme, isSystemPreference, useSystemPreference };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useTheme };
```

### Example 2: Todo Context (Full CRUD)

```typescript
// types/todo.types.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
  error: string | null;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; text: string } }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

// contexts/TodoContext.tsx
import React, { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from 'react';
import { TodoState, TodoAction, Todo } from '../types/todo.types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null,
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
      };
      return { ...state, todos: [newTodo, ...state.todos] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'LOAD_TODOS':
      return { ...state, todos: action.payload };

    default:
      return state;
  }
}

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | undefined>(undefined);

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        const todos = JSON.parse(stored);
        dispatch({ type: 'LOAD_TODOS', payload: todos });
      } catch (e) {
        console.error('Failed to load todos', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within TodoProvider');
  }
  return context;
}

function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within TodoProvider');
  }
  return context;
}

// Action creators hook
function useTodoActions() {
  const dispatch = useTodoDispatch();

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text.trim() });
    }
  }, [dispatch]);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, [dispatch]);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, [dispatch]);

  const updateTodo = useCallback((id: string, text: string) => {
    if (text.trim()) {
      dispatch({ type: 'UPDATE_TODO', payload: { id, text: text.trim() } });
    }
  }, [dispatch]);

  const setFilter = useCallback((filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, [dispatch]);

  return { addTodo, toggleTodo, deleteTodo, updateTodo, setFilter };
}

function useTodo() {
  const state = useTodoState();
  const actions = useTodoActions();
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return {
    ...state,
    ...actions,
    filteredTodos,
  };
}

export { TodoProvider, useTodo, useTodoState, useTodoDispatch, useTodoActions };
```

### Example 3: Notification Context (Multiple Values)

```typescript
// contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType, duration?: number) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType, duration = 3000) => {
    const id = crypto.randomUUID();
    setNotifications(prev => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    addNotification(message, 'success', duration);
  }, [addNotification]);

  const error = useCallback((message: string, duration?: number) => {
    addNotification(message, 'error', duration);
  }, [addNotification]);

  const info = useCallback((message: string, duration?: number) => {
    addNotification(message, 'info', duration);
  }, [addNotification]);

  const warning = useCallback((message: string, duration?: number) => {
    addNotification(message, 'warning', duration);
  }, [addNotification]);

  const value: NotificationContextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

export { NotificationProvider, useNotification };
```

---

## 🧩 Composing Multiple Providers

```typescript
// App.tsx
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import { NotificationProvider } from './contexts/NotificationContext';

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <TodoProvider>
            {children}
          </TodoProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

// Or use a compose utility
function composeProviders(providers: React.ComponentType<{ children: ReactNode }>[]) {
  return providers.reduce(
    (Accumulated, Provider) => ({ children }: { children: ReactNode }) => (
      <Provider>
        <Accumulated>{children}</Accumulated>
      </Provider>
    ),
    ({ children }: { children: ReactNode }) => <>{children}</>
  );
}

const AppProviders = composeProviders([
  ThemeProvider,
  NotificationProvider,
  AuthProvider,
  TodoProvider,
]);
```

---

## 📊 Quick Reference: Context Type Signatures

| Element | Type Signature |
|---------|---------------|
| `createContext` | `createContext<T \| undefined>(undefined)` |
| `useContext` | `useContext<T \| undefined>(context): T \| undefined` |
| `Provider` | `Context.Provider` with `value: T` |
| `Dispatch` | `React.Dispatch<Action>` |
| `Reducer` | `(state: S, action: A) => S` |

### Custom Hook Patterns

```typescript
// For single context
function useX() {
  const context = useContext(XContext);
  if (!context) throw new Error('...');
  return context;
}

// For split contexts
function useXState() {
  const context = useContext(XStateContext);
  if (!context) throw new Error('...');
  return context;
}

function useXDispatch() {
  const context = useContext(XDispatchContext);
  if (!context) throw new Error('...');
  return context;
}

// Combined hook
function useX() {
  return {
    state: useXState(),
    dispatch: useXDispatch(),
  };
}

// With action creators
function useX() {
  const state = useXState();
  const dispatch = useXDispatch();
  
  const actions = useMemo(() => ({
    doSomething: () => dispatch({ type: 'DO_SOMETHING' }),
  }), [dispatch]);
  
  return { ...state, ...actions };
}
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `context is undefined` | Component outside Provider | Add error checking in custom hook |
| `Property 'type' does not exist` | Missing action type | Use discriminated union for actions |
| `Object is possibly 'undefined'` | Context may be undefined | Use custom hook with error checking |
| **Unnecessary re-renders** | State and dispatch in same context | Split into separate contexts |
| **Infinite loop in useEffect** | Missing dependencies | Add all dependencies to array |
| **Dispatch not stable** | Creating new function each render | Use `useCallback` for action creators |

---

## 🎯 Best Practices Summary

| Practice | Why |
|----------|-----|
| **Use `undefined` as default** | Forces consumers to use Provider |
| **Create custom hooks** | Encapsulates error checking logic |
| **Split state and dispatch** | Prevents unnecessary re-renders |
| **Use `useCallback` for actions** | Maintains stable function references |
| **Type all actions** | Discriminated unions for type safety |
| **Provide action creators** | Better developer experience |
| **Memoize complex selectors** | Prevents expensive recalculations |
| **Compose providers** | Keeps App.tsx clean |
| **Add display names** | Better debugging in React DevTools |

