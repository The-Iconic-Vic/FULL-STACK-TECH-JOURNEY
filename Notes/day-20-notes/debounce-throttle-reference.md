# 📘 Debounce & Throttle Reference

## Debounce

Delays function execution until after a pause in events.

### Basic Implementation

```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
With Immediate Execution (Leading Edge)
javascript
function debounceImmediate(func, delay) {
    let timeoutId;
    return function(...args) {
        const callNow = !timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = null;
        }, delay);
        
        if (callNow) func.apply(this, args);
    };
}
Throttle
Ensures function runs at most once per interval.

Basic Implementation
javascript
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
With Trailing Execution
javascript
function throttleTrailing(func, limit) {
    let inThrottle;
    let lastFunc;
    let lastRan;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            lastRan = Date.now();
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
Use Cases
Search Input (Debounce)
javascript
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
    fetchResults(query);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
Window Resize (Debounce)
javascript
const debouncedResize = debounce(() => {
    console.log('Window resized, recalculating layout');
    updateLayout();
}, 250);

window.addEventListener('resize', debouncedResize);
Auto-save (Debounce)
javascript
let saveTimeout;
function autoSave(data) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('draft', JSON.stringify(data));
        console.log('Auto-saved');
    }, 1000);
}

editor.addEventListener('input', (e) => {
    autoSave({ content: e.target.value });
});
Scroll Handler (Throttle)
javascript
const throttledScroll = throttle(() => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
}, 100);

window.addEventListener('scroll', throttledScroll);
Mouse Move Tracking (Throttle)
javascript
const throttledMouseMove = throttle((e) => {
    console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
}, 50);

document.addEventListener('mousemove', throttledMouseMove);
Button Click (Debounce - Prevent Double Submit)
javascript
const debouncedSubmit = debounce(() => {
    submitForm();
}, 500);

submitButton.addEventListener('click', debouncedSubmit);
Debounce vs Throttle Comparison
Feature	Debounce	Throttle
Execution timing	After pause in events	At regular intervals
First event	Delayed	Immediate
Last event	Executes after pause	May not execute
Use case	Search, auto-save	Scroll, resize, mouse move
Frequency	Varies based on event speed	Fixed interval
Visual Comparison
text
Events:    ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
Debounce:                    ↓
Throttle: ↓     ↓     ↓     ↓
Advanced Patterns
Debounce with Promise
javascript
function debouncePromise(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        return new Promise((resolve) => {
            timeoutId = setTimeout(() => {
                resolve(func.apply(this, args));
            }, delay);
        });
    };
}
Throttle with RequestAnimationFrame
javascript
function throttleRAF(func) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            requestAnimationFrame(() => {
                func.apply(this, args);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Best for animations
window.addEventListener('scroll', throttleRAF(() => {
    updateAnimation();
}));
Cancelable Debounce
javascript
function debounceCancelable(func, delay) {
    let timeoutId;
    const debounced = function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
    
    debounced.cancel = () => {
        clearTimeout(timeoutId);
    };
    
    return debounced;
}

// Usage
const search = debounceCancelable(fetchResults, 300);
search('query');
search.cancel(); // Prevents execution
React Hook Versions
javascript
// useDebounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay]);
    
    return debouncedValue;
}

// useThrottle hook
function useThrottle(value, limit) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRun = useRef(Date.now());
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRun.current >= limit) {
                setThrottledValue(value);
                lastRun.current = Date.now();
            }
        }, limit - (Date.now() - lastRun.current));
        
        return () => clearTimeout(handler);
    }, [value, limit]);
    
    return throttledValue;
}