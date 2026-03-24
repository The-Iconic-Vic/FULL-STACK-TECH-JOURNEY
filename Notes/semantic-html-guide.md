# 📘 Semantic HTML: Complete Guide

**Last Updated:** March 25, 2026  
**Author:** Victor Innocent (@TheIconicVic)

A comprehensive reference for semantic HTML elements and when to use them.

---

## 📑 Table of Contents
1. [What is Semantic HTML?](#what-is-semantic-html)
2. [The Semantic Tags](#the-semantic-tags)
3. [Semantic Hierarchy](#semantic-hierarchy)
4. [Why It Matters](#why-it-matters)
5. [Common Mistakes](#common-mistakes)
6. [Quick Reference Table](#quick-reference-table)

---

## What is Semantic HTML?

**Semantic HTML** uses elements that describe the **meaning** of content, not just its presentation.

### Comparison

| Non-Semantic (BAD) | Semantic (GOOD) |
|-------------------|-----------------|
| `<div class="header">` | `<header>` |
| `<div class="nav">` | `<nav>` |
| `<div class="main">` | `<main>` |
| `<div class="sidebar">` | `<aside>` |
| `<div class="footer">` | `<footer>` |

---

## The Semantic Tags

### `<header>` - Introduction Container
```html
<header>
    <h1>Site Title</h1>
    <nav>...</nav>
</header>
Can appear multiple times

Often contains navigation, logo, search

Shouldn't be inside <footer>, <address>, or another <header>

<nav> - Navigation Links
html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>
For major navigation blocks

Can have multiple <nav> elements

Don't use for every group of links

<main> - Primary Content
html
<main>
    <h1>Page Title</h1>
    <p>Unique content here...</p>
</main>
ONLY ONE per page

Content unique to this page

Don't include sidebars, headers, footers

<section> - Thematic Grouping
html
<section>
    <h2>Latest News</h2>
    <p>News content...</p>
</section>
Groups related content

Should have a heading

Use when content is part of a larger whole

<article> - Self-Contained Content
html
<article>
    <h2>Blog Post Title</h2>
    <p>Post content...</p>
</article>
Standalone, distributable content

Can be nested inside <section>

Use for: blog posts, news, forum posts, comments

<aside> - Complementary Content
html
<aside>
    <h3>Related Articles</h3>
    <ul>...</ul>
</aside>
Tangentially related content

Sidebars, pull quotes, ads

Remove it, main content still makes sense

<footer> - Closing Information
html
<footer>
    <p>&copy; 2026 Company Name</p>
</footer>
Contains metadata, copyright, links

Can appear multiple times

Don't put <header> or <main> inside

Semantic Hierarchy
text
<body>
│
├── <header>              // Site header
│   ├── <h1>             // Site title
│   └── <nav>            // Primary navigation
│
├── <main>               // Unique content
│   │
│   ├── <article>        // Self-contained content
│   │   ├── <header>     // Article metadata
│   │   │   ├── <h1>     // Article title
│   │   │   └── <p>      // Date, author
│   │   ├── <section>    // Introduction
│   │   │   └── <h2>
│   │   ├── <section>    // Main content
│   │   │   └── <h2>
│   │   └── <footer>     // Article footer
│   │
│   └── <aside>          // Sidebar
│       └── <h3>
│
└── <footer>             // Site footer
Why It Matters
1. SEO (Search Engine Optimization)
Search engines prioritize semantic content

Better understanding = better rankings

<article> signals main content

<nav> signals site structure

2. Accessibility
Screen readers navigate by semantic landmarks

Users can jump to <main> with one key

Heading structure provides navigation

ARIA labels complement semantic HTML

3. Maintainability
Self-documenting code

Easier for others to understand

Consistent patterns

Future-proof

Common Mistakes
Mistake Why It's Wrong  Correct Approach
Multiple <main> elements    Only one per page   Keep only one <main>
Using <div> for everything  No semantic meaning Use semantic tags where appropriate
Skipping heading levels <h1> then <h3>  Never skip levels
Putting navigation in <main>    Navigation repeats  Keep <nav> outside <main>
Using <section> without heading Missing context Always include a heading
<article> for small content Overuse Use <section> for grouped content
Quick Reference Table
Element Purpose When to Use Not for
<header>    Introduction    Page top, article top   Footer, address
<nav>   Navigation  Main menus  Every link group
<main>  Primary content Once per page   Sidebars, headers
<section>   Grouped content Thematic grouping   Standalone content
<article>   Independent content Blog posts, news    Simple grouping
<aside> Complementary   Sidebars, ads   Primary content
<footer>    Closing info    Page bottom Headers, main
🎯 Decision Tree
text
Is this the main content unique to this page?
    ├── YES → Use <main>
    │         └── Can this content stand alone?
    │             ├── YES → Use <article>
    │             └── NO → Use <section>
    │
    └── NO → Is it navigation?
        ├── YES → Use <nav>
        │
        └── NO → Is it introductory?
            ├── YES → Use <header>
            │
            └── NO → Is it complementary?
                ├── YES → Use <aside>
                │
                └── NO → Is it closing info?
                    ├── YES → Use <footer>
                    └── NO → Use <div>
