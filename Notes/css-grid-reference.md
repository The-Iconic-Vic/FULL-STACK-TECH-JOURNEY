# 📘 CSS Grid Reference

## Activating Grid

```css
.container {
    display: grid;
}
Grid Container Properties
grid-template-columns
Defines the number and width of columns.

css
/* Fixed widths */
.grid {
    grid-template-columns: 200px 300px 200px;
}

/* Fractional units (fr) */
.grid {
    grid-template-columns: 1fr 2fr 1fr;
}

/* Repeat function */
.grid {
    grid-template-columns: repeat(3, 1fr);
}

/* Responsive with minmax and auto-fit */
.grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* Auto-fill vs Auto-fit */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
/* auto-fill: creates empty columns to fill space */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
/* auto-fit: collapses empty columns, stretches items */
grid-template-rows
Defines the number and height of rows.

css
.grid {
    grid-template-rows: 100px 200px auto;
}

.grid {
    grid-template-rows: repeat(3, auto);
}
gap
Creates space between grid items.

css
.grid {
    gap: 20px;           /* Equal row and column gap */
    gap: 20px 10px;      /* row-gap column-gap */
    row-gap: 20px;
    column-gap: 10px;
}
justify-items
Aligns items horizontally within their grid cells.

Value	Effect
stretch	Fills cell width (default)
start	Aligns to left
end	Aligns to right
center	Centers horizontally
css
.grid {
    justify-items: center;
}
align-items
Aligns items vertically within their grid cells.

Value	Effect
stretch	Fills cell height (default)
start	Aligns to top
end	Aligns to bottom
center	Centers vertically
css
.grid {
    align-items: center;
}
justify-content
Aligns the entire grid within the container (when grid is smaller than container).

Value	Effect
start	Grid aligns to left
end	Grid aligns to right
center	Grid centers horizontally
space-between	Equal space between columns
space-around	Equal space around columns
space-evenly	Equal space between, before, after
align-content
Aligns the entire grid vertically within the container.

Value	Effect
start	Grid aligns to top
end	Grid aligns to bottom
center	Grid centers vertically
space-between	Equal space between rows
space-around	Equal space around rows
space-evenly	Equal space between, above, below
Grid Item Properties
grid-column
Controls how many columns an item spans.

css
/* Start and end lines */
.item {
    grid-column: 1 / 3;   /* Starts at line 1, ends at line 3 */
}

/* Span notation */
.item {
    grid-column: span 2;   /* Spans 2 columns */
}

/* Shorthand */
.item {
    grid-column: 1 / span 2;
}
grid-row
Controls how many rows an item spans.

css
.item {
    grid-row: 1 / 3;       /* Starts at line 1, ends at line 3 */
    grid-row: span 2;      /* Spans 2 rows */
}
grid-area
Shorthand for row-start, column-start, row-end, column-end.

css
.item {
    grid-area: 1 / 1 / 3 / 3;
    /* row-start / column-start / row-end / column-end */
}
justify-self
Aligns a single item horizontally within its cell.

Value	Effect
stretch	Fills cell width
start	Aligns to left
end	Aligns to right
center	Centers horizontally
align-self
Aligns a single item vertically within its cell.

Value	Effect
stretch	Fills cell height
start	Aligns to top
end	Aligns to bottom
center	Centers vertically
Common Grid Patterns
Basic 3-Column Layout
css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
Responsive Card Grid
css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}
Holy Grail Layout
css
.page {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main sidebar"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }
Magazine Layout
css
.magazine {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

.featured {
    grid-column: span 2;
    grid-row: span 2;
}
Dashboard Layout
css
.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.sidebar {
    grid-row: span 3;
}

.header {
    grid-column: 2;
}

.main {
    grid-column: 2;
}

.footer {
    grid-column: 2;
}
Grid Units Reference
Unit	Description
px	Fixed pixels
%	Percentage of container
fr	Fraction of available space
auto	Size based on content
minmax(min, max)	Minimum and maximum size
repeat(count, size)	Repeats pattern
Grid Functions
repeat()
css
grid-template-columns: repeat(3, 1fr);
grid-template-columns: repeat(2, 100px 200px);
minmax()
css
grid-template-columns: minmax(200px, 1fr);
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
fit-content()
css
grid-template-columns: fit-content(300px);
Grid Line Numbers
text
    1        2        3        4
    ↓        ↓        ↓        ↓
┌───────┬───────┬───────┬───────┐
│       │       │       │       │
│   1   │   2   │   3   │   4   │
│       │       │       │       │
├───────┼───────┼───────┼───────┤
│       │       │       │       │
│   5   │   6   │   7   │   8   │
│       │       │       │       │
├───────┼───────┼───────┼───────┤
│       │       │       │       │
│   9   │   10  │   11  │   12  │
│       │       │       │       │
└───────┴───────┴───────┴───────┘

Grid Quick Reference
Property	Values	Default
display	grid	-
grid-template-columns	lengths, fr, repeat(), minmax()	none
grid-template-rows	lengths, fr, repeat(), minmax()	none
gap	length	0
justify-items	start, end, center, stretch	stretch
align-items	start, end, center, stretch	stretch
justify-content	start, end, center, space-between, space-around, space-evenly	start
align-content	start, end, center, space-between, space-around, space-evenly	start