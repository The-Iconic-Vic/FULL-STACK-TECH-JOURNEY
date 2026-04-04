// ============================================
// FEATURE 1: Button that changes text content
// ============================================

// Get references to elements
const textElement = document.getElementById('changeable-text');
const changeButton = document.getElementById('text-changer-btn');

// Array of different messages to cycle through
const messages = [
    "Hello! You clicked the button! 🎉",
    "JavaScript is awesome! 🚀",
    "You're learning to code! 💻",
    "Keep up the great work! ⭐",
    "Now try the other features! ✨"
];

let messageIndex = 0;

// Function to change the text
function changeText() {
    textElement.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
}

// Add click event listener to button
changeButton.addEventListener('click', changeText);


// ============================================
// FEATURE 2: Input that displays typed text
// ============================================

// Get references to elements
const liveInput = document.getElementById('live-input');
const displaySpan = document.getElementById('display-text');

// Function to update display when typing
function updateDisplay() {
    const typedText = liveInput.value;
    
    if (typedText === "") {
        displaySpan.textContent = "(nothing yet)";
    } else {
        displaySpan.textContent = typedText;
    }
}

// Add input event listener (fires on every keystroke)
liveInput.addEventListener('input', updateDisplay);


// ============================================
// FEATURE 3: Color changer on hover
// ============================================

// Get reference to color box
const colorBox = document.getElementById('color-box');

// Colors to cycle through
const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];

// Function to change to random color
function changeColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = randomColor;
}

// Add hover event listener
colorBox.addEventListener('mouseenter', changeColor);

// Optional: Reset color when mouse leaves
colorBox.addEventListener('mouseleave', function() {
    colorBox.style.backgroundColor = "#3498db";
});