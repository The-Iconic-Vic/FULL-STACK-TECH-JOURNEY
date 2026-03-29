# Navigation Bar - Day 6 Project

## Project Overview
A responsive navigation bar built with Flexbox demonstrating layout patterns and responsive design.

## Skills Practiced
- `display: flex` on container
- `justify-content: space-between` for spaced layout
- `align-items: center` for vertical centering
- `gap` for spacing between items
- `flex-direction: column` for mobile layout
- Media queries for responsive behavior

## File Structure
day-6-navigation-bar/
├── index.html
├── style.css
└── README.md

text

## Flexbox Properties Used

| Property | Value | Purpose |
|----------|-------|---------|
| `display` | `flex` | Activates Flexbox on navbar |
| `justify-content` | `space-between` | Pushes logo left, buttons right |
| `align-items` | `center` | Vertically centers all items |
| `gap` | `2rem`, `1rem` | Spacing between nav links and buttons |
| `flex-direction` | `column` | Stack layout on mobile |

## Layout Structure

### Desktop (flex-direction: row)
┌─────────────────────────────────────────────────────────────┐
│ Logo [Home] [About] [Services] [Contact] [Login][Signup] │
└─────────────────────────────────────────────────────────────┘

text

### Mobile (flex-direction: column)
┌─────────────────┐
│ Logo │
├─────────────────┤
│ Home About │
│ Services Contact│
├─────────────────┤
│ [Login][Signup]│
└─────────────────┘

text

## Responsive Breakpoints
| Breakpoint | Layout |
|------------|--------|
| > 768px | Horizontal row layout |
| 481px - 768px | Stacked with centered items |
| < 480px | Stacked with smaller text |

## Key Concepts Applied
- `justify-content: space-between` distributes space between logo, nav links, and buttons
- `align-items: center` ensures all items are vertically aligned
- Media queries change `flex-direction` from `row` to `column` on mobile
- `gap` property provides consistent spacing without margin hacks
- `flex-wrap: wrap` on nav-links prevents overflow on smaller screens