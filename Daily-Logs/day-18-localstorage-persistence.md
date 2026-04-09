# 📅 Day 18: LocalStorage & Data Persistence

**Date:** April 9, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Web Storage API, localStorage, sessionStorage, JSON persistence

---

## 📋 Learning Objectives

- ✅ Understand the Web Storage API and its use cases
- ✅ Use `localStorage.setItem()`, `getItem()`, `removeItem()`, `clear()`
- ✅ Understand the difference between localStorage and sessionStorage
- ✅ Store arrays and objects using JSON.stringify() and JSON.parse()
- ✅ Load saved data on page load
- ✅ Handle missing data for first-time visitors
- ✅ Build persistent todo list and notes app

---

## 💾 Part 1: LocalStorage Basics

### What is Web Storage API?

Web Storage API provides a way to store data in the browser that persists even after the page is refreshed or the browser is closed.

**Two types of storage:**

| Storage | Persistence | Scope |
|---------|-------------|-------|
| `localStorage` | Forever (until manually cleared) | All tabs/windows |
| `sessionStorage` | Until tab is closed | Only current tab |

### localStorage Methods

| Method | Description | Example |
|--------|-------------|---------|
| `setItem(key, value)` | Save data | `localStorage.setItem('name', 'Victor')` |
| `getItem(key)` | Retrieve data | `const name = localStorage.getItem('name')` |
| `removeItem(key)` | Delete specific item | `localStorage.removeItem('name')` |
| `clear()` | Delete all items | `localStorage.clear()` |
| `length` | Number of stored items | `localStorage.length` |
| `key(index)` | Get key by index | `localStorage.key(0)` |

### Basic Usage

```javascript
// Save data
localStorage.setItem('username', 'Victor');
localStorage.setItem('theme', 'dark');
localStorage.setItem('score', '100');  // All values become strings

// Retrieve data
const username = localStorage.getItem('username');  // "Victor"
const theme = localStorage.getItem('theme');        // "dark"

// Check if item exists
if (localStorage.getItem('token')) {
    console.log('User is logged in');
}

// Remove item
localStorage.removeItem('score');

// Clear all
localStorage.clear();

// Get all keys
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}
```

---

### localStorage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| **Lifetime** | Until manually cleared | Until tab is closed |
| **Scope** | All tabs/windows | Same tab only |
| **Shared between tabs** | Yes | No |
| **Data after browser restart** | Yes | No |
| **Use case** | User preferences, saved data | Form drafts, temporary data |

```javascript
// sessionStorage example (same methods)
sessionStorage.setItem('draft', 'Partially written form...');
const draft = sessionStorage.getItem('draft');
sessionStorage.removeItem('draft');
```

---

## 🔄 Part 2: Saving & Loading Complex Data

### The Problem: localStorage only stores strings

```javascript
const todos = [
    { id: 1, text: "Learn JavaScript", completed: false },
    { id: 2, text: "Build a project", completed: true }
];

// This DOES NOT work as expected
localStorage.setItem('todos', todos);
console.log(localStorage.getItem('todos'));  // "[object Object],[object Object]"

// The array is converted to string "[object Object]"
```

### The Solution: JSON.stringify() and JSON.parse()

```javascript
const todos = [
    { id: 1, text: "Learn JavaScript", completed: false },
    { id: 2, text: "Build a project", completed: true }
];

// Convert object/array to JSON string
const jsonString = JSON.stringify(todos);
localStorage.setItem('todos', jsonString);

// Retrieve and convert back
const savedTodos = localStorage.getItem('todos');
const todosArray = JSON.parse(savedTodos);
console.log(todosArray[0].text);  // "Learn JavaScript"
```

### Complete Save/Load Pattern

```javascript
// SAVE: Convert array/object to JSON string
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// LOAD: Convert JSON string back to array/object
function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        return JSON.parse(saved);
    }
    return [];  // Default empty array for first visit
}

// Usage
const myTodos = loadTodos();
myTodos.push({ id: Date.now(), text: "New task", completed: false });
saveTodos(myTodos);
```

---

### Handling First Visit (No Saved Data)

```javascript
function loadTodos() {
    const saved = localStorage.getItem('todos');
    
    if (saved) {
        // Returning user - load saved data
        return JSON.parse(saved);
    } else {
        // First visit - create default demo data
        const defaultTodos = [
            { id: 1, text: 'Learn localStorage', completed: false },
            { id: 2, text: 'Build a persistent app', completed: false },
            { id: 3, text: 'Master JSON', completed: true }
        ];
        // Save default data for next time
        localStorage.setItem('todos', JSON.stringify(defaultTodos));
        return defaultTodos;
    }
}
```

---

### Checking Storage Usage

```javascript
// Estimate storage used (approximate)
function getStorageSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        total += key.length + value.length;
    }
    return (total / 1024).toFixed(2) + ' KB';
}

console.log(getStorageSize());  // "2.45 KB"
```

---

## 🎯 Part 3: Practical Applications

### Pattern 1: Saving User Preferences

```javascript
// Load preferences on page load
function loadPreferences() {
    const theme = localStorage.getItem('theme');
    const fontSize = localStorage.getItem('fontSize');
    
    if (theme) {
        document.body.classList.add(theme);
    }
    if (fontSize) {
        document.body.style.fontSize = fontSize;
    }
}

// Save preferences when changed
function setTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
}

function setFontSize(size) {
    document.body.style.fontSize = size;
    localStorage.setItem('fontSize', size);
}
```

---

### Pattern 2: Saving Form Drafts

```javascript
const form = document.getElementById('my-form');
const inputs = form.querySelectorAll('input, textarea');

// Auto-save draft every 2 seconds
let saveTimeout;
function autoSaveDraft() {
    const formData = {};
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
    localStorage.setItem('formDraft', JSON.stringify(formData));
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(autoSaveDraft, 1000);
    });
});

// Load draft on page load
function loadDraft() {
    const draft = localStorage.getItem('formDraft');
    if (draft) {
        const formData = JSON.parse(draft);
        inputs.forEach(input => {
            if (formData[input.name]) {
                input.value = formData[input.name];
            }
        });
    }
}
loadDraft();

// Clear draft after successful submit
function clearDraft() {
    localStorage.removeItem('formDraft');
}
```

---

### Pattern 3: Persistent Todo List (Full Example)

```javascript
// Data structure
let todos = [];

// Load on page load
function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
    } else {
        todos = [
            { id: 1, text: 'Learn localStorage', completed: false },
            { id: 2, text: 'Build a persistent app', completed: false }
        ];
        saveTodos();
    }
    renderTodos();
}

// Save whenever data changes
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// CRUD operations (each calls saveTodos)
function addTodo(text) {
    todos.push({ id: Date.now(), text, completed: false });
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
}

function clearAllData() {
    if (confirm('Delete all tasks?')) {
        todos = [];
        saveTodos();
        renderTodos();
    }
}
```

---

### Pattern 4: Notes App with Search

```javascript
let notes = [];
let editId = null;

// Load notes
function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
        notes = JSON.parse(saved);
    } else {
        notes = [
            { id: 1, title: 'Welcome', content: 'Start taking notes!', timestamp: Date.now() }
        ];
        saveNotes();
    }
    renderNotes();
}

// Save notes
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// CRUD
function addNote(title, content) {
    notes.push({
        id: Date.now(),
        title,
        content,
        timestamp: Date.now()
    });
    saveNotes();
    renderNotes();
}

function updateNote(id, title, content) {
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
        notes[index] = { ...notes[index], title, content, timestamp: Date.now() };
        saveNotes();
        renderNotes();
    }
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes();
}

// Search (case-insensitive)
function searchNotes(query) {
    const lowerQuery = query.toLowerCase();
    return notes.filter(note => 
        note.title.toLowerCase().includes(lowerQuery)
    );
}
```

---

## 📝 Quick Reference

### localStorage Methods
| Method | Description |
|--------|-------------|
| `setItem(key, value)` | Save data (value must be string) |
| `getItem(key)` | Retrieve data (returns string or null) |
| `removeItem(key)` | Delete specific item |
| `clear()` | Delete all items |
| `key(index)` | Get key by index |
| `length` | Number of stored items |

### JSON Methods
| Method | Description |
|--------|-------------|
| `JSON.stringify(obj)` | Convert object/array to JSON string |
| `JSON.parse(jsonString)` | Convert JSON string to object/array |

### Common Patterns
```javascript
// Save array
localStorage.setItem('key', JSON.stringify(myArray));

// Load array
const myArray = JSON.parse(localStorage.getItem('key')) || [];

// Save object
localStorage.setItem('key', JSON.stringify(myObject));

// Load object
const myObject = JSON.parse(localStorage.getItem('key')) || {};

// Check if first visit
if (!localStorage.getItem('key')) {
    // First visit - initialize
    localStorage.setItem('key', JSON.stringify(defaultData));
}
```

---

## ✅ Day 18 Checklist

- [ ] Understand localStorage vs sessionStorage
- [ ] Use `setItem()` and `getItem()` for strings
- [ ] Store arrays/objects using `JSON.stringify()` and `JSON.parse()`
- [ ] Handle first visit with default data
- [ ] Save user preferences (theme, font size)
- [ ] Auto-save form drafts
- [ ] Build persistent todo list with save/load
- [ ] Add Clear All Data button
- [ ] Build Notes app with search
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **localStorage persists forever** — sessionStorage only for current tab
2. **Only strings can be stored** — use `JSON.stringify()` for arrays/objects
3. **Always use `JSON.parse()`** when retrieving complex data
4. **Check for null** — `getItem()` returns null if key doesn't exist
5. **Handle first visit** — initialize with default data
6. **Save data whenever it changes** — add save calls in all CRUD operations
7. **5-10MB storage limit** — enough for most apps, but be mindful
8. **Synchronous API** — no promises needed, but large operations may block UI
9. **Clear data option** — always provide a way for users to reset
10. **Demo data on first visit** — improves user experience
