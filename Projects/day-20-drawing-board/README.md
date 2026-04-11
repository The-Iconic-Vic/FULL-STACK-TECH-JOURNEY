# Drawing Board - Day 20 Project

## Project Overview
An interactive drawing board that demonstrates mouse events (mousedown, mousemove, mouseup, mouseleave) and touch events for mobile devices.

## Skills Practiced
- `mousedown` - Start drawing when mouse pressed
- `mousemove` - Draw while mouse moves
- `mouseup` - Stop drawing when mouse released
- `mouseleave` - Stop drawing if mouse leaves canvas
- Canvas API for graphics
- Touch events for mobile support

## File Structure
day-20-drawing-board/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Mouse Events Used

| Event | Purpose |
|-------|---------|
| `mousedown` | Start drawing |
| `mousemove` | Draw line between points |
| `mouseup` | Stop drawing |
| `mouseleave` | Stop if mouse leaves canvas |

## Features

| Feature | Description |
|---------|-------------|
| Free drawing | Click and drag to draw |
| Color picker | Choose any color |
| Brush size | Adjustable from 1-50px |
| Eraser | Toggle eraser mode |
| Clear canvas | Reset the drawing board |
| Mobile support | Touch events included |

## Key Code Patterns

```javascript
// Drawing state
let isDrawing = false;

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

// Draw while moving
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    draw(lastX, lastY, e.offsetX, e.offsetY);
    lastX = e.offsetX;
    lastY = e.offsetY;
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});