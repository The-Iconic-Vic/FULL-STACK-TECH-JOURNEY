# 📚 Day 59 Resources - Typing Custom Hooks

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| React: Custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks | Official React documentation on building custom hooks |
| React: Hook Rules | https://react.dev/warnings/invalid-hook-call-warning | Rules that all hooks must follow |
| TypeScript: Generics | https://www.typescriptlang.org/docs/handbook/2/generics.html | Understanding generic types in TypeScript |
| TypeScript: React Hooks | https://www.typescriptlang.org/docs/handbook/react-&-webpack.html | TypeScript with React hooks |
| React TypeScript Cheatsheet: Custom Hooks | https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/custom_hooks | Complete custom hooks cheatsheet |

---

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Building Custom Hooks with TypeScript | https://youtu.be/6ThXsUwLWvc | 25 min |
| Generics in React Hooks | https://youtu.be/2jM5l1QxE1g | 18 min |
| useLocalStorage with TypeScript | https://youtu.be/0DdM6H1QjYM | 12 min |
| Custom Hook Patterns | https://youtu.be/JfR7xGxBqZY | 20 min |
| Testing Custom Hooks | https://youtu.be/9ZZxmB7aF7A | 15 min |

---

## 📝 Custom Hook Templates

### Basic State Hook (Tuple Return)

```typescript
function useBoolean(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse];
}
```

### Basic State Hook (Object Return)

```typescript
interface UseBooleanReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    toggle: useCallback(() => setValue(v => !v), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
}
```

### Generic Storage Hook

```typescript
function useStorage<T>(key: string, initialValue: T, storage: Storage = localStorage): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, storage]);

  const removeValue = useCallback(() => {
    try {
      storage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, storage, initialValue]);

  return [storedValue, setValue, removeValue];
}
```

### Generic Fetch Hook

```typescript
interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions extends RequestInit {
  skip?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

function useFetch<T = unknown>(url: string, options: UseFetchOptions = {}): UseFetchState<T> & { refetch: () => void } {
  // ... implementation
}
```

---

## 🧪 Testing Utilities

### renderHook Helper

```typescript
import { renderHook, act, waitFor } from '@testing-library/react';

// Basic test
test('should initialize with default value', () => {
  const { result } = renderHook(() => useToggle());
  expect(result.current[0]).toBe(false);
});

// Testing actions
test('should toggle value', () => {
  const { result } = renderHook(() => useToggle(false));
  
  act(() => {
    result.current[1]();
  });
  
  expect(result.current[0]).toBe(true);
});

// Testing async hooks
test('should fetch data', async () => {
  const { result } = renderHook(() => useFetch('/api/users'));
  
  expect(result.current.loading).toBe(true);
  
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  
  expect(result.current.data).toBeDefined();
});
```

### Mock LocalStorage for Testing

```typescript
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Use in tests
beforeEach(() => {
  localStorageMock.clear();
  jest.clearAllMocks();
});
```

---

## 🔧 Common Custom Hook Use Cases

| Use Case | Hook Name | Key Features |
|----------|-----------|--------------|
| Dark mode | `useDarkMode` | useLocalStorage + media query |
| Form handling | `useForm` | useReducer + validation |
| WebSocket | `useWebSocket` | useRef + useEffect + cleanup |
| Geolocation | `useGeolocation` | useEffect + browser API |
| Keyboard shortcuts | `useKeyboard` | useEventListener + key codes |
| Pagination | `usePagination` | useState + useCallback |
| Infinite scroll | `useInfiniteScroll` | useRef + Intersection Observer |
| Undo/Redo | `useUndo` | useReducer with history |

---

## 📦 npm Packages for Custom Hooks

| Package | Description | Link |
|---------|-------------|------|
| `react-use` | Collection of essential React hooks | https://www.npmjs.com/package/react-use |
| `@uidotdev/usehooks` | Modern hooks collection | https://www.npmjs.com/package/@uidotdev/usehooks |
| `usehooks-ts` | TypeScript-first hooks | https://www.npmjs.com/package/usehooks-ts |
| `ahooks` | High-quality reliable hooks | https://www.npmjs.com/package/ahooks |

---

## 🎯 TypeScript Utility Types for Hooks

```typescript
// Make all properties optional
type Partial<T> = { [P in keyof T]?: T[P] };

// Make all properties required
type Required<T> = { [P in keyof T]-?: T[P] };

// Pick specific properties
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// Omit specific properties
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// ReturnType for hooks
type UseToggleReturn = ReturnType<typeof useToggle>;

// Parameters for hooks
type UseFetchParams = Parameters<typeof useFetch>;
```

---

## 📖 Further Reading

| Topic | Link |
|-------|------|
| React Hook Form with TypeScript | https://react-hook-form.com/ts |
| Zustand with TypeScript | https://docs.pmnd.rs/zustand/guides/typescript |
| Redux Toolkit with TS | https://redux-toolkit.js.org/usage/usage-with-typescript |
| TanStack Query + TypeScript | https://tanstack.com/query/latest/docs/react/typescript |
| Jotai TypeScript | https://jotai.org/docs/basics/typescript |

---

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 50 | TypeScript Intro | [Resource](./day-50-resources.md) |
| Day 56 | Convert React to TypeScript | [Resource](./day-56-resources.md) |
| Day 57 | Component Patterns | [Resource](./day-57-resources.md) |
| Day 58 | Typing React Hooks | [Resource](./day-58-resources.md) |
| Day 59 | Typing Custom Hooks | Current |

---

## 💡 Pro Tips

| Tip | Explanation |
|-----|-------------|
| **Start with `use`** | React relies on this naming convention to detect hooks |
| **Keep hooks focused** | One responsibility per hook (Single Responsibility Principle) |
| **Return objects for >2 values** | Tuples work for 2-3 values, objects for more |
| **Use generics for flexibility** | `<T>` makes hooks work with any type |
| **Add cleanup functions** | Prevent memory leaks (intervals, event listeners) |
| **Memoize callbacks** | Use `useCallback` to prevent unnecessary re-renders |
| **Test in isolation** | Use `renderHook` from Testing Library |
| **Document with JSDoc** | `/** Description */` helps with IDE intellisense |

---

## ✅ Resources Checklist

- [ ] React Custom Hooks documentation
- [ ] TypeScript Generics guide
- [ ] React TypeScript Cheatsheet
- [ ] Watch custom hooks video tutorial
- [ ] Install `react-use` or `usehooks-ts` for reference
- [ ] Set up testing for custom hooks
- [ ] Practice building useLocalStorage<T>
- [ ] Practice building useFetch<T>
- [ ] Practice building useDebounce<T>
- [ ] Practice building usePrevious<T>
- [ ] Test all hooks with renderHook

