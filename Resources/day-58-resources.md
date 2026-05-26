# 📚 Day 58 Resources - Typing React Hooks

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React: useState | https://react.dev/reference/react/useState |
| React: useReducer | https://react.dev/reference/react/useReducer |
| React: useEffect | https://react.dev/reference/react/useEffect |
| React: useRef | https://react.dev/reference/react/useRef |
| React: useImperativeHandle | https://react.dev/reference/react/useImperativeHandle |
| TypeScript: useState | https://www.typescriptlang.org/docs/handbook/react-&-webpack.html |
| React TypeScript Cheatsheet: Hooks | https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Typing useState and useReducer | https://youtu.be/6ThXsUwLWvc |
| TypeScript with useRef | https://youtu.be/2jM5l1QxE1g |
| useImperativeHandle Tutorial | https://youtu.be/6ThXsUwLWvc |
| TypeScript Custom Hooks | https://youtu.be/0DdM6H1QjYM |

## 📝 Hooks Cheatsheet

### useState
```tsx
// Inference
const [count, setCount] = useState(0);

// Explicit
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);
```

### useReducer
```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => { ... };
const [state, dispatch] = useReducer(reducer, initialState);
```

### useRef (DOM)
```tsx
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
```

### useRef (Mutable)
```tsx
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const countRef = useRef<number>(0);
```

### useImperativeHandle
```tsx
interface Handle { method: () => void; }
useImperativeHandle(ref, () => ({ method: () => {} }), []);
```

## ✅ Common Hook Type Signatures

| Hook | Type Signature |
|------|----------------|
| `useState` | `useState<T>(initial: T): [T, Dispatch<SetStateAction<T>>]` |
| `useReducer` | `useReducer<R>(reducer: R, initialState: State): [State, Dispatch<Action>]` |
| `useRef` (DOM) | `useRef<T>(initial: null): RefObject<T>` |
| `useRef` (mutable) | `useRef<T>(initial: T): MutableRefObject<T>` |
| `useImperativeHandle` | `useImperativeHandle<T, R>(ref, () => R, deps?)` |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `todos: never[]` | Empty array inference | Explicit type: `useState<Todo[]>([])` |
| `Object is possibly 'null'` | DOM ref may be null | Use optional chaining: `ref.current?.focus()` |
| `Property 'type' does not exist` | Action missing type | Add type property to action |
| `AbortError` treated as error | Not checking error name | Check `error.name !== 'AbortError'` |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React TypeScript Cheatsheet | https://react-typescript-cheatsheet.netlify.app/ |
| TypeScript Deep Dive: React | https://basarat.gitbook.io/typescript/tsx |
| React + TypeScript Best Practices | https://github.com/typescript-cheatsheets/react |

