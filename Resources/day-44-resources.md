# 📚 Day 44 Resources - Express.js & REST APIs

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| Express.js Official Docs | https://expressjs.com/ |
| Express.js Guide | https://expressjs.com/en/guide/routing.html |
| Express.js API Reference | https://expressjs.com/en/api.html |
| Express.js Middleware | https://expressjs.com/en/guide/using-middleware.html |
| Node.js HTTP Module | https://nodejs.org/api/http.html |
| REST API Tutorial | https://restfulapi.net/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Express.js Crash Course | https://youtu.be/6FoM3U6cL5U |
| REST APIs with Express | https://youtu.be/pKd0Rpw7O48 |
| Express Middleware Tutorial | https://youtu.be/lY6icfhap2w |
| Postman Tutorial | https://youtu.be/VywxIQ2ZXw4 |

## 🛠️ Tools for Testing APIs

| Tool | Purpose | Link |
|------|---------|------|
| Postman | API testing | https://postman.com |
| REST Client (VS Code) | Test APIs in VS Code | VS Code Extensions |
| Insomnia | API client | https://insomnia.rest |
| cURL | Command-line HTTP client | Built into most systems |
| HTTPie | Modern cURL alternative | https://httpie.io |

## 📝 Express.js Cheatsheet

### Basic Server
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);
```

### Routes
```javascript
app.get('/api/data', (req, res) => res.json(data));
app.post('/api/data', (req, res) => res.status(201).json(req.body));
app.put('/api/data/:id', (req, res) => res.json({ id: req.params.id }));
app.delete('/api/data/:id', (req, res) => res.sendStatus(204));
```

### Request Data
```javascript
req.params   // URL parameters: /users/:id
req.query    // Query string: ?page=2
req.body     // JSON body
req.headers  // Headers
```

### Response Methods
```javascript
res.send()
res.json()
res.status(404).json({ error: 'Not found' })
res.sendStatus(204)
res.redirect('/login')
```

## ✅ HTTP Status Codes Cheatsheet

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing auth |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource missing |
| 500 | Server Error | Server problem |

## 🎯 Common Middleware

```javascript
// JSON parser
app.use(express.json());

// URL-encoded parser
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Cannot GET /` | Route not defined | Add `app.get('/')` handler |
| `req.body is undefined` | Missing JSON middleware | Add `app.use(express.json())` |
| Port already in use | Another process using port | Change PORT or kill process |
| CORS error | Cross-origin request | Add `cors` middleware |
| 404 for static files | Wrong path | Check `express.static()` path |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Express.js Best Practices | https://expressjs.com/en/advanced/best-practice-performance.html |
| API Security | https://expressjs.com/en/advanced/best-practice-security.html |
| Database Integration | https://expressjs.com/en/guide/database-integration.html |
| Deployment | https://expressjs.com/en/advanced/pm.html |

