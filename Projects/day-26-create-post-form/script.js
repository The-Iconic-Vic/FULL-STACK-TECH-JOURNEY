// ============================================
// CREATE POST FORM - POST REQUEST DEMO
// Demonstrating: POST requests with fetch(), JSON body, headers
// ============================================

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const form = document.getElementById('post-form');
const responseContainer = document.getElementById('response-container');
const responseContent = document.getElementById('response-content');
const clearBtn = document.getElementById('clear-response');
const submitBtn = document.querySelector('.submit-btn');

// ============================================
// POST REQUEST FUNCTION
// ============================================
async function createPost(postData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// ============================================
// COLLECT FORM DATA
// ============================================
function getFormData() {
    return {
        title: document.getElementById('title').value.trim(),
        body: document.getElementById('body').value.trim(),
        userId: parseInt(document.getElementById('user-id').value)
    };
}

// ============================================
// VALIDATE FORM
// ============================================
function validateForm(data) {
    if (!data.title) {
        throw new Error('Title is required');
    }
    if (!data.body) {
        throw new Error('Body is required');
    }
    if (isNaN(data.userId) || data.userId < 1 || data.userId > 10) {
        throw new Error('User ID must be between 1 and 10');
    }
    return true;
}

// ============================================
// DISPLAY RESPONSE
// ============================================
function displayResponse(data, isError = false) {
    responseContainer.classList.remove('hidden');
    responseContent.classList.remove('success', 'error', 'loading');
    
    if (isError) {
        responseContent.classList.add('error');
        responseContent.innerHTML = `
            <strong>❌ Error:</strong><br>
            ${escapeHtml(data.message || data)}
        `;
    } else {
        responseContent.classList.add('success');
        responseContent.innerHTML = `
            <strong>✅ Post Created Successfully!</strong><br><br>
            <strong>Post ID:</strong> ${data.id}<br>
            <strong>User ID:</strong> ${data.userId}<br>
            <strong>Title:</strong> ${escapeHtml(data.title)}<br>
            <strong>Body:</strong> ${escapeHtml(data.body)}<br>
        `;
    }
}

function showLoading() {
    responseContainer.classList.remove('hidden');
    responseContent.classList.remove('success', 'error');
    responseContent.classList.add('loading');
    responseContent.innerHTML = '⏳ Sending data to server...';
    submitBtn.disabled = true;
}

function hideLoading() {
    submitBtn.disabled = false;
}

// ============================================
// RESET FORM
// ============================================
function resetForm() {
    form.reset();
    // Set default userId
    document.getElementById('user-id').value = '';
}

// ============================================
// HELPER: Escape HTML
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
// FORM SUBMIT HANDLER
// ============================================
async function handleSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = getFormData();
        validateForm(formData);
        
        showLoading();
        
        const response = await createPost(formData);
        
        displayResponse(response);
        resetForm();
        
    } catch (error) {
        console.error('Error:', error);
        displayResponse({ message: error.message }, true);
    } finally {
        hideLoading();
    }
}

// ============================================
// CLEAR RESPONSE
// ============================================
function clearResponse() {
    responseContainer.classList.add('hidden');
    responseContent.innerHTML = '';
}

// ============================================
// DEMO: PUT vs POST (Console)
// ============================================
console.log('=== POST vs PUT vs PATCH ===');
console.log('POST: Creates new resource (server assigns ID)');
console.log('PUT: Replaces entire resource (requires full data)');
console.log('PATCH: Partially updates resource');

// Example of PUT request (for reference)
async function updatePostExample(id, updatedData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });
    return await response.json();
}

// Example of DELETE request (for reference)
async function deletePostExample(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
}

// ============================================
// EVENT LISTENERS
// ============================================
form.addEventListener('submit', handleSubmit);
clearBtn.addEventListener('click', clearResponse);