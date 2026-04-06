# 📘 Week 2 Capstone: Planning & Architecture

## Project Overview

Build a complete, interactive personal portfolio website that combines everything learned in Week 1 and Week 2.

---

## 📋 Requirements Checklist

### HTML Structure
| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Semantic HTML5 | ✅ | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| Contact form | ✅ | Name, email, message inputs |
| Navigation menu | ✅ | Links to Home, About, Skills, Projects, Contact |

### CSS Requirements
| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Responsive design | ✅ | Breakpoints at 768px and 480px |
| CSS Grid | ✅ | Projects gallery, contact section |
| Flexbox | ✅ | Navbar, hero buttons, filter buttons |
| Hover effects | ✅ | Cards, buttons, links |
| Form validation styling | ✅ | `:valid` and `:invalid` pseudo-classes |
| Smooth transitions | ✅ | All interactive elements |

### JavaScript Interactions
| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Dark/light mode | ✅ | Toggle + localStorage persistence |
| Hamburger menu | ✅ | Mobile navigation toggle |
| Form validation | ✅ | Real-time + submit handling |
| Project filter | ✅ | Filter by category |
| Skill bar animation | ✅ | Intersection Observer |

### Accessibility
| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Proper labels | ✅ | `for` attribute on all labels |
| Focus states | ✅ | `:focus-visible` styles |
| Heading hierarchy | ✅ | `h1` → `h2` → `h3` |

---

## 🏗️ Architecture Planning

### File Structure
week-2-capstone-interactive-portfolio/
├── index.html # Main HTML file
├── style.css # All styles
├── script.js # All JavaScript
├── images/ # Image assets
└── README.md # Documentation

text

### HTML Section Breakdown

| Section | ID | Key Elements |
|---------|-----|--------------|
| Header/Nav | - | Logo, nav links, hamburger, dark mode toggle |
| Hero | `#home` | Greeting, name, title, CTA buttons |
| About | `#about` | Image, bio text, statistics |
| Skills | `#skills` | Skill cards with progress bars |
| Projects | `#projects` | Filter buttons, project cards grid |
| Contact | `#contact` | Info, social links, form |
| Footer | - | Copyright, back to top |

### CSS Organization

```css
/* 1. Variables (light/dark themes) */
:root { }
body.dark-mode { }

/* 2. Reset & Global */
* { }
body { }

/* 3. Components */
.container { }
.section-title { }

/* 4. Header & Navigation */
header { }
.navbar { }
.hamburger { }

/* 5. Sections */
.hero { }
.about { }
.skills { }
.projects { }
.contact { }
.footer { }

/* 6. Responsive */
@media (max-width: 768px) { }
@media (max-width: 480px) { }
JavaScript Module Breakdown
javascript
// 1. DOM Elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
// ...

// 2. Theme Functions
function loadTheme() { }
function toggleDarkMode() { }

// 3. Mobile Menu Functions
function toggleMenu() { }
function closeMenu() { }

// 4. Project Filter
filterButtons.forEach(button => { });

// 5. Form Handling
contactForm.addEventListener('submit', (event) => { });

// 6. Scroll Animations
const observer = new IntersectionObserver(...);

// 7. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(...);

// 8. Active Navigation on Scroll
window.addEventListener('scroll', () => { });
🎨 Design System
Color Palette (Light Mode)
Role	Color	Hex
Primary background	White	#ffffff
Secondary background	Light gray	#f8f9fa
Primary text	Dark gray	#333333
Secondary text	Gray	#666666
Heading	Dark blue	#1a1a2e
Primary button	Purple	#667eea
Hero gradient	Purple to pink	linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Valid border	Green	#28a745
Invalid border	Red	#dc3545
Color Palette (Dark Mode)
Role	Color	Hex
Primary background	Dark blue	#1a1a2e
Secondary background	Darker blue	#16213e
Primary text	Light gray	#e0e0e0
Secondary text	Medium gray	#a0a0a0
Heading	White	#ffffff
Primary button	Cyan	#00d4ff
Hero gradient	Dark blue to navy	linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)
Typography
Element	Font Size	Weight
Body	16px	400
h1 (hero)	3rem (48px)	700
h2 (section)	2rem (32px)	600
h3 (card title)	1.25rem (20px)	600
Navigation links	1rem (16px)	500
Buttons	1rem (16px)	500
Small text	0.875rem (14px)	400
Spacing
Element	Spacing
Section padding	5rem 0
Container padding	0 2rem
Card padding	1.5rem
Gap between grid items	2rem
Button padding	0.75rem 1.5rem
Breakpoints
Breakpoint	Target	Layout Changes
1200px+	Large desktop	Max width 1200px
1024px - 1199px	Desktop	3 project columns
768px - 1023px	Tablet	Hamburger menu, 2 project columns
480px - 767px	Mobile	Hamburger menu, 1 project column
< 480px	Small mobile	Smaller text, full-width buttons
📊 Component Specifications
Navigation Bar
css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.hamburger {
    display: none;  /* Hidden on desktop */
}

@media (max-width: 768px) {
    .hamburger { display: flex; }
    .nav-links {
        position: absolute;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    .nav-links.active {
        max-height: 300px;
    }
}
Hero Section
css
.hero {
    padding: 6rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-name {
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}
Project Card
css
.project-card {
    background: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.project-content {
    padding: 1.5rem;
}
Contact Form
css
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

input, textarea {
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
}

input:valid {
    border-color: #28a745;
}

input:invalid:not(:placeholder-shown) {
    border-color: #dc3545;
}

.submit-btn {
    background: var(--btn-primary-bg);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
}
🔧 JavaScript Functions Documentation
Theme Management
javascript
// Load saved theme from localStorage
function loadTheme() { }

// Toggle between light/dark modes
function toggleDarkMode() { }
Mobile Menu
javascript
// Open/close hamburger menu
function toggleMenu() { }

// Close menu (when link clicked or outside clicked)
function closeMenu() { }
Project Filter
javascript
// Filter projects by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.dataset.filter;
        // Show/hide cards based on category
    });
});
Form Handling
javascript
// Handle form submission
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Validate fields
    // Show success/error message
});
Scroll Animations
javascript
// Animate skill bars when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate progress bar
        }
    });
}, { threshold: 0.5 });
Smooth Scroll
javascript
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
Active Navigation
javascript
// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    // Determine which section is visible
    // Add 'active' class to corresponding nav link
});
🧪 Testing Checklist
Visual Testing
Light mode looks correct

Dark mode looks correct

All hover effects work

Transitions are smooth

No horizontal scroll

Responsive Testing
Desktop (1440px+)

Laptop (1024px - 1440px)

Tablet (768px - 1024px)

Mobile (375px - 768px)

Small mobile (< 375px)

Landscape orientation

Functional Testing
Dark mode persists after refresh

Hamburger menu opens/closes

Menu closes when link clicked

Menu closes when clicking outside

Project filters work correctly

Form validation shows correct borders

Form shows success/error message

Submit button disabled when form invalid

Skill bars animate on scroll

Smooth scrolling works

Active nav link updates on scroll

Back to top link works

Accessibility Testing
All images have alt text

Form inputs have labels

Focus indicators visible

Tab order is logical

Heading hierarchy is correct

Color contrast meets WCAG (minimum 4.5:1)

Performance Testing
Images are optimized

No unused CSS or JavaScript

Smooth animations (60fps)

Fast initial load

📝 Development Phases
Phase 1: HTML Structure (30 min)
Create base HTML file

Add all semantic sections

Add content placeholders

Link CSS and JS files

Phase 2: CSS Base & Light Mode (45 min)
Reset and variables

Global styles

Navigation

Hero section

About section

Phase 3: CSS Components (45 min)
Skills section with progress bars

Projects grid

Contact section with form

Footer

Phase 4: Responsive Design (30 min)
Tablet breakpoint (768px)

Mobile breakpoint (480px)

Hamburger menu CSS

Phase 5: Dark Mode (15 min)
CSS variables for dark theme

Dark mode toggle button

Phase 6: JavaScript Interactions (45 min)
Dark mode toggle with localStorage

Hamburger menu toggle

Project filter functionality

Phase 7: Advanced JS (30 min)
Form validation and submission

Skill bar Intersection Observer

Smooth scrolling

Active nav link on scroll

Phase 8: Testing & Polish (30 min)
Cross-browser testing

Responsive testing

Accessibility checks

Performance optimization

🚀 Stretch Goals (Optional)
Feature	Difficulty	Estimated Time
Typing animation in hero	Medium	20 min
Modal popup for projects	Medium	30 min
Search + filter combo	Medium	30 min
Loading animations	Easy	15 min
Blog section	Hard	1 hour
Contact form backend	Hard	1 hour
📚 Resources Used
MDN Web Docs (HTML, CSS, JavaScript references)

CSS-Tricks (Flexbox, Grid guides)

Google Fonts (system fonts)

Picsum/LoremFlick (placeholder images)

Font Awesome / Emojis (icons)

