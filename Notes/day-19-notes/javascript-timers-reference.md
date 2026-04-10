# 📘 JavaScript Timers Reference

## setTimeout()

Executes a function once after a specified delay.

### Basic Syntax
```javascript
const timeoutId = setTimeout(callback, delay, ...args);
Examples
javascript
// Basic timeout
setTimeout(() => {
    console.log('Delayed message');
}, 2000);

// With named function
function showAlert() {
    alert('Time is up!');
}
setTimeout(showAlert, 5000);

// With parameters
function greet(name, age) {
    console.log(`Hello ${name}, age ${age}`);
}
setTimeout(greet, 1000, 'Victor', 25);

// Zero delay (runs after current stack)
setTimeout(() => {
    console.log('Runs after synchronous code');
}, 0);
clearTimeout()
javascript
const timeoutId = setTimeout(() => {
    console.log('Will not run');
}, 5000);

// Cancel before execution
clearTimeout(timeoutId);

// Check if cancelled
if (timeoutId) {
    clearTimeout(timeoutId);
}
setInterval()
Executes a function repeatedly at specified intervals.

Basic Syntax
javascript
const intervalId = setInterval(callback, interval, ...args);
Examples
javascript
// Update every second
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Tick ${count}`);
}, 1000);

// Stop after 10 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log('Stopped');
}, 10000);

// With parameters
function updateCounter(increment) {
    counter += increment;
    console.log(counter);
}
setInterval(updateCounter, 1000, 2);
clearInterval()
javascript
let intervalId = null;

function startTimer() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        console.log('Running');
    }, 1000);
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
Recursive setTimeout
Alternative to setInterval that waits for completion before next execution.

javascript
// setInterval (may overlap)
setInterval(() => {
    longRunningTask(); // If this takes > 1000ms, calls may overlap
}, 1000);

// Recursive setTimeout (waits for completion)
function repeat() {
    longRunningTask();
    setTimeout(repeat, 1000);
}
repeat();

// With condition to stop
let shouldContinue = true;

function repeat() {
    if (!shouldContinue) return;
    longRunningTask();
    setTimeout(repeat, 1000);
}
repeat();

// Stop after 10 iterations
let iterations = 0;
function repeat() {
    iterations++;
    longRunningTask();
    if (iterations < 10) {
        setTimeout(repeat, 1000);
    }
}
Countdown Timer Example
javascript
class CountdownTimer {
    constructor(durationSeconds, onTick, onComplete) {
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.intervalId = null;
        this.isRunning = false;
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        this.intervalId = setInterval(() => {
            if (this.remaining > 0) {
                this.remaining--;
                if (this.onTick) {
                    this.onTick(this.remaining);
                }
            }
            
            if (this.remaining === 0) {
                this.stop();
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }, 1000);
    }
    
    pause() {
        if (!this.isRunning) return;
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
    }
    
    reset() {
        this.pause();
        this.remaining = this.duration;
        if (this.onTick) {
            this.onTick(this.remaining);
        }
    }
    
    stop() {
        this.pause();
        this.remaining = this.duration;
    }
}

// Usage
const timer = new CountdownTimer(
    60,
    (remaining) => console.log(`${remaining} seconds left`),
    () => console.log('Time is up!')
);
timer.start();
Debounce
Limits how often a function can be called.

javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
Throttle
Ensures a function runs at most once per interval.

javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Usage: Scroll handler
const throttledScroll = throttle(() => {
    console.log('Scrolled!');
}, 200);

window.addEventListener('scroll', throttledScroll);
Digital Clock Example
javascript
class DigitalClock {
    constructor(containerId, use24Hour = true) {
        this.container = document.getElementById(containerId);
        this.use24Hour = use24Hour;
        this.intervalId = null;
    }
    
    formatTime(date) {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        if (!this.use24Hour) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours === 0 ? 12 : hours;
            return `${hours}:${minutes}:${seconds} ${ampm}`;
        }
        
        return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }
    
    formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    update() {
        const now = new Date();
        if (this.container) {
            this.container.innerHTML = `
                <div class="time">${this.formatTime(now)}</div>
                <div class="date">${this.formatDate(now)}</div>
            `;
        }
    }
    
    start() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    }
    
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    toggleFormat() {
        this.use24Hour = !this.use24Hour;
        this.update();
    }
}

// Usage
const clock = new DigitalClock('clock-container', true);
clock.start();
Stopwatch Example
javascript
class Stopwatch {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.isRunning = false;
    }
    
    start() {
        if (this.isRunning) return;
        this.startTime = Date.now() - this.elapsedTime;
        this.isRunning = true;
        
        this.intervalId = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.onUpdate?.(this.elapsedTime);
        }, 10);
    }
    
    pause() {
        if (!this.isRunning) return;
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
    }
    
    reset() {
        this.pause();
        this.elapsedTime = 0;
        this.startTime = null;
        this.onUpdate?.(0);
    }
    
    getFormattedTime() {
        const milliseconds = this.elapsedTime % 1000;
        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
            milliseconds: String(Math.floor(milliseconds / 10)).padStart(2, '0')
        };
    }
    
    onUpdate(callback) {
        this.onUpdate = callback;
    }
}

// Usage
const stopwatch = new Stopwatch();
stopwatch.onUpdate((elapsed) => {
    const time = stopwatch.getFormattedTime();
    console.log(`${time.hours}:${time.minutes}:${time.seconds}.${time.milliseconds}`);
});
Common Pitfalls & Solutions
Pitfall	Solution
Not clearing intervals	Always store ID and clear on unmount
setInterval overlapping	Use recursive setTimeout
Delay not exact	Don't rely on precise timing
Memory leaks	Clear timers before removing elements
this binding issues	Use arrow functions or bind
javascript
// BAD: Memory leak
class Component {
    start() {
        setInterval(() => {
            this.update();
        }, 1000);
    }
}

// GOOD: Clean up
class Component {
    start() {
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);
    }
    
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
Performance Tips
javascript
// Use requestAnimationFrame for animations
function animate() {
    // animation logic
    requestAnimationFrame(animate);
}

// Avoid setInterval for heavy operations
// Use setTimeout recursion instead
function processQueue() {
    if (queue.length > 0) {
        const item = queue.shift();
        process(item);
        setTimeout(processQueue, 0);
    }
}