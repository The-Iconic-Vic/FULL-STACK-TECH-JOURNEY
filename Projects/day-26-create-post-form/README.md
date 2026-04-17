# Create Post Form - Day 26 Project

## Project Overview
A form that sends POST requests to JSONPlaceholder API to create new posts, demonstrating how to send data to servers.

## Skills Practiced
- `fetch()` with POST method
- Setting request headers (`Content-Type: application/json`)
- Sending JSON data in request body
- Form data collection and validation
- Handling API responses
- Loading and error states

## File Structure
day-26-create-post-form/
├── index.html
├── style.css
├── script.js
└── README.md

text

## POST Request Anatomy

```javascript
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'Post Title',
        body: 'Post content',
        userId: 1
    })
});
Features
Feature	Description
Form validation	Client-side validation before sending
POST request	Sends data to JSONPlaceholder
Loading state	Disables button during request
Success display	Shows API response with new post ID
Error handling	Displays validation or network errors
Key Code Patterns
javascript
// POST request with JSON body
async function createPost(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Prevent default form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = getFormData();
    const result = await createPost(formData);
});
API Endpoint
Method	Endpoint	Purpose
POST	https://jsonplaceholder.typicode.com/posts	Create new post