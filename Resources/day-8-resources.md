# 📚 Day 8 Resources - Advanced CSS Selectors & Pseudo-Classes

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: CSS Selectors | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors |
| MDN: Attribute Selectors | https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors |
| MDN: Pseudo-classes | https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes |
| MDN: Pseudo-elements | https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements |
| MDN: Specificity | https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity |
| W3Schools: CSS Selectors | https://www.w3schools.com/css/css_selectors.asp |
| CSS-Tricks: Pseudo-classes vs Pseudo-elements | https://css-tricks.com/pseudo-classes-vs-pseudo-elements/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Advanced CSS Selectors | https://youtu.be/7h5Q9P9rQ0I |
| CSS Attribute Selectors | https://youtu.be/9eSsePlISwY |
| CSS Pseudo-classes | https://youtu.be/KWY4gHxJjAc |
| CSS Pseudo-elements | https://youtu.be/2KzEaF5mO0I |
| CSS Specificity Explained | https://youtu.be/c0kfcP_nD9E |
| The :nth-child() Trick | https://youtu.be/2uYcT8QzA7s |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| CSS Selector Tester | Test selectors live | https://www.w3schools.com/cssref/trysel.asp |
| Specificity Calculator | Calculate selector scores | https://specificity.keegan.st |
| nth-child Tester | Visual nth-child calculator | https://css-tricks.com/examples/nth-child-tester/ |
| CSS Diner | Interactive selector game | https://flukeout.github.io |
| Selector Gadget | Chrome extension to identify selectors | https://selectorgadget.com |

## 📝 Selector Cheatsheet

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

### Pseudo-classes
| Category | Examples |
|----------|----------|
| Interactive | `:hover`, `:focus`, `:active` |
| Structural | `:first-child`, `:last-child`, `:nth-child()` |
| Type-based | `:first-of-type`, `:last-of-type` |
| Form | `:checked`, `:disabled`, `:required` |

### Pseudo-elements
| Element | Purpose |
|---------|---------|
| `::before` | Content before element |
| `::after` | Content after element |
| `::first-letter` | First letter |
| `::first-line` | First line |
| `::selection` | Selected text |
| `::placeholder` | Input placeholder |

## 📝 Specificity Cheatsheet

| Selector Type | Score | Example |
|---------------|-------|---------|
| Inline style | 1000 | `style="color: red;"` |
| ID | 100 | `#header` |
| Class | 10 | `.highlight` |
| Attribute | 10 | `[type="text"]` |
| Pseudo-class | 10 | `:hover` |
| Element | 1 | `p` |
| Pseudo-element | 1 | `::before` |

## ✅ nth-child Formulas

| Formula | Matches |
|---------|---------|
| `odd` | 1, 3, 5, 7... |
| `even` | 2, 4, 6, 8... |
| `3n` | 3, 6, 9, 12... |
| `3n+1` | 1, 4, 7, 10... |
| `n+3` | 3, 4, 5, 6... |
| `-n+3` | 1, 2, 3 |

## 🎮 Interactive Learning

| Game | Description | Link |
|------|-------------|------|
| CSS Diner | Learn selectors by selecting dinner plates | https://flukeout.github.io |
| CSS Selector Challenge | Practice selectors | https://codepip.com/games/selector-challenge/ |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| CSS Selectors Level 4 Spec | https://www.w3.org/TR/selectors-4/ |
| :has() Parent Selector | https://developer.mozilla.org/en-US/docs/Web/CSS/:has |
| :where() and :is() | https://developer.mozilla.org/en-US/docs/Web/CSS/:where |
| A Complete Guide to CSS Selectors | https://css-tricks.com/almanac/selectors/ |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `::before` not showing | Missing `content` property | Add `content: ""` or text |
| Selector not matching | Specificity too low | Increase specificity |
| `!important` needed | Cascade conflict | Restructure selectors |
| `:nth-child` not working | Wrong formula | Use `:nth-of-type` instead |
| Pseudo-element on image not working | Replaced element | Wrap in div and style that |

## 🔗 Related Resources

- [Day 4 Resources - CSS Basics](../day-4-resources.md)
- [Day 5 Resources - Box Model](../day-5-resources.md)
- [Day 6 Resources - Flexbox](../day-6-resources.md)
- [Day 7 Resources - CSS Grid](../day-7-resources.md)