# Hamburger Menu - Day 13 Project

## Project Overview
A fully responsive hamburger menu that switches from horizontal navigation on desktop to a toggleable slide-down menu on mobile.

## Skills Practiced
- JavaScript event listeners (`click`)
- `classList.toggle()` for menu visibility
- CSS transitions for smooth animation
- Media queries for responsive breakpoints
- DOM manipulation
- Event delegation and cleanup

## File Structure
day-13-hamburger-menu/
├── index.html
├── style.css
├── script.js
└── README.md



## How It Works

### CSS (Mobile)
```css
@media (max-width: 768px) {
    .nav-links {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
    
    .nav-links.active {
        max-height: 300px;
    }
}
JavaScript
javascript
function toggleMenu() {
    navLinks.classList.toggle('active');
}

hamburgerBtn.addEventListener('click', toggleMenu);
Features
Desktop: Horizontal navigation visible

Mobile: Hamburger button appears

Click hamburger → menu slides down

Click link → menu closes automatically

Smooth CSS transition

Hamburger animates to X when open

Click outside closes menu

Responsive on all screen sizes

Key JavaScript Concepts
Concept	Implementation
Event listener	addEventListener('click')
Class toggle	classList.toggle('active')
DOM selection	getElementById, querySelectorAll
Loop for links	forEach()
Optional click outside	event.target.closest()