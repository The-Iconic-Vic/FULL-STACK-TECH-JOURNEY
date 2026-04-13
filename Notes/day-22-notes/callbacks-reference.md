# 📘 Callbacks Reference

## What is a Callback?

A callback is a function passed as an argument to another function, to be executed later.

```javascript
// Basic callback
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function sayGoodbye() {
    console.log('Goodbye!');
}

greet('Victor', sayGoodbye);
// Hello, Victor!
// Goodbye!
Synchronous Callbacks
Callbacks that execute immediately (not async).

javascript
// Array methods use synchronous callbacks
const numbers = [1, 2, 3];
numbers.forEach((num) => {
    console.log(num);
});
// Executes immediately, not async

// map, filter, reduce also use synchronous callbacks
const doubled = numbers.map(n => n * 2);
Asynchronous Callbacks
Callbacks that execute after an async operation completes.

javascript
// setTimeout uses async callback
setTimeout(() => {
    console.log('Runs after 1 second');
}, 1000);

// Event listeners use async callbacks
button.addEventListener('click', () => {
    console.log('Runs when clicked');
});

// fetch uses async callback (through Promises)
fetch('/api/data')
    .then(response => response.json())  // Callback
    .then(data => console.log(data));
Callback Pattern for Async Operations
javascript
// Simulate API call with callback
function fetchUser(userId, callback) {
    console.log('Fetching user...');
    
    setTimeout(() => {
        const user = { id: userId, name: 'Victor' };
        callback(null, user);  // Error-first callback pattern
    }, 1000);
}

// Usage
fetchUser(1, (error, user) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('User:', user);
    }
});
Error-First Callback Pattern (Node.js style)
javascript
function readFile(path, callback) {
    // Simulate file read
    setTimeout(() => {
        if (path === 'valid.txt') {
            callback(null, 'File contents');
        } else {
            callback(new Error('File not found'), null);
        }
    }, 1000);
}

readFile('valid.txt', (err, data) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Data:', data);
    }
});
Callback Hell (Pyramid of Doom)
When multiple async operations depend on each other, callbacks become deeply nested.

javascript
// CALLBACK HELL - DON'T DO THIS
getUser((user) => {
    getOrders(user.id, (orders) => {
        getOrderItems(orders[0].id, (items) => {
            getItemDetails(items[0].id, (details) => {
                getSeller(details.sellerId, (seller) => {
                    console.log('Seller:', seller);
                    // More nesting...
                });
            });
        });
    });
});
Visual Representation
text
getUser( ... )
    getOrders( ... )
        getOrderItems( ... )
            getItemDetails( ... )
                getSeller( ... )
                    // Code becomes a pyramid shape
Problems with Callback Hell
Problem	Description
Readability	Code becomes hard to follow
Maintainability	Adding features requires more nesting
Error Handling	Each level needs its own error handling
Debugging	Stack traces are confusing
Reusability	Hard to extract reusable pieces
Testing	Difficult to test nested callbacks
Solutions to Callback Hell
1. Named Functions
javascript
// Instead of anonymous functions
getUser((user) => {
    getOrders(user.id, (orders) => {
        // ...
    });
});

// Use named functions
function handleUser(user) {
    getOrders(user.id, handleOrders);
}

function handleOrders(orders) {
    getOrderItems(orders[0].id, handleItems);
}

function handleItems(items) {
    getItemDetails(items[0].id, handleDetails);
}

getUser(handleUser);
2. Async/Await (Future Day)
javascript
// Preview of better solution
async function getSellerInfo() {
    const user = await getUser();
    const orders = await getOrders(user.id);
    const items = await getOrderItems(orders[0].id);
    const details = await getItemDetails(items[0].id);
    const seller = await getSeller(details.sellerId);
    return seller;
}
3. Promises (Today's Topic)
javascript
getUser()
    .then(user => getOrders(user.id))
    .then(orders => getOrderItems(orders[0].id))
    .then(items => getItemDetails(items[0].id))
    .then(details => getSeller(details.sellerId))
    .then(seller => console.log(seller))
    .catch(error => console.error(error));
Common Callback Patterns
setTimeout Pattern
javascript
function delay(ms, callback) {
    setTimeout(callback, ms);
}

delay(1000, () => {
    console.log('1 second passed');
});
Event Listener Pattern
javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

const emitter = new EventEmitter();
emitter.on('data', (data) => console.log('Received:', data));
emitter.emit('data', { message: 'Hello' });
Callback Execution Order
javascript
console.log('1: Start');

setTimeout(() => {
    console.log('2: setTimeout (async)');
}, 0);

Promise.resolve().then(() => {
    console.log('3: Promise (microtask)');
});

console.log('4: End');

// Output:
// 1: Start
// 4: End
// 3: Promise (microtask)
// 2: setTimeout (async)

// Note: Microtasks (Promises) execute before macrotasks (setTimeout)
Converting Callbacks to Promises
javascript
// Callback-based function
function fetchDataCallback(callback) {
    setTimeout(() => {
        callback(null, { data: 'Success' });
    }, 1000);
}

// Convert to Promise
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 'Success' });
        }, 1000);
    });
}

// Usage
fetchDataPromise()
    .then(data => console.log(data))
    .catch(error => console.error(error));