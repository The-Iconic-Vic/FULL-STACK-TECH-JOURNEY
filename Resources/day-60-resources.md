# 📚 Day 60 Resources - Typing Context & Global State

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| React: Context API | https://react.dev/reference/react/createContext | Official React documentation for Context |
| React: useContext | https://react.dev/reference/react/useContext | Using context in components |
| React: useReducer | https://react.dev/reference/react/useReducer | Reducer for complex state logic |
| TypeScript: Generics | https://www.typescriptlang.org/docs/handbook/2/generics.html | Understanding generic types |
| TypeScript: Discriminated Unions | https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions | For typing reducer actions |
| React TypeScript Cheatsheet: Context | https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context | Complete Context cheatsheet |

---

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Context API with TypeScript | https://youtu.be/6ThXsUwLWvc | 25 min |
| useReducer + Context Pattern | https://youtu.be/2jM5l1QxE1g | 30 min |
| Type-safe Global State | https://youtu.be/0DdM6H1QjYM | 20 min |
| Context Splitting for Performance | https://youtu.be/JfR7xGxBqZY | 15 min |
| Building a Theme System | https://youtu.be/9ZZxmB7aF7A | 18 min |

---

## 📝 Context Templates

### Simple Context Template

```typescript
// contexts/SimpleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContextValue {
  value: string;
  setValue: (value: string) => void;
}

const SimpleContext = createContext<ContextValue | undefined>(undefined);

export function SimpleProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('');
  return (
    <SimpleContext.Provider value={{ value, setValue }}>
      {children}
    </SimpleContext.Provider>
  );
}

export function useSimple() {
  const context = useContext(SimpleContext);
  if (!context) throw new Error('useSimple must be used within SimpleProvider');
  return context;
}
```

### Reducer Context Template

```typescript
// contexts/ReducerContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface State {
  count: number;
}

type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET': return { count: 0 };
    default: return state;
  }
}

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export function ReducerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useReducerState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useReducerState must be used within ReducerProvider');
  return context;
}

export function useReducerDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useReducerDispatch must be used within ReducerProvider');
  return context;
}

export function useReducerContext() {
  return {
    state: useReducerState(),
    dispatch: useReducerDispatch(),
  };
}
```

### Provider Composition Helper

```typescript
// utils/providerComposer.tsx
import React, { ReactNode } from 'react';

type Provider = React.ComponentType<{ children: ReactNode }>;

export function composeProviders(providers: Provider[]) {
  return providers.reduce(
    (Accumulated, Provider) => ({ children }: { children: ReactNode }) => (
      <Provider>
        <Accumulated>{children}</Accumulated>
      </Provider>
    ),
    ({ children }: { children: ReactNode }) => <>{children}</>
  );
}

// Usage
const AppProviders = composeProviders([
  ThemeProvider,
  AuthProvider,
  TodoProvider,
  NotificationProvider,
]);
```

---

## 🧪 Testing Context

### Testing Custom Hooks with Context

```typescript
// __tests__/useTheme.test.tsx
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

describe('useTheme', () => {
  it('should throw error when used outside provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });

  it('should provide theme context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBeDefined();
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('should toggle theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initialTheme = result.current.theme;
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).not.toBe(initialTheme);
  });
});
```

### Testing Components with Context

```typescript
// __tests__/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

// Helper to render with provider
function renderWithTheme(component: React.ReactElement) {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  it('renders toggle button', () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    // Assert theme changed
  });
});
```

---

## 🔧 Utility Types for Context

```typescript
// utils/contextTypes.ts

// Make all properties optional
type Partial<T> = { [P in keyof T]?: T[P] };

// Make all properties required
type Required<T> = { [P in keyof T]-?: T[P] };

// Extract action types from reducer
type ReducerAction<R> = R extends (state: any, action: infer A) => any ? A : never;

// Extract state type from reducer
type ReducerState<R> = R extends (state: infer S, action: any) => any ? S : never;

// Example usage
type AuthReducer = typeof authReducer;
type AuthActionType = ReducerAction<AuthReducer>;
type AuthStateType = ReducerState<AuthReducer>;
```

---

## 📦 State Management Libraries with TypeScript

| Library | TypeScript Support | Best For |
|---------|-------------------|----------|
| **Zustand** | Excellent | Simple global state |
| **Jotai** | Excellent | Atomic state |
| **Redux Toolkit** | Excellent | Complex apps |
| **Valtio** | Good | Proxy-based state |
| **XState** | Excellent | State machines |

### Zustand Example

```typescript
import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: () => void;
  decrease: () => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  decrease: () => set((state) => ({ bears: state.bears - 1 })),
}));

// Use in component
function BearCounter() {
  const { bears, increase, decrease } = useBearStore();
  return <div>Bears: {bears}</div>;
}
```

---

## 📖 Further Reading

| Topic | Link |
|-------|------|
| Context vs Redux | https://react.dev/learn/scaling-up-with-reducer-and-context |
| Passing Data Deeply with Context | https://react.dev/learn/passing-data-deeply-with-context |
| Scaling Up with Reducer and Context | https://react.dev/learn/scaling-up-with-reducer-and-context |
| TypeScript and React Context | https://www.totaltypescript.com/books/react-with-typescript |
| Advanced Context Patterns | https://kentcdodds.com/blog/how-to-use-react-context-effectively |

---

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 58 | Typing React Hooks | [Resource](./day-58-resources.md) |
| Day 59 | Typing Custom Hooks | [Resource](./day-59-resources.md) |
| Day 60 | Typing Context & Global State | Current |
| Day 61 | TypeScript with External Libraries | Coming Soon |

---

## 🎯 Common Context Types Reference

```typescript
// Auth Context Types
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
  | { type: 'LOGOUT' };

// Theme Context Types
type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Todo Context Types
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string };
```

---

## ✅ Resources Checklist

- [ ] React Context API documentation
- [ ] useContext hook documentation
- [ ] useReducer with Context pattern
- [ ] React TypeScript Cheatsheet: Context
- [ ] Watch Context + TypeScript video tutorial
- [ ] Practice simple context pattern
- [ ] Practice reducer + context pattern
- [ ] Practice context splitting for performance
- [ ] Set up provider composition
- [ ] Write tests for context hooks
- [ ] Consider Zustand for complex state

---

## 💡 Pro Tips Summary

| Tip | Explanation |
|-----|-------------|
| **Always use undefined default** | Forces Provider usage, prevents bugs |
| **Create custom hooks** | Encapsulates error checking logic |
| **Split state and dispatch** | Prevents unnecessary re-renders |
| **Use discriminated unions** | Type-safe reducer actions |
| **Memoize action creators** | Stable function references |
| **Test context hooks** | Verify error throwing and value access |
| **Compose providers** | Keep App.tsx clean and maintainable |
| **Add display names** | Better debugging experience |

