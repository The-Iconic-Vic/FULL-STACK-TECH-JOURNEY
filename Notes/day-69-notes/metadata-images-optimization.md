# 📘 Metadata, Images & Optimization in Next.js

## 🎯 Overview

Next.js provides built-in optimization features that significantly improve SEO, performance, and user experience. This guide covers metadata configuration, image optimization, font optimization, and script management.

---

## 📋 Part 1: Metadata & SEO

### Metadata API

The Metadata API allows you to define SEO metadata for your pages. Next.js automatically adds the appropriate `<head>` tags.

### Static Metadata

```tsx
// app/layout.tsx (Root layout metadata)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'My Portfolio',
    template: '%s | My Portfolio',  // %s replaced with page title
  },
  description: 'A showcase of my work and skills',
  keywords: ['portfolio', 'developer', 'nextjs'],
  authors: [{ name: 'Victor Innocent' }],
  creator: 'Victor Innocent',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  verification: {
    google: 'google-site-verification-code',
  },
}
```

### Open Graph (Social Media) Metadata

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: 'My Portfolio',
    description: 'A showcase of my work and skills',
    url: 'https://my-portfolio.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: 'https://my-portfolio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Preview image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'A showcase of my work and skills',
    images: ['https://my-portfolio.com/og-image.png'],
    creator: '@TheIconicVic',
  },
}
```

### Page-Specific Metadata

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about my journey and skills',
}
```

### Dynamic Metadata

For pages that need data-driven metadata (e.g., blog posts):

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getPost } from '@/lib/posts'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
    },
  }
}
```

### Metadata Fields Reference

| Field | Purpose |
|-------|---------|
| `title` | Browser tab title, search result title |
| `title.template` | Pattern for child page titles |
| `title.default` | Default title when no child title |
| `description` | Search engine snippet |
| `keywords` | SEO keywords (less important now) |
| `authors` | Content authors |
| `creator` | Content creator |
| `publisher` | Publishing entity |
| `robots` | Search engine crawling instructions |
| `icons` | Favicon configuration |
| `manifest` | Web app manifest |
| `openGraph` | Social media preview (Facebook, LinkedIn) |
| `twitter` | Twitter card preview |
| `verification` | Site verification tokens |
| `alternates` | Canonical URLs, language alternatives |
| `category` | Content category |

---

## 🖼️ Part 2: Image Optimization

### The Problem with Standard `<img>`

- Large file sizes slow down page load
- No lazy loading by default
- No responsive image generation
- No format conversion (WebP, AVIF)
- Layout shift (no dimensions specified)

### Next.js Image Component

```tsx
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={500}
      height={500}
      priority
      className="rounded-full"
      quality={90}
      placeholder="blur"
      blurDataURL="data:image/jpeg..."
    />
  )
}
```

### Image Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Image path or URL |
| `alt` | string | required | Accessibility description |
| `width` | number | required (except fill) | Intrinsic width |
| `height` | number | required (except fill) | Intrinsic height |
| `priority` | boolean | false | Load immediately (adds preload) |
| `quality` | number | 75 | JPEG quality (1-100) |
| `placeholder` | 'blur' \| 'empty' | 'empty' | Loading placeholder |
| `blurDataURL` | string | - | Base64 blur placeholder |
| `sizes` | string | - | Responsive sizes |
| `fill` | boolean | false | Fill parent container |
| `loading` | 'lazy' \| 'eager' | 'lazy' | Loading behavior |

### Remote Images Configuration

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

### Responsive Images with `sizes`

```tsx
// Fill parent container with responsive sizes
<div className="relative w-full h-96">
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

### Local Image Imports

```tsx
import profilePic from '@/public/profile.jpg'
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="Profile"
      // width and height automatically inferred
      priority
    />
  )
}
```

---

## 🔤 Part 3: Font Optimization

### The Font Problem

- External fonts (Google Fonts) cause additional network requests
- FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text)
- Layout shift when fonts load

### Next.js Font Solution

- Self-hosted fonts
- Automatic optimization
- Zero layout shift
- CSS `size-adjust` fallback

### Using next/font/google

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### Using in CSS

```css
/* globals.css */
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}

code {
  font-family: var(--font-roboto-mono), monospace;
}
```

### Font Weights and Styles

```tsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
```

### Local Font Files

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
})
```

### Font Display Options

| Value | Behavior |
|-------|----------|
| `swap` | Fallback font shows until custom loads (recommended) |
| `optional` | Browser decides if font loads |
| `fallback` | Short block period, then swap |
| `block` | Invisible text until font loads |
| `auto` | Browser default |

---

## 📜 Part 4: Script Optimization

### Using next/script

```tsx
import Script from 'next/script'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />
      
      <Script id="inline-script" strategy="lazyOnload">
        {`
          console.log('Script runs when browser is idle');
        `}
      </Script>
    </>
  )
}
```

### Script Loading Strategies

| Strategy | Execution Time | Use Case |
|----------|----------------|----------|
| `beforeInteractive` | Before page interactive | Critical scripts (feature detection) |
| `afterInteractive` | After page interactive (default) | Analytics, ads |
| `lazyOnload` | During browser idle time | Non-critical scripts |
| `worker` | In a web worker | Heavy computation |

### Google Analytics Setup

```tsx
// app/layout.tsx
import Script from 'next/script'

const GA_ID = 'G-XXXXXXXXXX'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
```

---

## 📊 Performance Metrics

### Core Web Vitals

| Metric | Description | Target |
|--------|-------------|--------|
| LCP | Largest Contentful Paint | < 2.5s |
| INP | Interaction to Next Paint | < 200ms |
| CLS | Cumulative Layout Shift | < 0.1 |

### Lighthouse Scores

| Category | Target |
|----------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

---

## 🎯 Optimization Checklist

### Images
- [ ] Use `next/image` instead of `<img>`
- [ ] Set `width` and `height` or use `fill`
- [ ] Add descriptive `alt` text
- [ ] Use `priority` for above-the-fold images
- [ ] Configure `remotePatterns` for external images
- [ ] Set `sizes` for responsive images
- [ ] Consider `placeholder="blur"` for better UX

### Fonts
- [ ] Use `next/font` instead of Google Fonts links
- [ ] Use `display: 'swap'` for better perceived performance
- [ ] Use CSS variables for font access in CSS
- [ ] Subset fonts to reduce file size

### Scripts
- [ ] Use `next/script` for third-party scripts
- [ ] Set appropriate `strategy`
- [ ] Move non-critical scripts to `lazyOnload`
- [ ] Use `worker` strategy for heavy scripts

### Metadata
- [ ] Configure root layout metadata
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Use `generateMetadata` for dynamic pages
- [ ] Set `robots` directives
- [ ] Add verification tokens

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Metadata is automatic** | Next.js adds `<head>` tags from `export const metadata` |
| **Images are optimized automatically** | `next/image` handles resizing, format conversion, lazy loading |
| **Fonts have zero layout shift** | `next/font` generates CSS fallback sizes |
| **Scripts don't block rendering** | `next/script` with proper strategy |
| **Dynamic metadata needs generateMetadata** | For blog posts, product pages, etc. |
| **Remote images need configuration** | Add domains to `remotePatterns` |
| **Priority images preload** | Use `priority` for LCP images |

