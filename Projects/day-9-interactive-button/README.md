# Interactive Button - Day 9 Project

## Project Overview
An interactive button demonstrating CSS transitions and transforms.

## Skills Practiced
- `transition-property`, `transition-duration`, `transition-timing-function`
- `transform: scale()` on hover
- `:hover` and `:active` pseudo-classes
- Box-shadow transitions

## File Structure
day-9-interactive-button/
├── index.html
├── style.css
└── README.md

text

## Transition Properties Used

| Property | Value | Purpose |
|----------|-------|---------|
| `transition-property` | `background, transform, box-shadow` | Which properties animate |
| `transition-duration` | `0.3s` | Animation speed |
| `transition-timing-function` | `ease` | Acceleration curve |
| `transition-delay` | `0s` | No delay |

## Hover Effects
- Background color: `#007bff` → `#0056b3`
- Scale: `scale(1.05)` grows button by 5%
- Box-shadow: Adds depth on hover
- Active state: `scale(0.98)` gives click feedback