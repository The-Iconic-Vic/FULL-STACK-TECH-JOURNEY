// ============================================
// RANDOM USER GENERATOR
// Demonstrating: fetch() with external API, loading states, error handling
// ============================================

const API_URL = 'https://randomuser.me/api/';

// DOM Elements
const userCard = document.getElementById('user-card');
const newUserBtn = document.getElementById('new-user-btn');

// ============================================
// FETCH RANDOM USER
// ============================================
async function fetchRandomUser() {
    // Show loading state
    setLoadingState();
    newUserBtn.disabled = true;
    
    try {
        const response = await fetch(API_URL);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const user = data.results[0];
        displayUser(user);
        
    } catch (error) {
        console.error('Error fetching user:', error);
        setErrorState(error.message);
    } finally {
        newUserBtn.disabled = false;
    }
}

// ============================================
// DISPLAY USER DATA
// ============================================
function displayUser(user) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const email = user.email;
    const location = `${user.location.city}, ${user.location.country}`;
    const phone = user.phone;
    const dob = new Date(user.dob.date).toLocaleDateString();
    const avatar = user.picture.large;
    
    userCard.innerHTML = `
        <img class="user-avatar" src="${avatar}" alt="${fullName}">
        <div class="user-name">${escapeHtml(fullName)}</div>
        <div class="user-email">${escapeHtml(email)}</div>
        <div class="user-location">📍 ${escapeHtml(location)}</div>
        <div class="user-phone">📞 ${escapeHtml(phone)}</div>
        <div class="user-dob">🎂 Born: ${dob}</div>
    `;
}

// ============================================
// LOADING STATE
// ============================================
function setLoadingState() {
    userCard.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading random user...</p>
        </div>
    `;
}

// ============================================
// ERROR STATE
// ============================================
function setErrorState(errorMessage) {
    userCard.innerHTML = `
        <div class="error-message">
            <p>❌ Failed to load user</p>
            <p style="font-size: 0.75rem;">${escapeHtml(errorMessage)}</p>
            <p>Please try again</p>
        </div>
    `;
}

// ============================================
// HELPER: Escape HTML to prevent XSS
// ============================================
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================
// DEMO: Fetch with different parameters
// ============================================
// Examples of how to customize the API call:
//
// Fetch multiple users: https://randomuser.me/api/?results=5
// Fetch only male: https://randomuser.me/api/?gender=male
// Fetch from specific nationality: https://randomuser.me/api/?nat=us,gb
// Fetch with seed for same user: https://randomuser.me/api/?seed=abc123

async function fetchMultipleUsers(count = 5) {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
    return data.results;
}

async function fetchUserByGender(gender) {
    const response = await fetch(`https://randomuser.me/api/?gender=${gender}`);
    const data = await response.json();
    return data.results[0];
}

// ============================================
// EVENT LISTENER
// ============================================
newUserBtn.addEventListener('click', fetchRandomUser);

// ============================================
// INITIALIZATION
// ============================================
fetchRandomUser();