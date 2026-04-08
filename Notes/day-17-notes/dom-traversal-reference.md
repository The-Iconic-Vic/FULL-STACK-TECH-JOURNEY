# 📘 DOM Traversal Reference

## Parent Traversal

### parentElement
Returns the parent element node (excludes text nodes, comments).

```javascript
const child = document.getElementById('child');
const parent = child.parentElement;
console.log(parent);  // <div id="parent">...</div>

// Returns null if no parent element
const orphan = document.createElement('div');
console.log(orphan.parentElement);  // null
parentNode
Returns the parent node (includes text nodes, document fragments).

javascript
const child = document.getElementById('child');
const parent = child.parentNode;
// Usually same as parentElement, but can be document or documentFragment
closest()
Finds the closest ancestor matching a selector (including itself).

javascript
const element = document.getElementById('target');

// Find nearest .container ancestor
const container = element.closest('.container');

// Find nearest section ancestor
const section = element.closest('section');

// Returns null if no match found
const notFound = element.closest('.nonexistent');

// Great for event delegation
document.addEventListener('click', (e) => {
    const todoItem = e.target.closest('.todo-item');
    if (todoItem) {
        // Handle click on todo item
    }
});
Child Traversal
children
Returns an HTMLCollection of child elements (only elements, not text nodes).

javascript
const parent = document.getElementById('parent');
const children = parent.children;

// Access by index
const firstChild = children[0];
const lastChild = children[children.length - 1];

// Loop through children
for (let i = 0; i < children.length; i++) {
    console.log(children[i]);
}

// Convert to array for array methods
const childArray = Array.from(children);
childArray.forEach(child => console.log(child));
childNodes
Returns a NodeList of all child nodes (includes text nodes, comments).

javascript
const parent = document.getElementById('parent');
const nodes = parent.childNodes;

// Includes text nodes (whitespace, line breaks)
// Usually use .children instead
firstElementChild / lastElementChild
Returns the first/last child element (skips text nodes).

javascript
const parent = document.getElementById('parent');
const first = parent.firstElementChild;
const last = parent.lastElementChild;
firstChild / lastChild
Returns the first/last child node (includes text nodes).

javascript
const parent = document.getElementById('parent');
const firstNode = parent.firstChild;  // Could be text node
const lastNode = parent.lastChild;
Sibling Traversal
previousElementSibling / nextElementSibling
Returns previous/next sibling element (skips text nodes).

javascript
const current = document.getElementById('middle');

const previous = current.previousElementSibling;
const next = current.nextElementSibling;

// Check if exists before using
if (previous) {
    console.log(previous);
}

// Loop through all previous siblings
let prev = current.previousElementSibling;
while (prev) {
    console.log(prev);
    prev = prev.previousElementSibling;
}
previousSibling / nextSibling
Returns previous/next sibling node (includes text nodes).

javascript
const current = document.getElementById('middle');
const prevNode = current.previousSibling;  // Could be text node
const nextNode = current.nextSibling;
Advanced Traversal
Walking the DOM
javascript
// Get all descendants (recursive)
function getAllDescendants(element) {
    const descendants = [];
    const children = element.children;
    
    for (let i = 0; i < children.length; i++) {
        descendants.push(children[i]);
        descendants.push(...getAllDescendants(children[i]));
    }
    
    return descendants;
}

// Get all ancestors
function getAllAncestors(element) {
    const ancestors = [];
    let current = element.parentElement;
    
    while (current) {
        ancestors.push(current);
        current = current.parentElement;
    }
    
    return ancestors;
}

// Find all elements with a specific class (custom implementation)
function findElementsByClass(root, className) {
    const matches = [];
    const elements = root.getElementsByTagName('*');
    
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(className)) {
            matches.push(elements[i]);
        }
    }
    
    return matches;
}
querySelector for Traversal
Often easier than manual traversal:

javascript
const element = document.getElementById('start');

// Find next sibling with specific class
const nextWithClass = element.nextElementSibling?.classList.contains('target') 
    ? element.nextElementSibling 
    : null;

// Find previous sibling with specific tag
let prev = element.previousElementSibling;
while (prev && prev.tagName !== 'DIV') {
    prev = prev.previousElementSibling;
}

// Better: use querySelector on parent
const parent = element.parentElement;
const nextDiv = parent.querySelector('#start + .target');
Traversal with Relationships
javascript
// Get all children that are checkboxes
const parent = document.getElementById('todo-list');
const checkboxes = parent.querySelectorAll('input[type="checkbox"]');

// Get all text from an element and its children
function getElementText(element) {
    return element.textContent.trim();
}

// Get all input values in a form
const form = document.getElementById('my-form');
const formData = {};
for (const input of form.querySelectorAll('input, select, textarea')) {
    formData[input.name] = input.value;
}

// Find all empty paragraphs
const emptyParagraphs = document.querySelectorAll('p:empty');

// Find elements with no children
const emptyElements = document.querySelectorAll('*:empty');
Performance Tips
javascript
// BAD: Repeated DOM traversal in loop
for (let i = 0; i < 100; i++) {
    const container = document.getElementById('container');
    container.innerHTML += `<div>${i}</div>`;
}

// GOOD: Cache DOM reference
const container = document.getElementById('container');
let html = '';
for (let i = 0; i < 100; i++) {
    html += `<div>${i}</div>`;
}
container.innerHTML = html;

// BAD: Multiple reflows
const element = document.getElementById('box');
element.style.width = '100px';
element.style.height = '100px';
element.style.backgroundColor = 'red';

// GOOD: Batch changes with class or cssText
element.classList.add('box-style');
// OR
element.style.cssText = 'width: 100px; height: 100px; background-color: red;';
Practical Examples
Event Delegation with closest()
javascript
document.getElementById('todo-list').addEventListener('click', (e) => {
    // Find the todo item that was clicked (or its child)
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;
    
    // Find which button was clicked
    if (e.target.classList.contains('delete-btn')) {
        todoItem.remove();
    } else if (e.target.classList.contains('edit-btn')) {
        const textSpan = todoItem.querySelector('.todo-text');
        // Edit logic...
    }
});
Finding Next/Previous with Condition
javascript
function findNextSibling(element, condition) {
    let next = element.nextElementSibling;
    while (next) {
        if (condition(next)) {
            return next;
        }
        next = next.nextElementSibling;
    }
    return null;
}

// Find next sibling with class 'active'
const nextActive = findNextSibling(current, el => el.classList.contains('active'));
Getting All Text from a Section
javascript
function getTextFromSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return '';
    return section.textContent.trim();
}