# 📘 JavaScript Events Reference

## Adding Event Listeners

### addEventListener

The modern way to handle events.

```javascript
// Basic syntax
element.addEventListener(eventType, callbackFunction);

// Example
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    console.log('Button clicked!');
});

// With named function (can be removed)
function handleClick() {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
Options Object
javascript
// Once: runs only once
button.addEventListener('click', () => {
    console.log('Runs only once');
}, { once: true });

// Capture: use capturing phase instead of bubbling
button.addEventListener('click', () => {
    console.log('Capture phase');
}, { capture: true });

// Passive: improves scroll performance
window.addEventListener('scroll', () => {
    console.log('Scrolling');
}, { passive: true });
Common Event Types
Mouse Events
Event	Description
click	Element clicked
dblclick	Element double-clicked
mousedown	Mouse button pressed
mouseup	Mouse button released
mouseenter	Mouse enters element (no bubble)
mouseleave	Mouse leaves element (no bubble)
mouseover	Mouse enters element (bubbles)
mouseout	Mouse leaves element (bubbles)
mousemove	Mouse moves over element
javascript
element.addEventListener('click', (e) => console.log('Clicked'));
element.addEventListener('dblclick', (e) => console.log('Double clicked'));
element.addEventListener('mouseenter', (e) => console.log('Mouse entered'));
element.addEventListener('mouseleave', (e) => console.log('Mouse left'));
element.addEventListener('mousemove', (e) => {
    console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
});
Keyboard Events
Event	Description
keydown	Key is pressed (fires repeatedly)
keyup	Key is released
keypress	Key is pressed (deprecated)
javascript
document.addEventListener('keydown', (event) => {
    console.log(`Key: ${event.key}`);      // 'a', 'Enter', 'ArrowUp'
    console.log(`Code: ${event.code}`);    // 'KeyA', 'Enter', 'ArrowUp'
    
    if (event.key === 'Enter') {
        console.log('Enter pressed');
    }
    
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Save shortcut');
    }
});
Form Events
Event	Description
input	Input value changes (each keystroke)
change	Input loses focus with changed value
submit	Form is submitted
focus	Element gains focus
blur	Element loses focus
reset	Form is reset
javascript
// Input event (real-time)
const input = document.querySelector('input');
input.addEventListener('input', (e) => {
    console.log(e.target.value);  // Current value
});

// Change event (on blur)
input.addEventListener('change', (e) => {
    console.log('Final value:', e.target.value);
});

// Form submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent page refresh
    console.log('Form submitted');
});

// Focus and blur
input.addEventListener('focus', () => {
    input.style.borderColor = 'blue';
});
input.addEventListener('blur', () => {
    input.style.borderColor = '#ccc';
});
Window Events
Event	Description
load	Page fully loaded (including images)
DOMContentLoaded	DOM ready (before images)
resize	Window resized
scroll	Page scrolled
beforeunload	Before page unloads
javascript
// DOM ready (preferred)
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready');
    // Safe to access DOM elements
});

// Full page load
window.addEventListener('load', () => {
    console.log('All resources loaded');
});

// Resize
window.addEventListener('resize', () => {
    console.log(`Width: ${window.innerWidth}`);
    console.log(`Height: ${window.innerHeight}`);
});

// Scroll
window.addEventListener('scroll', () => {
    console.log(`Scroll Y: ${window.scrollY}`);
});

// Before unload (warn user)
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
});
Event Object
The event object is automatically passed to the callback function.

Common Properties
Property	Description
event.target	Element that triggered the event
event.currentTarget	Element listener is attached to
event.type	Type of event ('click', etc.)
event.timeStamp	Time event was created
Mouse Event Properties
Property	Description
event.clientX	Mouse X relative to viewport
event.clientY	Mouse Y relative to viewport
event.pageX	Mouse X relative to page
event.pageY	Mouse Y relative to page
event.button	Which mouse button (0=left, 1=middle, 2=right)
Keyboard Event Properties
Property	Description
event.key	Character value of key
event.code	Physical key code
event.ctrlKey	Ctrl key pressed
event.shiftKey	Shift key pressed
event.altKey	Alt key pressed
event.metaKey	Meta/Cmd key pressed
Methods
Method	Description
event.preventDefault()	Prevents default browser behavior
event.stopPropagation()	Stops event from bubbling
event.stopImmediatePropagation()	Stops all listeners on same element
Event Flow (Bubbling and Capturing)
javascript
// HTML structure
// div > p > button

// Bubbling (default) - inner to outer
// button → p → div

// Capturing - outer to inner
// div → p → button

// Bubbling (default)
parent.addEventListener('click', () => console.log('Parent clicked'));
child.addEventListener('click', () => console.log('Child clicked'));
// Clicking child: "Child clicked" then "Parent clicked"

// Capturing (use capture: true)
parent.addEventListener('click', () => console.log('Parent clicked'), { capture: true });
child.addEventListener('click', () => console.log('Child clicked'));
// Clicking child: "Parent clicked" then "Child clicked"

// Stop propagation
child.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Child clicked only');
});
Event Delegation
Instead of adding listeners to many elements, add one to a parent.

javascript
// Instead of this (inefficient)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// Do this (efficient)
document.querySelector('.btn-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        handleClick(event);
    }
});

// More specific
document.querySelector('.todo-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        deleteTask(event.target.dataset.id);
    } else if (event.target.classList.contains('edit-btn')) {
        editTask(event.target.dataset.id);
    }
});
Benefits:

Works for dynamically added elements

Better performance (single listener)

Cleaner code

Removing Event Listeners
Must reference the same function.

javascript
// Works
function handleClick() {
    console.log('Clicked');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Does NOT work (different function references)
button.addEventListener('click', () => console.log('Clicked'));
button.removeEventListener('click', () => console.log('Clicked')); // Won't remove
Custom Events
Create and dispatch custom events.

javascript
// Create custom event
const myEvent = new CustomEvent('myEvent', {
    detail: { message: 'Hello from custom event' },
    bubbles: true,
    cancelable: true
});

// Listen for custom event
element.addEventListener('myEvent', (event) => {
    console.log(event.detail.message);  // 'Hello from custom event'
});

// Dispatch the event
element.dispatchEvent(myEvent);
Common Patterns
Debouncing
Limit how often a function runs.

javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Use for search input
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce((e) => {
    console.log('Searching:', e.target.value);
}, 300));
Throttling
Limit function execution to once per interval.

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

// Use for scroll events
window.addEventListener('scroll', throttle(() => {
    console.log('Scrolled!');
}, 200));