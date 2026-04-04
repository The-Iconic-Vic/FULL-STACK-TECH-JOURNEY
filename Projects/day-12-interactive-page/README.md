# Interactive Page - Day 12 Project

## Project Overview
A simple interactive page demonstrating JavaScript basics and DOM manipulation.

## Skills Practiced
- External JavaScript file linking
- Variables (`let`, `const`)
- Data types (strings, numbers, arrays)
- Event listeners (`click`, `input`, `mouseenter`, `mouseleave`)
- DOM selection (`getElementById`)
- DOM manipulation (`textContent`, `style`)

## File Structure
day-12-interactive-page/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | JavaScript Concept |
|---------|-------------------|
| Text Changer | `click` event, `textContent`, arrays |
| Live Typing | `input` event, reading input value |
| Color Changer | `mouseenter`/`mouseleave`, `style` property |

## Key JavaScript Used

```javascript
// Selecting elements
const element = document.getElementById('id');

// Event listeners
element.addEventListener('click', function);
element.addEventListener('input', function);
element.addEventListener('mouseenter', function);

// Modifying content
element.textContent = "New text";

// Modifying styles
element.style.backgroundColor = "blue";