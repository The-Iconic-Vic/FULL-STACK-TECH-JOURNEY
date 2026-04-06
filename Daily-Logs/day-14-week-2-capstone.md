# 📅 Day 14: Week 2 Capstone Project

**Date:** April 6, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topic:** Week 2 Capstone - Interactive Portfolio

---

## 📋 Project Overview

This is the Week 2 Capstone project – a complete, interactive personal portfolio website that combines everything learned in Week 1 (HTML, CSS, responsive design, Flexbox, Grid) and Week 2 (JavaScript events, DOM manipulation, form validation, local storage).

---

## 🎯 Capstone Requirements Checklist

### HTML Structure
- [x] Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [x] Contact form with multiple input types (name, email, message)
- [x] Navigation menu with links to all sections

### CSS Requirements
- [x] Responsive design with at least 2 breakpoints (mobile: 768px, small mobile: 480px)
- [x] CSS Grid for layout structure (projects grid, contact section)
- [x] Flexbox for component alignment (navbar, hero buttons, filter buttons)
- [x] Hover effects on cards, buttons, and links
- [x] Custom styling for form validation states (`:valid`/`:invalid`)
- [x] Smooth transitions for interactive elements

### JavaScript Interactions (5 implemented)
- [x] Dark/light mode toggle with localStorage persistence
- [x] Mobile hamburger menu that toggles navigation
- [x] Contact form with real-time validation and feedback
- [x] Dynamic project filter (filter by category)
- [x] Skill bar animation on scroll (Intersection Observer)

### Accessibility
- [x] Proper labels for all form inputs (`for` attribute)
- [x] Visible focus states for keyboard navigation (`:focus-visible`)
- [x] Semantic heading hierarchy (`h1` → `h2` → `h3`)

---

## 🏗️ Project Structure

```
week-2-capstone-interactive-portfolio/
├── index.html          # Main HTML file
├── style.css           # All styles (light/dark themes, responsive)
├── script.js           # All JavaScript interactions
├── images/             # Project and profile images
└── README.md           # Project documentation
```

---

## 📝 HTML Sections

| Section | Content |
|---------|---------|
| Navigation | Logo, hamburger menu, nav links, dark mode toggle |
| Hero | Name, title, description, CTA buttons |
| About | Bio, profile image, statistics |
| Skills | Skill cards with animated progress bars |
| Projects | Filterable project gallery |
| Contact | Contact info and validation form |
| Footer | Copyright and back to top link |

---

## 🎨 CSS Features

### CSS Variables for Theming
```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #333333;
    --btn-primary-bg: #667eea;
}

body.dark-mode {
    --bg-primary: #1a1a2e;
    --text-primary: #e0e0e0;
    --btn-primary-bg: #00d4ff;
}
```

### Responsive Grid
```css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
}
```

### Form Validation Styling
```css
input:valid { border-color: #28a745; }
input:invalid:not(:placeholder-shown) { border-color: #dc3545; }
```

### Media Queries
```css
@media (max-width: 768px) { /* Tablet/mobile styles */ }
@media (max-width: 480px) { /* Small mobile styles */ }
```

---

## ⚡ JavaScript Features

### 1. Dark/Light Mode with Persistence
```javascript
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentMode);
}
```

### 2. Hamburger Menu
```javascript
function toggleMenu() {
    navLinks.classList.toggle('active');
    // Animate hamburger to X
}
```

### 3. Project Filter
```javascript
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
```

### 4. Form Validation
```javascript
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Validate and show feedback
});
```

### 5. Skill Bar Animation (Intersection Observer)
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate progress bar
        }
    });
}, { threshold: 0.5 });
```

### 6. Smooth Scrolling
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Behavior |
|------------|-----------------|
| > 768px | Desktop: horizontal nav, 3 project columns, side-by-side contact section |
| ≤ 768px | Tablet: hamburger menu, stacked sections, 1-2 project columns |
| ≤ 480px | Mobile: smaller text, full-width buttons, stacked contact links |

---

## 🧠 Skills Demonstrated

### HTML
- Semantic elements
- Form inputs with validation attributes
- Accessible labels

### CSS
- CSS Variables for theming
- Flexbox (navbar, buttons, stats)
- CSS Grid (projects, contact section)
- Media queries
- Transitions and transforms
- Pseudo-classes (`:valid`, `:invalid`, `:focus-visible`)

### JavaScript
- DOM selection and manipulation
- Event listeners (click, submit, scroll)
- LocalStorage for persistence
- Intersection Observer API
- Array methods (forEach)
- Form validation

---

## ✅ Day 14 Checklist

- [x] Plan project features and structure
- [x] Build semantic HTML structure
- [x] Create responsive CSS with light/dark themes
- [x] Implement dark mode toggle with localStorage
- [x] Build hamburger menu for mobile
- [x] Create filterable project gallery
- [x] Build contact form with validation
- [x] Add skill bar animations on scroll
- [x] Implement smooth scrolling
- [x] Test on multiple screen sizes
- [x] Test keyboard navigation (focus states)
- [x] Push to GitHub

---

## 🔑 Key Takeaways

1. **CSS Variables make theming easy** — change values in one place, update everywhere
2. **localStorage is perfect for user preferences** — saves theme choice between sessions
3. **Intersection Observer** is better than scroll events for triggering animations
4. **CSS Grid + auto-fill** creates responsive layouts without media queries
5. **Form validation with CSS pseudo-classes** provides real-time visual feedback
6. **Event delegation** would be useful for dynamic project cards (if adding more)
7. **Smooth scrolling** improves user experience for anchor links
8. **Focus states are essential** for keyboard accessibility

---

## 🚀 Future Enhancements

- [ ] Add loading animations for projects
- [ ] Implement search/filter combination
- [ ] Add modal popups for project details
- [ ] Add typing animation to hero section
- [ ] Connect contact form to backend (future week)
- [ ] Add more projects with real images
- [ ] Add blog section

