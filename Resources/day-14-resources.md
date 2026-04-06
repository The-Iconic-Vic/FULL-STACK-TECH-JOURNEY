# 📚 Day 14 Resources - Week 2 Capstone Project

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: HTML5 Semantic Elements | https://developer.mozilla.org/en-US/docs/Web/HTML/Element |
| MDN: CSS Grid Layout | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout |
| MDN: Flexbox | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout |
| MDN: Media Queries | https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries |
| MDN: localStorage | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| MDN: Intersection Observer | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API |
| MDN: Form Validation | https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation |
| MDN: Event Reference | https://developer.mozilla.org/en-US/docs/Web/Events |
| CSS-Tricks: Complete Guide to Grid | https://css-tricks.com/snippets/css/complete-guide-grid/ |
| CSS-Tricks: Complete Guide to Flexbox | https://css-tricks.com/snippets/css/a-guide-to-flexbox/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Build a Portfolio with HTML & CSS | https://youtu.be/ldwlOzRvYOU |
| Dark Mode with CSS & JavaScript | https://youtu.be/6NtNy28wIos |
| Hamburger Menu Tutorial | https://youtu.be/OFKBep95lb4 |
| Filterable Gallery with JavaScript | https://youtu.be/1cZxY9CHr8I |
| Form Validation with JavaScript | https://youtu.be/rsd4FNGTRBw |
| Intersection Observer Tutorial | https://youtu.be/T8EYosX4A2E |
| Smooth Scrolling | https://youtu.be/hj3rtI6w-rI |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Testing and debugging | Built into Chrome |
| Responsively App | Multi-device testing | https://responsively.app |
| Coolors | Color palette generator | https://coolors.co |
| UI Gradients | Gradient backgrounds | https://uigradients.com |
| Placeholder Images | Placeholder images | https://picsum.photos |
| Font Awesome | Icons | https://fontawesome.com |
| Google Fonts | Web fonts | https://fonts.google.com |
| LocalStorage Inspector | View stored data | Chrome DevTools → Application |

## 📝 Project Requirements Cheatsheet

### HTML Requirements
```html
<!-- Semantic structure -->
<header>, <nav>, <main>, <section>, <footer>

<!-- Form with validation -->
<input type="text" required minlength="2">
<input type="email" required>
<textarea required minlength="10"></textarea>

<!-- Navigation -->
<nav><ul><li><a href="#section">Link</a></li></ul></nav>
```

### CSS Requirements
```css
/* Responsive breakpoints */
@media (max-width: 768px) { }
@media (max-width: 480px) { }

/* CSS Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

/* Flexbox */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Hover effects */
.card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
}

/* Form validation styling */
input:valid { border-color: green; }
input:invalid:not(:placeholder-shown) { border-color: red; }

/* Focus states */
button:focus-visible {
    outline: 2px solid blue;
    outline-offset: 2px;
}
```

### JavaScript Requirements
```javascript
// Dark mode with localStorage
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentMode);
}

// Hamburger menu
function toggleMenu() {
    navLinks.classList.toggle('active');
}

// Project filter
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        projects.forEach(project => {
            project.style.display = project.dataset.category.includes(filter) ? 'block' : 'none';
        });
    });
});

// Form validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        // Submit logic
    }
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate element
        }
    });
}, { threshold: 0.5 });
```

## 🎨 Color Palette Examples

### Light Mode Portfolio
```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #333333;
    --text-secondary: #666666;
    --heading-color: #1a1a2e;
    --accent-color: #667eea;
    --accent-hover: #5a67d8;
    --success: #28a745;
    --error: #dc3545;
}
```

### Dark Mode Portfolio
```css
body.dark-mode {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --heading-color: #ffffff;
    --accent-color: #00d4ff;
    --accent-hover: #00b8e6;
}
```

### Hero Gradients
```css
/* Purple to Pink */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Blue to Purple */
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);

/* Dark to Navy (Dark Mode) */
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
```

## 📱 Responsive Testing Devices

| Device | Width | Height | Test With |
|--------|-------|--------|-----------|
| iPhone SE | 375px | 667px | DevTools |
| iPhone 12/13 | 390px | 844px | DevTools |
| iPhone 14 Pro Max | 430px | 932px | DevTools |
| Pixel 5 | 393px | 851px | DevTools |
| iPad Mini | 768px | 1024px | DevTools |
| iPad Pro | 1024px | 1366px | DevTools |
| Desktop | 1440px | 900px+ | Actual browser |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Dark mode not persisting | localStorage not saved/loaded | Check `setItem` and `getItem` calls |
| Hamburger menu not working | JavaScript error or CSS issue | Check console, verify `max-height` transition |
| Filter not showing/hiding cards | CSS display conflict | Use `display: none` and `display: block/flex` |
| Form validation borders not showing | Pseudo-class timing | Use `:invalid:not(:placeholder-shown)` |
| Skill bars not animating | Intersection Observer not triggering | Check `threshold` and `rootMargin` |
| Smooth scroll not working | `scroll-behavior: smooth` unsupported | Use JavaScript `scrollIntoView({ behavior: 'smooth' })` |
| Focus indicators invisible | CSS overriding default outline | Add `:focus-visible` styles |
| Grid layout breaks | Missing `box-sizing: border-box` | Add universal reset |

## ✅ Capstone Project Checklist

### Before Starting
- [ ] Sketch layout on paper or Figma
- [ ] Choose color palette
- [ ] Gather placeholder images
- [ ] Plan file structure

### HTML
- [ ] Add viewport meta tag
- [ ] Use semantic elements
- [ ] Create navigation with anchor links
- [ ] Build hero section
- [ ] Build about section
- [ ] Build skills section
- [ ] Build projects section
- [ ] Build contact section with form
- [ ] Build footer
- [ ] Link CSS and JS files

### CSS
- [ ] Add universal reset (`box-sizing: border-box`)
- [ ] Create CSS variables for theming
- [ ] Style navigation (Flexbox)
- [ ] Style hero section
- [ ] Style about section (Flexbox)
- [ ] Style skills section (Grid)
- [ ] Style projects section (Grid)
- [ ] Style contact section (Grid + Flexbox)
- [ ] Style form validation states
- [ ] Add hover effects
- [ ] Add focus states for accessibility
- [ ] Add responsive breakpoints (768px, 480px)
- [ ] Style dark mode theme

### JavaScript
- [ ] Dark mode toggle with localStorage
- [ ] Hamburger menu toggle
- [ ] Project filter functionality
- [ ] Form validation and submission feedback
- [ ] Skill bar animation (Intersection Observer)
- [ ] Smooth scrolling for anchor links
- [ ] Active navigation link on scroll

### Testing
- [ ] Test on multiple screen sizes
- [ ] Test light and dark modes
- [ ] Test form validation
- [ ] Test keyboard navigation (Tab key)
- [ ] Test on actual mobile device (if available)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Validate HTML with W3C validator
- [ ] Run Lighthouse audit

### Deployment
- [ ] Commit to GitHub with clear message
- [ ] Deploy with GitHub Pages
- [ ] Test live site
- [ ] Share on Twitter/LinkedIn

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Modern CSS Patterns | https://moderncss.dev |
| CSS Variables Guide | https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties |
| LocalStorage Guide | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| Intersection Observer API | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API |
| Accessible Form Validation | https://www.smashingmagazine.com/2021/11/accessible-client-side-form-validation-html5/ |

