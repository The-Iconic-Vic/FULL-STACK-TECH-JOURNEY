# 📚 Day 5 Resources - Box Model & Layout Basics

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Box Model | https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model |
| MDN: Box-Sizing | https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing |
| MDN: Display | https://developer.mozilla.org/en-US/docs/Web/CSS/display |
| MDN: CSS Units | https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units |
| MDN: Margin Collapse | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing |
| W3Schools: Box Model | https://www.w3schools.com/css/css_boxmodel.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| CSS Box Model Explained | https://youtu.be/rIO5326FgPE |
| Box-Sizing: Border-Box | https://youtu.be/W5aEehtL2Ck |
| Display: Block, Inline, Inline-Block | https://youtu.be/x_i2gga-sYg |
| CSS Units (rem, em, px, vh, vw) | https://youtu.be/N5wpD9Ov_To |
| Margin Collapse | https://youtu.be/VHDA-qC2Y30 |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Inspect box model live | Built into Chrome |
| CSS Box Model Visualizer | Interactive learning | https://www.w3schools.com/css/css_boxmodel.asp |
| PX to REM Converter | Convert units | https://nekocalc.com/px-to-rem-converter |
| CSS Specificity Calculator | Calculate selector scores | https://specificity.keegan.st |

## 🎨 Chrome DevTools Box Model

### How to Use
1. Right-click element → Inspect
2. Select element in Elements panel
3. In Styles tab, scroll to bottom
4. View interactive box model diagram
5. Click values to edit live

### Shortcuts
| Action | Shortcut |
|--------|----------|
| Open DevTools | `F12` or `Ctrl+Shift+I` |
| Inspect element | `Ctrl+Shift+C` |
| Select element | Click in Elements panel |

## 📝 Box Model Cheat Sheet

| Layer | Properties | Shorthand |
|-------|------------|-----------|
| Content | `width`, `height` | - |
| Padding | `padding-top`, `padding-right`, `padding-bottom`, `padding-left` | `padding: top right bottom left` |
| Border | `border-width`, `border-style`, `border-color` | `border: width style color` |
| Margin | `margin-top`, `margin-right`, `margin-bottom`, `margin-left` | `margin: top right bottom left` |

## 📝 Display Cheat Sheet

| Value | New Line | Width/Height | Default Width |
|-------|----------|--------------|---------------|
| `block` | ✅ Yes | ✅ Yes | 100% |
| `inline` | ❌ No | ❌ No | Content |
| `inline-block` | ❌ No | ✅ Yes | Content |

## 📝 Units Cheat Sheet

| Unit | Relative To | Example |
|------|-------------|---------|
| `px` | Screen pixels | `16px` |
| `%` | Parent | `50%` |
| `em` | Parent font | `1.5em` |
| `rem` | Root font | `1.25rem` |
| `vw` | Viewport width | `100vw` |
| `vh` | Viewport height | `100vh` |
| `vmin` | Smaller dimension | `50vmin` |
| `vmax` | Larger dimension | `50vmax` |

## ✅ Common Patterns Code Snippets

### Universal Border-Box Reset
```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

### Center Block Element
```css
.center {
    width: 300px;
    margin: 0 auto;
}
```

### Inline-Block Navigation
```css
nav {
    text-align: center;
}
nav a {
    display: inline-block;
    padding: 10px 20px;
}
```

### Full-Height Section
```css
.section {
    min-height: 100vh;
    display: flex;
    align-items: center;
}
```

### Responsive Container
```css
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Element wider than expected | Using `content-box` | Apply `box-sizing: border-box` |
| Gap between inline-block elements | HTML whitespace | Use `font-size: 0` on parent |
| Margin not working on inline | Inline elements ignore vertical margin | Use `inline-block` or `block` |
| Two margins adding together | Margin collapse | Understand collapse behavior |
| Image has extra space below | Image is inline by default | Use `display: block` on image |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| CSS Box Model Explained | https://css-tricks.com/almanac/properties/b/box-sizing/ |
| Margin Collapse | https://css-tricks.com/almanac/properties/m/margin/ |
| CSS Units Explained | https://css-tricks.com/css-length-units/ |
| A Complete Guide to Display | https://css-tricks.com/almanac/properties/d/display/ |
```