# 📘 Server Actions in Next.js

## 🎯 What are Server Actions?

Server Actions are **asynchronous functions that execute exclusively on the server**. They can be called directly from Client Components, eliminating the need to write API routes for data mutations.

```tsx
// Instead of: API Route + fetch() call
// Just write a function with 'use server'
'use server'

export async function createComment(formData: FormData) {
  // This runs on the server only
  await db.comment.create({ data: { content: formData.get('content') } })
  revalidatePath('/')
}
```

---

## 📁 Part 1: 'use server' Directive

### File-level Directive

Place `'use server'` at the top of a file to mark all exports as Server Actions.

```tsx
// app/actions/comment-actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createComment(formData: FormData) {
  const content = formData.get('content')
  await db.comment.create({ data: { content } })
  revalidatePath('/')
}

export async function deleteComment(formData: FormData) {
  const id = formData.get('id')
  await db.comment.delete({ where: { id } })
  revalidatePath('/')
}
```

### Function-level Directive

Place `'use server'` inside an async function to mark only that function as a Server Action.

```tsx
// app/components/InlineAction.tsx
'use client'

export function Form() {
  async function submit(formData: FormData) {
    'use server'
    
    const content = formData.get('content')
    await db.comment.create({ data: { content } })
    revalidatePath('/')
  }
  
  return <form action={submit}>...</form>
}
```

---

## 📝 Part 2: Form Actions

### Basic Form with action Prop

The `action` prop accepts a Server Action and submits the form automatically.

```tsx
// app/components/CommentForm.tsx
'use client'

import { createComment } from '@/actions/comment-actions'

export function CommentForm() {
  return (
    <form action={createComment}>
      <input name="content" placeholder="Your comment" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Progressive Enhancement

Forms with Server Actions work even without JavaScript. The browser submits the form normally, and the Server Action processes it.

```tsx
// Works with JavaScript disabled!
<form action={createComment}>
  <input name="content" />
  <button type="submit">Submit</button>
</form>
```

---

## ⚡ Part 3: Form Hooks

### useFormStatus - Loading State

Provides the submission status of a form without requiring prop drilling.

```tsx
// components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

```tsx
// app/components/CommentForm.tsx
import { SubmitButton } from './SubmitButton'

export function CommentForm() {
  return (
    <form action={createComment}>
      <input name="content" />
      <SubmitButton />  {/* Shows loading state automatically */}
    </form>
  )
}
```

#### useFormStatus Return Values

| Value | Type | Description |
|-------|------|-------------|
| `pending` | boolean | Form is currently submitting |
| `data` | FormData \| null | Submitted form data |
| `method` | string | HTTP method ('get' or 'post') |
| `action` | function \| null | Form action function |

### useActionState - Error Handling

Manages form state and provides error handling capabilities.

```tsx
// app/actions/comment-actions.ts
'use server'

export async function createComment(prevState: any, formData: FormData) {
  const content = formData.get('content')
  
  if (!content || content.length < 5) {
    return {
      success: false,
      error: 'Comment must be at least 5 characters'
    }
  }
  
  await db.comment.create({ data: { content } })
  revalidatePath('/')
  
  return { success: true, error: null }
}
```

```tsx
// app/components/CommentForm.tsx
'use client'

import { useActionState } from 'react'
import { createComment } from '@/actions/comment-actions'

export function CommentForm() {
  const [state, formAction, isPending] = useActionState(createComment, {
    success: false,
    error: null
  })
  
  return (
    <form action={formAction}>
      <input name="content" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      
      {state.error && (
        <p className="text-red-600">{state.error}</p>
      )}
      
      {state.success && (
        <p className="text-green-600">Comment added!</p>
      )}
    </form>
  )
}
```

---

## 🔄 Part 4: Cache Revalidation

### revalidatePath

Clears cached data for a specific path, forcing a fresh fetch on the next request.

```tsx
import { revalidatePath } from 'next/cache'

export async function createComment(formData: FormData) {
  await db.comment.create({ data: { content: formData.get('content') } })
  
  // Revalidate the home page to show the new comment
  revalidatePath('/')
  
  // Revalidate multiple paths
  revalidatePath('/blog')
  revalidatePath('/dashboard')
  
  // Revalidate all paths under a segment
  revalidatePath('/blog', 'layout')
}
```

### revalidateTag

Clears cached data associated with specific tags for more granular control.

```tsx
// app/lib/data.ts
import { unstable_cache } from 'next/cache'

export const getComments = unstable_cache(
  async () => {
    return await db.comment.findMany()
  },
  ['comments'],  // Tag name
  { revalidate: 60 }
)
```

```tsx
// app/actions/comment-actions.ts
import { revalidateTag } from 'next/cache'

export async function createComment(formData: FormData) {
  await db.comment.create({ data: { content: formData.get('content') } })
  
  // Revalidate all data tagged with 'comments'
  revalidateTag('comments')
}
```

### redirect

Performs a redirect after a Server Action completes.

```tsx
import { redirect } from 'next/navigation'

export async function createComment(formData: FormData) {
  await db.comment.create({ data: { content: formData.get('content') } })
  
  // Redirect prevents resubmission on refresh
  redirect('/?success=true')
}
```

**Important:** Call `redirect()` after `revalidatePath()` as redirect throws an error to interrupt execution.

```tsx
export async function updatePost(formData: FormData) {
  await db.post.update({ where: { id }, data: { title } })
  
  revalidatePath(`/posts/${id}`)
  redirect(`/posts/${id}`)  // ✅ Correct order
}
```

---

## 🔐 Part 5: Security

### Authentication

Always verify user identity before performing mutations.

```tsx
'use server'

import { getServerSession } from 'next-auth'

export async function createComment(formData: FormData) {
  const session = await getServerSession()
  
  if (!session?.user) {
    throw new Error('Unauthorized: Please log in')
  }
  
  // Proceed with mutation...
}
```

### Authorization

Check user permissions after authentication.

```tsx
export async function deleteComment(formData: FormData) {
  const session = await getServerSession()
  const commentId = formData.get('id')
  const comment = await db.comment.findUnique({ where: { id: commentId } })
  
  // Check if user owns the comment OR is admin
  if (session?.user?.id !== comment?.userId && session?.user?.role !== 'admin') {
    throw new Error('Forbidden: You can only delete your own comments')
  }
  
  await db.comment.delete({ where: { id: commentId } })
  revalidatePath('/')
}
```

### Input Validation with Zod

Validate all user input before processing.

```tsx
import { z } from 'zod'

const commentSchema = z.object({
  content: z.string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment too long')
    .refine(text => !/<script/i.test(text), 'HTML tags not allowed'),
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name required'),
})

export async function createComment(prevState: any, formData: FormData) {
  const result = commentSchema.safeParse({
    content: formData.get('content'),
    email: formData.get('email'),
    name: formData.get('name'),
  })
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }
  
  // Safe to use result.data
  await db.comment.create({ data: result.data })
  revalidatePath('/')
  return { success: true, errors: {} }
}
```

### CSRF Protection

Server Actions have **automatic CSRF protection**. No additional configuration needed.

```tsx
// The action prop automatically includes CSRF tokens
<form action={createComment}>
  {/* Protected from CSRF attacks by default */}
</form>
```

### Rate Limiting

Prevent abuse by limiting request frequency.

```tsx
export async function createComment(formData: FormData) {
  const session = await getServerSession()
  const userId = session?.user?.id
  
  // Check recent comments from this user
  const recentComments = await db.comment.count({
    where: {
      userId,
      createdAt: { gte: new Date(Date.now() - 60000) } // Last minute
    }
  })
  
  if (recentComments >= 5) {
    throw new Error('Rate limit exceeded. Please wait before commenting again.')
  }
  
  // Proceed with comment creation...
}
```

---

## 📊 Quick Reference

### Server Actions API

| API | Purpose |
|-----|---------|
| `'use server'` | Marks functions as server-only |
| `action` prop | Form submission to Server Action |
| `useFormStatus` | Access form submission status |
| `useActionState` | Manage form state and errors |
| `revalidatePath` | Clear cached data by path |
| `revalidateTag` | Clear cached data by tag |
| `redirect` | Navigate after action |

### When to Use vs API Routes

| Use Server Actions | Use API Routes |
|--------------------|----------------|
| Form submissions | Public REST API |
| Data mutations | External API access |
| Server-side validation | Webhook endpoints |
| Progressive enhancement | Mobile app backend |
| Comments, reviews | Third-party integrations |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Function not running on server | Missing `'use server'` | Add directive at top of file or function |
| Form not working without JS | Missing `action` prop | Use `action={serverAction}` not `onSubmit` |
| State not updating after mutation | Missing revalidation | Call `revalidatePath()` |
| Double submission on refresh | No redirect after POST | Use `redirect()` after mutation |
| Type errors with FormData | Generic type | Cast with `as string` or use Zod |
| useFormStatus not updating | Wrong component placement | Use in child component inside form |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **'use server' is required** | Marks functions to run on server only |
| **No API routes needed** | Direct function calls for mutations |
| **Works without JavaScript** | Progressive enhancement by default |
| **useFormStatus for loading** | Access pending state without props |
| **useActionState for errors** | Manage form state and validation |
| **Always revalidate** | Call `revalidatePath` after mutations |
| **Always validate input** | Use Zod for type-safe validation |
| **Always check auth** | Verify user before mutations |
