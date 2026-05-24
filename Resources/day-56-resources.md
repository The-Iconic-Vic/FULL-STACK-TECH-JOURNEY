# 📚 Day 56 Resources - Convert React App to TypeScript

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React TypeScript Cheatsheet | https://react-typescript-cheatsheet.netlify.app/ |
| TypeScript: React Documentation | https://www.typescriptlang.org/docs/handbook/react-&-webpack.html |
| TypeScript: Migrating from JavaScript | https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html |
| React + TypeScript in Vite | https://vitejs.dev/guide/features.html#typescript |
| Redux + TypeScript | https://redux.js.org/usage/usage-with-typescript |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Convert React App to TypeScript | https://youtu.be/5Z2yu0m8w5Y |
| React TypeScript Tutorial | https://youtu.be/5Z2yu0m8w5Y |
| TypeScript with React Hooks | https://youtu.be/6ThXsUwLWvc |
| Typing React Context | https://youtu.be/oiN87KxQhbs |

## 📝 TypeScript + React Cheatsheet

### Component Types
```tsx
// Function Component
const Component: React.FC<Props> = ({ prop1, prop2 }) => { }

// With children
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => { }

// Without React.FC
const Component = ({ prop1, prop2 }: Props) => { }
```

### Hook Types
```tsx
// useState
const [state, setState] = useState<Type>(initial);

// useRef
const ref = useRef<HTMLElement>(null);

// useContext
const value = useContext(Context);

// useReducer
const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);
```

### Event Types
```tsx
// Click
onClick={(e: React.MouseEvent<HTMLButtonElement>) => {}}

// Change
onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}

// Submit
onSubmit={(e: React.FormEvent<HTMLFormElement>) => {}}

// Key Down
onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
```

## ✅ Migration Checklist

### Before Starting
- [ ] Back up your code
- [ ] Create a new branch
- [ ] Install TypeScript and @types

### File Conversion
- [ ] Rename `.jsx` → `.tsx`
- [ ] Rename `.js` → `.ts` (non-component files)
- [ ] Add return types to functions
- [ ] Type all props interfaces
- [ ] Type all state variables
- [ ] Type all event handlers

### After Conversion
- [ ] Run `tsc --noEmit` to check for errors
- [ ] Test all features
- [ ] Commit changes
- [ ] Remove any temporary `any` types

## 🐛 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Property 'X' does not exist on type 'Y'` | Missing prop in interface | Add property to interface |
| `Type 'null' is not assignable to type 'T'` | useState initialized with null | Add union type: `useState<T \| null>(null)` |
| `Object is possibly 'null'` | Ref might be null | Use optional chaining: `ref.current?.focus()` |
| `Binding element 'X' implicitly has an 'any' type` | Missing type annotation | Add interface for props |
| `Cannot find name 'React'` | Missing import | Add `import React from 'react'` |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Advanced React TypeScript Patterns | https://github.com/typescript-cheatsheets/react |
| React TypeScript Community Guide | https://react-typescript-cheatsheet.netlify.app/ |
| TypeScript ESLint for React | https://typescript-eslint.io/ |
| Testing React with TypeScript | https://testing-library.com/docs/react-testing-library/example-intro |
