# 📅 Day 64: Next.js Introduction & Setup

**Date:** June 1, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Next.js Framework, App Router, File-based Routing, SSR vs CSR

---

## 📋 Learning Objectives

- ✅ Understand what Next.js is and problems it solves
- ✅ Differentiate between Next.js, CRA, and Vite
- ✅ Understand Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)
- ✅ Set up a Next.js project with TypeScript and Tailwind
- ✅ Understand the App Router folder structure
- ✅ Create pages using file-based routing
- ✅ Build navigation between pages

---

## 🎯 Part 1: What is Next.js?

### Next.js is a React Framework (not a library)

React is a **library** for building user interfaces. Next.js is a **framework** built on top of React that provides:

- **Routing** - File-based, no need for React Router
- **Server-Side Rendering (SSR)** - Pages render on the server
- **Static Site Generation (SSG)** - Pre-render at build time
- **API Routes** - Build backend endpoints in the same project
- **Image Optimization** - Automatic image optimization
- **Font Optimization** - Automatic font optimization
- **Middleware** - Run code before requests complete

```typescript
// React alone (needs React Router)
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Next.js - just create a file in the app folder!
// app/about/page.tsx automatically becomes /about
```

### Problems Next.js Solves

| Problem | React Only | Next.js |
|---------|-----------|---------|
| **Routing** | Need React Router | File-based, automatic |
| **SEO** | Poor (empty HTML) | Great (full HTML from server) |
| **Performance** | Client loads everything | Server sends ready HTML |
| **Image Optimization** | Manual | Built-in `next/image` |
| **API Endpoints** | Separate backend | API routes in same project |
| **Meta Tags** | Manual with `react-helmet` | Built-in metadata API |

### Next.js vs Create React App vs Vite

| Feature | Next.js | Create React App | Vite |
|---------|---------|------------------|------|
| **Type** | Framework | Build tool | Build tool |
| **Routing** | Built-in (file-based) | None (React Router) | None |
| **SSR/SSG** | ✅ Yes | ❌ No (only CSR) | ❌ No |
| **API Routes** | ✅ Yes | ❌ No | ❌ No |
| **Image Optimization** | ✅ Yes | ❌ No | ❌ No |
| **SEO** | Excellent | Poor | Poor |
| **Learning Curve** | Moderate | Low | Low |
| **Best For** | Production apps, SEO-heavy | SPAs | Fast development |

### Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)

```typescript
// Client-Side Rendering (CRA, Vite)
// HTML sent to browser is almost empty
// <div id="root"></div>
// JavaScript loads, then renders content

// Server-Side Rendering (Next.js)
// HTML sent to browser already contains content
// <div id="root"><h1>Welcome</h1><p>Content...</p></div>
// User sees content immediately
```

| Aspect | CSR | SSR |
|--------|-----|-----|
| **Time to First Paint** | Slower | Faster |
| **SEO** | Poor | Excellent |
| **Server Load** | Low | Higher |
| **Interactive Time** | After JS loads | After hydration |
| **TTFB (Time to First Byte)** | Fast | Slower |

### When to Use Next.js

✅ **Use Next.js when:**
- You need good SEO (blogs, e-commerce, marketing sites)
- You want server-side rendering for performance
- You need API routes in the same project
- You want image optimization out of the box
- You're building a full-stack application

❌ **Consider alternatives when:**
- You're building a simple static site (use Vite)
- You need a highly interactive dashboard (CSR is fine)
- You're already deep into another stack
- You don't need SEO or SSR benefits

---

## 🔧 Part 2: Setting Up Next.js

### Installation Command

```bash
# Create a new Next.js project with TypeScript, Tailwind, and App Router
npx create-next-app@latest my-portfolio --typescript --tailwind --app

# Navigate into project
cd my-portfolio

# Run development server
npm run dev

# Open http://localhost:3000
```

### What Each Flag Does

| Flag | Purpose |
|------|---------|
| `--typescript` | Use TypeScript instead of JavaScript |
| `--tailwind` | Configure Tailwind CSS |
| `--app` | Use App Router (recommended) |

### Project Structure Explained

```
my-portfolio/
├── app/
│   ├── favicon.ico      # Website favicon
│   ├── globals.css      # Global styles (Tailwind imports)
│   ├── layout.tsx       # Root layout (wraps ALL pages)
│   └── page.tsx         # Home page (route: /)
├── public/              # Static assets (images, fonts)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.mjs   # PostCSS configuration
├── next.config.ts       # Next.js configuration
├── .gitignore           # Git ignore file
├── eslint.config.mjs    # ESLint configuration
├── README.md            # Project documentation
└── next-env.d.ts        # Next.js TypeScript types
```

### Understanding layout.tsx

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}  {/* All pages render here */}
      </body>
    </html>
  )
}
```

### Understanding page.tsx

```tsx
// app/page.tsx (Home page at route: /)
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to My Portfolio</h1>
      <p>This is the home page.</p>
    </main>
  )
}
```

---

## 📁 Part 3: File-based Routing

### How Routing Works in Next.js

Next.js uses **folders** to create routes, not configuration files.

| Folder/File | Route |
|-------------|-------|
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/contact/page.tsx` | `/contact` |
| `app/projects/page.tsx` | `/projects` |
| `app/blog/first-post/page.tsx` | `/blog/first-post` |
| `app/dashboard/settings/page.tsx` | `/dashboard/settings` |

### Creating a New Page

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="text-gray-600">
        I'm a passionate developer learning Next.js to build amazing web applications.
      </p>
    </main>
  )
}
```

### Creating Multiple Pages

```tsx
// app/projects/page.tsx
export default function ProjectsPage() {
  const projects = [
    { id: 1, title: 'E-commerce App', description: 'Full-stack shopping platform' },
    { id: 2, title: 'Portfolio Website', description: 'Personal portfolio with Next.js' },
    { id: 3, title: 'Task Manager', description: 'Productivity app with TypeScript' },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
```

```tsx
// app/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <form className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea rows={4} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </main>
  )
}
```

---

## 🧩 Part 4: Navigation Component

### Creating the Navigation

```tsx
// components/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-blue-600">
            My Portfolio
          </Link>
          
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-blue-600 transition ${
                  pathname === item.href ? 'text-blue-600 font-semibold' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

### Integrating Navigation into Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my portfolio website built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
```

---

## 🏗️ Part 5: Mini-Project - Multi-Page Portfolio

### Complete Home Page

```tsx
// app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Hi, I'm{' '}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Victor Innocent
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Full-stack developer passionate about building amazing web experiences
        </p>
        <Link
          href="/projects"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View My Work
        </Link>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'MongoDB'].map(skill => (
            <span key={skill} className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
```

### Complete About Page

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-600 mb-4">
            I'm a full-stack developer with a passion for building modern web applications.
            My journey in tech started 9 months ago, and I've been learning and building ever since.
          </p>
          <p className="text-gray-600 mb-4">
            I specialize in React, Next.js, and TypeScript, creating fast, responsive,
            and user-friendly applications.
          </p>
          <p className="text-gray-600">
            When I'm not coding, I enjoy sharing my knowledge and documenting my learning
            journey to help others who are starting out.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
          <ul className="space-y-2 text-gray-600">
            <li>✓ React & Next.js</li>
            <li>✓ TypeScript</li>
            <li>✓ Tailwind CSS</li>
            <li>✓ Node.js & Express</li>
            <li>✓ MongoDB & PostgreSQL</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
```

---

## 📝 Quick Reference: Next.js Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Route Types

```typescript
// Static route: /about
app/about/page.tsx

// Dynamic route: /blog/post-1
app/blog/[slug]/page.tsx

// Catch-all route: /docs/features/api
app/docs/[...slug]/page.tsx

// Layout (shared across routes)
app/blog/layout.tsx
```

---

## ✅ Day 64 Checklist

- [ ] Understand what Next.js is and problems it solves
- [ ] Understand difference between SSR and CSR
- [ ] Install Next.js with TypeScript and Tailwind
- [ ] Explore the folder structure (app directory)
- [ ] Understand layout.tsx (wraps all pages)
- [ ] Create about page (`/about`)
- [ ] Create contact page (`/contact`)
- [ ] Create projects page (`/projects`)
- [ ] Build Navigation component with `next/link`
- [ ] Add active link highlighting
- [ ] Run dev server and test all routes
- [ ] Push code to GitHub
