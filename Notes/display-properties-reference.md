# 📘 Display Properties Reference

## Display Values

| Value | Behavior |
|-------|----------|
| `block` | Full width, starts new line, respects all box properties |
| `inline` | Flows with text, width/height ignored |
| `inline-block` | Flows inline, respects width/height |
| `none` | Removes element from layout (invisible, no space) |

---

## Block Elements

### Characteristics
- Starts on a new line
- Takes full width of parent by default
- Respects width, height, margin, padding
- Can contain block and inline elements

### Common Block Elements
`<div>`, `<p>`, `<h1>`-`<h6>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<nav>`, `<main>`, `<ul>`, `<ol>`, `<li>`, `<form>`

### CSS
```css
.block {
    display: block;
    width: 300px;
    margin: 10px auto;
    padding: 20px;
}
Visual
text
┌────────────────────────────────────────┐
│         Block Element                  │
│         (Full width)                   │
├────────────────────────────────────────┤
│         Block Element                  │
│         (Full width)                   │
└────────────────────────────────────────┘
Inline Elements
Characteristics
Does not start a new line

Width and height are ignored

Only left/right margins apply fully

Padding may overflow but doesn't push other elements

Can only contain inline elements or text

Common Inline Elements
<span>, <a>, <strong>, <em>, <img>, <br>

CSS
css
.inline {
    display: inline;
    width: 300px;    /* IGNORED */
    height: 100px;   /* IGNORED */
    margin: 10px;    /* Only left/right work fully */
}
Visual
text
Text continues... [Inline Element] ...text continues on same line
Inline-Block Elements
Characteristics
Flows inline (no line break)

Respects width and height

Respects all margins and padding

Elements sit next to each other horizontally

Common Use Cases
Navigation menus

Button groups

Gallery images

Cards in a row

CSS
css
.inline-block {
    display: inline-block;
    width: 200px;
    height: 150px;
    margin: 10px;
    vertical-align: top;
}
Visual
text
[Element 1] [Element 2] [Element 3]
  200px       200px       200px
(All on same line)
Comparison Table
Behavior	block	inline	inline-block
Starts new line	✅ Yes	❌ No	❌ No
Width/height respected	✅ Yes	❌ No	✅ Yes
Vertical margin respected	✅ Yes	⚠️ Partial	✅ Yes
Vertical padding respected	✅ Yes	⚠️ May overflow	✅ Yes
Default width	100%	Content width	Content width
Can contain block children	✅ Yes	❌ No	✅ Yes
Common Layout Patterns
Horizontal Navigation
css
nav {
    text-align: center;
    background: #333;
}

nav a {
    display: inline-block;
    padding: 15px 25px;
    color: white;
    text-decoration: none;
}

nav a:hover {
    background: #555;
}
Card Grid
css
.card-grid {
    font-size: 0;  /* Removes whitespace between inline-block elements */
    text-align: center;
}

.card {
    display: inline-block;
    width: 280px;
    margin: 15px;
    font-size: 16px;  /* Reset font size */
    vertical-align: top;
}
Button Group
css
.button-group {
    text-align: center;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    margin: 0 5px;
    background: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
}
Removing Inline-Block Whitespace
HTML whitespace creates gaps between inline-block elements.

Solutions
1. Remove whitespace in HTML:

html
<div class="parent">
    <span>Item 1</span><span>Item 2</span><span>Item 3</span>
</div>
2. Parent font-size hack:

css
.parent {
    font-size: 0;
}
.parent > * {
    font-size: 16px;
}
3. Negative margin (not recommended):

css
.child {
    margin-right: -4px;
}
Display: None
Removes element completely from layout. No space is reserved.

css
.hidden {
    display: none;
}
/* Element is invisible and takes no space */
Comparison with visibility: hidden
Property	Visible	Space Reserved
display: none	❌ No	❌ No
visibility: hidden	❌ No	✅ Yes