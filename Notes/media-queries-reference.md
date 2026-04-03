# 📘 Media Queries Reference

## Viewport Meta Tag

Required for responsive design on mobile devices.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Viewport Attributes
Attribute	Values	Description
width	device-width, [pixel value]	Sets viewport width
initial-scale	1.0 - 10.0	Initial zoom level
minimum-scale	1.0 - 10.0	Minimum zoom level
maximum-scale	1.0 - 10.0	Maximum zoom level
user-scalable	yes, no	Allows user zoom
Media Query Syntax
css
/* Basic syntax */
@media media-type and (media-feature) {
    /* CSS rules */
}

/* Examples */
@media screen and (max-width: 768px) {
    body { background: lightblue; }
}

@media print {
    .no-print { display: none; }
}

@media (min-width: 768px) and (max-width: 1024px) {
    /* Tablet styles */
}
Media Types
Media Type	Description
all	All devices (default)
screen	Computer screens, tablets, phones
print	Print preview mode
speech	Screen readers
css
@media print {
    header, footer, .sidebar {
        display: none;
    }
}
Media Features
Width & Height
Feature	Description
width	Viewport width
min-width	Minimum width
max-width	Maximum width
height	Viewport height
min-height	Minimum height
max-height	Maximum height
css
/* Target specific width */
@media (width: 768px) { }

/* Target minimum width (mobile-first) */
@media (min-width: 768px) { }

/* Target maximum width (desktop-first) */
@media (max-width: 768px) { }

/* Target range */
@media (min-width: 768px) and (max-width: 1024px) { }
Orientation
Feature	Values
orientation	portrait, landscape
css
/* Portrait mode (height > width) */
@media (orientation: portrait) {
    .landscape-only { display: none; }
}

/* Landscape mode (width > height) */
@media (orientation: landscape) {
    .portrait-only { display: none; }
}
Resolution & Pixel Ratio
Feature	Description
resolution	Pixel density
min-resolution	Minimum pixel density
max-resolution	Maximum pixel density
css
/* High DPI screens (Retina) */
@media (min-resolution: 2dppx) {
    .logo {
        background-image: url('logo@2x.png');
    }
}
Hover & Pointer
Feature	Values	Description
hover	hover, none	Device supports hover
pointer	fine, coarse	Pointer accuracy
css
/* Devices with hover capability (desktop) */
@media (hover: hover) {
    .card:hover {
        transform: scale(1.05);
    }
}

/* Touch devices */
@media (pointer: coarse) {
    button {
        min-height: 48px;
        min-width: 48px;
    }
}

/* Mouse/keyboard devices */
@media (pointer: fine) {
    button {
        padding: 8px 16px;
    }
}
Common Breakpoints
Standard Breakpoints
Device	Breakpoint
Small phone	max-width: 480px
Phone	max-width: 768px
Tablet	min-width: 768px and max-width: 1024px
Desktop	min-width: 1024px
Large desktop	min-width: 1200px
Mobile-First Breakpoints
css
/* Mobile (default) */
.container { width: 100%; }

/* Tablet */
@media (min-width: 768px) {
    .container { max-width: 750px; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { max-width: 960px; }
}

/* Large Desktop */
@media (min-width: 1200px) {
    .container { max-width: 1140px; }
}
Desktop-First Breakpoints
css
/* Desktop (default) */
.container { max-width: 1200px; }

/* Tablet */
@media (max-width: 1024px) {
    .container { max-width: 960px; }
}

/* Mobile */
@media (max-width: 768px) {
    .container { width: 100%; }
}
Common Media Query Patterns
Hide Elements on Mobile
css
.desktop-only {
    display: block;
}

.mobile-only {
    display: none;
}

@media (max-width: 768px) {
    .desktop-only {
        display: none;
    }
    
    .mobile-only {
        display: block;
    }
}
Responsive Font Sizes
css
html {
    font-size: 16px;
}

@media (max-width: 768px) {
    html {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    html {
        font-size: 12px;
    }
}
Responsive Grid
css
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
Responsive Navigation
css
.nav-links {
    display: flex;
    gap: 2rem;
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .hamburger {
        display: block;
    }
}
Logical Operators
Operator	Description	Example
and	Both conditions true	(min-width: 768px) and (max-width: 1024px)
, (or)	Either condition true	(max-width: 480px), (orientation: landscape)
not	Negates condition	@media not print
only	Old browsers ignore	@media only screen
css
/* Range (modern syntax) */
@media (width >= 768px) and (width <= 1024px) { }

/* Equivalent to */
@media (min-width: 768px) and (max-width: 1024px) { }
Testing Media Queries
In DevTools
Open DevTools (F12)

Click Device Toggle (📱) or Ctrl+Shift+M

Select device or drag to resize

View media queries in the styles panel

In CSS
css
/* Debug outline */
@media (max-width: 768px) {
    body::before {
        content: "Mobile: < 768px";
        position: fixed;
        bottom: 0;
        right: 0;
        background: red;
        color: white;
        padding: 4px 8px;
        font-size: 12px;
        z-index: 9999;
    }
}