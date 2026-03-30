# 📘 Grid vs Flexbox: When to Use Which

## Overview

| Feature | Flexbox | CSS Grid |
|---------|---------|----------|
| Dimensions | 1D (row OR column) | 2D (rows AND columns) |
| Best for | Components, navigation | Page layouts, galleries |
| Control | Individual items | Entire layout structure |
| Wrapping | `flex-wrap` | `auto-fit`, `minmax()` |

---

## When to Use Flexbox

### Navigation Bars
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
Button Groups
css
.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
}
Card Content (horizontal)
css
.card-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}
Centering Content
css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
Media Objects
css
.media {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}
.media-image {
    flex-shrink: 0;
}
When to Use CSS Grid
Page Layouts
css
.page {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
}
Card Galleries
css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}
Dashboard Layouts
css
.dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
}
Overlapping Elements
css
.hero {
    display: grid;
    place-items: center;
}

.hero-image {
    grid-area: 1 / 1;
}

.hero-text {
    grid-area: 1 / 1;
    z-index: 1;
}
Decision Tree
text
Is your layout one-dimensional (row OR column)?
    │
    ├── YES → Use Flexbox
    │
    └── NO → Use CSS Grid

Is it a component (nav, button group, card)?
    │
    ├── YES → Use Flexbox
    │
    └── NO → CSS Grid may be better

Do you need precise control over both rows AND columns?
    │
    ├── YES → Use CSS Grid
    │
    └── NO → Flexbox is sufficient

Is it a complex page layout with multiple sections?
    │
    ├── YES → Use CSS Grid for overall structure
    │
    └── NO → Flexbox is fine
They Work Together!
Grid for Layout, Flexbox for Components
css
/* Grid for page structure */
.page {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
}

/* Flexbox for navigation inside header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Flexbox for skill cards */
.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

/* Grid for projects gallery */
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}
Common Patterns
Pattern	Best Choice	Why
Navigation	Flexbox	1D row, items align horizontally
Card Grid	Grid	2D, rows and columns
Centering	Flexbox	Simple one-line solution
Dashboard	Grid	Complex row/column structure
Form Layout	Flexbox or Grid	Either works, Flexbox simpler
Gallery	Grid	Responsive columns with auto-fit
Sidebar + Content	Grid	2D layout with main content area
Sticky Footer	Flexbox	Simple column direction
Quick Comparison Table
Scenario	Flexbox	Grid
Navigation bar	✅ Excellent	⚠️ Overkill
Card grid	⚠️ Requires wrap	✅ Perfect
Page layout	⚠️ Needs nesting	✅ Natural
Centering	✅ One line	✅ One line
Overlapping	⚠️ Positioning needed	✅ Grid areas
Responsive wrap	⚠️ Manual breakpoints	✅ auto-fit
Complex alignment	✅ justify/align	✅ justify/align
Best Practices
Use Grid for page structure — defines overall layout

Use Flexbox for components — arranges content inside grid cells

Combine both — they complement each other

Start with Grid for the big picture, then use Flexbox for details

Test responsiveness — both handle it well but differently

Example: Portfolio Layout
css
/* Grid for overall page */
.portfolio {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
}

/* Flexbox for navigation */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Flexbox for hero section */
.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Grid for projects gallery */
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

/* Flexbox for skill cards */
.skills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
}