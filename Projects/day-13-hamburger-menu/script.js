// ============================================
// HAMBURGER MENU TOGGLE
// ============================================

// Get DOM elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

// Function to toggle the menu
function toggleMenu() {
    // Toggle the 'active' class on nav-links
    navLinks.classList.toggle('active');
    
    // Optional: Animate hamburger icon (X transformation)
    const spans = hamburgerBtn.querySelectorAll('span');
    
    if (navLinks.classList.contains('active')) {
        // Menu is open - transform hamburger to X
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        // Menu is closed - revert to hamburger
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Function to close menu (when link is clicked)
function closeMenu() {
    navLinks.classList.remove('active');
    
    // Reset hamburger icon
    const spans = hamburgerBtn.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Add click event listener to hamburger button
hamburgerBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked (good UX)
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Optional: Close menu when clicking outside (on window)
// This is a nice touch but not required for the mini-project
window.addEventListener('click', (event) => {
    // Check if click is outside navbar and menu is open
    if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Note: When window is resized past mobile breakpoint,
// the menu will automatically reset due to CSS media query.
// This is handled by CSS, not JavaScript.