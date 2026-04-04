# Dark Mode Portfolio - Day 12 Project

## Project Overview
A portfolio website with a dark/light mode toggle using JavaScript.

## Skills Practiced
- CSS variables (custom properties) for theming
- JavaScript event listeners (`click`)
- `classList.toggle()` for switching themes
- DOM manipulation (`textContent` to update button text)

## File Structure
day-12-dark-mode-portfolio/
├── index.html
├── style.css
├── script.js
└── README.md

text

## How It Works

### CSS Variables
```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #333333;
}

body.dark-mode {
    --bg-primary: #1a1a2e;
    --text-primary: #e0e0e0;
}
JavaScript Toggle
javascript
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = '☀️ Light Mode';
    } else {
        button.textContent = '🌙 Dark Mode';
    }
}

button.addEventListener('click', toggleDarkMode);
Features
Smooth transition between themes

Button text updates based on current mode

CSS variables for easy theming

Responsive design

(Coming Day 13: localStorage to save user preference)