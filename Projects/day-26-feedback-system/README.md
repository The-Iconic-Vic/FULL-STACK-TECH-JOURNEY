# Feedback System - Day 26 Project

## Project Overview
A complete feedback submission system with POST requests, star rating, loading states, and offline queue for failed submissions.

## Skills Practiced
- `fetch()` with POST method
- Form data collection and validation
- Star rating UI with JavaScript
- Loading and error states
- Offline queue with localStorage
- Online/offline detection

## File Structure
day-26-feedback-system/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | Description |
|---------|-------------|
| Star Rating | Interactive 1-5 star rating |
| Form Validation | Client-side validation |
| POST Request | Sends data to API |
| Loading State | Visual feedback during submission |
| Offline Queue | Saves feedback if submission fails |
| Retry | Process pending feedback when online |

## Key Code Patterns

```javascript
// POST request with error handling
async function sendFeedback(feedback) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
    });
    if (!response.ok) throw new Error('Failed');
    return await response.json();
}

// Offline queue with localStorage
function addToQueue(feedback) {
    pendingFeedback.push(feedback);
    localStorage.setItem('pendingFeedback', JSON.stringify(pendingFeedback));
}

// Online detection
window.addEventListener('online', () => {
    processQueue();
});
Data Flow
User fills form and submits

Form data is validated

POST request sent to API

On success → Show success message

On failure → Save to localStorage queue

When back online → Retry pending feedback