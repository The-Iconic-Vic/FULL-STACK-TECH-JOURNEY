# 📘 Pseudo-Classes Reference

## Interactive Pseudo-Classes

Target elements based on user interaction.

| Pseudo-Class | Description | Example |
|--------------|-------------|---------|
| `:hover` | Mouse cursor over element | `button:hover` |
| `:focus` | Element has focus (keyboard/click) | `input:focus` |
| `:active` | Element being activated (click) | `a:active` |
| `:visited` | Link has been visited | `a:visited` |
| `:link` | Unvisited link | `a:link` |

```css
/* Link states */
a:link {
    color: blue;
}

a:visited {
    color: purple;
}

a:hover {
    color: red;
    text-decoration: underline;
}

a:active {
    color: orange;
}

/* Button states */
button {
    background: #007bff;
    transition: all 0.3s;
}

button:hover {
    background: #0056b3;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

/* Input focus */
input:focus {
    outline: 2px solid #007bff;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
Structural Pseudo-Classes
Target elements based on position in document.

Position in Parent
Pseudo-Class	Description
:first-child	First child of parent
:last-child	Last child of parent
:only-child	Only child of parent
:nth-child(n)	Nth child
:nth-last-child(n)	Nth from last
css
/* First list item */
li:first-child {
    border-top: none;
}

/* Last list item */
li:last-child {
    border-bottom: none;
}

/* Only child */
div:only-child {
    margin: 0;
}

/* Alternating table rows */
tr:nth-child(odd) {
    background: #f8f9fa;
}

tr:nth-child(even) {
    background: white;
}

/* Every 3rd card margin reset */
.card:nth-child(3n) {
    margin-right: 0;
}

/* First 3 items highlight */
.item:nth-child(-n+3) {
    font-weight: bold;
}

/* Items 4-6 */
.item:nth-child(n+4):nth-child(-n+6) {
    background: yellow;
}
Position by Type
Pseudo-Class	Description
:first-of-type	First of its type within parent
:last-of-type	Last of its type within parent
:only-of-type	Only of its type within parent
:nth-of-type(n)	Nth of its type
:nth-last-of-type(n)	Nth from last of its type
css
/* First paragraph in any section */
p:first-of-type {
    font-size: 1.1rem;
    font-weight: bold;
}

/* Last heading */
h2:last-of-type {
    margin-bottom: 0;
}

/* First article in each section */
article:first-of-type {
    border-top: none;
}

/* Every 2nd image */
img:nth-of-type(2n) {
    border-radius: 50%;
}
:nth-child() Formulas
Formula	Matches
odd	1, 3, 5, 7...
even	2, 4, 6, 8...
3n	3, 6, 9, 12...
3n+1	1, 4, 7, 10...
3n+2	2, 5, 8, 11...
n+3	3, 4, 5, 6... (from 3rd onward)
-n+3	1, 2, 3 (first 3)
css
/* First 3 items */
.item:nth-child(-n+3) {
    border-top: 2px solid blue;
}

/* Items from 4th onward */
.item:nth-child(n+4) {
    opacity: 0.7;
}

/* Every 4th item */
.item:nth-child(4n) {
    margin-right: 0;
}
Form Pseudo-Classes
Pseudo-Class	Description
:checked	Checked checkbox/radio
:disabled	Disabled form element
:enabled	Enabled form element
:required	Required form field
:optional	Optional form field
:valid	Valid input
:invalid	Invalid input
:in-range	Value within range
:out-of-range	Value outside range
css
/* Checked checkbox */
input:checked + label {
    font-weight: bold;
    color: green;
}

/* Disabled inputs */
input:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
}

/* Required fields */
input:required {
    border-left: 3px solid red;
}

/* Optional fields */
input:optional {
    border-left: 3px solid #ccc;
}

/* Valid input */
input:valid {
    border-color: green;
}

/* Invalid input */
input:invalid {
    border-color: red;
}
Other Useful Pseudo-Classes
Pseudo-Class	Description
:empty	Element with no children
:root	Root element (html)
:target	Element targeted by URL fragment
:not(selector)	Negation
css
/* Empty elements */
div:empty {
    display: none;
}

/* Target element */
section:target {
    background: #f0f0f0;
    padding: 1rem;
    border-radius: 8px;
}

/* All except first */
.item:not(:first-child) {
    margin-top: 1rem;
}

/* All buttons except primary */
button:not(.btn-primary) {
    background: gray;
}
Common Patterns
Alternating List
css
li:nth-child(odd) {
    background: #f8f9fa;
}
Striped Table
css
tr:nth-child(even) {
    background: #f8f9fa;
}
First Paragraph Drop Cap
css
article p:first-of-type::first-letter {
    font-size: 4rem;
    float: left;
    padding-right: 0.5rem;
}
Last Item No Border
css
li:last-child {
    border-bottom: none;
}
Hover Card
css
.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}