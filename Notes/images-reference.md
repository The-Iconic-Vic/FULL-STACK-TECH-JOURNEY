# 📘 Images Reference Guide

## Image Tag

```html
<img src="image.jpg" alt="description">
Required Attributes
Attribute	Purpose
src	File path or URL
alt	Alternative text (accessibility)
Optional Attributes
Attribute	Example
width	width="800"
height	height="600"
title	title="Tooltip text"
loading	loading="lazy"
Image Formats
Format	Best For	Transparency	Animation
JPEG/JPG	Photos	No	No
PNG	Logos, graphics	Yes	No
GIF	Simple animations	No	Yes
SVG	Icons, illustrations	Yes	No
WebP	Modern web	Yes	Yes
Figure with Caption
html
<figure>
  <img src="image.jpg" alt="Description">
  <figcaption>Caption text</figcaption>
</figure>
Responsive Images
srcset
html
<img src="small.jpg"
     srcset="small.jpg 480w,
             medium.jpg 800w,
             large.jpg 1200w"
     sizes="(max-width: 600px) 480px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Description">
picture
html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description">
</picture>

Best Practices
Always include alt text

Set width and height to prevent layout shift

Use max-width:100%; height:auto for responsive sizing

Choose correct format for the use case

Compress images for web