# Styled Article - Day 8 Project

## Project Overview
A styled article demonstrating advanced CSS selectors, pseudo-classes, and pseudo-elements.

## Skills Practiced
- Attribute selectors
- Combinators (descendant, child)
- Pseudo-classes (`:hover`, `:focus`, `:first-child`, `:nth-child()`)
- Pseudo-elements (`::first-letter`, `::first-line`, `::before`, `::after`, `::selection`)

## File Structure
day-8-styled-article/
├── index.html
├── style.css
└── README.md

text

## Advanced Selectors Used

| Selector | Purpose |
|----------|---------|
| `::first-letter` | Larger first letter of first paragraph |
| `::first-line` | Styles first line of first paragraph |
| `:hover` | Link and row hover effects |
| `:focus` | Focus state for accessibility |
| `:nth-child(odd)` | Alternating table row backgrounds |
| `:nth-child(even)` | Alternating table row backgrounds |
| `::before` | Arrow icon on back link |
| `::after` | Arrow icon on share link |
| `::selection` | Custom text highlight color |
| `:first-of-type` | Styles first section |
| `:last-of-type` | Styles last section |
| `:first-child` | Styles first list item |
| `:last-child` | Styles last list item |

## Key Features
- Drop cap (enlarged first letter) using `::first-letter`
- Alternating table row backgrounds with `:nth-child()`
- Hover effects on links and table rows
- Decorative arrows on links using `::before` and `::after`
- Custom text selection highlight
- Responsive design for mobile