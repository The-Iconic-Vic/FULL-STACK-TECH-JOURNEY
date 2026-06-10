# 📅 Day 73: Streaming & Suspense

**Date:** June 10, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Streaming, Suspense Boundaries, loading.tsx, Progressive Rendering, Parallel Data Fetching

---

## 📋 Learning Objectives

- ✅ Understand what streaming is and how it improves perceived performance
- ✅ Use `<Suspense>` boundaries to wrap slow components
- ✅ Create loading fallback UI with skeleton screens
- ✅ Implement `loading.tsx` for automatic page-level streaming
- ✅ Stream pages with parallel data fetching
- ✅ Combine Suspense with Server Components for progressive rendering

---

## 🎯 Part 1: What is Streaming?

### The Problem: Traditional SSR

In traditional Server-Side Rendering (SSR), the server must fetch **all data** before sending any HTML to the browser.

```
Request → Server fetches all data → Server renders HTML → Browser receives complete HTML
                                                                              ↑
                                                              User waits for ALL data
```

### The Solution: Streaming

With streaming, the server sends HTML in **chunks** as data becomes available.

```
Request → Server sends header → Server fetches data → Sends more HTML → Complete
                ↑                      ↑                    ↑
          User sees layout      Content appears     Final content loaded
```

### Benefits of Streaming

| Benefit | Description |
|---------|-------------|
| **Faster Time to First Byte (TTFB)** | Initial HTML sent immediately |
| **Better perceived performance** | Users see content progressively |
| **No client-side waterfalls** | Data fetching happens on server |
| **Improved Core Web Vitals** | Better LCP and TTI scores |

---

## 🔧 Part 2: Suspense Basics

### What is Suspense?

`<Suspense>` is a React component that shows a **fallback UI** while its children are loading.

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { AnalyticsChart } from '@/components/AnalyticsChart'
import { SkeletonChart } from '@/components/SkeletonChart'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Shows skeleton while AnalyticsChart loads */}
      <Suspense fallback={<SkeletonChart />}>
        <AnalyticsChart />
      </Suspense>
    </div>
  )
}
```

### How Suspense Works with Server Components

```tsx
// components/AnalyticsChart.tsx (Server Component)
export async function AnalyticsChart() {
  // This delay happens on the server
  const data = await fetchAnalyticsData() // Takes 2 seconds
  
  return (
    <div className="chart">
      {/* Render chart with data */}
    </div>
  )
}
```

**Streaming Flow:**
1. Server sends the layout and Suspense boundary immediately
2. Server continues fetching data in the background
3. When data is ready, server streams the chart HTML
4. Browser progressively displays content

---

## 📁 Part 3: loading.tsx

### Automatic Page Streaming

The `loading.tsx` file creates an automatic Suspense boundary for the entire page.

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="grid grid-cols-3 gap-6">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  )
}
```

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // This entire page is automatically wrapped in Suspense
  // loading.tsx shows while page loads
  const data = await fetchData()
  return <div>{/* page content */}</div>
}
```

### Nested loading.tsx

You can have `loading.tsx` at multiple levels. Next.js uses the closest one.

```
app/
├── loading.tsx           # Root loading (all pages)
├── dashboard/
│   ├── loading.tsx       # Dashboard pages only
│   └── settings/
│       └── page.tsx      # Uses dashboard/loading.tsx
└── products/
    ├── loading.tsx       # Products pages only
    └── page.tsx
```

### Loading UI Examples

```tsx
// app/dashboard/loading.tsx - Dashboard skeleton
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      
      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
      
      {/* Chart skeleton */}
      <div className="h-96 bg-gray-200 rounded animate-pulse" />
    </div>
  )
}
```

```tsx
// app/products/loading.tsx - Products grid skeleton
export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="h-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      ))}
    </div>
  )
}
```

---

## 🎨 Part 4: Streaming Patterns

### Pattern 1: Wrapping Slow Components

```tsx
// app/page.tsx
import { Suspense } from 'react'
import { Header } from '@/components/Header'
import { SlowComments } from '@/components/SlowComments'
import { SkeletonComments } from '@/components/SkeletonComments'

export default function HomePage() {
  return (
    <div>
      {/* Always renders immediately - no delay */}
      <Header />
      
      <p>Welcome to my site!</p>
      
      {/* Comments load slowly, show skeleton while loading */}
      <Suspense fallback={<SkeletonComments />}>
        <SlowComments />
      </Suspense>
    </div>
  )
}
```

### Pattern 2: Parallel Data Fetching

Fetch multiple slow components in parallel using multiple Suspense boundaries.

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { Analytics } from '@/components/Analytics'
import { RecentActivity } from '@/components/RecentActivity'
import { Recommendations } from '@/components/Recommendations'
import { SkeletonChart, SkeletonList, SkeletonGrid } from '@/components/Skeletons'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* All three load in parallel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<SkeletonChart />}>
          <Analytics />
        </Suspense>
        
        <Suspense fallback={<SkeletonList />}>
          <RecentActivity />
        </Suspense>
      </div>
      
      <Suspense fallback={<SkeletonGrid />}>
        <Recommendations />
      </Suspense>
    </div>
  )
}
```

### Pattern 3: Sequential vs Parallel Streaming

```tsx
// ❌ Sequential streaming (components load one after another)
export default function SequentialPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      {/* Must wait for component A to finish before B can start */}
      <ComponentA />
      <ComponentB /> {/* Waits for A to finish loading */}
    </Suspense>
  )
}
```

```tsx
// ✅ Parallel streaming (components load simultaneously)
export default function ParallelPage() {
  return (
    <div>
      <Suspense fallback={<SkeletonA />}>
        <ComponentA /> {/* Loads independently */}
      </Suspense>
      
      <Suspense fallback={<SkeletonB />}>
        <ComponentB /> {/* Loads independently */}
      </Suspense>
    </div>
  )
}
```

### Pattern 4: Streaming with Delays

```tsx
// lib/data.ts - Simulate slow data fetching
export async function getFastData() {
  // Fast data - no delay
  return { message: 'Fast data' }
}

export async function getMediumData() {
  // Medium delay - 1 second
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { message: 'Medium data' }
}

export async function getSlowData() {
  // Slow data - 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000))
  return { message: 'Slow data' }
}
```

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { getFastData, getMediumData, getSlowData } from '@/lib/data'

async function FastComponent() {
  const data = await getFastData()
  return <div className="bg-green-100 p-4 rounded">{data.message}</div>
}

async function MediumComponent() {
  const data = await getMediumData()
  return <div className="bg-yellow-100 p-4 rounded">{data.message}</div>
}

async function SlowComponent() {
  const data = await getSlowData()
  return <div className="bg-red-100 p-4 rounded">{data.message}</div>
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1>Streaming Demo</h1>
      
      {/* Fast component - no Suspense needed, renders immediately */}
      <FastComponent />
      
      {/* Medium component - shows fallback for 1 second */}
      <Suspense fallback={<div className="bg-gray-100 p-4 rounded animate-pulse">Loading medium...</div>}>
        <MediumComponent />
      </Suspense>
      
      {/* Slow component - shows fallback for 3 seconds */}
      <Suspense fallback={<div className="bg-gray-100 p-4 rounded animate-pulse">Loading slow...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

---

## 🏗️ Part 5: Complete Streaming Dashboard

### Types

```ts
// types/index.ts
export interface AnalyticsData {
  revenue: number[]
  users: number[]
  months: string[]
}

export interface Activity {
  id: number
  user: string
  action: string
  timestamp: Date
}

export interface Comment {
  id: number
  author: string
  content: string
  createdAt: Date
}
```

### Data Fetching Library

```ts
// lib/data.ts
import { AnalyticsData, Activity, Comment } from '@/types'

// Simulate network delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getAnalyticsData(): Promise<AnalyticsData> {
  await delay(2000) // Slow API call
  return {
    revenue: [12000, 15000, 18000, 22000, 28000, 35000],
    users: [1200, 1500, 1800, 2200, 2800, 3500],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  }
}

export async function getRecentActivity(): Promise<Activity[]> {
  await delay(1000)
  return [
    { id: 1, user: 'Alice', action: 'Created a new project', timestamp: new Date() },
    { id: 2, user: 'Bob', action: 'Updated settings', timestamp: new Date() },
    { id: 3, user: 'Charlie', action: 'Added a comment', timestamp: new Date() },
  ]
}

export async function getComments(): Promise<Comment[]> {
  await delay(1500)
  return [
    { id: 1, author: 'Alice', content: 'Great work!', createdAt: new Date() },
    { id: 2, author: 'Bob', content: 'Keep it up!', createdAt: new Date() },
    { id: 3, author: 'Charlie', content: 'This is awesome!', createdAt: new Date() },
  ]
}
```

### Skeleton Components

```tsx
// components/SkeletonChart.tsx
export function SkeletonChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-48 bg-gray-200 rounded"></div>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-4 bg-gray-200 rounded w-12"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

```tsx
// components/SkeletonList.tsx
export function SkeletonList() {
  return (
    <div className="bg-white rounded-lg p-6 shadow animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

```tsx
// components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}
```

### Analytics Chart Component

```tsx
// components/AnalyticsChart.tsx
import { getAnalyticsData } from '@/lib/data'

export async function AnalyticsChart() {
  const data = await getAnalyticsData()
  
  const maxRevenue = Math.max(...data.revenue)
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-6">Revenue Analytics</h2>
      
      <div className="space-y-6">
        {/* Bar Chart */}
        <div className="flex items-end gap-4 h-64">
          {data.revenue.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${(value / maxRevenue) * 200}px` }}
              />
              <span className="text-sm mt-2">{data.months[index]}</span>
              <span className="text-xs text-gray-500">${value}</span>
            </div>
          ))}
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">
              ${data.revenue.reduce((a, b) => a + b, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">
              {data.users.reduce((a, b) => a + b, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Recent Activity Component

```tsx
// components/RecentActivity.tsx
import { getRecentActivity } from '@/lib/data'

export async function RecentActivity() {
  const activities = await getRecentActivity()
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              {activity.user[0]}
            </div>
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-600">{activity.action}</p>
              <p className="text-xs text-gray-400 mt-1">
                {activity.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Comments Component

```tsx
// components/Comments.tsx
import { getComments } from '@/lib/data'

export async function Comments() {
  const comments = await getComments()
  
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-6">Recent Comments</h2>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="space-y-2 pb-4 border-b last:border-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-xs text-gray-400">
                {comment.createdAt.toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Main Dashboard Page

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { AnalyticsChart } from '@/components/AnalyticsChart'
import { RecentActivity } from '@/components/RecentActivity'
import { Comments } from '@/components/Comments'
import { SkeletonChart, SkeletonList, SkeletonCard } from '@/components/Skeletons'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your dashboard. Content streams as it loads.
        </p>
      </div>
      
      {/* Stats Row - Renders Immediately */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-500 text-sm">Stat {i}</p>
            <p className="text-2xl font-bold">---</p>
          </div>
        ))}
      </div>
      
      {/* Analytics - Slow (2s) */}
      <Suspense fallback={<SkeletonChart />}>
        <AnalyticsChart />
      </Suspense>
      
      {/* Two-column layout for parallel loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity - Medium (1s) */}
        <Suspense fallback={<SkeletonList />}>
          <RecentActivity />
        </Suspense>
        
        {/* Comments - Medium (1.5s) */}
        <Suspense fallback={<SkeletonList />}>
          <Comments />
        </Suspense>
      </div>
    </div>
  )
}
```

### Dashboard Loading.tsx

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mt-2"></div>
      </div>
      
      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 shadow">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>
      
      {/* Chart skeleton */}
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
      
      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 shadow">
            <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(j => (
                <div key={j} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 📊 Quick Reference

### Suspense API

| API | Purpose |
|-----|---------|
| `<Suspense fallback={...}>` | Wrap async components |
| `loading.tsx` | Page-level Suspense boundary |
| `fallback` | UI shown during loading |

### Streaming Patterns

| Pattern | Use Case |
|---------|----------|
| Single Suspense | One slow component |
| Multiple Suspense | Multiple independent slow components |
| Nested Suspense | Components with nested async dependencies |
| loading.tsx | Automatic page streaming |

### Performance Benefits

| Metric | Improvement |
|--------|-------------|
| Time to First Byte (TTFB) | Faster (immediate headers) |
| First Contentful Paint (FCP) | Earlier (critical content first) |
| Largest Contentful Paint (LCP) | Better (streamed progressively) |
| Perceived Performance | Excellent (users see content sooner) |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Content not streaming | No Suspense boundary | Wrap slow components in `<Suspense>` |
| Sequential instead of parallel | Single Suspense around multiple components | Separate Suspense boundaries |
| loading.tsx not showing | No async data fetching | Ensure component is async |
| Layout shift | Different sized skeletons | Match skeleton dimensions to actual content |
| Flash of content | No fallback during navigation | Use `loading.tsx` or Suspense boundaries |

---

## ✅ Day 73 Checklist

- [ ] Understand streaming and Suspense concepts
- [ ] Create `loading.tsx` for automatic page streaming
- [ ] Wrap slow components in `<Suspense>` boundaries
- [ ] Create skeleton loading components
- [ ] Implement parallel data fetching with multiple Suspense boundaries
- [ ] Build dashboard with streaming analytics
- [ ] Add streaming for comments section
- [ ] Test progressive rendering in browser
- [ ] Verify Core Web Vitals improvement
- [ ] Push code to GitHub

