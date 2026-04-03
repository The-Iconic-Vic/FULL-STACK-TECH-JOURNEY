# Responsive Navigation - Day 11 Project

## Project Overview
A fully responsive navigation menu that switches from horizontal layout to hamburger menu on mobile.

## Skills Practiced
- Viewport meta tag
- Media query breakpoints
- Mobile-first design approach
- CSS transitions for smooth menu appearance
- Flexbox for navigation layout

## File Structure
day-11-responsive-nav/
├── index.html
├── style.css
└── README.md

text

## Navigation States

| Screen Size | Navigation Style |
|-------------|------------------|
| Desktop (> 768px) | Horizontal links visible |
| Mobile (< 768px) | Hamburger icon, hidden menu |

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| 768px | Navigation switches to mobile layout |
| 480px | Smaller logo and text |

## CSS Features

```css
/* Desktop - horizontal layout */
.nav-links {
    display: flex;
    gap: 2rem;
}

/* Mobile - hidden menu that slides down */
@media (max-width: 768px) {
    .nav-links {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }
    
    .nav-links.active {
        max-height: 300px;
    }
    
    .hamburger {
        display: flex;
    }
}
Notes
JavaScript toggle for hamburger menu will be added on Day 12

CSS transitions provide smooth opening/closing animation

Active class toggles the menu visibility