**File:** `notes/express-reference.md`

```markdown
# 📘 Express.js Reference

## What is Express?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.

```bash
npm init -y
npm install express
```

---

## Basic Server Setup

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## HTTP Methods

| Method | Express Method | Purpose |
|--------|----------------|---------|
| GET | `app.get()` | Retrieve data |
| POST | `app.post()` | Create data |
| PUT | `app.put()` | Update entire resource |
| PATCH | `app.patch()` | Partial update |
| DELETE | `app.delete()` | Remove data |

```javascript
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    users[id] = updatedUser;
    res.json(updatedUser);
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users.splice(id, 1);
    res.status(204).send();
});
```

---

## Request Object (req)

| Property | Description | Example |
|----------|-------------|---------|
| `req.params` | URL parameters | `/users/:id` → `req.params.id` |
| `req.query` | Query string | `?page=2` → `req.query.page` |
| `req.body` | Request body | POST/PUT JSON data |
| `req.headers` | HTTP headers | `req.headers.authorization` |
| `req.method` | HTTP method | `GET`, `POST`, etc. |
| `req.url` | Request URL | `/api/users` |
| `req.path` | Request path | `/api/users` |
| `req.ip` | Client IP address | `192.168.1.1` |

### Examples

```javascript
// URL parameters: /api/users/42
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;  // "42"
});

// Query parameters: /api/users?page=2&limit=10
app.get('/api/users', (req, res) => {
    const page = req.query.page || 1;      // "2"
    const limit = req.query.limit || 10;   // "10"
});

// Access headers
app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
});
```

---

## Response Object (res)

| Method | Description | Example |
|--------|-------------|---------|
| `res.send()` | Send response (auto-detects type) | `res.send('Hello')` |
| `res.json()` | Send JSON response | `res.json({ name: 'John' })` |
| `res.status()` | Set HTTP status code | `res.status(404)` |
| `res.status().json()` | Chain status and JSON | `res.status(201).json(data)` |
| `res.sendStatus()` | Send status code only | `res.sendStatus(204)` |
| `res.set()` | Set headers | `res.set('X-Custom', 'value')` |
| `res.redirect()` | Redirect to URL | `res.redirect('/login')` |
| `res.download()` | Download file | `res.download('file.pdf')` |

### Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing authentication |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server error |

```javascript
// Examples
res.status(200).json({ message: 'Success' });
res.status(201).json({ id: 1, name: 'John' });
res.status(400).json({ error: 'Name is required' });
res.status(404).json({ error: 'User not found' });
res.sendStatus(204);  // No content
```

---

## Route Parameters

### URL Parameters (req.params)

```javascript
// Single parameter
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ userId: id });
});

// Multiple parameters
app.get('/api/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.json({ userId, postId });
});

// Optional parameters (Express 4.x+)
app.get('/api/users/:id?', (req, res) => {
    if (req.params.id) {
        res.json({ userId: req.params.id });
    } else {
        res.json({ message: 'All users' });
    }
});
```

### Query Parameters (req.query)

```javascript
// Basic query
app.get('/api/users', (req, res) => {
    const { page, limit } = req.query;
    res.json({ page, limit });
});

// Filtering
app.get('/api/products', (req, res) => {
    const { category, minPrice, maxPrice, inStock } = req.query;
    let filtered = products;
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    if (minPrice) {
        filtered = filtered.filter(p => p.price >= minPrice);
    }
    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= maxPrice);
    }
    if (inStock === 'true') {
        filtered = filtered.filter(p => p.inStock);
    }
    
    res.json(filtered);
});
```

---

## Middleware

### What is Middleware?

Middleware functions execute during the request-response cycle, before the final route handler.

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
              ↓               ↓
          Can modify req/res, end request, or call next()
```

### Built-in Middleware

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Serve static files with prefix
app.use('/static', express.static('public'));
```

### Custom Middleware

```javascript
// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Verify token logic
    req.user = { id: 1, name: 'John' };
    next();
};

// Use in specific routes
app.get('/api/profile', authenticate, (req, res) => {
    res.json(req.user);
});
```

### Error Handling Middleware

```javascript
// Must have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
```

### 404 Handler (Must be last)

```javascript
// Catch all unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});
```

---

## Router

Organize routes into separate modules.

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ users: [] });
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id });
});

router.post('/', (req, res) => {
    res.status(201).json({ created: true });
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

---

## Complete CRUD API Example

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage
let items = [];
let nextId = 1;

// CREATE
app.post('/api/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = { id: nextId++, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// READ all
app.get('/api/items', (req, res) => {
    res.json(items);
});

// READ one
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

// UPDATE
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = items.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    
    items[index] = { ...items[index], name };
    res.json(items[index]);
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    
    items.splice(index, 1);
    res.status(204).send();
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(3000, () => console.log('Server running'));
```

---

## Testing with cURL

```bash
# GET all
curl http://localhost:3000/api/items

# GET one
curl http://localhost:3000/api/items/1

# POST
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item"}'

# PUT
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item"}'

# DELETE
curl -X DELETE http://localhost:3000/api/items/1
```

---

## Quick Reference

### Server Setup
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);
```

### Routes
```javascript
app.get('/path', handler)
app.post('/path', handler)
app.put('/path/:id', handler)
app.delete('/path/:id', handler)
```

### Middleware
```javascript
app.use(customMiddleware)
app.use(express.json())
app.use((req, res, next) => { next() })
```

### Response
```javascript
res.send()
res.json()
res.status(code)
res.status(code).json(data)
```

### Request Data
```javascript
req.params    // URL parameters
req.query     // Query string
req.body      // Request body
req.headers   // Headers
