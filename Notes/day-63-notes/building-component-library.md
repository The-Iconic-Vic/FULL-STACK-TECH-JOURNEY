# 📘 Building a Type-Safe Component Library with React & TypeScript

## 🎯 What is a Component Library?

A component library is a collection of reusable UI components that can be shared across multiple projects. When built with TypeScript, it provides **type safety**, **autocompletion**, and **documentation** out of the box.

```typescript
// Instead of copying Button code to every project
// You install and import from your library
import { Button } from '@yourname/react-component-library'

// TypeScript knows exactly what props are available
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
// TypeScript error: variant="invalid" ❌
```

---

## 📦 Library Setup Patterns

### Pattern 1: Vite Library Mode

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,     // Generate .d.ts files
      include: ['src'],            // Only include src
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyComponentLibrary',
      formats: ['es', 'cjs'],      // ESM and CommonJS
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],  // Don't bundle React
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
```

### Pattern 2: package.json Configuration

```json
{
  "name": "@username/react-component-library",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs.js",      // CommonJS entry
  "module": "./dist/index.es.js",      // ESM entry
  "types": "./dist/index.d.ts",        // TypeScript declarations
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],                   // What gets published
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

### Pattern 3: TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,              // Generate .d.ts
    "declarationDir": "./dist",       // Output declarations
    "emitDeclarationOnly": false,     // Also emit JS
    "outDir": "./dist",               // Output directory
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "demo"]
}
```

---

## 🔧 Component Development Patterns

### Pattern 1: Base Component with Props Interface

```typescript
// Button/Button.tsx
import React from 'react'
import styles from './Button.module.css'

export interface ButtonProps {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Disabled state */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button content */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}) => {
  const buttonClasses = [
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    loading && styles['btn-loading'],
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

Button.displayName = 'Button'
```

### Pattern 2: Input Component with forwardRef

```typescript
// Input/Input.tsx
import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className={styles['input-wrapper']}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <div className={styles['input-container']}>
          {leftIcon && <span className={styles['left-icon']}>{leftIcon}</span>}
          <input ref={ref} id={inputId} {...props} />
          {rightIcon && <span className={styles['right-icon']}>{rightIcon}</span>}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {helperText && !error && <span className={styles.helper}>{helperText}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

### Pattern 3: Compound Component (Card with slots)

```typescript
// Card/Card.tsx
import React from 'react'

export interface CardProps {
  variant?: 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  header,
  footer,
  children,
}) => {
  return (
    <div className={`card card-${variant} card-padding-${padding}`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// Usage
<Card
  header={<h3>Title</h3>}
  footer={<Button>Save</Button>}
>
  Card content goes here
</Card>
```

### Pattern 4: Modal with Portal and Focus Trap

```typescript
// Modal/Modal.tsx
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size}`} ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  )
}
```

---

## 🎣 Custom Hook Patterns for Component Library

### Pattern 1: useToggle

```typescript
// hooks/useToggle.ts
import { useState, useCallback } from 'react'

/**
 * Hook for managing boolean state with toggle, setTrue, setFalse actions
 * @param initialValue - Initial boolean state (default: false)
 * @returns [value, toggle, setTrue, setFalse]
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse]
}
```

### Pattern 2: useLocalStorage

```typescript
// hooks/useLocalStorage.ts
import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
```

### Pattern 3: useMediaQuery

```typescript
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    
    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
```

### Pattern 4: useClickOutside

```typescript
// hooks/useClickOutside.ts
import { useEffect, RefObject } from 'react'

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}
```

### Pattern 5: useDebounce

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

### Pattern 6: useFocusTrap

```typescript
// hooks/useFocusTrap.ts
import { useEffect, RefObject } from 'react'

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  active: boolean
): void {
  useEffect(() => {
    if (!active || !ref.current) return

    const container = ref.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    firstFocusable?.focus()

    return () => document.removeEventListener('keydown', handleTabKey)
  }, [active, ref])
}
```

---

## 📁 Entry Point Patterns

### Barrel Exports

```typescript
// components/index.ts
export { Button, type ButtonProps } from './Button'
export { Input, type InputProps } from './Input'
export { Card, type CardProps } from './Card'
export { Modal, type ModalProps } from './Modal'

// hooks/index.ts
export { useToggle } from './useToggle'
export { useLocalStorage } from './useLocalStorage'
export { useMediaQuery } from './useMediaQuery'

// utils/index.ts
export { cn } from './cn'
export { mergeRefs } from './mergeRefs'

// Main entry point - src/index.ts
import './styles/variables.css'
import './styles/global.css'

export * from './components'
export * from './hooks'
export * from './utils'
export * from './types'
```

---

## 📝 JSDoc Documentation Format

```typescript
/**
 * Button component for user interactions
 * 
 * @example
 * // Basic usage
 * <Button onClick={handleClick}>Click me</Button>
 * 
 * @example
 * // With variants
 * <Button variant="primary" size="lg">Primary Large</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 * 
 * @example
 * // Loading state
 * <Button loading>Submitting...</Button>
 */
export interface ButtonProps {
  /** Visual style variant - primary (default), secondary, danger */
  variant?: 'primary' | 'secondary' | 'danger'
  
  /** Size of the button - sm, md (default), lg */
  size?: 'sm' | 'md' | 'lg'
  
  /** Disables button interactions and applies disabled styles */
  disabled?: boolean
  
  /** Shows loading spinner and disables button */
  loading?: boolean
  
  /** Makes button take full width of container */
  fullWidth?: boolean
  
  /** Function called when button is clicked */
  onClick?: () => void
  
  /** Button content - text, icons, or other elements */
  children: React.ReactNode
}
```

---

## 🎨 CSS Modules Pattern

```css
/* Button.module.css */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

/* Sizes */
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

.btn-md {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* States */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  position: relative;
}
```

---

## 📦 Publishing to npm

### Step-by-Step Process

```bash
# 1. Build the library
npm run build

# 2. Check what will be published
npm pack --dry-run

# 3. Login to npm (first time only)
npm login

# 4. Update version
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.0 → 1.1.0 (new features)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)

# 5. Publish to npm
npm publish --access public

# 6. Verify installation
npm install @yourname/react-component-library
```

### Semantic Versioning

| Version | Change | Example |
|---------|--------|---------|
| **Patch** (1.0.x) | Bug fixes, no API changes | 1.0.0 → 1.0.1 |
| **Minor** (1.x.0) | New features, backward compatible | 1.0.0 → 1.1.0 |
| **Major** (x.0.0) | Breaking changes | 1.0.0 → 2.0.0 |

### .npmignore (optional)

```
# Source files
src/
demo/
node_modules/

# Config files
tsconfig.json
vite.config.ts
.eslintrc.cjs

# Test files
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx
```

---

## 🔗 Local Development with npm link

```bash
# In component library directory
npm run build
npm link

# In your app directory
npm link @yourname/react-component-library

# After changes, rebuild library
cd component-library
npm run build

# To unlink
npm unlink --no-save @yourname/react-component-library
npm install @yourname/react-component-library
```

---

## 📚 Utility Functions

### cn - Class Name Merge

```typescript
// utils/cn.ts
type ClassValue = string | number | boolean | null | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  const processValue = (value: ClassValue) => {
    if (!value) return
    if (typeof value === 'string') {
      classes.push(value)
    } else if (Array.isArray(value)) {
      value.forEach(processValue)
    }
  }

  inputs.forEach(processValue)
  return classes.join(' ')
}

// Usage
cn('btn', 'btn-primary', isActive && 'active') // "btn btn-primary active"
```

### mergeRefs

```typescript
// utils/mergeRefs.ts
import { Ref, MutableRefObject, RefCallback } from 'react'

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref && 'current' in ref) {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    })
  }
}
```

---

## 🎯 Best Practices Summary

| Practice | Why |
|----------|-----|
| **Use `displayName`** | Better debugging in React DevTools |
| **Export types** | Allow consumers to use your interfaces |
| **Use `forwardRef`** | Allow ref forwarding to DOM elements |
| **CSS Modules** | Scoped styles, no conflicts |
| **CSS Variables** | Allow theme customization |
| **JSDoc comments** | IDE autocomplete shows descriptions |
| **Barrel exports** | Clean import paths |
| **Peer dependencies** | Avoid duplicate React instances |
| **TypeScript strict mode** | Catch errors at build time |
| **Generate .d.ts files** | TypeScript consumers get autocomplete |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Wrong export path | Check `exports` in package.json |
| `Could not find declaration file` | Missing .d.ts | Add `types` field to package.json |
| Styles not applied | CSS not imported | Import `./style.css` in app |
| Duplicate React | React in both library and app | Use `peerDependencies` |
| `ref` not working | Missing `forwardRef` | Wrap component in `forwardRef` |
| TypeScript errors in consuming app | Incomplete types | Check `types` field in package.json |

