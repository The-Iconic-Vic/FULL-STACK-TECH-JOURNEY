// ============================================
// DARK MODE TOGGLE FUNCTIONALITY
// ============================================

// Get reference to the dark mode toggle button
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if user previously had dark mode preference
// (localStorage will be added later - Day 13)
const savedMode = localStorage.getItem('dark-mode');

// Apply saved preference on page load
if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Light Mode';
} else if (savedMode === 'light') {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙 Dark Mode';
}

// Function to toggle dark mode
function toggleDarkMode() {
    // Toggle the 'dark-mode' class on body
    document.body.classList.toggle('dark-mode');
    
    // Update button text based on current mode
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️ Light Mode';
        // Save preference (will be active after Day 13)
        // localStorage.setItem('dark-mode', 'dark');
    } else {
        darkModeToggle.textContent = '🌙 Dark Mode';
        // localStorage.setItem('dark-mode', 'light');
    }
}

// Add click event listener to the toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);

// Note: localStorage is commented out for now.
// It will be fully implemented on Day 13.