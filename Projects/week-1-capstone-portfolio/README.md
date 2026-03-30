# Week 1 Capstone: Personal Portfolio Website

## Project Overview
A complete personal portfolio website built from scratch using everything learned in Week 1: HTML5 semantics, CSS styling, box model, Flexbox, and CSS Grid.

## Technologies Used
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling and layout |
| Flexbox | Skills section, navigation |
| CSS Grid | Projects gallery |
| Media Queries | Responsive design |

## File Structure
week-1-capstone-portfolio/
├── index.html
├── style.css
├── images/
│ ├── profile.jpg
│ ├── project-1.jpg
│ ├── project-2.jpg
│ └── project-3.jpg
└── README.md

text

## Sections

| Section | Layout Technique |
|---------|------------------|
| Navigation | Flexbox (`space-between`, `align-items: center`) |
| Hero | Flexbox (`justify-content: center`, `align-items: center`) |
| About | Flexbox (row on desktop, column on mobile) |
| Skills | Flexbox with `flex-wrap: wrap` |
| Projects | CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`) |
| Contact | Flexbox (`justify-content: center`, `flex-wrap: wrap`) |
| Footer | Text centering |

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| < 768px | Navigation stacks, projects grid becomes 1 column, hero buttons stack |
| 769px - 1024px | Projects grid shows 2 columns |
| > 1024px | Projects grid shows 3 columns |

## Key Features
- Sticky navigation bar
- Mobile hamburger menu with JavaScript toggle
- Hover effects on cards and buttons
- Smooth scrolling
- Semantic HTML5 structure
- Fully responsive design

## Skills Demonstrated
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- CSS Box Model (margin, padding, border)
- Flexbox for 1D layouts
- CSS Grid for 2D layouts
- Media queries for responsiveness
- Mobile-first approach with desktop enhancements
- JavaScript for mobile menu toggle