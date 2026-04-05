# 📚 Day 13 Resources - JavaScript Events & Functions

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Functions | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions |
| MDN: Arrow Functions | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions |
| MDN: Event Reference | https://developer.mozilla.org/en-US/docs/Web/Events |
| MDN: Event Handling | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events |
| MDN: Event Object | https://developer.mozilla.org/en-US/docs/Web/API/Event |
| MDN: Conditionals | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals |
| MDN: Loops | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code |
| freeCodeCamp: JavaScript Events | https://www.freecodecamp.org/news/javascript-events/ |
| JavaScript.info: Events | https://javascript.info/events |
| W3Schools: JS Events | https://www.w3schools.com/js/js_events.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JavaScript Functions Tutorial | https://youtu.be/FOD408iR7JE |
| Arrow Functions Tutorial | https://youtu.be/h33Srr5J9nY |
| JavaScript Events Tutorial | https://youtu.be/7UstS0hsHgI |
| Event Delegation Explained | https://youtu.be/3KJI1WZGDrg |
| JavaScript Loops Tutorial | https://youtu.be/Kn06785pkJg |
| Array Methods (map, filter, reduce) | https://youtu.be/R8rmfD9Y5-c |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools Console | Test JavaScript | Built into Chrome |
| JSFiddle | Online JavaScript playground | https://jsfiddle.net |
| CodePen | Frontend playground | https://codepen.io |
| JavaScript Visualizer | Visualize code execution | https://pythontutor.com/javascript.html |

## 📝 Functions Cheatsheet

### Function Declaration
```javascript
function name(parameters) {
    return value;
}
```

### Function Expression
```javascript
const name = function(parameters) {
    return value;
};
```

### Arrow Function
```javascript
// Basic
const name = (parameters) => { return value; };

// Single parameter (no parentheses)
const name = param => { return value; };

// Implicit return (no braces)
const name = param => value;
```

### Default Parameters
```javascript
function greet(name = "Guest") {
    return `Hello, ${name}`;
}
```

### Rest Parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
```

## 📝 Events Cheatsheet

### Add Event Listener
```javascript
element.addEventListener('click', () => {
    // code
});
```

### Common Events
| Event | Use Case |
|-------|----------|
| `click` | Button clicks |
| `input` | Real-time typing |
| `submit` | Form submission |
| `keydown` | Keyboard shortcuts |
| `mouseenter` | Hover effects |
| `scroll` | Scroll-based animations |
| `resize` | Responsive adjustments |

### Event Object
```javascript
element.addEventListener('click', (event) => {
    event.target;           // Element clicked
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop bubbling
});
```

### Event Delegation
```javascript
parent.addEventListener('click', (event) => {
    if (event.target.matches('.child-selector')) {
        // Handle click
    }
});
```

## 📝 Conditionals Cheatsheet

### if/else
```javascript
if (condition) {
    // code
} else if (otherCondition) {
    // code
} else {
    // code
}
```

### Ternary
```javascript
const result = condition ? valueIfTrue : valueIfFalse;
```

### switch
```javascript
switch (value) {
    case 'option1':
        // code
        break;
    case 'option2':
        // code
        break;
    default:
        // code
}
```

## 📝 Loops Cheatsheet

### for
```javascript
for (let i = 0; i < array.length; i++) {
    // code
}
```

### for...of
```javascript
for (const item of array) {
    // code
}
```

### while
```javascript
while (condition) {
    // code
}
```

### forEach
```javascript
array.forEach(item => {
    // code
});
```

### map
```javascript
const newArray = array.map(item => transformed);
```

### filter
```javascript
const filtered = array.filter(item => condition);
```

### reduce
```javascript
const result = array.reduce((acc, curr) => acc + curr, 0);
```

## 🎮 Interactive Learning

| Platform | Description | Link |
|----------|-------------|------|
| freeCodeCamp | JavaScript curriculum | https://freecodecamp.org |
| JavaScript30 | 30-day vanilla JS challenge | https://javascript30.com |
| Codecademy | JavaScript courses | https://codecademy.com |
| Exercism | JavaScript practice | https://exercism.org/tracks/javascript |
| Codewars | Coding challenges | https://codewars.com |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Cannot read property 'addEventListener' of null` | Element not found | Check script placement, verify ID/selector |
| Arrow function `this` not working | Arrow functions don't bind `this` | Use regular function for methods |
| Event listener runs multiple times | Added multiple times | Remove listener or use `{ once: true }` |
| `event.target` is not the element you expect | Event bubbling | Use `event.currentTarget` or check `event.target` |
| Form refreshes page | Default submit behavior | Use `event.preventDefault()` |
| Infinite loop | Condition never false | Ensure loop condition changes |

## ✅ Code Patterns

### DOM Ready Pattern
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Safe to access DOM
});
```

### Prevent Form Submission
```javascript
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Handle form data
});
```

### Dynamic Element Handling
```javascript
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('dynamic-btn')) {
        // Handle dynamically added buttons
    }
});
```

### Debounce Pattern
```javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

input.addEventListener('input', debounce(() => {
    console.log('Searching...');
}, 300));
```

## 📚 Further Reading

| Topic | Link |
|-------|------|
| JavaScript Function Patterns | https://www.freecodecamp.org/news/function-declaration-vs-function-expression/ |
| Event Bubbling Explained | https://javascript.info/bubbling-and-capturing |
| Understanding `this` in JavaScript | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this |
| JavaScript Array Methods | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array |
