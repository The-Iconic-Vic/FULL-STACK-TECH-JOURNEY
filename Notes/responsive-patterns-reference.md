# 📘 Responsive Patterns Reference

## Fluid Layouts

### Fluid Container

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}
Fluid Flexbox Grid
css
.flex-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.flex-item {
    flex: 1 1 280px;
}
Fluid CSS Grid
css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}
Percentage-based Columns
css
.row {
    display: flex;
    flex-wrap: wrap;
}

.col-50 {
    width: 50%;
    padding: 0 1rem;
}

.col-33 {
    width: 33.333%;
    padding: 0 1rem;
}

@media (max-width: 768px) {
    .col-50, .col-33 {
        width: 100%;
        margin-bottom: 1rem;
    }
}
Responsive Images
Basic Fluid Image
css
img {
    max-width: 100%;
    height: auto;
}
Picture Element (Art Direction)
html
<picture>
    <source media="(min-width: 1024px)" srcset="image-large.jpg">
    <source media="(min-width: 768px)" srcset="image-tablet.jpg">
    <img src="image-mobile.jpg" alt="Description">
</picture>
srcset (Resolution Switching)
html
<img src="image-small.jpg"
     srcset="image-small.jpg 480w,
             image-medium.jpg 800w,
             image-large.jpg 1200w"
     sizes="(max-width: 600px) 480px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Description">
Responsive Background Images
css
.hero {
    background-size: cover;
    background-position: center;
}

/* Mobile */
.hero {
    background-image: url('hero-mobile.jpg');
}

/* Tablet */
@media (min-width: 768px) {
    .hero {
        background-image: url('hero-tablet.jpg');
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .hero {
        background-image: url('hero-desktop.jpg');
    }
}
Responsive Typography
clamp() Function
css
/* Syntax: clamp(minimum, preferred, maximum) */
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
}

p {
    font-size: clamp(0.875rem, 1rem + 0.5vw, 1.25rem);
}

.card {
    padding: clamp(1rem, 3vw, 2rem);
    gap: clamp(0.5rem, 2vw, 1.5rem);
}
Fluid Type Scale
css
:root {
    --step--2: clamp(0.78rem, calc(0.77rem + 0.05vw), 0.81rem);
    --step--1: clamp(0.94rem, calc(0.92rem + 0.11vw), 1.00rem);
    --step-0: clamp(1.13rem, calc(1.10rem + 0.19vw), 1.25rem);
    --step-1: clamp(1.35rem, calc(1.31rem + 0.29vw), 1.56rem);
    --step-2: clamp(1.62rem, calc(1.56rem + 0.43vw), 1.95rem);
    --step-3: clamp(1.94rem, calc(1.86rem + 0.61vw), 2.44rem);
    --step-4: clamp(2.33rem, calc(2.21rem + 0.86vw), 3.05rem);
}

h1 { font-size: var(--step-4); }
h2 { font-size: var(--step-3); }
h3 { font-size: var(--step-2); }
p { font-size: var(--step-0); }
Viewport Units with Fallback
css
h1 {
    font-size: 2rem;
    font-size: clamp(1.5rem, 5vw, 3rem);
}
Responsive Spacing
Fluid Padding
css
.container {
    padding: clamp(1rem, 5vw, 3rem);
}
Fluid Gap
css
.grid {
    gap: clamp(0.5rem, 3vw, 2rem);
}
Responsive Margin
css
.section {
    margin-bottom: clamp(2rem, 10vh, 5rem);
}
Responsive Layout Patterns
Stacked to Side-by-Side
css
/* Mobile: stacked */
.layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Desktop: side-by-side */
@media (min-width: 768px) {
    .layout {
        flex-direction: row;
    }
    
    .sidebar {
        width: 30%;
    }
    
    .main-content {
        width: 70%;
    }
}
Card Grid
css
.card-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
}

@media (min-width: 640px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1280px) {
    .card-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
Holy Grail Layout
css
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
}

@media (min-width: 768px) {
    .page {
        display: grid;
        grid-template-areas:
            "header header"
            "nav main"
            "footer footer";
        grid-template-columns: 250px 1fr;
    }
    
    .header { grid-area: header; }
    .nav { grid-area: nav; }
    .main { grid-area: main; }
    .footer { grid-area: footer; }
}
Responsive Tables
css
/* Horizontal scroll on mobile */
.table-container {
    overflow-x: auto;
}

table {
    min-width: 600px;
}

/* Stacked table on mobile */
@media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
        display: block;
    }
    
    thead {
        display: none;
    }
    
    tr {
        margin-bottom: 1rem;
        border: 1px solid #ddd;
    }
    
    td {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        border: none;
    }
    
    td::before {
        content: attr(data-label);
        font-weight: bold;
        width: 40%;
    }
}
Responsive Forms
css
/* Form inputs full width on mobile */
.form-group {
    margin-bottom: 1rem;
}

input, select, textarea {
    width: 100%;
    padding: 0.75rem;
}

/* Side-by-side on desktop */
@media (min-width: 768px) {
    .form-row {
        display: flex;
        gap: 1rem;
    }
    
    .form-group {
        flex: 1;
    }
}
Touch Targets
css
/* Minimum touch target size */
button,
a.button,
input[type="submit"] {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 16px;
}

/* Remove hover effects on touch devices */
@media (hover: none) {
    .card:hover {
        transform: none;
    }
}