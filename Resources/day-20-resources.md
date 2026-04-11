# 📚 Day 20 Resources - Advanced Events & Event Delegation

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Mouse Events | https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent |
| MDN: Keyboard Events | https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent |
| MDN: Event Bubbling | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling |
| MDN: Event Delegation | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation |
| MDN: preventDefault() | https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault |
| MDN: stopPropagation() | https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation |
| MDN: CustomEvent | https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent |
| MDN: Debouncing | https://developer.mozilla.org/en-US/docs/Glossary/Debounce |
| JavaScript.info: Bubbling and Capturing | https://javascript.info/bubbling-and-capturing |
| JavaScript.info: Event Delegation | https://javascript.info/event-delegation |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JavaScript Events Tutorial | https://youtu.be/7UstS0hsHgI |
| Event Bubbling & Delegation | https://youtu.be/3KJI1WZGDrg |
| Keyboard Events Tutorial | https://youtu.be/4UJ5Ck7gC7o |
| Debounce vs Throttle | https://youtu.be/8aGhZQkoFbQ |
| Custom Events Tutorial | https://youtu.be/3J0YPxE4Q4w |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools | Debug events, inspect event listeners | Built into Chrome |
| Event Listener Breakpoints | Pause on specific events | DevTools → Sources |
| Monitor Events | Console API | `monitorEvents(element)` |

## 📝 Mouse Events Cheatsheet

| Event | Bubbles | Use Case |
|-------|---------|----------|
| `click` | Yes | General clicks |
| `dblclick` | Yes | Double-click actions |
| `mousedown` | Yes | Drawing, drag start |
| `mouseup` | Yes | Drawing, drag end |
| `mousemove` | Yes | Drawing, hover tracking |
| `mouseenter` | No | Hover effects |
| `mouseleave` | No | Hover effects |
| `contextmenu` | Yes | Custom right-click menu |

## 📝 Keyboard Events Cheatsheet

| Property | Description | Example |
|----------|-------------|---------|
| `event.key` | Character value | `'a'`, `'Enter'`, `'ArrowUp'` |
| `event.code` | Physical key | `'KeyA'`, `'Digit1'` |
| `event.ctrlKey` | Ctrl pressed | `true`/`false` |
| `event.shiftKey` | Shift pressed | `true`/`false` |
| `event.altKey` | Alt pressed | `true`/`false` |
| `event.metaKey` | Cmd/Win pressed | `true`/`false` |

## 📝 Event Methods Cheatsheet

| Method | Purpose | Example |
|--------|---------|---------|
| `preventDefault()` | Stop default behavior | Link navigation, form submit |
| `stopPropagation()` | Stop bubbling | Prevent parent listeners |
| `stopImmediatePropagation()` | Stop all listeners | Emergency stop |

## ✅ Common Patterns

### Event Delegation
```javascript
parent.addEventListener('click', (event) => {
    const button = event.target.closest('.btn');
    if (button) {
        handleButtonClick(button.dataset.id);
    }
});
```

### Debounce
```javascript
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
```

### Throttle
```javascript
function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### Custom Event
```javascript
const event = new CustomEvent('myEvent', { 
    detail: { message: 'Hello' },
    bubbles: true 
});
element.dispatchEvent(event);
element.addEventListener('myEvent', (e) => {
    console.log(e.detail.message);
});
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Event fires multiple times | Event bubbling | Use `stopPropagation()` or check `event.target` |
| Form submits and refreshes | Default behavior | `event.preventDefault()` |
| Arrow keys scroll page | Browser default | `event.preventDefault()` |
| Dynamic elements not responding | No event listener | Use event delegation |
| `this` is wrong in callback | Context lost | Use arrow function or `.bind(this)` |
| Search triggers too many requests | No debounce | Implement debouncing |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Event Phases (Capturing, Target, Bubbling) | https://javascript.info/bubbling-and-capturing |
| Pointer Events (for pen/stylus) | https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events |
| Touch Events (mobile) | https://developer.mozilla.org/en-US/docs/Web/API/Touch_events |
| UI Events Specification | https://w3c.github.io/uievents/ |
