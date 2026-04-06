# Week 2 Capstone: Interactive Portfolio

## Project Overview
A complete, interactive personal portfolio website demonstrating all skills learned in Week 1 and Week 2: HTML5, CSS3, responsive design, Flexbox, CSS Grid, JavaScript events, DOM manipulation, and form validation.

## Technologies Used
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript | Interactivity, DOM manipulation |
| LocalStorage | Theme persistence |

## File Structure
week-2-capstone-interactive-portfolio/
├── index.html
├── style.css
├── script.js
├── images/
│ ├── profile.jpg
│ └── project-*.jpg
└── README.md

text

## Features Implemented

### HTML Structure ✅
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Contact form with name, email, message
- Navigation menu with section links

### CSS Requirements ✅
- Responsive design (768px and 480px breakpoints)
- CSS Grid for projects gallery and contact section
- Flexbox for navbar, hero buttons, filter buttons
- Hover effects on cards, buttons, links
- Custom validation styling (`:valid`/`:invalid`)
- Smooth transitions

### JavaScript Interactions ✅
1. **Dark/Light mode toggle** with localStorage persistence
2. **Mobile hamburger menu** with smooth animation
3. **Contact form** with real-time validation and feedback
4. **Dynamic project filter** (All, HTML/CSS, JavaScript, Responsive)
5. **Skill bar animation** on scroll (Intersection Observer)

### Accessibility ✅
- Proper labels with `for` attributes
- Visible focus states (`:focus-visible`)
- Semantic heading hierarchy (`h1` → `h2` → `h3`)

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| > 768px | Desktop: horizontal nav, 3 project columns, 2 contact columns |
| < 768px | Tablet/mobile: hamburger menu, stacked sections |
| < 480px | Small mobile: smaller text, full-width buttons |

## Key JavaScript Features

```javascript
// Dark Mode with localStorage
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');

// Hamburger Menu
navLinks.classList.toggle('active');

// Project Filter
card.style.display = 'block' / 'none';

// Form Validation
form.addEventListener('submit', (e) => { e.preventDefault(); });

// Scroll Animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => { });