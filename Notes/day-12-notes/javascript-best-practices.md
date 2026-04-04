# 📘 JavaScript Best Practices

## Variable Declaration

### ✅ Good
```javascript
const PI = 3.14159;
let count = 0;
let userName = "Victor";
❌ Bad
javascript
var old = "avoid";
let $ = "cryptic";
let x = "meaningless";
Rules
Use const by default

Use let only when you need to reassign

Never use var

Use meaningful variable names

Use camelCase for variables (userName, not user_name)

Use UPPER_SNAKE_CASE for constants (MAX_SIZE)

Naming Conventions
Type	Convention	Example
Variables	camelCase	userName, isLoggedIn
Constants	UPPER_SNAKE_CASE	MAX_WIDTH, API_KEY
Functions	camelCase (verb)	getUserData(), handleClick()
Classes	PascalCase	UserProfile, DataService
Boolean	is/has/can prefix	isActive, hasError, canSubmit
javascript
// Variables
const MAX_RETRIES = 3;
let currentAttempt = 0;
let isComplete = false;

// Functions
function getUserData() {}
function handleSubmit() {}

// Classes
class UserAccount {}
class DataService {}
Strict Equality
✅ Good
javascript
if (count === 0) {}
if (name !== "") {}
if (isActive === true) {}
if (isActive) {}  // Even better for booleans
❌ Bad
javascript
if (count == 0) {}
if (name != "") {}
if (isActive === true) {}  // Redundant
Template Literals
✅ Good
javascript
const message = `Hello, ${userName}! You have ${count} messages.`;
❌ Bad
javascript
const message = "Hello, " + userName + "! You have " + count + " messages.";
DOM Selection
✅ Good
javascript
// Cache DOM references
const button = document.getElementById('submitBtn');
const container = document.querySelector('.container');

// Use meaningful variable names
const submitButton = document.getElementById('submit');
❌ Bad
javascript
// Selecting repeatedly
for (let i = 0; i < 10; i++) {
    document.querySelector('.item').classList.add('active');
}

// Cryptic names
const x = document.getElementById('btn');
Event Listeners
✅ Good
javascript
// Named function for reuse
function handleClick() {
    console.log('Clicked');
}
button.addEventListener('click', handleClick);

// Clean up when needed
button.removeEventListener('click', handleClick);
❌ Bad
javascript
// Anonymous function that can't be removed
button.addEventListener('click', () => {
    console.log('Clicked');
});
DOM Ready
✅ Good
javascript
document.addEventListener('DOMContentLoaded', () => {
    // DOM is ready
    initializeApp();
});
❌ Bad
javascript
// Script in head without waiting
const button = document.getElementById('button'); // May be null
Error Handling
✅ Good
javascript
try {
    riskyOperation();
} catch (error) {
    console.error('Operation failed:', error.message);
    // Handle gracefully
}
❌ Bad
javascript
try {
    riskyOperation();
} catch (error) {
    // Empty catch - swallows errors silently
}
Comments
✅ Good
javascript
// Calculate total price with tax
function calculateTotal(price, taxRate) {
    return price + (price * taxRate);
}
❌ Bad
javascript
// Set x to 5
let x = 5;  // Obvious comment

// This function adds two numbers
function add(a, b) {  // Function name already says this
    return a + b;
}
Code Organization
✅ Good
javascript
// 1. Constants
const API_URL = 'https://api.example.com';
const MAX_ITEMS = 50;

// 2. DOM elements
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit');

// 3. Functions
function validateForm() {}
function submitData() {}

// 4. Event listeners
form.addEventListener('submit', handleSubmit);

// 5. Initialization
function init() {}
init();
Performance Tips
javascript
// Cache DOM queries
const container = document.querySelector('.container');
for (let i = 0; i < 100; i++) {
    container.innerHTML += `<div>${i}</div>`;
}

// Use classList instead of className
element.classList.add('active');  // Good
element.className += ' active';   // Bad

// Batch style changes
element.style.cssText = `
    color: red;
    font-size: 20px;
    margin: 10px;
`;

// Or use class
element.classList.add('highlight');
Common Pitfalls to Avoid
Pitfall	Why	Solution
== instead of ===	Type coercion	Use ===
Missing const/let	Creates global variable	Always declare
innerHTML with user input	XSS security risk	Use textContent
Event listener memory leaks	No cleanup	Remove listeners
DOM access in loops	Slow	Cache reference
Deep nesting	Hard to read	Early returns, extract functions
javascript
// Bad
if (user) {
    if (user.isLoggedIn) {
        if (user.hasPermission) {
            // do something
        }
    }
}

// Good
if (!user || !user.isLoggedIn || !user.hasPermission) {
    return;
}
// do something