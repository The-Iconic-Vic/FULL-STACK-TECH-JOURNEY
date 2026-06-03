# 📅 Day 66: Server & Client Components

**Date:** June 3, 2026  
**Author:** Victor Innocent (@Iconic_Vic)
**Phase:** Phase 3 - Advanced & Specialization
**Topics:** Server Components, Client Components, Component Composition, Hybrid Rendering

---

## 📋 Learning Objectives

- ✅ Understand that all components are Server Components by default
- ✅ Learn when to use `'use client'` directive
- ✅ Understand limitations and benefits of Server Components
- ✅ Master component composition patterns (moving interactive parts down)
- ✅ Pass server data to client components as props
- ✅ Build a hybrid dashboard with both server and client components

---

## 🎯 Part 1: Server Components (Default)

### What are Server Components?

Server Components are the **default** in Next.js App Router. They run **exclusively on the server** and never in the browser.

```tsx
// This is a Server Component (no 'use client' needed)
export default async function ServerComponent() {
  // This code runs ONLY on the server
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <div>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  )
}
```

### Benefits of Server Components

| Benefit | Explanation |
|---------|-------------|
| **Smaller Bundle Size** | Server code never sent to client |
| **Direct Data Access** | Can query database directly |
| **Improved Security** | Sensitive logic stays on server |
| **Better Performance** | No client-side data fetching waterfalls |
| **SEO Friendly** | Full HTML sent to browser |
| **Automatic Caching** | Built-in caching mechanisms |

### Limitations of Server Components

```tsx
// ❌ These CANNOT be used in Server Components
import { useState, useEffect, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// ❌ Cannot use browser APIs
localStorage.getItem('key')
window.innerWidth
document.querySelector('.element')

// ❌ Cannot add event handlers
<button onClick={() => console.log('clicked')}>Click</button>

// ❌ Cannot use hooks that require state
const [count, setCount] = useState(0)
useEffect(() => {}, [])
```

---

## 🎨 Part 2: Client Components

### The `'use client'` Directive

Add `'use client'` at the **very top** of a file to mark it as a Client Component.

```tsx
// app/components/Counter.tsx
'use client'  // MUST be the first line

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### When to Use Client Components

| Use Case | Example |
|----------|---------|
| **Interactive UI** | Buttons, forms, dropdowns |
| **React Hooks** | useState, useEffect, useContext |
| **Browser APIs** | localStorage, geolocation, window |
| **Event Handlers** | onClick, onChange, onScroll |
| **Custom Hooks** | That use client-only features |
| **Context Providers** | Theme, Auth providers |

### Performance Implications

```tsx
// ❌ BAD - Entire page becomes client component
'use client'
export default function EntirePage() {
  // All code now sent to client
  // Larger bundle size
}

// ✅ GOOD - Only interactive parts are client
import ClientButton from './ClientButton'

export default function Page() {
  // Server component
  const data = await getData()
  
  return (
    <div>
      <div>{data.content}</div>  {/* Server rendered */}
      <ClientButton />            {/* Only this part is client */}
    </div>
  )
}
```

---

## 🧩 Part 3: Component Composition Pattern

### The Golden Rule

> **Move interactivity DOWN the component tree, not UP.**

Keep most components on the server, and wrap only the interactive parts in Client Components.

```tsx
// app/page.tsx (Server Component)
import ClientSearchBar from './components/ClientSearchBar'
import ServerProductList from './components/ServerProductList'

export default async function Page() {
  const products = await fetchProducts()
  
  return (
    <div>
      <h1>Products</h1>
      {/* Client component - handles search input */}
      <ClientSearchBar />
      {/* Server component - renders products */}
      <ServerProductList products={products} />
    </div>
  )
}
```

### Passing Server Data to Client Components

```tsx
// app/page.tsx (Server Component)
import ClientDashboard from './components/ClientDashboard'

export default async function Page() {
  // Data fetched on server
  const userData = await getUserData()
  const analyticsData = await getAnalytics()
  
  // Pass as props to client component
  return <ClientDashboard user={userData} analytics={analyticsData} />
}
```

```tsx
// components/ClientDashboard.tsx
'use client'

interface DashboardProps {
  user: User
  analytics: Analytics
}

export default function ClientDashboard({ user, analytics }: DashboardProps) {
  const [filter, setFilter] = useState('all')
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={() => setFilter('week')}>This Week</button>
      <Chart data={analytics} filter={filter} />
    </div>
  )
}
```

### Avoiding Hydration Mismatches

```tsx
// ❌ BAD - Different content on server vs client
'use client'
export default function Component() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return <div>{isClient ? 'Client' : 'Server'}</div>
}

// ✅ GOOD - Match server and client
'use client'
export default function Component() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) return null  // Don't render until client ready
  return <div>Client Only Content</div>
}
```

---

## 🏗️ Part 4: Hybrid Dashboard Implementation

### Server Component - Product List

```tsx
// components/ServerProductList.tsx
import { Product } from '@/types'

interface ProductListProps {
  products: Product[]
  category?: string
}

export default async function ServerProductList({ products, category }: ProductListProps) {
  // This filtering happens on the server
  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map(product => (
        <div key={product.id} className="border rounded-lg p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      ))}
    </div>
  )
}
```

### Client Component - Filter Bar

```tsx
// components/ClientFilterBar.tsx
'use client'

import { useState } from 'react'

interface FilterBarProps {
  categories: string[]
  onFilterChange: (category: string) => void
}

export default function ClientFilterBar({ categories, onFilterChange }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const handleFilterClick = (category: string) => {
    setActiveCategory(category)
    onFilterChange(category === 'all' ? '' : category)
  }

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => handleFilterClick('all')}
        className={`px-4 py-2 rounded-lg ${
          activeCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleFilterClick(category)}
          className={`px-4 py-2 rounded-lg ${
            activeCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
```

### Client Component - Interactive Chart

```tsx
// components/ClientInteractiveChart.tsx
'use client'

import { useState } from 'react'

interface ChartData {
  month: string
  sales: number
  revenue: number
}

interface ChartProps {
  data: ChartData[]
}

export default function ClientInteractiveChart({ data }: ChartProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)
  const [metric, setMetric] = useState<'sales' | 'revenue'>('sales')

  const maxValue = Math.max(...data.map(d => d[metric]))

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMetric('sales')}
            className={`px-3 py-1 rounded ${metric === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Sales
          </button>
          <button
            onClick={() => setMetric('revenue')}
            className={`px-3 py-1 rounded ${metric === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Revenue
          </button>
        </div>
      </div>

      <div className="flex items-end gap-4 h-64">
        {data.map(item => (
          <div key={item.month} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer"
              style={{ height: `${(item[metric] / maxValue) * 200}px` }}
              onMouseEnter={() => setHoveredBar(item.month)}
              onMouseLeave={() -> setHoveredBar(null)}
            />
            <span className="text-sm mt-2">{item.month}</span>
            {hoveredBar === item.month && (
              <span className="text-xs text-gray-600 mt-1">
                {metric === 'sales' ? `${item.sales} units` : `$${item.revenue}`}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Main Dashboard Page (Server Component)

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import ServerStatsCard from '@/components/ServerStatsCard'
import ServerProductList from '@/components/ServerProductList'
import ClientFilterBar from '@/components/ClientFilterBar'
import ClientInteractiveChart from '@/components/ClientInteractiveChart'
import ClientSearchInput from '@/components/ClientSearchInput'
import { getProducts, getCategories, getAnalytics, getStats } from '@/lib/data'

export default async function DashboardPage() {
  // All data fetching happens on the server
  const products = await getProducts()
  const categories = await getCategories()
  const analyticsData = await getAnalytics()
  const stats = await getStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards - Server Component, no interactivity needed */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <ServerStatsCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Chart - Client Component (needs hover interactions) */}
      <div className="mb-8">
        <ClientInteractiveChart data={analyticsData} />
      </div>

      {/* Search Input - Client Component (needs useState) */}
      <div className="mb-4">
        <ClientSearchInput placeholder="Search products..." />
      </div>

      {/* Filter Bar - Client Component (needs useState for active filter) */}
      <ClientFilterBar 
        categories={categories} 
        onFilterChange={(category) => {
          // This callback runs on client
          console.log('Filter changed to:', category)
        }} 
      />

      {/* Product List - Server Component, no interactivity needed */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ServerProductList products={products} />
      </Suspense>
    </div>
  )
}
```

### Data Fetching Library

```ts
// lib/data.ts
import { Product, Stat, AnalyticsData } from '@/types'

// Simulate database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getProducts(): Promise<Product[]> {
  await delay(500) // Simulate network delay
  
  return [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
    { id: 2, name: 'Headphones', price: 199, category: 'Audio', inStock: true },
    { id: 3, name: 'Keyboard', price: 89, category: 'Accessories', inStock: false },
    { id: 4, name: 'Monitor', price: 299, category: 'Electronics', inStock: true },
    { id: 5, name: 'Mouse', price: 49, category: 'Accessories', inStock: true },
  ]
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts()
  return [...new Set(products.map(p => p.category))]
}

export async function getAnalytics(): Promise<AnalyticsData[]> {
  await delay(300)
  
  return [
    { month: 'Jan', sales: 120, revenue: 12000 },
    { month: 'Feb', sales: 150, revenue: 15000 },
    { month: 'Mar', sales: 180, revenue: 18000 },
    { month: 'Apr', sales: 220, revenue: 22000 },
    { month: 'May', sales: 250, revenue: 25000 },
    { month: 'Jun', sales: 280, revenue: 28000 },
  ]
}

export async function getStats(): Promise<Stat[]> {
  const products = await getProducts()
  const analytics = await getAnalytics()
  
  return [
    { label: 'Total Products', value: products.length, change: '+5', color: 'blue' },
    { label: 'Total Sales', value: analytics.reduce((sum, m) => sum + m.sales, 0), change: '+23%', color: 'green' },
    { label: 'Revenue', value: `$${analytics.reduce((sum, m) => sum + m.revenue, 0)}`, change: '+18%', color: 'purple' },
    { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, change: '0', color: 'orange' },
  ]
}
```

---

## 📊 Quick Reference

| Aspect | Server Component | Client Component |
|--------|-----------------|------------------|
| **Directive** | None (default) | `'use client'` |
| **Runs on** | Server only | Server + Client (hydrates) |
| **Can use useState** | ❌ No | ✅ Yes |
| **Can use useEffect** | ❌ No | ✅ Yes |
| **Can use browser APIs** | ❌ No | ✅ Yes |
| **Can add event handlers** | ❌ No | ✅ Yes |
| **Can fetch data directly** | ✅ Yes (async/await) | ❌ No (needs useEffect) |
| **Bundle size impact** | None | Adds to client bundle |
| **SEO** | Excellent | Poor (needs fallback) |

### Decision Tree

```
Do you need interactivity? (useState, onClick, etc.)
    │
    ├── NO → Use Server Component (default)
    │
    └── YES → Use Client Component ('use client')
                │
                ├── Can this be moved to a child component?
                │   ├── YES → Keep parent as Server
                │   └── NO → Mark as Client
                │
                └── Is it a provider (Theme, Auth)?
                        │
                        └── YES → Client Component at root
```

---

## 🐛 Common Pitfalls & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| `useState` not working | Server Component | Add `'use client'` |
| Hydration mismatch | Different server/client output | Use useEffect to defer client-only code |
| Large bundle size | Too many client components | Move interactivity down, keep server |
| Loading states complex | Server async components | Use Suspense boundary |
| Event handler not working | Server Component | Wrap interactive part in Client Component |

---

## ✅ Day 66 Checklist

- [ ] Understand Server Components are default
- [ ] Learn when to add `'use client'` directive
- [ ] Identify limitations of Server Components
- [ ] Build a Server Component that fetches data
- [ ] Build a Client Component with useState
- [ ] Pass server data as props to client components
- [ ] Implement component composition pattern
- [ ] Build a hybrid dashboard with both component types
- [ ] Understand performance implications of each
- [ ] Test dashboard functionality
- [ ] Push code to GitHub
