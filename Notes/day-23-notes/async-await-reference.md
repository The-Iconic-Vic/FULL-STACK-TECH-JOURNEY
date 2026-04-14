# 📘 Async/Await Reference

## What is Async/Await?

Async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.

---

## The `async` Keyword

Declares an asynchronous function that automatically returns a Promise.

```javascript
// Regular function
function regular() {
    return "Hello";
}
console.log(regular());  // "Hello"

// Async function
async function asyncFunc() {
    return "Hello";
}
console.log(asyncFunc());  // Promise {<fulfilled>: "Hello"}

// Both are equivalent:
async function greet() {
    return "Hello";
}
// Is the same as:
function greetPromise() {
    return Promise.resolve("Hello");
}
The await Keyword
Pauses execution of an async function until a Promise resolves.

javascript
async function example() {
    console.log("Start");
    
    // Pauses here for 2 seconds
    const result = await new Promise((resolve) => {
        setTimeout(() => resolve("Done"), 2000);
    });
    
    console.log(result);  // "Done"
    console.log("End");
}

example();
// Output:
// Start
// (2 second pause)
// Done
// End
Rules:

await can only be used inside async functions

await works with any Promise (or any thenable)

await expression resolves to the Promise's resolved value

Error Handling with try/catch
javascript
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
Multiple Awaits with Single try/catch
javascript
async function loadUserData() {
    try {
        const user = await fetchUser();
        const posts = await fetchPosts(user.id);
        const comments = await fetchComments(posts[0].id);
        return { user, posts, comments };
    } catch (error) {
        // Catches ANY error from ANY await
        console.error("Failed to load user data:", error);
        return null;
    }
}
try/catch/finally
javascript
async function loadData() {
    setLoading(true);
    
    try {
        const data = await fetchData();
        displayData(data);
    } catch (error) {
        showError(error);
    } finally {
        setLoading(false);  // Always runs
    }
}
Returning Values
javascript
async function getUser() {
    return { name: "Victor", age: 25 };
}

// The returned value is wrapped in a Promise
getUser().then(user => {
    console.log(user.name);  // "Victor"
});

// Or with await
async function displayUser() {
    const user = await getUser();
    console.log(user.name);  // "Victor"
}
Async Arrow Functions
javascript
// Basic
const fetchData = async () => {
    const response = await fetch('/api/data');
    return response.json();
};

// Single line (implicit return)
const fetchData = async () => (await fetch('/api/data')).json();

// With parameters
const getUser = async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
};
IIFE (Immediately Invoked Function Expression)
javascript
// Run async code immediately
(async () => {
    const data = await fetchData();
    console.log(data);
})();

// With error handling
(async () => {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
})();
Top-Level Await (ES2022)
In modules, you can use await outside of async functions.

javascript
// In a module (.mjs or with "type": "module")
const data = await fetchData();
console.log(data);

// With error handling
try {
    const data = await fetchData();
    console.log(data);
} catch (error) {
    console.error(error);
}
Converting Callbacks to Async/Await
javascript
// Callback-based
function readFile(path, callback) {
    setTimeout(() => {
        callback(null, "File content");
    }, 1000);
}

// Promise wrapper
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// Async/Await usage
async function example() {
    try {
        const content = await readFilePromise('/path/to/file');
        console.log(content);
    } catch (error) {
        console.error(error);
    }
}
Common Patterns
Loading State
javascript
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
Sequential Execution
javascript
async function sequential() {
    const user = await fetchUser();        // Wait for user
    const posts = await fetchPosts(user.id); // Then posts
    const comments = await fetchComments(posts[0].id); // Then comments
    return { user, posts, comments };
}
Parallel Execution with Promise.all
javascript
async function parallel() {
    const [user, posts, friends] = await Promise.all([
        fetchUser(),
        fetchPosts(),
        fetchFriends()
    ]);
    return { user, posts, friends };
}
Conditional Async
javascript
async function loadData(useCache = true) {
    if (useCache) {
        const cached = localStorage.getItem('data');
        if (cached) return JSON.parse(cached);
    }
    
    const data = await fetchData();
    localStorage.setItem('data', JSON.stringify(data));
    return data;
}
Loops with Async
javascript
// Sequential in loop (slow but controlled)
async function processItemsSequential(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item);
        results.push(result);
    }
    return results;
}

// Parallel in loop (fast but may overwhelm)
async function processItemsParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}
Debugging Async/Await
javascript
// Add console logs to track execution
async function debugExample() {
    console.log("1. Starting");
    
    const data = await fetchData();
    console.log("2. Data received:", data);
    
    const processed = await processData(data);
    console.log("3. Data processed:", processed);
    
    return processed;
}

// Use try/catch to catch errors
async function debugWithError() {
    try {
        console.log("Starting fetch...");
        const data = await fetchData();
        console.log("Fetch successful:", data);
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
        console.error("Stack:", error.stack);
    }
}
Async/Await vs Promises
Feature	Promises (.then)	Async/Await
Syntax	Chained	Looks synchronous
Error handling	.catch()	try/catch
Readability	Good	Excellent
Debugging	Decent	Better stack traces
Variable scope	Requires nesting	Same block
Learning curve	Moderate	Easy
Browser support	All modern	All modern
Performance Considerations
javascript
// BAD: Sequential when not needed
async function slow() {
    const a = await fetchA();  // Wait for A
    const b = await fetchB();  // Then B
    const c = await fetchC();  // Then C
    return [a, b, c];
}

// GOOD: Parallel when independent
async function fast() {
    const [a, b, c] = await Promise.all([
        fetchA(),
        fetchB(),
        fetchC()
    ]);
    return [a, b, c];
}
Browser Support
Async/await is supported in all modern browsers:

Chrome 55+

Firefox 52+

Safari 10.1+

Edge 15+

For older browsers, transpile with Babel.