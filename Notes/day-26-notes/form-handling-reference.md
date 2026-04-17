# 📘 Form Handling Reference

## Preventing Default Form Submission

By default, form submission causes a page reload. Always prevent this.

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Critical!
    
    // Handle form data
    const formData = new FormData(form);
    // ... send to API
});
Collecting Form Data
Method 1: Manual Collection
javascript
function getFormData() {
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
}
Method 2: FormData API
javascript
function getFormData(form) {
    const formData = new FormData(form);
    return {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
}
Method 3: Object.fromEntries()
javascript
function getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
}
// Returns: { name: 'Victor', email: 'vic@example.com', message: 'Hello' }
Method 4: All fields including nested
javascript
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        // Handle nested fields (e.g., user[name])
        if (key.includes('[')) {
            const parts = key.split(/[\[\]]/).filter(Boolean);
            let current = data;
            for (let i = 0; i < parts.length - 1; i++) {
                current[parts[i]] = current[parts[i]] || {};
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
        } else {
            data[key] = value;
        }
    }
    
    return data;
}
Form Validation
Basic Validation
javascript
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!data.email || !data.email.includes('@')) {
        errors.push('Valid email is required');
    }
    
    if (data.age && (data.age < 18 || data.age > 120)) {
        errors.push('Age must be between 18 and 120');
    }
    
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    
    return true;
}
Real-time Validation
javascript
function setupRealTimeValidation() {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateField(input) {
    const isValid = input.checkValidity();
    const formGroup = input.closest('.form-group');
    
    if (isValid) {
        formGroup.classList.remove('invalid');
        formGroup.classList.add('valid');
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('invalid');
    }
}
Form Submission Pattern
Complete Form Handler
javascript
class FormHandler {
    constructor(formId, apiUrl) {
        this.form = document.getElementById(formId);
        this.apiUrl = apiUrl;
        this.submitBtn = this.form.querySelector('[type="submit"]');
        this.messageContainer = document.getElementById('form-message');
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
        const formData = new FormData(this.form);
        return Object.fromEntries(formData.entries());
    }
    
    validateForm(data) {
        // Custom validation logic
        if (!data.name) throw new Error('Name required');
        if (!data.email) throw new Error('Email required');
        if (!data.email.includes('@')) throw new Error('Valid email required');
    }
    
    async submitToAPI(data) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Submission failed');
        }
        
        return await response.json();
    }
    
    showLoading() {
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Submitting...';
        this.showMessage('Processing...', 'loading');
    }
    
    hideLoading() {
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = 'Submit';
    }
    
    showSuccess(response) {
        this.showMessage('Form submitted successfully!', 'success');
    }
    
    showError(message) {
        this.showMessage(message, 'error');
    }
    
    showMessage(message, type) {
        if (this.messageContainer) {
            this.messageContainer.textContent = message;
            this.messageContainer.className = `form-message ${type}`;
            
            setTimeout(() => {
                this.messageContainer.textContent = '';
                this.messageContainer.className = 'form-message';
            }, 5000);
        }
    }
    
    resetForm() {
        this.form.reset();
    }
}
Form UI States
Loading State
css
.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.submit-btn.loading::after {
    content: '⏳';
    animation: spin 1s linear infinite;
}
Success State
css
.form-message.success {
    background: #d4edda;
    color: #155724;
    border-left: 4px solid #28a745;
    padding: 1rem;
    margin-top: 1rem;
}
Error State
css
.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border-left: 4px solid #dc3545;
    padding: 1rem;
    margin-top: 1rem;
}

.form-group.invalid input {
    border-color: #dc3545;
}

.form-group.valid input {
    border-color: #28a745;
}
Handling Different Input Types
Star Rating
javascript
function setupStarRating(containerId, ratingInputId) {
    const container = document.getElementById(containerId);
    const ratingInput = document.getElementById(ratingInputId);
    let currentRating = 0;
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('button');
        star.textContent = '☆';
        star.className = 'star';
        star.dataset.rating = i;
        
        star.addEventListener('click', () => {
            currentRating = i;
            ratingInput.value = i;
            updateStars();
        });
        
        star.addEventListener('mouseenter', () => {
            highlightStars(i);
        });
        
        star.addEventListener('mouseleave', () => {
            highlightStars(currentRating);
        });
        
        container.appendChild(star);
    }
    
    function highlightStars(rating) {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
        });
    }
    
    function updateStars() {
        highlightStars(currentRating);
    }
}
File Upload Preview
javascript
function setupFilePreview(fileInputId, previewContainerId) {
    const fileInput = document.getElementById(fileInputId);
    const previewContainer = document.getElementById(previewContainerId);
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.style.maxWidth = '200px';
                previewContainer.innerHTML = '';
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}
Offline Form Queue
javascript
class OfflineFormQueue {
    constructor(storageKey = 'pendingForms') {
        this.storageKey = storageKey;
        this.queue = this.load();
        this.setupOnlineListener();
    }
    
    load() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    }
    
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    }
    
    add(formData) {
        this.queue.push({
            ...formData,
            timestamp: Date.now(),
            id: Date.now()
        });
        this.save();
    }
    
    async process() {
        for (let i = this.queue.length - 1; i >= 0; i--) {
            const item = this.queue[i];
            try {
                await this.submit(item);
                this.queue.splice(i, 1);
                this.save();
            } catch (error) {
                console.error('Failed to submit:', item.id);
            }
        }
    }
    
    async submit(data) {
        // Override in subclass
        throw new Error('Must implement submit()');
    }
    
    setupOnlineListener() {
        window.addEventListener('online', () => {
            if (this.queue.length > 0) {
                this.process();
            }
        });
    }
}