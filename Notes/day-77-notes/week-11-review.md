# 📘 Week 11 Review: Server Actions, Middleware, Caching & Advanced Patterns

## 🎯 Week 11 Overview

This week covered production-ready Next.js patterns including Server Actions for data mutations, Middleware for request interception, Streaming for performance, Parallel/Intercepting Routes for complex UIs, Caching strategies, and Advanced code organization patterns.

---

## 📁 Day 71: Server Actions

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Server Action** | Function that runs on server, callable from client |
| **'use server'** | Directive marking server-only code |
| **action prop** | Form attribute that submits to Server Action |
| **Progressive Enhancement** | Works without JavaScript |

### Key APIs

```tsx
// useFormStatus - Access form submission state
const { pending, data, method } = useFormStatus()

// useActionState - Form state management
const [state, formAction, isPending] = useActionState(action, initialState)

// revalidatePath - Clear cache by path
revalidatePath('/blog')

// revalidateTag - Clear cache by tag
revalidateTag('posts')
```

### Server Action Pattern

```tsx
'use server'

export async function createComment(prevState: any, formData: FormData) {
  const content = formData.get('content')
  await db.comment.create({ data: { content } })
  revalidatePath('/')
  return { success: true }
}
```

---

## 🛡️ Day 72: Middleware

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Middleware** | Code that runs before request completes |
| **Edge Runtime** | Runs on Vercel Edge Network |
| **Matcher** | Configures which routes trigger middleware |

### Key APIs

```ts
// NextRequest properties
request.nextUrl.pathname
request.cookies.get('name')
request.headers.get('name')
request.geo?.country

// NextResponse methods
NextResponse.next()        // Continue
NextResponse.redirect(url) // Redirect
NextResponse.rewrite(url)  // Rewrite (keep URL)
NextResponse.json(data)    // Return JSON
```

### Middleware Pattern

```ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
```

---

## 🌊 Day 73: Streaming & Suspense

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Streaming** | Send HTML in chunks as data loads |
| **Suspense** | Show fallback while content loads |
| **loading.tsx** | Automatic Suspense boundary |

### Streaming Patterns

```tsx
// Single component
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>

// Parallel loading
<div>
  <Suspense fallback={<SkeletonA />}>
    <ComponentA />
  </Suspense>
  <Suspense fallback={<SkeletonB />}>
    <ComponentB />
  </Suspense>
</div>

// Sequential (avoid)
<Suspense fallback={<Skeleton />}>
  <ComponentA />
  <ComponentB /> {/* Waits for A */}
</Suspense>
```

---

## 🎯 Day 74: Parallel & Intercepting Routes

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Parallel Routes** | Multiple pages same layout (`@folder`) |
| **default.tsx** | Fallback for unmatched slots |
| **Intercepting Routes** | Load route in different context |

### Interception Conventions

| Pattern | Matches |
|---------|---------|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | Root level |

### Modal Pattern

```
app/
├── layout.tsx              # Renders {children} and {modal}
├── @modal/
│   ├── default.tsx         # Returns null
│   └── (.)photos/[id]/
│       └── page.tsx        # Modal content
└── photos/
    └── [id]/
        └── page.tsx        # Full page
```

---

## 💾 Day 75: Caching Deep Dive

### Four Cache Layers

| Layer | Location | Duration | Config |
|-------|----------|----------|--------|
| Request Memoization | Server | Single render | Automatic |
| Data Cache | Server | Persistent | `cache`, `revalidate` |
| Full Route Cache | Server | Build/revalidate | Data cache config |
| Router Cache | Client | Session | `prefetch` |

### Fetch Options

```ts
// SSG - Build time only
fetch(url, { cache: 'force-cache' })

// SSR - Fresh each request
fetch(url, { cache: 'no-store' })

// ISR - Static + periodic updates
fetch(url, { next: { revalidate: 60 } })
```

### Manual Revalidation

```ts
import { revalidatePath, revalidateTag } from 'next/cache'

revalidatePath('/blog')           // Clear specific path
revalidatePath('/blog', 'layout') // Clear all under layout
revalidateTag('posts')            // Clear by tag
```

---

## 🏭 Day 76: Advanced Patterns

### Code Organization

| Pattern | Syntax | Purpose |
|---------|--------|---------|
| Private folder | `_folder` | Not routable, code organization |
| Route group | `(folder)` | Organize without URL impact |

### Error Handling

| File | Purpose |
|------|---------|
| `error.tsx` | Segment error boundary |
| `global-error.tsx` | Root error boundary |
| `not-found.tsx` | 404 page |
| `loading.tsx` | Suspense fallback |

### Dynamic Imports

```ts
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false,  // Client-only
  }
)
```

---

## 📊 Quick Reference Cards

### Server Actions
```ts
'use server'
export async function action(formData: FormData) { ... }
<form action={action}>
```

### Middleware
```ts
export function middleware(req: NextRequest) { ... }
export const config = { matcher: ['/path'] }
```

### Suspense
```ts
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

### Parallel Routes
```ts
export default function Layout({ children, slot }: { children: React.ReactNode; slot: React.ReactNode }) { ... }
```

### Intercepting Routes
```ts
// app/@modal/(.)photos/[id]/page.tsx
// Intercepts /photos/123 when on /photos
```

### Caching
```ts
fetch(url, { cache: 'force-cache' })  // SSG
fetch(url, { cache: 'no-store' })     // SSR
fetch(url, { next: { revalidate: 60 } }) // ISR
```

### Error Handling
```ts
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) { ... }
```

---

## 🎯 Common Interview Questions

| Question | Answer |
|----------|--------|
| What is the difference between Server Action and API route? | Server Actions are called directly, API routes are HTTP endpoints |
| When does middleware run? | Before pages, API routes, and static files |
| What is the purpose of `loading.tsx`? | Automatic Suspense boundary for streaming |
| How do you create a modal that preserves background? | Parallel routes + intercepting routes |
| What is the difference between `force-cache`, `no-store`, and `revalidate`? | Build-time only, fresh each request, static + periodic updates |
| Why use `_folder` naming? | Prevents accidental routes |
| What does `revalidatePath` do? | Clears Data Cache and Full Route Cache for a path |



