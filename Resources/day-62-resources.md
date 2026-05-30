# 📚 Day 62 Resources - Building a Type-Safe Component Library

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| Vite Library Mode | https://vitejs.dev/guide/build.html#library-mode | Official Vite documentation for building libraries |
| Vite Plugin DTS | https://github.com/qmhc/vite-plugin-dts | Generate TypeScript declaration files |
| React TypeScript Cheatsheet | https://react-typescript-cheatsheet.netlify.app/ | Complete React + TypeScript reference |
| npm Publishing | https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry | How to publish packages to npm |
| Semantic Versioning | https://semver.org/ | Versioning specification |
| CSS Modules | https://github.com/css-modules/css-modules | CSS Modules documentation |
| JSDoc Reference | https://jsdoc.app/ | Documentation comment syntax |

---

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Building a React Component Library | https://youtu.be/6ThXsUwLWvc | 35 min |
| Publishing to npm with TypeScript | https://youtu.be/2jM5l1QxE1g | 25 min |
| CSS Modules Tutorial | https://youtu.be/0DdM6H1QjYM | 15 min |
| Creating a Design System | https://youtu.be/JfR7xGxBqZY | 45 min |
| Storybook with TypeScript | https://youtu.be/9ZZxmB7aF7A | 30 min |

---

## 📦 Essential npm Packages

| Package | Purpose | Command |
|---------|---------|---------|
| **vite** | Build tool | `npm install -D vite` |
| **vite-plugin-dts** | Generate .d.ts files | `npm install -D vite-plugin-dts` |
| **@vitejs/plugin-react** | React support | `npm install -D @vitejs/plugin-react` |
| **typescript** | TypeScript compiler | `npm install -D typescript` |
| **@types/react** | React types | `npm install -D @types/react` |
| **@types/react-dom** | React DOM types | `npm install -D @types/react-dom` |

### Optional Packages

| Package | Purpose |
|---------|---------|
| **@storybook/react** | Visual documentation |
| **@testing-library/react** | Component testing |
| **jest** | Unit testing |
| **rollup** | Alternative bundler |
| **esbuild** | Fast bundler |
| **tsup** | TypeScript bundler |

---

## 📝 Package.json Templates

### Basic Library Package.json

```json
{
  "name": "@yourusername/react-component-library",
  "version": "1.0.0",
  "description": "A type-safe React component library",
  "type": "module",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],
  "keywords": ["react", "components", "typescript", "ui-library"],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vite-plugin-dts": "^3.0.0"
  },
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### Package.json for Monorepo

```json
{
  "name": "@yourname/react-component-library",
  "version": "1.0.0",
  "private": false,
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/react-component-library"
  },
  "bugs": {
    "url": "https://github.com/yourname/react-component-library/issues"
  },
  "homepage": "https://github.com/yourname/react-component-library#readme"
}
```

---

## 🔧 Vite Configuration Templates

### Basic Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/demo', '**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
```

### Vite Config with Multiple Entries

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/Button': resolve(__dirname, 'src/components/Button/index.ts'),
        'hooks/useToggle': resolve(__dirname, 'src/hooks/useToggle.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
})
```

---

## 📁 Demo App Configuration

### Vite Demo Config

```typescript
// vite.demo.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './demo',
  build: {
    outDir: '../dist-demo',
  },
})
```

### Demo package.json Script

```json
{
  "scripts": {
    "demo": "vite --config vite.demo.config.ts",
    "demo:build": "vite build --config vite.demo.config.ts"
  }
}
```

---

## 🎨 CSS Variables Template

```css
/* styles/variables.css */
:root {
  /* Colors - Light Theme */
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-secondary: #6b7280;
  --color-secondary-hover: #4b5563;
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
  
  /* Backgrounds */
  --color-bg: #ffffff;
  --color-bg-secondary: #f3f4f6;
  --color-bg-hover: #e5e7eb;
  --color-bg-disabled: #f3f4f6;
  --color-card: #ffffff;
  
  /* Text */
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-text-disabled: #9ca3af;
  
  /* Borders */
  --color-border: #e5e7eb;
  --color-border-light: #f3f4f6;
  
  /* Spacing */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Z-Indices */
  --z-dropdown: 10;
  --z-modal: 100;
  --z-toast: 110;
  --z-tooltip: 120;
}

/* Dark Theme */
[data-theme='dark'] {
  --color-bg: #1f2937;
  --color-bg-secondary: #111827;
  --color-bg-hover: #374151;
  --color-bg-disabled: #374151;
  --color-card: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-border: #374151;
}
```

---

## 📝 JSDoc Template

```typescript
/**
 * Button component for user interactions
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Button onClick={handleClick}>Click me</Button>
 * ```
 * 
 * @example
 * ```tsx
 * // With variants
 * <Button variant="primary" size="lg">Primary Large</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 * ```
 * 
 * @example
 * ```tsx
 * // Loading state
 * <Button loading>Submitting...</Button>
 * ```
 */
export interface ButtonProps {
  /** Visual style variant - primary (default), secondary, danger, ghost */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  
  /** Size of the button - sm, md (default), lg */
  size?: 'sm' | 'md' | 'lg'
  
  /** Disables button interactions and applies disabled styles */
  disabled?: boolean
  
  /** Shows loading spinner and disables button */
  loading?: boolean
  
  /** Makes button take full width of container */
  fullWidth?: boolean
  
  /** Function called when button is clicked */
  onClick?: () => void
  
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset'
  
  /** Button content - text, icons, or other elements */
  children: React.ReactNode
  
  /** Additional CSS classes to apply */
  className?: string
}
```

---

## 🚀 npm Publishing Commands

### Initial Setup

```bash
# Create npm account (if you don't have one)
npm adduser

# Or login to existing account
npm login

# Verify login
npm whoami
```

### Version Management

```bash
# Check current version
npm version

# Patch update (bug fixes)
npm version patch
# 1.0.0 → 1.0.1

# Minor update (new features)
npm version minor
# 1.0.0 → 1.1.0

# Major update (breaking changes)
npm version major
# 1.0.0 → 2.0.0

# Pre-release versions
npm version prepatch   # 1.0.0 → 1.0.1-0
npm version preminor   # 1.0.0 → 1.1.0-0
npm version premajor   # 1.0.0 → 2.0.0-0
```

### Publishing

```bash
# Dry run - see what will be published
npm pack --dry-run

# Create tarball without publishing
npm pack

# Publish to npm
npm publish

# Publish with public access (for scoped packages)
npm publish --access public

# Publish beta version
npm publish --tag beta
```

### Unpublishing (use with caution)

```bash
# Unpublish a specific version
npm unpublish @yourname/package@1.0.0

# Unpublish entire package (within 72 hours)
npm unpublish @yourname/package --force
```

---

## 🔗 Useful GitHub Actions Workflow

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Creating a Design System | https://www.designsystems.com/ |
| Atomic Design | https://bradfrost.com/blog/post/atomic-web-design/ |
| React Component Patterns | https://www.patterns.dev/react |
| Storybook with React | https://storybook.js.org/docs/react/get-started |
| Chromatic for Visual Testing | https://www.chromatic.com/ |
| Changesets for Versioning | https://github.com/changesets/changesets |
| Semantic Release | https://github.com/semantic-release/semantic-release |

---

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 59 | Typing Custom Hooks | [Resource](./day-59-resources.md) |
| Day 60 | Typing Context & Global State | [Resource](./day-60-resources.md) |
| Day 61 | Type-Safe Forms | [Resource](./day-61-resources.md) |
| Day 62 | Building Component Library | Current |
| Day 63 | Testing React Components | Coming Soon |

---

## ✅ Resources Checklist

- [ ] Vite library mode documentation
- [ ] vite-plugin-dts setup
- [ ] npm publishing guide
- [ ] Semantic versioning understanding
- [ ] CSS Modules documentation
- [ ] JSDoc comment format
- [ ] Watch component library tutorial
- [ ] Create package.json with correct exports
- [ ] Configure TypeScript for declaration files
- [ ] Set up CSS variables for theming
- [ ] Create demo app for testing
- [ ] Test npm pack before publishing
- [ ] (Optional) Set up GitHub Actions

---

## 💡 Pro Tips Summary

| Tip | Explanation |
|-----|-------------|
| **Use `exports` field** | Modern package.json entry points |
| **Generate `.d.ts` files** | TypeScript consumers need types |
| **CSS Modules + Variables** | Scoped styles + theming |
| **Peer dependencies** | Avoid duplicate React |
| **JSDoc comments** | IDE autocomplete descriptions |
| **Demo app** | Test components before publishing |
| **Semantic versioning** | Clear version meaning |
| **npm pack dry-run** | Check what gets published |
| **Use `displayName`** | Better React DevTools |
| **Export types** | Allow consumers to import interfaces |
