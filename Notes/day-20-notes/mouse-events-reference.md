# 📘 Mouse Events Reference

## Mouse Event Types

| Event | Description | Bubbles | Use Case |
|-------|-------------|---------|----------|
| `click` | Element clicked (mousedown + mouseup) | Yes | General clicks |
| `dblclick` | Element double-clicked | Yes | Edit, open |
| `mousedown` | Mouse button pressed | Yes | Drawing, drag start |
| `mouseup` | Mouse button released | Yes | Drawing, drag end |
| `mousemove` | Mouse moves over element | Yes | Drawing, hover tracking |
| `mouseenter` | Mouse enters element | No | Hover effects |
| `mouseleave` | Mouse leaves element | No | Hover effects |
| `mouseover` | Mouse enters element (bubbles) | Yes | Less common |
| `mouseout` | Mouse leaves element (bubbles) | Yes | Less common |
| `contextmenu` | Right-click | Yes | Custom menu |

```javascript
// Basic usage
element.addEventListener('click', () => console.log('Clicked'));
element.addEventListener('dblclick', () => console.log('Double clicked'));
element.addEventListener('mousedown', () => console.log('Mouse down'));
element.addEventListener('mouseup', () => console.log('Mouse up'));
element.addEventListener('mousemove', (e) => console.log(`X: ${e.clientX}, Y: ${e.clientY}`));
element.addEventListener('mouseenter', () => console.log('Mouse entered'));
element.addEventListener('mouseleave', () => console.log('Mouse left'));
element.addEventListener('contextmenu', (e) => e.preventDefault());
Mouse Event Properties
Position Properties
Property	Description	Example
clientX/clientY	Position relative to viewport	e.clientX
pageX/pageY	Position relative to page (includes scroll)	e.pageY
offsetX/offsetY	Position relative to target element	e.offsetX
screenX/screenY	Position relative to screen	e.screenX
movementX/movementY	Movement since last event	e.movementX
javascript
element.addEventListener('click', (e) => {
    console.log(`Viewport: ${e.clientX}, ${e.clientY}`);
    console.log(`Page: ${e.pageX}, ${e.pageY}`);
    console.log(`Element: ${e.offsetX}, ${e.offsetY}`);
    console.log(`Screen: ${e.screenX}, ${e.screenY}`);
});
Button Properties
Property	Description
button	Which button pressed (0=left, 1=middle, 2=right)
buttons	Bitmask of buttons pressed (1=left, 2=right, 4=middle)
javascript
element.addEventListener('mousedown', (e) => {
    if (e.button === 0) console.log('Left click');
    if (e.button === 1) console.log('Middle click');
    if (e.button === 2) console.log('Right click');
});
Modifier Keys
Property	Description
ctrlKey	Ctrl key pressed
shiftKey	Shift key pressed
altKey	Alt key pressed
metaKey	Meta/Cmd key pressed
javascript
element.addEventListener('click', (e) => {
    if (e.ctrlKey) console.log('Ctrl + click');
    if (e.shiftKey) console.log('Shift + click');
    if (e.altKey) console.log('Alt + click');
});
Drawing Board Pattern
javascript
class DrawingBoard {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        
        this.setupCanvas();
        this.setupEvents();
    }
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#000000';
    }
    
    setupEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            const { x, y } = this.getCoordinates(e);
            this.lastX = x;
            this.lastY = y;
            
            // Draw dot on click
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.ctx.lineWidth / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            
            const { x, y } = this.getCoordinates(e);
            this.draw(this.lastX, this.lastY, x, y);
            this.lastX = x;
            this.lastY = y;
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });
    }
    
    getCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        return { x, y };
    }
    
    draw(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    
    setColor(color) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
    }
    
    setBrushSize(size) {
        this.ctx.lineWidth = size;
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
Drag and Drop Pattern
javascript
class Draggable {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.setupEvents();
    }
    
    setupEvents() {
        this.element.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            const rect = this.element.getBoundingClientRect();
            this.offsetX = e.clientX - rect.left;
            this.offsetY = e.clientY - rect.top;
            this.element.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            const x = e.clientX - this.offsetX;
            const y = e.clientY - this.offsetY;
            
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
            this.element.style.position = 'absolute';
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.element.style.cursor = 'grab';
        });
    }
}
mouseenter vs mouseover
javascript
// mouseenter does NOT bubble (recommended)
parent.addEventListener('mouseenter', () => {
    console.log('Parent entered (once)');
});

child.addEventListener('mouseenter', () => {
    console.log('Child entered');
});

// mouseover DOES bubble (can cause issues)
parent.addEventListener('mouseover', () => {
    console.log('Parent over (fires for children too!)');
});

child.addEventListener('mouseover', () => {
    console.log('Child over');
});
// Moving from child to parent triggers both!
Context Menu (Right-click)
javascript
// Prevent default context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Custom context menu
function showCustomMenu(x, y) {
    const menu = document.getElementById('custom-menu');
    menu.style.display = 'block';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
}

element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showCustomMenu(e.clientX, e.clientY);
});

// Hide menu on click
document.addEventListener('click', () => {
    document.getElementById('custom-menu').style.display = 'none';
});
Mobile Touch Events
javascript
// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getCoordinates(touch);
    startDrawing(x, y);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getCoordinates(touch);
    draw(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
});

canvas.addEventListener('touchend', () => {
    stopDrawing();
});