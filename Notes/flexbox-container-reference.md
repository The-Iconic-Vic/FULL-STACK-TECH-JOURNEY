# 📘 Flexbox Container Reference

## Activating Flexbox

```css
.container {
    display: flex;
}
flex-direction
Defines the direction of the main axis.

Value	Main Axis	Items Flow
row	Left → Right	Horizontal (default)
row-reverse	Right → Left	Horizontal reversed
column	Top → Bottom	Vertical
column-reverse	Bottom → Top	Vertical reversed
css
.container {
    flex-direction: row;      /* Default */
    flex-direction: column;   /* Stack vertically */
}
justify-content
Aligns items along the main axis.

Value	Description
flex-start	Items packed at start (default)
flex-end	Items packed at end
center	Items centered
space-between	First at start, last at end, equal space between
space-around	Equal space around each item
space-evenly	Equal space between, before, and after
css
.container {
    justify-content: center;        /* Center horizontally */
    justify-content: space-between; /* Push items apart */
    justify-content: space-around;  /* Equal space around */
}
Visual Examples
text
flex-start:  [A] [B] [C] [D] ████████████████████

flex-end:    ████████████████████ [A] [B] [C] [D]

center:      █████████ [A] [B] [C] [D] █████████

space-between: [A] ███ [B] ███ [C] ███ [D]

space-around:  █ [A] █ [B] █ [C] █ [D] █

space-evenly:  █ [A] █ [B] █ [C] █ [D] █
align-items
Aligns items along the cross axis.

Value	Description
stretch	Items stretch to fill container (default)
flex-start	Items aligned at start of cross axis
flex-end	Items aligned at end of cross axis
center	Items centered along cross axis
baseline	Items aligned by text baseline
css
.container {
    align-items: center;    /* Vertical centering */
    align-items: stretch;   /* Default - fills height */
    align-items: flex-end;  /* Align to bottom */
}
Visual Examples (flex-direction: row)
text
flex-start (top aligned):
┌─────────────────────────┐
│ [A] [B] [C]             │
│                         │
│                         │
└─────────────────────────┘

center (vertically centered):
┌─────────────────────────┐
│                         │
│ [A] [B] [C]             │
│                         │
└─────────────────────────┘

flex-end (bottom aligned):
┌─────────────────────────┐
│                         │
│                         │
│ [A] [B] [C]             │
└─────────────────────────┘
flex-wrap
Controls whether items wrap to new lines.

Value	Description
nowrap	All items on one line (default)
wrap	Items wrap onto multiple lines
wrap-reverse	Items wrap onto multiple lines in reverse order
css
.container {
    flex-wrap: wrap;    /* Enable wrapping */
    flex-wrap: nowrap;  /* No wrapping (default) */
}
align-content
Aligns wrapped lines along the cross axis (only works with flex-wrap: wrap).

Value	Description
stretch	Lines stretch to fill (default)
flex-start	Lines packed at start
flex-end	Lines packed at end
center	Lines centered
space-between	Equal space between lines
space-around	Equal space around lines
css
.container {
    flex-wrap: wrap;
    align-content: center;     /* Center wrapped rows */
    align-content: space-between; /* Space between rows */
}
gap
Creates consistent spacing between items.

css
.container {
    gap: 1rem;        /* Equal gap between all items */
    gap: 20px 10px;   /* row-gap column-gap */
    row-gap: 20px;    /* Gap between rows */
    column-gap: 10px; /* Gap between columns */
}
Container Properties Quick Reference
Property	Values	Default	Purpose
flex-direction	row, column, row-reverse, column-reverse	row	Sets main axis
justify-content	flex-start, flex-end, center, space-between, space-around, space-evenly	flex-start	Main axis alignment
align-items	stretch, flex-start, flex-end, center, baseline	stretch	Cross axis alignment
flex-wrap	nowrap, wrap, wrap-reverse	nowrap	Controls wrapping
align-content	stretch, flex-start, flex-end, center, space-between, space-around	stretch	Multi-line cross axis
gap	length	0	Space between items
