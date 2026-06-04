# 📅 Day 67: Data Fetching - SSR, SSG, ISR

**Date:** June 4, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), Dynamic Static Generation

---

## 📋 Learning Objectives

- ✅ Understand three rendering strategies: SSR, SSG, ISR
- ✅ Configure fetch caching behavior with `cache` and `next` options
- ✅ Use `generateStaticParams` for dynamic SSG
- ✅ Know when to use each strategy for optimal performance
- ✅ Build a blog with multiple rendering patterns

---

## 🎯 Part 1: Server-Side Rendering (SSR)

### What is SSR?

SSR renders the page **dynamically on each request**. The server fetches fresh data and generates HTML for every visitor.

```tsx
// app/ssr-demo/page.tsx
export default async function SSRPage() {
  // Option 1: cache: 'no-store' - never cache, always fresh
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  })
  
  // Option 2: next: { revalidate: 0 } - same as no-store
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 0 },
  })
  
  const data = await res.json()
  return <div>{data}</div>
}
```

### Fetch Configuration for SSR

| Method | Syntax | Effect |
|--------|--------|--------|
| **cache: 'no-store'** | `fetch(url, { cache: 'no-store' })` | Never cache, fresh each request |
| **revalidate: 0** | `fetch(url, { next: { revalidate: 0 } })` | Same as no-store |

### When to Use SSR

| Use Case | Why SSR? |
|----------|----------|
| **User-specific content** | Dashboard, profile, user settings |
| **Real-time data** | Stock prices, live scores, analytics |
| **Personalized pages** | Shopping cart, recommendations |
| **Authenticated content** | Account pages, order history |
| **Frequently changing data** | Comments, social feeds |

```tsx
// Example: User Dashboard (SSR)
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Always fetch fresh user data
  const user = await getCurrentUser()
  const orders = await fetchOrders(user.id, { cache: 'no-store' })
  const recommendations = await getRecommendations(user.id, { cache: 'no-store' })
  
  return (
    <div>
      <h1>Welcome back, {user.name}</h1>
      <OrderList orders={orders} />
      <Recommendations items={recommendations} />
    </div>
  )
}
```

---

## 📦 Part 2: Static Site Generation (SSG)

### What is SSG?

SSG pre-renders pages **at build time**. The HTML is generated once when you run `npm run build` and served as static files.

```tsx
// app/ssg-demo/page.tsx
export default async function SSGPage() {
  // Option 1: cache: 'force-cache' (default) - fetch at build time
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache',
  })
  
  // Option 2: no config - same as force-cache
  const res = await fetch('https://api.example.com/data')
  
  const data = await res.json()
  return <div>{data}</div>
}
```

### Fetch Configuration for SSG

| Method | Syntax | Effect |
|--------|--------|--------|
| **No config (default)** | `fetch(url)` | Cache at build time |
| **cache: 'force-cache'** | `fetch(url, { cache: 'force-cache' })` | Explicit SSG behavior |

### Dynamic SSG with generateStaticParams

For dynamic routes like `/posts/[id]`, `generateStaticParams` tells Next.js which pages to pre-render.

```tsx
// app/posts/[id]/page.tsx
// Step 1: Generate all possible post IDs at build time
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  
  // Return array of params for each page to pre-render
  return posts.map((post: any) => ({
    id: post.id.toString(),
  }))
}

// Step 2: Fetch data for each post at build time
export default async function PostPage({ params }: { params: { id: string } }) {
  // This runs for each ID from generateStaticParams
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}
```

### When to Use SSG

| Use Case | Why SSG? |
|----------|----------|
| **Blog posts** | Content doesn't change frequently |
| **Documentation** | Static, versioned content |
| **Marketing pages** | Landing pages, about us |
| **Product catalogs** | Non-inventory product pages |
| **Portfolio** | Showcase projects |

```tsx
// Example: Blog Homepage (SSG)
// app/blog/page.tsx
export default async function BlogPage() {
  // Fetched once at build time
  const posts = await getAllPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

---

## ⚡ Part 3: Incremental Static Regeneration (ISR)

### What is ISR?

ISR combines SSG and SSR: pages are static but **revalidate periodically** in the background. The first request after the revalidation time triggers a regeneration.

```tsx
// app/isr-demo/page.tsx
export default async function ISRPage() {
  // Revalidate every 60 seconds
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },  // 60 seconds = 1 minute
  })
  
  const data = await res.json()
  return <div>{data}</div>
}
```

### How ISR Works

```
1. User requests page → Server serves cached static page
2. If cache is older than revalidate time → Server regenerates in background
3. Subsequent requests get fresh page
4. Page stays static until next revalidation
```

### Revalidation Time Examples

```tsx
// Revalidate every hour
next: { revalidate: 3600 }

// Revalidate every day
next: { revalidate: 86400 }

// Revalidate every week
next: { revalidate: 604800 }
```

### When to Use ISR

| Use Case | Revalidate Time | Why ISR? |
|----------|-----------------|----------|
| **E-commerce products** | 60-300 seconds | Price/stock changes, mostly static |
| **News articles** | 60 seconds | Content updates frequently |
| **Weather forecasts** | 300-600 seconds | Regular updates, not real-time |
| **Leaderboards** | 30-60 seconds | Fast + eventually consistent |
| **Social media feeds** | 10-30 seconds | Nearly real-time without server load |

```tsx
// Example: Product Listing with ISR
// app/products/page.tsx
export default async function ProductsPage() {
  // Revalidate every 5 minutes
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 300 },  // 5 minutes
  })
  const products = await res.json()
  
  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

---

## 📊 Part 4: Comparison & Decision Guide

### Strategy Comparison Table

| Aspect | SSR | SSG | ISR |
|--------|-----|-----|-----|
| **When it renders** | Each request | Build time | Build time + periodic |
| **Data freshness** | Always fresh | Stale after build | Stale until revalidate |
| **Server load** | High | Very low (CDN) | Low (CDN + regeneration) |
| **First byte time** | Slower | Fastest | Fast |
| **SEO** | Good | Excellent | Excellent |
| **Build time** | N/A | Long for many pages | Long for many pages |

### Decision Flowchart

```
                     ┌─────────────────┐
                     │   What data are  │
                     │   you fetching?   │
                     └────────┬────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │User-     │   │Public,   │   │Public,   │
        │specific  │   │static    │   │changing  │
        └────┬─────┘   └────┬─────┘   └────┬─────┘
             │              │              │
             ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │   SSR    │   │   SSG    │   │   ISR    │
        │no-store  │   │force-cache│   │revalidate│
        └──────────┘   └──────────┘   └──────────┘
```

### Code Snippet Comparison

```tsx
// SSR - Fresh every request
export default async function SSRPage() {
  const data = await fetch(url, { cache: 'no-store' })
  return <div>{data}</div>
}

// SSG - Build time only
export default async function SSGPage() {
  const data = await fetch(url, { cache: 'force-cache' })
  return <div>{data}</div>
}

// ISR - Static + revalidate every 60 seconds
export default async function ISRPage() {
  const data = await fetch(url, { next: { revalidate: 60 } })
  return <div>{data}</div>
}
```

---

## 🏗️ Part 5: Complete Blog Implementation

### Types

```ts
// types/index.ts
export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
```

### Data Fetching Library

```ts
// lib/posts.ts
import { Post, Comment } from '@/types'

const API_URL = 'https://jsonplaceholder.typicode.com'

export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`, {
    cache: 'force-cache',  // SSG - build time only
  })
  return res.json()
}

export async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    cache: 'force-cache',  // SSG for individual posts
  })
  return res.json()
}

export async function getDashboardStats(): Promise<{ total: number; today: number }> {
  const res = await fetch(`${API_URL}/posts`, {
    cache: 'no-store',  // SSR - fresh each request
  })
  const posts = await res.json()
  
  return {
    total: posts.length,
    today: Math.floor(Math.random() * 100),  // Simulated real-time data
  }
}
```

### Home Page (SSG)

```tsx
// app/page.tsx
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import RenderStrategyBadge from '@/components/RenderStrategyBadge'

export default async function HomePage() {
  const posts = await getAllPosts()
  const limitedPosts = posts.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <RenderStrategyBadge strategy="SSG" />
      </div>
      
      <p className="text-gray-600 mb-8">
        This page uses Static Site Generation (SSG). Content is fetched once at build time.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/posts" className="btn-primary">
          View All Posts
        </Link>
      </div>
    </div>
  )
}
```

### All Posts Page (SSG with generateStaticParams)

```tsx
// app/posts/page.tsx
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import RenderStrategyBadge from '@/components/RenderStrategyBadge'

export default async function AllPostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <RenderStrategyBadge strategy="SSG" />
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{post.body.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Single Post (Dynamic SSG)

```tsx
// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getAllPosts, getPostById } from '@/lib/posts'
import CommentSection from '@/components/CommentSection'
import RenderStrategyBadge from '@/components/RenderStrategyBadge'

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

// Dynamic SSG page
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <RenderStrategyBadge strategy="Dynamic SSG" />
      </div>
      
      <div className="prose prose-lg mb-8">
        <p>{post.body}</p>
      </div>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <CommentSection postId={post.id} />
      </div>
    </div>
  )
}
```

### Dashboard (SSR)

```tsx
// app/dashboard/page.tsx
import { getDashboardStats } from '@/lib/posts'
import DashboardStats from '@/components/DashboardStats'
import RenderStrategyBadge from '@/components/RenderStrategyBadge'

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <RenderStrategyBadge strategy="SSR (Fresh each request)" />
      </div>
      
      <p className="text-gray-600 mb-8">
        This page uses Server-Side Rendering (SSR). Data is fetched fresh on every request.
      </p>
      
      <DashboardStats stats={stats} />
    </div>
  )
}
```

### ISR Demo Page

```tsx
// app/isr-demo/page.tsx
import RenderStrategyBadge from '@/components/RenderStrategyBadge'

async function getTime() {
  const res = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
    next: { revalidate: 60 },  // ISR: revalidate every 60 seconds
  })
  const data = await res.json()
  return data.datetime
}

export default async function ISRDemoPage() {
  const currentTime = await getTime()

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="flex justify-center items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">ISR Demo</h1>
        <RenderStrategyBadge strategy="ISR (Revalidates every 60s)" />
      </div>
      
      <div className="bg-gray-100 rounded-lg p-8 inline-block">
        <p className="text-gray-600 mb-2">Current Server Time (revalidated every 60 seconds):</p>
        <p className="text-2xl font-mono">{new Date(currentTime).toLocaleString()}</p>
      </div>
      
      <p className="text-gray-500 mt-8 text-sm">
        Refresh the page. The time will stay the same for 60 seconds, then update.
      </p>
    </div>
  )
}
```

### Comments Component (Client-side Fetching)

```tsx
// components/CommentSection.tsx
'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: number
  name: string
  email: string
  body: string
}

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data)
        setLoading(false)
      })
  }, [postId])

  if (loading) {
    return <div className="text-gray-500">Loading comments...</div>
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
          <p className="font-semibold">{comment.name}</p>
          <p className="text-sm text-gray-500">{comment.email}</p>
          <p className="mt-2">{comment.body}</p>
        </div>
      ))}
    </div>
  )
}
```

### API Route for Comments

```ts
// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postId = searchParams.get('postId')
  
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  )
  const comments = await res.json()
  
  return NextResponse.json(comments)
}
```

---

## 📊 Quick Reference

### Fetch Options Summary

| Strategy | Cache Option | Revalidate Option | Default |
|----------|--------------|-------------------|---------|
| **SSR** | `cache: 'no-store'` | `next: { revalidate: 0 }` | No |
| **SSG** | `cache: 'force-cache'` | (none) | Yes |
| **ISR** | (none) | `next: { revalidate: n }` | No |

### generateStaticParams Pattern

```tsx
// 1. Define dynamic route
// app/products/[category]/[id]/page.tsx

// 2. Generate all possible combinations
export async function generateStaticParams() {
  const categories = await getCategories()
  const products = await getProducts()
  
  return categories.flatMap(category =>
    products.map(product => ({
      category: category.slug,
      id: product.id.toString(),
    }))
  )
}
```

---

## 🐛 Common Pitfalls

| Issue | Cause | Solution |
|-------|-------|----------|
| Data not updating | Using SSG for dynamic data | Switch to SSR or ISR |
| Slow build time | Too many SSG pages | Use ISR or incremental |
| Stale data in ISR | Revalidation too long | Reduce revalidate time |
| Missing generateStaticParams | Dynamic SSG without params | Add generateStaticParams |
| fetch not working in Client | Client component | Move to Server or API route |

---

## ✅ Day 67 Checklist

- [ ] Understand SSR, SSG, and ISR differences
- [ ] Configure `cache: 'no-store'` for SSR
- [ ] Configure `cache: 'force-cache'` for SSG
- [ ] Configure `next: { revalidate }` for ISR
- [ ] Use `generateStaticParams` for dynamic SSG
- [ ] Build SSG blog homepage
- [ ] Build Dynamic SSG single post pages
- [ ] Build SSR dashboard
- [ ] Build ISR demo page
- [ ] Build client-side comments component
- [ ] Test each rendering strategy
- [ ] Push code to GitHub

