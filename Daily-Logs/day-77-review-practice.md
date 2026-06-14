# 📅 Day 77: Review & Practice

**Date:** June 14, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Week 11 Consolidation, Server Actions, Middleware, Suspense, Parallel Routes, Caching, Advanced Patterns

---

## 📋 Learning Objectives

- ✅ Review all code from Days 71-76
- ✅ Complete 5 challenges without looking at notes
- ✅ Identify and fix weak areas
- ✅ Build a small project applying all concepts

---

## 🎯 Part 1: Week 11 Concepts Summary

### Day 71: Server Actions

| Concept | Key Points |
|---------|-----------|
| **'use server'** | Marks functions to run on server only |
| **action prop** | Form submits directly to Server Action |
| **useFormStatus** | Access form submission status (pending) |
| **useActionState** | Manage form state and errors |
| **revalidatePath** | Clear cached data after mutation |
| **revalidateTag** | Clear cached data by tag |
| **redirect** | Navigate after successful action |

```tsx
// Quick reference
'use server'
export async function createComment(prevState: any, formData: FormData) {
  const content = formData.get('content')
  await db.comment.create({ data: { content } })
  revalidatePath('/')
  return { success: true, error: null }
}
```

### Day 72: Middleware

| Concept | Key Points |
|---------|-----------|
| **middleware.ts** | Runs before requests complete |
| **matcher** | Define which routes trigger middleware |
| **NextRequest** | Request object with cookies, headers, geolocation |
| **NextResponse** | next(), redirect(), rewrite(), json() |
| **Auth middleware** | Check cookies, redirect unauthenticated users |

```tsx
// Quick reference
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}
```

### Day 73: Streaming & Suspense

| Concept | Key Points |
|---------|-----------|
| **Streaming** | Send HTML in chunks as data loads |
| **Suspense** | Show fallback while content loads |
| **loading.tsx** | Automatic Suspense boundary for page |
| **Parallel fetching** | Multiple Suspense boundaries |

```tsx
// Quick reference
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

### Day 74: Parallel & Intercepting Routes

| Concept | Key Points |
|---------|-----------|
| **Parallel routes** | Multiple pages same layout (`@folder`) |
| **default.tsx** | Fallback for unmatched slots |
| **Intercepting routes** | `(.)` same level, `(..)` one up, `(...)` root |
| **Modal pattern** | Parallel + intercepting for modals |

```tsx
// Quick reference
// app/@modal/(.)photos/[id]/page.tsx - Intercepts /photos/123
```

### Day 75: Caching

| Concept | Key Points |
|---------|-----------|
| **Data Cache** | `force-cache` (SSG), `no-store` (SSR), `revalidate` (ISR) |
| **Full Route Cache** | Rendered HTML cache |
| **Router Cache** | Client-side page cache |
| **revalidatePath** | Manual cache invalidation |
| **revalidateTag** | Tag-based invalidation |

```tsx
// Quick reference
fetch(url, { cache: 'force-cache' })  // SSG
fetch(url, { cache: 'no-store' })     // SSR
fetch(url, { next: { revalidate: 60 } }) // ISR
```

### Day 76: Advanced Patterns

| Concept | Key Points |
|---------|-----------|
| **Private folders** | `_folder` - not routable |
| **Route groups** | `(folder)` - doesn't affect URL |
| **error.tsx** | Segment error boundary |
| **global-error.tsx** | Root error boundary |
| **not-found.tsx** | 404 page |
| **next/dynamic** | Code splitting |

```tsx
// Quick reference
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

---

## 📝 Part 2: Practice Challenges

### Challenge #1: Server Action for Profile Update

**Task:** Create a Server Action that updates user profile and revalidates the page.

```tsx
// app/profile/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

export async function updateProfile(prevState: any, formData: FormData) {
  const validated = profileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    }
  }

  // Update database
  await db.user.update({
    where: { id: session.user.id },
    data: validated.data,
  })

  revalidatePath('/profile')
  redirect('/profile?success=true')
}
```

### Challenge #2: Middleware with IP Blocking

**Task:** Write middleware that blocks access to `/admin` except for specific IP addresses.

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_IPS = ['192.168.1.100', '203.0.113.50']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/admin')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!ALLOWED_IPS.includes(ip)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### Challenge #3: Suspense with 3-Second Delay

**Task:** Add Suspense to a component that fetches data after 3 seconds.

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { SlowAnalytics } from './_components/SlowAnalytics'
import { SkeletonChart } from './_components/SkeletonChart'

async function SlowAnalytics() {
  // Simulate 3 second delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  const data = await fetchAnalytics()
  return <AnalyticsChart data={data} />
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Header />  {/* Renders immediately */}
      
      <Suspense fallback={<SkeletonChart />}>
        <SlowAnalytics />  {/* Shows skeleton for 3 seconds */}
      </Suspense>
    </div>
  )
}
```

### Challenge #4: Modal with Parallel + Intercepting Routes

**Task:** Create a modal using parallel and intercepting routes for a login form.

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}
```

```tsx
// app/@modal/default.tsx
export default function ModalDefault() {
  return null
}
```

```tsx
// app/@modal/(.)login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/LoginForm'

export default function InterceptedLoginModal() {
  const router = useRouter()
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="float-right text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <LoginForm />
      </div>
    </div>
  )
}
```

```tsx
// app/login/page.tsx
import { LoginForm } from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginForm />
    </div>
  )
}
```

### Challenge #5: Caching Strategies

**Task:** Configure different caching strategies:
- Blog posts: ISR (60 seconds)
- Dashboard: no-cache (SSR)
- About page: SSG (force-cache)

```tsx
// app/blog/page.tsx - ISR (60 seconds)
export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 },  // ISR
  })
  const data = await posts.json()
  return <BlogList posts={data} />
}
```

```tsx
// app/dashboard/page.tsx - SSR (no-store)
export default async function DashboardPage() {
  const stats = await fetch('https://api.example.com/stats', {
    cache: 'no-store',  // SSR - fresh each request
  })
  const data = await stats.json()
  return <Dashboard stats={data} />
}
```

```tsx
// app/about/page.tsx - SSG (force-cache)
export default async function AboutPage() {
  const content = await fetch('https://api.example.com/about', {
    cache: 'force-cache',  // SSG - build time only
  })
  const data = await content.json()
  return <AboutContent content={data} />
}
```

---

## 🏗️ Part 3: Complete Review Project

### Project: Challenge Dashboard

A single application that demonstrates all Week 11 concepts.

```tsx
// app/page.tsx - Home page with caching demo
import Link from 'next/link'
import { Suspense } from 'react'
import { TimestampDisplay } from '@/components/TimestampDisplay'

export default async function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Week 11 Review Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Challenge Cards */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Challenge #1</h2>
          <p className="text-gray-600 mb-4">Server Action - Update Profile</p>
          <Link href="/profile" className="text-blue-600 hover:underline">
            Go to Profile →
          </Link>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Challenge #2</h2>
          <p className="text-gray-600 mb-4">Middleware - IP Blocking</p>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Go to Admin →
          </Link>
          <p className="text-sm text-gray-500 mt-2">Only specific IPs allowed</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Challenge #3</h2>
          <p className="text-gray-600 mb-4">Suspense - 3 Second Delay</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Go to Dashboard →
          </Link>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Challenge #4</h2>
          <p className="text-gray-600 mb-4">Modal - Intercepting Routes</p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Open Login Modal →
          </Link>
          <p className="text-sm text-gray-500 mt-2">Try clicking from / page</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Challenge #5</h2>
          <p className="text-gray-600 mb-4">Caching Strategies</p>
          <div className="space-y-2">
            <Link href="/blog" className="text-blue-600 hover:underline block">
              Blog (ISR - 60s) →
            </Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline block">
              Dashboard (SSR - no-store) →
            </Link>
            <Link href="/about" className="text-blue-600 hover:underline block">
              About (SSG - force-cache) →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <TimestampDisplay />
      </div>
    </div>
  )
}
```

---

## 📊 Self-Assessment Checklist

| Concept | Understand? | Can implement? |
|---------|-------------|----------------|
| Server Actions | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| useFormStatus | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| useActionState | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| revalidatePath / revalidateTag | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Middleware | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| matcher configuration | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Suspense & Streaming | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| loading.tsx | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Parallel Routes | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Intercepting Routes | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Modal pattern | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Data Cache (force-cache, no-store, revalidate) | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Private folders (`_`) | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| Route groups (`(folder)`) | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| error.tsx | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| not-found.tsx | ☐ Yes / ☐ No | ☐ Yes / ☐ No |
| next/dynamic | ☐ Yes / ☐ No | ☐ Yes / ☐ No |

---

## 🎯 Part 4: Weak Areas Action Plan

For each concept you marked "No", complete the following:

1. **Re-read the daily log** for that day
2. **Build a small standalone example** (5-10 minutes)
3. **Explain the concept to an imaginary person**
4. **Complete one additional practice problem**

### Recommended Practice Problems

| Weak Area | Practice Problem |
|-----------|------------------|
| Server Actions | Build a comment system with delete functionality |
| Middleware | Add logging middleware for all API requests |
| Suspense | Create a page with 3 parallel loading components |
| Parallel Routes | Build a dashboard with sidebar + main content + analytics |
| Intercepting Routes | Create an image gallery with modal |
| Caching | Build a weather widget with 30s revalidation |
| Dynamic Imports | Lazy load a heavy chart component |

---

## 📝 Reflection Questions

Answer these after completing the challenges:

1. Which concept was most difficult to understand? Why?
2. Which challenge took the longest? What made it challenging?
3. What pattern will you use most often in real projects?
4. What is still unclear about caching?
5. How confident are you building a production Next.js app (1-10)?

---

## ✅ Day 77 Checklist

- [ ] Review Day 71-76 daily logs and notes
- [ ] Complete Challenge #1 (Server Action)
- [ ] Complete Challenge #2 (Middleware with IP blocking)
- [ ] Complete Challenge #3 (Suspense with 3s delay)
- [ ] Complete Challenge #4 (Modal with intercepting routes)
- [ ] Complete Challenge #5 (Caching strategies)
- [ ] Identify weak areas from self-assessment
- [ ] Build small practice examples for weak areas
- [ ] Complete reflection questions
- [ ] Build final review project
- [ ] Push all code to GitHub
