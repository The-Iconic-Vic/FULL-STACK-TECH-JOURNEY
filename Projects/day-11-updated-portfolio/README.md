# Updated Portfolio - Day 11 Project

## Project Overview
Week 1 portfolio updated with responsive design using media queries.

## Skills Practiced
- Viewport meta tag
- Media queries (`@media`)
- Breakpoints: mobile (768px), tablet (1024px), desktop (1200px+)
- Mobile-first responsive patterns
- Fluid images with `max-width: 100%`
- Responsive typography

## File Structure
day-11-updated-portfolio/
├── index.html
├── style.css
├── images/
│ ├── profile.jpg
│ ├── project-1.jpg
│ ├── project-2.jpg
│ └── project-3.jpg
└── README.md

text

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| > 1024px | Desktop: 3 project columns, horizontal nav |
| 768px - 1024px | Tablet: 2 project columns, adjusted spacing |
| < 768px | Mobile: 1 project column, stacked sections |
| < 480px | Small mobile: smaller text, full-width buttons |

## Media Queries Used

```css
/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
Responsive Features
Navigation stacks vertically on mobile

About section changes from row to column

Projects grid adjusts: 3 → 2 → 1 columns

Buttons become full-width on mobile

Contact links stack on very small screens

Images scale fluidly with containers