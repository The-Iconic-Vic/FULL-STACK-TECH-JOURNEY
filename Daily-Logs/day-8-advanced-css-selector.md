# 📅 Day 8: Advanced CSS Selectors & Pseudo-Classes

**Date:** March 31, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Advanced Selectors, Pseudo-Classes, Pseudo-Elements, Specificity

---

## 📋 Learning Objectives

- ✅ Master attribute selectors for targeting elements by attributes
- ✅ Use combinators to select elements based on relationships
- ✅ Apply pseudo-classes for interactive states and structural targeting
- ✅ Create decorative content with `::before` and `::after`
- ✅ Understand CSS specificity and cascade
- ✅ Know when and why to avoid `!important`

---

## 🎯 Part 1: Advanced Selectors

### Attribute Selectors

Attribute selectors target elements based on their attributes and values.

| Selector | Description | Example |
|----------|-------------|---------|
| `[attr]` | Element with attribute | `[disabled]` |
| `[attr="value"]` | Exact match | `[type="text"]` |
| `[attr^="value"]` | Starts with | `[class^="btn-"]` |
| `[attr$="value"]` | Ends with | `[href$=".pdf"]` |
| `[attr*="value"]` | Contains | `[href*="github"]` |
| `[attr~="value"]` | Contains word | `[class~="active"]` |

```css
/* Input type text */
input[type="text"] {
    border: 1px solid #ccc;
}

/* Links that end with .pdf */
a[href$=".pdf"]::after {
    content: " 📄";
}

/* Classes that start with btn- */
[class^="btn-"] {
    display: inline-block;
    padding: 10px 20px;
}

/* Links containing "github" */
a[href*="github"] {
    background: #24292e;
    color: white;
}
```

---

### Combinators

Combinators define relationships between selectors.

| Combinator | Symbol | Description | Example |
|------------|--------|-------------|---------|
| Descendant | space | Any descendant | `div p` |
| Child | `>` | Direct child | `ul > li` |
| Adjacent sibling | `+` | Immediately after | `h1 + p` |
| General sibling | `~` | Any after | `h2 ~ p` |

```css
/* Descendant: all paragraphs inside article */
article p {
    line-height: 1.6;
}

/* Child: direct li children of ul only */
ul > li {
    list-style: none;
}

/* Adjacent sibling: paragraph immediately after h1 */
h1 + p {
    font-size: 1.2rem;
    font-weight: bold;
}

/* General sibling: all paragraphs after h2 */
h2 ~ p {
    margin-left: 1rem;
}
```

---

### Pseudo-Classes

Pseudo-classes target elements based on state or position.

#### Interactive Pseudo-Classes

| Pseudo-Class | Description |
|--------------|-------------|
| `:hover` | Mouse over element |
| `:focus` | Element has focus (keyboard or click) |
| `:active` | Element being clicked |
| `:visited` | Link has been visited |
| `:link` | Unvisited link |

```css
a:hover {
    color: blue;
    text-decoration: underline;
}

input:focus {
    outline: 2px solid #007bff;
    border-color: #007bff;
}

button:active {
    transform: scale(0.98);
}
```

#### Structural Pseudo-Classes

| Pseudo-Class | Description |
|--------------|-------------|
| `:first-child` | First child of parent |
| `:last-child` | Last child of parent |
| `:first-of-type` | First of its type within parent |
| `:last-of-type` | Last of its type within parent |
| `:nth-child(n)` | Nth child |
| `:nth-of-type(n)` | Nth of its type |
| `:only-child` | Only child of parent |
| `:empty` | Element with no children |

```css
/* First paragraph in any section */
p:first-of-type {
    font-size: 1.1rem;
}

/* Alternating table rows */
tr:nth-child(odd) {
    background: #f8f9fa;
}

tr:nth-child(even) {
    background: white;
}

/* Every third card */
.card:nth-child(3n) {
    margin-right: 0;
}

/* Last list item */
li:last-child {
    border-bottom: none;
}
```

#### `:nth-child()` Formulas

| Formula | Description |
|---------|-------------|
| `odd` | Every odd child (1, 3, 5...) |
| `even` | Every even child (2, 4, 6...) |
| `3n` | Every 3rd child (3, 6, 9...) |
| `3n+1` | 1st, 4th, 7th... |
| `n+3` | All children starting from 3rd |
| `-n+3` | First 3 children |

```css
/* First 3 items */
.item:nth-child(-n+3) {
    font-weight: bold;
}

/* Every 4th item starting from 2nd */
.item:nth-child(4n+2) {
    background: yellow;
}
```

---

## 🎨 Part 2: Pseudo-Elements

Pseudo-elements style specific parts of an element. They use double colon `::`.

### `::before` and `::after`

Create pseudo-elements inside an element. They require `content` property.

```css
/* Add icon before links */
a.external::before {
    content: "🔗 ";
}

/* Add arrow after read more links */
.read-more::after {
    content: " →";
    transition: transform 0.3s;
}

.read-more:hover::after {
    transform: translateX(5px);
}

/* Quote marks */
blockquote::before {
    content: "“";
    font-size: 3rem;
}

blockquote::after {
    content: "”";
    font-size: 3rem;
}
```

### `::first-letter`

Styles the first letter of a block-level element.

```css
/* Drop cap */
p::first-letter {
    font-size: 3rem;
    font-weight: bold;
    float: left;
    padding-right: 0.5rem;
    color: #007bff;
}
```

### `::first-line`

Styles the first line of text.

```css
p::first-line {
    font-weight: bold;
    letter-spacing: 1px;
}
```

### `::selection`

Styles text selected by the user.

```css
::selection {
    background-color: #007bff;
    color: white;
}
```

---

## ⚖️ Part 3: Specificity & Cascade

### Specificity Hierarchy

CSS specificity determines which rule applies when multiple rules target the same element.

| Selector Type | Example | Score |
|---------------|---------|-------|
| Inline style | `style="color: red;"` | 1000 |
| ID selector | `#header` | 100 |
| Class selector | `.highlight` | 10 |
| Attribute selector | `[type="text"]` | 10 |
| Pseudo-class | `:hover` | 10 |
| Element selector | `p` | 1 |
| Pseudo-element | `::before` | 1 |

### How to Calculate

```css
/* Specificity: 1 */
p { color: black; }

/* Specificity: 10 */
.highlight { color: blue; }

/* Specificity: 11 (element + class) */
p.highlight { color: green; }

/* Specificity: 100 */
#special { color: red; }

/* Specificity: 101 (ID + element) */
#special p { color: purple; }

/* Specificity: 111 (ID + class + element) */
#special .highlight p { color: orange; }
```

### The Cascade Order

When specificity is equal, the last rule wins:

```css
/* Last rule wins */
p { color: blue; }
p { color: red; }  /* Applied */
```

### `!important` - Use Sparingly

`!important` overrides all specificity rules.

```css
p {
    color: blue !important; /* Overrides everything */
}
```

**When to avoid:**
- It breaks the natural cascade
- Makes debugging difficult
- Hard to override later

**When it might be acceptable:**
- Utility classes (`.hidden { display: none !important; }`)
- Third-party library overrides
- Print styles

---

## 📝 Quick Reference

### Attribute Selectors

| Selector | Matches |
|----------|---------|
| `[attr]` | Has attribute |
| `[attr="value"]` | Exact value |
| `[attr^="value"]` | Starts with |
| `[attr$="value"]` | Ends with |
| `[attr*="value"]` | Contains |
| `[attr~="value"]` | Contains word |

### Combinators

| Symbol | Relationship |
|--------|--------------|
| ` ` | Descendant |
| `>` | Child |
| `+` | Adjacent sibling |
| `~` | General sibling |

### Pseudo-Classes

| Category | Examples |
|----------|----------|
| Interactive | `:hover`, `:focus`, `:active`, `:visited` |
| Structural | `:first-child`, `:last-child`, `:nth-child()` |
| Type-based | `:first-of-type`, `:last-of-type`, `:nth-of-type()` |
| Form | `:checked`, `:disabled`, `:required` |

### Pseudo-Elements

| Element | Purpose |
|---------|---------|
| `::before` | Content before element |
| `::after` | Content after element |
| `::first-letter` | First letter |
| `::first-line` | First line |
| `::selection` | Selected text |

### Specificity Values

| Selector Type | Score |
|---------------|-------|
| Inline style | 1000 |
| ID | 100 |
| Class, attribute, pseudo-class | 10 |
| Element, pseudo-element | 1 |

---

## ✅ Day 8 Checklist

- [ ] Use attribute selectors (`[type="text"]`, `[class^="btn-"]`, `[href$=".pdf"]`)
- [ ] Apply combinators (descendant ` `, child `>`, sibling `+`, `~`)
- [ ] Use interactive pseudo-classes (`:hover`, `:focus`, `:active`)
- [ ] Use structural pseudo-classes (`:first-child`, `:last-child`, `:nth-child()`)
- [ ] Create decorative content with `::before` and `::after`
- [ ] Style first letter with `::first-letter`
- [ ] Customize selection with `::selection`
- [ ] Understand specificity hierarchy
- [ ] Avoid overusing `!important`
- [ ] Build Styled Article mini-project
- [ ] Build Blog Preview Card mini-project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Attribute selectors** let you target elements by their attributes
2. **Combinators** help select elements based on HTML structure
3. **Pseudo-classes** target states and positions (`:hover`, `:nth-child()`)
4. **Pseudo-elements** target parts of elements (`::before`, `::after`, `::first-letter`)
5. **Specificity** determines which CSS rule wins (ID > class > element)
6. **Avoid `!important`** unless absolutely necessary
7. **`::before` and `::after` require `content` property** to work
8. **`::first-letter`** creates drop caps for articles

