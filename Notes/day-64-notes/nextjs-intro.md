# 📘 Next.js Introduction & Setup

## 🎯 What is Next.js?

Next.js is a **React framework** (not a library) that provides production-ready features like server-side rendering, static site generation, file-based routing, and API routes out of the box.

```typescript
// React alone - just a library
// You need to add routing, build tools, etc.

// Next.js - full framework
// Everything is included and configured
npx create-next-app@latest my-app
```

---

## 🏗️ Next.js vs React vs Other Tools

### React (Library)
- Only handles UI rendering
- Needs React Router for routing
- No built-in data fetching
- No SEO optimization
- Needs Vite/CRA for building

### Create React App (Build Tool)
- Build tool for React apps
- Client-side rendering only
- No built-in routing
- Poor SEO
- Slower initial load

### Vite (Build Tool)
- Fast build tool for modern web apps
- Client-side rendering by default
- No built-in routing
- No SEO out of box
- Great for SPAs

### Next.js (Framework)
- Full React framework
- File-based routing
- SSR, SSG, ISR support
- API routes built-in
- Image optimization
- SEO friendly
- Built on top of React

---

## 📊 Rendering Patterns

### Client-Side Rendering (CSR)

```tsx
// How CSR works:
// 1. Browser receives almost empty HTML
// 2. Browser downloads JavaScript
// 3. JavaScript renders content

// Traditional React app (CRA, Vite)
function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{data?.content}</div> // Empty until JS loads
}
```

**Pros:**
- Fast subsequent navigation
- Reduced server load
- Great for dashboards

**Cons:**
- Poor SEO (empty HTML)
- Slower initial paint
- JavaScript required

### Server-Side Rendering (SSR)

```tsx
// How SSR works:
// 1. Server renders React components to HTML
// 2. Browser receives full HTML content
// 3. React hydrates (adds interactivity)

// Next.js SSR
// app/page.tsx
async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.content}</div> // Already has content!
}
```

**Pros:**
- Excellent SEO
- Fast initial paint
- Content visible before JavaScript loads

**Cons:**
- Higher server load
- Slower Time to First Byte (TTFB)
- More complex caching

### Static Site Generation (SSG)

```tsx
// How SSG works:
// 1. Pages are rendered at build time
// 2. Static HTML files are served
// 3. No server rendering needed

// Next.js SSG (default without dynamic data)
// app/page.tsx - automatically static if no dynamic functions
export default function Page() {
  return <div>This is pre-rendered at build time</div>
}
```

**Pros:**
- Super fast
- Can be served via CDN
- Lowest server load
- Great for blogs, docs

**Cons:**
- Not for dynamic data
- Longer build times for many pages

### Incremental Static Regeneration (ISR)

```tsx
// How ISR works:
// 1. Static generation + periodic revalidation

// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return <div>{post.content}</div>
}
```

---

## 📁 App Router vs Pages Router

### Pages Router (Older, stable)

```
pages/
├── index.tsx        → /
├── about.tsx        → /about
├── blog/
│   ├── index.tsx    → /blog
│   └── [slug].tsx   → /blog/post-1
└── api/
    └── hello.ts     → /api/hello
```

### App Router (New, recommended)

```
app/
├── page.tsx              → /
├── layout.tsx            → Root layout
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── layout.tsx        → Shared blog layout
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/post-1
├── api/
│   └── hello/
│       └── route.ts      → /api/hello
├── loading.tsx           → Loading UI
├── error.tsx             → Error UI
└── not-found.tsx         → 404 page
```

---

## 🔧 Installation & Setup

### Basic Installation

```bash
# Create new project
npx create-next-app@latest my-app --typescript --tailwind --app

# Move into project
cd my-app

# Run development server
npm run dev

# Open http://localhost:3000
```

### Installation Flags Explained

| Flag | Effect |
|------|--------|
| `--typescript` | Configures TypeScript |
| `--tailwind` | Sets up Tailwind CSS |
| `--app` | Uses App Router (vs Pages Router) |
| `--eslint` | Adds ESLint configuration |
| `--src-dir` | Puts app in `src/` folder |

---

## 📁 Project Structure Deep Dive

### Root Directory Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS config |
| `postcss.config.mjs` | PostCSS config |
| `next.config.ts` | Next.js configuration |
| `next-env.d.ts` | Next.js TypeScript types |
| `.gitignore` | Git ignore rules |
| `eslint.config.mjs` | ESLint rules |

### App Directory Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout (wraps all pages) |
| `page.tsx` | Home page (`/`) |
| `globals.css` | Global styles (Tailwind imports) |
| `favicon.ico` | Website favicon |
| `loading.tsx` | Loading UI (automatic) |
| `error.tsx` | Error UI (automatic) |
| `not-found.tsx` | 404 page (automatic) |

### Special File Conventions

| File | Description |
|------|-------------|
| `layout.tsx` | Shared UI wrapper for routes |
| `page.tsx` | Page content for a route |
| `loading.tsx` | Suspense fallback |
| `error.tsx` | Error boundary UI |
| `not-found.tsx` | 404 page |
| `route.ts` | API endpoint |
| `template.tsx` | Re-rendering layout |
| `head.tsx` | HTML head configuration |

---

## 🧩 Component Types in Next.js

### Server Components (Default)

```tsx
// Server Component - runs on server, no client interactivity
// CANNOT use: useState, useEffect, onClick, etc.
export default async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

**What Server Components CAN do:**
- Fetch data directly (async/await)
- Import server-only code
- Access database directly
- Keep sensitive data on server

**What Server Components CANNOT do:**
- Use React hooks (useState, useEffect)
- Use browser APIs (localStorage, window)
- Add event listeners (onClick, onChange)
- Use Context API (need Client Component)

### Client Components

```tsx
// Client Component - runs on client, has interactivity
'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

**When to use 'use client':**
- Using React hooks (useState, useEffect, useReducer)
- Using browser APIs (localStorage, window)
- Adding event handlers (onClick, onSubmit)
- Using Context API
- Using custom hooks that use client features

---

## 🚦 Navigation in Next.js

### Link Component

```tsx
import Link from 'next/link'

// Basic link
<Link href="/about">About</Link>

// With active styling
<Link href="/about" className={pathname === '/about' ? 'active' : ''}>
  About
</Link>

// Replace current history entry
<Link href="/about" replace>About</Link>

// Prefetch (default in viewport)
<Link href="/about" prefetch={false}>About</Link>

// External link (use <a> instead)
<a href="https://example.com">External</a>
```

### useRouter Hook (Client Components only)

```tsx
'use client'

import { useRouter } from 'next/navigation'

function NavigationButtons() {
  const router = useRouter()
  
  return (
    <div>
      <button onClick={() => router.push('/about')}>Go to About</button>
      <button onClick={() => router.back()}>Go Back</button>
      <button onClick={() => router.forward()}>Go Forward</button>
      <button onClick={() => router.refresh()}>Refresh</button>
    </div>
  )
}
```

### usePathname Hook

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

function ActiveLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  )
}
```

---

## 🎨 Metadata & SEO

### Static Metadata

```tsx
// app/layout.tsx or app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my portfolio website',
  keywords: ['portfolio', 'developer', 'react'],
  authors: [{ name: 'Victor Innocent' }],
  openGraph: {
    title: 'My Portfolio',
    description: 'Welcome to my portfolio website',
    url: 'https://my-portfolio.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: 'https://my-portfolio.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'Welcome to my portfolio website',
    images: ['https://my-portfolio.com/og-image.jpg'],
  },
}
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug)
  return <div>{post.content}</div>
}
```

---

## 📦 Essential Next.js Configuration

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Image domains for next/image
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'],
  },
  
  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-about',
        destination: '/about',
        permanent: true, // 301 redirect
      },
    ]
  },
  
  // Rewrites (proxy API)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://external-api.com/:path*',
      },
    ]
  },
}

export default nextConfig
```

### Environment Variables

```bash
# .env.local (local development, gitignored)
# Server-side only (cannot expose to client)
DATABASE_URL="postgresql://..."
API_SECRET_KEY="secret-key"

# Client-side (must start with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="GA-123456"
```

```tsx
// Accessing environment variables
// Server Component (any variable)
const dbUrl = process.env.DATABASE_URL

// Client Component (only NEXT_PUBLIC_ variables)
'use client'
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `useState` not working | Server Component | Add `'use client'` directive |
| Images not loading | External domain not allowed | Configure `images.domains` |
| Slow initial load | Large bundle size | Use dynamic imports |
| Environment variable undefined | Wrong prefix | Client needs `NEXT_PUBLIC_` |
| Build fails | TypeScript errors | Run `tsc --noEmit` locally |
| Hydration mismatch | Different server/client HTML | Use `useEffect` or suppress |

---

## 📚 Next.js Command Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx next info` | Show environment info |
| `npx next telemetry` | Toggle telemetry |

---

## 🎯 When to Use What

| Use Case | Best Choice |
|----------|-------------|
| Blog, documentation | Next.js (SSG) |
| E-commerce | Next.js (SSR/ISR) |
| Marketing site | Next.js (SSG) |
| Admin dashboard | React + Vite (CSR) |
| Real-time app | React + WebSockets |
| Mobile app | React Native |

