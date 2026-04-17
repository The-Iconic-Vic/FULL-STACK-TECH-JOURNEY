# 📘 POST Requests Reference

## What is a POST Request?

POST is an HTTP method used to send data to a server to create a new resource. Unlike GET requests (which retrieve data), POST requests send data to the server.

```javascript
// GET - Reading data
const posts = await fetch('/api/posts');

// POST - Creating data
const newPost = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New Post', body: 'Content' })
});
POST Request Anatomy
javascript
const response = await fetch(url, {
    method: 'POST',                    // HTTP method
    headers: {                         // Request headers
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify(data)         // Request body (stringified)
});
Components
Component	Description	Required
method: 'POST'	Specifies HTTP method	✅ Yes
headers	Metadata about the request	✅ Yes (for JSON)
body	The data being sent	✅ Yes
Setting Headers
Common Headers for POST
Header	Value	Use Case
Content-Type	application/json	Sending JSON data
Content-Type	application/x-www-form-urlencoded	HTML form data
Content-Type	multipart/form-data	File uploads
Accept	application/json	Expecting JSON response
Authorization	Bearer token	Authenticated requests
javascript
// JSON data
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
});

// Form data (URL encoded)
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'name=Victor&age=25'
});

// File upload (no manual Content-Type needed)
const formData = new FormData();
formData.append('file', fileInput.files[0]);
fetch(url, {
    method: 'POST',
    body: formData
});
Sending Different Data Types
JSON Data
javascript
async function sendJSON(data) {
    const response = await fetch('https://api.example.com/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Usage
await sendJSON({ name: 'Victor', age: 25 });
Form Data (URL Encoded)
javascript
async function sendFormData(data) {
    const formBody = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    
    const response = await fetch('https://api.example.com/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
    });
    return await response.json();
}
Multipart Form Data (Files)
javascript
async function uploadFile(file, metadata) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', metadata.name);
    formData.append('description', metadata.description);
    
    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData  // Content-Type set automatically
    });
    return await response.json();
}
Handling POST Responses
Success Response
javascript
async function createPost(postData) {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    const created = await response.json();
    console.log('Created post ID:', created.id);
    return created;
}
Error Handling
javascript
async function submitForm(data) {
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            // Try to get error message from response
            const error = await response.json();
            throw new Error(error.message || `HTTP ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Network error - check your connection');
        }
        throw error;
    }
}
Response Status Codes
Code	Meaning	Handling
200	OK	Success, read response
201	Created	Resource created, get ID from response
400	Bad Request	Invalid data, show validation errors
401	Unauthorized	Need authentication
403	Forbidden	No permission
422	Unprocessable Entity	Validation failed
500	Server Error	Try again later
Complete POST Request Example
javascript
class PostClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async createPost(postData) {
        // Validate data before sending
        this.validatePost(postData);
        
        // Show loading state
        this.showLoading();
        
        try {
            const response = await fetch(`${this.baseURL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            const created = await response.json();
            this.showSuccess(`Post created with ID: ${created.id}`);
            return created;
            
        } catch (error) {
            this.showError(error.message);
            throw error;
            
        } finally {
            this.hideLoading();
        }
    }
    
    validatePost(data) {
        if (!data.title) throw new Error('Title required');
        if (!data.body) throw new Error('Body required');
        if (!data.userId) throw new Error('User ID required');
    }
    
    showLoading() {
        console.log('⏳ Submitting...');
    }
    
    showSuccess(message) {
        console.log('✅', message);
    }
    
    showError(message) {
        console.error('❌', message);
    }
    
    hideLoading() {
        console.log('Done');
    }
}

// Usage
const client = new PostClient('https://jsonplaceholder.typicode.com');
await client.createPost({
    title: 'My Post',
    body: 'Content here',
    userId: 1
});
Testing POST Requests
JSONPlaceholder (Fake API)
javascript
// JSONPlaceholder accepts POST requests for testing
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Test Post',
        body: 'This is a test',
        userId: 1
    })
});

const result = await response.json();
console.log(result);  // Returns with fake ID (101)
RequestBin (Capture Requests)
javascript
// Create a bin at https://requestbin.com
const response = await fetch('https://your-bin-url.requestbin.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: 'data' })
});
// View captured requests in RequestBin dashboard
Mock Service Worker (Local Testing)
javascript
// Mock POST response for testing
const mockPost = async (url, options) => {
    if (url === '/api/posts' && options.method === 'POST') {
        const body = JSON.parse(options.body);
        return {
            ok: true,
            json: async () => ({
                id: 999,
                ...body,
                createdAt: new Date().toISOString()
            })
        };
    }
    return fetch(url, options);
};

// Use mock in development
window.fetch = mockPost;
