# 📘 Parallel & Intercepting Routes in Next.js

## 🎯 Overview

Parallel and intercepting routes are advanced Next.js patterns that enable complex UI architectures like dashboards with multiple independent sections, modals that preserve background context, and conditional layouts.

---

## 📁 Part 1: Parallel Routes

### What are Parallel Routes?

Parallel routes allow you to render **multiple pages simultaneously** within the same layout using named **slots**. Each slot maintains its own navigation state independently.

### Slot Convention

Slots are folders prefixed with `@`. They are **not URL segments** - they exist only for component composition.

```
app/
├── @sidebar/           # Slot (affects layout, not URL)
│   └── page.tsx
├── @analytics/         # Another slot
│   └── page.tsx
├── page.tsx            # Default children slot
└── layout.tsx          # Renders all slots
```

### Layout with Multiple Slots

```tsx
// app/layout.tsx
export default function Layout({
  children,      // Default slot (page.tsx)
  sidebar,       // @sidebar slot
  analytics,     // @analytics slot
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div className="flex gap-6">
      <aside className="w-64">{sidebar}</aside>
      <main className="flex-1">{children}</main>
      <aside className="w-80">{analytics}</aside>
    </div>
  )
}
```

### Independent Navigation

Each slot can have its own navigation. Navigating within a slot doesn't affect other slots.

```tsx
// app/@sidebar/page.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarSlot() {
  const pathname = usePathname()
  
  return (
    <nav>
      <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
        Dashboard
      </Link>
      <Link href="/settings" className={pathname === '/settings' ? 'active' : ''}>
        Settings
      </Link>
    </nav>
  )
}
```

---

## 🔧 Part 2: Conditional Routes with default.tsx

### The Problem

When you navigate to a route like `/settings`, Next.js looks for matching pages in ALL slots. If a slot doesn't have a matching file, it returns 404.

```
Navigating to /settings:
✅ app/settings/page.tsx exists (children)
❌ app/@sidebar/settings/page.tsx missing → 404
```

### Solution: default.tsx

`default.tsx` provides a fallback for slots that don't have matching routes.

```tsx
// app/@sidebar/default.tsx
export default function SidebarDefault() {
  // Renders when no specific sidebar page exists
  return <div className="p-4">Default Sidebar Content</div>
}
```

```tsx
// app/layout.tsx
export default function Layout({
  children,
  sidebar,
  analytics,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div>
      {/* Sidebar always shows (default.tsx when needed) */}
      <aside>{sidebar}</aside>
      
      {/* Analytics only on certain routes */}
      {analytics ? <aside>{analytics}</aside> : null}
      
      <main>{children}</main>
    </div>
  )
}
```

### Slot Page Structure

```
app/
├── @sidebar/
│   ├── page.tsx           # / (dashboard page)
│   ├── settings/
│   │   └── page.tsx       # /settings page
│   └── default.tsx        # Fallback for other routes
├── @analytics/
│   ├── page.tsx           # / (dashboard page)
│   ├── reports/
│   │   └── page.tsx       # /reports page
│   └── default.tsx        # Fallback for other routes
└── page.tsx               # Main children
```

---

## 🎯 Part 3: Intercepting Routes

### What are Intercepting Routes?

Intercepting routes allow you to **load a route from a different context** while keeping the current page in the background. This is perfect for modals that preserve the underlying UI.

### Interception Conventions

| Convention | Path Matches |
|------------|--------------|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | Root level |

### Visual Examples

```
Directory structure:
app/
├── photos/
│   └── [id]/
│       └── page.tsx           # /photos/123
├── feed/
│   └── [id]/
│       └── page.tsx           # /feed/123
└── @modal/
    ├── (.)photos/
    │   └── [id]/
    │       └── page.tsx       # Intercepts /photos/123 from /photos
    └── (..)feed/
        └── [id]/
            └── page.tsx       # Intercepts /feed/123 from /

From home page (/):
- /photos/123 → full page (not intercepted)
- /feed/123 → intercepted by (..)feed (one level up)
```

### Interception Rules

| Current Route | Target Route | Interception File |
|---------------|--------------|-------------------|
| `/photos` | `/photos/123` | `@modal/(.)photos/[id]/page.tsx` |
| `/` | `/photos/123` | `@modal/(...)photos/[id]/page.tsx` |
| `/user/feed` | `/feed/123` | `@modal/(..)(..)feed/[id]/page.tsx` |

---

## 🏗️ Part 4: Modal Pattern

### Combining Parallel + Intercepting Routes

The classic modal pattern uses:
- **Parallel route** (`@modal`) to render modal on top
- **Intercepting route** to capture the navigation
- **Default slot** (`@modal/default.tsx`) returning `null` when no modal
- **Full page route** for direct access/refresh

### Modal Pattern File Structure

```
app/
├── layout.tsx                    # Renders {children} and {modal}
├── @modal/
│   ├── default.tsx               # Returns null (no modal by default)
│   └── (.)photos/
│       └── [id]/
│           └── page.tsx          # Modal content (intercepted)
├── photos/
│   ├── page.tsx                  # Gallery grid
│   └── [id]/
│       └── page.tsx              # Full page (direct access)
```

### Layout with Modal Slot

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
        {modal}  {/* Renders modal on top */}
      </body>
    </html>
  )
}
```

### Modal Slot Default

```tsx
// app/@modal/default.tsx
export default function ModalDefault() {
  return null  // No modal by default
}
```

### Intercepted Modal Route

```tsx
// app/@modal/(.)photos/[id]/page.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function InterceptedModalPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const photo = await getPhoto(params.id)
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={() => router.back()}>
      <div className="bg-white rounded-lg" onClick={e => e.stopPropagation()}>
        <PhotoDetail photo={photo} />
        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  )
}
```

### Full Page Route

```tsx
// app/photos/[id]/page.tsx
import { getPhoto } from '@/lib/photos'
import Link from 'next/link'

export default async function PhotoPage({ params }: { params: { id: string } }) {
  const photo = await getPhoto(params.id)
  
  return (
    <div>
      <Link href="/photos">← Back to Gallery</Link>
      <PhotoDetail photo={photo} />
    </div>
  )
}
```

### Modal Behavior Flow

| Action | URL | Rendered Component |
|--------|-----|-------------------|
| User clicks photo | `/photos/123` | `@modal/(.)photos/[id]/page.tsx` (modal on gallery) |
| User refreshes page | `/photos/123` | `photos/[id]/page.tsx` (full page) |
| User shares link | `/photos/123` | `photos/[id]/page.tsx` (full page) |
| User closes modal | `/photos` | Gallery only (modal removed) |

---

## 📊 Quick Reference

### Parallel Routes API

| Concept | Syntax |
|---------|--------|
| Slot definition | `@folder_name` |
| Slot usage | `{ slotName: React.ReactNode }` |
| Default fallback | `default.tsx` in slot folder |
| Slot navigation | Independent from children |

### Interception Conventions

| Pattern | Use Case |
|---------|----------|
| `(.)` | Same level interception |
| `(..)` | Parent level interception |
| `(..)(..)` | Grandparent level |
| `(...)` | Root level (anywhere) |

### Modal Pattern Components

| Component | Purpose |
|-----------|---------|
| `layout.tsx` with `modal` prop | Renders modal slot |
| `@modal/default.tsx` | Returns `null` (no modal) |
| `@modal/(.)route/page.tsx` | Modal content (intercepted) |
| `route/page.tsx` | Full page (direct access) |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 on navigation | Slot missing page | Add `default.tsx` |
| Modal not showing | Wrong interception path | Check `(.)` pattern |
| Modal closes on refresh | Missing full page | Create `photos/[id]/page.tsx` |
| URL not updating | Using `router.push` without path | Use `Link` for navigation |
| Double modal | Both modal and page render | Check interception logic |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Slots use @ prefix** | `@sidebar`, `@modal` - not URL segments |
| **Slots need default.tsx** | Fallback for unmatched routes |
| **Slots navigate independently** | Each slot has its own state |
| **(.) intercepts same level** | Modal on top of current page |
| **(..) goes one level up** | Intercept from parent routes |
| **(...) intercepts from root** | Works from anywhere |
| **Modal pattern = parallel + intercepting** | Best for modal UIs |

