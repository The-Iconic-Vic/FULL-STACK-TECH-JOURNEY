# 📅 Day 62: Building a Type-Safe Component Library

**Date:** May 30, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Component Library Setup, Vite Library Mode, Publishing to npm, Type Declarations, Documentation

---

## 📋 Learning Objectives

- ✅ Set up a React component library with Vite library mode
- ✅ Configure TypeScript for generating declaration files (.d.ts)
- ✅ Create reusable, fully typed components with CSS Modules
- ✅ Build custom hooks for component logic
- ✅ Document components with JSDoc comments
- ✅ Configure package.json for npm publishing
- ✅ Test components in a demo application

---

## 🎯 Part 1: Component Library Setup

### Why Build a Component Library?

- **Reusability** across multiple projects
- **Consistent design system** across applications
- **Type safety** with TypeScript
- **Tree-shaking** for optimal bundle size
- **Version control** and semantic versioning

### Project Structure

```
my-component-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Toast/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useToggle.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── variables.css
│   │   └── global.css
│   ├── utils/
│   │   └── cn.ts
│   └── index.ts
├── demo/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Vite Library Mode Configuration

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
      insertTypesEntry: true,
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
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

### TypeScript Configuration for Libraries

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
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
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": false
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Package.json Configuration for npm

```json
{
  "name": "@yourusername/react-component-library",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "demo": "vite --config vite.demo.config.ts"
  }
}
```

---

## 🔧 Part 2: Component Development

### Button Component

```tsx
// Button/Button.tsx
import React from 'react'
import styles from './Button.module.css'

export interface ButtonProps {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Disabled state */
  disabled?: boolean
  /** Loading state - shows spinner */
  loading?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
  /** Children content */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
  className = '',
}) => {
  const buttonClasses = [
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    fullWidth && styles['btn-full-width'],
    loading && styles['btn-loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className={styles.spinner} />}
      <span>{children}</span>
    </button>
  )
}

Button.displayName = 'Button'
```

```css
/* Button/Button.module.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-hover);
}

.btn-danger {
  background-color: var(--color-danger);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: var(--color-danger-hover);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-bg-hover);
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

/* Full width */
.btn-full-width {
  width: 100%;
}

/* Loading state */
.btn-loading {
  position: relative;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Input Component

```tsx
// Input/Input.tsx
import React, { forwardRef, useState } from 'react'
import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string
  /** Error message */
  error?: string
  /** Helper text below input */
  helperText?: string
  /** Left icon */
  leftIcon?: React.ReactNode
  /** Right icon */
  rightIcon?: React.ReactNode
  /** Full width input */
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = props.type === 'password'

    const inputClasses = [
      styles.input,
      error && styles['input-error'],
      leftIcon && styles['input-with-left-icon'],
      (rightIcon || isPassword) && styles['input-with-right-icon'],
      fullWidth && styles['input-full-width'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const handleTogglePassword = () => {
      setShowPassword(prev => !prev)
    }

    return (
      <div className={`${styles['input-wrapper']} ${fullWidth ? styles['full-width'] : ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        
        <div className={styles['input-container']}>
          {leftIcon && <span className={styles['left-icon']}>{leftIcon}</span>}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            {...props}
            type={isPassword && showPassword ? 'text' : props.type}
          />
          
          {isPassword && (
            <button
              type="button"
              className={styles['password-toggle']}
              onClick={handleTogglePassword}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          )}
          
          {rightIcon && !isPassword && (
            <span className={styles['right-icon']}>{rightIcon}</span>
          )}
        </div>
        
        {error && <span className={styles['error-text']}>{error}</span>}
        {helperText && !error && (
          <span className={styles['helper-text']}>{helperText}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

```css
/* Input/Input.module.css */
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.input-wrapper.full-width {
  width: 100%;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: inherit;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}

.input:disabled {
  background-color: var(--color-bg-disabled);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--color-danger);
}

.input-error:focus {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.input-with-left-icon {
  padding-left: 2.25rem;
}

.input-with-right-icon {
  padding-right: 2.25rem;
}

.left-icon,
.right-icon {
  position: absolute;
  display: flex;
  align-items: center;
  color: var(--color-text-muted);
}

.left-icon {
  left: 0.75rem;
}

.right-icon {
  right: 0.75rem;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
}

.error-text {
  font-size: 0.75rem;
  color: var(--color-danger);
}

.helper-text {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
```

### Card Component

```tsx
// Card/Card.tsx
import React from 'react'
import styles from './Card.module.css'

export interface CardProps {
  /** Card variant */
  variant?: 'elevated' | 'outlined' | 'filled'
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Bordered card */
  bordered?: boolean
  /** Hover effect */
  hoverable?: boolean
  /** Card header content */
  header?: React.ReactNode
  /** Card footer content */
  footer?: React.ReactNode
  /** Card body content */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  bordered = false,
  hoverable = false,
  header,
  footer,
  children,
  className = '',
}) => {
  const cardClasses = [
    styles.card,
    styles[`card-${variant}`],
    styles[`card-padding-${padding}`],
    bordered && styles['card-bordered'],
    hoverable && styles['card-hoverable'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClasses}>
      {header && <div className={styles['card-header']}>{header}</div>}
      <div className={styles['card-body']}>{children}</div>
      {footer && <div className={styles['card-footer']}>{footer}</div>}
    </div>
  )
}

Card.displayName = 'Card'
```

```css
/* Card/Card.module.css */
.card {
  border-radius: 0.75rem;
  overflow: hidden;
}

/* Variants */
.card-elevated {
  background-color: var(--color-card);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-outlined {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
}

.card-filled {
  background-color: var(--color-bg-secondary);
}

/* Border */
.card-bordered {
  border: 1px solid var(--color-border);
}

/* Hoverable */
.card-hoverable {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Padding */
.card-padding-none {
  padding: 0;
}

.card-padding-sm {
  padding: 0.75rem;
}

.card-padding-md {
  padding: 1rem;
}

.card-padding-lg {
  padding: 1.5rem;
}

/* Header & Footer */
.card-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  font-weight: 600;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}
```

### Modal Component

```tsx
// Modal/Modal.tsx
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './Modal.module.css'

export interface ModalProps {
  /** Modal open state */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
  /** Modal title */
  title?: string
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  /** Close on overlay click */
  closeOnOverlayClick?: boolean
  /** Show close button */
  showCloseButton?: boolean
  /** Modal content */
  children: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  children,
  footer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useFocusTrap(modalRef, isOpen)
  useClickOutside(modalRef, () => {
    if (closeOnOverlayClick) onClose()
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={`${styles.modal} ${styles[`modal-${size}`]}`}>
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {showCloseButton && (
              <button className={styles['close-button']} onClick={onClose}>
                ×
              </button>
            )}
          </div>
        )}
        
        <div className={styles.body}>{children}</div>
        
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

Modal.displayName = 'Modal'
```

```css
/* Modal/Modal.module.css */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal {
  background-color: var(--color-card);
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

/* Sizes */
.modal-sm {
  width: 400px;
  max-width: 90%;
}

.modal-md {
  width: 600px;
  max-width: 90%;
}

.modal-lg {
  width: 800px;
  max-width: 90%;
}

.modal-fullscreen {
  width: 95vw;
  height: 95vh;
  max-width: none;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 0;
  line-height: 1;
}

.close-button:hover {
  color: var(--color-text);
}

/* Body */
.body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Footer */
.footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Toast Component

```tsx
// Toast/Toast.tsx
import React, { useEffect } from 'react'
import styles from './Toast.module.css'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  /** Toast ID */
  id: string
  /** Toast message */
  message: string
  /** Toast type */
  type: ToastType
  /** Duration in ms (0 for no auto-dismiss) */
  duration?: number
  /** Close handler */
  onClose: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div className={`${styles.toast} ${styles[`toast-${type}`]}`}>
      <span className={styles.icon}>{icons[type]}</span>
      <span className={styles.message}>{message}</span>
      <button className={styles['close-button']} onClick={() => onClose(id)}>
        ×
      </button>
    </div>
  )
}

Toast.displayName = 'Toast'

// Toast Container component
export interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>
  onClose: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
```

```css
/* Toast/Toast.module.css */
.container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-card);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  animation: slideInRight 0.3s ease;
  min-width: 300px;
}

.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast-error {
  border-left: 4px solid var(--color-danger);
}

.toast-warning {
  border-left: 4px solid var(--color-warning);
}

.toast-info {
  border-left: 4px solid var(--color-info);
}

.icon {
  font-size: 1.125rem;
}

.message {
  flex: 1;
  font-size: 0.875rem;
  color: var(--color-text);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 0;
  line-height: 1;
}

.close-button:hover {
  color: var(--color-text);
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Select Component

```tsx
// Select/Select.tsx
import React, { forwardRef, useState, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  /** Select label */
  label?: string
  /** Options array */
  options: SelectOption[]
  /** Selected value */
  value?: string
  /** Default selected value */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Error message */
  error?: string
  /** Disabled state */
  disabled?: boolean
  /** Full width select */
  fullWidth?: boolean
  /** Change handler */
  onChange?: (value: string) => void
  /** Additional className */
  className?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      defaultValue,
      placeholder = 'Select an option',
      error,
      disabled = false,
      fullWidth = false,
      onChange,
      className = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      defaultValue
    )
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    const currentValue = value !== undefined ? value : selectedValue
    const selectedOption = options.find(opt => opt.value === currentValue)

    useClickOutside(dropdownRef, () => {
      setIsOpen(false)
    })

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setSelectedValue(optionValue)
      }
      onChange?.(optionValue)
      setIsOpen(false)
    }

    const selectClasses = [
      styles.select,
      error && styles['select-error'],
      fullWidth && styles['select-full-width'],
      disabled && styles['select-disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={selectClasses}>
        {label && <label className={styles.label}>{label}</label>}
        
        <div ref={dropdownRef} className={styles['select-container']}>
          <button
            type="button"
            className={styles['select-trigger']}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          >
            <span className={styles['selected-value']}>
              {selectedOption?.label || placeholder}
            </span>
            <span className={`${styles.arrow} ${isOpen ? styles['arrow-up'] : ''}`}>
              ▼
            </span>
          </button>
          
          {isOpen && (
            <div className={styles.dropdown}>
              {options.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.option} ${
                    currentValue === option.value ? styles['option-selected'] : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {error && <span className={styles['error-text']}>{error}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'
```

```css
/* Select/Select.module.css */
.select {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.select-full-width {
  width: 100%;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.select-container {
  position: relative;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: inherit;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.select-trigger:focus {
  outline: none;
  border-color: var(--color-primary);
}

.select-trigger:disabled {
  background-color: var(--color-bg-disabled);
  cursor: not-allowed;
}

.selected-value {
  flex: 1;
  text-align: left;
}

.arrow {
  transition: transform 0.2s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
}

.option:hover {
  background-color: var(--color-bg-hover);
}

.option-selected {
  background-color: var(--color-primary);
  color: white;
}

.select-error .select-trigger {
  border-color: var(--color-danger);
}

.error-text {
  font-size: 0.75rem;
  color: var(--color-danger);
}
```

---

## 🎣 Part 3: Custom Hooks Library

### useToggle Hook

```typescript
// hooks/useToggle.ts
import { useState, useCallback } from 'react'

/**
 * Hook for managing boolean state with toggle, setTrue, setFalse actions
 * @param initialValue - Initial boolean state (default: false)
 * @returns [value, toggle, setTrue, setFalse]
 * 
 * @example
 * const [isOpen, toggleOpen, openModal, closeModal] = useToggle(false)
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, setTrue, setFalse]
}
```

### useLocalStorage Hook

```typescript
// hooks/useLocalStorage.ts
import { useState, useCallback } from 'react'

/**
 * Hook for persisting state in localStorage with type safety
 * @param key - localStorage key
 * @param initialValue - Default value if not found
 * @returns [storedValue, setValue, removeValue]
 * 
 * @example
 * const [user, setUser, removeUser] = useLocalStorage<User | null>('user', null)
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
```

### useMediaQuery Hook

```typescript
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react'

/**
 * Hook for responsive design using CSS media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
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

### useClickOutside Hook

```typescript
// hooks/useClickOutside.ts
import { useEffect, RefObject } from 'react'

/**
 * Hook that triggers a callback when clicking outside a referenced element
 * @param ref - React ref object for the element
 * @param callback - Callback function to execute
 * 
 * @example
 * const modalRef = useRef<HTMLDivElement>(null)
 * useClickOutside(modalRef, () => closeModal())
 */
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
```

### useDebounce Hook

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

/**
 * Hook that debounces a value - useful for search inputs
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 * 
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

### useFocusTrap Hook

```typescript
// hooks/useFocusTrap.ts
import { useEffect, RefObject } from 'react'

/**
 * Hook that traps focus within a modal/dialog
 * @param ref - React ref object for the container element
 * @param active - Whether the focus trap is active
 * 
 * @example
 * const modalRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(modalRef, isOpen)
 */
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

    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [active, ref])
}
```

---

## 🔧 Part 4: Utilities

### cn Utility (ClassName Merge)

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
```

### mergeRefs Utility

```typescript
// utils/mergeRefs.ts
import { Ref, MutableRefObject, RefCallback } from 'react'

/**
 * Merges multiple React refs into a single ref callback
 * @param refs - Array of refs to merge
 * @returns A single ref callback that sets all refs
 * 
 * @example
 * const mergedRef = mergeRefs(ref1, ref2, ref3)
 * <div ref={mergedRef} />
 */
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

## 📦 Part 5: Entry Points

### Components Index

```typescript
// components/index.ts
export { Button, type ButtonProps } from './Button'
export { Input, type InputProps } from './Input'
export { Card, type CardProps } from './Card'
export { Modal, type ModalProps } from './Modal'
export { Toast, ToastContainer, type ToastProps, type ToastContainerProps } from './Toast'
export { Select, type SelectProps, type SelectOption } from './Select'
```

### Hooks Index

```typescript
// hooks/index.ts
export { useToggle } from './useToggle'
export { useLocalStorage } from './useLocalStorage'
export { useMediaQuery } from './useMediaQuery'
export { useClickOutside } from './useClickOutside'
export { useDebounce } from './useDebounce'
export { useFocusTrap } from './useFocusTrap'
```

### Utils Index

```typescript
// utils/index.ts
export { cn } from './cn'
export { mergeRefs } from './mergeRefs'
```

### Main Entry Point

```typescript
// src/index.ts
// Styles
import './styles/variables.css'
import './styles/global.css'

// Components
export * from './components'

// Hooks
export * from './hooks'

// Utils
export * from './utils'

// Types
export * from './types'
```

---

## 🎨 Part 6: Styles

### CSS Variables

```css
/* styles/variables.css */
:root {
  /* Colors - Light Theme */
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-secondary: #6b7280;
  --color-secondary-hover: #4b5563;
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
  
  /* Backgrounds */
  --color-bg: #ffffff;
  --color-bg-secondary: #f3f4f6;
  --color-bg-hover: #e5e7eb;
  --color-bg-disabled: #f3f4f6;
  --color-card: #ffffff;
  
  /* Text */
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  
  /* Borders */
  --color-border: #e5e7eb;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
}

/* Dark Theme */
[data-theme='dark'] {
  --color-bg: #1f2937;
  --color-bg-secondary: #111827;
  --color-bg-hover: #374151;
  --color-bg-disabled: #374151;
  --color-card: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-border: #374151;
}
```

### Global Styles

```css
/* styles/global.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color var(--transition-normal);
}

button {
  font-family: inherit;
}
```

---

## 📝 Part 7: JSDoc Documentation Format

```typescript
/**
 * Button component for user actions
 * 
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button loading disabled>
 *   Saving...
 * </Button>
 */
export interface ButtonProps {
  /** Button visual variant - controls color scheme */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  
  /** Button size - affects padding and font size */
  size?: 'sm' | 'md' | 'lg'
  
  /** Disabled state - prevents interaction */
  disabled?: boolean
  
  /** Loading state - shows spinner and disables button */
  loading?: boolean
  
  /** Full width button - stretches to container width */
  fullWidth?: boolean
  
  /** Click handler function */
  onClick?: () => void
  
  /** Button type attribute for forms */
  type?: 'button' | 'submit' | 'reset'
  
  /** Button content */
  children: React.ReactNode
  
  /** Additional CSS classes */
  className?: string
}
```

---

## 🚀 Part 8: Publishing to npm

### Step 1: Build the Library

```bash
npm run build
```

### Step 2: Login to npm

```bash
npm login
# Enter username, password, and email
```

### Step 3: Update Version

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major
```

### Step 4: Publish

```bash
npm publish --access public
```

### Local Development with npm link

```bash
# In component library directory
npm link

# In your app directory
npm link @yourusername/react-component-library
```

---

## ✅ Day 62 Checklist

- [ ] Set up Vite library mode with React plugin
- [ ] Configure TypeScript for declaration files
- [ ] Create Button component with variants and sizes
- [ ] Create Input component with label and error states
- [ ] Create Card component with header/footer slots
- [ ] Create Modal component with focus trap
- [ ] Create Toast component with auto-dismiss
- [ ] Create Select component with dropdown
- [ ] Build custom hooks: useToggle, useLocalStorage, useMediaQuery, useClickOutside, useDebounce, useFocusTrap
- [ ] Add CSS Modules styling for all components
- [ ] Add JSDoc comments for all props
- [ ] Create demo app to test components
- [ ] Configure package.json for npm publishing
- [ ] Build and test library
- [ ] Push to GitHub
- [ ] (Optional) Publish to npm

