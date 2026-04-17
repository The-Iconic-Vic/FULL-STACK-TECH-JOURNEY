// ============================================
// FEEDBACK SYSTEM - POST REQUEST WITH OFFLINE QUEUE
// Demonstrating: POST requests, form handling, offline queue
// ============================================

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const form = document.getElementById('feedback-form');
const messageContainer = document.getElementById('message-container');
const messageContent = document.getElementById('message-content');
const submitBtn = document.querySelector('.submit-btn');
const offlineQueueDiv = document.getElementById('offline-queue');
const pendingCountSpan = document.getElementById('pending-count');
const retryQueueBtn = document.getElementById('retry-queue');
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');

// Offline queue array
let pendingFeedback = [];

// ============================================
// LOAD PENDING FEEDBACK FROM LOCALSTORAGE
// ============================================
function loadPendingFeedback() {
    const saved = localStorage.getItem('pendingFeedback');
    if (saved) {
        pendingFeedback = JSON.parse(saved);
        updateQueueUI();
    }
}

function savePendingFeedback() {
    localStorage.setItem('pendingFeedback', JSON.stringify(pendingFeedback));
    updateQueueUI();
}

function updateQueueUI() {
    if (pendingFeedback.length > 0) {
        offlineQueueDiv.classList.remove('hidden');
        pendingCountSpan.textContent = pendingFeedback.length;
    } else {
        offlineQueueDiv.classList.add('hidden');
    }
}

// ============================================
// ADD TO QUEUE
// ============================================
function addToQueue(feedback) {
    pendingFeedback.push({
        ...feedback,
        timestamp: Date.now(),
        id: Date.now()
    });
    savePendingFeedback();
}

// ============================================
// REMOVE FROM QUEUE
// ============================================
function removeFromQueue(index) {
    pendingFeedback.splice(index, 1);
    savePendingFeedback();
}

// ============================================
// SEND FEEDBACK TO API
// ============================================
async function sendFeedback(feedback) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: feedback.name,
            email: feedback.email,
            rating: feedback.rating,
            comment: feedback.comment,
            timestamp: feedback.timestamp
        })
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
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        rating: parseInt(ratingInput.value),
        comment: document.getElementById('comment').value.trim(),
        timestamp: Date.now()
    };
}

// ============================================
// VALIDATE FORM
// ============================================
function validateForm(data) {
    if (!data.name) throw new Error('Name is required');
    if (!data.email) throw new Error('Email is required');
    if (!data.email.includes('@')) throw new Error('Valid email is required');
    if (!data.rating || data.rating < 1 || data.rating > 5) throw new Error('Rating is required');
    if (!data.comment) throw new Error('Feedback comment is required');
    return true;
}

// ============================================
// RESET FORM
// ============================================
function resetForm() {
    form.reset();
    stars.forEach(star => star.classList.remove('active'));
    ratingInput.value = '';
}

// ============================================
// SHOW MESSAGE
// ============================================
function showMessage(message, type = 'success') {
    messageContainer.classList.remove('hidden', 'success', 'error', 'loading');
    messageContainer.classList.add(type);
    messageContent.textContent = message;
    
    setTimeout(() => {
        if (messageContainer.classList.contains(type)) {
            messageContainer.classList.add('hidden');
        }
    }, 5000);
}

function showLoading() {
    messageContainer.classList.remove('hidden', 'success', 'error');
    messageContainer.classList.add('loading');
    messageContent.textContent = '⏳ Sending feedback...';
    submitBtn.disabled = true;
}

function hideLoading() {
    submitBtn.disabled = false;
    messageContainer.classList.add('hidden');
}

// ============================================
// PROCESS QUEUE
// ============================================
async function processQueue() {
    if (pendingFeedback.length === 0) return;
    
    showMessage('Processing pending feedback...', 'loading');
    
    for (let i = pendingFeedback.length - 1; i >= 0; i--) {
        const feedback = pendingFeedback[i];
        try {
            await sendFeedback(feedback);
            removeFromQueue(i);
            showMessage(`Feedback from "${feedback.name}" sent successfully!`, 'success');
        } catch (error) {
            console.error('Queue item failed:', error);
        }
    }
    
    hideLoading();
}

// ============================================
// STAR RATING SETUP
// ============================================
function setupStarRating() {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            ratingInput.value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
        
        star.addEventListener('mouseleave', () => {
            const currentRating = parseInt(ratingInput.value) || 0;
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
    });
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
        
        await sendFeedback(formData);
        
        showMessage('Thank you for your feedback! ✅', 'success');
        resetForm();
        
    } catch (error) {
        console.error('Error:', error);
        
        // Save to offline queue
        const formData = getFormData();
        addToQueue(formData);
        
        showMessage(`Offline: Your feedback has been saved. Will retry when online. (${pendingFeedback.length} pending)`, 'error');
        
    } finally {
        hideLoading();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
form.addEventListener('submit', handleSubmit);
retryQueueBtn.addEventListener('click', processQueue);

// ============================================
// INITIALIZATION
// ============================================
setupStarRating();
loadPendingFeedback();

// Check online status and process queue when back online
window.addEventListener('online', () => {
    if (pendingFeedback.length > 0) {
        processQueue();
    }
});