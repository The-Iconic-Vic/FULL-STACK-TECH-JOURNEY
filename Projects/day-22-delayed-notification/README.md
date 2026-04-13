# Delayed Notification System - Day 22 Project

## Project Overview
A notification system that simulates an API call using Promises, demonstrating loading states, success handling, and error handling.

## Skills Practiced
- Creating Promises with `new Promise()`
- `setTimeout()` for async simulation
- `.then()` for success handling
- `.catch()` for error handling
- UI state management (loading, success, error)
- Random error simulation (70% success, 30% error)

## File Structure
day-22-delayed-notification/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | Description |
|---------|-------------|
| Load Data Button | Triggers async operation |
| Loading State | Spinner animation, disabled button |
| Success State (70%) | Green message with timestamp |
| Error State (30%) | Red error message |
| Retry Option | Button text changes to "Retry?" |

## Key Code Patterns

```javascript
// Promise that resolves/rejects randomly
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.3) {
                resolve({ success: true, message: "Success!" });
            } else {
                reject({ success: false, message: "Error!" });
            }
        }, 2000);
    });
}

// Using the Promise
fetchData()
    .then(data => {
        // Handle success
        console.log(data.message);
    })
    .catch(error => {
        // Handle error
        console.error(error.message);
    });
UI States
State	Icon	Message	Button
Idle	📡	"Click to load data"	"Load Data"
Loading	⏳ (spinning)	"Loading..."	Disabled
Success	✅	Success message with timestamp	"Load Data"
Error	❌	Error message	"Retry?"
Promise States Demonstrated
State	UI Representation
Pending	Loading spinner
Fulfilled	Success message
Rejected	Error message