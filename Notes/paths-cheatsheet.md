# 📘 Paths Cheatsheet

## Path Types

| Type | Example | Description |
|------|---------|-------------|
| Document-relative | `images/photo.jpg` | From current file location |
| Parent directory | `../images/photo.jpg` | One level up |
| Root-relative | `/images/photo.jpg` | From website root |
| Absolute | `https://example.com/image.jpg` | Full URL |

## Path Symbols

| Symbol | Meaning |
|--------|---------|
| `./` or nothing | Current folder |
| `../` | Parent folder (one level up) |
| `../../` | Two levels up |
| `/` | Root directory |

## Examples

### Same Folder
index.html
about.html

text
```html
<a href="about.html">About</a>
Subfolder
text
index.html
images/
  └── logo.png
html
<img src="images/logo.png">
Parent Folder
text
projects/
  └── blog/
      └── post.html
index.html
html
<!-- From post.html -->
<a href="../../index.html">Home</a>
Root-Relative
text
/ (root)
├── index.html
├── css/
│   └── style.css
└── images/
    └── logo.png
html
<!-- Works from any page -->
<link href="/css/style.css">
<img src="/images/logo.png">
Common Mistakes
Mistake	Fix
src="images/photo.jpg" from subfolder	Use ../images/photo.jpg
Case mismatch: Image.jpg vs image.jpg	Use consistent lowercase
Missing leading slash for root-relative	Start with /
Spaces in filenames	Use hyphens: my-file.jpg
Folder Structure Best Practices
text
project/
├── index.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── icons/
│   ├── gallery/
│   └── backgrounds/
└── pages/
    └── subpage.html