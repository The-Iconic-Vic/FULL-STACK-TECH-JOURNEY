# 📘 API Routes in Next.js

## 🎯 What are API Routes?

API Routes are Next.js's built-in solution for creating backend endpoints. They allow you to build your API directly inside your Next.js application, eliminating the need for a separate backend server.

```
app/api/           → Handles all API requests
├── todos/
│   └── route.ts   → /api/todos (GET, POST)
└── todos/[id]/
    └── route.ts   → /api/todos/1 (GET, PUT, DELETE)
```

---

## 📁 Route Handler Structure

### File Location

API routes are created inside the `app/api` directory. Each folder represents a route segment.

```
app/
├── api/
│   ├── route.ts           # /api
│   ├── todos/
│   │   ├── route.ts       # /api/todos
│   │   └── [id]/
│   │       └── route.ts   # /api/todos/1
│   └── users/
│       ├── route.ts       # /api/users
│       └── [userId]/
│           └── route.ts   # /api/users/1
```

### Basic Route Handler

```tsx
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
```

---

## 🔧 HTTP Methods

### Available Method Handlers

| Method | Handler | Use Case |
|--------|---------|----------|
| `GET` | `export async function GET()` | Fetch data |
| `POST` | `export async function POST()` | Create data |
| `PUT` | `export async function PUT()` | Full update |
| `PATCH` | `export async function PATCH()` | Partial update |
| `DELETE` | `export async function DELETE()` | Remove data |

### Complete Example

```tsx
// app/api/todos/route.ts
import { NextResponse } from 'next/server'

let todos = [
  { id: 1, title: 'Learn API Routes', completed: false },
]

// GET - Fetch all
export async function GET() {
  return NextResponse.json(todos)
}

// POST - Create new
export async function POST(request: Request) {
  const body = await request.json()
  const newTodo = {
    id: todos.length + 1,
    title: body.title,
    completed: false,
  }
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}

// PUT - Replace all (less common)
export async function PUT(request: Request) {
  const body = await request.json()
  todos = body
  return NextResponse.json(todos)
}

// DELETE - Delete all
export async function DELETE() {
  todos = []
  return NextResponse.json({ success: true })
}
```

---

## 📍 Dynamic Routes

### Dynamic Route Parameter

Use square brackets `[param]` to create dynamic segments.

```tsx
// app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const todo = todos.find(t => t.id === id)
  
  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(todo)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const body = await request.json()
  
  const index = todos.findIndex(t => t.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  
  todos[index] = { ...todos[index], ...body }
  return NextResponse.json(todos[index])
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  todos = todos.filter(t => t.id !== id)
  return NextResponse.json({ success: true })
}
```

### Multiple Dynamic Parameters

```tsx
// app/api/users/[userId]/posts/[postId]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; postId: string } }
) {
  const { userId, postId } = params
  // Fetch specific post for specific user
  const post = await db.post.findFirst({
    where: { id: postId, userId }
  })
  return NextResponse.json(post)
}
```

---

## 📥 Request Handling

### NextRequest Object

```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Query parameters
  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')
  
  // Headers
  const authToken = request.headers.get('Authorization')
  
  // Cookies
  const sessionId = request.cookies.get('session-id')
  
  // URL parts
  const pathname = request.nextUrl.pathname
  const origin = request.nextUrl.origin
  
  return NextResponse.json({ limit, page })
}
```

### Reading Request Body

```tsx
export async function POST(request: NextRequest) {
  // JSON body
  const jsonBody = await request.json()
  
  // Form data
  const formData = await request.formData()
  const title = formData.get('title')
  
  // Text body
  const textBody = await request.text()
  
  // Raw body (for binary data)
  const rawBody = await request.arrayBuffer()
  
  return NextResponse.json({ received: true })
}
```

---

## 📤 Response Handling

### NextResponse Methods

```tsx
import { NextResponse } from 'next/server'

// JSON response (most common)
return NextResponse.json({ data: 'value' })

// JSON with status code
return NextResponse.json({ error: 'Not found' }, { status: 404 })

// Text response
return new NextResponse('Hello World', { status: 200 })

// HTML response
return new NextResponse('<h1>Hello</h1>', {
  status: 200,
  headers: { 'Content-Type': 'text/html' },
})

// Redirect
return NextResponse.redirect('https://example.com')

// Redirect with status
return NextResponse.redirect(new URL('/login', request.url), 307)
```

### Setting Headers and Cookies

```tsx
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  
  // Set header
  response.headers.set('X-Custom-Header', 'value')
  
  // Set cookie
  response.cookies.set('session', 'abc123', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  
  // Delete cookie
  response.cookies.delete('old-cookie')
  
  return response
}
```

---

## 🔌 Connecting Frontend to API

### Client Component Fetching

```tsx
// app/todos/page.tsx
'use client'

import { useEffect, useState } from 'react'

export default function TodosPage() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos)
  }, [])

  const addTodo = async (title: string) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const newTodo = await res.json()
    setTodos(prev => [...prev, newTodo])
  }

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.title}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Error Handling

```tsx
const fetchTodos = async () => {
  try {
    const res = await fetch('/api/todos')
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to fetch')
    }
    
    const data = await res.json()
    setTodos(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred')
  } finally {
    setLoading(false)
  }
}
```

---

## 📊 HTTP Status Codes Reference

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 204 | No Content | DELETE when no body needed |
| 400 | Bad Request | Invalid input from client |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 405 | Method Not Allowed | HTTP method not supported |
| 500 | Internal Server Error | Server-side error |

---

## 🗺️ Route Resolution Order

Next.js resolves routes in this order:

1. **Static routes** (`/todos/route.ts`)
2. **Dynamic routes** (`/todos/[id]/route.ts`)
3. **Catch-all routes** (`/todos/[...slug]/route.ts`)

```
/api/todos/create  → matches /todos/route.ts
/api/todos/123     → matches /todos/[id]/route.ts
/api/todos/a/b/c   → matches /todos/[...slug]/route.ts
```

---

## 🎯 Best Practices

| Practice | Why |
|----------|-----|
| **Use HTTP methods appropriately** | REST conventions are expected |
| **Return proper status codes** | Helps client handle responses |
| **Validate request data** | Prevent invalid data in database |
| **Handle errors gracefully** | Return meaningful error messages |
| **Use TypeScript types** | Catch errors at compile time |
| **Keep route handlers focused** | One resource per file |
| **Use environment variables** | Keep secrets out of code |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `request.json()` not working | Missing `await` | Add `await` before `request.json()` |
| 404 on API route | Wrong file location | Check `app/api/` folder structure |
| CORS error | Different origin | Configure CORS headers |
| Body parsing error | Wrong Content-Type | Ensure client sends correct headers |
| TypeScript error | Missing types | Import `NextRequest`, `NextResponse` |
| Dynamic param undefined | Wrong folder name | Use `[param]` not `(param)` or `{param}` |

---

## 📁 File Structure Template

```
app/
├── api/
│   ├── route.ts                    # GET /api
│   ├── health/
│   │   └── route.ts                # GET /api/health
│   ├── todos/
│   │   ├── route.ts                # GET, POST /api/todos
│   │   └── [id]/
│   │       └── route.ts            # GET, PUT, DELETE /api/todos/:id
│   └── users/
│       ├── route.ts                # GET, POST /api/users
│       └── [userId]/
│           ├── route.ts            # GET, PUT, DELETE /api/users/:id
│           └── posts/
│               └── route.ts        # GET /api/users/:id/posts
```

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **API routes live in `app/api`** | Each folder creates a route segment |
| **Export HTTP methods as functions** | `GET()`, `POST()`, `PUT()`, `DELETE()` |
| **Dynamic routes use `[param]`** | Access via `params` object |
| **Use `NextRequest` for advanced needs** | Query params, headers, cookies |
| **Use `NextResponse.json()` for responses** | Type-safe JSON responses |
| **Relative URLs work from frontend** | `/api/todos` automatically resolves |
| **Route handlers are Server Components** | Can use async/await directly |

