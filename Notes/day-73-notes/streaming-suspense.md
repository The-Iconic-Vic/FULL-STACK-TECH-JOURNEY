# 📘 Streaming & Suspense in Next.js

## 🎯 What is Streaming?

Streaming is a technique where the server sends HTML to the browser in **chunks** as data becomes available, rather than waiting for all data to load before sending anything.

### Traditional SSR vs Streaming

```
Traditional SSR:
Request → Server fetches ALL data → Renders HTML → Sends complete HTML
                                                      ↑
                                          User waits for everything

Streaming SSR:
Request → Sends layout immediately → Streams content as data arrives
              ↑                              ↑
         User sees shell              Content appears progressively
```

---

## 🔧 Part 1: React Suspense

### What is Suspense?

`<Suspense>` is a React component that displays a **fallback UI** while its children are loading.

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />  {/* Shows skeleton while loading */}
      </Suspense>
    </div>
  )
}
```

### How Suspense Works with Server Components

1. Server starts rendering the page
2. When it hits a `<Suspense>` boundary, it sends the fallback immediately
3. Server continues fetching data for the suspended component
4. When data is ready, server streams the actual component HTML
5. Browser replaces fallback with actual content

```tsx
// components/SlowComponent.tsx (Server Component)
export async function SlowComponent() {
  // This delay happens on the server
  const data = await fetchSlowData() // Takes 3 seconds
  
  return <div>{data.content}</div>
}
```

---

## 📁 Part 2: loading.tsx

### Automatic Page Streaming

The `loading.tsx` file creates an automatic `<Suspense>` boundary for the entire page segment.

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  )
}
```

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // This page is automatically wrapped in Suspense
  // loading.tsx shows while data fetches
  const data = await fetchDashboardData()
  return <div>{/* actual content */}</div>
}
```

### loading.tsx Hierarchy

```
app/
├── loading.tsx           # Root loading (all pages)
├── dashboard/
│   ├── loading.tsx       # Dashboard pages (overrides root)
│   └── settings/
│       └── page.tsx      # Uses dashboard/loading.tsx
└── products/
    ├── loading.tsx       # Products pages
    └── page.tsx
```

### Multiple loading.tsx Example

```tsx
// app/loading.tsx - Global loading (slow networks)
export default function GlobalLoading() {
  return <div>Loading entire app...</div>
}

// app/dashboard/loading.tsx - Dashboard specific
export default function DashboardLoading() {
  return <DashboardSkeleton />
}

// app/dashboard/analytics/loading.tsx - Analytics specific
export default function AnalyticsLoading() {
  return <ChartSkeleton />
}
```

---

## 🎨 Part 3: Streaming Patterns

### Pattern 1: Streaming a Single Component

Wrap only the slow component in Suspense. Fast components render immediately.

```tsx
import { Suspense } from 'react'
import { Header } from './Header'           // Fast
import { SlowComments } from './SlowComments' // Slow

export default function Page() {
  return (
    <div>
      <Header />  {/* Renders immediately */}
      
      <Suspense fallback={<CommentsSkeleton />}>
        <SlowComments />  {/* Streams when ready */}
      </Suspense>
    </div>
  )
}
```

### Pattern 2: Parallel Streaming with Multiple Boundaries

Multiple Suspense boundaries allow components to load independently and in parallel.

```tsx
export default function Dashboard() {
  return (
    <div>
      {/* All three load simultaneously */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />  {/* Loads in parallel */}
      </Suspense>
      
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />  {/* Loads in parallel */}
      </Suspense>
      
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />  {/* Loads in parallel */}
      </Suspense>
    </div>
  )
}
```

### Pattern 3: Sequential vs Parallel

```tsx
// ❌ Sequential - components load one after another
export function SequentialPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ComponentA />  {/* Must finish before B starts */}
      <ComponentB />
    </Suspense>
  )
}

// ✅ Parallel - components load simultaneously
export function ParallelPage() {
  return (
    <div>
      <Suspense fallback={<SkeletonA />}>
        <ComponentA />  {/* Loads independently */}
      </Suspense>
      
      <Suspense fallback={<SkeletonB />}>
        <ComponentB />  {/* Loads independently */}
      </Suspense>
    </div>
  )
}
```

### Pattern 4: Nested Suspense

Suspense boundaries can be nested for granular loading states.

```tsx
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent />
    </Suspense>
  )
}

async function PageContent() {
  const data = await fetchData()
  
  return (
    <div>
      <h1>{data.title}</h1>
      
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />
      </Suspense>
      
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  )
}
```

---

## 🏗️ Part 4: Skeleton Components

### Basic Skeleton with Animation

```tsx
// components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 space-y-3 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  )
}
```

### Skeleton Types

| Type | Use Case | Example |
|------|----------|---------|
| Text | Paragraphs, headings | Multiple lines of gray bars |
| Card | Product cards, post previews | Image + text placeholders |
| Chart | Data visualizations | Bar/line placeholders |
| List | Activity feeds, comments | Avatar + text rows |
| Avatar | Profile pictures | Circle placeholder |

### Dashboard Skeleton Example

```tsx
// app/dashboard/loading.tsx
export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mt-2"></div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 shadow">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
```

---

## ⚡ Part 5: Performance Benefits

### Key Metrics Improved

| Metric | Description | Impact of Streaming |
|--------|-------------|---------------------|
| TTFB | Time to First Byte | Faster (headers sent immediately) |
| FCP | First Contentful Paint | Earlier (critical content first) |
| LCP | Largest Contentful Paint | Better (streamed progressively) |
| TTI | Time to Interactive | Similar (same JS load time) |

### When to Use Streaming

| Use Case | Recommended |
|----------|-------------|
| Dashboard with multiple widgets | ✅ Yes |
| Blog with comments section | ✅ Yes |
| Product page with reviews | ✅ Yes |
| Simple static page | ❌ Not needed |
| Real-time chat | ⚠️ Use WebSockets |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Content not streaming | No Suspense boundary | Wrap slow components in `<Suspense>` |
| Sequential loading | Single Suspense around multiple components | Create separate boundaries |
| loading.tsx not showing | Page has no async data | Add async data fetching |
| Layout shift | Skeleton sizes differ from content | Match dimensions precisely |
| Flash before content | No fallback | Always provide fallback |
| Slow initial load | Too many Suspense boundaries | Balance granularity vs overhead |

---

## 📊 Quick Reference

### Suspense API

| Syntax | Purpose |
|--------|---------|
| `<Suspense fallback={<Loading />}>` | Wrap async components |
| `loading.tsx` | Page-level Suspense |
| `fallback` | UI shown during loading |
| `children` | Content that may suspend |

### Streaming Patterns

| Pattern | Code |
|---------|------|
| Single component | `<Suspense><Slow /></Suspense>` |
| Multiple parallel | Multiple separate Suspense |
| Page streaming | `loading.tsx` file |
| Nested streaming | Suspense inside Suspense |

### Skeleton Best Practices

| Practice | Why |
|----------|-----|
| Match dimensions | Prevent layout shift |
| Use `animate-pulse` | Better perceived performance |
| Match color scheme | Professional appearance |
| Show realistic structure | Users understand what's loading |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Streaming sends HTML in chunks** | Server sends content progressively |
| **Suspense shows fallback while loading** | Users see something immediately |
| **loading.tsx is automatic page Suspense** | No manual wrapper needed |
| **Parallel boundaries load independently** | Faster overall loading |
| **Skeletons prevent layout shift** | Match dimensions exactly |
| **Critical content first** | Stream important content immediately |

