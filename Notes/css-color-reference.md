# 📘 CSS Color Reference

## Named Colors
140 standard color names.

```css
color: red;
color: blue;
color: darkgreen;
color: steelblue;
background-color: lightgray;
border-color: gold;
Common Named Colors:

Name	Hex
black	#000000
white	#FFFFFF
red	#FF0000
green	#008000
blue	#0000FF
gray	#808080
yellow	#FFFF00
navy	#000080
teal	#008080
coral	#FF7F50
Hexadecimal (Hex)
Format: #RRGGBB

css
color: #000000;  /* Black */
color: #FFFFFF;  /* White */
color: #FF0000;  /* Red */
color: #00FF00;  /* Green */
color: #0000FF;  /* Blue */
color: #FFA500;  /* Orange */
color: #800080;  /* Purple */
color: #2c3e50;  /* Dark Blue-Gray */
color: #3498db;  /* Light Blue */
Shorthand Hex (when pairs repeat):

css
color: #000;  /* #000000 */
color: #FFF;  /* #FFFFFF */
color: #F00;  /* #FF0000 */
color: #0F0;  /* #00FF00 */
color: #00F;  /* #0000FF */
color: #FA0;  /* #FFAA00 */
RGB / RGBA
RGB Syntax: rgb(red, green, blue)
Values: 0-255

css
color: rgb(0, 0, 0);        /* Black */
color: rgb(255, 255, 255);  /* White */
color: rgb(255, 0, 0);      /* Red */
color: rgb(0, 255, 0);      /* Green */
color: rgb(0, 0, 255);      /* Blue */
color: rgb(255, 165, 0);    /* Orange */
color: rgb(44, 62, 80);     /* #2c3e50 */
RGBA Syntax: rgba(red, green, blue, alpha)
Alpha: 0 (transparent) to 1 (opaque)

css
color: rgba(0, 0, 0, 0.5);     /* 50% transparent black */
background-color: rgba(255, 0, 0, 0.2); /* Light transparent red */
border-color: rgba(0, 0, 255, 0.8); /* Mostly opaque blue */
HSL / HSLA
HSL Syntax: hsl(hue, saturation%, lightness%)

Hue: 0-360 (0=red, 120=green, 240=blue)

Saturation: 0% (gray) to 100% (full color)

Lightness: 0% (black), 50% (normal), 100% (white)

css
color: hsl(0, 100%, 50%);     /* Red */
color: hsl(120, 100%, 50%);   /* Green */
color: hsl(240, 100%, 50%);   /* Blue */
color: hsl(30, 80%, 55%);     /* Warm orange */
color: hsl(200, 50%, 90%);    /* Light blue-gray */
background-color: hsl(210, 100%, 50%); /* Bright blue */
HSLA Syntax: hsla(hue, saturation%, lightness%, alpha)

css
color: hsla(0, 100%, 50%, 0.5); /* 50% transparent red */
Gradient Colors
Linear Gradient
css
background: linear-gradient(direction, color1, color2);

/* Examples */
background: linear-gradient(to right, #2c3e50, #3498db);
background: linear-gradient(135deg, #667eea, #764ba2);
background: linear-gradient(0deg, red, blue);
background: linear-gradient(#ff0000, #ffff00, #00ff00);
Radial Gradient
css
background: radial-gradient(shape size, color1, color2);

/* Examples */
background: radial-gradient(circle, red, blue);
background: radial-gradient(#fff, #333);
Quick Reference
Format	Example	Best For
Named	red	Prototyping
Hex	#FF0000	Precision, common
RGB	rgb(255,0,0)	When opacity needed
HSL	hsl(0,100%,50%)	Intuitive adjustments
Gradient	linear-gradient()	Modern backgrounds