# 📘 Box Model Reference

## The Four Layers

| Layer | Description | CSS Properties |
|-------|-------------|----------------|
| **Content** | Actual content (text, images) | `width`, `height`, `min-width`, `max-width` |
| **Padding** | Space between content and border | `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left` |
| **Border** | Line around padding | `border`, `border-width`, `border-style`, `border-color`, `border-radius` |
| **Margin** | Space outside border | `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left` |

---

## Padding Shorthand

```css
/* All four sides */
padding: 20px;

/* Top/Bottom  Left/Right */
padding: 10px 20px;

/* Top  Right  Bottom  Left (clockwise) */
padding: 10px 15px 20px 25px;

/* Individual sides */
padding-top: 10px;
padding-right: 15px;
padding-bottom: 20px;
padding-left: 25px;
Border Shorthand
css
/* width style color */
border: 2px solid black;

/* Individual sides */
border-top: 1px dashed red;
border-right: 3px double blue;
border-bottom: 2px dotted green;
border-left: 4px solid orange;

/* Border Radius */
border-radius: 10px;        /* All corners */
border-radius: 10px 20px;   /* TL/BR, TR/BL */
border-radius: 50%;         /* Circle */
Border Styles
Value	Appearance
solid	Single solid line
dashed	Dashed line
dotted	Dotted line
double	Two parallel lines
groove	3D carved effect
ridge	3D raised effect
inset	3D inset effect
outset	3D outset effect
none	No border
Margin Shorthand
css
/* All four sides */
margin: 20px;

/* Top/Bottom  Left/Right */
margin: 10px 20px;

/* Top  Right  Bottom  Left (clockwise) */
margin: 10px 15px 20px 25px;

/* Center horizontally */
margin: 0 auto;

/* Individual sides */
margin-top: 10px;
margin-right: 15px;
margin-bottom: 20px;
margin-left: 25px;
Margin Collapse
When two vertical margins meet, they collapse into the larger margin.

css
.element1 {
    margin-bottom: 30px;
}
.element2 {
    margin-top: 20px;
}
/* Space between = 30px, not 50px */
Width & Height Calculations
Default (content-box)
text
Total Width = width + padding-left + padding-right + border-left + border-right
Total Height = height + padding-top + padding-bottom + border-top + border-bottom
border-box
text
Total Width = width (padding and border are inside)
Total Height = height (padding and border are inside)
Box-Sizing Values
Value	Behavior
content-box	Default. Width/height apply to content only
border-box	Width/height include padding and border
Universal Reset (Best Practice)
css
*,
*::before,
*::after {
    box-sizing: border-box;
}
Visual Reference
text
CONTENT-BOX
┌────────────────────────────────┐
│         MARGIN                 │
│  ┌──────────────────────────┐  │
│  │      BORDER              │  │
│  │  ┌──────────────────┐    │  │
│  │  │    PADDING       │    │  │
│  │  │  ┌────────────┐  │    │  │
│  │  │  │  CONTENT   │  │    │  │
│  │  │  │  width:    │  │    │  │
│  │  │  │  300px     │  │    │  │
│  │  │  └────────────┘  │    │  │
│  │  └──────────────────┘    │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
Total: 300 + padding + border + margin

BORDER-BOX
┌────────────────────────────────┐
│         MARGIN                 │
│  ┌──────────────────────────┐  │
│  │  ┌──────────────────┐    │  │
│  │  │    PADDING       │    │  │
│  │  │  ┌────────────┐  │    │  │
│  │  │  │  CONTENT   │  │    │  │
│  │  │  │  width:    │  │    │  │
│  │  │  │  256px     │  │    │  │
│  │  │  └────────────┘  │    │  │
│  │  └──────────────────┘    │  │
│  │      BORDER              │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
Total: 300 + margin (width includes padding + border)