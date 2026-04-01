# 📘 CSS Transitions Reference

## What Are Transitions?

Transitions allow CSS properties to change smoothly over a specified duration instead of instantly.

```css
/* Without transition - instant change */
.button {
    background: blue;
}
.button:hover {
    background: red; /* Jumps instantly */
}

/* With transition - smooth change */
.button {
    background: blue;
    transition: background 0.3s ease;
}
.button:hover {
    background: red; /* Fades smoothly */
}
Transition Properties
transition-property
Specifies which properties to animate.

Value	Description
all	All changing properties (default)
property-name	Specific property
property1, property2	Multiple properties
css
/* Single property */
.element {
    transition-property: background;
}

/* Multiple properties */
.element {
    transition-property: background, transform, opacity;
}

/* All properties */
.element {
    transition-property: all;
}
transition-duration
How long the transition takes.

css
.element {
    transition-duration: 0.3s;   /* 300 milliseconds */
    transition-duration: 300ms;  /* Same */
    transition-duration: 1s;     /* 1 second */
}
transition-timing-function
Defines the speed curve.

Value	Description	Curve
ease	Starts slow, fast, ends slow (default)	◠
linear	Constant speed	/
ease-in	Starts slow, ends fast	◡
ease-out	Starts fast, ends slow	◠
ease-in-out	Slow, fast, slow	∩
cubic-bezier()	Custom curve	—
css
.element {
    transition-timing-function: ease;
    transition-timing-function: linear;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
transition-delay
Delay before transition starts.

css
.element {
    transition-delay: 0s;      /* No delay (default) */
    transition-delay: 0.2s;    /* 200ms delay */
    transition-delay: 1s;      /* 1 second delay */
}
transition Shorthand
css
/* order: property duration timing-function delay */
.element {
    transition: background 0.3s ease;
    transition: all 0.5s linear;
    transition: transform 0.2s ease-in-out 0.1s;
}

/* Multiple transitions */
.element {
    transition: background 0.3s ease,
                transform 0.2s linear,
                opacity 0.5s;
}
Transitionable Properties
Category	Properties
Colors	color, background-color, border-color, outline-color
Sizing	width, height, max-width, min-width, padding, margin
Positioning	top, right, bottom, left
Typography	font-size, letter-spacing, line-height, word-spacing
Visual	opacity, box-shadow, border-radius, z-index
Transforms	transform
Background	background-position, background-size
Border	border-width, border-radius
Common Transition Patterns
Button Hover
css
.button {
    background: #007bff;
    padding: 10px 20px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.button:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
Card Hover
css
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
Link Underline
css
.link {
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease;
}

.link:hover {
    border-bottom-color: #007bff;
}
Fade In
css
.element {
    opacity: 0;
    transition: opacity 0.5s ease;
}

.element.visible {
    opacity: 1;
}
Slide Down
css
.menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.menu.open {
    max-height: 500px;
}
Performance Tips
Prefer transform and opacity - They use GPU acceleration

Avoid transitioning width and height - Causes layout reflows

Use will-change for animations that will run frequently

css
.animated-element {
    will-change: transform, opacity;
    transition: transform 0.3s ease;
}
Browser Support
Property	Support
transition	All modern browsers
cubic-bezier()	All modern browsers
will-change	All modern browsers