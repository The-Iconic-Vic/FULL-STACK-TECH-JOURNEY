# 📚 Day 27 Resources - Error Handling & Robust API Integration

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Fetch Error Handling | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful |
| MDN: Promise.catch() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch |
| MDN: try...catch | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch |
| MDN: Navigator.onLine | https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine |
| MDN: AbortController | https://developer.mozilla.org/en-US/docs/Web/API/AbortController |
| MDN: HTTP Status Codes | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status |
| JavaScript.info: Error Handling | https://javascript.info/error-handling |
| JavaScript.info: Fetch Error Handling | https://javascript.info/fetch#error-handling |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Fetch Error Handling | https://youtu.be/6yTSU4McIt4 |
| Async/Await Error Handling | https://youtu.be/ITogH7lJTyE |
| Retry Logic Tutorial | https://youtu.be/01YKQ0tJFtE |
| Building Resilient APIs | https://youtu.be/3eR3B9yOaE8 |
| Caching API Responses | https://youtu.be/2wCpkOk2uCg |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools Network Tab | Simulate offline, throttling | Built into Chrome |
| httpstat.us | Test HTTP status codes | https://httpstat.us |
| JSONPlaceholder | Test API with error simulation | https://jsonplaceholder.typicode.com |
| RequestBin | Test POST error handling | https://requestbin.com |
| Webhook.site | Test webhook errors | https://webhook.site |

## 📝 Error Types Cheatsheet

### Network Error Detection
```javascript
if (!navigator.onLine) {
    // Offline
}

try {
    await fetch(url);
} catch (error) {
    if (error.name === 'TypeError') {
        // Network error
    }
}
```

### HTTP Status Codes

| Code | Type | User Message |
|------|------|--------------|
| 400 | Bad Request | "Invalid request" |
| 401 | Unauthorized | "Please log in" |
| 403 | Forbidden | "Access denied" |
| 404 | Not Found | "Resource not found" |
| 429 | Too Many Requests | "Rate limit exceeded" |
| 500 | Server Error | "Server error" |
| 503 | Service Unavailable | "Service unavailable" |

## 📝 Error Classification Template

```javascript
function classifyError(error) {
    if (!navigator.onLine) {
        return { type: 'offline', message: 'No internet connection' };
    }
    
    if (error.name === 'TypeError') {
        return { type: 'network', message: 'Network error' };
    }
    
    if (error.message.includes('404')) {
        return { type: 'notfound', message: 'Resource not found' };
    }
    
    if (error.message.includes('429')) {
        return { type: 'ratelimit', message: 'Rate limit exceeded' };
    }
    
    if (error.message.includes('500')) {
        return { type: 'server', message: 'Server error' };
    }
    
    if (error.message.includes('JSON')) {
        return { type: 'parse', message: 'Invalid response format' };
    }
    
    return { type: 'unknown', message: error.message };
}
```

## 📝 Retry Logic Template

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === maxRetries) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * i));
        }
    }
}
```

## 📝 Cache Template

```javascript
class SimpleCache {
    constructor(expirationMinutes = 60) {
        this.expirationMs = expirationMinutes * 60 * 1000;
    }
    
    set(key, data) {
        const cacheData = { timestamp: Date.now(), data };
        localStorage.setItem(key, JSON.stringify(cacheData));
    }
    
    get(key) {
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp > this.expirationMs) {
            localStorage.removeItem(key);
            return null;
        }
        
        return data;
    }
}
```

## ✅ Testing Error Handling

### Simulate Offline
1. Chrome DevTools → Network tab
2. Check "Offline" checkbox
3. Test your app

### Simulate Slow Network
1. Chrome DevTools → Network tab
2. Select "Slow 3G" from throttling dropdown

### Simulate API Errors
```javascript
// Mock function for testing
async function mockAPI(shouldFail = false, statusCode = 500) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (shouldFail) {
        throw new Error(`HTTP ${statusCode}`);
    }
    
    return { data: 'success' };
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `response.json()` fails | Empty response | Check if response has body |
| Infinite retry loop | No max retries | Add maxRetries limit |
| Cache never expires | No timestamp | Add expiration logic |
| Offline detection fails | Cached results | Show cached results with warning |
| User sees technical errors | Raw error messages | Map to user-friendly messages |
| Retry hammering server | No backoff | Add exponential backoff |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Exponential Backoff | https://en.wikipedia.org/wiki/Exponential_backoff |
| Circuit Breaker Pattern | https://martinfowler.com/bliki/CircuitBreaker.html |
| Stale-While-Revalidate | https://web.dev/stale-while-revalidate/ |
| Progressive Web Apps (Offline) | https://web.dev/progressive-web-apps/ |

