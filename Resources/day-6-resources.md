# 📚 Day 6 Resources - Flexbox

## 🎮 Interactive Games

| Game | Description | Link |
|------|-------------|------|
| Flexbox Froggy | Learn Flexbox by moving frogs to lily pads | https://flexboxfroggy.com |
| Flexbox Defense | Tower defense game teaching Flexbox | http://www.flexboxdefense.com |
| Flexbox Zombies | Story-driven Flexbox learning game | https://mastery.games/p/flexbox-zombies |

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Flexbox | https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox |
| MDN: Basic Concepts of Flexbox | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox |
| MDN: flex (shorthand) | https://developer.mozilla.org/en-US/docs/Web/CSS/flex |
| W3Schools: Flexbox | https://www.w3schools.com/css/css3_flexbox.asp |
| CSS-Tricks: A Complete Guide to Flexbox | https://css-tricks.com/snippets/css/a-guide-to-flexbox/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Flexbox in 20 Minutes | https://youtu.be/JJSoEo8JSnc |
| Flexbox CSS Full Tutorial | https://youtu.be/3YW65K6LcIA |
| Flexbox Crash Course | https://youtu.be/3eR3B9yOaE8 |
| CSS Flexbox Tutorial for Beginners | https://youtu.be/u044iM9xsWc |
| Flexbox Visual Guide | https://youtu.be/fYq5PXgSsbE |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Flexbox Playground | Visualize Flexbox properties live | https://flexbox.tech |
| Flexy Boxes | Interactive Flexbox demo | https://the-echoplex.net/flexyboxes |
| CSS Flexbox Generator | Generate Flexbox code visually | https://css-generators.com/flexbox-generator/ |
| Flexbox Cheatsheet | Printable reference | https://jonibologna.com/flexbox-cheatsheet/ |

## 📝 Flexbox Container Properties Cheatsheet

| Property | Values | Default |
|----------|--------|---------|
| `display` | `flex` | - |
| `flex-direction` | `row`, `column`, `row-reverse`, `column-reverse` | `row` |
| `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` | `flex-start` |
| `align-items` | `stretch`, `flex-start`, `flex-end`, `center`, `baseline` | `stretch` |
| `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` | `nowrap` |
| `gap` | length | `0` |

## 📝 Flexbox Item Properties Cheatsheet

| Property | Values | Default |
|----------|--------|---------|
| `flex-grow` | number | `0` |
| `flex-shrink` | number | `1` |
| `flex-basis` | length, `auto`, `0` | `auto` |
| `flex` | `grow shrink basis` | `0 1 auto` |
| `align-self` | `auto`, `stretch`, `flex-start`, `flex-end`, `center`, `baseline` | `auto` |
| `order` | number | `0` |

## ✅ Common Flex Patterns Code Snippets

### Perfect Centering
```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
Space Between Navigation
css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
Equal Width Columns
css
.container {
    display: flex;
    gap: 20px;
}
.column {
    flex: 1;
}
Responsive Card Grid
css
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card {
    flex: 1 1 300px;
}
Sticky Footer
css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
main {
    flex: 1;
}
Media Object
css
.media {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}
.media-image {
    flex-shrink: 0;
    width: 80px;
}
.media-content {
    flex: 1;
}
🐛 Common Flexbox Issues & Solutions
Issue	Cause	Solution
Items overflowing	No wrapping set	Add flex-wrap: wrap
Items not growing	flex-grow: 0 default	Set flex: 1 or flex-grow: 1
Gaps not working	Using margin instead of gap	Use gap property
Vertical centering not working	Wrong axis	Use align-items: center (cross axis)
Items not centering horizontally	Wrong property	Use justify-content: center (main axis)
Item shrinking unexpectedly	flex-shrink: 1 default	Set flex-shrink: 0 on items that shouldn't shrink
📚 Further Reading
Topic	Link
Flexbox Layout Guide	https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout
Flexbox Froggy Solutions	https://flexboxfroggy.com/#solutions
CSS Flexbox Layout Examples	https://flexbox-examples.com
Flexbox vs Grid	https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/
🎯 Practice Exercises
Exercise	Description
Navigation Bar	Create a responsive navigation with logo, links, and buttons
Card Grid	Build a responsive card grid that adjusts columns by screen size
Pricing Table	Create a pricing table with equal height cards
Dashboard Layout	Build a dashboard with sidebar and main content
Comment Section	Create a comment section with avatar and text using media object pattern
🔗 Related Resources
Day 4 Resources - CSS Basics

Day 5 Resources - Box Model