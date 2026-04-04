**File:** `resources/day-12-resources.md`

```markdown
# 📚 Day 12 Resources - Introduction to JavaScript

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: JavaScript Guide | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide |
| MDN: JavaScript Basics | https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics |
| MDN: DOM Manipulation | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents |
| MDN: Event Reference | https://developer.mozilla.org/en-US/docs/Web/Events |
| JavaScript.info: Hello World | https://javascript.info/hello-world |
| JavaScript.info: Variables | https://javascript.info/variables |
| JavaScript.info: DOM Navigation | https://javascript.info/dom-navigation |
| W3Schools: JavaScript Tutorial | https://www.w3schools.com/js/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JavaScript in 1 Hour | https://youtu.be/W6NZfCO5SIk |
| JavaScript DOM Tutorial | https://youtu.be/0ik6X4DJKCc |
| JavaScript Events Tutorial | https://youtu.be/7UstS0hsHgI |
| JavaScript for Beginners | https://youtu.be/PkZNo7MFNFg |
| DOM Manipulation Crash Course | https://youtu.be/0ik6X4DJKCc |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools Console | Test JavaScript code | Built into Chrome |
| JSFiddle | Online JavaScript playground | https://jsfiddle.net |
| CodePen | Frontend playground | https://codepen.io |
| JS Bin | JavaScript testing | https://jsbin.com |
| JavaScript Console | Browser console shortcuts | `F12` → Console tab |

## 📝 JavaScript Cheatsheet

### Adding JavaScript
```html
<!-- External (best) -->
<script src="script.js"></script>

<!-- Internal -->
<script>
    // JavaScript code
</script>
```

### Variables
```javascript
let name = "value";      // Can change
const PI = 3.14;         // Cannot change
var old = "avoid this";  // Don't use
```

### Data Types
| Type | Example |
|------|---------|
| String | `"Hello"`, `'World'`, `` `Template` `` |
| Number | `42`, `3.14`, `-10` |
| Boolean | `true`, `false` |
| Null | `null` |
| Undefined | `undefined` |

### Template Literals
```javascript
const name = "Victor";
const message = `Hello, ${name}!`;  // Hello, Victor!
```

### Operators

**Arithmetic:**
```javascript
+  -  *  /  %  **
```

**Assignment:**
```javascript
=  +=  -=  *=  /=
```

**Comparison (use === and !==):**
```javascript
===  !==  >  <  >=  <=
```

### DOM Selection
```javascript
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('p')
```

### DOM Manipulation
```javascript
// Content
element.textContent = "text";
element.innerHTML = "<strong>HTML</strong>";

// Styles
element.style.color = "blue";
element.style.backgroundColor = "#f0f0f0";

// Classes
element.classList.add('class');
element.classList.remove('class');
element.classList.toggle('class');
```

### Events
```javascript
element.addEventListener('click', () => {});
element.addEventListener('input', (e) => {});
element.addEventListener('mouseenter', () => {});
element.addEventListener('mouseleave', () => {});
```

## 🎮 Interactive Learning

| Platform | Description | Link |
|----------|-------------|------|
| freeCodeCamp | Interactive JavaScript curriculum | https://freecodecamp.org |
| Codecademy | JavaScript courses | https://codecademy.com |
| JavaScript30 | 30-day vanilla JS challenge | https://javascript30.com |
| Exercism | JavaScript practice problems | https://exercism.org/tracks/javascript |
| Codewars | JavaScript coding challenges | https://codewars.com |

## 📝 Common Event Types

| Event | Triggers When |
|-------|---------------|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `input` | Input value changes |
| `change` | Input loses focus with changed value |
| `submit` | Form is submitted |
| `mouseenter` | Mouse enters element |
| `mouseleave` | Mouse leaves element |
| `mouseover` | Mouse enters element (bubbles) |
| `keydown` | Key is pressed |
| `keyup` | Key is released |
| `load` | Page finishes loading |
| `scroll` | Page or element is scrolled |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Uncaught TypeError: Cannot read property 'addEventListener' of null` | Script runs before DOM loads | Put script at end of `<body>` or use `DOMContentLoaded` |
| Variable not defined | Using `const` when value needs to change | Use `let` instead |
| `5 == "5"` returns true | Loose equality type coercion | Use `===` for strict equality |
| `element.style.backgroundColor` not working | CSS property hyphenation | Use camelCase: `backgroundColor` |
| Class not being added | Misspelled class name | Check spelling, use browser console |
| Event firing multiple times | Event listener added multiple times | Remove listener or check for duplicates |

## ✅ DOMContentLoaded Pattern

```javascript
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Your code here - safe to access DOM elements
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
        console.log('Button clicked!');
    });
});
```

## 📚 Further Reading

| Topic | Link |
|-------|------|
| JavaScript Variables (let vs const vs var) | https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/ |
| JavaScript Data Types | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures |
| Event Bubbling and Capturing | https://javascript.info/bubbling-and-capturing |
| JavaScript Best Practices | https://www.w3schools.com/js/js_best_practices.asp |

## 🔗 Related Resources

- [Day 4 Resources - CSS Basics](../day-4-resources.md)
- [Day 5 Resources - Box Model](../day-5-resources.md)
- [Day 6 Resources - Flexbox](../day-6-resources.md)
- [Day 7 Resources - CSS Grid](../day-7-resources.md)
- [Day 8 Resources - Advanced Selectors](../day-8-resources.md)
- [Day 9 Resources - CSS Animations](../day-9-resources.md)
- [Day 10 Resources - Forms & Validation](../day-10-resources.md)
- [Day 11 Resources - Responsive Design](../day-11-resources.md)
```