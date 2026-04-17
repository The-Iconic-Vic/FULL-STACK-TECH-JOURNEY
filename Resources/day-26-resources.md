# 📚 Day 26 Resources - POST Requests & Sending Data

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: POST Method | https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST |
| MDN: Using Fetch (POST) | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data |
| MDN: Sending Form Data | https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data |
| MDN: FormData API | https://developer.mozilla.org/en-US/docs/Web/API/FormData |
| MDN: HTTP Methods | https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods |
| MDN: PUT vs POST | https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT |
| JavaScript.info: Fetch POST | https://javascript.info/fetch#post-requests |
| JSONPlaceholder Guide | https://jsonplaceholder.typicode.com/guide/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| POST Requests Tutorial | https://youtu.be/6yTSU4McIt4 |
| Sending Form Data with Fetch | https://youtu.be/ubw2y7Y4D8Q |
| HTTP Methods Explained | https://youtu.be/2JYT5f2isg4 |
| Form Validation with JavaScript | https://youtu.be/rsd4FNGTRBw |
| Building a Feedback System | https://youtu.be/01YKQ0tJFtE |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| JSONPlaceholder | Fake API for testing POST | https://jsonplaceholder.typicode.com |
| RequestBin | Capture and inspect POST requests | https://requestbin.com |
| Postman | Test POST requests | https://postman.com |
| Insomnia | API testing | https://insomnia.rest |
| Webhook.site | Test webhooks and POST | https://webhook.site |

## 📝 POST Request Cheatsheet

### Basic POST with JSON
```javascript
const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### POST with Form Data
```javascript
const formData = new FormData();
formData.append('name', 'Victor');
formData.append('email', 'victor@example.com');

const response = await fetch(url, {
    method: 'POST',
    body: formData
});
```

### POST with File Upload
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch(url, {
    method: 'POST',
    body: formData
});
```

### Complete Error Handling
```javascript
try {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Success:', result);
} catch (error) {
    console.error('Error:', error);
}
```

## 📝 HTTP Methods Cheatsheet

| Method | Use Case | Body | Idempotent |
|--------|----------|------|-------------|
| GET | Retrieve data | No | Yes |
| POST | Create data | Yes | No |
| PUT | Replace data | Yes | Yes |
| PATCH | Partial update | Yes | No |
| DELETE | Remove data | Maybe | Yes |

## 📝 Form Handling Cheatsheet

### Prevent Default
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle submission
});
```

### Collect Form Data
```javascript
const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());
```

### Reset Form
```javascript
form.reset();
```

### Show Loading State
```javascript
submitBtn.disabled = true;
submitBtn.textContent = 'Submitting...';
```

## ✅ Testing APIs for POST

| API | Endpoint | Returns |
|-----|----------|---------|
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/posts` | Fake post with ID 101 |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/users` | Fake user with ID 11 |
| ReqRes | `https://reqres.in/api/users` | Created user with ID |
| RequestBin | Your custom URL | Captures request data |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Invalid JSON | Check JSON.stringify() syntax |
| 404 Not Found | Wrong URL | Verify API endpoint |
| 415 Unsupported Media Type | Missing Content-Type | Add `headers: { 'Content-Type': 'application/json' }` |
| CORS error | Different origin | Use proxy or API with CORS support |
| Page refreshes on submit | Forgot preventDefault | Add `e.preventDefault()` |
| FormData empty | Wrong selector | Check form ID/class |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| REST API Tutorial | https://restfulapi.net |
| HTTP Status Codes | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status |
| Sending Files with Fetch | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_a_file |
| Form Validation Best Practices | https://web.dev/learn/forms/validation/ |

