## Project Overview
A demonstration of JavaScript Promises, including creation, .then(), .catch(), and Promise chaining.

## Skills Practiced
- Creating Promises with `new Promise()`
- `resolve()` and `reject()` callbacks
- `.then()` for successful results
- `.catch()` for error handling
- Promise chaining
- Simulating async operations with `setTimeout`

## File Structure
day-22-promise-simulation/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | Description |
|---------|-------------|
| Basic Promise | Simple promise that resolves after 2 seconds |
| Promise Chaining | Three sequential async operations |
| Random Error | 70% success rate, 30% error rate |

## Key Code Patterns

```javascript
// Creating a Promise
function myPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("Success message");
            } else {
                reject("Error message");
            }
        }, 2000);
    });
}

// Using a Promise
myPromise()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

// Promise Chaining
step1()
    .then(result => step2(result))
    .then(result => step3(result))
    .then(finalResult => console.log(finalResult))
    .catch(error => console.error(error));
Promise States
State	Description
Pending	Initial state, neither fulfilled nor rejected
Fulfilled	Operation completed successfully
Rejected	Operation failed