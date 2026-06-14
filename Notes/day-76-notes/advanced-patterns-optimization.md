# 📘 Advanced Patterns & Optimization in Next.js

## 🎯 Overview

Production-ready Next.js applications require organized code structure, comprehensive error handling, and performance optimization. This guide covers essential patterns for building scalable, maintainable applications.

---

## 📁 Part 1: Code Organization

### Private Folders (`_` prefix)

Folders prefixed with an underscore are **not routable** - they exist only for code organization.

```
app/
├── _components/     # Shared UI components (NOT a route)
├── _lib/           # Server utilities (NOT a route)
├── _types/         # TypeScript interfaces (NOT a route)
├── _hooks/         # Custom React hooks (NOT a route)
└── page.tsx        # Actual route: /
```

```tsx
// app/_components/Header.tsx
// This file can be imported anywhere but creates no route
export function Header() {
  return <header>My App</header>
}
```

```tsx
// app/layout.tsx - Import from private folder
import { Header } from './_components/Header'
```

### Why Use Private Folders?

| Benefit | Explanation |
|---------|-------------|
| **No accidental routes** | Can't navigate to `/_components` |
| **Clear organization** | Group related code together |
| **Better maintainability** | Code lives near where it's used |
| **Easier refactoring** | Move files without breaking routes |

### Route Groups (`(folder)`)

Route groups create organizational folders that **do not appear in the URL path**.

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx    # URL: /login (not /auth/login)
│   └── register/
│       └── page.tsx    # URL: /register (not /auth/register)
├── (marketing)/
│   ├── about/
│   │   └── page.tsx    # URL: /about
│   └── contact/
│       └── page.tsx    # URL: /contact
└── (dashboard)/
    ├── dashboard/
    │   └── page.tsx    # URL: /dashboard
    └── settings/
        └── page.tsx    # URL: /settings
```

### Route Group Layouts

```tsx
// app/(auth)/layout.tsx - Only applies to auth routes
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container">
      <h1>Authentication</h1>
      {children}
    </div>
  )
}
```

```tsx
// app/(dashboard)/layout.tsx - Only applies to dashboard routes
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      {children}
    </div>
  )
}
```

---

## 🚨 Part 2: Error Handling

### Error Boundary Hierarchy

```
global-error.tsx    → Catches errors in root layout
       ↓
layout.tsx
       ↓
error.tsx           → Catches errors in segment and children
       ↓
not-found.tsx       → 404 page for missing routes
```

### error.tsx - Segment Error Boundary

```tsx
// app/products/error.tsx
'use client'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl text-red-600 mb-4">Failed to load products</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}
```

### global-error.tsx - Root Error Boundary

```tsx
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  )
}
```

### not-found.tsx - 404 Page

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <Link href="/" className="text-blue-600 hover:underline">
        Return Home
      </Link>
    </div>
  )
}
```

### Triggering 404 Programmatically

```tsx
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()  // Renders not-found.tsx
  }
  
  return <ProductDetail product={product} />
}
```

---

## ⚡ Part 3: Performance Optimization

### Dynamic Imports with next/dynamic

```tsx
import dynamic from 'next/dynamic'

// Basic dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'))

// With loading fallback
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
  }
)

// Disable SSR (client-only)
const ClientComponent = dynamic(
  () => import('./ClientComponent'),
  { ssr: false }
)

// Named export
const NamedComponent = dynamic(
  () => import('./Module').then(mod => mod.NamedComponent)
)
```

### When to Use Dynamic Imports

| Scenario | Recommendation |
|----------|----------------|
| Heavy charts/graphs | ✅ Dynamic + ssr: false |
| Modals (rarely opened) | ✅ Dynamic |
| Below-fold content | ✅ Dynamic |
| Hero section (above fold) | ❌ Regular import |
| Critical UI | ❌ Regular import |

### Bundle Analysis

```bash
npm install @next/bundle-analyzer
```

```ts
// next.config.analyze.ts
import type { NextConfig } from 'next'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // Your config
}

export default withBundleAnalyzer(nextConfig)
```

```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

### Lazy Loading Images with Intersection Observer

```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full h-64">
      {isLoaded ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
```

---

## 📊 Quick Reference

### File Conventions

| File/Folder | Purpose | Creates Route? |
|-------------|---------|----------------|
| `_folder` | Private organization | ❌ No |
| `(folder)` | Route group | ❌ No (hides from URL) |
| `error.tsx` | Error boundary | ❌ No |
| `global-error.tsx` | Root error boundary | ❌ No |
| `loading.tsx` | Suspense fallback | ❌ No |
| `not-found.tsx` | 404 page | ✅ Yes (matches any unknown route) |
| `layout.tsx` | Shared UI | ❌ No |
| `page.tsx` | Route page | ✅ Yes |

### Error Handler Props

| File | Props |
|------|-------|
| `error.tsx` | `{ error: Error; reset: () => void }` |
| `global-error.tsx` | `{ error: Error; reset: () => void }` |
| `not-found.tsx` | No props |

### Dynamic Import Options

| Option | Purpose |
|--------|---------|
| `loading` | Component to show while loading |
| `ssr: false` | Disable server-side rendering |
| `ssr: true` | Enable SSR (default) |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `_folder` is routable | Contains `page.tsx` | Remove `page.tsx` file |
| Route group appears in URL | Wrong folder name | Use `(folder)` not `[folder]` or `folder` |
| Error boundary not catching | Wrong placement | Place `error.tsx` in correct segment |
| 404 page not showing | `notFound()` not called | Call `notFound()` for missing data |
| Dynamic import flash | SSR mismatch | Use `ssr: false` for client-only |
| Large bundle size | No code splitting | Use dynamic imports for heavy components |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **`_` prefix = private folder** | Not routable, for code organization |
| **`(folder)` = route group** | Organizes routes without URL impact |
| **error.tsx for segment errors** | Catches errors in route and children |
| **global-error.tsx for root errors** | Catches errors escaping root layout |
| **not-found.tsx for 404s** | Custom page not found UI |
| **loading.tsx for streaming** | Suspense fallback for route |
| **dynamic() for code splitting** | Reduces initial bundle size |
| **Bundle analyzer to find issues** | Identify large dependencies |

