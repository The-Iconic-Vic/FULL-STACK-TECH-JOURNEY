# 📘 Async Patterns Reference

## Loading State Pattern

```javascript
class DataLoader {
    constructor() {
        this.isLoading = false;
        this.error = null;
        this.data = null;
    }
    
    async load() {
        this.isLoading = true;
        this.error = null;
        
        try {
            this.data = await fetchData();
        } catch (error) {
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    }
}

// React-style hook (conceptual)
function useData(fetchFn) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const result = await fetchFn();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    
    return { data, loading, error };
}
Retry Pattern
Basic Retry
javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage
const data = await retry(() => fetch('/api/unstable'), 5, 2000);
Exponential Backoff
javascript
async function retryWithBackoff(fn, maxAttempts = 5) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) throw error;
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
Retry with Condition
javascript
async function retryIf(fn, shouldRetry, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await fn();
            if (!shouldRetry(result)) return result;
        } catch (error) {
            if (attempt === maxAttempts) throw error;
        }
    }
}
Timeout Pattern
Basic Timeout
javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    });
}

async function withTimeout(promise, ms) {
    return Promise.race([promise, timeout(ms)]);
}

// Usage
try {
    const data = await withTimeout(fetch('/api/data'), 5000);
    console.log(data);
} catch (error) {
    console.error('Request timed out');
}
Timeout with Cleanup
javascript
function timeoutWithCleanup(ms, cleanup) {
    return new Promise((_, reject) => {
        const id = setTimeout(() => {
            cleanup();
            reject(new Error(`Timeout after ${ms}ms`));
        }, ms);
        
        return () => clearTimeout(id);
    });
}
Debounce Pattern
javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Async debounce (waits for promise to resolve)
function debounceAsync(func, delay) {
    let timeoutId;
    let pendingPromise = null;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                try {
                    const result = await func.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}
Throttle Pattern
javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Async throttle (prevents overlapping calls)
function throttleAsync(func, limit) {
    let inThrottle = false;
    let pending = null;
    
    return async function(...args) {
        if (inThrottle) {
            pending = { args, resolve: null, reject: null };
            return new Promise((resolve, reject) => {
                pending.resolve = resolve;
                pending.reject = reject;
            });
        }
        
        inThrottle = true;
        
        try {
            const result = await func.apply(this, args);
            if (pending) {
                const { args: pendingArgs, resolve, reject } = pending;
                pending = null;
                try {
                    const result = await func.apply(this, pendingArgs);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
            return result;
        } finally {
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}
Cache Pattern
Basic Cache
javascript
class AsyncCache {
    constructor(ttl = 60000) {  // 1 minute default
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    async get(key, fetchFn) {
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.value;
        }
        
        const value = await fetchFn();
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
        
        return value;
    }
    
    invalidate(key) {
        this.cache.delete(key);
    }
    
    clear() {
        this.cache.clear();
    }
}

// Usage
const cache = new AsyncCache(30000);  // 30 second TTL
const user = await cache.get(`user:${userId}`, () => fetchUser(userId));
Memoization
javascript
function memoize(asyncFn) {
    const cache = new Map();
    
    return async function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = await asyncFn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const fetchUser = memoize(async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
});
Queue Pattern
Sequential Queue
javascript
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.processing) return;
        if (this.queue.length === 0) return;
        
        this.processing = true;
        const { task, resolve, reject } = this.queue.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.processing = false;
            this.process();
        }
    }
}

// Usage
const queue = new AsyncQueue();
queue.add(() => fetch('/api/1'));
queue.add(() => fetch('/api/2'));
queue.add(() => fetch('/api/3'));
Rate Limiter
javascript
class RateLimiter {
    constructor(limitPerSecond = 10) {
        this.limit = limitPerSecond;
        this.interval = 1000 / limitPerSecond;
        this.lastCall = 0;
    }
    
    async throttle() {
        const now = Date.now();
        const wait = Math.max(0, this.interval - (now - this.lastCall));
        
        if (wait > 0) {
            await new Promise(resolve => setTimeout(resolve, wait));
        }
        
        this.lastCall = Date.now();
    }
    
    async execute(fn) {
        await this.throttle();
        return fn();
    }
}

// Usage
const limiter = new RateLimiter(5);  // 5 requests per second
const results = await Promise.all(
    urls.map(url => limiter.execute(() => fetch(url)))
);
Polling Pattern
javascript
async function poll(fn, interval = 1000, maxAttempts = null) {
    let attempts = 0;
    
    while (maxAttempts === null || attempts < maxAttempts) {
        try {
            const result = await fn();
            if (result.isComplete) return result.data;
        } catch (error) {
            console.error('Polling error:', error);
        }
        
        await new Promise(resolve => setTimeout(resolve, interval));
        attempts++;
    }
    
    throw new Error('Max polling attempts reached');
}

// Usage
const result = await poll(async () => {
    const response = await fetch('/api/job/status');
    const data = await response.json();
    return { isComplete: data.status === 'complete', data };
}, 2000, 30);
Batch Processing Pattern
javascript
async function batchProcess(items, processFn, batchSize = 10) {
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(processFn));
        results.push(...batchResults);
    }
    
    return results;
}

// Usage
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await batchProcess(userIds, fetchUser, 3);