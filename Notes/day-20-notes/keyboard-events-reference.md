# 📘 Keyboard Events Reference

## Keyboard Event Types

| Event | Description |
|-------|-------------|
| `keydown` | Key is pressed (fires repeatedly while held) |
| `keyup` | Key is released |
| `keypress` | Deprecated - use keydown instead |

```javascript
document.addEventListener('keydown', (e) => {
    console.log(`Key down: ${e.key}`);
});

document.addEventListener('keyup', (e) => {
    console.log(`Key up: ${e.key}`);
});
Key Event Properties
event.key
The character value of the key (affected by keyboard layout, Shift, CapsLock).

javascript
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    // 'a', 'A', 'Enter', 'ArrowUp', 'Escape', ' ', 'Tab'
});
event.code
The physical key code (independent of keyboard layout).

javascript
document.addEventListener('keydown', (e) => {
    console.log(e.code);
    // 'KeyA', 'Digit1', 'ArrowUp', 'Enter', 'Space'
});
Modifier Keys
Property	Description
ctrlKey	Ctrl key pressed
shiftKey	Shift key pressed
altKey	Alt key pressed
metaKey	Meta/Cmd key pressed
javascript
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        console.log('Save');
    }
    
    if (e.shiftKey && e.key === 'Enter') {
        console.log('Shift + Enter');
    }
});
Common Keyboard Shortcuts
javascript
class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {};
        this.setupListeners();
    }
    
    register(keys, callback) {
        this.shortcuts[keys.join('+')] = callback;
    }
    
    setupListeners() {
        document.addEventListener('keydown', (e) => {
            const keys = [];
            if (e.ctrlKey) keys.push('Ctrl');
            if (e.shiftKey) keys.push('Shift');
            if (e.altKey) keys.push('Alt');
            if (e.metaKey) keys.push('Meta');
            keys.push(e.key);
            
            const keyCombo = keys.join('+');
            if (this.shortcuts[keyCombo]) {
                e.preventDefault();
                this.shortcuts[keyCombo]();
            }
        });
    }
}

// Usage
const shortcuts = new KeyboardShortcuts();
shortcuts.register(['Ctrl', 's'], () => save());
shortcuts.register(['Ctrl', 'z'], () => undo());
shortcuts.register(['Ctrl', 'Shift', 'z'], () => redo());
shortcuts.register(['Escape'], () => closeModal());
Dropdown Keyboard Navigation
javascript
class KeyboardDropdown {
    constructor(inputId, listId, items) {
        this.input = document.getElementById(inputId);
        this.list = document.getElementById(listId);
        this.items = items;
        this.filteredItems = [...items];
        this.highlightedIndex = -1;
        
        this.setupEvents();
    }
    
    setupEvents() {
        this.input.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigate(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigate(-1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    this.selectCurrent();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
            }
        });
        
        this.input.addEventListener('input', (e) => {
            this.filter(e.target.value);
            this.open();
        });
    }
    
    navigate(direction) {
        if (!this.isOpen) return;
        
        this.highlightedIndex = Math.max(0, Math.min(
            this.filteredItems.length - 1,
            this.highlightedIndex + direction
        ));
        
        this.updateHighlight();
        this.scrollToHighlighted();
    }
    
    selectCurrent() {
        if (this.highlightedIndex >= 0 && this.filteredItems[this.highlightedIndex]) {
            this.select(this.filteredItems[this.highlightedIndex]);
        }
    }
    
    filter(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredItems = this.items.filter(item => 
            item.toLowerCase().includes(term)
        );
        this.highlightedIndex = this.filteredItems.length > 0 ? 0 : -1;
        this.render();
    }
}
Preventing Default Behavior
javascript
// Prevent arrow key scrolling
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        // Handle navigation manually
    }
});

// Prevent space bar from scrolling page
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
    }
});

// Prevent Ctrl+S from saving page
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveApplication();
    }
});

// Prevent F5 refresh (not recommended - user expectation)
document.addEventListener('keydown', (e) => {
    if (e.key === 'F5') {
        e.preventDefault();
        console.log('Custom refresh handler');
    }
});
Key Values Reference
Modifier Keys
Key	event.key
Ctrl	'Control'
Shift	'Shift'
Alt	'Alt'
Meta (Cmd/Win)	'Meta'
Navigation Keys
Key	event.key
Up Arrow	'ArrowUp'
Down Arrow	'ArrowDown'
Left Arrow	'ArrowLeft'
Right Arrow	'ArrowRight'
Home	'Home'
End	'End'
Page Up	'PageUp'
Page Down	'PageDown'
Action Keys
Key	event.key
Enter	'Enter'
Escape	'Escape'
Tab	'Tab'
Backspace	'Backspace'
Delete	'Delete'
Space	' '
Function Keys
Key	event.key
F1-F12	'F1' through 'F12'
Key Code Reference
javascript
// event.code values (physical keys)
document.addEventListener('keydown', (e) => {
    console.log(e.code);
    // Letter keys: 'KeyA' through 'KeyZ'
    // Number keys: 'Digit0' through 'Digit9'
    // Numpad keys: 'Numpad0' through 'Numpad9'
    // Arrow keys: 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
    // Modifiers: 'ControlLeft', 'ShiftRight', 'AltLeft', 'MetaLeft'
});
Game Controls Pattern
javascript
class GameControls {
    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            Space: false
        };
        
        this.setupEvents();
    }
    
    setupEvents() {
        window.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                e.preventDefault();
                this.keys[e.key] = true;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = false;
            }
        });
    }
    
    update() {
        if (this.keys.ArrowUp) this.moveUp();
        if (this.keys.ArrowDown) this.moveDown();
        if (this.keys.ArrowLeft) this.moveLeft();
        if (this.keys.ArrowRight) this.moveRight();
        if (this.keys.Space) this.shoot();
    }
    
    moveUp() { /* ... */ }
    moveDown() { /* ... */ }
    moveLeft() { /* ... */ }
    moveRight() { /* ... */ }
    shoot() { /* ... */ }
}