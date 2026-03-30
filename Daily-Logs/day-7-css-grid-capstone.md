# 📅 Day 7: CSS Grid & Week 1 Capstone Project

**Date:** March 30, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** CSS Grid, Grid vs Flexbox, Portfolio Capstone Project

---

## 📋 Learning Objectives

- ✅ Understand CSS Grid fundamentals: `display: grid`, `grid-template-columns`, `grid-template-rows`
- ✅ Use `gap` for consistent spacing in grid layouts
- ✅ Span items across multiple columns or rows
- ✅ Know when to use Grid vs Flexbox
- ✅ Build a complete personal portfolio website
- ✅ Apply responsive design principles

---

## 🧩 Part 1: CSS Grid Basics

### What is CSS Grid?

CSS Grid is a two-dimensional layout system that allows you to create complex, responsive layouts with rows AND columns simultaneously. Unlike Flexbox (which handles one dimension at a time), Grid excels at arranging items in both directions.

**Activating Grid:**
```css
.container {
    display: grid;
}
Defining Columns and Rows
grid-template-columns
Defines the number and width of columns.

css
/* Fixed widths */
.grid {
    display: grid;
    grid-template-columns: 200px 300px 200px;
    /* 3 columns: 200px, 300px, 200px */
}

/* Fractional units (fr) - distributes available space */
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    /* 1 part, 2 parts, 1 part of available space */
}

/* Repeat function */
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 3 equal columns */
}

/* Auto-fit and minmax (responsive) */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* Responsive columns that wrap automatically */
}
grid-template-rows
Defines the number and height of rows.

css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 200px auto;
}
The gap Property
Creates consistent spacing between grid items.

css
.grid {
    display: grid;
    gap: 20px;           /* Equal row and column gap */
    gap: 20px 10px;      /* row-gap column-gap */
    row-gap: 20px;
    column-gap: 10px;
}
Grid Lines and Spanning Items
Grid items can span across multiple columns or rows.

css
/* Spanning columns */
.item {
    grid-column: 1 / 3;     /* Starts at line 1, ends at line 3 (spans 2 columns) */
    grid-column: span 2;    /* Spans 2 columns */
}

/* Spanning rows */
.item {
    grid-row: 1 / 3;        /* Starts at line 1, ends at line 3 (spans 2 rows) */
    grid-row: span 2;       /* Spans 2 rows */
}

/* Combine column and row */
.item {
    grid-column: span 2;
    grid-row: span 1;
}
Grid Container Properties
Property	Values	Purpose
display	grid	Activates Grid
grid-template-columns	lengths, fr, repeat(), minmax()	Defines columns
grid-template-rows	lengths, fr, repeat(), minmax()	Defines rows
gap	length	Space between items
justify-items	start, end, center, stretch	Aligns items horizontally
align-items	start, end, center, stretch	Aligns items vertically
justify-content	start, end, center, space-between, space-around	Aligns grid within container
Grid Item Properties
Property	Values	Purpose
grid-column	start / end, span n	Spans columns
grid-row	start / end, span n	Spans rows
justify-self	start, end, center, stretch	Aligns single item horizontally
align-self	start, end, center, stretch	Aligns single item vertically
🔀 Part 2: Grid vs. Flexbox
When to Use Each
Scenario	Best Choice	Reason
Navigation bars	Flexbox	One-dimensional, items in a row
Card grids	Grid	Two-dimensional, rows AND columns
Centering content	Flexbox	Simple alignment
Complex page layouts	Grid	Full control over rows and columns
Stacking items	Flexbox column or Grid	Either works, Flexbox simpler
Overlapping items	Grid	Grid offers explicit positioning
They Work Great Together!
css
/* Grid for overall page layout */
.page {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
}

/* Flexbox for content inside grid cells */
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.main-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
Quick Comparison
Feature	Flexbox	CSS Grid
Dimensions	1D (row OR column)	2D (rows AND columns)
Best for	Components, navigation	Page layouts, galleries
Wrapping	flex-wrap	auto-fit, minmax()
Item alignment	align-items, justify-content	align-items, justify-items
Spacing	gap	gap
🏗️ Part 3: Capstone Project - Personal Portfolio
Project Structure
text
portfolio/
├── index.html
├── style.css
└── images/
    ├── profile.jpg
    ├── project-1.jpg
    ├── project-2.jpg
    └── project-3.jpg
Sections to Build
Section	Layout Technique	Purpose
Navigation	Flexbox	Logo left, links right
Hero	Flexbox	Centered content with buttons
About	Flexbox	Image left, text right
Skills	Flexbox with wrap	Responsive skill cards
Projects	CSS Grid	3-column responsive gallery
Contact	Flexbox	Centered links
Footer	Text centering	Copyright and back to top
Key Code Patterns
Responsive Grid for Projects
css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
}
Flexbox Skills Section
css
.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
}

.skill-card {
    flex: 1 1 280px;
}
Responsive Navigation
css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
        flex-direction: column;
    }
    
    .nav-links.active {
        display: flex;
    }
}
Responsive Breakpoints
Breakpoint	Layout Changes
< 768px	Navigation stacks, projects grid 1 column, about section stacks
769px - 1024px	Projects grid 2 columns
> 1024px	Projects grid 3 columns
✅ Day 7 Checklist
Understand CSS Grid basics (display: grid, grid-template-columns)

Use fr units for flexible layouts

Apply repeat() and minmax() for responsive grids

Span items across columns with grid-column

Know when to use Grid vs Flexbox

Build complete portfolio HTML structure

Style navigation with Flexbox

Create hero section with buttons

Build about section with image and text

Create skills section with Flexbox cards

Build projects gallery with CSS Grid

Add contact section with social links

Style footer with copyright

Make entire site responsive

Test on mobile and desktop

Push to GitHub

📚 Quick Reference
Grid Properties
css
/* Container */
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto;
gap: 1.5rem;

/* Responsive columns */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
Flexbox vs Grid Decision
text
Is your layout 1D (row OR column)?
    ├── YES → Use Flexbox
    └── NO → Use CSS Grid

Are you building a component (nav, card, button group)?
    ├── YES → Use Flexbox
    └── NO → Use CSS Grid

Are you building a page layout (header, main, sidebar, footer)?
    ├── YES → Use CSS Grid
    └── NO → Flexbox is fine
🔑 Key Takeaways
Grid is for 2D layouts — rows AND columns

Flexbox is for 1D layouts — row OR column

Use fr units for distributing available space in Grid

repeat(auto-fit, minmax(250px, 1fr)) creates responsive grids without media queries

Grid and Flexbox work together — use Grid for page layout, Flexbox for components

Always test responsiveness — mobile and desktop

Your portfolio is your brand — make it clean, professional, and personal

