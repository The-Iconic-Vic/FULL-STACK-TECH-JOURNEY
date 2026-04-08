# 📅 Day 17: DOM Manipulation Methods

**Date:** April 8, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Creating Elements, Adding to DOM, Removing Elements, DOM Traversal

---

## 📋 Learning Objectives

- ✅ Create new elements with `createElement()`
- ✅ Add content with `textContent` and `innerHTML`
- ✅ Add elements to DOM with `appendChild()`, `prepend()`, `append()`
- ✅ Remove elements with `remove()` and `removeChild()`
- ✅ Copy elements with `cloneNode()`
- ✅ Traverse DOM (parent, children, siblings)
- ✅ Build a complete Todo List app using all these methods

---

## 🏗️ Part 1: Creating Elements

### `document.createElement()`

Creates a new HTML element that is not yet attached to the DOM.

```javascript
// Create a new element
const div = document.createElement('div');
const p = document.createElement('p');
const button = document.createElement('button');
const li = document.createElement('li');

// The element exists in memory but is not visible yet
console.log(div);  // <div></div>
```

### Setting Content

#### `textContent` - For plain text (safe, faster)
```javascript
const p = document.createElement('p');
p.textContent = 'This is a paragraph';
// <p>This is a paragraph</p>

// Setting text content escapes HTML (safe from XSS)
p.textContent = '<strong>Bold</strong>';  // Shows "<strong>Bold</strong>" as text
```

#### `innerHTML` - For HTML content (be careful with user input)
```javascript
const div = document.createElement('div');
div.innerHTML = '<h1>Title</h1><p>Description</p>';
// <div><h1>Title</h1><p>Description</p></div>

// WARNING: Can lead to XSS with user input
// div.innerHTML = userInput;  // DANGEROUS if userInput contains scripts
```

#### `innerText` - Similar to textContent but respects styling
```javascript
const p = document.createElement('p');
p.innerText = 'Hello World';
// <p>Hello World</p>
```

---

### Setting Attributes

```javascript
const img = document.createElement('img');

// Using setAttribute()
img.setAttribute('src', 'image.jpg');
img.setAttribute('alt', 'Description');

// Direct property access
img.src = 'image.jpg';
img.alt = 'Description';

// For class
img.className = 'my-class';
img.classList.add('another-class');

// For ID
img.id = 'unique-id';
```

---

## 📎 Part 2: Adding Elements to DOM

### `appendChild()`

Adds a node as the last child of a parent element.

```javascript
const parent = document.getElementById('parent');
const child = document.createElement('div');
child.textContent = 'I am a child';

parent.appendChild(child);
// Child is added at the end of parent's children
```

### `prepend()`

Adds a node as the first child of a parent element.

```javascript
const parent = document.getElementById('parent');
const firstChild = document.createElement('div');
firstChild.textContent = 'I am first';

parent.prepend(firstChild);
// Child is added at the beginning of parent's children
```

### `append()` (Modern)

Adds multiple nodes or strings to the end.

```javascript
const parent = document.getElementById('parent');

// Add multiple elements
const div1 = document.createElement('div');
const div2 = document.createElement('div');
parent.append(div1, div2);

// Add text directly
parent.append('Hello ', 'World');
```

### `prepend()` (Modern)

Adds multiple nodes or strings to the beginning.

```javascript
const parent = document.getElementById('parent');
parent.prepend('First text', element1, element2);
```

### `insertBefore()`

Inserts a node before a reference node.

```javascript
const parent = document.getElementById('parent');
const newChild = document.createElement('div');
const referenceChild = document.getElementById('reference');

parent.insertBefore(newChild, referenceChild);
// newChild inserted before referenceChild
```

### `insertAdjacentHTML()`

Inserts HTML at specific positions.

```javascript
const element = document.getElementById('target');

// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
element.insertAdjacentHTML('beforebegin', '<div>Before element</div>');
element.insertAdjacentHTML('afterbegin', '<div>First child</div>');
element.insertAdjacentHTML('beforeend', '<div>Last child</div>');
element.insertAdjacentHTML('afterend', '<div>After element</div>');
```

---

## 🗑️ Part 3: Removing Elements

### `remove()` (Modern)

Removes the element from the DOM.

```javascript
const element = document.getElementById('to-remove');
element.remove();  // Element is gone

// Can chain
document.querySelector('.temp').remove();
```

### `removeChild()`

Removes a child element from a parent.

```javascript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.removeChild(child);
// Child is removed from parent
```

### Clearing all children

```javascript
const parent = document.getElementById('parent');

// Method 1: innerHTML (fastest)
parent.innerHTML = '';

// Method 2: while loop (preserves parent)
while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
```

---

## 📋 Part 4: Copying Elements

### `cloneNode()`

Creates a copy of an element.

```javascript
const original = document.getElementById('original');

// Shallow clone - copies element but NOT its children
const shallowClone = original.cloneNode();

// Deep clone - copies element AND all its children
const deepClone = original.cloneNode(true);

// Add clone to DOM
document.body.appendChild(deepClone);
```

**Use cases:**
- Duplicating template elements
- Creating multiple similar items
- Preserving original while modifying copy

---

## 🔍 Part 5: DOM Traversal

### Parent Properties

```javascript
const element = document.getElementById('child');

// Parent element (only elements, not text nodes)
const parent = element.parentElement;

// Parent node (includes text nodes, document fragments)
const parentNode = element.parentNode;

// Closest ancestor matching selector
const container = element.closest('.container');
```

### Child Properties

```javascript
const parent = document.getElementById('parent');

// All child elements (HTMLCollection)
const children = parent.children;

// First child element
const firstChild = parent.firstElementChild;

// Last child element
const lastChild = parent.lastElementChild;

// Child nodes (includes text, comments)
const childNodes = parent.childNodes;
```

### Sibling Properties

```javascript
const element = document.getElementById('middle');

// Previous sibling element
const previous = element.previousElementSibling;

// Next sibling element
const next = element.nextElementSibling;

// Previous sibling node (includes text nodes)
const previousNode = element.previousSibling;

// Next sibling node
const nextNode = element.nextSibling;
```

### Traversal Examples

```javascript
// Get all text from an element and its children
function getText(element) {
    return element.textContent;
}

// Find all checked checkboxes in a container
const container = document.getElementById('todo-list');
const checkedBoxes = container.querySelectorAll('input[type="checkbox"]:checked');

// Loop through children
for (const child of parent.children) {
    console.log(child);
}

// Using closest to find parent
const button = document.querySelector('.delete-btn');
const todoItem = button.closest('.todo-item');
```

---

## 🎯 Part 6: Complete Todo List Example

### HTML Structure
```html
<ul id="todo-list">
    <li class="todo-item">
        <input type="checkbox" class="todo-checkbox">
        <span class="todo-text">Learn JavaScript</span>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
    </li>
</ul>
```

### Creating a Todo Element
```javascript
function createTodoElement(todo) {
    // Create elements
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const textSpan = document.createElement('span');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    
    // Set properties
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    
    // Add event listeners
    checkbox.addEventListener('change', () => toggleComplete(todo.id));
    editBtn.addEventListener('click', () => editTodo(todo.id));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    // Assemble
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    return li;
}
```

### Adding to DOM
```javascript
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.push(newTodo);
    const todoElement = createTodoElement(newTodo);
    todoList.appendChild(todoElement);
    todoInput.value = '';
}
```

### Removing a Todo
```javascript
function deleteTodo(id) {
    const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
    todoElement.remove();  // Remove from DOM
    
    // Or remove from array and re-render
    todos = todos.filter(todo => todo.id !== id);
    renderTodoList();
}
```

---

## 📝 Quick Reference

### Creating Elements
| Method | Purpose |
|--------|---------|
| `createElement(tag)` | Create new element |
| `textContent` | Set plain text content |
| `innerHTML` | Set HTML content |
| `setAttribute(name, value)` | Set attribute |
| `classList.add/remove/toggle` | Manage classes |

### Adding to DOM
| Method | Position |
|--------|----------|
| `appendChild(node)` | Last child |
| `prepend(node)` | First child |
| `append(node1, node2)` | End (multiple) |
| `insertBefore(node, ref)` | Before reference |
| `insertAdjacentHTML(position, html)` | Various positions |

### Removing from DOM
| Method | Description |
|--------|-------------|
| `element.remove()` | Remove element |
| `parent.removeChild(child)` | Remove child |
| `parent.innerHTML = ''` | Clear all children |

### Copying Elements
| Method | Description |
|--------|-------------|
| `cloneNode()` | Shallow copy |
| `cloneNode(true)` | Deep copy |

### Traversal
| Property | Description |
|----------|-------------|
| `parentElement` | Parent element |
| `children` | Child elements |
| `firstElementChild` | First child |
| `lastElementChild` | Last child |
| `previousElementSibling` | Previous sibling |
| `nextElementSibling` | Next sibling |
| `closest(selector)` | Nearest ancestor |

---

## ✅ Day 17 Checklist

- [ ] Create elements with `createElement()`
- [ ] Set content with `textContent` and `innerHTML`
- [ ] Add elements with `appendChild()`, `prepend()`, `append()`
- [ ] Remove elements with `remove()` and `removeChild()`
- [ ] Copy elements with `cloneNode()`
- [ ] Traverse DOM (parent, children, siblings)
- [ ] Use `classList` to manage classes
- [ ] Build complete Todo List app
- [ ] Implement add, edit, delete, complete features
- [ ] Add filter functionality (All/Active/Completed)
- [ ] Add clear completed feature
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **`createElement()` creates elements in memory** — they don't appear until added to DOM
2. **`textContent` is safer than `innerHTML`** — prevents XSS attacks
3. **`appendChild()` adds to end**, `prepend()` adds to beginning
4. **`remove()` is the simplest way** to delete an element
5. **`cloneNode(true)` creates deep copies** including all children
6. **DOM traversal properties** let you move between related elements
7. **`closest()` is great for finding parents** — goes up the tree
8. **Event listeners on dynamic elements** need to be added after creation
9. **Re-rendering vs updating** — for complex UIs, re-rendering can be simpler
10. **Filter and clear completed** are great features for todo apps

