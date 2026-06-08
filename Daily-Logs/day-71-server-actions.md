# 📅 Day 71: Server Actions

**Date:** June 8, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Server Actions, 'use server' Directive, useFormStatus, useFormState, revalidatePath, redirect

---

## 📋 Learning Objectives

- ✅ Understand what Server Actions are and when to use them
- ✅ Use `'use server'` directive to mark server-only functions
- ✅ Call Server Actions from Client Components
- ✅ Use `action` prop in forms for progressive enhancement
- ✅ Implement loading states with `useFormStatus`
- ✅ Handle form errors with `useFormState`
- ✅ Revalidate cached data with `revalidatePath`
- ✅ Add authentication and validation to Server Actions

---

## 🎯 Part 1: What are Server Actions?

### Definition

Server Actions are **functions that run exclusively on the server** but can be called directly from Client Components. They eliminate the need to write API routes for data mutations.

```tsx
// Traditional approach: API Route + Client fetch
// app/api/comments/route.ts + fetch('/api/comments', { method: 'POST' })

// Server Actions approach: Direct function call
// actions/comment-actions.ts + <form action={createComment}>
```

### Benefits

| Benefit | Description |
|---------|-------------|
| **No API routes** | Eliminate boilerplate code |
| **Progressive enhancement** | Forms work without JavaScript |
| **Type safety** | End-to-end TypeScript |
| **Automatic CSRF protection** | Built-in security |
| **Server-side validation** | Data validated before mutation |
| **Seamless revalidation** | `revalidatePath` for cache invalidation |

### When to Use Server Actions

| Use Case | Server Actions? |
|----------|-----------------|
| Form submissions | ✅ Perfect |
| Data mutations (create, update, delete) | ✅ Perfect |
| Authentication (login, logout) | ✅ Good |
| Real-time updates | ❌ Use WebSockets |
| Complex API with external clients | ❌ Use API routes |
| Public REST API | ❌ Use API routes |

---

## 🔧 Part 2: 'use server' Directive

### Server Action File

```tsx
// app/actions/comment-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Validation schema
const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  content: z.string().min(1, 'Comment cannot be empty'),
})

// Server Action - Create comment
export async function createComment(formData: FormData) {
  // Validate data
  const validated = commentSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    content: formData.get('content'),
  })
  
  // Save to database (example)
  await db.comment.create({
    data: {
      name: validated.name,
      email: validated.email,
      content: validated.content,
      createdAt: new Date(),
    },
  })
  
  // Revalidate the page to show new comment
  revalidatePath('/')
  
  // Redirect to prevent resubmission
  redirect('/?success=true')
}

// Server Action - Delete comment
export async function deleteComment(formData: FormData) {
  const id = formData.get('id') as string
  
  await db.comment.delete({
    where: { id: parseInt(id) },
  })
  
  revalidatePath('/')
}
```

### Inline Server Action

```tsx
// app/components/FormWithInlineAction.tsx
'use client'

import { useActionState } from 'react'

export function FormWithInlineAction() {
  const action = async (prevState: any, formData: FormData) => {
    'use server'
    
    const name = formData.get('name')
    // Save to database...
    revalidatePath('/')
    return { success: true }
  }
  
  const [state, formAction] = useActionState(action, { success: false })
  
  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## 📝 Part 3: Forms with Server Actions

### Basic Form with action Prop

```tsx
// app/components/CommentForm.tsx
'use client'

import { createComment } from '@/app/actions/comment-actions'
import { SubmitButton } from './SubmitButton'

export function CommentForm() {
  return (
    <form action={createComment} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Comment
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <SubmitButton />
    </form>
  )
}
```

### useFormStatus for Loading State

```tsx
// app/components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? 'Submitting...' : 'Submit Comment'}
    </button>
  )
}
```

### useFormState for Error Handling

```tsx
// app/actions/comment-actions.ts
'use server'

export async function createComment(prevState: any, formData: FormData) {
  const name = formData.get('name')
  const content = formData.get('content')
  
  // Validation
  if (!name || typeof name !== 'string' || name.length < 2) {
    return { 
      success: false, 
      errors: { name: 'Name must be at least 2 characters' } 
    }
  }
  
  if (!content || typeof content !== 'string' || content.length < 1) {
    return { 
      success: false, 
      errors: { content: 'Comment cannot be empty' } 
    }
  }
  
  // Save to database...
  await db.comment.create({ data: { name, content } })
  
  revalidatePath('/')
  
  return { success: true, errors: {} }
}
```

```tsx
// app/components/CommentFormWithState.tsx
'use client'

import { useActionState } from 'react'
import { createComment } from '@/app/actions/comment-actions'

export function CommentFormWithState() {
  const [state, formAction] = useActionState(createComment, { 
    success: false, 
    errors: {} 
  })
  
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full border rounded-lg px-4 py-2"
        />
        {state.errors?.name && (
          <p className="text-red-600 text-sm mt-1">{state.errors.name}</p>
        )}
      </div>
      
      <div>
        <textarea
          name="content"
          placeholder="Your comment"
          rows={4}
          className="w-full border rounded-lg px-4 py-2"
        />
        {state.errors?.content && (
          <p className="text-red-600 text-sm mt-1">{state.errors.content}</p>
        )}
      </div>
      
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      
      {state.success && (
        <p className="text-green-600 text-sm">Comment added successfully!</p>
      )}
    </form>
  )
}
```

---

## 🔐 Part 4: Security

### Authentication in Server Actions

```tsx
// app/actions/comment-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export async function createComment(formData: FormData) {
  // 1. Authentication check
  const session = await getServerSession()
  
  if (!session?.user) {
    throw new Error('You must be logged in to comment')
  }
  
  // 2. Authorization check
  if (session.user.role !== 'user' && session.user.role !== 'admin') {
    throw new Error('You do not have permission to comment')
  }
  
  // 3. Rate limiting (implement with database or Redis)
  const recentComments = await db.comment.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: new Date(Date.now() - 60000) }, // Last minute
    },
  })
  
  if (recentComments >= 5) {
    throw new Error('Too many comments. Please wait a moment.')
  }
  
  // 4. Input validation
  const content = formData.get('content')
  
  if (!content || typeof content !== 'string' || content.length > 1000) {
    throw new Error('Invalid comment content')
  }
  
  // 5. XSS prevention (sanitize HTML)
  const sanitizedContent = content
    .replace(/<script>/gi, '&lt;script&gt;')
    .replace(/<\/script>/gi, '&lt;/script&gt;')
  
  // Save to database
  await db.comment.create({
    data: {
      content: sanitizedContent,
      userId: session.user.id,
    },
  })
  
  revalidatePath('/')
  redirect('/?success=true')
}
```

### Input Validation with Zod

```tsx
// app/lib/validators.ts
import { z } from 'zod'

export const commentSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  
  content: z.string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment cannot exceed 1000 characters')
    .refine(
      (text) => !/<script/i.test(text),
      'HTML tags are not allowed'
    ),
})

export type CommentInput = z.infer<typeof commentSchema>
```

```tsx
// app/actions/comment-actions.ts
'use server'

import { commentSchema } from '@/lib/validators'

export async function createComment(formData: FormData) {
  // Validate with Zod
  const result = commentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    content: formData.get('content'),
  })
  
  if (!result.success) {
    // Return validation errors
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }
  
  const { name, email, content } = result.data
  
  // Save to database...
  await db.comment.create({
    data: { name, email, content },
  })
  
  revalidatePath('/')
  return { success: true, errors: {} }
}
```

### CSRF Protection

Server Actions have **built-in CSRF protection**. The `action` prop automatically includes a CSRF token that is validated on the server.

```tsx
// No additional configuration needed!
// This is automatically protected from CSRF attacks
<form action={createComment}>
  {/* Fields */}
</form>
```

---

## 🏗️ Part 5: Complete Comment System

### Database Schema (Prisma)

```prisma
// prisma/schema.prisma
model Comment {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Database Utility

```ts
// app/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### Server Actions

```ts
// app/actions/comment-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/lib/db'

const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  content: z.string().min(1, 'Comment cannot be empty'),
})

export async function createComment(prevState: any, formData: FormData) {
  const result = commentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    content: formData.get('content'),
  })
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }
  
  const { name, email, content } = result.data
  
  await db.comment.create({
    data: { name, email, content },
  })
  
  revalidatePath('/')
  
  return { success: true, errors: {} }
}

export async function deleteComment(formData: FormData) {
  const id = formData.get('id') as string
  
  await db.comment.delete({
    where: { id: parseInt(id) },
  })
  
  revalidatePath('/')
}
```

### Main Page

```tsx
// app/page.tsx
import { db } from '@/lib/db'
import { CommentForm } from '@/components/CommentForm'
import { CommentList } from '@/components/CommentList'

export default async function HomePage() {
  const comments = await db.comment.findMany({
    orderBy: { createdAt: 'desc' },
  })
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Comments</h1>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Leave a comment</h2>
        <CommentForm />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h2>
        <CommentList comments={comments} />
      </div>
    </div>
  )
}
```

### Comment List Component

```tsx
// app/components/CommentList.tsx
'use client'

import { CommentItem } from './CommentItem'

interface Comment {
  id: number
  name: string
  email: string
  content: string
  createdAt: Date
}

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No comments yet. Be the first to comment!
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
```

### Comment Item Component

```tsx
// app/components/CommentItem.tsx
'use client'

import { deleteComment } from '@/app/actions/comment-actions'

interface Comment {
  id: number
  name: string
  content: string
  createdAt: Date
}

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-semibold">{comment.name}</span>
          <span className="text-gray-500 text-sm ml-2">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <form action={deleteComment}>
          <input type="hidden" name="id" value={comment.id} />
          <button
            type="submit"
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </form>
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  )
}
```

---

## 📊 Quick Reference

### Server Actions API

| API | Purpose |
|-----|---------|
| `'use server'` | Mark file/functions as server-only |
| `action` prop | Submit form to Server Action |
| `useFormStatus` | Get form submission status |
| `useActionState` | Get form state and errors |
| `revalidatePath` | Clear cached data |
| `revalidateTag` | Clear cached data by tag |
| `redirect` | Navigate after action |

### useFormStatus Values

| Value | Type | Description |
|-------|------|-------------|
| `pending` | boolean | Form is submitting |
| `data` | FormData | Submitted form data |
| `method` | string | HTTP method (get/post) |
| `action` | function | Form action function |

### useActionState Return

```tsx
const [state, formAction, isPending] = useActionState(action, initialState)
```

| Value | Type | Description |
|-------|------|-------------|
| `state` | State | Current form state |
| `formAction` | function | Action to pass to form |
| `isPending` | boolean | Loading state |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `'use server'` not working | Missing directive | Add `'use server'` at top of file or function |
| Form not submitting | Missing action prop | Add `action={serverAction}` to form |
| State not updating | Missing revalidatePath | Call `revalidatePath()` after mutation |
| Redirect not working | After revalidatePath | Use `redirect()` after `revalidatePath()` |
| useFormStatus not working | Wrong component placement | Use in child component of form |
| Type errors with FormData | Missing type assertion | Use `formData.get('name') as string` |

---

## ✅ Day 71 Checklist

- [ ] Understand what Server Actions are
- [ ] Create Server Action file with `'use server'`
- [ ] Build form with `action` prop
- [ ] Add loading state with `useFormStatus`
- [ ] Add error handling with `useActionState`
- [ ] Validate input with Zod
- [ ] Add authentication check to Server Action
- [ ] Use `revalidatePath` after mutations
- [ ] Use `redirect` for navigation
- [ ] Build complete comment system
- [ ] Test with and without JavaScript
- [ ] Push code to GitHub

