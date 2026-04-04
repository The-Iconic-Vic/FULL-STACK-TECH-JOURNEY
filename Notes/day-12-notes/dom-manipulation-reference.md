# 📘 DOM Manipulation Reference

## What is the DOM?

DOM = Document Object Model. It's a tree-like representation of your HTML.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1 id="main-heading">Hello</h1>
    <p class="text">This is a paragraph.</p>
</body>
</html>
DOM Tree:

text
document
└── html
    ├── head
    │   └── title
    │       └── "Page Title"
    └── body
        ├── h1#main-heading
        │   └── "Hello"
        └── p.text
            └── "This is a paragraph."
Selecting Elements
Single Element
Method	Syntax	Example
getElementById	document.getElementById('id')	const h1 = document.getElementById('main-heading');
querySelector	document.querySelector('selector')	const h1 = document.querySelector('#main-heading');
javascript
// By ID
const heading = document.getElementById('main-heading');

// By CSS selector (first matching)
const firstButton = document.querySelector('.btn');
const heading2 = document.querySelector('#main-heading');
const firstParagraph = document.querySelector('p');
Multiple Elements
Method	Returns	Syntax
getElementsByClassName	HTMLCollection	document.getElementsByClassName('class')
getElementsByTagName	HTMLCollection	document.getElementsByTagName('p')
querySelectorAll	NodeList	document.querySelectorAll('.class')
javascript
// All elements with class
const buttons = document.querySelectorAll('.btn');

// All paragraphs
const paragraphs = document.querySelectorAll('p');

// Get by class (older way)
const items = document.getElementsByClassName('item');

// Get by tag (older way)
const divs = document.getElementsByTagName('div');
HTMLCollection vs NodeList
Feature	HTMLCollection	NodeList
Live vs Static	Live (updates automatically)	Static (snapshot)
forEach method	No	Yes (modern browsers)
Array methods	No	No (convert to array)
javascript
// Convert NodeList to array
const buttons = document.querySelectorAll('.btn');
const buttonArray = Array.from(buttons);

// Or use spread operator
const buttonArray2 = [...buttons];
Modifying Content
textContent
Use for plain text (no HTML parsing).

javascript
// Get
const text = element.textContent;

// Set
element.textContent = "New text here";

// Append
element.textContent += " More text";
innerHTML
Use for HTML content (parses tags).

javascript
// Get HTML
const html = element.innerHTML;

// Set HTML
element.innerHTML = "<strong>Bold text</strong>";

// Append HTML
element.innerHTML += "<em>More content</em>";
innerText (Similar to textContent)
Property	Description
textContent	Returns all text, including hidden elements
innerText	Returns visible text only, respects CSS styling
javascript
// Prefer textContent (faster, more consistent)
element.textContent = "Hello";
Modifying Attributes
javascript
// Get attribute
const src = img.getAttribute('src');

// Set attribute
img.setAttribute('src', 'image.jpg');
img.setAttribute('alt', 'Description');

// Remove attribute
img.removeAttribute('alt');

// Check if attribute exists
if (img.hasAttribute('src')) {
    console.log('Has src');
}

// Common properties (shortcuts)
img.src = 'image.jpg';
img.alt = 'Description';
input.value = 'Default text';
a.href = 'https://example.com';
a.target = '_blank';
Modifying Styles
style Property (Inline Styles)
javascript
// Single style
element.style.color = 'blue';
element.style.fontSize = '20px';
element.style.backgroundColor = '#f0f0f0';

// Multiple styles
Object.assign(element.style, {
    color: 'blue',
    fontSize: '20px',
    backgroundColor: '#f0f0f0'
});
CSS Property Conversion:

CSS	JavaScript
background-color	backgroundColor
font-size	fontSize
margin-top	marginTop
border-radius	borderRadius
getComputedStyle (Read styles)
javascript
// Get computed styles (including from CSS)
const styles = getComputedStyle(element);
const color = styles.color;
const fontSize = styles.fontSize;
Modifying Classes
classList Methods
Method	Description	Example
add('class')	Adds class	element.classList.add('highlight')
remove('class')	Removes class	element.classList.remove('old')
toggle('class')	Toggles class	element.classList.toggle('active')
contains('class')	Checks existence	element.classList.contains('hidden')
replace('old', 'new')	Replaces class	element.classList.replace('old', 'new')
javascript
// Add multiple classes
element.classList.add('class1', 'class2', 'class3');

// Remove multiple classes
element.classList.remove('class1', 'class2');

// Toggle (add if missing, remove if present)
element.classList.toggle('dark-mode');

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}
className (String approach)
javascript
// Get all classes as string
const allClasses = element.className;

// Set classes (overwrites all)
element.className = 'class1 class2 class3';
Traversing the DOM
Parent, Children, Siblings
javascript
// Parent
const parent = element.parentElement;
const parentNode = element.parentNode;

// Children
const children = element.children;        // HTMLCollection (elements only)
const childNodes = element.childNodes;    // NodeList (includes text nodes)
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Siblings
const previous = element.previousElementSibling;
const next = element.nextElementSibling;

// Find ancestor
const closest = element.closest('.container'); // Finds closest matching ancestor
Creating and Removing Elements
javascript
// Create element
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');

// Add text
newParagraph.textContent = 'Hello World';

// Add class
newDiv.classList.add('container');

// Append to parent
parent.appendChild(newDiv);
parent.append(newDiv, newParagraph); // Multiple elements

// Prepend (add as first child)
parent.prepend(newDiv);

// Insert before another element
parent.insertBefore(newDiv, referenceElement);

// Insert adjacent
element.insertAdjacentHTML('beforebegin', '<div>Before</div>');
element.insertAdjacentHTML('afterbegin', '<div>First child</div>');
element.insertAdjacentHTML('beforeend', '<div>Last child</div>');
element.insertAdjacentHTML('afterend', '<div>After</div>');

// Remove element
element.remove();
parent.removeChild(element);

// Replace element
parent.replaceChild(newElement, oldElement);
Events
Adding Event Listeners
javascript
// Named function
function handleClick() {
    console.log('Clicked!');
}
element.addEventListener('click', handleClick);

// Anonymous function
element.addEventListener('click', function() {
    console.log('Clicked!');
});

// Arrow function
element.addEventListener('click', () => {
    console.log('Clicked!');
});
Removing Event Listeners
javascript
function handleClick() {
    console.log('Clicked!');
}

// Add
element.addEventListener('click', handleClick);

// Remove (must reference same function)
element.removeEventListener('click', handleClick);
Event Object
javascript
element.addEventListener('click', (event) => {
    console.log(event.target);      // Element that triggered event
    console.log(event.currentTarget); // Element listener is attached to
    console.log(event.type);        // Event type ('click')
    console.log(event.clientX);     // Mouse X position
    console.log(event.clientY);     // Mouse Y position
});
Event Bubbling and Delegation
javascript
// Stop propagation
element.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevents parent listeners from firing
});

// Prevent default (e.g., link navigation)
element.addEventListener('click', (event) => {
    event.preventDefault();
});

// Event delegation (handle multiple elements)
document.querySelector('.parent').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        console.log('Button clicked:', event.target);
    }
});
Common Event Types
Mouse Events
Event	Description
click	Element clicked
dblclick	Element double-clicked
mouseenter	Mouse enters element
mouseleave	Mouse leaves element
mousemove	Mouse moves over element
mousedown	Mouse button pressed
mouseup	Mouse button released
Keyboard Events
Event	Description
keydown	Key pressed
keyup	Key released
keypress	Key pressed (deprecated)
javascript
document.addEventListener('keydown', (event) => {
    console.log(event.key);   // 'a', 'Enter', 'ArrowUp'
    console.log(event.code);  // 'KeyA', 'Enter', 'ArrowUp'
});
Form Events
Event	Description
input	Input value changes
change	Input loses focus with changed value
submit	Form submitted
focus	Element gains focus
blur	Element loses focus
javascript
const input = document.querySelector('input');
input.addEventListener('input', (e) => {
    console.log(e.target.value);  // Current input value
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent page refresh
    console.log('Form submitted');
});
Window Events
Event	Description
load	Page fully loaded
DOMContentLoaded	DOM loaded (before images)
resize	Window resized
scroll	Page scrolled
javascript
// Wait for DOM (preferred)
document.addEventListener('DOMContentLoaded', () => {
    // Safe to access DOM elements
});

// Wait for all resources
window.addEventListener('load', () => {
    // Everything is loaded (images, fonts, etc.)
});

// Resize
window.addEventListener('resize', () => {
    console.log(`Width: ${window.innerWidth}`);
});

// Scroll
window.addEventListener('scroll', () => {
    console.log(`Scroll Y: ${window.scrollY}`);
});
DOM Ready Patterns
javascript
// Method 1: DOMContentLoaded (recommended)
document.addEventListener('DOMContentLoaded', () => {
    // DOM is ready
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {});
});

// Method 2: Self-invoking function with check
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // DOM is ready
    }
})();

// Method 3: Put script at end of body (simplest)
<!-- <script src="script.js"></script> -->
Performance Best Practices
javascript
// BAD: DOM access in loop
for (let i = 0; i < 100; i++) {
    document.querySelector('.container').innerHTML += `<div>${i}</div>`;
}

// GOOD: Cache DOM reference
const container = document.querySelector('.container');
let html = '';
for (let i = 0; i < 100; i++) {
    html += `<div>${i}</div>`;
}
container.innerHTML = html;

// BAD: Multiple style changes
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.margin = '10px';

// GOOD: Add class
element.classList.add('highlight');