# 📅 Day 70: Deployment & Environment Variables

**Date:** June 7, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Vercel Deployment, Environment Variables, Build-time vs Runtime Variables, Preview Deployments

---

## 📋 Learning Objectives

- ✅ Deploy Next.js applications to Vercel
- ✅ Understand automatic deployments and preview deployments
- ✅ Configure environment variables for different environments
- ✅ Differentiate between server-only and client-exposed variables
- ✅ Set up custom domains
- ✅ Enable Vercel Analytics and Speed Insights

---

## 🎯 Part 1: Why Vercel?

### What is Vercel?

Vercel is the platform built by the creators of Next.js. It offers the best deployment experience for Next.js applications with zero configuration.

### Why Choose Vercel?

| Feature | Benefit |
|---------|---------|
| **Native Next.js support** | Full compatibility with all Next.js features (ISR, middleware, image optimization) |
| **Automatic deployments** | Every git push deploys automatically |
| **Preview deployments** | Every PR gets a unique preview URL |
| **Edge Network** | Global CDN for fast content delivery |
| **Serverless Functions** | API routes automatically become serverless functions |
| **Analytics** | Built-in Web Vitals and traffic analytics |
| **Free SSL** | Automatic HTTPS certificates |
| **Custom domains** | Easy domain configuration |

### Vercel vs Other Platforms

| Platform | Next.js Support | Ease of Use | Price (Starter) |
|----------|----------------|-------------|-----------------|
| **Vercel** | Perfect | Very Easy | Free |
| Netlify | Good | Easy | Free |
| AWS Amplify | Good | Moderate | Pay-as-you-go |
| Cloud Run | Manual | Complex | Pay-as-you-go |
| Self-hosted | Manual | Complex | Server costs |

---

## 🚀 Part 2: Deploying to Vercel

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure build settings (auto-detected for Next.js)
6. Add environment variables
7. Click "Deploy"

### Step 3: Automatic Deployments

After initial deployment, Vercel automatically deploys:

| Trigger | Action |
|---------|--------|
| Push to `main`/`master` | Production deployment |
| Push to any other branch | Preview deployment |
| Pull request created | Preview deployment with comment |
| Pull request updated | Updated preview deployment |

### Vercel Deployment Flow

```
Git Push → Vercel detects change → Builds application → Deploys to Edge Network → Live at URL
```

### Preview Deployments

Each pull request gets a unique preview URL:

```bash
# PR #123 preview URL
https://my-portfolio-git-feature-branch-123.vercel.app
```

Preview deployments are perfect for:
- Testing changes before merging
- Sharing work with team members
- QA and review processes

---

## 🔐 Part 3: Environment Variables

### Environment Variable Types

| Type | Prefix | Accessible In | Use Case |
|------|--------|---------------|----------|
| **Server-only** | none (or `NEXT_PUBLIC_` not used) | Server Components, API routes, `next.config.ts` | Database passwords, API secrets |
| **Client-exposed** | `NEXT_PUBLIC_` | Client Components, Server Components | API URLs, feature flags |

### File-Based Environment Variables

| File | Purpose | Committed? |
|------|---------|------------|
| `.env.local` | Local development | No (ignore) |
| `.env.development` | Development environment | No (optional) |
| `.env.production` | Production environment | No (optional) |
| `.env.example` | Template/example | Yes |

### Example `.env.local`

```bash
# .env.local (create this file locally)
# Server-only variables (never exposed to browser)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
API_SECRET_KEY="super-secret-key-123"
SMTP_PASSWORD="email-smtp-password"

# Client-exposed variables (must start with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_APP_NAME="My Portfolio"
```

### Example `.env.example`

```bash
# .env.example (commit this file)
# Copy this file to .env.local and fill in your values

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# API Keys
API_SECRET_KEY="your-secret-key"

# Public Variables (must start with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Using Environment Variables in Code

```tsx
// Server Component (can access both)
// app/page.tsx
export default async function ServerComponent() {
  // Server-only variables work
  const dbUrl = process.env.DATABASE_URL
  const secretKey = process.env.API_SECRET_KEY
  
  // Client-exposed variables also work
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  console.log(dbUrl)        // "postgresql://..."
  console.log(secretKey)    // "super-secret-key-123"
  console.log(apiUrl)       // "https://api.example.com"
  
  return <div>Server Component</div>
}
```

```tsx
// Client Component (only NEXT_PUBLIC_ variables)
// components/EnvDisplay.tsx
'use client'

export default function EnvDisplay() {
  // ✅ Works - client-exposed
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  // ❌ Undefined - server-only variables not exposed
  const dbUrl = process.env.DATABASE_URL
  
  return (
    <div>
      <p>API URL: {apiUrl}</p>
      <p>DB URL: {dbUrl || 'Not accessible on client'}</p>
    </div>
  )
}
```

### Environment Variables in API Routes

```tsx
// app/api/env/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // API routes can access server-only variables
  const dbUrl = process.env.DATABASE_URL
  const secretKey = process.env.API_SECRET_KEY
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  return NextResponse.json({
    hasDbUrl: !!dbUrl,
    hasSecretKey: !!secretKey,
    apiUrl: apiUrl,
  })
}
```

### .gitignore Configuration

```gitignore
# .gitignore
# Environment variables
.env
.env*.local
.env.development
.env.production

# But commit the example file
!.env.example
```

---

## 🖥️ Part 4: Vercel Environment Variables

### Setting Variables on Vercel Dashboard

1. Go to your project on Vercel
2. Navigate to Settings → Environment Variables
3. Add variable name and value
4. Choose environments (Development, Preview, Production)
5. Click "Save"

### Vercel Environment Types

| Environment | When Used |
|-------------|-----------|
| **Development** | Local `vercel dev` |
| **Preview** | Preview deployments (PRs, branches) |
| **Production** | Production deployment (main branch) |

### Example Vercel Variables Configuration

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `DATABASE_URL` | Local DB URL | Staging DB URL | Production DB URL |
| `API_SECRET_KEY` | Dev key | Staging key | Production key |
| `NEXT_PUBLIC_API_URL` | http://localhost:3000/api | https://preview-url.com/api | https://production.com/api |

### Build-time vs Runtime Variables

```tsx
// Build-time variables - evaluated during build
// next.config.ts
const nextConfig = {
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
}

// Runtime variables - evaluated during request
// app/api/time/route.ts
export async function GET() {
  return NextResponse.json({ now: new Date().toISOString() })
}
```

**Important:** Variables prefixed with `NEXT_PUBLIC_` are inlined at build time. Changes require a rebuild.

---

## 📊 Part 5: Vercel Configuration

### vercel.json

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
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### next.config.ts for Deployment

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Output standalone mode for Docker deployments
  output: 'standalone',
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Swc minification for faster builds
  swcMinify: true,
}

export default nextConfig
```

---

## 📈 Part 6: Post-Deployment Setup

### Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Vercel Speed Insights

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
```

### Custom Domain Setup

1. Go to your Vercel project → Settings → Domains
2. Enter your custom domain (e.g., `victorinnocent.dev`)
3. Follow instructions to configure DNS records
4. Wait for SSL certificate provisioning

**DNS Configuration Example:**

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## 📋 Part 7: Deployment Checklist

### Pre-Deployment Checklist

- [ ] Run `npm run build` locally to catch errors
- [ ] Check for TypeScript errors (`npm run type-check`)
- [ ] Verify all `NEXT_PUBLIC_` variables are properly named
- [ ] Test environment variables locally
- [ ] Remove console.log statements (or configure logging)
- [ ] Optimize images (use `next/image`)
- [ ] Add meta tags for SEO
- [ ] Set up `.env.example` for team members

### Post-Deployment Checklist

- [ ] Test all pages on production URL
- [ ] Verify API routes are working
- [ ] Check environment variables are loaded
- [ ] Test ISR revalidation
- [ ] Verify custom domain (if configured)
- [ ] Set up Analytics
- [ ] Enable Speed Insights
- [ ] Monitor initial performance metrics

---

## 🔧 Part 8: Environment Variables Demo Page

```tsx
// app/env-demo/page.tsx
import { headers } from 'next/headers'
import EnvDisplay from '@/components/EnvDisplay'
import EnvDebug from '@/components/EnvDebug'

export default function EnvDemoPage() {
  // Server-side environment access
  const serverVars = {
    nodeEnv: process.env.NODE_ENV,
    hasDbUrl: !!process.env.DATABASE_URL,
    hasSecretKey: !!process.env.API_SECRET_KEY,
    publicApiUrl: process.env.NEXT_PUBLIC_API_URL,
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Environment Variables Demo</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Server Component Display */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Server Component</h2>
          <pre className="bg-white p-4 rounded text-sm overflow-auto">
            {JSON.stringify(serverVars, null, 2)}
          </pre>
          <p className="text-gray-600 text-sm mt-2">
            Note: DATABASE_URL and API_SECRET_KEY are available on server only
          </p>
        </div>
        
        {/* Client Component Display */}
        <EnvDisplay />
      </div>
      
      {/* API Test */}
      <div className="mt-8">
        <EnvDebug />
      </div>
    </div>
  )
}
```

---

## 📊 Quick Reference

### Environment Variable Prefixes

| Prefix | Access | Rebuild Required | Example |
|--------|--------|------------------|---------|
| none | Server only | No | `DATABASE_URL` |
| `NEXT_PUBLIC_` | Client + Server | Yes | `NEXT_PUBLIC_API_URL` |

### Vercel CLI Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from CLI (with prompts)
vercel

# Deploy to production
vercel --prod

# Set environment variable
vercel env add DATABASE_URL

# List environment variables
vercel env ls

# Pull environment variables locally
vercel env pull .env.local
```

### Deployment URLs

| Type | URL Pattern |
|------|-------------|
| Production | `https://project-name.vercel.app` |
| Preview (branch) | `https://project-name-git-branch.vercel.app` |
| Preview (PR) | `https://project-name-git-pr-123.vercel.app` |
| Development | `http://localhost:3000` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Environment variable undefined | Wrong prefix | Add `NEXT_PUBLIC_` for client access |
| Build failing locally | Missing env vars | Create `.env.local` file |
| API routes returning 500 | Server-only var missing | Add variable on Vercel dashboard |
| Image optimization broken | Unconfigured domain | Add to `remotePatterns` |
| Preview deployment not working | Missing env vars | Add env vars for preview environment |
| Custom domain not resolving | DNS propagation | Wait 5-30 minutes for DNS |

---

## ✅ Day 70 Checklist

- [ ] Push code to GitHub repository
- [ ] Create Vercel account (if not already)
- [ ] Import repository to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Deploy to production
- [ ] Test all pages on production URL
- [ ] Set up `.env.example` for reference
- [ ] Add Vercel Analytics
- [ ] Add Speed Insights
- [ ] Configure custom domain (optional)
- [ ] Share live URL
- [ ] Document deployment process

