# Card Component - Day 5 Project

## Project Overview
A simple card component demonstrating the CSS box model and layout basics.

## Skills Practiced
- Universal `border-box` reset
- Padding for internal spacing
- Margin for external spacing
- Border-radius for rounded corners
- Box-shadow for depth
- Display properties
- Hover transitions

## File Structure
day-5-card-component/
├── index.html
├── style.css
└── README.md

text

## Box Model Applied
| Property | Value | Purpose |
|----------|-------|---------|
| `width` | 320px | Fixed card width |
| `padding` | 1.5rem | Space inside card content |
| `border-radius` | 12px | Rounded corners |
| `box-shadow` | 0 10px 25px rgba(0,0,0,0.2) | Depth effect |
| `margin-bottom` | 0.75rem, 1.25rem | Spacing between elements |

## Key Concepts Used
- `box-sizing: border-box` for predictable width
- `display: block` on image to remove extra spacing
- `display: inline-block` on button for sizing with flow
- `object-fit: cover` for consistent image sizing
- `rem` units for scalable spacing
- `px` units for borders and shadows