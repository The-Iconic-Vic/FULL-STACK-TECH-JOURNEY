// ============================================
// DIGITAL CLOCK & STOPWATCH
// Demonstrating: Date object, setInterval(), clearInterval()
// ============================================

// ============================================
// DIGITAL CLOCK
// ============================================

const timeDisplay = document.getElementById('time-display');
const ampmDisplay = document.getElementById('ampm-display');
const dateDisplay = document.getElementById('date-display');
const dayDisplay = document.getElementById('day-display');
const formatToggle = document.getElementById('format-toggle');

let is12HourFormat = false;
let clockInterval = null;

// Day names array
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Month names array
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Update the clock
function updateClock() {
    const now = new Date();
    
    // Get time components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';
    
    if (is12HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
    }
    
    // Format time with leading zeros
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timeDisplay.textContent = timeString;
    if (is12HourFormat) {
        ampmDisplay.textContent = ampm;
    } else {
        ampmDisplay.textContent = '';
    }
    
    // Get date components
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    
    dateDisplay.textContent = `${monthNames[month]} ${date}, ${year}`;
    dayDisplay.textContent = daysOfWeek[day];
}

// Toggle between 12 and 24 hour format
function toggleFormat() {
    is12HourFormat = !is12HourFormat;
    formatToggle.textContent = is12HourFormat ? 'Switch to 24-Hour' : 'Switch to 12-Hour';
    updateClock();
}

// Start the clock (updates every second)
function startClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
}

// ============================================
// STOPWATCH
// ============================================

let stopwatchInterval = null;
let stopwatchRunning = false;
let stopwatchSeconds = 0;

const stopwatchDisplay = document.getElementById('stopwatch-display');
const swStartBtn = document.getElementById('stopwatch-start');
const swPauseBtn = document.getElementById('stopwatch-pause');
const swResetBtn = document.getElementById('stopwatch-reset');
const swLapBtn = document.getElementById('stopwatch-lap');
const lapList = document.getElementById('lap-list');

// Format stopwatch time (HH:MM:SS)
function formatStopwatchTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update stopwatch display
function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchSeconds);
}

// Start stopwatch
function startStopwatch() {
    if (stopwatchRunning) return;
    stopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        updateStopwatchDisplay();
    }, 1000);
}

// Pause stopwatch
function pauseStopwatch() {
    if (!stopwatchRunning) return;
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchRunning = false;
}

// Reset stopwatch
function resetStopwatch() {
    pauseStopwatch();
    stopwatchSeconds = 0;
    updateStopwatchDisplay();
    lapList.innerHTML = '';
}

// Record lap time
function recordLap() {
    if (!stopwatchRunning) return;
    const lapTime = formatStopwatchTime(stopwatchSeconds);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
    lapList.prepend(lapItem);
}

// ============================================
// EVENT LISTENERS
// ============================================
formatToggle.addEventListener('click', toggleFormat);
swStartBtn.addEventListener('click', startStopwatch);
swPauseBtn.addEventListener('click', pauseStopwatch);
swResetBtn.addEventListener('click', resetStopwatch);
swLapBtn.addEventListener('click', recordLap);

// ============================================
// INITIALIZATION
// ============================================
startClock();