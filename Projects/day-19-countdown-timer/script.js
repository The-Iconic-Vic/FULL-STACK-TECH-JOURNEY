// ============================================
// COUNTDOWN TIMER
// Demonstrating: setInterval(), clearInterval(), setTimeout()
// ============================================

// DOM Elements
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const minutesDisplay = document.getElementById('minutes-display');
const secondsDisplay = document.getElementById('seconds-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const statusMessage = document.getElementById('status-message');

// Timer variables
let timerInterval = null;
let remainingSeconds = 0;
let isRunning = false;

// ============================================
// HELPER FUNCTIONS
// ============================================

// Update the display with current remaining seconds
function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    minutesDisplay.textContent = String(mins).padStart(2, '0');
    secondsDisplay.textContent = String(secs).padStart(2, '0');
}

// Get total seconds from input fields
function getTotalSecondsFromInput() {
    const mins = parseInt(minutesInput.value) || 0;
    const secs = parseInt(secondsInput.value) || 0;
    return (mins * 60) + secs;
}

// Set remaining seconds from input fields
function setRemainingFromInput() {
    remainingSeconds = getTotalSecondsFromInput();
    updateDisplay();
}

// ============================================
// TIMER FUNCTIONS
// ============================================

// Start the countdown timer
function startTimer() {
    if (isRunning) return;
    
    // If timer is at 0, reset from input first
    if (remainingSeconds <= 0) {
        setRemainingFromInput();
        if (remainingSeconds <= 0) {
            statusMessage.textContent = 'Please enter a time greater than 0';
            return;
        }
    }
    
    isRunning = true;
    statusMessage.textContent = 'Timer running...';
    
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
            
            // Check if timer reached zero
            if (remainingSeconds === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                statusMessage.textContent = 'Time is up! 🎉';
                
                // Play beep sound using setTimeout
                beep();
            }
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    statusMessage.textContent = 'Paused';
}

// Reset the timer
function resetTimer() {
    // Stop the timer if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
    }
    
    // Reset to input values
    setRemainingFromInput();
    statusMessage.textContent = 'Reset';
    
    // Clear status after 1 second
    setTimeout(() => {
        if (statusMessage.textContent === 'Reset') {
            statusMessage.textContent = 'Ready';
        }
    }, 1000);
}

// Beep sound effect using setTimeout
function beep() {
    // Create beep using Web Audio API (simple)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        
        // Stop after 0.5 seconds using setTimeout
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 500);
    } catch (error) {
        // Fallback: console log
        console.log('TIME IS UP!');
    }
    
    // Also show an alert (but don't block)
    setTimeout(() => {
        alert('Time is up!');
    }, 50);
}

// ============================================
// EVENT LISTENERS
// ============================================
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Update display when input changes
minutesInput.addEventListener('input', () => {
    if (!isRunning) {
        setRemainingFromInput();
    }
});

secondsInput.addEventListener('input', () => {
    if (!isRunning) {
        setRemainingFromInput();
    }
});

// ============================================
// INITIALIZATION
// ============================================
setRemainingFromInput();