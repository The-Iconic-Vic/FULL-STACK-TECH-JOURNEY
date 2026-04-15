# 📘 Fetch API Reference

## What is Fetch?

Fetch is a modern JavaScript API for making HTTP requests. It replaces the older `XMLHttpRequest` with a more powerful and flexible promise-based interface.

```javascript
// Basic fetch
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// With async/await (recommended)
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
Fetch Syntax
javascript
fetch(resource, options)
Parameter	Description
resource	URL string or Request object
options	Optional configuration object
javascript
// Basic GET
fetch('https://api.example.com/data');

// With options
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify({ name: 'Victor' })
});
Fetch Options
method
HTTP method to use.

javascript
fetch(url, { method: 'GET' });    // Read
fetch(url, { method: 'POST' });   // Create
fetch(url, { method: 'PUT' });    // Update
fetch(url, { method: 'DELETE' }); // Delete
fetch(url, { method: 'PATCH' });  // Partial update
headers
HTTP headers to send.

javascript
fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
body
Data to send with request (for POST, PUT, PATCH).

javascript
// JSON body
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Victor', age: 25 })
});

// Form data
const formData = new FormData();
formData.append('name', 'Victor');
formData.append('file', fileInput.files[0]);

fetch(url, {
    method: 'POST',
    body: formData
});

// URL encoded
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'name=Victor&age=25'
});
mode
CORS settings.

javascript
fetch(url, { mode: 'cors' });       // Allow cross-origin (default)
fetch(url, { mode: 'no-cors' });    // Limited response
fetch(url, { mode: 'same-origin' }); // Same origin only
credentials
Cookie handling.

javascript
fetch(url, { credentials: 'omit' });      // No cookies (default)
fetch(url, { credentials: 'same-origin' }); // Same origin only
fetch(url, { credentials: 'include' });    // Include cross-origin
cache
Cache behavior.

javascript
fetch(url, { cache: 'default' });     // Browser default
fetch(url, { cache: 'no-store' });    // Don't cache
fetch(url, { cache: 'reload' });      // Always fetch fresh
fetch(url, { cache: 'force-cache' }); // Use cache if available
Response Object
Response Properties
Property	Description
response.ok	True if status 200-299
response.status	HTTP status code (200, 404, 500, etc.)
response.statusText	Status message ("OK", "Not Found")
response.headers	Headers object
response.url	Response URL
response.redirected	True if response was redirected
response.type	Response type ("basic", "cors", "error")
Response Methods
Method	Description
response.json()	Parse response as JSON
response.text()	Parse response as text
response.blob()	Parse response as Blob (images, files)
response.arrayBuffer()	Parse as ArrayBuffer
response.formData()	Parse as FormData
response.clone()	Clone response (can only read once)
javascript
const response = await fetch(url);

// Check success
if (response.ok) {
    const data = await response.json();
}

// Check status
if (response.status === 404) {
    console.log('Not found');
}

// Get headers
const contentType = response.headers.get('Content-Type');
const rateLimit = response.headers.get('X-RateLimit-Remaining');

// Clone for multiple reads
const responseClone = response.clone();
const json = await response.json();
const text = await responseClone.text();
HTTP Status Codes
Code	Name	Description
200	OK	Success
201	Created	Resource created
204	No Content	Success, no response body
301	Moved Permanently	Resource moved
304	Not Modified	Cached version valid
400	Bad Request	Invalid request
401	Unauthorized	Authentication required
403	Forbidden	No permission
404	Not Found	Resource doesn't exist
429	Too Many Requests	Rate limited
500	Internal Server Error	Server error
503	Service Unavailable	Server down
javascript
async function handleResponse(response) {
    switch(response.status) {
        case 200:
        case 201:
            return await response.json();
        case 400:
            throw new Error('Bad request - check your data');
        case 401:
            throw new Error('Please log in');
        case 403:
            throw new Error('You don\'t have permission');
        case 404:
            throw new Error('Resource not found');
        case 429:
            throw new Error('Too many requests - try again later');
        case 500:
            throw new Error('Server error - try again later');
        default:
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
}
Error Handling
Network Errors vs HTTP Errors
javascript
async function robustFetch(url) {
    try {
        const response = await fetch(url);
        
        // HTTP error (response received but failed)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
        
    } catch (error) {
        // Network error (offline, DNS, CORS)
        if (error.name === 'TypeError') {
            console.error('Network error - check your connection');
        } else {
            console.error('Fetch failed:', error.message);
        }
        throw error;
    }
}
Retry Logic
javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) return await response.json();
            if (response.status >= 500) {
                // Server error - retry
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            // Client error - don't retry
            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
Common Patterns
GET Request with Query Parameters
javascript
function buildURL(base, params) {
    const url = new URL(base);
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    return url;
}

async function searchUsers(query, limit = 10) {
    const url = buildURL('https://api.example.com/users', {
        q: query,
        limit: limit
    });
    
    const response = await fetch(url);
    return await response.json();
}
POST Request with JSON
javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    
    return await response.json();
}
PUT Request (Update)
javascript
async function updateUser(id, userData) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    return await response.json();
}
DELETE Request
javascript
async function deleteUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE'
    });
    
    if (response.status === 204) {
        return true; // Success, no content
    }
    
    return response.ok;
}
File Upload
javascript
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData
    });
    
    return await response.json();
}
Download Image
javascript
async function loadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    const img = document.createElement('img');
    img.src = imageUrl;
    document.body.appendChild(img);
    
    return img;
}
Timeout Implementation
javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), ms);
    });
}

async function fetchWithTimeout(url, ms = 5000) {
    try {
        const response = await Promise.race([
            fetch(url),
            timeout(ms)
        ]);
        return await response.json();
    } catch (error) {
        console.error('Fetch failed or timed out:', error);
        throw error;
    }
}
AbortController (Cancel Requests)
javascript
const controller = new AbortController();
const signal = controller.signal;

// Start request
fetch(url, { signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Request cancelled');
        }
    });

// Cancel request
controller.abort();

// Timeout with abort
function fetchWithAbortTimeout(url, ms) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);
    
    return fetch(url, { signal: controller.signal })
        .then(response => response.json())
        .finally(() => clearTimeout(timeoutId));
}
Testing with Mock Fetch
javascript
// Mock fetch for testing
function mockFetch(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                json: async () => ({ data: 'mocked data' })
            });
        }, 100);
    });
}

// Replace global fetch for testing
global.fetch = mockFetch;