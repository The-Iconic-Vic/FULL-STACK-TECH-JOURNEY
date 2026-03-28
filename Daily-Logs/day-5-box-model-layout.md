# 📅 Day 5: The Box Model & Layout Basics

**Date:** March 27, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Box Model, Display Properties, CSS Units

---

## 📋 Learning Objectives

- ✅ Understand the four layers of the box model: content, padding, border, margin
- ✅ Calculate total element width and height
- ✅ Master `box-sizing: border-box` for predictable layouts
- ✅ Differentiate between block, inline, and inline-block display
- ✅ Use absolute and relative units appropriately
- ✅ Build card components with proper spacing
- ✅ Inspect box model using Chrome DevTools

---

## 📦 Part 1: The Box Model

### The Four Layers

Every HTML element is a rectangular box with four layers:
┌─────────────────────────────────────────────┐
│ MARGIN │
│ ┌───────────────────────────────────────┐ │
│ │ BORDER │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ PADDING │ │ │
│ │ │ ┌─────────────────────────┐ │ │ │
│ │ │ │ CONTENT │ │ │ │
│ │ │ └─────────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘

text



#### Content
The innermost layer where text, images, and other elements live.

```css
.content-example {
  width: 300px;
  height: 200px;
}
Padding
Space between content and border. Creates breathing room inside the element.

css
/* All sides */
padding: 20px;

/* Top/Bottom Left/Right */
padding: 10px 20px;

/* Top Right Bottom Left (clockwise) */
padding: 10px 15px 20px 25px;

/* Individual sides */
padding-top: 10px;
padding-right: 15px;
padding-bottom: 20px;
padding-left: 25px;
Border
The line wrapping around padding and content.

css
/* Shorthand */
border: 2px solid black;

/* Individual properties */
border-width: 2px;
border-style: solid;  /* solid, dashed, dotted, double, groove, ridge, inset, outset */
border-color: #333;

/* Individual sides */
border-top: 1px dashed red;
border-radius: 10px;  /* Rounded corners */
Margin
Space outside the border. Creates distance between elements.

css
/* All sides */
margin: 20px;

/* Top/Bottom Left/Right */
margin: 10px 20px;

/* Center horizontally */
margin: 0 auto;

/* Individual sides */
margin-top: 10px;
margin-bottom: 20px;
Margin Collapse: Vertical margins between elements collapse into the larger margin.

Width and Height Calculations
Default (content-box):

text
Total Width = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
Total Height = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
Example:

css
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
/* Total width = 300 + 40 + 4 + 20 = 364px */
Box-Sizing: The Game Changer
Value	Behavior
content-box	Default. Width/height apply to content only
border-box	Width/height include padding and border
css
/* Universal reset - BEST PRACTICE */
*,
*::before,
*::after {
  box-sizing: border-box;
}
With border-box:

css
.card {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid black;
}
/* Total width = 300px (padding and border are inside) */
🎯 Part 2: Display Properties
Block
Starts on new line

Takes full width available

Respects all box model properties

css
.block {
  display: block;
  width: 300px;
  margin: 10px auto;
}
Elements: <div>, <p>, <h1>-<h6>, <header>, <footer>, <section>, <article>

Inline
Flows within text

Width/height ignored

Only left/right margins respected

css
.inline {
  display: inline;
  width: 300px;    /* IGNORED */
  height: 100px;   /* IGNORED */
}
Elements: <span>, <a>, <strong>, <em>

Inline-Block
Flows inline (no line break)

Respects width and height

Respects all margins and padding

css
.inline-block {
  display: inline-block;
  width: 200px;
  height: 150px;
  margin: 10px;
  vertical-align: top;
}
Comparison Table
Behavior	block	inline	inline-block
Starts new line	✅ Yes	❌ No	❌ No
Width/height respected	✅ Yes	❌ No	✅ Yes
Vertical margin/padding	✅ Yes	⚠️ Partial	✅ Yes
Default width	100%	Content	Content
Common Layout Patterns
Navigation Menu:

css
nav a {
  display: inline-block;
  padding: 15px 25px;
}
Card Grid:

css
.card-grid {
  font-size: 0;  /* Removes whitespace */
}
.card {
  display: inline-block;
  width: 280px;
  margin: 15px;
  font-size: 16px; /* Reset */
}
📏 Part 3: Units of Measurement
Absolute Units
Fixed, do not scale.

Unit	Name	Use Case
px	Pixels	Borders, shadows, small elements
pt	Points	Print stylesheets only
Relative Units
Scale based on other factors.

Percentages (%)
Relative to parent element.

css
.child {
  width: 50%;   /* 50% of parent width */
}
em
Relative to parent font size. Compounds with nesting.

css
.parent {
  font-size: 1.5em;  /* 24px if body is 16px */
}
.child {
  font-size: 1.5em;  /* 36px - compounds! */
}
rem (Root EM)
Relative to root (<html>) font size. Most predictable.

css
html {
  font-size: 16px;
}
.element {
  font-size: 1.25rem;  /* 20px */
  margin: 1rem;        /* 16px */
  width: 20rem;        /* 320px */
}
Viewport Units
Relative to browser viewport.

Unit	Description
vw	1% of viewport width
vh	1% of viewport height
vmin	1% of smaller dimension
vmax	1% of larger dimension
css
.hero {
  height: 100vh;  /* Full screen height */
}
Unit Decision Guide
Property	Recommended Unit
Font sizes	rem
Margins/padding	rem
Container widths	%, rem, vw
Border widths	px
Border radius	px or rem
Full-screen sections	vh
🏗️ Hands-On Practice: Card Component
HTML:

html
<div class="card">
  <img src="image.jpg" alt="Card image" class="card-image">
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Description text here.</p>
    <button class="card-button">Learn More</button>
  </div>
</div>
CSS:

css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  width: 320px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #666;
  margin-bottom: 1.25rem;
}

.card-button {
  display: inline-block;
  background: #007bff;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
}


✅ Day 5 Checklist
Understand the four box model layers (content, padding, border, margin)

Apply box-sizing: border-box universally

Calculate total element width with different box-sizing values

Use block, inline, and inline-block display properties

Build a navigation menu with inline-block

Use rem for font sizes and spacing

Use px for borders and small details

Build Card Component mini-project

Build Profile Card mini-project

Inspect box model using Chrome DevTools

Push code to GitHub

🔧 DevTools Practice
Right-click any element → Inspect

In Styles tab, scroll to box model visualization

Hover over margin, border, padding, content layers

Click values to edit live

Observe how layout changes

📚 Quick Reference
Box Model
Property	Purpose
padding	Space inside border
border	Line around padding
margin	Space outside border

box-sizing: border-box	Width includes padding/border
Display Types
Value	Behavior
block	Full width, new line
inline	Flows with text
inline-block	Sizable, horizontal

Units
Unit	Relative To
px	Screen pixels
rem	Root font size
%	Parent
vh/vw	Viewport
