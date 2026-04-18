# 📅 Day 27: Error Handling & Robust API Integration

**Date:** April 18, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Error Types, Robust Error Handling, Retry Logic, Loading States, Caching

---

## 📋 Learning Objectives

- ✅ Identify different types of errors (network, HTTP, parsing, rate limiting)
- ✅ Implement comprehensive try/catch error handling
- ✅ Check `response.ok` before parsing
- ✅ Add retry logic for failed requests
- ✅ Display user-friendly error messages
- ✅ Implement loading spinners and disable buttons during requests
- ✅ Show "No results" messages for empty searches
- ✅ Cache successful responses for offline use

---

## 🚨 Part 1: Types of Errors

### Error Categories

| Category | Examples | Detection |
|----------|----------|-----------|
| **Network Errors** | Offline, DNS failure, CORS | `fetch()` rejects, `error.name === 'TypeError'` |
| **HTTP Errors** | 404 Not Found, 500 Server Error | `response.ok === false`, check `response.status` |
| **API Errors** | Rate limiting, Invalid API key | Custom error messages in response body |
| **Parsing Errors** | Invalid JSON | `JSON.parse()` throws |

```javascript
// Different error types in practice
try {
    const response = await fetch(url);
    
    // HTTP error (4xx, 5xx)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parsing error
    const data = await response.json();
    
} catch (error) {
    if (error.name === 'TypeError') {
        // Network error (offline, DNS, CORS)
        console.log('Network error:', error);
    } else if (error.message.includes('HTTP')) {
        // HTTP error
        console.log('HTTP error:', error);
    } else if (error.message.includes('JSON')) {
        // Parsing error
        console.log('JSON parse error:', error);
    } else {
        // Unknown error
        console.log('Unknown error:', error);
    }
}
```

---

### Network Errors

```javascript
async function checkNetworkStatus() {
    if (!navigator.onLine) {
        throw new Error('No internet connection');
    }
    
    try {
        await fetch('https://httpstat.us/200');
    } catch (error) {
        // Network error (DNS, CORS, etc.)
        throw new Error('Network error - check your connection');
    }
}
```

### HTTP Errors by Status Code

| Code | Meaning | User Message |
|------|---------|--------------|
| 400 | Bad Request | "Invalid request. Please check your input." |
| 401 | Unauthorized | "Please log in to continue." |
| 403 | Forbidden | "You don't have permission to access this." |
| 404 | Not Found | "The requested resource was not found." |
| 429 | Too Many Requests | "Rate limit exceeded. Please wait a moment." |
| 500 | Internal Server Error | "Server error. Please try again later." |
| 503 | Service Unavailable | "Service is temporarily unavailable." |

---

## 🛡️ Part 2: Robust Error Handling

### Complete Error Handling Pattern

```javascript
async function robustFetch(url, options = {}) {
    try {
        // Check network status
        if (!navigator.onLine) {
            throw new Error('OFFLINE');
        }
        
        // Make request with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Check HTTP status
        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}`);
            error.status = response.status;
            throw error;
        }
        
        // Parse JSON
        const data = await response.json();
        return { success: true, data };
        
    } catch (error) {
        if (error.name === 'AbortError') {
            return { success: false, error: 'timeout', message: 'Request timed out' };
        }
        
        if (error.message === 'OFFLINE') {
            return { success: false, error: 'offline', message: 'No internet connection' };
        }
        
        if (error.name === 'TypeError') {
            return { success: false, error: 'network', message: 'Network error' };
        }
        
        if (error.status === 404) {
            return { success: false, error: 'notfound', message: 'Resource not found' };
        }
        
        if (error.status === 429) {
            return { success: false, error: 'ratelimit', message: 'Rate limit exceeded' };
        }
        
        if (error.status >= 500) {
            return { success: false, error: 'server', message: 'Server error' };
        }
        
        return { success: false, error: 'unknown', message: error.message };
    }
}
```

---

### Retry Logic with Exponential Backoff

```javascript
async function fetchWithRetry(url, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                // Don't retry client errors (4xx except 429)
                if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                    throw new Error(`HTTP ${response.status}`);
                }
                throw new Error(`Retryable error: ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            const isLastAttempt = attempt === maxRetries;
            
            if (isLastAttempt) {
                throw error;
            }
            
            // Exponential backoff: 1s, 2s, 4s, etc.
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

---

### Error Classification Function

```javascript
function classifyError(error) {
    const message = error.message.toLowerCase();
    
    // Network errors
    if (!navigator.onLine || message.includes('offline')) {
        return {
            type: 'network',
            userMessage: '📡 No internet connection. Please check your network.',
            icon: '📡'
        };
    }
    
    if (message.includes('fetch') || message.includes('network')) {
        return {
            type: 'network',
            userMessage: '🌐 Network error. Please check your connection.',
            icon: '🌐'
        };
    }
    
    // HTTP errors
    if (message.includes('404')) {
        return {
            type: 'notfound',
            userMessage: '🔍 Resource not found. The requested data does not exist.',
            icon: '🔍'
        };
    }
    
    if (message.includes('429')) {
        return {
            type: 'ratelimit',
            userMessage: '⏰ Too many requests. Please wait a moment and try again.',
            icon: '⏰'
        };
    }
    
    if (message.includes('500')) {
        return {
            type: 'server',
            userMessage: '⚠️ Server error. Please try again later.',
            icon: '⚠️'
        };
    }
    
    // Parsing errors
    if (message.includes('json')) {
        return {
            type: 'parse',
            userMessage: '📄 Invalid response format. The server returned malformed data.',
            icon: '📄'
        };
    }
    
    // Timeout
    if (message.includes('timeout')) {
        return {
            type: 'timeout',
            userMessage: '⏱️ Request timed out. The server is taking too long to respond.',
            icon: '⏱️'
        };
    }
    
    // Unknown
    return {
        type: 'unknown',
        userMessage: `❌ An error occurred: ${error.message}`,
        icon: '❌'
    };
}
```

---

## ⏳ Part 3: Loading & Empty States

### Loading States

```javascript
function showLoading() {
    // Show spinner
    loadingSpinner.classList.remove('hidden');
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';
    
    // Clear previous results
    resultsContainer.innerHTML = '';
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
}
```

### Loading Skeleton

```javascript
function showSkeleton() {
    const skeletonHTML = `
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
        </div>
    `.repeat(6);
    
    container.innerHTML = `<div class="skeleton-grid">${skeletonHTML}</div>`;
}
```

### Empty States

```javascript
function showEmptyState(message = 'No results found') {
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <p>${escapeHtml(message)}</p>
            <button onclick="retrySearch()" class="retry-btn">Try Again</button>
        </div>
    `;
}
```

### Error UI with Retry

```javascript
function showErrorUI(error) {
    const { userMessage, icon } = classifyError(error);
    
    container.innerHTML = `
        <div class="error-state">
            <div class="error-icon">${icon}</div>
            <h3>Something went wrong</h3>
            <p>${escapeHtml(userMessage)}</p>
            <button onclick="retry()" class="retry-btn">🔄 Retry</button>
        </div>
    `;
}
```

---

## 💾 Part 4: Caching for Offline Support

### Simple Cache with Expiration

```javascript
class APICache {
    constructor(expirationMinutes = 60) {
        this.expirationMs = expirationMinutes * 60 * 1000;
    }
    
    getKey(endpoint, params = {}) {
        return `api_cache_${endpoint}_${JSON.stringify(params)}`;
    }
    
    set(endpoint, data, params = {}) {
        const key = this.getKey(endpoint, params);
        const cacheData = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    }
    
    get(endpoint, params = {}) {
        const key = this.getKey(endpoint, params);
        const cached = localStorage.getItem(key);
        
        if (!cached) return null;
        
        const cacheData = JSON.parse(cached);
        const isExpired = Date.now() - cacheData.timestamp > this.expirationMs;
        
        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }
        
        return cacheData.data;
    }
    
    clear() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('api_cache_')) {
                localStorage.removeItem(key);
            }
        }
    }
}
```

### API Client with Cache

```javascript
class CachedAPIClient {
    constructor(cacheExpirationMinutes = 60) {
        this.cache = new APICache(cacheExpirationMinutes);
    }
    
    async fetch(endpoint, options = {}) {
        const useCache = options.cache !== false;
        const cacheParams = { method: options.method || 'GET' };
        
        // Try cache first
        if (useCache && (!options.method || options.method === 'GET')) {
            const cached = this.cache.get(endpoint, cacheParams);
            if (cached) {
                console.log('Cache hit');
                return { data: cached, fromCache: true };
            }
        }
        
        try {
            const response = await fetch(endpoint, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache successful GET requests
            if (useCache && (!options.method || options.method === 'GET')) {
                this.cache.set(endpoint, data, cacheParams);
            }
            
            return { data, fromCache: false };
            
        } catch (error) {
            // Try to get expired cache as fallback
            const expiredCache = this.getExpiredCache(endpoint, cacheParams);
            if (expiredCache) {
                console.log('Using expired cache (offline fallback)');
                return { data: expiredCache, fromCache: true, expired: true };
            }
            
            throw error;
        }
    }
    
    getExpiredCache(endpoint, params) {
        const key = this.cache.getKey(endpoint, params);
        const cached = localStorage.getItem(key);
        if (cached) {
            return JSON.parse(cached).data;
        }
        return null;
    }
}
```

---

## 📝 Quick Reference

### Error Handling Checklist

```javascript
// 1. Check network status
if (!navigator.onLine) { /* handle offline */ }

// 2. Use try/catch
try { /* fetch */ } catch (error) { /* handle */ }

// 3. Check response.ok
if (!response.ok) { throw new Error(`HTTP ${response.status}`); }

// 4. Handle JSON parsing
try { const data = await response.json(); } catch { /* invalid JSON */ }

// 5. Classify errors for user messages
const { userMessage } = classifyError(error);
```

### Retry Pattern
```javascript
for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        return await fetch(url);
    } catch (error) {
        if (attempt === maxRetries) throw error;
        await delay(1000 * attempt);
    }
}
```

### Cache Pattern
```javascript
// Save
localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));

// Load
const cached = localStorage.getItem(key);
if (cached && (Date.now() - data.timestamp) < expiration) {
    return data.data;
}
```

---

## ✅ Day 27 Checklist

- [ ] Identify network vs HTTP vs parsing errors
- [ ] Implement try/catch with async/await
- [ ] Check `response.ok` before parsing
- [ ] Add retry logic for failed requests
- [ ] Display user-friendly error messages
- [ ] Show loading spinners during fetch
- [ ] Disable buttons during requests
- [ ] Show "No results" message for empty searches
- [ ] Add retry button for failed requests
- [ ] Implement caching with expiration
- [ ] Build Resilient API Caller project
- [ ] Build Enhanced Recipe Finder with caching
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Network errors are different from HTTP errors** — one rejects, one resolves
2. **Always check `response.ok`** — don't assume fetch succeeded
3. **Use try/catch with async/await** — cleaner error handling
4. **Retry with exponential backoff** — don't hammer failing servers
5. **Show user-friendly messages** — "404 Not Found" means nothing to users
6. **Loading states improve UX** — users know something is happening
7. **Cache successful responses** — reduces API calls, enables offline viewing
8. **Add retry buttons** — gives users control over recovery

