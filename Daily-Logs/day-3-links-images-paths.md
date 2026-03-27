# 📅 Day 3: Links, Images, and Paths

**Date:** March 25, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Anchor Tags, Images, File Paths, File Structure

---

## 📋 Learning Objectives

- ✅ Create links to external sites, internal pages, email addresses, and phone numbers
- ✅ Understand absolute vs. relative paths and when to use each
- ✅ Link to specific sections within a page using fragment identifiers
- ✅ Embed images with proper `src` and `alt` attributes
- ✅ Understand different image formats (JPG, PNG, GIF, SVG, WebP)
- ✅ Organize projects with proper file structure

---

## 🌐 Part 1: Working with Links

### The Anchor Tag: `<a>`

```html
<a href="destination.html">Clickable text</a>
Types of Links
1. Absolute URLs (External)

html
<a href="https://www.example.com">Visit Example Website</a>
2. Relative URLs (Internal)

html
<a href="about.html">About Us</a>
<a href="blog/post.html">Read Blog Post</a>
<a href="../index.html">Home</a>
3. Email Links

html
<a href="mailto:contact@example.com">Send Email</a>
<a href="mailto:contact@example.com?subject=Inquiry&body=Hello">Email with Subject</a>
4. Phone Links

html
<a href="tel:+1234567890">Call Us</a>
5. Download Links

html
<a href="documents/resume.pdf" download>Download Resume</a>
Opening in New Tab
html
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
  Open in New Tab
</a>
Fragment Identifiers (Links to Sections)
html
<!-- Target element -->
<h2 id="services">Our Services</h2>

<!-- Link to target -->
<a href="#services">Jump to Services</a>
<a href="about.html#team">Meet Our Team</a>

<!-- Back to top -->
<a href="#top">Back to Top</a>


🖼️ Part 2: Images
The <img> Tag
html
<img src="image.jpg" alt="Description of image">
Image Formats
Format	Best For
JPEG/JPG	Photographs
PNG	Logos, transparency
GIF	Simple animations
SVG	Icons, illustrations (scalable)
WebP	Modern sites (better compression)
Width and Height
html
<img src="photo.jpg" alt="Mountain" width="800" height="600" style="max-width:100%; height:auto;">
Figure with Caption
html
<figure>
  <img src="sunset.jpg" alt="Sunset over ocean">
  <figcaption>Sunset at Malibu Beach</figcaption>
</figure>
Responsive Images with srcset
html
<img src="image-small.jpg" 
     srcset="image-small.jpg 480w,
             image-medium.jpg 800w,
             image-large.jpg 1200w"
     sizes="(max-width: 600px) 480px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Responsive image">
The <picture> Element
html
<picture>
  <source media="(min-width: 800px)" srcset="image-large.jpg">
  <source media="(min-width: 400px)" srcset="image-medium.jpg">
  <img src="image-small.jpg" alt="Art-directed image">
</picture>

📁 Part 3: File Paths
Path Types
Type	Example	Use When
Document-relative	images/photo.jpg	Current file location
Parent directory	../images/photo.jpg	One level up
Root-relative	/images/photo.jpg	From any page
Absolute	https://example.com/image.jpg	External resources
Path Symbols
Symbol	Meaning
./ or nothing	Current folder
../	Parent folder (one level up)
../../	Two levels up
Standard File Structure
text
my-website/
├── index.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logo.png
│   └── gallery/
│       └── photo.jpg
└── pages/
    └── blog/
        └── post.html

✅ Day 3 Checklist
Create absolute and relative links

Use target="_blank" with rel="noopener noreferrer"

Link to sections with fragment identifiers (#id)

Embed images with src and alt

Understand image formats

Set width and height attributes

Organize files with proper structure

Navigate with document-relative paths (./, ../)

Build Photo Gallery mini-project

Build Favorite Places mini-project

Push code to GitHub