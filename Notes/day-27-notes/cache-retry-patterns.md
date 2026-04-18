# 📘 Cache & Retry Patterns

## Caching Strategies

### Memory Cache (Temporary)
```javascript
class MemoryCache {
    constructor() {
        this.cache = new Map();
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (item.expires && Date.now() > item.expires) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }
    
    set(key, value, ttlMs = 60000) {
        this.cache.set(key, {
            value: value,
            expires: Date.now() + ttlMs
        });
    }
    
    clear() {
        this.cache.clear();
    }
}
LocalStorage Cache (Persistent)
javascript
class PersistentCache {
    constructor(prefix = 'app_cache_', defaultTTL = 3600000) {
        this.prefix = prefix;
        this.defaultTTL = defaultTTL;
    }
    
    getKey(key) {
        return `${this.prefix}${key}`;
    }
    
    set(key, value, ttlMs = this.defaultTTL) {
        const cacheData = {
            timestamp: Date.now(),
            ttl: ttlMs,
            value: value
        };
        localStorage.setItem(this.getKey(key), JSON.stringify(cacheData));
    }
    
    get(key) {
        const cached = localStorage.getItem(this.getKey(key));
        if (!cached) return null;
        
        const { timestamp, ttl, value } = JSON.parse(cached);
        if (Date.now() - timestamp > ttl) {
            this.delete(key);
            return null;
        }
        
        return value;
    }
    
    delete(key) {
        localStorage.removeItem(this.getKey(key));
    }
    
    clear() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        }
    }
}
Stale-While-Revalidate Pattern
javascript
class StaleWhileRevalidateCache {
    constructor(cacheKey, fetchFn, ttlMs = 3600000) {
        this.cacheKey = cacheKey;
        this.fetchFn = fetchFn;
        this.ttlMs = ttlMs;
    }
    
    async get() {
        const cached = this.getFromCache();
        const isStale = cached && (Date.now() - cached.timestamp > this.ttlMs);
        
        // Return cached data immediately
        if (cached) {
            // Revalidate in background if stale
            if (isStale) {
                this.revalidate();
            }
            return cached.value;
        }
        
        // No cache, fetch fresh
        return this.revalidate();
    }
    
    getFromCache() {
        const cached = localStorage.getItem(this.cacheKey);
        if (!cached) return null;
        return JSON.parse(cached);
    }
    
    async revalidate() {
        try {
            const freshData = await this.fetchFn();
            this.saveToCache(freshData);
            return freshData;
        } catch (error) {
            console.error('Revalidation failed:', error);
            const cached = this.getFromCache();
            if (cached) return cached.value;
            throw error;
        }
    }
    
    saveToCache(data) {
        const cacheData = {
            timestamp: Date.now(),
            value: data
        };
        localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    }
}
Request Deduplication
javascript
class RequestDeduplicator {
    constructor() {
        this.pending = new Map();
    }
    
    async fetch(url, options = {}) {
        const key = `${options.method || 'GET'}:${url}`;
        
        // If request is already in progress, return existing promise
        if (this.pending.has(key)) {
            return this.pending.get(key);
        }
        
        // Start new request
        const promise = fetch(url, options)
            .then(response => response.json())
            .finally(() => {
                this.pending.delete(key);
            });
        
        this.pending.set(key, promise);
        return promise;
    }
}

// Usage
const deduper = new RequestDeduplicator();

// Multiple calls to same URL will only make one request
Promise.all([
    deduper.fetch('/api/data'),
    deduper.fetch('/api/data'),
    deduper.fetch('/api/data')
]);
Queue for Offline Operations
javascript
class OfflineQueue {
    constructor(storageKey = 'offline_queue') {
        this.storageKey = storageKey;
        this.queue = this.load();
        this.setupSync();
    }
    
    load() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    }
    
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    }
    
    add(operation) {
        this.queue.push({
            ...operation,
            id: Date.now(),
            timestamp: Date.now()
        });
        this.save();
        
        // Try to process immediately if online
        if (navigator.onLine) {
            this.process();
        }
    }
    
    async process() {
        if (!navigator.onLine) return;
        
        for (let i = this.queue.length - 1; i >= 0; i--) {
            const operation = this.queue[i];
            try {
                await this.execute(operation);
                this.queue.splice(i, 1);
                this.save();
            } catch (error) {
                console.error('Queue operation failed:', error);
            }
        }
    }
    
    async execute(operation) {
        const response = await fetch(operation.url, {
            method: operation.method,
            headers: operation.headers,
            body: operation.body
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return response.json();
    }
    
    setupSync() {
        window.addEventListener('online', () => {
            this.process();
        });
    }
}

// Usage
const queue = new OfflineQueue();

async function submitForm(data) {
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        // Save to queue for later
        queue.add({
            url: '/api/submit',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        throw new Error('Saved offline. Will sync when online.');
    }
}
Exponential Backoff Calculator
javascript
class BackoffCalculator {
    constructor(baseDelay = 1000, maxDelay = 30000) {
        this.baseDelay = baseDelay;
        this.maxDelay = maxDelay;
    }
    
    calculate(attempt) {
        const delay = this.baseDelay * Math.pow(2, attempt - 1);
        const jitter = delay * 0.1 * (Math.random() - 0.5);
        return Math.min(delay + jitter, this.maxDelay);
    }
}

// Usage
const backoff = new BackoffCalculator(1000, 30000);

async function fetchWithSmartBackoff(url, maxRetries = 5) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            
            const delay = backoff.calculate(attempt);
            console.log(`Retry ${attempt} in ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
Circuit Breaker Pattern
javascript
class CircuitBreaker {
    constructor(failureThreshold = 5, timeout = 60000) {
        this.failureThreshold = failureThreshold;
        this.timeout = timeout;
        this.failures = 0;
        this.state = 'CLOSED';  // CLOSED, OPEN, HALF_OPEN
        this.lastFailureTime = null;
    }
    
    async call(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
                console.log('Circuit breaker: HALF_OPEN');
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        if (this.state === 'HALF_OPEN') {
            this.state = 'CLOSED';
            this.failures = 0;
            console.log('Circuit breaker: CLOSED');
        }
        this.failures = 0;
    }
    
    onFailure() {
        this.failures++;
        this.lastFailureTime = Date.now();
        
        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
            console.log('Circuit breaker: OPEN');
        }
    }
}

// Usage
const breaker = new CircuitBreaker(3, 30000);

async function fetchWithBreaker(url) {
    return breaker.call(() => fetch(url).then(r => r.json()));
}