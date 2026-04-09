# Enhanced Todo List - Day 18 Project

## Project Overview
A persistent todo list application that saves tasks to localStorage, so data survives page refresh.

## Skills Practiced
- `localStorage.setItem()` - save data
- `localStorage.getItem()` - load data
- `JSON.stringify()` - convert objects to JSON
- `JSON.parse()` - convert JSON to objects
- Data persistence across page reloads
- First-visit initialization with demo data

## File Structure
day-18-enhanced-todo-list/
├── index.html
├── style.css
├── script.js
└── README.md

text

## LocalStorage Methods Used

| Method | Purpose |
|--------|---------|
| `setItem(key, value)` | Save data |
| `getItem(key)` | Load data |
| `clear()` | Remove all data |

## Key Code Patterns

```javascript
// Save todos
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos
function loadFromLocalStorage() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
    } else {
        todos = defaultData;  // First visit
        saveToLocalStorage();
    }
}

// Clear all data
function clearAllData() {
    localStorage.clear();  // or removeItem('todos')
    todos = [];
    renderTodoList();
}
New Features vs Day 17
Tasks persist after page refresh

Clear All Data button

First-visit demo data

Auto-save on every change (add, edit, delete, toggle)

Data Structure
javascript
{
    id: 1649376000000,
    text: "Learn localStorage",
    completed: false
}