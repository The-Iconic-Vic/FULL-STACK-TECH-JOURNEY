# 📅 Day 44: Express.js - Building REST APIs

**Date:** May 5, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 3 - Backend Development  
**Topics:** Express Setup, Routes, Request/Response, Middleware

---

## 📋 Learning Objectives

- ✅ Install and set up Express.js
- ✅ Create a server with `app.listen()`
- ✅ Define routes: `app.get()`, `app.post()`, `app.put()`, `app.delete()`
- ✅ Use `req.params` for URL parameters
- ✅ Use `req.query` for query strings
- ✅ Parse JSON bodies with `express.json()`
- ✅ Create custom middleware
- ✅ Build a complete CRUD API

---

## 🚀 Part 1: Express Setup & Basics

### What is Express?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.

```bash
# Installation
npm init -y
npm install express
```

### Basic Server

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### HTTP Methods in Express

| Method | Express Method | Purpose |
|--------|----------------|---------|
| GET | `app.get()` | Retrieve data |
| POST | `app.post()` | Create data |
| PUT | `app.put()` | Update entire resource |
| PATCH | `app.patch()` | Partial update |
| DELETE | `app.delete()` | Remove data |

```javascript
app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'John' }]);
});

app.post('/api/users', (req, res) => {
    res.status(201).json({ id: 2, name: 'Jane' });
});

app.put('/api/users/:id', (req, res) => {
    res.json({ id: req.params.id, updated: true });
});

app.delete('/api/users/:id', (req, res) => {
    res.json({ deleted: true });
});
```

---

### Request and Response Objects

#### Request Object (req)

| Property | Description | Example |
|----------|-------------|---------|
| `req.params` | URL parameters | `/users/:id` → `req.params.id` |
| `req.query` | Query string | `?page=2` → `req.query.page` |
| `req.body` | Request body | POST/PUT data |
| `req.headers` | HTTP headers | `req.headers['content-type']` |
| `req.method` | HTTP method | `GET`, `POST`, etc. |
| `req.url` | Request URL | `/api/users` |

#### Response Object (res)

| Method | Description | Example |
|--------|-------------|---------|
| `res.send()` | Send response (auto-detects type) | `res.send('Hello')` |
| `res.json()` | Send JSON response | `res.json({ name: 'John' })` |
| `res.status()` | Set HTTP status code | `res.status(404).json({ error: 'Not found' })` |
| `res.status().json()` | Chain status and JSON | `res.status(201).json(data)` |

---

## 📍 Part 2: Route Parameters & Query Strings

### URL Parameters (req.params)

```javascript
// Route: /api/users/:id
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ userId });
});

// Multiple parameters: /api/users/:userId/posts/:postId
app.get('/api/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.json({ userId, postId });
});
```

### Query Strings (req.query)

```javascript
// URL: /api/users?page=2&limit=10
app.get('/api/users', (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    res.json({ page, limit });
});

// Filtering: /api/products?category=electronics&inStock=true
app.get('/api/products', (req, res) => {
    const { category, inStock } = req.query;
    let filtered = products;
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    if (inStock === 'true') {
        filtered = filtered.filter(p => p.inStock);
    }
    
    res.json(filtered);
});
```

---

## 🔧 Part 3: Middleware

### What is Middleware?

Middleware functions are functions that have access to the request and response objects and can modify them or end the request-response cycle.

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
                    ↓
                Can modify req/res
                Can end request
                Or call next()
```

### Built-in Middleware

```javascript
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

### Custom Middleware

```javascript
// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Authentication middleware
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Verify token logic...
    next();
});

// Request timing middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.path} - ${duration}ms`);
    });
    next();
});
```

### Route-specific Middleware

```javascript
// Middleware for specific route
const validateUser = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    next();
};

app.post('/api/users', validateUser, (req, res) => {
    res.json({ success: true });
});
```

---

## 📝 Complete Todo API Example

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// In-memory storage
let todos = [
    { id: 1, title: 'Learn Express', completed: false },
    { id: 2, title: 'Build API', completed: false }
];
let nextId = 3;

// GET all todos
app.get('/api/todos', (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        const filtered = todos.filter(t => t.completed === isCompleted);
        return res.json(filtered);
    }
    res.json(todos);
});

// GET single todo
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

// POST create todo
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = { id: nextId++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const deleted = todos.splice(index, 1)[0];
    res.json({ message: 'Todo deleted', todo: deleted });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 📝 Quick Reference

### Express Setup
```bash
npm init -y
npm install express
```

### Basic Server
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);
```

### Route Methods
```javascript
app.get('/path', handler)
app.post('/path', handler)
app.put('/path/:id', handler)
app.delete('/path/:id', handler)
```

### Request Data
```javascript
req.params    // URL parameters
req.query     // Query string
req.body      // Request body
req.headers   // HTTP headers
```

### Response Methods
```javascript
res.send()    // Send response
res.json()    // Send JSON
res.status()  // Set status code
res.status(404).json({ error: 'Not found' })
```

### Middleware
```javascript
app.use(express.json())
app.use((req, res, next) => { next() })
```

---

## ✅ Day 44 Checklist

- [ ] Install Express.js
- [ ] Create server with `app.listen()`
- [ ] Define GET, POST, PUT, DELETE routes
- [ ] Use `req.params` for URL parameters
- [ ] Use `req.query` for filtering/pagination
- [ ] Parse JSON with `express.json()`
- [ ] Create custom logging middleware
- [ ] Handle 404 errors
- [ ] Test API with Postman or REST Client
- [ ] Build Todo API project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Express is a minimal web framework** for Node.js
2. **`app.listen()` starts the server** on a specified port
3. **HTTP methods map to Express methods** - `get()`, `post()`, `put()`, `delete()`
4. **`req.params` gets URL parameters** like `:id`
5. **`req.query` gets query string parameters** like `?page=2`
6. **`req.body` requires middleware** - `express.json()`
7. **Middleware runs in order** - between request and response
8. **Always handle 404** - for unmatched routes
9. **Use proper status codes** - 200 OK, 201 Created, 404 Not Found
