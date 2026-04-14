# 📅 Day 23: Async/Await - Modern Promise Syntax

**Date:** April 14, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** async/await, try/catch, Promise.all(), Promise.race(), Promise.allSettled()

---

## 📋 Learning Objectives

- ✅ Use `async` keyword to make functions return Promises
- ✅ Use `await` to pause execution until Promise resolves
- ✅ Handle errors with `try/catch` instead of `.catch()`
- ✅ Run multiple promises in parallel with `Promise.all()`
- ✅ Understand `Promise.race()` and `Promise.allSettled()`
- ✅ Compare sequential vs parallel execution

---

## 🎯 Part 1: Async/Await Fundamentals

### What is Async/Await?

Async/await is syntactic sugar over Promises, making asynchronous code look and behave more like synchronous code.

```javascript
// Promise version
function fetchData() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(user => fetch(`/api/posts/${user.id}`))
        .then(response => response.json())
        .catch(error => console.error(error));
}

// Async/Await version (cleaner!)
async function fetchData() {
    try {
        const response = await fetch('/api/user');
        const user = await response.json();
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        return posts;
    } catch (error) {
        console.error(error);
    }
}
```

---

### The `async` Keyword

When you declare a function with `async`, it automatically returns a Promise.

```javascript
// Regular function returns a value
function regularFunction() {
    return "Hello";
}
console.log(regularFunction());  // "Hello"

// Async function returns a Promise
async function asyncFunction() {
    return "Hello";
}
console.log(asyncFunction());    // Promise {<fulfilled>: "Hello"}

// Both are equivalent:
async function greet() {
    return "Hello";
}
// Is the same as:
function greetPromise() {
    return Promise.resolve("Hello");
}
```

---

### The `await` Keyword

`await` pauses the execution of an async function until a Promise is resolved.

```javascript
async function example() {
    console.log("Start");
    
    // Pauses here until Promise resolves
    const result = await new Promise((resolve) => {
        setTimeout(() => resolve("Done"), 2000);
    });
    
    console.log(result);  // Runs after 2 seconds
    console.log("End");
}

example();
// Output:
// Start
// (2 second pause)
// Done
// End
```

**Important:** `await` can only be used inside an `async` function.

```javascript
// ❌ This causes an error
function example() {
    const result = await somePromise();  // SyntaxError
}

// ✅ This works
async function example() {
    const result = await somePromise();
}
```

---

### Error Handling with `try/catch`

Instead of `.catch()`, use `try/catch` blocks like synchronous code.

```javascript
// Promise version
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/Await version
async function loadData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

**Multiple awaits with single try/catch:**

```javascript
async function loadUserData() {
    try {
        const user = await fetchUser();
        const posts = await fetchPosts(user.id);
        const comments = await fetchComments(posts[0].id);
        console.log(user, posts, comments);
    } catch (error) {
        // Catches ANY error from ANY of the awaits
        console.error("Something went wrong:", error);
    }
}
```

---

## ⚡ Part 2: Running Multiple Async Operations

### Sequential vs Parallel Execution

**Sequential (one after another) - SLOWER**

```javascript
async function sequential() {
    const result1 = await asyncTask1();  // Wait for this
    const result2 = await asyncTask2();  // Then this
    const result3 = await asyncTask3();  // Then this
    return [result1, result2, result3];
}
// Total time = time1 + time2 + time3
```

**Parallel (all at once) - FASTER**

```javascript
async function parallel() {
    const [result1, result2, result3] = await Promise.all([
        asyncTask1(),
        asyncTask2(),
        asyncTask3()
    ]);
    return [result1, result2, result3];
}
// Total time = max(time1, time2, time3)
```

---

### Promise.all()

Runs multiple promises in parallel and waits for ALL to resolve.

```javascript
const [user, posts, friends] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchFriends()
]);
```

**Use cases:**
- Dashboard loading multiple widgets
- User profile with multiple data sources
- Loading page with independent API calls

**Error behavior:** If ANY promise rejects, Promise.all() rejects immediately.

```javascript
try {
    const [user, posts, friends] = await Promise.all([
        fetchUser(),
        fetchPosts(),  // If this fails, catch runs
        fetchFriends()
    ]);
} catch (error) {
    console.error("One of the requests failed");
}
```

---

### Promise.allSettled()

Waits for ALL promises to settle (resolve OR reject) and returns results.

```javascript
const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchFriends()
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Failed:', result.reason);
    }
});
```

**Use cases:**
- Analytics where you want all data, even if some fails
- Logging multiple independent operations
- Don't want one failure to ruin everything

---

### Promise.race()

Returns the first promise that settles (resolve or reject).

```javascript
const winner = await Promise.race([
    fetchFromAPI1(),
    fetchFromAPI2(),
    timeout(5000)  // Reject after 5 seconds
]);
```

**Use cases:**
- Timeout for slow operations
- Multiple CDN endpoints, use fastest response
- Race conditions

---

## 🎨 Part 3: Common Async/Await Patterns

### Loading State Pattern

```javascript
async function loadData() {
    setLoading(true);      // Show spinner
    
    try {
        const data = await fetchData();
        displayData(data);
    } catch (error) {
        showError(error);
    } finally {
        setLoading(false);  // Hide spinner
    }
}
```

---

### Sequential vs Parallel Decision

```javascript
// Use sequential when operations depend on each other
async function getPostDetails(postId) {
    const post = await fetchPost(postId);           // Must finish first
    const author = await fetchUser(post.authorId);  // Depends on post
    const comments = await fetchComments(post.id);  // Depends on post
    return { post, author, comments };
}

// Use parallel when operations are independent
async function loadDashboard() {
    const [stats, recentActivity, notifications] = await Promise.all([
        fetchStats(),
        fetchRecentActivity(),
        fetchNotifications()
    ]);
    return { stats, recentActivity, notifications };
}
```

---

### Retry Pattern

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

---

### Timeout Pattern

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), ms);
    });
}

async function fetchWithTimeout(url, ms = 5000) {
    try {
        const response = await Promise.race([
            fetch(url),
            timeout(ms)
        ]);
        return await response.json();
    } catch (error) {
        console.error('Fetch failed or timed out:', error);
    }
}
```

---

## 📝 Quick Reference

### Async/Await Syntax

```javascript
// Basic
async function myFunction() {
    const result = await somePromise();
    return result;
}

// Arrow function
const myFunction = async () => {
    const result = await somePromise();
    return result;
};

// IIFE (Immediately Invoked)
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

### Promise Combination Methods

| Method | Waits for | Fails if | Use when |
|--------|-----------|----------|----------|
| `Promise.all()` | All promises | Any rejects | Independent operations |
| `Promise.allSettled()` | All promises | Never | Don't care about failures |
| `Promise.race()` | First to settle | First to reject | Timeouts, fastest response |
| `Promise.any()` | First to fulfill | All reject | Get first successful result |

---

## ✅ Day 23 Checklist

- [ ] Use `async` keyword to declare async functions
- [ ] Use `await` to pause for Promise resolution
- [ ] Handle errors with `try/catch` instead of `.catch()`
- [ ] Run independent operations in parallel with `Promise.all()`
- [ ] Understand sequential vs parallel execution
- [ ] Use `Promise.allSettled()` when failures are acceptable
- [ ] Use `Promise.race()` for timeouts
- [ ] Build Async Notification System project
- [ ] Build User Profile Loader with Promise.all()
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **`async` functions always return a Promise** — even if you return a value
2. **`await` can only be used inside `async` functions** — SyntaxError otherwise
3. **`try/catch` is cleaner than `.catch()`** — especially for multiple awaits
4. **`Promise.all()` runs operations in parallel** — much faster than sequential
5. **Use `Promise.all()` when operations are independent** — no data dependencies
6. **Use sequential when each step depends on the previous** — data flows through
7. **`Promise.allSettled()` never fails** — use when you want all results regardless
8. **`Promise.race()` is great for timeouts** — cancel slow operations

