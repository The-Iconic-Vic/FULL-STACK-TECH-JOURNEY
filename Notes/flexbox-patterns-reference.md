# 📘 Flexbox Patterns Reference

## Pattern 1: Perfect Centering

```css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
Use case: Modal popups, loading screens, hero sections

Pattern 2: Equal Height Columns
css
.container {
    display: flex;
    gap: 20px;
}

.column {
    flex: 1;  /* All columns equal width */
    padding: 20px;
    background: #f5f5f5;
}
/* All columns automatically have equal height */
Why it works: Default align-items: stretch makes all items fill container height

Pattern 3: Holy Grail Layout (Header, Main, Footer)
css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
}

main {
    flex: 1;  /* Takes all available space, pushes footer down */
}

header, footer {
    background: #333;
    color: white;
    padding: 1rem;
}
html
<body>
    <header>Header</header>
    <main>Main Content</main>
    <footer>Footer</footer>
</body>
Pattern 4: Navigation Bar
css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
    color: white;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.auth-buttons {
    display: flex;
    gap: 1rem;
}
Pattern 5: Responsive Card Grid
css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    flex: 1 1 300px;
    /* Grow: 1, Shrink: 1, Basis: 300px */
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
How it works
Cards start at 300px (flex-basis: 300px)

They can grow if extra space (flex-grow: 1)

They can shrink if needed (flex-shrink: 1)

When container can't fit another 300px card, it wraps (flex-wrap: wrap)

Pattern 6: Media Object (Image with Text)
css
.media-object {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.media-image {
    flex-shrink: 0;  /* Image never shrinks */
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.media-content {
    flex: 1;  /* Content takes remaining space */
}
html
<div class="media-object">
    <img src="avatar.jpg" class="media-image">
    <div class="media-content">
        <h3>Name</h3>
        <p>Content text here</p>
    </div>
</div>
Pattern 7: Sticky Footer
css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1;
}

footer {
    background: #333;
    color: white;
    padding: 1rem;
}
Pattern 8: Centered Content with Max Width
css
.container {
    display: flex;
    justify-content: center;
}

.content {
    flex: 1;
    max-width: 800px;
    padding: 1rem;
}
Pattern 9: Sidebar with Main Content
css
.layout {
    display: flex;
    gap: 2rem;
}

.sidebar {
    width: 250px;
    flex-shrink: 0;  /* Sidebar never shrinks */
}

.main-content {
    flex: 1;  /* Takes remaining space */
}
Pattern 10: Centered Navigation Links
css
nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    background: #333;
    padding: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
}
Pattern 11: Wrap with Last Row Alignment
css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.card-grid::after {
    content: "";
    flex: auto;
    /* Helps align last row when cards don't fill */
}
Pattern 12: Responsive Navigation (Desktop to Mobile)
css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
    }
}
Pattern Quick Reference
Pattern	Key Properties
Centering	justify-content: center; align-items: center;
Space between	justify-content: space-between
Equal width	flex: 1 on all items
Fixed width item	flex-shrink: 0 on fixed item, flex: 1 on flexible
Wrapping grid	flex-wrap: wrap; flex: 1 1 200px
Sticky footer	flex-direction: column; min-height: 100vh; main { flex: 1; }
Media object	flex-shrink: 0 on image, flex: 1 on content
Mobile stack	Media query with flex-direction: column
