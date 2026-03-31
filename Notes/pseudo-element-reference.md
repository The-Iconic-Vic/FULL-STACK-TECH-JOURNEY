# 📘 Pseudo-Elements Reference

## Overview

Pseudo-elements style specific parts of an element. They use **double colon** `::` (CSS3+). Single colon `:` works for backward compatibility but double colon is preferred.

| Pseudo-Element | Description |
|----------------|-------------|
| `::before` | Creates pseudo-element before content |
| `::after` | Creates pseudo-element after content |
| `::first-letter` | First letter of block-level element |
| `::first-line` | First line of text |
| `::selection` | Text selected by user |
| `::placeholder` | Placeholder text in inputs |
| `::marker` | List item marker |

---

## `::before` and `::after`

### Important Rules
- **Must have `content` property** to display
- Inserted before/after element's content
- Inline by default
- Can be styled like any element

```css
/* Basic usage */
.element::before {
    content: "★ ";
    color: gold;
}

.element::after {
    content: " →";
}
Common Use Cases
Icons and Decoration
css
/* Add icon before external links */
a[href^="http"]::before {
    content: "🔗 ";
}

/* Add PDF icon after PDF links */
a[href$=".pdf"]::after {
    content: " 📄";
}

/* Required field asterisk */
input[required]::after {
    content: "*";
    color: red;
}
Quotes
css
blockquote::before {
    content: "“";
    font-size: 3rem;
    line-height: 1;
    color: #ccc;
}

blockquote::after {
    content: "”";
    font-size: 3rem;
    line-height: 1;
    color: #ccc;
}
Clearfix
css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
Tooltips
css
[data-tooltip] {
    position: relative;
}

[data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    display: none;
}

[data-tooltip]:hover::before {
    display: block;
}
Counters
css
/* Numbered sections */
body {
    counter-reset: section;
}

h2::before {
    counter-increment: section;
    content: "Chapter " counter(section) ": ";
    color: #666;
}
::first-letter
Styles the first letter of a block-level element.

css
/* Drop cap */
p::first-letter {
    font-size: 3.5rem;
    font-weight: bold;
    float: left;
    padding-right: 0.5rem;
    line-height: 0.8;
    color: #007bff;
}

/* Styled first letter */
article h2::first-letter {
    font-size: 2rem;
    color: #007bff;
}
::first-line
Styles the first line of text.

css
/* Bold first line */
p::first-line {
    font-weight: bold;
    letter-spacing: 1px;
    color: #2c3e50;
}

/* Large first line */
.intro::first-line {
    font-size: 1.2rem;
    font-variant: small-caps;
}
::selection
Styles text selected by the user.

css
/* Custom selection */
::selection {
    background-color: #007bff;
    color: white;
}

/* Different selection for different elements */
.dark-mode::selection {
    background-color: #ffc107;
    color: #1a1a2e;
}
::placeholder
Styles placeholder text in form inputs.

css
/* Placeholder styling */
input::placeholder {
    color: #999;
    font-style: italic;
}

textarea::placeholder {
    color: #999;
    font-size: 0.875rem;
}
::marker
Styles list item markers (bullets/numbers).

css
/* Custom bullet color */
li::marker {
    color: #007bff;
    font-weight: bold;
}

/* Remove markers */
li::marker {
    content: none;
}
Styling Pseudo-Elements
css
/* Basic styling */
.element::before {
    content: "★";
    display: inline-block;
    width: 20px;
    text-align: center;
    margin-right: 8px;
    color: gold;
}

/* Hover effects */
.button::after {
    content: " →";
    transition: transform 0.3s;
    display: inline-block;
}

.button:hover::after {
    transform: translateX(5px);
}

/* Responsive pseudo-elements */
@media (max-width: 768px) {
    .card::after {
        display: none;
    }
}
Common Patterns
Breadcrumb Separator
css
.breadcrumb li:not(:last-child)::after {
    content: "/";
    margin: 0 8px;
    color: #999;
}
Read More Arrow
css
.read-more::after {
    content: " →";
    transition: transform 0.3s;
    display: inline-block;
}

.read-more:hover::after {
    transform: translateX(5px);
}
Required Field Indicator
css
label.required::after {
    content: "*";
    color: red;
    margin-left: 4px;
}
Social Link Icons
css
.social-twitter::before {
    content: "🐦 ";
}

.social-github::before {
    content: "📂 ";
}

.social-linkedin::before {
    content: "💼 ";
}
Step Numbers
css
.step {
    counter-increment: step-counter;
}

.step::before {
    content: counter(step-counter);
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
}
Important Notes
content property is required for ::before and ::after

Double colon :: is CSS3 standard (single colon works but deprecated)

Pseudo-elements don't work on replaced elements like <img>, <input>, <iframe>

Only one ::before and ::after per element

::first-letter and ::first-line only work on block-level elements

Pseudo-elements are inline by default, use display: block to change
