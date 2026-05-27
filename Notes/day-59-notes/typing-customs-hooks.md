# 📘 Typing Custom Hooks with TypeScript

## 🎯 What Are Custom Hooks?

Custom hooks are JavaScript functions that **reuse stateful logic** across multiple components. They follow the same rules as React hooks and MUST start with `use`.

```typescript
// ✅ Custom hook - can use other hooks
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  // ... can use useEffect, useRef, etc.
  return width;
}

// ❌ Regular function - cannot use hooks
function getWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth); // ERROR!
  return width;
}
```

---

## 📝 Custom Hook Patterns

### Pattern 1: State + Actions (Tuple Return)

Like `useState` - returns array with value and updater functions.

```typescript
function useToggle(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}

// Usage
const [isOpen, toggleOpen, openModal, closeModal] = useToggle(false);
```

### Pattern 2: State + Actions (Object Return)

More descriptive, better for complex hooks.

```typescript
interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
const { value: isOpen, toggle: toggleOpen } = useToggle(false);
```

### Pattern 3: Async Data Fetching

Returns object with data, loading, error, and refetch.

```typescript
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: String(error) });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// Usage
const { data, loading, error, refetch } = useFetch<User[]>('/api/users');
```

### Pattern 4: Value Transformation (Generic)

Takes a value, returns transformed value.

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

### Pattern 5: Side Effect Management

No return value, just manages effects.

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

---

## 🔧 Generic Custom Hooks

### Why Generics?

Generics allow hooks to work with **any type** while maintaining type safety.

```typescript
// Without generic - type unsafe
function useLocalStorage(key: string, initialValue: any): [any, (value: any) => void] {
  // Can't enforce type safety
}

// With generic - type safe
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // TypeScript enforces T consistently
}

// Usage with different types
const [user, setUser] = useLocalStorage<User | null>('user', null);
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
```

### Generic Constraints

Restrict what types can be used.

```typescript
// T must have an 'id' property
function useItem<T extends { id: string | number }>(item: T) {
  const [data, setData] = useState<T>(item);
  const getId = () => data.id; // Safe because T has id
  return { data, getId };
}

// T must be an object
function useFormData<T extends Record<string, any>>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const updateField = (field: keyof T, value: T[keyof T]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return { formData, updateField };
}
```

---

## 📚 Complete Custom Hook Examples

### 1. useToggle

```typescript
/**
 * Hook for managing boolean state with toggle, setTrue, setFalse actions
 * @param initialValue - Initial boolean state (default: false)
 * @returns [value, toggle, setTrue, setFalse]
 */
function useToggle(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}
```

### 2. useLocalStorage

```typescript
/**
 * Hook for persisting state in localStorage with type safety
 * @param key - localStorage key
 * @param initialValue - Default value if not found
 * @returns [storedValue, setValue, removeValue]
 */
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
```

### 3. useFetch

```typescript
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchOptions extends RequestInit {
  skip?: boolean;
}

/**
 * Hook for fetching data with loading, error, and refetch capabilities
 * @param url - API endpoint URL
 * @param options - Fetch options including skip flag
 * @returns { data, loading, error, refetch }
 */
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
```

### 4. useDebounce

```typescript
/**
 * Hook that debounces a value - useful for search inputs
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
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
```

### 5. usePrevious

```typescript
/**
 * Hook that returns the previous value of a variable
 * @param value - Value to track
 * @returns Previous value (undefined on first render)
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

### 6. useInterval

```typescript
/**
 * Hook for setInterval with automatic cleanup
 * @param callback - Function to execute on each interval
 * @param delay - Delay in milliseconds (null to pause)
 */
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

### 7. useTimeout

```typescript
/**
 * Hook for setTimeout with automatic cleanup
 * @param callback - Function to execute after delay
 * @param delay - Delay in milliseconds (null to cancel)
 */
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
```

### 8. useEventListener

```typescript
/**
 * Hook for adding event listeners with automatic cleanup
 * @param eventName - Name of the event
 * @param handler - Event handler function
 * @param element - DOM element or window (default: window)
 */
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
```

### 9. useMediaQuery

```typescript
/**
 * Hook for responsive design using CSS media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 */
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
```

### 10. useCopyToClipboard

```typescript
interface CopyToClipboardResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: Error | null;
}

/**
 * Hook for copying text to clipboard
 * @returns { copy, copied, error }
 */
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
```

---

## 🧪 Testing Custom Hooks

### Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Test File Template

```typescript
import { renderHook, act } from '@testing-library/react';
import useToggle from './useToggle';

describe('useToggle', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should toggle value when toggle is called', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe(true);
  });
});
```

### Testing Async Hooks

```typescript
import { renderHook, act, waitFor } from '@testing-library/react';

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch<typeof mockData>('/api/test'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });
});
```

---

## 📊 Quick Reference

### Common Return Type Patterns

| Pattern | Return Type | Best For |
|---------|-------------|----------|
| **Tuple** | `[T, (value: T) => void]` | Simple state hooks (like useState) |
| **Object** | `{ value: T; setValue: (value: T) => void }` | Complex hooks with many values |
| **Async** | `{ data: T \| null; loading: boolean; error: string \| null; refetch: () => void }` | Data fetching |
| **Void** | `void` | Side effects only (no return) |

### Generic Hook Signatures

| Hook | Type Signature |
|------|----------------|
| useLocalStorage | `useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]` |
| useFetch | `useFetch<T>(url: string): { data: T \| null; loading: boolean; error: string \| null }` |
| useDebounce | `useDebounce<T>(value: T, delay: number): T` |
| usePrevious | `usePrevious<T>(value: T): T \| undefined` |

### Custom Hook Rules

| Rule | Why |
|------|-----|
| Start with `use` | React relies on this naming convention |
| Call other hooks | Can use useState, useEffect, etc. |
| Only at top level | Cannot be inside conditions or loops |
| Cleanup effects | Return cleanup function from useEffect |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Infinite loop | Missing dependencies in useCallback/useEffect | Add all dependencies to array |
| Stale closure | Using state without dependencies | Add state to dependency array |
| Type inference fails | No generic provided | Explicitly specify generic type |
| AbortError logged | Fetch aborted before completion | Check `error.name !== 'AbortError'` |
| useCallback unnecessary | Premature optimization | Only use for functions passed to child components |

