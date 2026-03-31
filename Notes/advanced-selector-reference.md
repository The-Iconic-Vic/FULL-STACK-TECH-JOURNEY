# 📘 Advanced Selectors Reference

## Attribute Selectors

Target elements based on their attributes and values.

| Selector | Description | Example | Matches |
|----------|-------------|---------|---------|
| `[attr]` | Has attribute | `[disabled]` | All disabled elements |
| `[attr="value"]` | Exact match | `[type="text"]` | Text inputs |
| `[attr^="value"]` | Starts with | `[class^="btn-"]` | Classes starting with "btn-" |
| `[attr$="value"]` | Ends with | `[href$=".pdf"]` | PDF links |
| `[attr*="value"]` | Contains | `[href*="github"]` | GitHub links |
| `[attr~="value"]` | Contains word | `[class~="active"]` | Elements with "active" class |
| `[attr|="value"]` | Starts with value- | `[lang|="en"]` | en, en-US, en-GB |

```css
/* Input type text */
input[type="text"] {
    border: 1px solid #ccc;
    padding: 8px;
}

/* Input type email */
input[type="email"] {
    border: 1px solid #ccc;
    padding: 8px;
}

/* All disabled inputs */
input[disabled] {
    background: #f0f0f0;
    opacity: 0.6;
}

/* Links that end with .pdf */
a[href$=".pdf"]::after {
    content: " 📄";
}

/* Links that start with https */
a[href^="https"]::before {
    content: "🔒 ";
}

/* Classes that start with btn- */
[class^="btn-"] {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 6px;
}

/* Links containing "github" */
a[href*="github"] {
    background: #24292e;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
}
Combinators
Define relationships between selectors.

Combinator	Symbol	Description	Example
Descendant	space	Any descendant	div p
Child	>	Direct child	ul > li
Adjacent sibling	+	Immediately after	h1 + p
General sibling	~	Any after	h2 ~ p
css
/* Descendant: all paragraphs inside article */
article p {
    line-height: 1.6;
}

/* Child: direct li children of ul only (not nested lists) */
ul > li {
    list-style: none;
    padding: 4px 0;
}

/* Adjacent sibling: paragraph immediately after h1 */
h1 + p {
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
}

/* General sibling: all paragraphs after h2 */
h2 ~ p {
    margin-left: 1rem;
    border-left: 3px solid #ddd;
    padding-left: 1rem;
}

/* Complex example: links inside nav that are direct children */
nav > ul > li > a {
    text-decoration: none;
    color: white;
}
Combining Selectors
css
/* Selector combinations */

/* Input with class error and type text */
input[type="text"].error {
    border-color: red;
}

/* Links inside footer that end with .pdf */
footer a[href$=".pdf"] {
    font-size: 0.875rem;
}

/* First paragraph after h2 inside article */
article h2 + p {
    font-weight: bold;
}

/* Active nav links with hover */
.nav-link.active:hover {
    background: #0056b3;
}

/* All children of .card except the first */
.card > *:not(:first-child) {
    margin-top: 1rem;
}
Practical Examples
Form Styling
css
/* All text inputs */
input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Required fields */
input[required] {
    border-left: 3px solid red;
}

/* Disabled fields */
input[disabled] {
    background: #f5f5f5;
    cursor: not-allowed;
}
Link Styling
css
/* External links */
a[href^="http"]:not([href*="mysite.com"])::after {
    content: " ↗";
}

/* Download links */
a[download]::before {
    content: "⬇️ ";
}

/* Email links */
a[href^="mailto"]::before {
    content: "📧 ";
}
Card Grid
css
/* Cards grid with spacing */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* First card in each row gets special styling */
.card:first-child {
    border-left: 4px solid blue;
}

/* Every 3rd card margin adjustment */
.card:nth-child(3n) {
    margin-right: 0;
}