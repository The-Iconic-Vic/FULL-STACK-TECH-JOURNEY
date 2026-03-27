# 📘 CSS Typography Reference

## Font Properties

### font-family
Defines the typeface.

```css
body {
    font-family: "Helvetica Neue", Arial, sans-serif;
}

h1 {
    font-family: Georgia, "Times New Roman", serif;
}

code {
    font-family: "Courier New", monospace;
}
Generic Families:

Family	Description
serif	Traditional with decorative strokes
sans-serif	Clean without strokes
monospace	Fixed-width for code
cursive	Handwriting-style
fantasy	Decorative
font-size
Controls text size.

css
body {
    font-size: 16px;    /* Pixels - absolute */
}

h1 {
    font-size: 2rem;    /* Rem - relative to root */
}

small {
    font-size: 0.875em; /* Em - relative to parent */
}
Unit	Description
px	Pixels (absolute)
rem	Relative to root (<html>) font size
em	Relative to parent font size
%	Percentage of parent size
font-weight
Controls boldness.

css
font-weight: normal;    /* 400 */
font-weight: bold;      /* 700 */
font-weight: 100;       /* Thin */
font-weight: 300;       /* Light */
font-weight: 400;       /* Normal */
font-weight: 500;       /* Medium */
font-weight: 600;       /* Semi-bold */
font-weight: 700;       /* Bold */
font-weight: 900;       /* Black */
font-style
Controls italic.

css
font-style: normal;
font-style: italic;
font-style: oblique;
Text Properties
text-align
Horizontal alignment.

css
text-align: left;     /* Default */
text-align: right;
text-align: center;
text-align: justify;  /* Stretches to full width */
text-decoration
Adds decorative lines.

css
text-decoration: none;           /* Removes underline */
text-decoration: underline;
text-decoration: overline;
text-decoration: line-through;
text-decoration: underline wavy red; /* Combined */
text-transform
Changes case.

css
text-transform: none;      /* No change */
text-transform: uppercase; /* ALL CAPS */
text-transform: lowercase; /* all lowercase */
text-transform: capitalize; /* Each Word Capitalized */
line-height
Vertical spacing between lines.

css
line-height: normal;    /* Browser default (~1.2) */
line-height: 1.5;       /* Unitless - best practice */
line-height: 24px;      /* Fixed value */
line-height: 150%;      /* Percentage */
Best Practice: Use unitless values (multiplier of font size).

css
body {
    font-size: 16px;
    line-height: 1.5;  /* 24px line height */
}
letter-spacing
Space between characters.

css
letter-spacing: normal;
letter-spacing: 1px;
letter-spacing: 0.1em;
text-shadow
Adds shadow to text.

css
text-shadow: horizontal vertical blur color;

/* Examples */
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
text-shadow: 0 0 5px white;
text-shadow: 1px 1px 0 #000;
Typography Best Practices
Property	Recommended Value
Body font size	16px minimum
Line height	1.5 - 1.6 for body text
Line length	45-75 characters (use max-width)
Font family	System font stack for performance
System Font Stack:

css
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}