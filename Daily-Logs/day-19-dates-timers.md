# 📅 Day 19: Working with Dates & Timers

**Date:** April 10, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Date Object, setTimeout, setInterval

---

## 📋 Learning Objectives

- ✅ Create and manipulate Date objects
- ✅ Get date components: getFullYear(), getMonth(), getDate(), getDay()
- ✅ Format dates for display
- ✅ Compare dates
- ✅ Use setTimeout() for delayed execution
- ✅ Use setInterval() for repeated execution
- ✅ Clear timers with clearTimeout() and clearInterval()
- ✅ Build countdown timer and digital clock

---

## 📅 Part 1: Date Object

### Creating Date Objects

The Date object represents a single moment in time.

```javascript
// Current date and time
const now = new Date();
console.log(now);  // Fri Apr 10 2026 14:30:25 GMT+0100

// Specific date (year, month, day, hour, minute, second, millisecond)
const specific = new Date(2026, 3, 10, 14, 30, 0, 0);
// Note: month is 0-indexed (0 = January, 3 = April)

// Date string
const fromString = new Date('2026-04-10T14:30:00');

// Timestamp (milliseconds since Jan 1, 1970)
const fromTimestamp = new Date(1744300000000);

// Unix timestamp (seconds) * 1000
const fromUnix = new Date(1744300000 * 1000);
```

---

### Getting Date Components

| Method | Returns | Range |
|--------|---------|-------|
| `getFullYear()` | 4-digit year | 2026 |
| `getMonth()` | Month (0-indexed) | 0-11 |
| `getDate()` | Day of month | 1-31 |
| `getDay()` | Day of week | 0-6 (Sunday=0) |
| `getHours()` | Hour | 0-23 |
| `getMinutes()` | Minute | 0-59 |
| `getSeconds()` | Second | 0-59 |
| `getMilliseconds()` | Millisecond | 0-999 |
| `getTime()` | Timestamp (ms) | since Jan 1, 1970 |

```javascript
const now = new Date();

const year = now.getFullYear();      // 2026
const month = now.getMonth();        // 3 (April)
const date = now.getDate();          // 10
const day = now.getDay();            // 5 (Friday)
const hours = now.getHours();        // 14
const minutes = now.getMinutes();    // 30
const seconds = now.getSeconds();    // 25
const timestamp = now.getTime();     // 1744300000000
```

---

### Setting Date Components

| Method | Description |
|--------|-------------|
| `setFullYear(year)` | Set year |
| `setMonth(month)` | Set month (0-11) |
| `setDate(date)` | Set day of month |
| `setHours(hours)` | Set hour |
| `setMinutes(minutes)` | Set minute |
| `setSeconds(seconds)` | Set second |
| `setTime(timestamp)` | Set from timestamp |

```javascript
const date = new Date();
date.setFullYear(2027);
date.setMonth(0);      // January
date.setDate(15);
date.setHours(10);
date.setMinutes(30);
date.setSeconds(0);
```

---

### Formatting Dates

#### Basic Methods
```javascript
const now = new Date();

// Built-in string methods
now.toString();           // "Fri Apr 10 2026 14:30:25 GMT+0100"
now.toDateString();       // "Fri Apr 10 2026"
now.toTimeString();       // "14:30:25 GMT+0100"
now.toLocaleDateString(); // "4/10/2026"
now.toLocaleTimeString(); // "2:30:25 PM"
```

#### Custom Formatting
```javascript
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// With AM/PM
function formatTime12Hour(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${hours}:${minutes} ${ampm}`;
}
```

#### Using toLocaleString Options
```javascript
const now = new Date();

// Full date with options
now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});  // "Friday, April 10, 2026"

// Time with options
now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
});  // "02:30:25 PM"
```

---

### Comparing Dates

```javascript
const date1 = new Date('2026-04-10');
const date2 = new Date('2026-04-15');

// Comparison operators work directly
console.log(date1 < date2);   // true
console.log(date1 > date2);   // false

// Get difference in milliseconds
const diffMs = date2 - date1;
console.log(diffMs);  // 432000000 (5 days * 24 * 60 * 60 * 1000)

// Difference in days
const diffDays = diffMs / (1000 * 60 * 60 * 24);
console.log(diffDays);  // 5

// Check if same day
function isSameDay(dateA, dateB) {
    return dateA.toDateString() === dateB.toDateString();
}
```

---

## ⏱️ Part 2: Timers

### setTimeout()

Executes a function once after a specified delay (in milliseconds).

```javascript
// Basic syntax
setTimeout(callback, delay);

// Example: Show alert after 3 seconds
setTimeout(() => {
    alert('3 seconds have passed!');
}, 3000);

// With named function
function showMessage() {
    console.log('Delayed message');
}
setTimeout(showMessage, 2000);

// With parameters
function greet(name) {
    console.log(`Hello, ${name}!`);
}
setTimeout(greet, 1000, 'Victor');
```

---

### clearTimeout()

Cancels a timeout before it executes.

```javascript
const timeoutId = setTimeout(() => {
    console.log('This will not run');
}, 5000);

// Cancel the timeout
clearTimeout(timeoutId);

// Example: Conditional timeout
let timeoutId;

function startTimer() {
    timeoutId = setTimeout(() => {
        alert('Time is up!');
    }, 10000);
}

function cancelTimer() {
    clearTimeout(timeoutId);
    alert('Timer cancelled');
}
```

---

### setInterval()

Executes a function repeatedly at specified intervals.

```javascript
// Basic syntax
setInterval(callback, interval);

// Example: Update clock every second
setInterval(() => {
    const now = new Date();
    console.log(now.toLocaleTimeString());
}, 1000);

// Example: Countdown timer
let count = 10;
const intervalId = setInterval(() => {
    console.log(count);
    count--;
    
    if (count < 0) {
        clearInterval(intervalId);
        console.log('Blast off!');
    }
}, 1000);
```

---

### clearInterval()

Stops an interval from continuing.

```javascript
let intervalId = null;
let isRunning = false;

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    intervalId = setInterval(() => {
        console.log('Tick');
    }, 1000);
}

function stopTimer() {
    if (!isRunning) return;
    clearInterval(intervalId);
    isRunning = false;
    console.log('Timer stopped');
}
```

---

### Common Pitfalls & Best Practices

#### 1. Always clear intervals/timeouts
```javascript
// BAD: Memory leak
setInterval(() => {
    console.log('Running forever');
}, 1000);

// GOOD: Store and clear
let intervalId = setInterval(() => {
    console.log('Running');
}, 1000);

// Later...
clearInterval(intervalId);
```

#### 2. Delay is approximate
```javascript
// setTimeout is not guaranteed to run exactly on time
// Browser may delay due to other tasks
setTimeout(() => {
    console.log('May run slightly late');
}, 1000);
```

#### 3. Avoid setInterval for animations (use requestAnimationFrame)
```javascript
// BAD for animations
setInterval(() => {
    element.style.left = x++ + 'px';
}, 16);

// GOOD for animations
function animate() {
    element.style.left = x++ + 'px';
    requestAnimationFrame(animate);
}
```

#### 4. Recursive setTimeout vs setInterval
```javascript
// setInterval (may overlap if callback takes long)
setInterval(() => {
    longRunningTask();  // Could overlap if > 1000ms
}, 1000);

// Recursive setTimeout (waits for completion)
function repeat() {
    longRunningTask();
    setTimeout(repeat, 1000);
}
```

---

## 📝 Quick Reference

### Date Object
```javascript
// Create
new Date()                    // Now
new Date(year, month, day)    // Specific
new Date('2026-04-10')        // From string

// Get
getFullYear()    // Year
getMonth()       // Month (0-11)
getDate()        // Day of month
getDay()         // Day of week (0-6)
getHours()       // Hours (0-23)
getMinutes()     // Minutes (0-59)
getSeconds()     // Seconds (0-59)
getTime()        // Timestamp (ms)

// Set
setFullYear()    // Set year
setMonth()       // Set month
setDate()        // Set day
setHours()       // Set hour
setMinutes()     // Set minute
setSeconds()     // Set second
```

### Timers
```javascript
// One-time
setTimeout(callback, delay)
clearTimeout(id)

// Repeated
setInterval(callback, interval)
clearInterval(id)
```

### Formatting Helpers
```javascript
// Pad with leading zero
String(num).padStart(2, '0')

// Day names
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Month names
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

---

## ✅ Day 19 Checklist

- [ ] Create Date objects for current and specific times
- [ ] Get date components (year, month, day, hour, minute, second)
- [ ] Format dates for display (custom and built-in)
- [ ] Compare dates and calculate differences
- [ ] Use setTimeout for delayed execution
- [ ] Use setInterval for repeated execution
- [ ] Clear timers with clearTimeout and clearInterval
- [ ] Build Countdown Timer project
- [ ] Build Digital Clock project with stopwatch
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Months are 0-indexed** — January is 0, December is 11
2. **getDay() returns day of week** — Sunday is 0, Saturday is 6
3. **Always clear timers** — prevent memory leaks
4. **setTimeout is for one-time** — setInterval is for repeating
5. **Delay is approximate** — not guaranteed exact timing
6. **Store timer IDs** — needed to clear them
7. **padStart() for formatting** — ensures two-digit display
8. **Date objects compare directly** — using < and > operators
9. **Recursive setTimeout** is safer than setInterval for long operations

