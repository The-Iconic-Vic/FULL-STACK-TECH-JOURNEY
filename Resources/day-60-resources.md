# 📅 Day 60: Typing Context & Global State

**Date:** May 28, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Context API, createContext, useContext, Context + useReducer, Context Splitting

---

## 📋 Learning Objectives

- ✅ Type `createContext<T>` with proper type parameters
- ✅ Create contexts with `undefined` default to enforce Provider usage
- ✅ Write custom hooks with error checking for context access
- ✅ Combine Context with `useReducer` for predictable state updates
- ✅ Split state and dispatch contexts for performance optimization
- ✅ Build a complete theme context system with persistence

---

## 🎯 Part 1: Context API Basics with TypeScript

### The Problem with Context

Context provides a way to pass data through the component tree without prop drilling. However, TypeScript needs help understanding what shape the context value has.

### Basic Context Pattern

```typescript
// Step 1: Define the context value type
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Step 2: Create context with undefined default
// Using undefined forces consumers to use a Provider
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Step 3: Create Provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value: ThemeContextValue = { theme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 4: Create custom hook with error checking
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Why Use `undefined` as Default?

```typescript
// ❌ BAD - Missing Provider gives a meaningless default
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });
// TypeScript thinks it's safe, but toggleTheme does nothing!

// ✅ GOOD - Missing Provider throws clear error
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
// Custom hook will throw: "useTheme must be used within a ThemeProvider"
```

---

## 🔧 Part 2: Context + useReducer Pattern

### Complete Auth Context Example

```typescript
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// contexts/AuthContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthState, AuthAction, User } from '../types';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

// Create contexts
const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction> | undefined>(undefined);

// Provider component
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

// Custom hooks
function useAuthState(): AuthState {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within AuthProvider');
  }
  return context;
}

function useAuthDispatch(): React.Dispatch<AuthAction> {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within AuthProvider');
  }
  return context;
}

// Combined hook for convenience
function useAuth(): { state: AuthState; dispatch: React.Dispatch<AuthAction> } {
  return {
    state: useAuthState(),
    dispatch: useAuthDispatch(),
  };
}

export { AuthProvider, useAuth, useAuthState, useAuthDispatch };
```

### Using the Auth Context

```tsx
// LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function LoginForm() {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const user = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {state.error && <div className="error">{state.error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state.loading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={state.loading}
      />
      <button type="submit" disabled={state.loading}>
        {state.loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## ⚡ Part 3: Context Splitting for Performance

### The Problem

When context value changes, **all** consumers re-render. If you put both state and dispatch in one context, every component that uses `useAuth()` re-renders on every state change.

### The Solution: Split Contexts

```typescript
// ❌ BAD - Everything in one context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);
// Every component using useAuth() re-renders on ANY state change

// ✅ GOOD - Split state and dispatch
const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction> | undefined>(undefined);
// Components can subscribe to only what they need
```

### Component-Level Subscription

```tsx
// Only re-renders when loading changes
function LoadingIndicator() {
  const { loading } = useAuthState(); // Only subscribes to state
  return loading ? <Spinner /> : null;
}

// Never re-renders (dispatch is stable)
function LogoutButton() {
  const dispatch = useAuthDispatch(); // Only subscribes to dispatch
  return <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>;
}

// Re-renders on any state change
function UserProfile() {
  const { user } = useAuthState(); // Subscribes to state
  return <div>{user?.name}</div>;
}
```

---

## 🎨 Part 4: Complete Theme Context System

### Theme Context with System Preference and Persistence

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

// Helper: Get system preference
function getSystemPreference(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Helper: Save to localStorage
function saveTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
}

// Helper: Load from localStorage
function loadStoredTheme(): Theme | null {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return null;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isSystemPreference, setIsSystemPreference] = useState(true);

  // Initialize theme
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

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
    setIsSystemPreference(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    saveTheme(newTheme);
    setIsSystemPreference(false);
  };

  const useSystemPreference = () => {
    const systemTheme = getSystemPreference();
    setThemeState(systemTheme);
    setIsSystemPreference(true);
    localStorage.removeItem('theme');
  };

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
    isSystemPreference,
    useSystemPreference,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useTheme };
```

### Theme CSS

```css
/* App.css */
:root {
  /* Light theme (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border: #e5e7eb;
  --accent: #4f46e5;
  --accent-hover: #4338ca;
}

[data-theme="dark"] {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border: #374151;
  --accent: #818cf8;
  --accent-hover: #6366f1;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  background-color: var(--bg-secondary);
  border-color: var(--border);
}
```

### Theme Components

```tsx
// components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme, isSystemPreference, useSystemPreference } = useTheme();

  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme} className="btn">
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      
      {!isSystemPreference && (
        <button onClick={useSystemPreference} className="btn-secondary">
          Use System Preference
        </button>
      )}
      
      {isSystemPreference && (
        <span className="badge">Following System</span>
      )}
    </div>
  );
}

// components/ThemeDisplay.tsx
function ThemeDisplay() {
  const { theme } = useTheme();
  
  return (
    <div className="theme-display">
      <p>Current Theme: <strong>{theme}</strong></p>
    </div>
  );
}
```

---

## 📦 Part 5: Todo Context Example (Full CRUD)

```typescript
// types/index.ts
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
import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { TodoState, TodoAction, Todo } from '../types';

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
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
      };
      return { ...state, todos: [newTodo, ...state.todos] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
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

  // Load todos from localStorage on mount
  React.useEffect(() => {
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

  // Save todos to localStorage when they change
  React.useEffect(() => {
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

function useTodo() {
  return {
    state: useTodoState(),
    dispatch: useTodoDispatch(),
  };
}

// Action creators for better DX
function useTodoActions() {
  const dispatch = useTodoDispatch();
  
  const addTodo = useCallback((text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  }, [dispatch]);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, [dispatch]);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, [dispatch]);

  const updateTodo = useCallback((id: string, text: string) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
  }, [dispatch]);

  const setFilter = useCallback((filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, [dispatch]);

  return { addTodo, toggleTodo, deleteTodo, updateTodo, setFilter };
}

export { TodoProvider, useTodo, useTodoState, useTodoDispatch, useTodoActions };
```

### Filtered Todo List

```tsx
// components/TodoList.tsx
import React from 'react';
import { useTodoState, useTodoActions } from '../contexts/TodoContext';

function TodoList() {
  const { todos, filter } = useTodoState();
  const { toggleTodo, deleteTodo } = useTodoActions();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🧪 Part 6: Notification Context (Multiple Values)

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
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType, duration = 3000) => {
    const id = Date.now().toString();
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

  const value: NotificationContextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
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

## 📊 Quick Reference: Context Patterns

| Pattern | Code | Use Case |
|---------|------|----------|
| **Simple Context** | `createContext<T \| undefined>(undefined)` | Single value, few updates |
| **State + Dispatch Split** | Two separate contexts | Performance, frequent updates |
| **Context + Reducer** | `useReducer` inside Provider | Complex state logic |
| **Custom Hook with Error** | `useX() { if (!context) throw ... }` | Always required |
| **Action Creators** | Returns memoized functions | Better DX, performance |

### Context Type Signatures

```typescript
// Simple context
const MyContext = createContext<MyType | undefined>(undefined);

// Context with reducer
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// Provider component
function MyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
```

---

## 🎯 Best Practices

| Practice | Why |
|----------|-----|
| **Use `undefined` as default** | Forces consumers to use Provider |
| **Create custom hooks** | Encapsulates error checking |
| **Split state and dispatch** | Prevents unnecessary re-renders |
| **Memoize action creators** | Prevents infinite loops |
| **Type all actions** | Discriminated unions for safety |
| **Provide action creators** | Better DX than raw dispatch |
| **Persist when needed** | localStorage for user preferences |

---

## ✅ Day 60 Checklist

- [ ] Understand `createContext<T | undefined>` pattern
- [ ] Create custom hooks with error checking
- [ ] Build ThemeContext with system preference detection
- [ ] Build AuthContext with useReducer pattern
- [ ] Split state and dispatch contexts for performance
- [ ] Build TodoContext with CRUD operations
- [ ] Create action creators for better DX
- [ ] Build NotificationContext for global notifications
- [ ] Persist theme preference in localStorage
- [ ] Persist todos in localStorage
- [ ] Wrap app with all providers
- [ ] Push all code to GitHub

