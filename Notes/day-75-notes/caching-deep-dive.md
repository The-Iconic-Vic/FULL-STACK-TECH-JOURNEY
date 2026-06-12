# 📘 Next.js Caching Deep Dive

## 🎯 Overview

Next.js provides **four distinct caching mechanisms** that work together to optimize application performance. Understanding each layer is crucial for building fast, efficient applications.

---

## 📁 The Four Cache Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                        REQUEST FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Request → Router Cache (Client) → Full Route Cache (Server)    │
│                     ↓                         ↓                  │
│              Previous pages              Rendered HTML           │
│                                                                  │
│  Data Fetch → Request Memoization → Data Cache                  │
│                      ↓                  ↓                       │
│               Deduplication        Persistent storage           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Layer 1: Request Memoization

| Property | Value |
|----------|-------|
| **Location** | Server |
| **Duration** | Single render pass |
| **Configurable** | No (automatic) |
| **Purpose** | Deduplicate identical fetch requests |

```tsx
// During the same render pass, these two fetches are deduplicated
// Only one request is sent to the server
const users1 = await fetch('https://api.example.com/users')
const users2 = await fetch('https://api.example.com/users')
// users1 and users2 reference the same data
```

### Layer 2: Data Cache

| Property | Value |
|----------|-------|
| **Location** | Server |
| **Duration** | Persistent (until revalidated) |
| **Configurable** | Yes (`cache`, `next.revalidate`) |
| **Purpose** | Store fetch responses across requests |

```tsx
// Stored in Data Cache, reused across different requests
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache'  // Store forever (SSG)
})

const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }  // Store for 60 seconds (ISR)
})

const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'  // Never store (SSR)
})
```

### Layer 3: Full Route Cache

| Property | Value |
|----------|-------|
| **Location** | Server |
| **Duration** | Build time or revalidation |
| **Configurable** | Yes (via data cache + dynamic functions) |
| **Purpose** | Store rendered HTML |

```tsx
// app/blog/page.tsx
// This entire page is cached as HTML
export default async function BlogPage() {
  const posts = await getPosts()  // Uses Data Cache
  return <div>{/* Rendered HTML is cached */}</div>
}
```

### Layer 4: Router Cache

| Property | Value |
|----------|-------|
| **Location** | Client (browser memory) |
| **Duration** | Session (until refresh) |
| **Configurable** | Yes (`prefetch` prop) |
| **Purpose** | Instant back/forward navigation |

```tsx
// Prefetch pages in viewport (default behavior)
<Link href="/dashboard" prefetch={true}>Dashboard</Link>

// Disable prefetch for expensive pages
<Link href="/reports" prefetch={false}>Reports</Link>

// Clear Router Cache programmatically
import { useRouter } from 'next/navigation'
const router = useRouter()
router.refresh()  // Clears Router Cache for current route
```

---

## 🔧 Cache Control Options

### fetch() Configuration

| Option | Behavior | Use Case |
|--------|----------|----------|
| `cache: 'force-cache'` | Build time only, never updates | Blog posts, documentation |
| `cache: 'no-store'` | Fresh on every request | User dashboard, real-time data |
| `next: { revalidate: n }` | Static + periodic updates | Product catalog, news |

### Priority Order

```
cache: 'no-store' → HIGHEST PRIORITY
next: { revalidate: n }
cache: 'force-cache' → LOWEST PRIORITY
```

```tsx
// This is effectively no-store (higher priority)
fetch(url, { 
  cache: 'no-store',
  next: { revalidate: 60 }  // Ignored
})

// This is ISR (revalidate wins)
fetch(url, { 
  cache: 'force-cache',
  next: { revalidate: 60 }  // Takes precedence
})
```

### Default Behavior

```tsx
// No options - defaults to force-cache
fetch('https://api.example.com/data')
// Equivalent to: { cache: 'force-cache' }

// Inside Server Component with dynamic function
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()  // Dynamic function
  // fetch() defaults to no-store when dynamic functions used
  const data = await fetch('https://api.example.com/data')  // no-store
}
```

---

## 🔄 Manual Revalidation

### revalidatePath()

```tsx
'use server'
import { revalidatePath } from 'next/cache'

export async function updatePost(formData: FormData) {
  await db.post.update(...)
  
  // Revalidate single path
  revalidatePath('/blog')
  
  // Revalidate specific post
  revalidatePath(`/blog/${id}`)
  
  // Revalidate all paths under a layout
  revalidatePath('/blog', 'layout')
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
'use server'
import { revalidateTag } from 'next/cache'

export async function createPost(formData: FormData) {
  await db.post.create(...)
  
  // Revalidate all data with 'posts' tag
  revalidateTag('posts')
}
```

---

## 📊 Cache Behavior by Route Type

### Static Route (SSG)

```tsx
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'  // Data Cache: stored
  })
  // Full Route Cache: stores HTML
  return <BlogList posts={posts} />
}
```

| Cache Layer | Behavior |
|-------------|----------|
| Request Memoization | N/A (single fetch) |
| Data Cache | Stored permanently |
| Full Route Cache | Stored as static HTML |
| Router Cache | Cached on client after visit |

### Dynamic Route (SSR)

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const stats = await fetch('https://api.example.com/stats', {
    cache: 'no-store'  // Data Cache: skipped
  })
  // Full Route Cache: NOT stored (dynamic)
  return <Dashboard stats={stats} />
}
```

| Cache Layer | Behavior |
|-------------|----------|
| Request Memoization | Possible if multiple same fetches |
| Data Cache | Bypassed |
| Full Route Cache | Bypassed |
| Router Cache | Cached on client after visit |

### ISR Route

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }  // Data Cache: store for 60s
  })
  // Full Route Cache: stores HTML, regenerates every 60s
  return <ProductList products={products} />
}
```

| Cache Layer | Behavior |
|-------------|----------|
| Request Memoization | Possible if multiple same fetches |
| Data Cache | Stored for 60 seconds |
| Full Route Cache | Stored, regenerates every 60s |
| Router Cache | Cached on client after visit |

---

## 🐛 Debugging Cache

### Development vs Production

| Environment | Data Cache | Full Route Cache | Router Cache |
|-------------|------------|------------------|--------------|
| **Development** | Bypassed | Bypassed | Active |
| **Production** | Full | Full | Active |

### Testing Production Cache Locally

```bash
# Build production version
npm run build

# Run production server
npm start

# Now cache behavior matches production
```

### Cache Headers for Debugging

```tsx
// app/api/debug/route.ts
export async function GET() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  })
  
  return new Response(await res.text(), {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      'x-cache-status': 'HIT'  // or 'MISS'
    }
  })
}
```

---

## 📋 Quick Reference

### Cache Configuration Summary

| Strategy | fetch() Config | Data Cache | Full Route Cache |
|----------|---------------|------------|------------------|
| **SSG** | `cache: 'force-cache'` | ✅ | ✅ |
| **SSR** | `cache: 'no-store'` | ❌ | ❌ |
| **ISR** | `next: { revalidate: n }` | ✅ (n seconds) | ✅ (n seconds) |

### Revalidation Methods

| Method | Clears |
|--------|--------|
| `revalidatePath('/path')` | Data Cache + Full Route Cache for path |
| `revalidateTag('tag')` | Data Cache with matching tags |
| `router.refresh()` | Router Cache for current route |

### Cache Layer Comparison

| Layer | Location | Duration | Configurable |
|-------|----------|----------|--------------|
| Request Memoization | Server | Single render | No |
| Data Cache | Server | Persistent | Yes |
| Full Route Cache | Server | Build/revalidate | Yes |
| Router Cache | Client | Session | Yes (prefetch) |
