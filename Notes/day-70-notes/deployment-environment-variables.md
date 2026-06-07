# 📘 Deployment & Environment Variables in Next.js

## 🎯 Overview

Deploying a Next.js application involves building the application for production and hosting it on a platform that supports Next.js features. Vercel, created by the Next.js team, offers the most seamless deployment experience.

---

## 🚀 Part 1: Vercel Deployment

### Why Vercel?

Vercel is the recommended deployment platform for Next.js applications. It provides native support for all Next.js features including Server Components, API Routes, Middleware, Image Optimization, and ISR.

### Key Benefits

| Benefit | Description |
|---------|-------------|
| **Zero Configuration** | Automatically detects Next.js and applies optimal settings |
| **Global Edge Network** | Content served from 100+ locations worldwide |
| **Automatic Deployments** | Every git push triggers a deployment |
| **Preview Deployments** | Every PR gets a unique preview URL |
| **Serverless Functions** | API routes automatically scale |
| **Free SSL** | Automatic HTTPS certificates |
| **Analytics** | Built-in Core Web Vitals monitoring |

### Deployment Steps

1. Push code to GitHub repository
2. Sign in to Vercel with GitHub
3. Click "Add New Project"
4. Import repository
5. Configure build settings (auto-detected)
6. Add environment variables
7. Click "Deploy"

### Automatic Deployment Triggers

| Trigger | Deployment Type | URL Pattern |
|---------|----------------|-------------|
| Push to `main`/`master` | Production | `project.vercel.app` |
| Push to feature branch | Preview | `project-git-branch.vercel.app` |
| Pull request created | Preview | `project-git-pr-123.vercel.app` |

---

## 🔐 Part 2: Environment Variables

### Variable Types

| Type | Prefix | Access | Rebuild Required |
|------|--------|--------|------------------|
| **Server-only** | none | Server Components, API Routes | No |
| **Client-exposed** | `NEXT_PUBLIC_` | Client + Server Components | Yes |

### Server-only Variables

These variables are only available in Server Components and API routes. They are never exposed to the browser.

```tsx
// app/page.tsx (Server Component)
export default function ServerPage() {
  // ✅ Available on server only
  const dbUrl = process.env.DATABASE_URL
  const secret = process.env.API_SECRET_KEY
  
  return <div>Server Component</div>
}
```

```tsx
// app/api/data/route.ts (API Route)
export async function GET() {
  // ✅ Available in API routes
  const dbUrl = process.env.DATABASE_URL
  return NextResponse.json({ connected: true })
}
```

```tsx
// components/Client.tsx (Client Component)
'use client'

export default function ClientComponent() {
  // ❌ Undefined - not exposed to client
  const dbUrl = process.env.DATABASE_URL
  
  return <div>{dbUrl || 'Not available'}</div>
}
```

### Client-Exposed Variables (NEXT_PUBLIC_)

These variables are inlined during build and available in both server and client code.

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_APP_NAME="My Portfolio"
```

```tsx
// Any component (server or client)
const apiUrl = process.env.NEXT_PUBLIC_API_URL  // ✅ Always works
```

### Environment Files

| File | Purpose | Committed |
|------|---------|-----------|
| `.env.local` | Local development variables | No |
| `.env.development` | Development environment | No |
| `.env.production` | Production environment | No |
| `.env.example` | Template for required variables | Yes |

### .gitignore Configuration

```gitignore
# Environment variables - NEVER commit
.env
.env*.local
.env.development
.env.production

# But commit the example file
!.env.example
```

---

## 🖥️ Part 3: Build-time vs Runtime Variables

### Build-time Variables

Variables without `NEXT_PUBLIC_` are evaluated during build and cannot change after deployment.

```bash
# .env.production
DATABASE_URL="postgresql://user:pass@prod-db:5432/db"
```

These are embedded at build time. Changes require a rebuild.

### Runtime Variables

Variables can be accessed at request time in dynamic routes and API routes.

```tsx
// app/api/time/route.ts
export async function GET() {
  // Evaluated on each request
  const currentTime = new Date().toISOString()
  return NextResponse.json({ time: currentTime })
}
```

### Important Note

`NEXT_PUBLIC_` variables are inlined at **build time**. Changing them requires a rebuild.

```bash
# Changing NEXT_PUBLIC_API_URL requires rebuilding
vercel --prod  # Rebuild and redeploy
```

---

## 📁 Part 4: Vercel Configuration

### Environment Variables on Vercel

Set variables in Vercel Dashboard:

1. Project → Settings → Environment Variables
2. Add variable name and value
3. Select environments:
   - **Development** → Local `vercel dev`
   - **Preview** → PR and branch deployments
   - **Production** → Production deployment

### Vercel CLI Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (prompts for configuration)
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add VARIABLE_NAME

# List environment variables
vercel env ls

# Pull environment variables locally
vercel env pull .env.local
```

### vercel.json Configuration

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["iad1", "hnd1"],
  "functions": {
    "app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

---

## 📊 Part 5: Post-Deployment

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Custom Domain Setup

1. Go to Project → Settings → Domains
2. Enter custom domain name
3. Add DNS records as instructed:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## 🔧 Part 6: Production Build Optimization

### next.config.ts for Production

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // SWC minification for faster builds
  swcMinify: true,
  
  // Standalone output for Docker deployments
  output: 'standalone',
  
  // Image domains configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Build Command

```bash
# Standard build
npm run build

# Build with verbose logging
next build --debug

# Build and analyze bundle
npm install @next/bundle-analyzer
# then run build
```

---

## 📋 Part 7: Pre-Deployment Checklist

### Code Quality

- [ ] TypeScript: `npm run type-check` (no errors)
- [ ] Linting: `npm run lint` (no warnings)
- [ ] Tests: `npm test` (all passing)
- [ ] No console.log in production

### Environment Variables

- [ ] All variables documented in `.env.example`
- [ ] No hardcoded secrets in code
- [ ] `NEXT_PUBLIC_` prefix for client-accessible vars
- [ ] Vercel variables configured for all environments

### Performance

- [ ] Images using `next/image`
- [ ] Fonts using `next/font`
- [ ] Priority set on above-the-fold images
- [ ] No large dependencies

### SEO

- [ ] Metadata configured in layout/page
- [ ] Open Graph tags set
- [ ] Sitemap generated (if needed)
- [ ] robots.txt configured

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Variable undefined | Wrong prefix | Add `NEXT_PUBLIC_` for client access |
| Build fails locally | Missing env vars | Create `.env.local` |
| API route 500 | Server-only var missing | Add variable on Vercel dashboard |
| Image not loading | Unconfigured domain | Add to `remotePatterns` |
| Preview deployment missing vars | Env not set for preview | Add variables to preview environment |
| Custom domain not resolving | DNS propagation | Wait 5-30 minutes |
| Slow page load | No image optimization | Use `next/image` component |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Vercel is the recommended platform** | Native Next.js support, zero config |
| **Every git push deploys automatically** | Production + preview deployments |
| **Server-only vars never expose secrets** | No `NEXT_PUBLIC_` prefix |
| **Client vars need NEXT_PUBLIC_** | Inlined at build time |
| **Set variables on Vercel dashboard** | Per-environment configuration |
| **Preview deployments for PRs** | Test before merging |
| **Analytics for performance monitoring** | Core Web Vitals tracking |

