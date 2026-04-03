# 📚 Day 11 Resources - Responsive Design & Media Queries

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Responsive Design | https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design |
| MDN: Using Media Queries | https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries |
| MDN: Viewport Meta Tag | https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag |
| MDN: Responsive Images | https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images |
| MDN: clamp() | https://developer.mozilla.org/en-US/docs/Web/CSS/clamp |
| W3Schools: Responsive Design | https://www.w3schools.com/css/css_rwd_intro.asp |
| W3Schools: Media Queries | https://www.w3schools.com/css/css3_mediaqueries.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Responsive Design in 20 Minutes | https://youtu.be/srvUrASNj0s |
| CSS Media Queries Tutorial | https://youtu.be/2KL-z9A56SQ |
| Responsive Images Tutorial | https://youtu.be/4pdJx0A2V6c |
| Mobile-First Design | https://youtu.be/0ohtVzCSHqs |
| CSS clamp() Tutorial | https://youtu.be/U9VF-4euyRo |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Device emulation | Built into Chrome |
| Responsively App | Multi-device testing | https://responsively.app |
| BrowserStack | Cross-browser/device testing | https://browserstack.com |
| Am I Responsive | Visual responsive tester | https://amiresponsive.co |
| Viewport Resizer | Browser extension | https://chrome.google.com/webstore/detail/viewport-resizer |
| UI Playbook | Responsive patterns | https://uiplaybook.dev |

## 📝 Media Query Cheatsheet

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Common Breakpoints
Device	Breakpoint
Small Mobile	max-width: 480px
Mobile	max-width: 768px
Tablet	min-width: 768px and max-width: 1024px
Desktop	min-width: 1024px
Large Desktop	min-width: 1200px
Mobile-First Template
css
/* Mobile (default) */
.container { width: 100%; }

@media (min-width: 768px) {
    .container { max-width: 750px; }
}

@media (min-width: 1024px) {
    .container { max-width: 960px; }
}

@media (min-width: 1200px) {
    .container { max-width: 1140px; }
}
Media Features
Feature	Example
max-width	(max-width: 768px)
min-width	(min-width: 768px)
orientation	(orientation: portrait)
hover	(hover: hover)
pointer	(pointer: coarse)
📝 Responsive Image Cheatsheet
Basic Fluid Image
css
img {
    max-width: 100%;
    height: auto;
}
Picture Element
html
<picture>
    <source media="(min-width: 1024px)" srcset="large.jpg">
    <source media="(min-width: 768px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>
srcset
html
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px,
            (max-width: 1000px) 800px,
            1200px"
     alt="Description">
📝 Responsive Typography Cheatsheet
clamp() Function
css
/* Syntax: clamp(minimum, preferred, maximum) */
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
}

p {
    font-size: clamp(1rem, 1rem + 0.5vw, 1.25rem);
}

.container {
    padding: clamp(1rem, 5vw, 3rem);
}
Fluid Type Scale
css
:root {
    --step-0: clamp(1rem, 1rem + 0.5vw, 1.125rem);
    --step-1: clamp(1.2rem, 1.2rem + 0.6vw, 1.35rem);
    --step-2: clamp(1.44rem, 1.44rem + 0.7vw, 1.62rem);
    --step-3: clamp(1.73rem, 1.73rem + 0.8vw, 1.94rem);
}
✅ Responsive Testing Resources
Chrome DevTools Shortcuts
Action	Shortcut
Open DevTools	F12 or Ctrl+Shift+I
Toggle Device Mode	Ctrl+Shift+M
Rotate Device	Ctrl+Shift+M again
Select Device	Click device dropdown
Testing Checklist
Test on iPhone SE (375px)

Test on iPhone 12 (390px)

Test on iPad (768px)

Test on iPad Pro (1024px)

Test on Desktop (1440px+)

Test portrait AND landscape

Test with 200% zoom

Test touch interactions

🎨 Responsive Patterns Library
Stack to Row
css
.layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .layout {
        flex-direction: row;
    }
}
Responsive Grid
css
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
Hide on Mobile
css
.desktop-only {
    display: block;
}

.mobile-only {
    display: none;
}

@media (max-width: 768px) {
    .desktop-only {
        display: none;
    }
    
    .mobile-only {
        display: block;
    }
}
🐛 Common Issues & Solutions
Issue	Cause	Solution
Page doesn't zoom	Missing viewport	Add width=device-width, initial-scale=1.0
Horizontal scroll	Fixed width elements	Use max-width: 100%
Text too small	Fixed font sizes	Use clamp() or rem
Images overflowing	No max-width	Add max-width: 100%; height: auto;
Touch targets too small	Small buttons	Add min-height: 44px
Hover stuck on mobile	Touch devices	Use @media (hover: hover)
Font not scaling	Using px	Use rem or clamp()
📚 Further Reading
Topic	Link
Responsive Design Patterns	https://responsivedesign.is/patterns
Fluid Typography	https://modern-fluid-typography.vercel.app
CSS Media Queries Level 4	https://drafts.csswg.org/mediaqueries-4/
Container Queries	https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries
The Viewport Meta Tag	https://css-tricks.com/snippets/html/responsive-meta-tag/