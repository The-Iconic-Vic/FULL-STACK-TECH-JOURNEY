# Profile Card - Day 5 Project

## Project Overview
A styled profile card demonstrating CSS box model, layout, and typography.

## Skills Practiced
- Universal `border-box` reset
- Flexbox for social links
- Circular profile image with `border-radius: 50%`
- Box shadow for depth
- Hover effects with transitions
- Responsive max-width layout
- Text alignment and spacing

## File Structure
day-5-profile-card/
├── index.html
├── style.css
└── README.md

text

## Box Model Applied

| Element | Property | Value | Purpose |
|---------|----------|-------|---------|
| `.profile-card` | `padding` | 2rem 1.5rem | Internal spacing |
| `.profile-card` | `border-radius` | 20px | Rounded corners |
| `.profile-card` | `max-width` | 380px | Responsive width |
| `.profile-photo` | `margin` | 0 auto 1rem | Centering + bottom spacing |
| `.profile-photo` | `border` | 4px solid white | Frame effect |
| `.profile-name` | `margin-bottom` | 0.25rem | Space below name |
| `.profile-title` | `margin-bottom` | 1rem | Space below title |
| `.profile-bio` | `margin-bottom` | 1.5rem | Space below bio |
| `.social-links` | `gap` | 1rem | Space between buttons |

## Key Concepts Used
- `box-sizing: border-box` for predictable sizing
- `display: flex` with `justify-content: center` and `gap`
- `border-radius: 50%` for circular image
- `object-fit: cover` for consistent image cropping
- `rem` units for scalable spacing
- `transition` for smooth hover effects
- `transform: translateY()` for lift effect

## Design Features
- Gradient background
- Circular profile photo with white border
- Rounded card corners
- Hover lift effect on card
- Hover color change on social links
- Centered content with balanced spacing