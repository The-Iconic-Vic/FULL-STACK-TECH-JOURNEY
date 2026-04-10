# 📚 Day 19 Resources - Dates & Timers

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Date Object | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date |
| MDN: setTimeout | https://developer.mozilla.org/en-US/docs/Web/API/setTimeout |
| MDN: setInterval | https://developer.mozilla.org/en-US/docs/Web/API/setInterval |
| MDN: clearTimeout | https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout |
| MDN: clearInterval | https://developer.mozilla.org/en-US/docs/Web/API/clearInterval |
| MDN: requestAnimationFrame | https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame |
| JavaScript.info: Date and Time | https://javascript.info/date |
| JavaScript.info: setTimeout/setInterval | https://javascript.info/settimeout-setinterval |
| W3Schools: JavaScript Date | https://www.w3schools.com/js/js_dates.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JavaScript Date Object Tutorial | https://youtu.be/9N9mZ7Uu4Jc |
| setTimeout and setInterval | https://youtu.be/1Q7P1K2Y9qM |
| Build a Countdown Timer | https://youtu.be/2wCpkOk2uCg |
| Digital Clock with JavaScript | https://youtu.be/01YKQ0tJFtE |
| Stopwatch Tutorial | https://youtu.be/3eR3B9yOaE8 |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools Console | Test Date methods | Built into Chrome |
| Timestamp Converter | Convert timestamps | https://timestamp.online |
| Epoch Converter | Unix timestamp converter | https://epochconverter.com |
| Date Calculator | Calculate date differences | https://datecalculator.net |
| JSFiddle | Test timer code | https://jsfiddle.net |

## 📝 Date Object Cheatsheet

### Creating Dates
```javascript
new Date()                    // Current date/time
new Date(2026, 3, 10)         // April 10, 2026 (month 0-indexed!)
new Date('2026-04-10')        // From string
new Date(timestamp)           // From milliseconds
```

### Getting Components
| Method | Returns |
|--------|---------|
| `getFullYear()` | 4-digit year |
| `getMonth()` | 0-11 (January = 0) |
| `getDate()` | 1-31 |
| `getDay()` | 0-6 (Sunday = 0) |
| `getHours()` | 0-23 |
| `getMinutes()` | 0-59 |
| `getSeconds()` | 0-59 |

### Formatting
```javascript
date.toString()               // Full string
date.toDateString()           // Date only
date.toTimeString()           // Time only
date.toLocaleDateString()     // Localized date
date.toLocaleTimeString()     // Localized time
```

## 📝 Timers Cheatsheet

### setTimeout
```javascript
// Execute once after delay
const id = setTimeout(callback, delayMs);
clearTimeout(id);  // Cancel
```

### setInterval
```javascript
// Execute repeatedly
const id = setInterval(callback, intervalMs);
clearInterval(id);  // Stop
```

### Common Delays
| Duration | Milliseconds |
|----------|--------------|
| 1 second | 1000 |
| 1 minute | 60000 |
| 1 hour | 3600000 |
| 1 day | 86400000 |

## ✅ Common Code Patterns

### Countdown Timer
```javascript
let remaining = 60;  // seconds
const interval = setInterval(() => {
    if (remaining <= 0) {
        clearInterval(interval);
        alert('Time is up!');
    } else {
        remaining--;
        updateDisplay(remaining);
    }
}, 1000);
```

### Digital Clock
```javascript
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
```

### Debounce
```javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}
```

### Throttle
```javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Month off by 1 | Months are 0-indexed | Add 1 when displaying: `getMonth() + 1` |
| Timer runs too fast | Delay shorter than expected | Use milliseconds correctly (1000 = 1 sec) |
| Interval overlaps | Callback takes longer than interval | Use recursive setTimeout |
| Memory leak | Not clearing interval | Clear in cleanup function |
| `this` binding lost | setTimeout runs in global scope | Use arrow function or `.bind(this)` |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Date Time Format Options | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat |
| requestAnimationFrame | https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame |
| Performance Timer API | https://developer.mozilla.org/en-US/docs/Web/API/Performance |
| Temporal (future Date replacement) | https://tc39.es/proposal-temporal/docs/ |

