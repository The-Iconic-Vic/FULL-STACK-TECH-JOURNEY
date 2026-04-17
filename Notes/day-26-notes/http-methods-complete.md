# 📘 HTTP Methods Complete Reference

## HTTP Methods Overview

| Method | CRUD | Purpose | Body | Idempotent | Safe |
|--------|------|---------|------|-------------|------|
| GET | Read | Retrieve data | No | Yes | Yes |
| POST | Create | Create new resource | Yes | No | No |
| PUT | Update | Replace entire resource | Yes | Yes | No |
| PATCH | Update | Partial update | Yes | No | No |
| DELETE | Delete | Remove resource | Maybe | Yes | No |
| HEAD | Read | Headers only | No | Yes | Yes |
| OPTIONS | Read | Allowed methods | No | Yes | Yes |

---

## GET Request

Used to retrieve data from the server.

```javascript
// GET with fetch
const response = await fetch('/api/users');
const users = await response.json();

// GET with query parameters
const response = await fetch('/api/users?page=2&limit=10');

// GET with headers (authentication)
const response = await fetch('/api/users/me', {
    headers: { 'Authorization': 'Bearer token123' }
});
Characteristics:

Data sent in URL (query parameters)

Can be cached

Remains in browser history

Can be bookmarked

Should NOT be used for sensitive data

POST Request
Used to create new resources.

javascript
const newUser = {
    name: 'Victor',
    email: 'victor@example.com'
};

const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
});

const created = await response.json();
console.log('Created user ID:', created.id);
Characteristics:

Data sent in request body

Not cached by default

Not stored in history

No length limitations

Can send sensitive data

PUT Request
Used to replace an entire resource.

javascript
// PUT requires ALL fields
const updatedUser = {
    id: 1,
    name: 'Victor Updated',
    email: 'newemail@example.com',
    age: 26  // Must include all fields
};

const response = await fetch('/api/users/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
});

const user = await response.json();
Important: Missing fields may be deleted or set to null.

PATCH Request
Used for partial updates (only changed fields).

javascript
// PATCH only needs changed fields
const updates = {
    name: 'Victor New Name'  // Only the field to change
};

const response = await fetch('/api/users/1', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
});

const user = await response.json();
When to use PATCH:

Updating only a few fields

When you don't have the complete resource

To avoid overwriting other fields

DELETE Request
Used to remove resources.

javascript
const response = await fetch('/api/users/1', {
    method: 'DELETE'
});

if (response.ok) {
    console.log('User deleted');
}

// Some APIs return 204 No Content
if (response.status === 204) {
    console.log('Deleted successfully');
}
Complete CRUD Example
javascript
class UserAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    // CREATE - POST
    async create(user) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return await response.json();
    }
    
    // READ - GET
    async get(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        return await response.json();
    }
    
    // READ ALL - GET
    async getAll() {
        const response = await fetch(`${this.baseURL}/users`);
        return await response.json();
    }
    
    // UPDATE (full) - PUT
    async update(id, user) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return await response.json();
    }
    
    // UPDATE (partial) - PATCH
    async patch(id, updates) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return await response.json();
    }
    
    // DELETE - DELETE
    async delete(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
}

// Usage
const api = new UserAPI('https://jsonplaceholder.typicode.com');

// Create
const newUser = await api.create({ name: 'Victor', email: 'vic@example.com' });

// Read
const user = await api.get(newUser.id);

// Update (partial)
await api.patch(newUser.id, { name: 'Victor Updated' });

// Delete
await api.delete(newUser.id);
Idempotency Explained
Method	Idempotent?	Explanation
GET	Yes	Multiple requests return same data
POST	No	Each request creates a new resource
PUT	Yes	Same request results in same state
PATCH	No	Multiple patches may have different results
DELETE	Yes	Deleting same resource multiple times has same effect
javascript
// POST - NOT idempotent (creates new each time)
await fetch('/api/posts', { method: 'POST', body: JSON.stringify(post) });
await fetch('/api/posts', { method: 'POST', body: JSON.stringify(post) });
// Creates TWO posts

// PUT - Idempotent (same result each time)
await fetch('/api/posts/1', { method: 'PUT', body: JSON.stringify(post) });
await fetch('/api/posts/1', { method: 'PUT', body: JSON.stringify(post) });
// Post is updated to same state both times
RESTful API Patterns
URL	GET	POST	PUT	PATCH	DELETE
/users	List users	Create user	Bulk update	N/A	Bulk delete
/users/1	Get user 1	Error	Replace user 1	Update user 1	Delete user 1
/users/1/posts	User's posts	Create post	Bulk update	N/A	Bulk delete
/posts/1	Get post 1	Error	Replace post 1	Update post 1	Delete post 1
Choosing the Right Method
javascript
// ✅ CORRECT usage
GET    → /api/posts          // List posts
GET    → /api/posts/1        // Get post 1
POST   → /api/posts          // Create new post
PUT    → /api/posts/1        // Replace post 1 entirely
PATCH  → /api/posts/1        // Update post 1 title
DELETE → /api/posts/1        // Delete post 1

// ❌ INCORRECT usage
POST   → /api/posts/1        // Should use PUT/PATCH
GET    → /api/posts/create   // Should use POST
PUT    → /api/posts          // Should use POST for creation