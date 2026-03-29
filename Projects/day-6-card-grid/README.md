# Responsive Card Grid - Day 6 Project

## Project Overview
A responsive card grid built with Flexbox that automatically adjusts the number of cards per row based on screen size.

## Skills Practiced
- `display: flex` on container
- `flex-wrap: wrap` for multi-line layout
- `flex: 1 1 300px` shorthand for grow, shrink, basis
- `gap` for consistent spacing
- Media queries for additional breakpoint control
- Hover effects with transitions

## File Structure
day-6-card-grid/
├── index.html
├── style.css
└── README.md

text

## Flexbox Properties Used

| Property | Value | Purpose |
|----------|-------|---------|
| `display` | `flex` | Activates Flexbox on grid container |
| `flex-wrap` | `wrap` | Allows cards to wrap to next row |
| `gap` | `1.5rem` | Consistent spacing between cards |
| `flex` | `1 1 300px` | Grow, shrink, basis combination |

## How `flex: 1 1 300px` Works
flex: 1 1 300px
│ │ │
│ │ └── flex-basis: 300px (starting width)
│ └────── flex-shrink: 1 (can shrink if needed)
└──────── flex-grow: 1 (can grow to fill space)

text

This creates a responsive grid where:
- Cards start at 300px wide
- They grow to fill available space
- They shrink if container is smaller
- They wrap when not enough space for another card

## Responsive Behavior

| Screen Size | Cards Per Row | Breakpoint |
|-------------|---------------|------------|
| Desktop (> 1200px) | 4 cards | `min-width: 1200px` |
| Laptop (1024px - 1200px) | 3 cards | Default flex-basis behavior |
| Tablet (768px - 1024px) | 2 cards | Media query override |
| Mobile (< 768px) | 1 card | Media query override |

## Visual Layout

### Desktop (4 cards per row)
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Card │ │ Card │ │ Card │ │ Card │
└─────────┘ └─────────┘ └─────────┘ └─────────┘

text

### Tablet (2 cards per row)
┌─────────────┐ ┌─────────────┐
│ Card │ │ Card │
└─────────────┘ └─────────────┘
┌─────────────┐ ┌─────────────┐
│ Card │ │ Card │
└─────────────┘ └─────────────┘

text

### Mobile (1 card per row)
┌─────────────────┐
│ Card │
└─────────────────┘
┌─────────────────┐
│ Card │
└─────────────────┘

text

## Key Concepts Applied
- `flex-wrap: wrap` allows cards to flow to next line
- `flex-basis: 300px` sets the ideal card width
- `flex-grow: 1` lets cards expand to fill extra space
- Media queries provide precise control at specific breakpoints
- `gap` creates consistent spacing without margin calculations
- Hover effects add interactive feedback