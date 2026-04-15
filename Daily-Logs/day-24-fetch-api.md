# 📅 Day 24: Fetch API - Getting Data from the Internet

**Date:** April 15, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Fetch API, HTTP Methods, JSON, Public APIs

---

## 📋 Learning Objectives

- ✅ Understand what an API is and why it's useful
- ✅ Use the `fetch()` function to make HTTP requests
- ✅ Understand HTTP methods: GET, POST, PUT, DELETE
- ✅ Work with the Response object (`.json()`, `.text()`, `.ok`)
- ✅ Handle successful and failed responses
- ✅ Differentiate between network errors and HTTP errors
- ✅ Use public APIs like JSONPlaceholder and Random User API

---

## 🌐 Part 1: Fetch API Basics

### What is an API?

API stands for **Application Programming Interface**. It's a way for different software applications to communicate with each other.

```
Your App ←─── HTTP Request ───→ API Server
(Client)                        (Server)
         ←─── JSON Data ───→
```

**Common APIs:**
- Weather API - Get current weather
- Movie API - Search for movies
- Payment API - Process payments
- Social Media API - Post to Twitter

---

### The `fetch()` Function

`fetch()` is a modern way to make HTTP requests in JavaScript.

```javascript
// Basic syntax
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// With async/await (recommended)
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

### HTTP Methods

| Method | Purpose | Use Case |
|--------|---------|----------|
| `GET` | Read data | Fetching posts, users, products |
| `POST` | Create data | Adding a new user, posting a comment |
| `PUT` | Update data | Editing a user profile |
| `DELETE` | Delete data | Removing a post |

```javascript
// GET (default)
const response = await fetch('https://api.example.com/users');

// POST
const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Victor',
        email: 'victor@example.com'
    })
});

// PUT
const response = await fetch('https://api.example.com/users/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Victor Updated'
    })
});

// DELETE
const response = await fetch('https://api.example.com/users/1', {
    method: 'DELETE'
});
```

---

### The Response Object

```javascript
const response = await fetch(url);

// Check if request was successful (status 200-299)
if (response.ok) {
    const data = await response.json();
}

// Get status code
console.log(response.status);  // 200, 404, 500, etc.
console.log(response.statusText);  // "OK", "Not Found", etc.

// Get response headers
console.log(response.headers.get('Content-Type'));

// Parse response as JSON
const jsonData = await response.json();

// Parse response as text
const textData = await response.text();

// Get response as blob (images, files)
const blobData = await response.blob();
```

---

## 📡 Part 2: Handling API Responses

### Checking Response Success

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        // Check if HTTP request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        // Network errors (offline, DNS failure, etc.)
        console.error('Network error:', error);
        throw error;
    }
}
```

### HTTP Status Codes

| Code Range | Meaning | Examples |
|------------|---------|----------|
| 200-299 | Success | 200 OK, 201 Created |
| 300-399 | Redirection | 301 Moved Permanently |
| 400-499 | Client Error | 404 Not Found, 401 Unauthorized |
| 500-599 | Server Error | 500 Internal Server Error |

```javascript
async function handleResponse(url) {
    const response = await fetch(url);
    
    switch(response.status) {
        case 200:
            console.log('Success!');
            return await response.json();
        case 404:
            console.log('Resource not found');
            return null;
        case 401:
            console.log('Unauthorized - please log in');
            break;
        case 500:
            console.log('Server error - try again later');
            break;
        default:
            console.log(`Status: ${response.status}`);
    }
}
```

### Network Errors vs HTTP Errors

```javascript
async function robustFetch(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // HTTP error (4xx, 5xx) - response received but failed
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
        
    } catch (error) {
        if (error.name === 'TypeError') {
            // Network error (offline, DNS, CORS)
            console.error('Network error - check your connection');
        } else {
            // Other error
            console.error('Fetch failed:', error.message);
        }
        throw error;
    }
}
```

---

## 🚀 Part 3: Public APIs to Practice

### JSONPlaceholder (Fake API for Testing)

```javascript
// Base URL: https://jsonplaceholder.typicode.com

// Get all posts
const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
const postsData = await posts.json();

// Get single post
const post = await fetch('https://jsonplaceholder.typicode.com/posts/1');
const postData = await post.json();

// Get user
const user = await fetch('https://jsonplaceholder.typicode.com/users/1');
const userData = await user.json();

// Get comments for post
const comments = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
const commentsData = await comments.json();
```

### Random User Generator

```javascript
// Base URL: https://randomuser.me/api/

// Get one random user
const response = await fetch('https://randomuser.me/api/');
const data = await response.json();
const user = data.results[0];

// Get 5 random users
const response = await fetch('https://randomuser.me/api/?results=5');
const data = await response.json();
const users = data.results;

// Get only male users
const response = await fetch('https://randomuser.me/api/?gender=male');

// Get users from specific countries
const response = await fetch('https://randomuser.me/api/?nat=us,gb,ca');
```

### More Free APIs

| API | Endpoint | Description |
|-----|----------|-------------|
| Dog API | `https://dog.ceo/api/breeds/image/random` | Random dog images |
| Cat API | `https://api.thecatapi.com/v1/images/search` | Random cat images |
| Pokemon API | `https://pokeapi.co/api/v2/pokemon/ditto` | Pokemon data |
| Quote API | `https://api.quotable.io/random` | Random quotes |
| Weather API | `https://api.open-meteo.com/v1/forecast` | Weather data |

---

## 📝 Quick Reference

### Fetch GET Request
```javascript
async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
```

### Fetch POST Request
```javascript
async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
```

### Response Properties
| Property/Method | Description |
|-----------------|-------------|
| `response.ok` | True if status 200-299 |
| `response.status` | HTTP status code |
| `response.statusText` | Status message |
| `response.json()` | Parse as JSON |
| `response.text()` | Parse as text |
| `response.blob()` | Parse as binary |

---

## ✅ Day 24 Checklist

- [ ] Understand what an API is and why it's useful
- [ ] Use `fetch()` to make GET requests
- [ ] Parse JSON responses with `.json()`
- [ ] Check `response.ok` for success
- [ ] Handle HTTP errors (404, 500, etc.)
- [ ] Differentiate network errors from HTTP errors
- [ ] Use JSONPlaceholder for practice
- [ ] Use Random User API for practice
- [ ] Build JSONPlaceholder Demo project
- [ ] Build Random User Generator project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **APIs let apps talk to each other** — fetch data from servers
2. **`fetch()` is promise-based** — use async/await for cleaner code
3. **Always check `response.ok`** — not all responses are successful
4. **HTTP errors (404, 500) are NOT caught by try/catch** — they resolve successfully
5. **Network errors (offline, DNS) ARE caught** — these cause rejections
6. **Use `.json()` to parse JSON responses** — returns a promise
7. **JSONPlaceholder is great for testing** — no API key needed
8. **Public APIs are free to use** — check rate limits and terms
