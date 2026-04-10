# Digital Clock & Stopwatch - Day 19 Project

## Project Overview
A complete digital clock with live updates and a stopwatch with lap timing functionality.

## Skills Practiced
- `Date` object methods (`getFullYear()`, `getMonth()`, `getDate()`, `getDay()`, `getHours()`, `getMinutes()`, `getSeconds()`)
- `setInterval()` - Update clock every second
- `clearInterval()` - Stop stopwatch
- Date formatting with `toLocaleTimeString()`
- Event handling
- DOM manipulation

## File Structure
day-19-digital-clock/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

### Digital Clock
| Feature | Description |
|---------|-------------|
| Live time | Updates every second |
| 12/24 hour toggle | Switch between formats |
| Date display | Month, day, year |
| Day of week | Shows current day |

### Stopwatch
| Feature | Description |
|---------|-------------|
| Start/Pause/Reset | Full control |
| Lap timing | Record intermediate times |
| Lap list | Displays all recorded laps |

## Key Code Patterns

```javascript
// Date object
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();
const day = now.getDay();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

// setInterval for clock
setInterval(() => updateClock(), 1000);

// Stopwatch with setInterval
setInterval(() => {
    stopwatchSeconds++;
    updateDisplay();
}, 1000);
Date Methods Used
Method	Returns
getFullYear()	4-digit year
getMonth()	0-11 (January = 0)
getDate()	1-31
getDay()	0-6 (Sunday = 0)
getHours()	0-23
getMinutes()	0-59
getSeconds()	0-59