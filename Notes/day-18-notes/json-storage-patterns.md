# 📘 JSON Storage Patterns

## Pattern 1: Todo List with localStorage

### Data Structure
```javascript
const todoSchema = {
    id: Number,           // Date.now() or incrementing
    text: String,         // Task description
    completed: Boolean,   // true/false
    createdAt: Number,    // timestamp (optional)
    priority: String      // 'low', 'medium', 'high' (optional)
};
Complete Implementation
javascript
class TodoStorage {
    constructor(storageKey = 'todos') {
        this.storageKey = storageKey;
        this.todos = this.load();
    }
    
    // Load from localStorage
    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getDefaultData();
    }
    
    // Save to localStorage
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }
    
    // Default data for first visit
    getDefaultData() {
        return [
            { id: 1, text: 'Learn localStorage', completed: false, createdAt: Date.now() },
            { id: 2, text: 'Build a persistent app', completed: false, createdAt: Date.now() },
            { id: 3, text: 'Master JSON', completed: true, createdAt: Date.now() }
        ];
    }
    
    // CRUD operations
    add(text) {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: Date.now()
        };
        this.todos.push(newTodo);
        this.save();
        return newTodo;
    }
    
    update(id, updates) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            this.todos[index] = { ...this.todos[index], ...updates };
            this.save();
            return this.todos[index];
        }
        return null;
    }
    
    delete(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
    }
    
    toggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
        }
    }
    
    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.save();
    }
    
    getAll() {
        return [...this.todos];
    }
    
    getActive() {
        return this.todos.filter(t => !t.completed);
    }
    
    getCompleted() {
        return this.todos.filter(t => t.completed);
    }
}

// Usage
const todoStorage = new TodoStorage();
todoStorage.add('New task');
todoStorage.toggleComplete(1);
todoStorage.delete(2);
Pattern 2: Notes App Storage
Data Structure
javascript
const noteSchema = {
    id: Number,           // Unique identifier
    title: String,        // Note title
    content: String,      // Note content
    timestamp: Number,    // Last modified
    tags: Array,          // Optional: ['work', 'personal']
    pinned: Boolean       // Optional: true/false
};
Complete Implementation
javascript
class NotesStorage {
    constructor(storageKey = 'notes') {
        this.storageKey = storageKey;
        this.notes = this.load();
    }
    
    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }
    
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
    }
    
    create(title, content) {
        const newNote = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            timestamp: Date.now()
        };
        this.notes.unshift(newNote);  // Add to beginning
        this.save();
        return newNote;
    }
    
    update(id, title, content) {
        const index = this.notes.findIndex(n => n.id === id);
        if (index !== -1) {
            this.notes[index] = {
                ...this.notes[index],
                title: title.trim(),
                content: content.trim(),
                timestamp: Date.now()
            };
            this.save();
            return this.notes[index];
        }
        return null;
    }
    
    delete(id) {
        this.notes = this.notes.filter(n => n.id !== id);
        this.save();
    }
    
    getById(id) {
        return this.notes.find(n => n.id === id);
    }
    
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.notes.filter(note =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery)
        );
    }
    
    getAll() {
        return [...this.notes];
    }
    
    clearAll() {
        this.notes = [];
        this.save();
    }
}

// Usage
const notesStorage = new NotesStorage();
notesStorage.create('My First Note', 'This is the content');
notesStorage.update(1, 'Updated Title', 'Updated content');
const results = notesStorage.search('first');
notesStorage.delete(1);
Pattern 3: User Preferences Storage
Data Structure
javascript
const preferencesSchema = {
    theme: String,        // 'light', 'dark', 'system'
    fontSize: Number,     // 12, 14, 16, 18
    language: String,     // 'en', 'es', 'fr'
    notifications: Boolean,
    sidebarCollapsed: Boolean
};
Complete Implementation
javascript
class PreferencesStorage {
    constructor(storageKey = 'preferences') {
        this.storageKey = storageKey;
        this.defaults = {
            theme: 'light',
            fontSize: 16,
            language: 'en',
            notifications: true,
            sidebarCollapsed: false
        };
        this.preferences = this.load();
    }
    
    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            return { ...this.defaults, ...JSON.parse(saved) };
        }
        return { ...this.defaults };
    }
    
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
    }
    
    get(key) {
        return this.preferences[key];
    }
    
    set(key, value) {
        this.preferences[key] = value;
        this.save();
        this.apply();  // Apply changes to UI
    }
    
    apply() {
        // Apply theme
        if (this.preferences.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Apply font size
        document.body.style.fontSize = `${this.preferences.fontSize}px`;
        
        // Apply language
        // ... language change logic
        
        // Apply sidebar
        if (this.preferences.sidebarCollapsed) {
            document.querySelector('.sidebar')?.classList.add('collapsed');
        }
    }
    
    reset() {
        this.preferences = { ...this.defaults };
        this.save();
        this.apply();
    }
}

// Usage
const prefs = new PreferencesStorage();
prefs.set('theme', 'dark');
prefs.set('fontSize', 18);
const currentTheme = prefs.get('theme');
prefs.reset();
Pattern 4: Form Draft Storage
Auto-save Draft Pattern
javascript
class FormDraftStorage {
    constructor(formId, storageKey = null) {
        this.form = document.getElementById(formId);
        this.storageKey = storageKey || `draft_${formId}`;
        this.saveTimeout = null;
        this.init();
    }
    
    init() {
        this.loadDraft();
        this.setupAutoSave();
        this.setupClearOnSubmit();
    }
    
    getFormData() {
        const formData = {};
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.name) {
                formData[input.name] = input.value;
            }
        });
        return formData;
    }
    
    saveDraft() {
        const formData = this.getFormData();
        localStorage.setItem(this.storageKey, JSON.stringify(formData));
        this.showSavedIndicator();
    }
    
    loadDraft() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            const formData = JSON.parse(saved);
            for (const [name, value] of Object.entries(formData)) {
                const input = this.form.querySelector(`[name="${name}"]`);
                if (input && value) {
                    input.value = value;
                }
            }
            this.showLoadIndicator();
        }
    }
    
    setupAutoSave() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(this.saveTimeout);
                this.saveTimeout = setTimeout(() => this.saveDraft(), 1000);
            });
        });
    }
    
    setupClearOnSubmit() {
        this.form.addEventListener('submit', () => {
            localStorage.removeItem(this.storageKey);
        });
    }
    
    clearDraft() {
        localStorage.removeItem(this.storageKey);
        this.form.reset();
    }
    
    showSavedIndicator() {
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            indicator.textContent = 'Draft saved';
            setTimeout(() => {
                indicator.textContent = '';
            }, 2000);
        }
    }
    
    showLoadIndicator() {
        const indicator = document.getElementById('load-indicator');
        if (indicator) {
            indicator.textContent = 'Loaded saved draft';
            setTimeout(() => {
                indicator.textContent = '';
            }, 2000);
        }
    }
}

// Usage
const draft = new FormDraftStorage('contact-form');
Pattern 5: Shopping Cart Storage
Data Structure
javascript
const cartItemSchema = {
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String
};
Complete Implementation
javascript
class CartStorage {
    constructor(storageKey = 'shopping_cart') {
        this.storageKey = storageKey;
        this.items = this.load();
    }
    
    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }
    
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        this.updateCartCount();
    }
    
    add(item) {
        const existing = this.items.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
        this.save();
    }
    
    remove(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
    }
    
    updateQuantity(id, quantity) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            if (quantity <= 0) {
                this.remove(id);
            } else {
                item.quantity = quantity;
                this.save();
            }
        }
    }
    
    clear() {
        this.items = [];
        this.save();
    }
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    updateCartCount() {
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            countElement.textContent = this.getCount();
        }
    }
    
    getAll() {
        return [...this.items];
    }
}

// Usage
const cart = new CartStorage();
cart.add({ id: 1, name: 'Laptop', price: 999, image: 'laptop.jpg' });
cart.updateQuantity(1, 2);
const total = cart.getTotal();
cart.remove(1);
Best Practices Summary
Practice	Why
Always use try/catch with JSON.parse	Invalid JSON causes crash
Provide default values	Handle first visit gracefully
Save after every change	Data stays in sync
Use meaningful keys	Easy to debug
Clear unused data	Stay within storage limits
Version your data structure	Handle schema changes
Don't store sensitive data	localStorage is not secure
Provide clear data option	User control over their data