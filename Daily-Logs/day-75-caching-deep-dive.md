# 📅 Day 75: Caching Deep Dive

**Date:** June 12, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Data Cache, Full Route Cache, Router Cache, Request Memoization, Cache Control, Revalidation

---

## 📋 Learning Objectives

- ✅ Understand the four Next.js caching mechanisms
- ✅ Control Data Cache with `cache` and `next.revalidate` options
- ✅ Understand Full Route Cache for static rendering
- ✅ Manage Router Cache for client-side navigation
- ✅ Use `revalidateTag()` and `revalidatePath()` for manual invalidation
- ✅ Debug cache behavior in development vs production

---

## 🎯 Part 1: Four Cache Layers in Next.js

Next.js has **four distinct caching mechanisms** that work together to optimize performance.

```
┌─────────────────────────────────────────────────────────────┐
│                       NEXT.JS CACHING                        │
├─────────────────────────────────────────────────────────────┤
│  1. Request Memoization  →  Deduplicates same fetch calls   │
│  2. Data Cache           →  Stores fetch responses          │
│  3. Full Route Cache     →  Stores rendered HTML            │
│  4. Router Cache         →  Stores client-side pages        │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1: Request Memoization (Server)

**Purpose:** Deduplicate identical fetch requests during the same render pass.

```tsx
// During the same render pass, this fetch is called only once
const data1 = await fetch('https://api.example.com/users')
const data2 = await fetch('https://api.example.com/users')
// Second call uses memoized result from first call
```

| Property | Value |
|----------|-------|
| Duration | During single render pass |
| Automatic | Yes (no configuration needed) |
| Scope | Per request |

### Layer 2: Data Cache (Server)

**Purpose:** Store fetch responses across multiple requests and deployments.

```tsx
// Stored in persistent cache, reused across requests
const data = await fetch('https://api.example.com/users', {
  cache: 'force-cache',  // SSG - build time only
  // OR
  next: { revalidate: 60 },  // ISR - revalidate every 60s
  // OR
  cache: 'no-store',  // SSR - never cache, always fresh
})
```

| Option | Behavior | Use Case |
|--------|----------|----------|
| `cache: 'force-cache'` | Stored forever (until revalidate) | Static content |
| `cache: 'no-store'` | Never cached | Real-time data |
| `next: { revalidate: 60 }` | Cache for 60s, then refresh | Semi-dynamic content |

### Layer 3: Full Route Cache (Server)

**Purpose:** Store rendered HTML at the page level. Applies only to static routes.

```tsx
// app/blog/page.tsx
// This page is fully cached if no dynamic functions are used
export default async function BlogPage() {
  const posts = await getPosts()  // Uses Data Cache
  return <div>{/* rendered HTML */}</div>  // Full Route Cache stores result
}
```

| Condition | Full Route Cache Behavior |
|-----------|--------------------------|
| All data uses `force-cache` | ✅ Fully cached |
| Any data uses `no-store` | ❌ Not cached (dynamic) |
| Any dynamic function (`cookies()`, `headers()`) | ❌ Not cached |

### Layer 4: Router Cache (Client)

**Purpose:** Store previous pages in browser memory for instant back/forward navigation.

```tsx
// Prefetch linked pages (default for pages in viewport)
<Link href="/dashboard" prefetch={true}>
  Dashboard
</Link>

// Disable prefetch for expensive pages
<Link href="/reports" prefetch={false}>
  Reports
</Link>
```

| Action | Router Cache Behavior |
|--------|----------------------|
| Navigating to new page | Page added to cache |
| Going back/forward | Instant load from cache |
| Page reload | Cache cleared |
| Hard refresh | Cache cleared |

---

## 🔧 Part 2: Cache Control Options

### force-cache (SSG)

```tsx
// app/blog/page.tsx
export default async function BlogPage() {
  // Fetched at build time, never updates until rebuild
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache',  // Explicit SSG
  })
  
  const data = await posts.json()
  return <BlogList posts={data} />
}

// Or omit cache option (default is force-cache)
const posts = await fetch('https://...')  // Also force-cache
```

### no-store (SSR)

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Fetched on every request - always fresh data
  const stats = await fetch('https://api.example.com/stats', {
    cache: 'no-store',  // SSR
  })
  
  const data = await stats.json()
  return <Dashboard stats={data} />
}
```

### revalidate (ISR)

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // Fetched at build time, revalidates every 60 seconds
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 },  // ISR - 60 seconds
  })
  
  const data = await products.json()
  return <ProductList products={data} />
}
```

### fetch() Options Priority

```
next: { revalidate: 0 }  →  Overridden by cache: 'force-cache'
next: { revalidate: 60 } →  Overridden by cache: 'no-store'
cache: 'no-store'        →  Highest priority
cache: 'force-cache'     →  Overridden by next.revalidate
```

---

## 🔄 Part 3: Manual Revalidation

### revalidatePath()

```tsx
// app/actions/revalidate-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updatePost(formData: FormData) {
  const id = formData.get('id')
  
  // Update database
  await db.post.update({ where: { id }, data: { title } })
  
  // Revalidate specific path
  revalidatePath(`/blog/${id}`)
  
  // Revalidate multiple paths
  revalidatePath('/blog')
  revalidatePath('/')
  
  // Revalidate all paths under a layout
  revalidatePath('/blog', 'layout')
  
  redirect(`/blog/${id}`)
}
```

### revalidateTag()

```tsx
// lib/data.ts
import { unstable_cache } from 'next/cache'

export const getPosts = unstable_cache(
  async () => {
    return await db.post.findMany()
  },
  ['posts'],  // Cache tag
  { revalidate: 3600 }
)
```

```tsx
// app/actions/revalidate-actions.ts
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost(formData: FormData) {
  await db.post.create({ data: { title } })
  
  // Revalidate all data tagged with 'posts'
  revalidateTag('posts')
}
```

### Revalidate Button Component

```tsx
// components/RevalidateButton.tsx
'use client'

import { useTransition } from 'react'
import { revalidate } from '@/app/actions/revalidate-actions'

export function RevalidateButton() {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    startTransition(async () => {
      await revalidate('/dashboard')
    })
  }

  return (
    <button
      onClick={handleRevalidate}
      disabled={isPending}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {isPending ? 'Revalidating...' : 'Refresh Data'}
    </button>
  )
}
```

---

## 🏗️ Part 4: Complete Caching Dashboard

### Types

```ts
// types/index.ts
export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Product {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}

export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  revenue: number
  activeSessions: number
}
```

### Data Fetching Library

```ts
// lib/data.ts
import { Post, Product, DashboardStats } from '@/types'

const API_URL = 'https://jsonplaceholder.typicode.com'

// SSG - Build time only (force-cache)
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`, {
    cache: 'force-cache',
  })
  return res.json()
}

// ISR - Revalidate every 60 seconds
export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 60 },
  })
  return res.json()
}

// SSR - Never cache (no-store)
export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch('https://api.example.com/dashboard/stats', {
    cache: 'no-store',
  })
  return res.json()
}
```

### Home Page (ISR)

```tsx
// app/page.tsx
import { getProducts } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { TimestampDisplay } from '@/components/TimestampDisplay'

export default async function HomePage() {
  const products = await getProducts()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products (ISR)</h1>
        <TimestampDisplay />
      </div>
      
      <p className="text-gray-600 mb-4">
        This page uses ISR - revalidates every 60 seconds.
        Data is cached and served quickly, then updates in background.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 6).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

### Blog Page (SSG)

```tsx
// app/blog/page.tsx
import { getPosts } from '@/lib/data'
import { BlogPostCard } from '@/components/BlogPostCard'
import { TimestampDisplay } from '@/components/TimestampDisplay'

export default async function BlogPage() {
  const posts = await getPosts()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog (SSG)</h1>
        <TimestampDisplay />
      </div>
      
      <p className="text-gray-600 mb-4">
        This page uses SSG (force-cache). Data is fetched at build time
        and never updates until the next deployment.
      </p>
      
      <div className="space-y-4">
        {posts.slice(0, 10).map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

### Dashboard Page (SSR)

```tsx
// app/dashboard/page.tsx
import { getDashboardStats } from '@/lib/data'
import { DashboardStats as StatsComponent } from '@/components/DashboardStats'
import { RevalidateButton } from '@/components/RevalidateButton'
import { TimestampDisplay } from '@/components/TimestampDisplay'

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard (SSR)</h1>
        <div className="flex items-center gap-4">
          <TimestampDisplay />
          <RevalidateButton />
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">
        This page uses SSR (no-store). Data is fetched fresh on every request.
      </p>
      
      <StatsComponent stats={stats} />
    </div>
  )
}
```

### Cache Demo Pages

```tsx
// app/cache-demo/force-cache/page.tsx
import { TimestampDisplay } from '@/components/TimestampDisplay'

async function getTime() {
  const res = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
    cache: 'force-cache',
  })
  const data = await res.json()
  return data.datetime
}

export default async function ForceCachePage() {
  const time = await getTime()
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">force-cache Demo</h1>
      <p className="text-gray-600 mb-4">This data is cached forever (build time only)</p>
      <TimestampDisplay />
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Time from API: {new Date(time).toLocaleString()}</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Refresh the page. The time will NOT change until you rebuild.
      </p>
    </div>
  )
}
```

```tsx
// app/cache-demo/no-store/page.tsx
export default async function NoStorePage() {
  const res = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
    cache: 'no-store',
  })
  const data = await res.json()
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">no-store Demo</h1>
      <p className="text-gray-600 mb-4">This data is fetched fresh on every request</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Time from API: {new Date(data.datetime).toLocaleString()}</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Refresh the page. The time updates on every request.
      </p>
    </div>
  )
}
```

```tsx
// app/cache-demo/revalidate/page.tsx
export default async function RevalidatePage() {
  const res = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
    next: { revalidate: 30 },
  })
  const data = await res.json()
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">revalidate (30s) Demo</h1>
      <p className="text-gray-600 mb-4">This data revalidates every 30 seconds</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Time from API: {new Date(data.datetime).toLocaleString()}</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Refresh within 30 seconds - time stays the same.
        Wait 30 seconds - time updates.
      </p>
    </div>
  )
}
```

### Timestamp Display Component

```tsx
// components/TimestampDisplay.tsx
'use client'

import { useEffect, useState } from 'react'

export function TimestampDisplay() {
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString())
  }, [])

  return (
    <div className="text-sm text-gray-500">
      Page rendered at: {timestamp}
    </div>
  )
}
```

---

## 📊 Quick Reference

### Cache Options Summary

| Option | Behavior | Use Case |
|--------|----------|----------|
| `cache: 'force-cache'` | Build time only, never updates | Static content, blogs |
| `cache: 'no-store'` | Fresh on every request | Real-time data, user-specific |
| `next: { revalidate: n }` | Static + periodic updates | Product listings, news |

### Revalidation Methods

| Method | Purpose |
|--------|---------|
| `revalidatePath('/path')` | Clear cache for a specific path |
| `revalidatePath('/blog', 'layout')` | Clear all paths under layout |
| `revalidateTag('tag')` | Clear data with specific tag |

### Cache Priority

```
cache: 'no-store' > next.revalidate > cache: 'force-cache'
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Data not updating | Using force-cache | Change to no-store or ISR |
| Stale data in dev | Dev mode bypasses cache | Test in production build |
| Router cache not clearing | Client-side cache | Use `router.refresh()` |
| Revalidate not working | Wrong path syntax | Check exact path match |
| Tag revalidate not working | Missing tag | Add tag to fetch config |

---

## ✅ Day 75 Checklist

- [ ] Understand four caching layers
- [ ] Use `cache: 'force-cache'` for SSG
- [ ] Use `cache: 'no-store'` for SSR
- [ ] Use `next: { revalidate: 60 }` for ISR
- [ ] Implement `revalidatePath()` for manual cache clearing
- [ ] Implement `revalidateTag()` for tagged cache clearing
- [ ] Build ISR products page
- [ ] Build SSG blog page
- [ ] Build SSR dashboard page
- [ ] Create cache demo pages for testing
- [ ] Test cache behavior in production build
- [ ] Push code to GitHub

