# 📅 Day 68: API Routes in Next.js

**Date:** June 5, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Route Handlers, REST API, Dynamic Routes, NextRequest, NextResponse

---

## 📋 Learning Objectives

- ✅ Create API routes using the App Router
- ✅ Handle GET, POST, PUT, DELETE requests
- ✅ Use `NextRequest` and `NextResponse` for typed requests/responses
- ✅ Implement dynamic API routes with route parameters
- ✅ Read request body and query parameters
- ✅ Connect frontend components to backend APIs

---

## 🎯 Part 1: Route Handlers (API Routes)

### What are Route Handlers?

Route handlers are Next.js's built-in solution for creating API endpoints. They live inside the `app/api` directory and can handle various HTTP methods.

```
app/
├── api/
│   └── todos/
│       └── route.ts    # Handles /api/todos
```

### Basic Route Handler

```tsx
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  })
}
```

### Handling Multiple HTTP Methods

```tsx
// app/api/todos/route.ts
import { NextResponse } from 'next/server'
import { Todo } from '@/types'

// In-memory storage (for demo purposes)
let todos: Todo[] = [
  { id: 1, title: 'Learn Next.js API Routes', completed: false },
  { id: 2, title: 'Build a todo app', completed: false },
]

// GET - Fetch all todos
export async function GET() {
  return NextResponse.json(todos)
}

// POST - Create a new todo
export async function POST(request: Request) {
  const body = await request.json()
  
  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title,
    completed: false,
  }
  
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}

// PUT - Update all todos (less common, shown for completeness)
export async function PUT(request: Request) {
  const body = await request.json()
  todos = body
  return NextResponse.json(todos)
}

// DELETE - Delete all todos
export async function DELETE() {
  todos = []
  return NextResponse.json({ success: true })
}
```

### Request and Response Types

```tsx
import { NextRequest, NextResponse } from 'next/server'

// Using NextRequest for advanced request handling
export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')
  
  // Get headers
  const authToken = request.headers.get('Authorization')
  
  // Get cookies
  const sessionId = request.cookies.get('session-id')
  
  return NextResponse.json({ limit, page })
}

// Setting response headers and cookies
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  
  // Set a cookie
  response.cookies.set('session-id', 'abc123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  })
  
  // Set a header
  response.headers.set('X-Custom-Header', 'custom-value')
  
  return response
}
```

---

## 📁 Part 2: Dynamic API Routes

### Creating Dynamic Routes

Dynamic routes use square brackets `[param]` in folder names.

```
app/api/todos/[id]/route.ts  →  /api/todos/1, /api/todos/2, etc.
```

### Dynamic Route Handler

```tsx
// app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

let todos = [
  { id: 1, title: 'Learn Next.js API Routes', completed: false },
  { id: 2, title: 'Build a todo app', completed: false },
]

// GET - Fetch single todo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const todo = todos.find(t => t.id === id)
  
  if (!todo) {
    return NextResponse.json(
      { error: `Todo with id ${id} not found` },
      { status: 404 }
    )
  }
  
  return NextResponse.json(todo)
}

// PUT - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const body = await request.json()
  
  const todoIndex = todos.findIndex(t => t.id === id)
  
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: `Todo with id ${id} not found` },
      { status: 404 }
    )
  }
  
  todos[todoIndex] = { ...todos[todoIndex], ...body }
  return NextResponse.json(todos[todoIndex])
}

// DELETE - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const todoExists = todos.some(t => t.id === id)
  
  if (!todoExists) {
    return NextResponse.json(
      { error: `Todo with id ${id} not found` },
      { status: 404 }
    )
  }
  
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
  const post = await getPost(userId, postId)
  
  return NextResponse.json(post)
}
```

### Query Parameters

```tsx
// app/api/todos/route.ts with query filtering
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const completed = searchParams.get('completed')
  const limit = searchParams.get('limit')
  
  let filteredTodos = [...todos]
  
  if (completed !== null) {
    const isCompleted = completed === 'true'
    filteredTodos = filteredTodos.filter(t => t.completed === isCompleted)
  }
  
  if (limit) {
    filteredTodos = filteredTodos.slice(0, parseInt(limit))
  }
  
  return NextResponse.json(filteredTodos)
}
```

---

## 🔗 Part 3: Connecting Frontend to API

### Fetching from Client Components

```tsx
// components/TodoList.tsx
'use client'

import { useEffect, useState } from 'react'
import { Todo } from '@/types'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (loading) return <div className="text-center py-8">Loading todos...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <div key={todo.id} className="flex items-center gap-3 p-3 border rounded-lg">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-5 h-5"
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  )
}
```

### Creating New Todo (POST Request)

```tsx
// components/TodoForm.tsx
'use client'

import { useState } from 'react'

interface TodoFormProps {
  onTodoCreated: () => void
}

export default function TodoForm({ onTodoCreated }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      })
      
      if (!res.ok) throw new Error('Failed to create todo')
      
      setTitle('')
      onTodoCreated() // Refresh the list
    } catch (err) {
      console.error('Error creating todo:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
```

### Updating and Deleting Todos

```tsx
// components/TodoItem.tsx
'use client'

import { useState } from 'react'
import { Todo } from '@/types'

interface TodoItemProps {
  todo: Todo
  onUpdate: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const toggleComplete = async () => {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
    onUpdate()
  }

  const handleUpdate = async () => {
    if (!editTitle.trim()) return
    
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle.trim() }),
    })
    setIsEditing(false)
    onUpdate()
  }

  const handleDelete = async () => {
    if (confirm('Delete this todo?')) {
      await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
      onDelete()
    }
  }

  if (isEditing) {
    return (
      <div className="flex gap-2 p-3 border rounded-lg">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          autoFocus
        />
        <button onClick={handleUpdate} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="w-5 h-5"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
          Delete
        </button>
      </div>
    </div>
  )
}
```

---

## 🏗️ Part 4: Complete Todo Application

### Types Definition

```ts
// types/index.ts
export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface CreateTodoInput {
  title: string
}

export interface UpdateTodoInput {
  title?: string
  completed?: boolean
}
```

### Main Todo Page

```tsx
// app/todos/page.tsx
'use client'

import { useEffect, useState } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'
import TodoFilters from '@/components/TodoFilters'
import { Todo } from '@/types'

export default function TodosPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshTodos = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Todo App</h1>
      
      <TodoForm onTodoCreated={refreshTodos} />
      <TodoFilters onFilterChange={refreshTodos} />
      <TodoList key={refreshKey} onUpdate={refreshTodos} />
    </div>
  )
}
```

### TodoFilters Component

```tsx
// components/TodoFilters.tsx
'use client'

import { useState } from 'react'

interface TodoFiltersProps {
  onFilterChange: (filter: string) => void
}

export default function TodoFilters({ onFilterChange }: TodoFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={`px-4 py-2 rounded-lg transition ${
            activeFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
```

---

## 📊 Quick Reference: API Routes

### HTTP Methods

| Method | Use Case | Response Status |
|--------|----------|-----------------|
| `GET` | Fetch data | 200 OK |
| `POST` | Create resource | 201 Created |
| `PUT` | Full update | 200 OK |
| `PATCH` | Partial update | 200 OK |
| `DELETE` | Remove resource | 200 OK or 204 No Content |

### Response Status Codes

```tsx
// 200 - OK
return NextResponse.json(data)

// 201 - Created (POST)
return NextResponse.json(newData, { status: 201 })

// 400 - Bad Request
return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

// 404 - Not Found
return NextResponse.json({ error: 'Not found' }, { status: 404 })

// 500 - Internal Server Error
return NextResponse.json({ error: 'Server error' }, { status: 500 })
```

### Request Body Reading

```tsx
// JSON body
const body = await request.json()

// Form data
const formData = await request.formData()
const title = formData.get('title')

// Text body
const text = await request.text()
```

---

## 🐛 Common Pitfalls & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Cannot read properties of undefined` | Missing await on request.json() | Add `await` before `request.json()` |
| Route not found | Wrong file location | Ensure route.ts is in correct folder |
| CORS errors | Different origin | Configure CORS headers |
| 404 on dynamic route | Missing [param] folder | Check folder naming (square brackets) |
| Body is empty | Wrong content-type | Ensure client sends `Content-Type: application/json` |
| Type errors | Missing NextRequest import | Import from 'next/server' |

---

## ✅ Day 68 Checklist

- [ ] Create API route with GET handler
- [ ] Create API route with POST handler
- [ ] Create dynamic API route with `[id]` parameter
- [ ] Implement GET by ID in dynamic route
- [ ] Implement PUT update in dynamic route
- [ ] Implement DELETE in dynamic route
- [ ] Read query parameters from `NextRequest`
- [ ] Connect frontend to fetch todos
- [ ] Implement POST request from frontend
- [ ] Implement PUT and DELETE from frontend
- [ ] Test all API endpoints with browser/devtools
- [ ] Push code to GitHub

