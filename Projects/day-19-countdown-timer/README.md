# Countdown Timer - Day 19 Project

## Project Overview
A fully functional countdown timer demonstrating JavaScript timer functions: setInterval, clearInterval, and setTimeout.

## Skills Practiced
- `setInterval()` - Update timer every second
- `clearInterval()` - Stop the timer
- `setTimeout()` - Show alert after timer ends
- `Date` object concepts
- Event handling
- DOM manipulation

## File Structure
day-19-countdown-timer/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Timer Methods Used

| Method | Purpose |
|--------|---------|
| `setInterval()` | Update display every second |
| `clearInterval()` | Stop countdown |
| `setTimeout()` | Delay alert and status messages |

## Features

| Feature | Description |
|---------|-------------|
| Start | Begin countdown |
| Pause | Stop countdown (resumable) |
| Reset | Reset to input values |
| Input validation | Minutes (0-99), Seconds (0-59) |
| Status messages | Ready, Running, Paused, Time's up |
| Beep sound | Audio feedback when timer ends |
| Alert | Popup notification when timer ends |

## Key Code Patterns

```javascript
// Start interval
timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
    } else {
        clearInterval(timerInterval);
        alert('Time is up!');
    }
}, 1000);

// Clear interval
clearInterval(timerInterval);

// Delay action
setTimeout(() => {
    statusMessage.textContent = 'Ready';
}, 1000);
Formatting Functions
String(num).padStart(2, '0') - Ensure two-digit display

Math.floor(seconds / 60) - Get minutes

seconds % 60 - Get remaining seconds