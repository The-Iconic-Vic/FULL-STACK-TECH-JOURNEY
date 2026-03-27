# 📅 Day 4: Introduction to CSS3

**Date:** March 26, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** CSS Basics, Selectors, Colors, Typography

---

## 📋 Learning Objectives

- ✅ Understand what CSS is and why it matters
- ✅ Apply CSS using inline, internal, and external methods
- ✅ Use element, class, and ID selectors
- ✅ Group selectors to write efficient CSS
- ✅ Work with colors: named, hex, rgb, hsl
- ✅ Style text with font and text properties

---

## 🎨 Part 1: CSS Basics

### What is CSS?

CSS (Cascading Style Sheets) is the presentation layer of the web. HTML provides structure; CSS provides style.

**Separation of Concerns:**

| Without CSS | With CSS |
|-------------|----------|
| Mixed content and presentation | Clean separation |
| Hard to maintain | One file updates entire site |
| Inconsistent design | Consistent across pages |
| Bloated HTML | Smaller, cleaner HTML |

---

### Three Ways to Add CSS

#### 1. Inline CSS
```html
<h1 style="color: blue; font-size: 24px;">Hello</h1>
Highest specificity

Hard to maintain

Use sparingly

2. Internal CSS
html
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>
Styles one page only

Good for single-page sites

3. External CSS (Recommended)
html
<head>
  <link rel="stylesheet" href="style.css">
</head>
Reusable across pages

Cached by browsers

Professional standard

CSS Syntax
css
selector {
  property: value;
  property: value;
}
Example:

css
h1 {
  color: navy;
  font-size: 32px;
  text-align: center;
}
🎯 Part 2: Basic Selectors
Element Selector
Targets all instances of an HTML tag.

css
p {
  color: #333;
  line-height: 1.5;
}

h1 {
  border-bottom: 2px solid black;
}
Specificity: 1

Class Selector
Targets elements with a specific class attribute. Reusable across elements.

css
.highlight {
  background-color: yellow;
  font-weight: bold;
}
html
<p class="highlight">Highlighted text</p>
<div class="highlight">Also highlighted</div>
Specificity: 10

ID Selector
Targets a single, unique element.

css
#header {
  background-color: #333;
  color: white;
  padding: 20px;
}
html
<div id="header">Header content</div>
Specificity: 100

Grouping Selectors
Apply same styles to multiple selectors.

css
h1, h2, h3 {
  color: navy;
  font-family: Arial;
  margin-bottom: 20px;
}

h1, .page-title, #main-heading {
  font-weight: bold;
}
Selector Specificity Hierarchy
Selector	Example	Score
Inline style	style="color: red;"	1000
ID	#header	100
Class	.highlight	10
Element	p	1
🎨 Part 3: Colors & Typography
Color Values
Named Colors
css
color: red;
background-color: steelblue;
border-color: gold;
Hexadecimal (Hex)
css
color: #000000;  /* Black */
color: #FFFFFF;  /* White */
color: #FF0000;  /* Red */
color: #FFA500;  /* Orange */
color: #800080;  /* Purple */
Shorthand:

css
color: #000;  /* #000000 */
color: #FFF;  /* #FFFFFF */
color: #F00;  /* #FF0000 */
RGB / RGBA
css
color: rgb(0, 0, 0);           /* Black */
color: rgb(255, 255, 255);     /* White */
color: rgb(255, 0, 0);         /* Red */
color: rgba(0, 0, 0, 0.5);     /* 50% transparent black */
HSL / HSLA
css
color: hsl(0, 100%, 50%);      /* Red */
color: hsl(120, 100%, 50%);    /* Green */
color: hsl(240, 100%, 50%);    /* Blue */
color: hsla(0, 100%, 50%, 0.5); /* Transparent red */
Format	Best For
Named	Quick prototyping
Hex	Precision, most common
RGB	When opacity needed
HSL	Intuitive adjustments
Font Properties
font-family
css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
}

h1 {
  font-family: Georgia, "Times New Roman", serif;
}

code {
  font-family: "Courier New", monospace;
}
font-size
css
body {
  font-size: 16px;  /* Base size */
}

h1 {
  font-size: 2rem;  /* 32px if root is 16px */
}

small {
  font-size: 0.875em; /* 14px if parent is 16px */
}
Unit	Description
px	Pixels (absolute)
rem	Relative to root font size
em	Relative to parent font size
font-weight
css
font-weight: normal;  /* 400 */
font-weight: bold;    /* 700 */
font-weight: 100;     /* Thin */
font-weight: 300;     /* Light */
font-weight: 400;     /* Normal */
font-weight: 700;     /* Bold */
font-weight: 900;     /* Black */
font-style
css
font-style: normal;
font-style: italic;
Text Properties
text-align
css
text-align: left;     /* Default */
text-align: right;
text-align: center;
text-align: justify;
text-decoration
css
text-decoration: none;           /* Remove underline */
text-decoration: underline;
text-decoration: overline;
text-decoration: line-through;
text-transform
css
text-transform: none;
text-transform: uppercase;   /* ALL CAPS */
text-transform: lowercase;   /* all lowercase */
text-transform: capitalize;  /* Each Word Capitalized */
line-height
css
line-height: 1.5;    /* Unitless (multiplier) */
line-height: 24px;   /* Fixed */
line-height: 150%;   /* Percentage */
✅ Day 4 Checklist
Understand what CSS is and why we separate content from presentation

Add CSS using inline, internal, and external methods

Use element selectors (p, h1, etc.)

Use class selectors (.classname)

Use ID selectors (#idname)

Group selectors to avoid repetition

Apply colors using named, hex, rgb, and hsl values

Style fonts with font-family, font-size, font-weight

Style text with text-align, text-decoration, text-transform, line-height

Style Day 1 About Me page with external CSS

Build Business Card mini-project

Push code to GitHub

📚 Quick Reference
CSS Methods
Method	Syntax	Use When
Inline	style="prop: value;"	Rare overrides
Internal	<style>...</style>	Single page
External	<link rel="stylesheet" href="file.css">	Professional sites
Selectors
Type	Syntax	Specificity
Element	p { }	1
Class	.class { }	10
ID	#id { }	100
Typography
Property	Example
font-family	Arial, sans-serif
font-size	16px, 1rem
font-weight	bold, 400
text-align	center
line-height	1.5