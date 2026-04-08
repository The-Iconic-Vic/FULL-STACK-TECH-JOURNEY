# Todo List App - Day 17 Project

## Project Overview
A complete todo list application demonstrating DOM manipulation methods including createElement, appendChild, remove, and DOM traversal.

## Skills Practiced
- `createElement()` - create new DOM elements
- `textContent` / `innerHTML` - add content
- `appendChild()` / `prepend()` - add to DOM
- `remove()` - delete elements
- `classList` - add/remove/toggle classes
- `setAttribute()` / `getAttribute()`
- Parent/child/sibling traversal
- Event delegation

## File Structure
day-17-todo-list-app/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | DOM Method Used |
|---------|-----------------|
| Add task | `createElement`, `appendChild`, `push()` |
| Edit task | `prompt()`, array update |
| Mark complete | `classList.toggle`, array update |
| Delete task | `filter()`, re-render |
| Filter (All/Active/Completed) | `filter()`, classList |
| Clear completed | `filter()` |
| Task count | `filter()`, `length` |

## DOM Methods Demonstrated

```javascript
// Creating elements
const li = document.createElement('li');
const checkbox = document.createElement('input');

// Setting content
textSpan.textContent = todo.text;

// Setting attributes
checkbox.type = 'checkbox';
li.setAttribute('data-id', todo.id);

// Adding classes
li.className = 'todo-item';
li.classList.add('completed');

// Appending to DOM
li.appendChild(checkbox);
li.appendChild(textSpan);
todoList.appendChild(li);

// Removing from DOM
todoList.innerHTML = '';

// Event listeners
checkbox.addEventListener('change', () => toggleComplete(todo.id));
Todo Object Structure
javascript
{
    id: 1649376000000,
    text: "Learn JavaScript",
    completed: false
}


Key Features
Add new tasks with Enter key or button

Edit existing tasks

Mark tasks as complete/incomplete

Delete individual tasks

Filter: All / Active / Completed

Clear all completed tasks

Real-time task counts

Persistent UI states

Responsive design