# 📚 Day 23 Resources - Async/Await

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Async Function | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function |
| MDN: Await | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await |
| MDN: Promise.all() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all |
| MDN: Promise.allSettled() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled |
| MDN: Promise.race() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race |
| MDN: Promise.any() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any |
| JavaScript.info: Async/Await | https://javascript.info/async-await |
| JavaScript.info: Promise API | https://javascript.info/promise-api |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Async/Await Tutorial | https://youtu.be/VK0rXH8Q0iA |
| JavaScript Async/Await | https://youtu.be/6Yg5P1qN6sQ |
| Promise.all() Explained | https://youtu.be/01YKQ0tJFtE |
| Async/Await vs Promises | https://youtu.be/7f4c7Gbh-Ck |
| Error Handling in Async/Await | https://youtu.be/ITogH7lJTyE |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Debug async/await | Built into Chrome |
| Async/Await Visualizer | See execution flow | https://www.jsv9000.app |
| Promise Visualizer | Visualize Promise states | https://promisesaplus.com |
| Loupe | Event loop visualizer | http://latentflip.com/loupe |

## 📝 Async/Await Cheatsheet

### Basic Syntax
```javascript
// Function declaration
async function myFunction() {
    const result = await somePromise();
    return result;
}

// Arrow function
const myFunction = async () => {
    const result = await somePromise();
    return result;
};

// IIFE
(async () => {
    const data = await fetchData();
    console.log(data);
})();
```

### Error Handling
```javascript
async function example() {
    try {
        const data = await fetchData();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        console.log('Always runs');
    }
}
```

### Parallel Execution
```javascript
// Promise.all - all must succeed
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);

// Promise.allSettled - waits for all, never fails
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);

// Promise.race - first to finish
const winner = await Promise.race([fetchA(), fetchB()]);

// Promise.any - first to succeed
const success = await Promise.any([fetchA(), fetchB(), fetchC()]);
```

## 📝 Promise Combination Methods Cheatsheet

| Method | Waits for | Fails if | Use Case |
|--------|-----------|----------|----------|
| `Promise.all()` | All promises | Any rejects | All operations must succeed |
| `Promise.allSettled()` | All promises | Never | Want all results regardless |
| `Promise.race()` | First to settle | First to reject | Timeout, fastest response |
| `Promise.any()` | First to fulfill | All reject | Fallback APIs |

## ✅ Common Patterns

### Loading State
```javascript
async function loadData() {
    setLoading(true);
    try {
        const data = await fetchData();
        displayData(data);
    } catch (error) {
        showError(error);
    } finally {
        setLoading(false);
    }
}
```

### Sequential vs Parallel
```javascript
// Sequential (slower) - 3.5 seconds
const a = await taskA();  // 1 sec
const b = await taskB();  // 1.5 sec
const c = await taskC();  // 1 sec

// Parallel (faster) - 1.5 seconds
const [a, b, c] = await Promise.all([taskA(), taskB(), taskC()]);
```

### Retry Pattern
```javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxAttempts - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

### Timeout Pattern
```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

async function fetchWithTimeout(promise, ms) {
    return Promise.race([promise, timeout(ms)]);
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `SyntaxError: await is only valid in async function` | `await` outside async | Add `async` to function |
| Promise rejects but no error shown | Missing try/catch | Wrap in try/catch or add `.catch()` |
| Sequential instead of parallel | Using `await` sequentially | Use `Promise.all()` |
| `Promise.all()` fails early | One promise rejects | Use `Promise.allSettled()` |
| Variable is undefined | Async timing issue | Ensure `await` is used |
| Infinite loading | No error handling | Add catch/finally |

## 🎯 Practice Exercises

### Exercise 1: Basic Async/Await
Create an async function that:
- Waits 2 seconds
- Returns "Done"
- Handles potential errors

### Exercise 2: Parallel Fetching
Create a function that fetches 3 different endpoints in parallel using Promise.all()

### Exercise 3: Retry Logic
Implement a function that retries a failing API call up to 3 times

### Exercise 4: Timeout
Add timeout functionality to an async operation (fail after 5 seconds)

### Exercise 5: Race Condition
Use Promise.race() to fetch from multiple CDNs and use the fastest response

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Async/Await Best Practices | https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke |
| Promise Combinators Explained | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition |
| Top-level await | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await |
| Async Iterators | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator |

