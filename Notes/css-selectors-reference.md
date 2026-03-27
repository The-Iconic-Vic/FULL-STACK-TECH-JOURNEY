# 📘 CSS Selectors Reference

## Element Selector
Targets all instances of an HTML tag.

```css
p {
    color: #333;
}

h1 {
    font-size: 32px;
}

a {
    text-decoration: none;
}
Specificity: 1

Class Selector
Targets elements with a specific class attribute. Reusable.

css
.highlight {
    background-color: yellow;
}

.card {
    border: 1px solid #ddd;
    padding: 20px;
}

.btn-primary {
    background-color: blue;
    color: white;
}
HTML:

html
<p class="highlight">Text</p>
<div class="card">Content</div>
<button class="btn-primary">Click</button>
Specificity: 10

ID Selector
Targets a single, unique element.

css
#header {
    background-color: #333;
}

#main-content {
    max-width: 800px;
}

#footer {
    font-size: 12px;
}
HTML:

html
<div id="header">Header</div>
<div id="main-content">Content</div>
<div id="footer">Footer</div>
Specificity: 100

Grouping Selector
Apply same styles to multiple selectors.

css
h1, h2, h3 {
    color: navy;
    font-family: Arial;
}

p, li, .description {
    line-height: 1.6;
}

h1, .page-title, #main-heading {
    font-weight: bold;
}
Specificity Hierarchy
Selector Type	Example	Score
Inline style	style="color: red;"	1000
ID	#header	100
Class	.highlight	10
Element	p	1
Selector Combinations
Descendant Selector
Targets elements inside another element.

css
/* All paragraphs inside articles */
article p {
    color: #555;
}

/* List items inside navigation */
nav ul li {
    display: inline;
}
Child Selector
Targets direct children only.

css
/* Only direct children of main */
main > section {
    margin-bottom: 20px;
}
Multiple Classes
css
/* Element with both classes */
.card.important {
    border-color: red;
}
html
<div class="card important">Content</div>