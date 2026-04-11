// ============================================
// DRAWING BOARD
// Demonstrating: mousedown, mousemove, mouseup, mouseleave
// ============================================

// DOM Elements
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const clearBtn = document.getElementById('clear-btn');
const eraserBtn = document.getElementById('eraser-btn');

// Drawing state
let isDrawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;

// Set canvas size (accounting for device pixel ratio)
function setupCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Set default drawing styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize.value;
    ctx.strokeStyle = colorPicker.value;
}

// Draw line between two points
function draw(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Get mouse coordinates relative to canvas
function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if (e.touches) {
        // Touch event
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        // Mouse event
        clientX = e.clientX;
        clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    return { x, y };
}

// ============================================
// DRAWING EVENT HANDLERS
// ============================================

// Start drawing
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCoordinates(e);
    lastX = x;
    lastY = y;
    
    // Draw a dot when clicking without moving
    ctx.beginPath();
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Draw while moving
function drawMove(e) {
    if (!isDrawing) return;
    
    e.preventDefault();
    
    const { x, y } = getCoordinates(e);
    
    draw(lastX, lastY, x, y);
    
    lastX = x;
    lastY = y;
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// ============================================
// SETTINGS & CONTROLS
// ============================================

// Update brush size
function updateBrushSize() {
    ctx.lineWidth = brushSize.value;
}

// Update brush color
function updateColor() {
    if (isErasing) {
        toggleEraser();
    }
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = colorPicker.value;
}

// Toggle eraser mode
function toggleEraser() {
    isErasing = !isErasing;
    
    if (isErasing) {
        // Save current color before switching to eraser
        eraserBtn.classList.add('active');
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';
    } else {
        eraserBtn.classList.remove('active');
        ctx.strokeStyle = colorPicker.value;
        ctx.fillStyle = colorPicker.value;
    }
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawMove);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', drawMove);
canvas.addEventListener('touchend', stopDrawing);

// Prevent default touch scrolling on canvas
canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        e.preventDefault();
    }
});

// Controls
brushSize.addEventListener('input', updateBrushSize);
colorPicker.addEventListener('input', updateColor);
clearBtn.addEventListener('click', clearCanvas);
eraserBtn.addEventListener('click', toggleEraser);

// ============================================
// INITIALIZATION
// ============================================
setupCanvas();
window.addEventListener('resize', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setupCanvas();
    ctx.putImageData(imageData, 0, 0);
});