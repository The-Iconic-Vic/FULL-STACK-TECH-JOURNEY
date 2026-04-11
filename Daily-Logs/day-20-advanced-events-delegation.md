# 📅 Day 20: Advanced Events & Event Delegation

**Date:** April 11, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Mouse Events, Keyboard Events, Event Delegation, stopPropagation, preventDefault, Debouncing, Custom Events

---

## 📋 Learning Objectives

- ✅ Handle mouse events: click, mousemove, mousedown, mouseup, mouseenter, mouseleave
- ✅ Handle keyboard events: keydown, keyup, keypress
- ✅ Understand event delegation for dynamic elements
- ✅ Differentiate stopPropagation() vs preventDefault()
- ✅ Implement debouncing for performance optimization
- ✅ Create and dispatch custom events

---

## 🖱️ Part 1: Mouse Events

### Common Mouse Events

| Event | Description | Triggers |
|-------|-------------|----------|
| `click` | Element clicked | After mousedown + mouseup |
| `dblclick` | Double-clicked | Two quick clicks |
| `mousedown` | Mouse button pressed | Immediately on press |
| `mouseup` | Mouse button released | On release |
| `mousemove` | Mouse moves | Continuously while moving |
| `mouseenter` | Mouse enters element | Once when entering |
| `mouseleave` | Mouse leaves element | Once when leaving |
| `mouseover` | Mouse enters (bubbles) | When entering, also from children |
| `mouseout` | Mouse leaves (bubbles) | When leaving, also to children |
| `contextmenu` | Right-click | Right mouse button |

```javascript
// Basic mouse event example
const box = document.getElementById('box');

box.addEventListener('click', () => console.log('Clicked'));
box.addEventListener('dblclick', () => console.log('Double clicked'));
box.addEventListener('mousedown', () => console.log('Mouse down'));
box.addEventListener('mouseup', () => console.log('Mouse up'));
box.addEventListener('mousemove', (e) => console.log(`X: ${e.clientX}, Y: ${e.clientY}`));
box.addEventListener('mouseenter', () => console.log('Mouse entered'));
box.addEventListener('mouseleave', () => console.log('Mouse left'));
box.addEventListener('contextmenu', (e) => {
    e.preventDefault();  // Prevent right-click menu
    console.log('Right-click detected');
});
```

### Mouse Event Properties

```javascript
element.addEventListener('click', (event) => {
    // Position relative to viewport
    console.log(event.clientX, event.clientY);
    
    // Position relative to page (including scroll)
    console.log(event.pageX, event.pageY);
    
    // Position relative to target element
    console.log(event.offsetX, event.offsetY);
    
    // Which button (0=left, 1=middle, 2=right)
    console.log(event.button);
    
    // Modifier keys
    console.log(event.ctrlKey);   // Ctrl key pressed?
    console.log(event.shiftKey);  // Shift key pressed?
    console.log(event.altKey);    // Alt key pressed?
});
```

### Drawing Board Pattern (mousedown + mousemove + mouseup)

```javascript
let isDrawing = false;
let lastX = 0, lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    
    draw(lastX, lastY, e.offsetX, e.offsetY);
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;  // Stop if mouse leaves canvas
});
```

---

## ⌨️ Part 2: Keyboard Events

### Keyboard Event Types

| Event | Description |
|-------|-------------|
| `keydown` | Key is pressed (fires repeatedly while held) |
| `keyup` | Key is released |
| `keypress` | Deprecated, use keydown instead |

### Key Event Properties

```javascript
document.addEventListener('keydown', (event) => {
    // The character value of the key
    console.log(event.key);      // 'a', 'Enter', 'ArrowUp', 'Escape'
    
    // The physical key code (independent of keyboard layout)
    console.log(event.code);     // 'KeyA', 'Enter', 'ArrowUp', 'Escape'
    
    // Modifier keys
    console.log(event.ctrlKey);
    console.log(event.shiftKey);
    console.log(event.altKey);
    console.log(event.metaKey);  // Cmd on Mac, Windows key on PC
});
```

### Common Keyboard Shortcuts

```javascript
document.addEventListener('keydown', (event) => {
    // Save (Ctrl+S or Cmd+S)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        console.log('Save triggered');
        saveData();
    }
    
    // Undo (Ctrl+Z or Cmd+Z)
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        console.log('Undo triggered');
        undo();
    }
    
    // Copy (Ctrl+C or Cmd+C)
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        // Default behavior is fine, but you can intercept
        console.log('Copy triggered');
    }
    
    // Escape key
    if (event.key === 'Escape') {
        closeModal();
    }
    
    // Enter key
    if (event.key === 'Enter') {
        submitForm();
    }
    
    // Arrow keys
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        navigateUp();
    }
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        navigateDown();
    }
});
```

### Searchable Dropdown Keyboard Navigation

```javascript
let highlightedIndex = 0;
let items = [];

function handleKeydown(event) {
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
            updateHighlight();
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
            updateHighlight();
            break;
            
        case 'Enter':
            event.preventDefault();
            if (items[highlightedIndex]) {
                selectItem(items[highlightedIndex]);
            }
            break;
            
        case 'Escape':
            event.preventDefault();
            closeDropdown();
            break;
    }
}

searchInput.addEventListener('keydown', handleKeydown);
```

---

## 🔄 Part 3: Event Bubbling & Delegation

### Event Bubbling

When an event occurs on an element, it first runs on that element, then on its parent, then all the way up to the document.

```html
<div id="grandparent">
    <div id="parent">
        <button id="child">Click Me</button>
    </div>
</div>
```

```javascript
document.getElementById('child').addEventListener('click', () => {
    console.log('Child clicked');
});

document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked');
});

document.getElementById('grandparent').addEventListener('click', () => {
    console.log('Grandparent clicked');
});

// Clicking the button will log:
// "Child clicked"
// "Parent clicked"
// "Grandparent clicked"
```

### stopPropagation()

Stops the event from bubbling up to parent elements.

```javascript
child.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Only child logs, parents not notified');
});
```

### stopImmediatePropagation()

Stops propagation AND prevents other listeners on the same element from running.

```javascript
child.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    console.log('This runs');
});

child.addEventListener('click', () => {
    console.log('This does NOT run');
});
```

### preventDefault()

Prevents the browser's default behavior for an event.

```javascript
// Prevent link navigation
link.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Link clicked but no navigation');
});

// Prevent form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form not submitted to server');
});

// Prevent context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    console.log('Right-click menu prevented');
});

// Prevent arrow key scrolling
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        // Handle navigation manually
    }
});
```

### Event Delegation

Instead of attaching event listeners to many dynamic elements, attach one to a parent.

```javascript
// BAD: Attaching to each item (doesn't work for dynamic items)
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', handleDelete);
});

// GOOD: Event delegation
document.getElementById('todo-list').addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        const todoId = deleteBtn.dataset.id;
        deleteTodo(todoId);
    }
    
    const editBtn = event.target.closest('.edit-btn');
    if (editBtn) {
        const todoId = editBtn.dataset.id;
        editTodo(todoId);
    }
});
```

### Event Delegation Pattern for Dynamic Lists

```javascript
class TodoList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.setupEventDelegation();
    }
    
    setupEventDelegation() {
        this.container.addEventListener('click', (event) => {
            // Delete button
            if (event.target.classList.contains('delete-btn')) {
                const id = event.target.dataset.id;
                this.deleteItem(id);
            }
            
            // Edit button
            else if (event.target.classList.contains('edit-btn')) {
                const id = event.target.dataset.id;
                this.editItem(id);
            }
            
            // Checkbox
            else if (event.target.classList.contains('todo-checkbox')) {
                const id = event.target.dataset.id;
                this.toggleComplete(id);
            }
            
            // Entire todo item (for selection)
            else if (event.target.closest('.todo-item')) {
                const item = event.target.closest('.todo-item');
                const id = item.dataset.id;
                this.selectItem(id);
            }
        });
    }
    
    render() {
        // Dynamic rendering
        this.container.innerHTML = this.items.map(item => `
            <div class="todo-item" data-id="${item.id}">
                <input type="checkbox" class="todo-checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''}>
                <span class="todo-text">${item.text}</span>
                <button class="edit-btn" data-id="${item.id}">✏️</button>
                <button class="delete-btn" data-id="${item.id}">🗑️</button>
            </div>
        `).join('');
    }
}
```

---

## ⚡ Part 4: Debouncing

Debouncing limits how often a function is called, waiting until there's a pause in events.

### Debounce Implementation

```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
    fetchResults(query);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### Debounced Resize Handler

```javascript
const debouncedResize = debounce(() => {
    console.log('Window resized, recalculating layout');
    updateLayout();
}, 250);

window.addEventListener('resize', debouncedResize);
```

### Debounced Save (Auto-save)

```javascript
let saveTimeout;
function autoSave(data) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('draft', JSON.stringify(data));
        console.log('Auto-saved');
    }, 1000);
}

editor.addEventListener('input', (e) => {
    autoSave({ content: e.target.value });
});
```

---

## 🎯 Part 5: Throttle (vs Debounce)

Throttle ensures a function runs at most once per specified interval.

```javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage: Scroll handler (update progress bar)
const throttledScroll = throttle(() => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Debounce vs Throttle

| Feature | Debounce | Throttle |
|---------|----------|----------|
| Execution | After pause in events | At regular intervals |
| Use case | Search input, auto-save | Scroll, resize, mouse move |
| Example | Wait for user to stop typing | Update progress during scroll |

---

## 🎉 Part 6: Custom Events

Create and dispatch your own events.

### Creating and Dispatching Custom Events

```javascript
// Create custom event
const myEvent = new CustomEvent('userLogin', {
    detail: {
        username: 'victor',
        timestamp: Date.now()
    },
    bubbles: true,
    cancelable: true
});

// Dispatch the event
document.dispatchEvent(myEvent);

// Listen for custom event
document.addEventListener('userLogin', (event) => {
    console.log('User logged in:', event.detail.username);
    console.log('At:', event.detail.timestamp);
});
```

### Practical Example: Todo App Events

```javascript
class TodoApp {
    addTodo(text) {
        const newTodo = { id: Date.now(), text, completed: false };
        this.todos.push(newTodo);
        
        // Dispatch custom event
        const event = new CustomEvent('todoAdded', {
            detail: { todo: newTodo, total: this.todos.length }
        });
        document.dispatchEvent(event);
        
        this.render();
    }
    
    deleteTodo(id) {
        const deleted = this.todos.find(t => t.id === id);
        this.todos = this.todos.filter(t => t.id !== id);
        
        const event = new CustomEvent('todoDeleted', {
            detail: { todo: deleted, remaining: this.todos.length }
        });
        document.dispatchEvent(event);
        
        this.render();
    }
}

// Listen for events from different parts of app
document.addEventListener('todoAdded', (event) => {
    console.log(`Todo added: ${event.detail.todo.text}`);
    updateNotification(`Total: ${event.detail.total}`);
});

document.addEventListener('todoDeleted', (event) => {
    console.log(`Todo deleted: ${event.detail.todo.text}`);
    showToast('Task removed');
});
```

---

## 📝 Quick Reference

### Mouse Events
| Event | When |
|-------|------|
| `click` | Element clicked |
| `mousedown` | Button pressed |
| `mouseup` | Button released |
| `mousemove` | Mouse moves |
| `mouseenter` | Mouse enters element |
| `mouseleave` | Mouse leaves element |

### Keyboard Events
| Property | Description |
|----------|-------------|
| `event.key` | Character value |
| `event.code` | Physical key code |
| `event.ctrlKey` | Ctrl pressed |
| `event.shiftKey` | Shift pressed |
| `event.altKey` | Alt pressed |

### Event Methods
| Method | Purpose |
|--------|---------|
| `stopPropagation()` | Stop bubbling |
| `preventDefault()` | Prevent default behavior |
| `stopImmediatePropagation()` | Stop all listeners |

### Debounce Template
```javascript
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
```

### Custom Event Template
```javascript
const event = new CustomEvent('eventName', { detail: { data } });
element.dispatchEvent(event);
element.addEventListener('eventName', (e) => console.log(e.detail));
```

---

## ✅ Day 20 Checklist

- [ ] Handle mouse events (click, mousemove, mousedown, mouseup)
- [ ] Handle keyboard events (keydown, keyup)
- [ ] Use event delegation for dynamic elements
- [ ] Understand stopPropagation() vs preventDefault()
- [ ] Implement debouncing for search inputs
- [ ] Create custom events
- [ ] Build Drawing Board with mouse events
- [ ] Build Searchable Dropdown with keyboard events
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **mouseenter/mouseleave don't bubble** — use them instead of mouseover/mouseout
2. **preventDefault() stops browser behavior** — link navigation, form submit, context menu
3. **stopPropagation() stops bubbling** — prevents parent event listeners
4. **Event delegation is essential for dynamic content** — one listener for many elements
5. **Debouncing prevents excessive function calls** — essential for search inputs
6. **Keyboard events need preventDefault()** for arrow keys to prevent scrolling
7. **Custom events decouple components** — great for app architecture

