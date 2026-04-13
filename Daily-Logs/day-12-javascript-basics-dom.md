# 📅 Day 12: Introduction to JavaScript

**Date:** April 4, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** JavaScript Basics, Variables, Data Types, Operators, DOM Manipulation

---

## 📋 Learning Objectives

- ✅ Add JavaScript to HTML (inline, internal, external)
- ✅ Declare variables using `let`, `const`, and understand why `var` is outdated
- ✅ Work with primitive data types: strings, numbers, booleans, null, undefined
- ✅ Use arithmetic, assignment, and comparison operators
- ✅ Understand type coercion and strict equality (`===` vs `==`)
- ✅ Use template literals for string interpolation
- ✅ Select DOM elements with `getElementById`, `querySelector`, `querySelectorAll`
- ✅ Modify content with `innerHTML` and `textContent`
- ✅ Change styles and classes with `classList.add/remove/toggle`

---

## 📝 Part 1: JavaScript Basics

### What is JavaScript?

JavaScript is a programming language that adds interactivity to websites. It allows you to:

- Respond to user actions (clicks, typing, hovering)
- Modify HTML and CSS dynamically
- Fetch data from servers
- Create animations and games

**The Three Layers of Web Development:**

| Layer | Technology | Purpose |
|-------|------------|---------|
| Structure | HTML | Content and meaning |
| Presentation | CSS | Styling and layout |
| Behavior | JavaScript | Interactivity and logic |

---

### Adding JavaScript to HTML

#### 1. Inline JavaScript (Not Recommended)

```html
<button onclick="alert('Hello!')">Click Me</button>
```

**Problems:** Mixes behavior with structure, hard to maintain.

---

#### 2. Internal JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <script>
        alert('Page loaded!');
    </script>
</head>
<body>
    <!-- content -->
</body>
</html>
```

**Best placement:** At the end of `<body>` to ensure DOM is loaded.

---

#### 3. External JavaScript (Recommended)

**HTML:**
```html
<script src="script.js"></script>
```

**script.js:**
```javascript
alert('Hello from external file!');
```

**Advantages:**
- Reusable across multiple pages
- Cached by browsers
- Clean separation of concerns

---

### JavaScript Comments

```javascript
// Single line comment

/*
   Multi-line
   comment
*/
```

---

### Variables

Variables store data that can be used and changed throughout your program.

#### `let` - Mutable Variable

Use when the value will change.

```javascript
let age = 25;
age = 26;  // Allowed
```

#### `const` - Immutable Variable

Use when the value should NOT change.

```javascript
const birthYear = 1995;
birthYear = 1996;  // Error! Cannot reassign
```

#### `var` - Outdated (Avoid)

```javascript
var old = "Don't use this";
```

**Why avoid `var`:**
- Function-scoped (not block-scoped)
- Can be redeclared accidentally
- Hoisting issues

**Rule of thumb:**
- Use `const` by default
- Use `let` only when you need to reassign

---

### Data Types

#### String
Text wrapped in quotes (single, double, or backticks).

```javascript
let name = "Victor";
let greeting = 'Hello';
let template = `My name is ${name}`;  // Template literal
```

#### Number
Integers and decimals.

```javascript
let age = 25;
let price = 19.99;
let negative = -10;
```

#### Boolean
True or false.

```javascript
let isLoggedIn = true;
let isComplete = false;
```

#### Null
Intentional absence of value.

```javascript
let user = null;
```

#### Undefined
Variable declared but not assigned.

```javascript
let something;
console.log(something);  // undefined
```

---

### Template Literals

Use backticks `` ` `` and `${}` for string interpolation.

```javascript
let name = "Victor";
let age = 25;

// Old way (concatenation)
let message = "My name is " + name + " and I am " + age + " years old.";

// New way (template literal)
let message = `My name is ${name} and I am ${age} years old.`;
```

**Benefits:**
- Easier to read
- Supports multi-line strings
- Can include expressions: `${2 + 2}`

---

## 🔧 Part 2: Basic Operations

### Arithmetic Operators

| Operator | Name | Example |
|----------|------|---------|
| `+` | Addition | `5 + 3` = 8 |
| `-` | Subtraction | `5 - 3` = 2 |
| `*` | Multiplication | `5 * 3` = 15 |
| `/` | Division | `15 / 3` = 5 |
| `%` | Modulus (remainder) | `7 % 3` = 1 |
| `**` | Exponentiation | `2 ** 3` = 8 |

```javascript
let sum = 10 + 5;        // 15
let difference = 10 - 5; // 5
let product = 10 * 5;    // 50
let quotient = 10 / 5;   // 2
let remainder = 10 % 3;  // 1
let power = 2 ** 4;      // 16
```

---

### Assignment Operators

| Operator | Example | Equivalent to |
|----------|---------|---------------|
| `=` | `x = 5` | x = 5 |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |

```javascript
let count = 5;
count += 2;  // count is now 7
count -= 1;  // count is now 6
```

---

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `===` | Strict equality (value + type) | `5 === 5` true |
| `!==` | Strict inequality | `5 !== "5"` true |
| `==` | Loose equality (type coercion) | `5 == "5"` true |
| `!=` | Loose inequality | `5 != "6"` true |
| `>` | Greater than | `5 > 3` true |
| `<` | Less than | `5 < 3` false |
| `>=` | Greater than or equal | `5 >= 5` true |
| `<=` | Less than or equal | `5 <= 4` false |

---

### Strict Equality (`===`) vs Loose Equality (`==`)

**Always use `===` unless you have a specific reason not to.**

```javascript
// Loose equality (type coercion)
5 == "5"    // true (string converted to number)
0 == false  // true (boolean converted to number)
null == undefined // true

// Strict equality (no type coercion)
5 === "5"   // false (different types)
0 === false // false
null === undefined // false
```

---

### Type Coercion

JavaScript automatically converts types in certain situations.

```javascript
// String concatenation with +
"5" + 3    // "53" (number becomes string)
5 + "3"    // "53"

// Other operators trigger numeric conversion
"5" - 3    // 2 (string becomes number)
"5" * "2"  // 10
```

**Best practice:** Avoid relying on type coercion. Be explicit with type conversion.

```javascript
// Explicit conversion
let str = "123";
let num = Number(str);  // 123
let strAgain = String(num); // "123"
```

---

## 🌲 Part 3: DOM Basics

### What is the DOM?

The DOM (Document Object Model) is a tree-like representation of your HTML that JavaScript can interact with.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── header
        ├── main
        └── footer
```

---

### Selecting Elements

#### `getElementById`
Selects a single element by its `id` attribute.

```javascript
const heading = document.getElementById('main-title');
```

#### `querySelector`
Selects the first element matching a CSS selector.

```javascript
const button = document.querySelector('.btn');        // Class selector
const heading = document.querySelector('#main-title'); // ID selector
const firstPara = document.querySelector('p');        // Element selector
```

#### `querySelectorAll`
Selects ALL elements matching a CSS selector (returns a NodeList).

```javascript
const allButtons = document.querySelectorAll('.btn');
const allParagraphs = document.querySelectorAll('p');
```

---

### Modifying Content

#### `textContent`
Sets or gets the text content of an element (ignores HTML tags).

```javascript
// Get text
const text = element.textContent;

// Set text
element.textContent = "New text here";
```

#### `innerHTML`
Sets or gets HTML content (parses HTML tags).

```javascript
// Get HTML
const html = element.innerHTML;

// Set HTML (renders tags)
element.innerHTML = "<strong>Bold text</strong>";
```

**Security note:** Be careful with `innerHTML` when using user input (XSS risk). Prefer `textContent` when possible.

---

### Changing Styles

#### `style` property
Modifies inline styles.

```javascript
element.style.color = "blue";
element.style.backgroundColor = "#f0f0f0";
element.style.fontSize = "20px";
element.style.display = "none";
```

**Note:** CSS properties with hyphens become camelCase: `background-color` → `backgroundColor`

---

### Changing Classes

#### `classList` methods

| Method | Description |
|--------|-------------|
| `add('class')` | Adds a class |
| `remove('class')` | Removes a class |
| `toggle('class')` | Adds if missing, removes if present |
| `contains('class')` | Checks if class exists |

```javascript
const element = document.querySelector('.box');

// Add a class
element.classList.add('highlight');

// Remove a class
element.classList.remove('old-class');

// Toggle a class (add if missing, remove if present)
element.classList.toggle('dark-mode');

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}
```

---

### Events

Events are actions that happen in the browser that JavaScript can respond to.

#### Common Events

| Event | Description |
|-------|-------------|
| `click` | Element clicked |
| `input` | Input value changed |
| `mouseenter` | Mouse enters element |
| `mouseleave` | Mouse leaves element |
| `submit` | Form submitted |
| `load` | Page finished loading |

#### Adding Event Listeners

```javascript
const button = document.querySelector('button');

// Basic function
function handleClick() {
    alert('Button clicked!');
}
button.addEventListener('click', handleClick);

// Anonymous function
button.addEventListener('click', function() {
    console.log('Button was clicked');
});

// Arrow function
button.addEventListener('click', () => {
    console.log('Arrow function clicked');
});
```

---

### Putting It All Together

```javascript
// Select elements
const button = document.getElementById('change-btn');
const heading = document.querySelector('h1');
const input = document.querySelector('input');

// Change text on button click
button.addEventListener('click', () => {
    heading.textContent = 'Text changed!';
    heading.style.color = 'blue';
});

// Update display as user types
input.addEventListener('input', () => {
    const typedValue = input.value;
    console.log(`User typed: ${typedValue}`);
});

// Toggle class on hover
const card = document.querySelector('.card');
card.addEventListener('mouseenter', () => {
    card.classList.add('highlight');
});
card.addEventListener('mouseleave', () => {
    card.classList.remove('highlight');
});
```

---

## 📝 Quick Reference

### Adding JavaScript
```html
<!-- External (best) -->
<script src="script.js"></script>

<!-- Internal -->
<script>
    // JavaScript here
</script>
```

### Variables
```javascript
let mutable = "can change";
const constant = "cannot change";
```

### Data Types
```javascript
"string"      // String
123           // Number
true / false  // Boolean
null          // Null
undefined     // Undefined
```

### Operators
```javascript
+ - * / %      // Arithmetic
+= -= *= /=    // Assignment
=== !==        // Strict equality (USE THESE)
== !=          // Loose equality (avoid)
> < >= <=      // Comparison
```

### DOM Selection
```javascript
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('p')
```

### DOM Manipulation
```javascript
element.textContent = "text";
element.innerHTML = "<strong>HTML</strong>";
element.style.color = "blue";
element.classList.add('class');
element.classList.remove('class');
element.classList.toggle('class');
```

### Events
```javascript
element.addEventListener('click', () => {});
element.addEventListener('input', () => {});
element.addEventListener('mouseenter', () => {});
```

---

## ✅ Day 12 Checklist

- [ ] Add JavaScript using external file
- [ ] Declare variables with `let` and `const`
- [ ] Use different data types (string, number, boolean)
- [ ] Use template literals for string interpolation
- [ ] Use arithmetic and comparison operators
- [ ] Understand difference between `===` and `==`
- [ ] Select elements with `getElementById` and `querySelector`
- [ ] Modify content with `textContent`
- [ ] Change styles using `style` property
- [ ] Add/remove/toggle classes with `classList`
- [ ] Add event listeners for `click`, `input`, `mouseenter`, `mouseleave`
- [ ] Build Interactive Page mini-project
- [ ] Build Dark Mode Portfolio mini-project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Use `const` by default** — only use `let` when you need to reassign
2. **Avoid `var`** — it's outdated and causes problems
3. **Use `===` for comparison** — `==` does type coercion and is unpredictable
4. **Template literals are your friend** — use backticks and `${}` for strings
5. **`querySelector` is the most versatile** — works with any CSS selector
6. **`classList.toggle()` is perfect for dark mode** — adds/removes classes easily
7. **Always wait for DOM to load** — put scripts at end of `<body>` or use `DOMContentLoaded`
8. **Prefer `textContent` over `innerHTML`** — safer and faster
