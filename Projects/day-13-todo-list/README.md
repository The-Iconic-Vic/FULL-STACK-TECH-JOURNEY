# To-Do List - Day 13 Project

## Project Overview
An interactive to-do list application demonstrating JavaScript functions, events, and array manipulation.

## Skills Practiced
- Function declarations and arrow functions
- Event listeners (click, keypress)
- Event object and event delegation
- Arrays and array methods (push, filter, forEach)
- Conditionals (if/else)
- DOM manipulation (createElement, appendChild)

## File Structure
day-13-todo-list/
├── index.html
├── style.css
├── script.js
└── README.md


## Features

| Feature | JavaScript Concept |
|---------|-------------------|
| Add task | `addEventListener`, `push()` |
| Toggle complete | `classList.toggle`, array update |
| Delete task | `splice()`, event delegation |
| Task counter | `filter()`, DOM update |
| Enter key submit | `keypress` event |

## Key JavaScript Used

```javascript
// Function declaration
function addTask() { }

// Arrow function
const updateCounts = () => { }

// Event listener
button.addEventListener('click', addTask);

// Event delegation
list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        // Handle delete
    }
});

// Array methods
tasks.push(newTask);        // Add
tasks.filter(task => task.completed); // Filter
tasks.forEach((task, index) => { }); // Loop
tasks.splice(index, 1);     // Delete