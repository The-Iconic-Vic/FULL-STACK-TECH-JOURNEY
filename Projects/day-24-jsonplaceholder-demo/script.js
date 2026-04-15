// ============================================
// JSONPLACEHOLDER DEMO
// Demonstrating: fetch(), response.json(), async/await, error handling
// ============================================

const API_BASE = 'https://jsonplaceholder.typicode.com';

// DOM Elements
const postsContainer = document.getElementById('posts-container');
const userSelect = document.getElementById('user-select');
const userContainer = document.getElementById('user-container');
const tabBtns = document.querySelectorAll('.tab-btn');
const postsSection = document.getElementById('posts-section');
const usersSection = document.getElementById('users-section');

// ============================================
// TAB SWITCHING
// ============================================
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active section
        const tabId = btn.dataset.tab;
        if (tabId === 'posts') {
            postsSection.classList.add('active');
            usersSection.classList.remove('active');
        } else {
            postsSection.classList.remove('active');
            usersSection.classList.add('active');
        }
    });
});

// ============================================
// FETCH POSTS (GET request)
// ============================================
async function fetchPosts() {
    postsContainer.innerHTML = '<div class="loading">Loading posts...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/posts`);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        displayPosts(posts.slice(0, 5));  // Display first 5 posts
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.innerHTML = `<div class="error">Failed to load posts: ${error.message}</div>`;
    }
}

function displayPosts(posts) {
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="loading">No posts found.</div>';
        return;
    }
    
    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-title">${escapeHtml(post.title)}</div>
            <div class="post-body">${escapeHtml(post.body)}</div>
        </div>
    `).join('');
}

// ============================================
// FETCH USER (GET request with ID)
// ============================================
async function fetchUser(userId) {
    userContainer.innerHTML = '<div class="loading">Loading user...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        displayUser(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        userContainer.innerHTML = `<div class="error">Failed to load user: ${error.message}</div>`;
    }
}

function displayUser(user) {
    userContainer.innerHTML = `
        <div class="user-card">
            <div class="user-name">${escapeHtml(user.name)}</div>
            <div class="user-email">${escapeHtml(user.email)}</div>
            <div class="user-phone">${escapeHtml(user.phone)}</div>
            <div class="user-website">${escapeHtml(user.website)}</div>
            <div class="user-company">${escapeHtml(user.company.name)}</div>
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
// EVENT LISTENERS
// ============================================
userSelect.addEventListener('change', (e) => {
    fetchUser(e.target.value);
});

// ============================================
// INITIALIZATION
// ============================================
fetchPosts();
fetchUser(1);