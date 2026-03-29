# 📘 Flexbox Items Reference

## flex-grow

Controls how much an item grows when extra space is available.

- **Default:** `0` (does not grow)
- **Value:** Unitless number (proportion)

```css
.item {
    flex-grow: 1;  /* Takes 1 share of extra space */
    flex-grow: 2;  /* Takes 2 shares */
}
How It Works
text
Container width: 1000px
3 items, each width: 200px (total 600px)
Extra space: 400px

If all items have flex-grow: 1:
400px ÷ 3 = 133.33px each
Final widths: 333.33px each

Different ratios:
.item-1 { flex-grow: 1; }  /* 1 part */
.item-2 { flex-grow: 2; }  /* 2 parts */
.item-3 { flex-grow: 1; }  /* 1 part */
Total parts: 4
Item 2 gets twice as much extra space as items 1 and 3
flex-shrink
Controls how much an item shrinks when space is insufficient.

Default: 1 (can shrink)

Value: Unitless number

css
.item {
    flex-shrink: 1;  /* Can shrink (default) */
    flex-shrink: 0;  /* Never shrinks */
}
How It Works
text
Container width: 500px
3 items, each width: 200px (total 600px)
Overflow: 100px

If all have flex-shrink: 1:
100px ÷ 3 = 33.33px loss each
Final widths: 166.67px each

If .logo { flex-shrink: 0; }:
Logo stays 200px, others shrink more
flex-basis
Defines the initial size before growing or shrinking.

Default: auto (based on content)

Values: auto, 0, length units (px, rem, %, etc.)

css
.item {
    flex-basis: auto;    /* Based on content */
    flex-basis: 0;       /* Start at zero */
    flex-basis: 300px;   /* Start at 300px */
    flex-basis: 50%;     /* 50% of container */
}
Critical Difference
Value	Behavior
auto	Item starts at its content size
0	Item starts at zero and grows proportionally
flex Shorthand
Combines flex-grow, flex-shrink, and flex-basis.

css
/* Syntax */
flex: grow shrink basis;

/* Single value (flex-grow) */
flex: 1;           /* flex: 1 1 0 */
flex: 2;           /* flex: 2 1 0 */

/* Two values (grow, shrink) */
flex: 1 1;         /* flex: 1 1 0 */
flex: 2 0;         /* flex: 2 0 0 */

/* Three values (grow, shrink, basis) */
flex: 1 1 200px;
flex: 2 1 auto;

/* Special values */
flex: auto;        /* flex: 1 1 auto */
flex: none;        /* flex: 0 0 auto */
flex: initial;     /* flex: 0 1 auto (default) */
Common Patterns
Pattern	Code	Effect
Equal width items	flex: 1	All share space equally
Fixed width, rest fill	flex: 1 on fill items	Sidebar fixed, content fills
No grow/shrink	flex: none	Maintains natural size
Grow from content	flex: auto	Grows from content size
align-self
Overrides container's align-items for a single item.

Value	Description
auto	Inherits from container (default)
flex-start	Aligns to start of cross axis
flex-end	Aligns to end of cross axis
center	Centers on cross axis
stretch	Stretches to fill cross axis
baseline	Aligns by text baseline
css
.container {
    display: flex;
    align-items: center;  /* All items centered by default */
}

.special-item {
    align-self: flex-start;  /* This one sticks to top */
}
order
Controls visual order without changing HTML structure.

Default: 0

Lower numbers appear first

css
.item-1 { order: 3; }  /* Appears third */
.item-2 { order: 1; }  /* Appears first */
.item-3 { order: 2; }  /* Appears second */
.item-4 { order: 4; }  /* Appears fourth */
Important Notes
Only affects visual display, not HTML structure

Screen readers follow HTML order, not visual order

SEO uses HTML order

Use responsibly for responsive layouts

Item Properties Quick Reference
Property	Values	Default	Purpose
flex-grow	number	0	Ability to grow
flex-shrink	number	1	Ability to shrink
flex-basis	length, auto, 0	auto	Starting size
flex	shorthand	0 1 auto	Grow shrink basis
align-self	auto, flex-start, flex-end, center, stretch, baseline	auto	Individual cross axis alignment
order	number	0	Visual order