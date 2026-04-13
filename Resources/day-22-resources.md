# 📚 Day 22 Resources - Asynchronous JavaScript (Callbacks & Promises)

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Asynchronous JavaScript | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous |
| MDN: Promise | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise |
| MDN: Using Promises | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises |
| MDN: setTimeout | https://developer.mozilla.org/en-US/docs/Web/API/setTimeout |
| MDN: Event Loop | https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop |
| JavaScript.info: Callbacks | https://javascript.info/callbacks |
| JavaScript.info: Promises | https://javascript.info/promise-basics |
| JavaScript.info: Promise Chaining | https://javascript.info/promise-chaining |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Async JavaScript Tutorial | https://youtu.be/ZvbZ9z4vXeA |
| Promises Explained | https://youtu.be/DHvZLI7Db8E |
| Callback Hell Explained | https://youtu.be/7f4c7Gbh-Ck |
| JavaScript Event Loop | https://youtu.be/8aGhZQkoFbQ |
| Promise Chaining | https://youtu.be/3Qp5tL0l9O8 |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Debug Promises | Built into Chrome |
| JS Visualizer | Visualize async execution | https://www.jsv9000.app |
| Promise Visualizer | See Promise states | https://promisesaplus.com |
| Loupe | Event loop visualizer | http://latentflip.com/loupe |

## 📝 Promise Cheatsheet

### Creating a Promise
```javascript
const promise = new Promise((resolve, reject) => {
    // async work
    if (success) resolve(value);
    else reject(error);
});
```

### Using a Promise
```javascript
promise
    .then(result => { /* handle success */ })
    .catch(error => { /* handle error */ })
    .finally(() => { /* always runs */ });
```

### Promise Chaining
```javascript
first()
    .then(result => second(result))
    .then(result => third(result))
    .catch(error => console.error(error));
```

### Static Methods
| Method | Description |
|--------|-------------|
| `Promise.all([p1, p2])` | Waits for all to resolve |
| `Promise.allSettled([p1, p2])` | Waits for all to settle |
| `Promise.race([p1, p2])` | Returns first to settle |
| `Promise.any([p1, p2])` | Returns first to fulfill |
| `Promise.resolve(value)` | Creates resolved promise |
| `Promise.reject(error)` | Creates rejected promise |

## 📝 Callback Cheatsheet

### Basic Callback
```javascript
function doAsync(callback) {
    setTimeout(() => {
        callback(null, 'Done');
    }, 1000);
}
```

### Error-First Callback Pattern
```javascript
function asyncOperation(callback) {
    setTimeout(() => {
        if (success) callback(null, result);
        else callback(error, null);
    }, 1000);
}

// Usage
asyncOperation((err, result) => {
    if (err) console.error(err);
    else console.log(result);
});
```

### Callback Hell Example
```javascript
// Pyramid of Doom
async1((err, res1) => {
    if (err) handleError(err);
    async2(res1, (err, res2) => {
        if (err) handleError(err);
        async3(res2, (err, res3) => {
            if (err) handleError(err);
            console.log(res3);
        });
    });
});
```

## ✅ Promise vs Callback Comparison

| Feature | Callbacks | Promises |
|---------|-----------|----------|
| Nesting | Deep pyramid | Flat chain |
| Error handling | Each callback | Single .catch() |
| Readability | Poor | Good |
| State tracking | None | Pending, Fulfilled, Rejected |
| Composition | Hard | Easy (.all, .race) |
| Debugging | Difficult | Easier |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `undefined` returned | Async function can't return directly | Use callback or Promise |
| Callback called twice | Logic error | Ensure callback called once |
| Unhandled Promise rejection | No .catch() | Always add .catch() |
| Promise not chaining | Missing return in .then() | Return the next promise |
| Nested promises | Not returning inner promises | Return promises to flatten |
| Variable not available | Async timing issue | Use .then() or async/await |

## 🎯 Practice Exercises

### Exercise 1: Basic Promise
Create a promise that resolves after 2 seconds with a message.

### Exercise 2: Promise Chain
Create three promises that execute in sequence, each passing data to the next.

### Exercise 3: Error Handling
Create a promise that rejects randomly and handle the error.

### Exercise 4: Promise.all
Fetch multiple "API calls" simultaneously using Promise.all.

### Exercise 5: Convert Callback to Promise
Convert a callback-based function to use Promises.

## 📚 Further Reading

| Topic | Link |
|-------|------|
| The Event Loop Explained | https://www.youtube.com/watch?v=8aGhZQkoFbQ |
| Promise Anti-patterns | https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns |
| Using Promise.allSettled | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled |
| Async/Await (Preview) | https://javascript.info/async-await |
