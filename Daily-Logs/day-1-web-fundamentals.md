# 🌐 Day 1: Web Fundamentals - Complete Guide

**Date:** March 24, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** How the Web Works, Development Environment, HTML Basics

---

## 📋 Learning Objectives

By the end of this guide, you will understand:
- ✅ How the internet and web work (clients, servers, HTTP)
- ✅ What HTML, CSS, and JavaScript do
- ✅ How to set up a professional development environment
- ✅ HTML document structure and basic tags
- ✅ How to create your first webpage

---

## 🌍 Part 1: How the Web Works

### What Happens When You Visit a Website?
┌─────────┐ Request ┌─────────┐
│ Client │ ────────────► │ Server │
│ (Browser│ │ (Hosts │
│ - You) │ ◄──────────── │ Website)│
└─────────┘ Response └─────────┘

You type "google.com" in browser

Browser finds Google's server (via DNS)

Browser sends HTTP request: "Send me the page!"

Server responds with HTML/CSS/JS files

Browser renders the page

text

### Key Concepts Explained

| Concept | What It Is | Example |
|---------|------------|---------|
| **Client** | Your device/browser that REQUESTs information | Chrome, Safari, Firefox |
| **Server** | A computer that RESPONDs with files | Where websites "live" |
| **HTTP** | HyperText Transfer Protocol (language computers use to talk) | `GET /index.html` |
| **DNS** | Domain Name System (translates google.com to IP addresses) | Like a phonebook for the internet |

### 🧩 The Three Pillars of Web Development

| Technology | Role | Analogy | Code Example |
|------------|------|---------|--------------|
| **HTML** | Structure | The skeleton/frame of a house | `<button>Click</button>` |
| **CSS** | Style | Paint, furniture, decoration | `button { color: blue; }` |
| **JavaScript** | Behavior | Electricity, garage doors, interactivity | `button.onclick = () => alert("Hi!")` |

### 📺 Watch This to Solidify Understanding
> **Recommended:** [How the Internet Works - freeCodeCamp](https://youtu.be/7_LPdttKXPc) (10 minutes)

---

## 🛠️ Part 2: Setting Up Your Development Environment

### Step 1: Install VS Code
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download the version for your OS (Windows/Mac/Linux)
3. Install with default settings

### Step 2: Essential Extensions
Open VS Code → Click Extensions icon (`Ctrl+Shift+X`) → Install these:

| Extension | Purpose | Install Link |
|-----------|---------|--------------|
| **Live Server** | Instantly preview HTML in browser with auto-refresh | [Install](vscode:extension/ritwickdey.LiveServer) |
| **Prettier** | Automatically formats your code beautifully | [Install](vscode:extension/esbenp.prettier-vscode) |
| **One Dark Pro** | Professional, easy-on-the-eyes theme | [Install](vscode:extension/zhuangtongfa.Material-theme) |

### Step 3: Create Your First HTML File

1. Create a folder called `my-first-website`
2. Open VS Code → File → Open Folder → Select your folder
3. Create a new file called `index.html`
4. Type `!` and press `Tab` (Emmet shortcut) → HTML template appears

### Step 4: The HTML Template Explained

```html
<!DOCTYPE html>      <!-- Tells browser: "This is HTML5" -->
<html lang="en">     <!-- Root element, language set to English -->
<head>               <!-- Meta-information (not visible on page) -->
    <meta charset="UTF-8">     <!-- Supports all characters -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Mobile responsive -->
    <title>My First Page</title>  <!-- Shows in browser tab -->
</head>
<body>               <!-- Everything visible on the page goes here -->
    <!-- Your content -->
</body>
</html>



📝 Part 3: HTML Basics - Your First Tags
Essential HTML Tags Reference
html
<!-- HEADINGS: h1 is largest, h6 is smallest -->
<h1>Main Title (Most Important)</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Minor Heading</h4>
<h5>Small Heading</h5>
<h6>Smallest Heading</h6>

<!-- PARAGRAPHS -->
<p>This is a paragraph of text. It will automatically wrap lines.</p>

<!-- LINE BREAK (self-closing) -->
This is line one<br>This is line two

<!-- HORIZONTAL RULE (thematic break) -->
<hr>

<!-- UNORDERED LIST (bullets) -->
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>

<!-- ORDERED LIST (numbers) -->
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<!-- LINKS -->
<a href="https://google.com">Click here to visit Google</a>
<a href="https://twitter.com/TheIconicVic_" target="_blank">Follow me on Twitter</a>

<!-- IMAGES -->
<img src="https://via.placeholder.com/300" alt="Placeholder image">

<!-- DIV (block-level container) -->
<div>
    <h2>Grouped Content</h2>
    <p>This entire section is inside a div</p>
</div>

<!-- SPAN (inline container) -->
<p>This word is <span style="color: red;">red</span> and this word is normal</p>

<!-- STRONG (bold) vs EM (italic) -->
<p><strong>Important text</strong> and <em>emphasized text</em></p>
HTML Attributes
Attribute	            Purpose	                                        Example

id	                    Unique identifier (for linking/CSS)	            <div id="header">
class	                Groups elements for styling	                    <p class="important">
href	                Link destination	                            <a href="https://...">
src	                    Image/video source	                            <img src="photo.jpg">
alt	                    Image description (accessibility + SEO)	        <img alt="A sunset over ocean">
target	                Where to open link	                            <a target="_blank"> opens in new tab
