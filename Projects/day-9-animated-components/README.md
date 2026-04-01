# Animated Components - Day 9 Project

## Project Overview
Multiple animated components demonstrating CSS keyframe animations.

## Skills Practiced
- `@keyframes` rules
- `animation-name`, `animation-duration`, `animation-iteration-count`
- `animation-timing-function`
- `animation-fill-mode`

## File Structure
day-9-animated-components/
├── index.html
├── style.css
└── README.md

text

## Animations Created

### 1. Shaking Bell
```css
@keyframes shake {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    50% { transform: rotate(-15deg); }
    75% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
}
Triggered on :hover

Duration: 0.5s

2. Pulsing Button
css
@keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220,53,69,0.7); }
    70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(220,53,69,0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220,53,69,0); }
}
Infinite loop: animation-iteration-count: infinite

Duration: 2s

3. Loading Spinner
css
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
Infinite loop

Linear timing for smooth rotation

4. Bouncing Ball
css
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
Infinite loop

Ease-in-out timing for natural bounce

Animation Properties Summary
Property	Values Used
animation-name	shake, pulse, spin, bounce
animation-duration	0.5s, 2s, 1s
animation-iteration-count	1, infinite
animation-timing-function	ease-in-out, linear, ease