# 📚 Day 24 Resources - Fetch API

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Fetch API | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |
| MDN: Using Fetch | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch |
| MDN: Response | https://developer.mozilla.org/en-US/docs/Web/API/Response |
| MDN: Request | https://developer.mozilla.org/en-US/docs/Web/API/Request |
| MDN: Headers | https://developer.mozilla.org/en-US/docs/Web/API/Headers |
| MDN: HTTP Methods | https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods |
| MDN: HTTP Status Codes | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status |
| JavaScript.info: Fetch | https://javascript.info/fetch |
| W3Schools: Fetch API | https://www.w3schools.com/js/js_api_fetch.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Fetch API Tutorial | https://youtu.be/ubw2y7Y4D8Q |
| Async/Await with Fetch | https://youtu.be/VK0rXH8Q0iA |
| Fetch API Crash Course | https://youtu.be/6yTSU4McIt4 |
| Working with APIs | https://youtu.be/0vRmN1t5mYE |
| HTTP Methods Explained | https://youtu.be/2JYT5f2isg4 |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Postman | Test APIs | https://postman.com |
| Insomnia | API testing | https://insomnia.rest |
| JSONPlaceholder | Fake API for testing | https://jsonplaceholder.typicode.com |
| Random User API | Fake user data | https://randomuser.me |
| Dog CEO API | Random dog images | https://dog.ceo/dog-api |
| Quote API | Random quotes | https://quotable.io |
| Public APIs List | Find free APIs | https://github.com/public-apis/public-apis |

## 📝 Fetch Cheatsheet

### GET Request
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

### POST Request
```javascript
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}
```

### PUT Request
```javascript
async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}
```

### DELETE Request
```javascript
async function deleteData(url) {
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok;
}
```

## 📝 Response Object Cheatsheet

| Property/Method | Description |
|-----------------|-------------|
| `response.ok` | True if status 200-299 |
| `response.status` | HTTP status code |
| `response.statusText` | Status message |
| `response.headers.get('name')` | Get header value |
| `response.json()` | Parse as JSON |
| `response.text()` | Parse as text |
| `response.blob()` | Parse as blob (images) |
| `response.clone()` | Clone for multiple reads |

## 📝 HTTP Status Codes Cheatsheet

### Success (2xx)
| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |

### Client Errors (4xx)
| Code | Meaning |
|------|---------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |

### Server Errors (5xx)
| Code | Meaning |
|------|---------|
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

## ✅ Practice APIs (No API Key)

| API | Endpoint | Use |
|-----|----------|-----|
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/posts` | Fake posts |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/users` | Fake users |
| Random User | `https://randomuser.me/api/` | Random user |
| Dog CEO | `https://dog.ceo/api/breeds/image/random` | Random dog |
| Quote API | `https://api.quotable.io/random` | Random quote |
| Joke API | `https://official-joke-api.appspot.com/random_joke` | Random joke |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS error | Different origin | Use proxy or API that supports CORS |
| 404 error | Wrong URL | Check endpoint path |
| 401 error | Missing auth | Add API key/token |
| Network error | Offline or CORS | Check connection |
| Response not JSON | Wrong Content-Type | Use `.text()` instead |
| Empty response | Wrong method | Check if using correct HTTP method |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| CORS Explained | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS |
| Working with APIs | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs |
| REST API Tutorial | https://restfulapi.net |
| Async/Await with Fetch | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await |

