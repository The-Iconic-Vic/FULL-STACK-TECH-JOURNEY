# 📘 Data Fetching in Next.js: SSR, SSG, ISR

## 🎯 Core Concepts

Next.js provides three distinct rendering strategies for data fetching. Each strategy determines **when** and **how often** your page generates fresh content.

| Strategy | Abbreviation | When it Renders | Data Freshness |
|----------|-------------|----------------|----------------|
| Server-Side Rendering | SSR | Every request | Always fresh |
| Static Site Generation | SSG | Build time only | Stale after build |
| Incremental Static Regeneration | ISR | Build time + periodic | Fresh on revalidate |

---

## 🖥️ Server-Side Rendering (SSR)

### Definition

SSR renders the page **dynamically on every request**. The server fetches fresh data and generates HTML for each visitor individually.

### Fetch Configuration

```tsx
// Method 1: Using cache option
fetch('https://api.example.com/data', {
  cache: 'no-store'
})

// Method 2: Using revalidate option
fetch('https://api.example.com/data', {
  next: { revalidate: 0 }
})
```

### How SSR Works

```
User Request → Server receives request → Server fetches fresh data
→ Server renders HTML → HTML sent to browser → User sees fresh content
```

### Use Cases

| Scenario | Why SSR |
|----------|---------|
| User dashboard | Content varies per user |
| Real-time analytics | Needs current data |
| Shopping cart | User-specific state |
| Authenticated pages | Sensitive user data |
| Stock prices | Changes every second |

### Advantages & Disadvantages

| Advantages | Disadvantages |
|------------|---------------|
| Always fresh data | Slower response time |
| User-specific content | Higher server load |
| Real-time capable | Cannot be cached on CDN |
| SEO friendly | Higher infrastructure cost |

---

## 📦 Static Site Generation (SSG)

### Definition

SSG pre-renders pages **once at build time** (`npm run build`). The generated HTML is static and can be served via CDN.

### Fetch Configuration

```tsx
// Method 1: Default behavior (explicit)
fetch('https://api.example.com/data', {
  cache: 'force-cache'
})

// Method 2: No options (same as above)
fetch('https://api.example.com/data')
```

### How SSG Works

```
npm run build → Fetches data → Generates HTML pages
→ Deploy to CDN → Each request serves pre-built HTML
```

### Dynamic SSG with generateStaticParams

For dynamic routes like `/posts/[id]`, `generateStaticParams` tells Next.js which pages to pre-render.

```tsx
// app/posts/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  
  // Return array of params for each page to pre-render
  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default async function PostPage({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.id}`)
  // This runs for each ID during build
}
```

### Use Cases

| Scenario | Why SSG |
|----------|---------|
| Blog posts | Content rarely changes |
| Documentation | Versioned content |
| Marketing pages | Static copy |
| Portfolio | Showcase projects |
| Product catalog | Non-inventory items |

### Advantages & Disadvantages

| Advantages | Disadvantages |
|------------|---------------|
| Blazing fast (CDN) | Stale data after build |
| Very low server load | Long build times for many pages |
| Excellent SEO | Cannot show user-specific content |
| No server required | Rebuild needed for updates |

---

## ⚡ Incremental Static Regeneration (ISR)

### Definition

ISR combines SSG and SSR: pages are static but **revalidate periodically** in the background. Users always see a cached page while new version generates.

### Fetch Configuration

```tsx
// Revalidate every 60 seconds
fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})
```

### How ISR Works

```
First request → Serves cached static page
Background → If cache older than 60s, triggers regeneration
Subsequent request → Serves newly generated page
Cache updates → Next requests get fresh page
```

### Revalidation Time Examples

```tsx
next: { revalidate: 10 }    // Every 10 seconds (highly dynamic)
next: { revalidate: 60 }     // Every minute (product prices)
next: { revalidate: 300 }    // Every 5 minutes (news)
next: { revalidate: 3600 }   // Every hour (weather)
next: { revalidate: 86400 }  // Every day (blog posts)
```

### Use Cases

| Scenario | Revalidate | Why ISR |
|----------|------------|---------|
| E-commerce products | 60-300 seconds | Price/stock changes, mostly static |
| News articles | 30-60 seconds | Frequent updates, fast delivery |
| Weather widget | 300-600 seconds | Regular updates, not real-time |
| Leaderboard | 30-60 seconds | Fast + eventually consistent |
| Product listings | 300 seconds | Good balance of speed/freshness |

### Advantages & Disadvantages

| Advantages | Disadvantages |
|------------|---------------|
| Fast (CDN cached) | Stale data until revalidate |
| Automatic updates | Regeneration adds server load |
| Low server load overall | Complex to understand |
| Best of both worlds | Not for user-specific data |

---

## 📊 Comparison Matrix

### Technical Comparison

| Aspect | SSR | SSG | ISR |
|--------|-----|-----|-----|
| **Rendering time** | Request time | Build time | Build + background |
| **Cache header** | `no-store` | `force-cache` | `revalidate: n` |
| **Server load** | High | None | Low |
| **First byte time** | Slower | Fastest | Fast |
| **Can use CDN** | No | Yes | Yes |
| **Data freshness** | Always fresh | Stale after build | Stale until revalidate |
| **User-specific data** | Yes | No | No |
| **Build time impact** | None | Large | Large |

### Performance Characteristics

```
SSR:  Request → Fetch → Render → Response (100-500ms)
SSG:  Build → CDN → Response (5-20ms)
ISR:  Build → CDN → Response (5-20ms) + Background regeneration
```

---

## 🔧 Advanced Patterns

### Hybrid Approach: Combining Strategies

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // ISR for product listing (mostly static)
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 300 }
  })
  
  return <ProductList products={products} />
}

// app/dashboard/page.tsx
export default async function DashboardPage() {
  // SSR for user-specific data
  const user = await fetch('https://api.example.com/user', {
    cache: 'no-store'
  })
  
  return <UserDashboard user={user} />
}
```

### Conditional Rendering Strategy

```tsx
// lib/fetch-strategy.ts
export async function fetchData<T>(
  url: string, 
  strategy: 'ssr' | 'ssg' | 'isr',
  revalidate?: number
): Promise<T> {
  const options = {
    ssr: { cache: 'no-store' as const },
    ssg: { cache: 'force-cache' as const },
    isr: { next: { revalidate: revalidate || 60 } }
  }
  
  const res = await fetch(url, options[strategy])
  return res.json()
}
```

### Environment-based Strategy

```tsx
// lib/config.ts
const isDevelopment = process.env.NODE_ENV === 'development'

export async function fetchPosts() {
  return fetch('https://api.example.com/posts', {
    // Use SSR in dev, SSG in production
    cache: isDevelopment ? 'no-store' : 'force-cache'
  })
}
```

---

## 🎯 Decision Guide

### Strategy Selection Flowchart

```
Start: What data are you fetching?
│
├─ Is it user-specific or requires auth?
│  └─ YES → Use SSR (cache: 'no-store')
│  └─ NO → Continue
│
├─ Does it change very frequently? (< 10 seconds)
│  └─ YES → Use SSR or client-side fetching
│  └─ NO → Continue
│
├─ Can it be stale for a few seconds/minutes?
│  └─ YES → Use ISR (next: { revalidate: n })
│  └─ NO → Use SSG (cache: 'force-cache')
```

### Quick Selection Table

| Requirement | Strategy | Config |
|-------------|----------|--------|
| User personalization | SSR | `cache: 'no-store'` |
| Real-time data (< 1s) | SSR + WebSocket | `cache: 'no-store'` |
| Near real-time (1-60s) | ISR (short) | `next: { revalidate: 10 }` |
| Regular updates (minutes) | ISR (medium) | `next: { revalidate: 60 }` |
| Infrequent updates (hours) | ISR (long) | `next: { revalidate: 3600 }` |
| Never changes after deploy | SSG | `cache: 'force-cache'` |

---

## 🐛 Common Pitfalls & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| Data not updating | Using SSG for dynamic data | Switch to SSR or ISR |
| Slow build time | Too many SSG pages | Use ISR or incremental static generation |
| Stale data in ISR | Revalidation time too high | Reduce revalidate value |
| Missing generateStaticParams | Dynamic route without params | Add generateStaticParams |
| Fetch error in Client Component | fetch in client component | Move to Server Component or API route |
| Build fails on external API | API down during build | Use fallback data or ISR |

---

## 📁 File Structure Reference

```
app/
├── page.tsx                    # SSG (home page)
├── posts/
│   ├── page.tsx               # SSG (all posts)
│   └── [id]/
│       └── page.tsx           # Dynamic SSG (single post)
├── dashboard/
│   └── page.tsx               # SSR (user dashboard)
├── isr-demo/
│   └── page.tsx               # ISR (revalidates)
└── api/
    └── comments/
        └── route.ts           # API for client-side fetching
```

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **SSR = Fresh** | `cache: 'no-store'` → fresh on every request |
| **SSG = Fast** | `cache: 'force-cache'` → built once, served from CDN |
| **ISR = Best of Both** | `next: { revalidate: n }` → static + periodic updates |
| **Default is SSG** | fetch() without options uses `force-cache` |
| **Dynamic SSG needs generateStaticParams** | Tells Next.js which paths to pre-render |
| **ISR revalidation is background** | Users never wait for regeneration |
| **Choose based on data change frequency** | More frequent = shorter revalidate |

