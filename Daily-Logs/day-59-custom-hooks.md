# 📅 Day 59: Typing Custom Hooks

**Date:** May 27, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Custom Hooks, Generics, useLocalStorage, useFetch, useDebounce, useToggle, usePrevious

---

## 📋 Learning Objectives

- ✅ Create reusable custom hooks with proper TypeScript types
- ✅ Use generics `<T>` for flexible, type-safe hooks
- ✅ Return tuples vs objects from custom hooks
- ✅ Build `useLocalStorage<T>` generic hook
- ✅ Build `useFetch<T>` generic data fetching hook
- ✅ Build `useToggle`, `useDebounce<T>`, `usePrevious<T>` hooks
- ✅ Test custom hooks with renderHook

---

## 🎯 Part 1: Custom Hook Fundamentals

### Naming Convention

Custom hooks **MUST** start with `use`:

```typescript
// ✅ Correct
function useLocalStorage() { ... }
function useFetch() { ... }
function useToggle() { ... }

// ❌ Wrong - React won't know it's a hook
function getLocalStorage() { ... }
function fetchData() { ... }
```

### TypeScript Pattern for Custom Hooks

```typescript
// Basic pattern
function useMyHook(param: string): ReturnType {
  // hook logic
  return value;
}

// Generic pattern
function useMyHook<T>(param: T): T {
  // hook logic
  return param;
}
```

### Return Types: Tuple vs Object

```typescript
// Tuple return (like useState)
function useToggle(initial: boolean): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
}
// Usage: const [isOpen, toggleOpen] = useToggle(false);

// Object return (more descriptive)
function useToggle(initial: boolean): { value: boolean; toggle: () => void } {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return { value, toggle };
}
// Usage: const { value: isOpen, toggle: toggleOpen } = useToggle(false);
```

---

## 🔧 Part 2: Essential Custom Hooks

### 1. useToggle - Boolean Toggle

```typescript
function useToggle(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}

// Usage
const [isOpen, toggleOpen, openModal, closeModal] = useToggle(false);
```

### 2. useLocalStorage<T> - Generic Local Storage

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Usage with different types
const [user, setUser] = useLocalStorage<User | null>('user', null);
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
```

### 3. useFetch<T> - Generic Data Fetching

```typescript
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchOptions extends RequestInit {
  skip?: boolean;
}

function useFetch<T = unknown>(url: string, options: FetchOptions = {}): FetchState<T> & { refetch: () => void } {
  const { skip = false, ...fetchOptions } = options;
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (skip) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setState({ data: null, loading: false, error: error.message });
      }
    }
  }, [url, fetchOptions, skip]);

  useEffect(() => {
    fetchData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch };
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const { data: user, loading, error, refetch } = useFetch<User>('/api/user/1');
```

### 4. useDebounce<T> - Debounced Value

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage for search input
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearch) {
    searchAPI(debouncedSearch);
  }
}, [debouncedSearch]);
```

### 5. usePrevious<T> - Track Previous Value

```typescript
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

console.log(`Current: ${count}, Previous: ${prevCount}`);
```

### 6. useInterval - Timer

```typescript
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

// Usage
useInterval(() => {
  setCount(c => c + 1);
}, isRunning ? 1000 : null);
```

### 7. useTimeout - Delayed Execution

```typescript
function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

// Usage
useTimeout(() => {
  setShowMessage(false);
}, showMessage ? 3000 : null);
```

### 8. useEventListener - Event Listener

```typescript
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement | null = window
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: T | null
): void;

function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: Window | HTMLElement | null = window
): void {
  useEffect(() => {
    const targetElement = element?.nodeType === 1 ? element as HTMLElement : window;
    
    if (!targetElement) return;
    
    targetElement.addEventListener(eventName, handler);
    return () => {
      targetElement.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
}

// Usage
useEventListener('resize', () => {
  console.log('Window resized');
});

useEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

### 9. useMediaQuery - Responsive Design

```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
```

### 10. useCopyToClipboard - Copy Text

```typescript
interface CopyToClipboardResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: Error | null;
}

function useCopyToClipboard(): CopyToClipboardResult {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to copy'));
      setCopied(false);
    }
  }, []);

  return { copy, copied, error };
}

// Usage
const { copy, copied } = useCopyToClipboard();
<button onClick={() => copy('Hello World!')}>
  {copied ? 'Copied!' : 'Copy'}
</button>
```

---

## 🧪 Part 3: Testing Custom Hooks

### Setup

```bash
npm install @testing-library/react @testing-library/jest-dom
```

### Test File: `useToggle.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react';
import useToggle from './useToggle';

describe('useToggle', () => {
  it('should initialize with default value (false)', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle value when toggle is called', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe(true);
    
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe(false);
  });

  it('should set value to true with setTrue', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[2]();
    });
    
    expect(result.current[0]).toBe(true);
  });

  it('should set value to false with setFalse', () => {
    const { result } = renderHook(() => useToggle(true));
    
    act(() => {
      result.current[3]();
    });
    
    expect(result.current[0]).toBe(false);
  });
});
```

### Test File: `useDebounce.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));
    
    value = 'changed';
    rerender();
    
    expect(result.current).toBe('initial');
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('changed');
  });
});
```

---

## 📊 Quick Reference: Custom Hook Patterns

| Hook Type | Pattern | Example |
|-----------|---------|---------|
| **State + Actions** | `[state, actions]` tuple | `useToggle` |
| **Generic Storage** | Generic `<T>` | `useLocalStorage<T>` |
| **Async Data** | `{ data, loading, error, refetch }` | `useFetch<T>` |
| **Value Transformation** | `T in → T out` | `useDebounce<T>` |
| **Side Effects** | `void` | `useInterval` |
| **DOM Events** | `void` with cleanup | `useEventListener` |

---

## 🔑 Key Takeaways

| Concept | Key Point |
|---------|-----------|
| **Naming** | Must start with `use` - React relies on this |
| **Generics** | Use `<T>` for flexible, reusable hooks |
| **Return Types** | Tuples for simple, objects for complex |
| **useCallback** | Memoize functions to prevent infinite loops |
| **Cleanup** | Always clean up effects (intervals, event listeners) |
| **Testing** | Use `renderHook` and `act` from Testing Library |

---

## ✅ Day 59 Checklist

- [ ] Understand custom hook naming convention
- [ ] Learn generic `<T>` syntax for flexible hooks
- [ ] Build `useToggle` with tuple return
- [ ] Build `useLocalStorage<T>` generic hook
- [ ] Build `useFetch<T>` with abort controller
- [ ] Build `useDebounce<T>` for search inputs
- [ ] Build `usePrevious<T>` for tracking values
- [ ] Build `useInterval` and `useTimeout`
- [ ] Build `useEventListener` with TypeScript overloads
- [ ] Build `useMediaQuery` for responsive design
- [ ] Build `useCopyToClipboard`
- [ ] Write tests for custom hooks
- [ ] Push all code to GitHub

