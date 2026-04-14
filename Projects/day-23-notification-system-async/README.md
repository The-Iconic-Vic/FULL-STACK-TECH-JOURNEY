# Async/Await Notification System - Day 23 Project

## Project Overview
A notification system rewritten using async/await, demonstrating cleaner async code with try/catch error handling.

## Skills Practiced
- `async` keyword - functions return Promises
- `await` keyword - pause execution until Promise resolves
- `try/catch` - handle errors like synchronous code
- Loading states with async/await
- Sequential vs parallel execution comparison

## File Structure
day-23-notification-system-async/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Key Code Patterns

```javascript
// Async/Await Version (cleaner!)
async function handleLoadData() {
    setLoadingState();
    
    try {
        const data = await fetchData();
        setSuccessState(data);
    } catch (error) {
        setErrorState(error);
    }
}
Promise vs Async/Await Comparison
Feature	Promise (.then)	Async/Await
Syntax	.then() chaining	Looks synchronous
Error handling	.catch()	try/catch
Readability	Good	Excellent
Debugging	Decent	Better stack traces
Variable scope	Requires nesting	In same block
Sequential vs Parallel
javascript
// Sequential (slower) - 6 seconds total
const data1 = await fetchData();
const data2 = await fetchData();
const data3 = await fetchData();

// Parallel (faster) - 2 seconds total
const [data1, data2, data3] = await Promise.all([
    fetchData(),
    fetchData(),
    fetchData()
]);
Features
Async/await data fetching

Try/catch error handling

Loading spinner animation

Success/error UI states

Sequential vs parallel demo in console