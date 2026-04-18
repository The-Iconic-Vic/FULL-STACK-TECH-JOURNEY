# 📘 Error Handling Patterns

## Try/Catch Pattern

### Basic Pattern
```javascript
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}
With User Feedback
javascript
async function fetchData() {
    showLoading();
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        showSuccess(data);
        return data;
        
    } catch (error) {
        showError(error.message);
        return null;
        
    } finally {
        hideLoading();
    }
}
Nested Try/Catch
javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        
        try {
            const posts = await fetchPosts(user.id);
            return { user, posts };
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            return { user, posts: [] };
        }
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('User not found');
    }
}
Retry Pattern
Simple Retry
javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            console.log(`Attempt ${attempt} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
Exponential Backoff
javascript
async function fetchWithBackoff(url, maxRetries = 5) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
            console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
Conditional Retry
javascript
async function fetchWithConditionalRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            // Don't retry client errors (4xx except 429)
            if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            if (!response.ok) {
                throw new Error(`Retryable error: ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            if (attempt === maxRetries || !isRetryable(error)) {
                throw error;
            }
            
            await delay(1000 * attempt);
        }
    }
}

function isRetryable(error) {
    return error.message.includes('429') || 
           error.message.includes('500') ||
           error.message.includes('503');
}
Graceful Degradation Pattern
Fallback Data
javascript
async function fetchWithFallback(url, fallbackData) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn('Fetch failed, using fallback:', error);
        return fallbackData;
    }
}
Multiple Fallback URLs
javascript
async function fetchWithFallbackUrls(urls) {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log(`Failed: ${url}`);
        }
    }
    throw new Error('All fallback URLs failed');
}
Cache Fallback
javascript
async function fetchWithCacheFallback(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Cache successful response
        localStorage.setItem(`cache_${url}`, JSON.stringify({
            timestamp: Date.now(),
            data: data
        }));
        
        return data;
        
    } catch (error) {
        // Try to get cached version
        const cached = localStorage.getItem(`cache_${url}`);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            console.warn(`Using cached data from ${new Date(timestamp)}`);
            return data;
        }
        
        throw error;
    }
}
User Feedback Patterns
Toast Notifications
javascript
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Usage
try {
    await fetchData();
    showToast('Data loaded successfully!', 'success');
} catch (error) {
    showToast(error.message, 'error');
}
Error Boundary Component
javascript
class ErrorBoundary {
    constructor(container, fallbackUI) {
        this.container = container;
        this.fallbackUI = fallbackUI;
        this.originalContent = container.innerHTML;
    }
    
    wrap(fn) {
        return async (...args) => {
            try {
                const result = await fn(...args);
                this.reset();
                return result;
            } catch (error) {
                this.showError(error);
                throw error;
            }
        };
    }
    
    showError(error) {
        this.container.innerHTML = this.fallbackUI(error);
    }
    
    reset() {
        this.container.innerHTML = this.originalContent;
    }
}

// Usage
const boundary = new ErrorBoundary(
    document.getElementById('app'),
    (error) => `<div class="error">${error.message}</div>`
);

const safeFetch = boundary.wrap(fetchData);
Loading State Pattern
With Error Recovery
javascript
class DataLoader {
    constructor() {
        this.isLoading = false;
        this.error = null;
        this.data = null;
    }
    
    async load(fetchFn) {
        this.isLoading = true;
        this.error = null;
        this.updateUI();
        
        try {
            this.data = await fetchFn();
        } catch (error) {
            this.error = error;
        } finally {
            this.isLoading = false;
            this.updateUI();
        }
    }
    
    updateUI() {
        if (this.isLoading) {
            this.showLoading();
        } else if (this.error) {
            this.showError(this.error);
        } else if (this.data) {
            this.showData(this.data);
        } else {
            this.showEmpty();
        }
    }
    
    retry(fetchFn) {
        this.load(fetchFn);
    }
}
Global Error Handler
javascript
// Global fetch error handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (event.reason.message?.includes('fetch')) {
        showToast('Network error. Please check your connection.', 'error');
    }
});

// Custom error event
window.addEventListener('app:error', (event) => {
    console.error('App error:', event.detail);
    showToast(event.detail.message, 'error');
});

// Dispatch custom error
function reportError(error) {
    window.dispatchEvent(new CustomEvent('app:error', {
        detail: { message: error.message, stack: error.stack }
    }));
}