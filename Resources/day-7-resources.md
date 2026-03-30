# 📚 Day 7 Resources - CSS Grid & Capstone Project

## 🎮 Interactive Games

| Game | Description | Link |
|------|-------------|------|
| Grid Garden | Learn CSS Grid by watering carrots | https://cssgridgarden.com |
| Grid Critters | Paid game with deep Grid learning | https://gridcritters.com |

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: CSS Grid Layout | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout |
| MDN: Basic Concepts of Grid | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout |
| MDN: Grid Template Columns | https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns |
| W3Schools: CSS Grid | https://www.w3schools.com/css/css_grid.asp |
| CSS-Tricks: A Complete Guide to Grid | https://css-tricks.com/snippets/css/complete-guide-grid/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| CSS Grid Crash Course | https://youtu.be/0xMQfnTU6oo |
| CSS Grid in 20 Minutes | https://youtu.be/9zBsdzdE4sM |
| Learn CSS Grid in 25 Minutes | https://youtu.be/EFafSYg-PkI |
| Grid vs Flexbox Comparison | https://youtu.be/3elGSZSWTbM |
| Build a Portfolio with Grid & Flexbox | https://youtu.be/ldwlOzRvYOU |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Grid Generator | Visual CSS Grid builder | https://cssgrid-generator.netlify.app |
| Griddy | Interactive Grid playground | https://griddy.io |
| Layoutit Grid | Interactive Grid builder | https://grid.layoutit.com |
| CSS Grid Cheatsheet | Printable reference | https://grid.malven.co |

## 📝 Grid Properties Cheatsheet

### Container Properties
| Property | Values | Default |
|----------|--------|---------|
| `display` | `grid` | - |
| `grid-template-columns` | lengths, `fr`, `repeat()`, `minmax()` | `none` |
| `grid-template-rows` | lengths, `fr`, `repeat()`, `minmax()` | `none` |
| `grid-template-areas` | string | `none` |
| `gap` | length | `0` |
| `justify-items` | `start`, `end`, `center`, `stretch` | `stretch` |
| `align-items` | `start`, `end`, `center`, `stretch` | `stretch` |
| `justify-content` | `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly` | `start` |
| `align-content` | `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly` | `start` |

### Item Properties
| Property | Values | Default |
|----------|--------|---------|
| `grid-column` | `start / end`, `span n` | `auto` |
| `grid-row` | `start / end`, `span n` | `auto` |
| `grid-area` | `row-start / col-start / row-end / col-end` | `auto` |
| `justify-self` | `start`, `end`, `center`, `stretch` | `stretch` |
| `align-self` | `start`, `end`, `center`, `stretch` | `stretch` |

## 📝 Responsive Grid Patterns

### Auto-Fit Card Grid
```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}
12-Column Layout
css
.grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.span-4 {
    grid-column: span 4;
}
Holy Grail Layout
css
.page {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main sidebar"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
🎨 Portfolio Project Resources
Resource	Purpose	Link
Unsplash	Free stock photos	https://unsplash.com
Pexels	Free stock photos	https://pexels.com
Random User API	Placeholder profile images	https://randomuser.me
Picsum	Placeholder images	https://picsum.photos
Font Awesome	Icons	https://fontawesome.com
Google Fonts	Web fonts	https://fonts.google.com
✅ Portfolio Checklist
HTML Structure
Semantic HTML5 elements (<header>, <nav>, <main>, <section>, <footer>)

Navigation menu with links to all sections

Hero section with name and intro

About section with image and text

Skills section with cards

Projects gallery with grid

Contact section with links

Footer with copyright

CSS Styling
Universal box-sizing: border-box

Responsive navigation (mobile hamburger)

Flexbox for navigation and skills

CSS Grid for projects gallery

Media queries for breakpoints

Hover effects on buttons and cards

Consistent color scheme

Readable typography

Responsive Breakpoints
Desktop (> 1024px): 3 columns for projects

Tablet (768px - 1024px): 2 columns for projects

Mobile (< 768px): 1 column, stacked navigation

🐛 Common Grid Issues & Solutions
Issue	Cause	Solution
Items not aligning	Wrong alignment property	Use justify-items or align-items
Gaps not appearing	Missing gap property	Add gap: 1rem
Items overflowing	No responsive sizing	Use minmax() and auto-fit
Grid not wrapping	Fixed column widths	Use auto-fit with minmax()
Items overlapping	Wrong grid placement	Check grid-column and grid-row values
📚 Further Reading
Topic	Link
Grid by Example	https://gridbyexample.com
CSS Grid Layout Module Level 1 (Spec)	https://www.w3.org/TR/css-grid-1/
Subgrid (Modern Grid Feature)	https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid
CSS Grid Inspector (Firefox)	https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_grid_layouts/
