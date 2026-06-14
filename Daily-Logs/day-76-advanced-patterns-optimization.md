# 📅 Day 76: Advanced Patterns & Optimization

**Date:** June 14, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Code Organization, Performance Optimization, Error Handling, Dynamic Imports, Bundle Analysis

---

## 📋 Learning Objectives

- ✅ Organize code with `_` prefix private folders
- ✅ Use route groups `(folder)` for URL organization
- ✅ Implement error boundaries with `error.tsx` and `global-error.tsx`
- ✅ Create custom 404 page with `not-found.tsx`
- ✅ Use dynamic imports with `next/dynamic` for code splitting
- ✅ Analyze bundle size with `@next/bundle-analyzer`
- ✅ Implement proper loading states with `loading.tsx`

---

## 🎯 Part 1: Code Organization

### Private Folders (`_` prefix)

Folders prefixed with underscore `_` are **not routable**. They are for organizing code without creating URL segments.

```
app/
├── _components/     # Shared UI components (not a route)
├── _lib/           # Server utilities (not a route)
├── _types/         # TypeScript interfaces (not a route)
├── _hooks/         # Custom React hooks (not a route)
└── page.tsx        # Route: /
```

```tsx
// app/_components/Header.tsx
// This component is NOT a route (no page.tsx inside)
// Import it anywhere in your app
export function Header() {
  return <header>My App</header>
}
```

```tsx
// app/layout.tsx - Import from private folder
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### Route Groups (`(folder)`)

Route groups create organizational folders that **do not appear in the URL**.

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx    # Route: /login (not /auth/login)
│   └── register/
│       └── page.tsx    # Route: /register (not /auth/register)
├── (marketing)/
│   ├── about/
│   │   └── page.tsx    # Route: /about
│   └── contact/
│       └── page.tsx    # Route: /contact
└── (dashboard)/
    ├── dashboard/
    │   └── page.tsx    # Route: /dashboard
    └── settings/
        └── page.tsx    # Route: /settings
```

### Shared Layout with Route Groups

```tsx
// app/(auth)/layout.tsx - Only applies to auth routes
export default function AuthLayout({ children }) {
  return (
    <div className="auth-container">
      <h1>Authentication</h1>
      {children}
    </div>
  )
}
```

```tsx
// app/(marketing)/layout.tsx - Only applies to marketing routes
export default function MarketingLayout({ children }) {
  return (
    <div className="marketing-container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
```

---

## 🏗️ Part 2: Error Handling

### error.tsx - Component Error Boundary

Catches errors in a route segment and its children.

```tsx
// app/products/error.tsx
'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Products page error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">{error.message || 'Failed to load products'}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}
```

### global-error.tsx - Root Error Boundary

Catches errors that escape the root layout. Only in `app/global-error.tsx`.

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
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Critical Application Error</h2>
          <p className="text-gray-600 mb-6">Please try refreshing the page.</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try again
          </button>
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
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
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

Splits code into separate chunks, loaded only when needed.

```tsx
// components/shared/HeavyChart.tsx
'use client'

import { useEffect, useState } from 'react'

export function HeavyChart({ data }: { data: any[] }) {
  // Heavy charting library loaded only when this component renders
  const [ChartLib, setChartLib] = useState<any>(null)
  
  useEffect(() => {
    import('recharts').then(mod => setChartLib(mod))
  }, [])
  
  if (!ChartLib) return <div className="h-64 animate-pulse bg-gray-100 rounded" />
  
  return (
    <ChartLib.ResponsiveContainer width="100%" height={300}>
      <ChartLib.LineChart data={data}>
        {/* Chart configuration */}
      </ChartLib.LineChart>
    </ChartLib.ResponsiveContainer>
  )
}
```

```tsx
// app/dashboard/page.tsx
import dynamic from 'next/dynamic'

// Dynamic import with custom loading fallback
const HeavyChart = dynamic(
  () => import('@/components/shared/HeavyChart').then(mod => mod.HeavyChart),
  {
    loading: () => (
      <div className="h-64 animate-pulse bg-gray-100 rounded-lg flex items-center justify-center">
        Loading chart...
      </div>
    ),
    ssr: false,  // Disable SSR for heavy client-only components
  }
)

// Dynamic import with named export
const LazyImage = dynamic(
  () => import('@/components/shared/LazyImage').then(mod => mod.LazyImage),
  { loading: () => <div className="h-48 bg-gray-200 animate-pulse rounded" /> }
)

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart data={chartData} />
      <LazyImage src="/large-image.jpg" alt="Large image" />
    </div>
  )
}
```

### Bundle Analysis

```bash
# Install bundle analyzer
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
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  }
}
```

### Lazy Loading Images

```tsx
// components/shared/LazyImage.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

export function LazyImage({ src, alt, className }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '100px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={className}>
      {isLoaded && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onLoad={() => console.log('Image loaded')}
        />
      )}
      {!isLoaded && <div className="w-full h-full bg-gray-200 animate-pulse" />}
    </div>
  )
}
```

---

## 🏗️ Part 4: Complete Production App Structure

### Root Layout with Error Boundaries

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Production App',
  description: 'A production-ready Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Root Loading Fallback

```tsx
// app/loading.tsx
export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
```

### Products Page with Organization

```tsx
// app/products/page.tsx
import { Suspense } from 'react'
import { ProductList } from './_components/ProductList'
import { ProductFilter } from './_components/ProductFilter'

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <ProductFilter />
      
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  )
}
```

```tsx
// app/products/error.tsx
'use client'

export default function ProductsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl text-red-600 mb-4">Failed to load products</h2>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded">
        Try Again
      </button>
    </div>
  )
}
```

```tsx
// app/products/loading.tsx
export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}
```

### Product Detail with Not Found

```tsx
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import { ProductDetail } from './_components/ProductDetail'
import { getProduct } from '@/lib/api'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }
  
  return <ProductDetail product={product} />
}
```

```tsx
// app/products/[id]/_components/ProductDetail.tsx
'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import heavy review component
const ReviewsSection = dynamic(
  () => import('./ReviewsSection'),
  { loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded" /> }
)

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          priority
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ReviewsSection productId={product.id} />
      </div>
    </div>
  )
}
```

### Dashboard with Dynamic Chart

```tsx
// app/dashboard/page.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { getDashboardData } from './_lib/dashboard-data'
import { DashboardHeader } from './_components/DashboardHeader'
import { RecentActivity } from './_components/RecentActivity'

// Dynamically import heavy chart component
const StatsChart = dynamic(
  () => import('./_components/StatsChart').then(mod => mod.StatsChart),
  {
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />,
    ssr: false,
  }
)

export default async function DashboardPage() {
  const { stats, activity, chartData } = await getDashboardData()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader stats={stats} />
      
      <div className="mt-8">
        <Suspense fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-lg" />}>
          <StatsChart data={chartData} />
        </Suspense>
      </div>
      
      <div className="mt-8">
        <RecentActivity activities={activity} />
      </div>
    </div>
  )
}
```

---

## 📊 Quick Reference

### File Conventions

| File | Purpose |
|------|---------|
| `_folder` | Private folder (not routable) |
| `(folder)` | Route group (not in URL) |
| `error.tsx` | Error boundary for segment |
| `global-error.tsx` | Root error boundary |
| `loading.tsx` | Suspense fallback |
| `not-found.tsx` | 404 page |

### Dynamic Import Patterns

| Pattern | Use Case |
|---------|----------|
| `dynamic(() => import('./Component'))` | Basic dynamic import |
| `dynamic(() => import('./Comp'), { ssr: false })` | Client-only component |
| `dynamic(() => import('./Comp'), { loading: () => <Skeleton /> })` | Custom loading UI |
| `dynamic(() => import('./Comp').then(mod => mod.NamedExport))` | Named exports |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `_folder` still routable | Has `page.tsx` inside | Remove `page.tsx` |
| Error boundary not catching | Wrong placement | Place in correct segment |
| Dynamic import flash | SSR mismatch | Use `ssr: false` for client-only |
| Bundle too large | No code splitting | Use dynamic imports |
| 404 not showing | Wrong `notFound()` placement | Call in page component |

---

## ✅ Day 76 Checklist

- [ ] Create private folders with `_` prefix
- [ ] Create route groups with `(folder)` syntax
- [ ] Organize components into `_components`
- [ ] Organize utilities into `_lib`
- [ ] Organize types into `_types`
- [ ] Implement `error.tsx` on product page
- [ ] Implement `global-error.tsx`
- [ ] Create custom `not-found.tsx` page
- [ ] Add `loading.tsx` to multiple segments
- [ ] Use `next/dynamic` for heavy components
- [ ] Install and run bundle analyzer
- [ ] Implement lazy loading for images
- [ ] Push code to GitHub

