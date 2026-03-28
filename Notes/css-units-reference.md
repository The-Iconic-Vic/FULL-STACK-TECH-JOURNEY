# 📘 CSS Units Reference

## Unit Categories

| Category | Units |
|----------|-------|
| Absolute | `px`, `pt`, `cm`, `mm`, `in` |
| Relative | `%`, `em`, `rem`, `vw`, `vh`, `vmin`, `vmax` |

---

## Absolute Units

Fixed, do not scale.

| Unit | Name | Description | Use Case |
|------|------|-------------|----------|
| `px` | Pixels | 1px = 1/96th of an inch | Borders, shadows, small elements |
| `pt` | Points | 1pt = 1/72 of an inch | Print stylesheets only |
| `cm` | Centimeters | Physical measurement | Print media |
| `mm` | Millimeters | Physical measurement | Print media |
| `in` | Inches | Physical measurement | Print media |

---

## Relative Units

### Percentages (`%`)

Relative to parent element's corresponding property.

```css
.child {
    width: 50%;        /* 50% of parent width */
    margin-left: 10%;  /* 10% of parent width */
    font-size: 150%;   /* 150% of parent font-size */
}
Use for: Fluid layouts, container-based sizing

em
Relative to parent element's font size. Compounds with nesting.

css
body {
    font-size: 16px;
}
.parent {
    font-size: 1.5em;  /* 24px (16 × 1.5) */
}
.child {
    font-size: 1.5em;  /* 36px (24 × 1.5) - compounds! */
    width: 10em;       /* 360px based on its own font-size */
}
Use for: Spacing relative to text size, media queries

Warning: Compounds in nested structures, making sizes unpredictable.

rem (Root EM)
Relative to root (<html>) element's font size. Most predictable.

css
html {
    font-size: 16px;  /* Base size */
}
.element {
    font-size: 1.25rem;  /* 20px (16 × 1.25) */
    margin: 1rem;        /* 16px */
    padding: 0.5rem;     /* 8px */
    width: 20rem;        /* 320px */
}
Use for (PREFERRED):

Font sizes

Margins and padding

Width and height

Media queries

Why preferred:

No compounding issues

Respects user browser font settings

Consistent scaling across application

Viewport Units
Relative to browser viewport (visible window area).

Unit	Description	Example
vw	1% of viewport width	width: 50vw = half screen width
vh	1% of viewport height	height: 100vh = full screen height
vmin	1% of smaller dimension	width: 50vmin = 50% of smaller side
vmax	1% of larger dimension	width: 50vmax = 50% of larger side
css
.hero {
    height: 100vh;           /* Full viewport height */
    min-height: 400px;       /* Never smaller than 400px */
}

.full-width {
    width: 100vw;            /* Full viewport width */
    margin-left: calc(-50vw + 50%);
}

.responsive-text {
    font-size: clamp(1rem, 5vw, 3rem);
}
Use for:

Full-screen sections

Hero images

Responsive typography

Unit Decision Guide
Property	Recommended Unit	Reason
Font sizes	rem	Accessibility, consistency
Margins/padding	rem	Scales with text
Container widths	%, rem, vw	Responsive layouts
Max-width	rem, %, px	Layout constraints
Border widths	px	Should not scale
Border radius	px or rem	Either works
Box shadows	px	Fine detail
Media queries	rem or em	Accessibility
Full-screen sections	vh	Viewport-based
Fluid Typography with clamp()
css
.heading {
    font-size: clamp(1.5rem, 5vw, 3rem);
    /* Minimum: 1.5rem
       Preferred: 5% of viewport width
       Maximum: 3rem */
}

.paragraph {
    font-size: clamp(1rem, 1rem + 0.5vw, 1.25rem);
}
Common Patterns
Responsive Container
css
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}
Full-Height Section
css
.section {
    min-height: 100vh;
    display: flex;
    align-items: center;
}
Responsive Grid Item
css
.grid-item {
    width: 100%;
    max-width: 300px;
    margin: 1rem;
}

@media (min-width: 768px) {
    .grid-item {
        width: calc(50% - 2rem);
    }
}
Quick Reference
Unit	Relative To	Best For
px	Screen pixels	Borders, shadows
%	Parent	Fluid widths
em	Parent font	Spacing relative to text
rem	Root font	Fonts, spacing, widths
vw	Viewport width	Full-width elements
vh	Viewport height	Full-screen sections
vmin	Smaller dimension	Proportional sizing
vmax	Larger dimension	Proportional sizing