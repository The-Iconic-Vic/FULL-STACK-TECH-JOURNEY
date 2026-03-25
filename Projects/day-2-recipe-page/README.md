# 🍪 Classic Chocolate Chip Cookies - Recipe Page

## 📋 Project Overview
This is Day 2's mini-project - a complete semantic HTML recipe page for classic chocolate chip cookies. The project demonstrates proper HTML structure using semantic elements.

**Live Demo:** [Coming soon]  
**Repository:** [VictorInnocent/my-tech-journey](https://github.com/VictorInnocent/my-tech-journey)

---

## 🛠️ Tech Stack Used
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic document structure |
| W3C Validator | HTML validation |

---

## 🏗️ Semantic Structure Used

```html
<body>
├── <header>          Site header with navigation
├── <main>            Unique page content
│   └── <article>     Recipe content (self-contained)
│       ├── <header>  Recipe title + metadata
│       ├── <section> Why this recipe works
│       ├── <section> Ingredients list
│       ├── <section> Instructions (ordered)
│       ├── <section> Pro tips
│       └── <footer>  Recipe metadata
│   └── <aside>       Related recipes + author info
└── <footer>          Site footer with copyright
🎯 What I Practiced
Semantic HTML
✅ <header> for page and article headers

✅ <nav> for main navigation

✅ <main> for unique content (only one)

✅ <article> for self-contained recipe

✅ <section> for logical content grouping

✅ <aside> for complementary content

✅ <footer> for page and article footers

Text Elements
✅ Proper heading hierarchy (<h1> once, then <h2>, <h3>)

✅ <strong> for important text

✅ <em> for emphasis

✅ <mark> for highlighted text

✅ <small> for disclaimers and copyright

Lists
✅ Unordered lists (<ul>) for ingredients

✅ Ordered lists (<ol>) for instructions

✅ Description lists (<dl>) for recipe card

✅ Nested lists for organization

🔑 Key Takeaways
Semantic HTML is about meaning, not appearance. The same tags could be styled completely differently with CSS.

Only one <main> per page. This is a critical accessibility rule.

<article> vs <section>: If content can stand alone (like a recipe), use <article>. If it's part of a larger whole, use <section>.

Lists have semantic meaning. Screen readers announce "list with 10 items" which helps users understand content structure.

Validation is important. The W3C Validator caught that I initially had two <h1> elements on the page!

🐛 Challenges Faced & Solutions
Challenge	Solution
Understanding when to use <section> vs <div>	Used <section> when content had a heading and was thematically grouped
Two <h1> elements in validator	Changed one to <h2> - only one main title per page
Forgot to close a <section> tag	Used validator to catch the error
alt text for images	Added descriptive alt text for all images
📈 What I'll Add Next
Day 3: CSS styling to make the recipe page beautiful

Day 4: Flexbox layout for better organization

Day 5: Responsive design for mobile devices

🔍 Validation Results
Check	                        Status

W3C HTML Validation	            ✅ Passed
One <h1> per page	            ✅ Yes
Proper heading hierarchy	    ✅ Yes
All tags closed	                ✅ Yes
Alt attributes present	        ✅ Yes (on all images)