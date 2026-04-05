# 📅 Day 13: JavaScript Events & Functions

**Date:** April 5, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Functions, Events, Conditionals, Loops

---

## 📋 Learning Objectives

- ✅ Write function declarations, expressions, and arrow functions
- ✅ Use parameters, arguments, and return values
- ✅ Add event listeners for click, input, submit, keydown, mouseover
- ✅ Access and use the event object (`event.target`, `event.preventDefault`)
- ✅ Write conditional statements (`if/else`, `switch`)
- ✅ Use loops (`for`, `while`) and array methods (`forEach`, `map`)

---

## 📝 Part 1: Functions

### What is a Function?

A function is a reusable block of code that performs a specific task. Functions help you avoid repetition and organize your code.

```javascript
// Basic syntax
function functionName(parameters) {
    // code to execute
    return value;  // optional
}
```

---

### Function Declarations

Function declarations are hoisted (can be called before they are defined).

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Calling the function
const message = greet("Victor");
console.log(message);  // "Hello, Victor!"
```

**Characteristics:**
- Hoisted (can be called before declaration)
- Has its own `this` binding
- Can be used as constructors

---

### Function Expressions

A function assigned to a variable. Not hoisted.

```javascript
// Function expression
const greet = function(name) {
    return `Hello, ${name}!`;
};

// Calling the function
const message = greet("Victor");
console.log(message);  // "Hello, Victor!"
```

**Characteristics:**
- Not hoisted (must be defined before use)
- Can be anonymous or named
- More flexible than declarations

---

### Arrow Functions (ES6+)

A shorter syntax for writing functions.

```javascript
// Basic arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Single parameter - parentheses optional
const greet = name => `Hello, ${name}!`;

// No parameters
const sayHello = () => "Hello!";

// Multiple parameters
const add = (a, b) => a + b;

// Multi-line - needs curly braces and return
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
```

**Characteristics:**
- Shorter syntax
- No `this` binding (lexical `this`)
- Cannot be used as constructors
- No `arguments` object

---

### Parameters and Arguments

```javascript
// Parameters are placeholders
function multiply(a, b) {  // a and b are parameters
    return a * b;
}

// Arguments are actual values passed
const result = multiply(5, 3);  // 5 and 3 are arguments
```

**Default Parameters:**
```javascript
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

greet();           // "Hello, Guest!"
greet("Victor");   // "Hello, Victor!"
```

**Rest Parameters:**
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4);  // 10
```

---

### Return Values

Functions return values using the `return` keyword.

```javascript
// Returns a value
function add(a, b) {
    return a + b;
}

// No return statement - returns undefined
function logMessage(message) {
    console.log(message);
    // implicit return undefined
}

// Early return
function isAdult(age) {
    if (age >= 18) {
        return true;
    }
    return false;
}
```

**Important:** Code after `return` does not execute.

---

### Function vs Arrow Function Comparison

| Feature | Function Declaration | Arrow Function |
|---------|---------------------|----------------|
| Hoisting | Yes | No |
| `this` binding | Own `this` | Lexical `this` |
| Constructor | Yes | No |
| `arguments` object | Yes | No |
| Syntax | Verbose | Concise |

```javascript
// When to use which

// Regular function - when you need 'this' or constructor
function Person(name) {
    this.name = name;
}

// Arrow function - callbacks, array methods
const doubled = numbers.map(n => n * 2);

// Regular function - method that needs its own 'this'
const obj = {
    name: "Victor",
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};
```

---

## 🎯 Part 2: Events

### What are Events?

Events are actions that happen in the browser that JavaScript can respond to: clicks, keypresses, form submissions, etc.

### Adding Event Listeners

The modern way to handle events is `addEventListener`.

```javascript
// Syntax
element.addEventListener(eventType, callbackFunction);

// Example
const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
    console.log('Button was clicked!');
});
```

---

### Common Event Types

| Event | Triggers When |
|-------|---------------|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `mouseenter` | Mouse enters element |
| `mouseleave` | Mouse leaves element |
| `mouseover` | Mouse enters (bubbles) |
| `mousemove` | Mouse moves over element |
| `keydown` | Key is pressed |
| `keyup` | Key is released |
| `keypress` | Key is pressed (deprecated) |
| `input` | Input value changes |
| `change` | Input loses focus with changed value |
| `submit` | Form is submitted |
| `focus` | Element gains focus |
| `blur` | Element loses focus |
| `load` | Page finishes loading |
| `DOMContentLoaded` | DOM is ready |
| `scroll` | Page/element is scrolled |
| `resize` | Window is resized |

---

### Event Object

When an event occurs, the browser passes an event object to the callback.

```javascript
button.addEventListener('click', (event) => {
    console.log(event.type);        // "click"
    console.log(event.target);      // The element that was clicked
    console.log(event.currentTarget); // Element listener is attached to
    console.log(event.clientX);     // Mouse X position
    console.log(event.clientY);     // Mouse Y position
});
```

**Common Event Properties/Methods:**

| Property/Method | Description |
|----------------|-------------|
| `event.target` | Element that triggered the event |
| `event.currentTarget` | Element listener is attached to |
| `event.type` | Type of event ("click", etc.) |
| `event.preventDefault()` | Prevents default behavior |
| `event.stopPropagation()` | Stops event from bubbling up |
| `event.key` | Key pressed (keyboard events) |
| `event.code` | Physical key code |
| `event.clientX/clientY` | Mouse position |

---

### `event.preventDefault()`

Prevents the default browser behavior.

```javascript
// Prevent form submission from refreshing page
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted but page did not refresh');
});

// Prevent link from navigating
const link = document.querySelector('a');
link.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Link clicked but did not navigate');
});
```

---

### `event.stopPropagation()`

Stops the event from bubbling up to parent elements.

```javascript
parent.addEventListener('click', () => {
    console.log('Parent clicked');  // Won't run if child stops propagation
});

child.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Child clicked only');
});
```

---

### Event Delegation

Instead of adding listeners to many elements, add one listener to a parent.

```javascript
// Instead of this (adding to each button)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// Do this (event delegation)
document.querySelector('.button-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        console.log('Button clicked:', event.target);
    }
});
```

**Benefits:**
- Works for dynamically added elements
- Better performance (fewer listeners)
- Cleaner code

---

## 🔄 Part 3: Conditionals & Loops

### Conditionals

#### if/else

```javascript
// Basic if
if (condition) {
    // code runs if condition is true
}

// if/else
if (condition) {
    // code runs if true
} else {
    // code runs if false
}

// if/else if/else
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}

// Ternary operator (shortcut for simple if/else)
const status = age >= 18 ? 'adult' : 'minor';
```

---

#### switch Statement

Use when comparing one value against many possibilities.

```javascript
const day = 'Monday';

switch (day) {
    case 'Monday':
        console.log('Start of work week');
        break;
    case 'Friday':
        console.log('TGIF!');
        break;
    case 'Saturday':
    case 'Sunday':
        console.log('Weekend!');
        break;
    default:
        console.log('Midweek');
}
```

**Note:** `break` prevents "falling through" to the next case.

---

### Loops

#### for Loop

Use when you know how many times to loop.

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// Loop through array
const fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Loop backwards
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(fruits[i]);
}
```

---

#### while Loop

Use when you don't know how many iterations.

```javascript
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// Be careful of infinite loops!
let condition = true;
while (condition) {
    // Must eventually set condition to false
}
```

---

#### do...while Loop

Runs at least once.

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

---

### Array Methods (Modern Loops)

#### forEach

Iterates through each array element.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number, index) => {
    console.log(`Index ${index}: ${number}`);
});

// Shorter
numbers.forEach(num => console.log(num));
```

#### map

Creates a new array by transforming each element.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// doubled = [2, 4, 6, 8, 10]

const names = ['alice', 'bob', 'charlie'];
const capitalized = names.map(name => name[0].toUpperCase() + name.slice(1));
// capitalized = ['Alice', 'Bob', 'Charlie']
```

#### filter

Creates a new array with elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
// evens = [2, 4, 6]

const tasks = [
    { text: 'Learn JS', completed: true },
    { text: 'Build project', completed: false }
];
const incompleteTasks = tasks.filter(task => !task.completed);
```

#### reduce

Reduces array to a single value.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, current) => total + current, 0);
// sum = 15

const max = numbers.reduce((max, current) => current > max ? current : max, numbers[0]);
```

---

### Loop Comparison

| Method | Use Case | Returns |
|--------|----------|---------|
| `for` | Traditional loop, need index | Nothing |
| `while` | Unknown iterations | Nothing |
| `forEach` | Execute for each item | Nothing |
| `map` | Transform each item | New array |
| `filter` | Select items | New array |
| `reduce` | Combine to single value | Single value |

---

## 📝 Quick Reference

### Functions
```javascript
// Declaration
function name(params) { return value; }

// Expression
const name = function(params) { return value; };

// Arrow
const name = (params) => { return value; };
const name = params => value;  // Implicit return
```

### Event Listeners
```javascript
element.addEventListener('click', () => {});
element.addEventListener('input', (e) => { console.log(e.target.value); });
element.addEventListener('submit', (e) => { e.preventDefault(); });
```

### Conditionals
```javascript
if (condition) { }
if (condition) { } else { }
if (condition) { } else if (condition) { } else { }
condition ? valueIfTrue : valueIfFalse;
```

### Loops
```javascript
for (let i = 0; i < arr.length; i++) { }
while (condition) { }
arr.forEach(item => { });
const newArr = arr.map(item => transformed);
const filtered = arr.filter(item => condition);
const reduced = arr.reduce((acc, curr) => acc + curr, 0);
```

---

## ✅ Day 13 Checklist

- [ ] Write function declarations, expressions, and arrow functions
- [ ] Use parameters and return values
- [ ] Add event listeners for click, input, submit, keypress
- [ ] Access event object (`event.target`, `event.preventDefault`)
- [ ] Use event delegation for dynamic elements
- [ ] Write if/else and switch statements
- [ ] Use for loops and while loops
- [ ] Use array methods: forEach, map, filter
- [ ] Build To-Do List mini-project
- [ ] Build Hamburger Menu mini-project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Use arrow functions for callbacks** — cleaner syntax
2. **Use `const` for function expressions** — prevents reassignment
3. **Always use `event.preventDefault()`** when handling form submissions
4. **Event delegation** is more efficient than many individual listeners
5. **`map` returns a new array** — use it to transform data
6. **`filter` returns a new array** — use it to select items
7. **`forEach` is for side effects** — logging, DOM updates, etc.
8. **Ternary operators** are great for simple conditionals

