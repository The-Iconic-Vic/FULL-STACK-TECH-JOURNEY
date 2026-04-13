# 📘 Promises Reference

## What is a Promise?

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.

```javascript
const promise = new Promise((resolve, reject) => {
    // Async operation
});
Promise States
text
                    ┌─────────────┐
                    │   Pending    │
                    │ (in progress)│
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        ┌──────────┐              ┌──────────┐
        │ Fulfilled│              │ Rejected │
        │ (success)│              │ (failure)│
        │  .then() │              │  .catch()│
        └──────────┘              └──────────┘
State	Description	Method
Pending	Initial state, neither fulfilled nor rejected	-
Fulfilled	Operation completed successfully	.then()
Rejected	Operation failed	.catch()
Creating a Promise
Basic Promise
javascript
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    if (success) {
        resolve('Operation successful!');
    } else {
        reject('Operation failed!');
    }
});
Promise with setTimeout
javascript
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

delay(1000).then(() => console.log('1 second passed'));
Promise with Random Success/Failure
javascript
function randomPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.5) {
                resolve('Success!');
            } else {
                reject('Failed!');
            }
        }, 1000);
    });
}
Using Promises
.then() - Handle Success
javascript
myPromise
    .then((result) => {
        console.log('Success:', result);
    });
.catch() - Handle Error
javascript
myPromise
    .catch((error) => {
        console.error('Error:', error);
    });
.finally() - Always Executes
javascript
myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log('Promise completed'));
Complete Promise Usage
javascript
fetchData()
    .then(data => {
        console.log('Data:', data);
        return processData(data);
    })
    .then(processed => {
        console.log('Processed:', processed);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Done');
    });
Promise Chaining
Each .then() returns a new Promise, allowing chaining.

javascript
function step1() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Step 1 complete'), 500);
    });
}

function step2(previousResult) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${previousResult} → Step 2 complete`), 500);
    });
}

function step3(previousResult) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${previousResult} → Step 3 complete`), 500);
    });
}

// Chain them
step1()
    .then(result => step2(result))
    .then(result => step3(result))
    .then(finalResult => console.log(finalResult));
// Step 1 complete → Step 2 complete → Step 3 complete
Returning Values in .then()
javascript
fetchUser()
    .then(user => {
        return user.id;  // Return value (not a Promise)
    })
    .then(userId => {
        console.log('User ID:', userId);  // Receives the returned value
    });
Returning Promises in .then()
javascript
fetchUser()
    .then(user => {
        return fetchPosts(user.id);  // Returns a Promise
    })
    .then(posts => {
        console.log('Posts:', posts);  // Receives resolved value
    });
Error Handling
Single .catch() for Entire Chain
javascript
fetchUser()
    .then(user => fetchOrders(user.id))
    .then(orders => fetchItems(orders[0].id))
    .then(items => fetchDetails(items[0].id))
    .catch(error => {
        // Catches ANY error in the chain
        console.error('Something went wrong:', error);
    });
Multiple .catch() for Specific Errors
javascript
fetchUser()
    .catch(error => {
        console.error('Failed to fetch user');
        return defaultUser;  // Provide fallback
    })
    .then(user => fetchOrders(user.id))
    .catch(error => {
        console.error('Failed to fetch orders');
        return [];
    });
Throwing Errors in .then()
javascript
fetchData()
    .then(data => {
        if (!data.isValid) {
            throw new Error('Invalid data');
        }
        return data;
    })
    .catch(error => {
        console.error(error.message);
    });
Promise Static Methods
Promise.resolve()
Creates a resolved Promise with a value.

javascript
const resolved = Promise.resolve('Immediate value');
resolved.then(value => console.log(value));
Promise.reject()
Creates a rejected Promise with an error.

javascript
const rejected = Promise.reject(new Error('Something went wrong'));
rejected.catch(error => console.error(error));
Promise.all()
Waits for ALL Promises to resolve (or any to reject).

javascript
const promise1 = fetch('/api/user');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
    .then(([user, posts, comments]) => {
        console.log('User:', user);
        console.log('Posts:', posts);
        console.log('Comments:', comments);
    })
    .catch(error => {
        console.error('One of the requests failed:', error);
    });
Promise.allSettled()
Waits for ALL Promises to settle (resolve or reject).

javascript
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('Success:', result.value);
            } else {
                console.log('Failed:', result.reason);
            }
        });
    });
Promise.race()
Returns first Promise that settles (resolve or reject).

javascript
const slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 3000));
const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 1000));

Promise.race([slow, fast])
    .then(result => console.log(result));  // 'Fast'
Promise.any()
Returns first Promise that fulfills (ignores rejections).

javascript
const p1 = Promise.reject('Error 1');
const p2 = Promise.resolve('Success');
const p3 = Promise.resolve('Another');

Promise.any([p1, p2, p3])
    .then(result => console.log(result));  // 'Success'
Practical Examples
Simulated API Call
javascript
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        console.log('Fetching user...');
        
        setTimeout(() => {
            if (userId === 1) {
                resolve({ id: 1, name: 'Victor' });
            } else {
                reject(new Error('User not found'));
            }
        }, 1000);
    });
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));
Timeout Wrapper
javascript
function timeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, ms);
        
        promise
            .then(result => {
                clearTimeout(timer);
                resolve(result);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

// Usage
timeout(fetch('/api/data'), 5000)
    .then(data => console.log(data))
    .catch(error => console.error(error));
Retry Logic
javascript
function retry(promiseFn, retries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        promiseFn()
            .then(resolve)
            .catch(error => {
                if (retries === 0) {
                    reject(error);
                } else {
                    setTimeout(() => {
                        retry(promiseFn, retries - 1, delay)
                            .then(resolve)
                            .catch(reject);
                    }, delay);
                }
            });
    });
}

// Usage
retry(() => fetch('/api/unstable'), 5, 2000)
    .then(data => console.log(data))
    .catch(error => console.error('All retries failed'));
Promise Anti-Patterns
❌ Nesting Promises
javascript
// BAD: Don't nest
fetchUser()
    .then(user => {
        fetchOrders(user.id)
            .then(orders => {
                console.log(orders);
            });
    });
✅ Return Promises Instead
javascript
// GOOD: Return the inner promise
fetchUser()
    .then(user => fetchOrders(user.id))
    .then(orders => console.log(orders));
❌ Forgotten Return
javascript
// BAD: Missing return
fetchUser()
    .then(user => {
        fetchOrders(user.id);  // No return!
    })
    .then(orders => {
        console.log(orders);  // undefined
    });
✅ Always Return
javascript
// GOOD: Return the promise
fetchUser()
    .then(user => fetchOrders(user.id))
    .then(orders => console.log(orders));
Promise vs Callback Comparison
Feature	Callbacks	Promises
Syntax	Nested	Flat chain
Error Handling	Each callback	Single .catch()
Readability	Poor (pyramid)	Good
State	No state	Pending, Fulfilled, Rejected
Composition	Hard	Easy (.all, .race)
Debugging	Difficult	Easier
text

---

**File:** `notes/async-await-preview.md`

```markdown
# 📘 Async/Await Preview (Coming Day 23)

## What is Async/Await?

Async/await is syntactic sugar over Promises, making asynchronous code look synchronous.

```javascript
// Promise version
function fetchData() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(user => fetch(`/api/posts/${user.id}`))
        .then(response => response.json())
        .catch(error => console.error(error));
}

// Async/Await version (coming Day 23)
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
Preview of Async/Await Benefits
Benefit	Description
Readability	Looks like synchronous code
Error Handling	Use try/catch blocks
Debugging	Better stack traces
Conditionals	Use if/else easily
Loops	Use for/while loops with async
Preview Syntax
javascript
// Declare async function
async function myFunction() {
    // await a Promise
    const result = await somePromise();
    return result;
}

// Arrow function
const myFunction = async () => {
    const result = await somePromise();
    return result;
};