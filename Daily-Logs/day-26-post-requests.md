# 📅 Day 26: POST Requests & Sending Data to APIs

**Date:** April 17, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** POST Requests, HTTP Methods, Form Handling, Offline Queue

---

## 📋 Learning Objectives

- ✅ Understand the anatomy of a POST request
- ✅ Set request headers (Content-Type)
- ✅ Send JSON data in the request body
- ✅ Handle responses from POST requests
- ✅ Prevent default form submission
- ✅ Collect and validate form data
- ✅ Implement offline queue for failed submissions

---

## 📡 Part 1: POST Requests with Fetch

### What is a POST Request?

POST is an HTTP method used to send data to a server to create a new resource.

```
GET  → Read data (retrieve)
POST → Create data (submit)
PUT  → Update data (replace)
DELETE → Delete data
```

### POST Request Anatomy

```javascript
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        key: 'value'
    })
});
```

**Components:**
| Component | Description |
|-----------|-------------|
| `method: 'POST'` | Specifies HTTP method |
| `headers` | Tells server what type of data we're sending |
| `body` | The actual data being sent (must be stringified) |

---

### Sending JSON Data

```javascript
async function createPost(postData) {
    const response = await fetch('https://api.example.com/posts', {
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

// Usage
const newPost = {
    title: 'My First Post',
    body: 'This is the content',
    userId: 1
};

const created = await createPost(newPost);
console.log('Created post ID:', created.id);
```

---

### Common Headers for POST Requests

| Header | Value | When to Use |
|--------|-------|-------------|
| `Content-Type` | `application/json` | Sending JSON data |
| `Content-Type` | `application/x-www-form-urlencoded` | HTML form data |
| `Content-Type` | `multipart/form-data` | File uploads |
| `Authorization` | `Bearer token123` | Authenticated requests |

```javascript
// JSON data
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

// Form data (URL encoded)
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'name=Victor&age=25'
});

// Form data (multipart - for files)
const formData = new FormData();
formData.append('name', 'Victor');
formData.append('avatar', fileInput.files[0]);

fetch(url, {
    method: 'POST',
    body: formData  // Content-Type set automatically
});
```

---

## 📝 Part 2: Working with Forms

### Preventing Default Form Submission

By default, form submission causes a page reload. We need to prevent this.

```javascript
form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevents page reload
    
    // Handle form submission
    const formData = getFormData();
    await submitToAPI(formData);
});
```

### Collecting Form Data

**Method 1: Manual collection**
```javascript
function getFormData() {
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
}
```

**Method 2: FormData API**
```javascript
function getFormData(formElement) {
    const formData = new FormData(formElement);
    return Object.fromEntries(formData.entries());
}
```

**Method 3: FormData with custom fields**
```javascript
const formData = new FormData();
formData.append('name', 'Victor');
formData.append('email', 'victor@example.com');
```

---

### Form Validation

```javascript
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!data.email || !data.email.includes('@')) {
        errors.push('Valid email is required');
    }
    
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    
    return true;
}
```

---

### Complete Form Submission Pattern

```javascript
class FormHandler {
    constructor(formId, apiUrl) {
        this.form = document.getElementById(formId);
        this.apiUrl = apiUrl;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = this.getFormData();
            this.validateForm(formData);
            this.showLoading();
            
            const response = await this.submitToAPI(formData);
            this.showSuccess(response);
            this.resetForm();
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    getFormData() {
        return {
            name: this.form.querySelector('#name').value,
            email: this.form.querySelector('#email').value
        };
    }
    
    validateForm(data) {
        if (!data.name) throw new Error('Name required');
        if (!data.email) throw new Error('Email required');
    }
    
    async submitToAPI(data) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Submission failed');
        return await response.json();
    }
    
    showLoading() {
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Submitting...';
    }
    
    showSuccess(response) {
        // Show success message
    }
    
    showError(message) {
        // Show error message
    }
    
    resetForm() {
        this.form.reset();
    }
}
```

---

## 🔧 Part 3: Other HTTP Methods

### PUT Request (Full Update)

PUT replaces an entire resource.

```javascript
async function updatePost(id, postData) {
    const response = await fetch(`https://api.example.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)  // Must include ALL fields
    });
    return await response.json();
}
```

**Important:** PUT requires the complete resource. Missing fields may be deleted.

---

### PATCH Request (Partial Update)

PATCH updates only the fields provided.

```javascript
async function patchPost(id, updates) {
    const response = await fetch(`https://api.example.com/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type':application/json' },
        body: JSON.stringify(updates)  // Only fields to change
    });
    return await response.json();
}

// Usage - only update the title
await patchPost(1, { title: 'New Title' });
```

---

### DELETE Request

```javascript
async function deletePost(id) {
    const response = await fetch(`https://api.example.com/posts/${id}`, {
        method: 'DELETE'
    });
    
    if (response.status === 204) {
        return true;  // Success, no content
    }
    
    return response.ok;
}
```

---

### HTTP Methods Comparison

| Method | Purpose | Body | Idempotent | Use Case |
|--------|---------|------|------------|----------|
| GET | Read | No | Yes | Fetching data |
| POST | Create | Yes | No | Submitting forms |
| PUT | Replace | Yes | Yes | Full update |
| PATCH | Partial update | Yes | No | Edit fields |
| DELETE | Remove | Maybe | Yes | Delete resource |

---

## 💾 Part 4: Offline Queue Pattern

### Saving Failed Submissions

```javascript
let pendingQueue = [];

function addToQueue(data) {
    pendingQueue.push({
        ...data,
        timestamp: Date.now(),
        id: Date.now()
    });
    localStorage.setItem('pendingQueue', JSON.stringify(pendingQueue));
}

async function submitWithQueue(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Failed');
        return await response.json();
        
    } catch (error) {
        // Save to queue if submission fails
        addToQueue(data);
        throw new Error('Saved offline. Will retry when online.');
    }
}
```

### Processing Queue When Online

```javascript
async function processQueue() {
    const saved = localStorage.getItem('pendingQueue');
    if (!saved) return;
    
    const queue = JSON.parse(saved);
    
    for (let i = queue.length - 1; i >= 0; i--) {
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(queue[i])
            });
            queue.splice(i, 1);
        } catch (error) {
            console.error('Queue item failed:', error);
        }
    }
    
    localStorage.setItem('pendingQueue', JSON.stringify(queue));
}

// Listen for online event
window.addEventListener('online', () => {
    processQueue();
});
```

---

## 📝 Quick Reference

### POST Request Template
```javascript
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
}
```

### Form Submit Handler
```javascript
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const result = await postData('/api/submit', data);
        showSuccess('Submitted!');
        form.reset();
    } catch (error) {
        showError(error.message);
    }
});
```

### PUT vs PATCH
```javascript
// PUT - Full replacement
await fetch('/api/users/1', {
    method: 'PUT',
    body: JSON.stringify({ name: 'Victor', email: 'new@email.com' })
});

// PATCH - Partial update
await fetch('/api/users/1', {
    method: 'PATCH',
    body: JSON.stringify({ name: 'Victor' })
});
```

---

## ✅ Day 26 Checklist

- [ ] Understand POST request anatomy
- [ ] Set `Content-Type: application/json` header
- [ ] Stringify JSON body with `JSON.stringify()`
- [ ] Handle POST responses
- [ ] Prevent default form submission with `e.preventDefault()`
- [ ] Collect form data as object
- [ ] Validate form data before sending
- [ ] Show loading states during submission
- [ ] Implement PUT, PATCH, DELETE requests
- [ ] Build Create Post Form project
- [ ] Build Feedback System with offline queue
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **POST creates new resources** — server typically assigns an ID
2. **Always set `Content-Type: application/json`** when sending JSON
3. **Use `JSON.stringify()`** to convert objects to JSON strings
4. **`e.preventDefault()` is essential** — prevents page reload on form submit
5. **Validate before sending** — saves unnecessary API calls
6. **Loading states improve UX** — users know something is happening
7. **Offline queue saves user data** — prevents loss on network failure
8. **PUT replaces entire resource** — PATCH only updates provided fields

