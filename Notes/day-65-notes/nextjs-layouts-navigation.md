# 📘 Next.js Layouts, Navigation & Styling

## 🎯 Layouts in Next.js

Layouts are special components that wrap pages and persist across navigation. They do not re-render when the user navigates between pages within the same layout.

### Root Layout

The root layout is defined in `app/layout.tsx` and wraps every page in the application. It must contain the `<html>` and `<body>` tags.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />   {/* Persists across all pages */}
        {children}       {/* Page content changes */}
        <Footer />       {/* Persists across all pages */}
      </body>
    </html>
  )
}
```

### Nested Layouts

Nested layouts are defined in subfolders using `layout.tsx`. They only wrap pages within that route segment.

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />        {/* Persists across dashboard pages */}
      <main>{children}</main>
    </div>
  )
}
```

### Layout Persistence

| Layout Type | File Location | When it Re-renders |
|-------------|---------------|-------------------|
| Root Layout | `app/layout.tsx` | Never (on full page reload) |
| Nested Layout | `app/segment/layout.tsx` | Only when segment changes |
| Template | `app/segment/template.tsx` | On every navigation |

### Layout vs Template

Use `template.tsx` when you need a new instance on every navigation (e.g., for animations, `useEffect` reset).

```tsx
// app/dashboard/template.tsx - Re-renders on every navigation
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>
}
```

---

## 🔗 Navigation

### Link Component

The `Link` component enables client-side navigation between pages without a full page reload.

```tsx
import Link from 'next/link'

// Basic link
<Link href="/about">About</Link>

// With dynamic path
<Link href={`/blog/${post.slug}`}>{post.title}</Link>

// Replace current history entry
<Link href="/dashboard" replace>Dashboard</Link>

// Disable prefetching (default: true when in viewport)
<Link href="/admin" prefetch={false}>Admin</Link>

// External links (use regular anchor)
<a href="https://example.com" target="_blank">External</a>
```

### Active Link Detection

Use `usePathname` from `next/navigation` to detect the current route.

```tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  )
}
```

### useRouter for Programmatic Navigation

```tsx
'use client'
import { useRouter } from 'next/navigation'

function LoginButton() {
  const router = useRouter()
  
  return (
    <button onClick={() => router.push('/dashboard')}>
      Login
    </button>
  )
}
```

### useRouter Methods

| Method | Description |
|--------|-------------|
| `push(href)` | Navigate to new URL, add to history |
| `replace(href)` | Navigate, replace current history entry |
| `back()` | Navigate to previous page |
| `forward()` | Navigate to next page |
| `refresh()` | Refresh current route (re-fetch data) |
| `prefetch(href)` | Prefetch a route |

### redirect() for Server Components

```tsx
// Server Component
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')  // Redirects to login page
  }
  
  return <div>Protected content</div>
}
```

---

## 🎨 Styling Options

### Option 1: Tailwind CSS

Tailwind is automatically configured when using `--tailwind` flag in `create-next-app`.

```tsx
export default function Button() {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
      Click Me
    </button>
  )
}
```

### Option 2: CSS Modules

CSS Modules provide locally scoped CSS. File naming: `component.module.css`.

```css
/* components/Button.module.css */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.button:hover {
  background-color: #2563eb;
}
```

```tsx
// components/Button.tsx
import styles from './Button.module.css'

export function Button() {
  return <button className={styles.button}>Click Me</button>
}
```

### Option 3: Global CSS

Global styles are defined in `app/globals.css`. They apply to the entire application.

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700;
}
```

---

## 📁 File Structure Reference

```
app/
├── layout.tsx           # Root layout (required)
├── page.tsx             # Home page
├── globals.css          # Global styles
├── about/
│   └── page.tsx
├── blog/
│   ├── layout.tsx       # Blog nested layout
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── dashboard/
    ├── layout.tsx       # Dashboard nested layout
    ├── page.tsx
    └── settings/
        └── page.tsx

components/
├── Navigation.tsx
├── Footer.tsx
├── Sidebar.tsx
└── Button.module.css    # CSS Module
```

---

## 🚦 Route Groups

Route groups allow you to organize routes without affecting the URL path. Use `(folderName)` syntax.

```
app/
├── (marketing)/
│   ├── layout.tsx       # Marketing layout
│   ├── page.tsx         # /
│   └── about/
│       └── page.tsx     # /about
├── (dashboard)/
│   ├── layout.tsx       # Dashboard layout
│   └── settings/
│       └── page.tsx     # /settings
└── layout.tsx           # Root layout
```

---

## ⚡ Key Takeaways

| Concept | Key Point |
|---------|-----------|
| **Root Layout** | Required, wraps all pages, contains html/body |
| **Nested Layout** | Optional, wraps specific route segments |
| **Layout Persistence** | Layouts don't re-render on navigation |
| **Link** | Client-side navigation, replaces `<a>` |
| **usePathname** | Get current path for active links |
| **useRouter** | Programmatic navigation (client only) |
| **redirect()** | Server-side redirects |
| **Tailwind** | Utility-first CSS framework |
| **CSS Modules** | Locally scoped CSS |

