# 📘 Storage Best Practices

## Data Structure Versioning

When your app evolves, saved data structure may change. Use versioning.

```javascript
const STORAGE_VERSION = 2;

function loadData() {
    const saved = localStorage.getItem('app_data');
    if (!saved) return getDefaultData();
    
    const data = JSON.parse(saved);
    
    // Check version
    if (data.version !== STORAGE_VERSION) {
        return migrateData(data);
    }
    
    return data;
}

function migrateData(oldData) {
    // Migrate from version 1 to 2
    if (oldData.version === 1) {
        const newData = {
            version: 2,
            items: oldData.todos.map(todo => ({
                id: todo.id,
                text: todo.text,
                completed: todo.completed,
                createdAt: todo.createdAt || Date.now()
            }))
        };
        localStorage.setItem('app_data', JSON.stringify(newData));
        return newData;
    }
    
    return getDefaultData();
}
Error Handling
Always wrap storage operations in try/catch.

javascript
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Storage full. Please clear some data.');
            alert('Storage is full. Please clear old data.');
        } else {
            console.error('Storage error:', error);
        }
        return false;
    }
}

function safeGetItem(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (error) {
        console.error('Failed to read from storage:', error);
        return defaultValue;
    }
}

function safeJSONParse(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
    }
}
Storage Cleanup
javascript
class StorageManager {
    constructor(maxItems = 100) {
        this.maxItems = maxItems;
    }
    
    // Remove oldest items when limit exceeded
    enforceLimit(key) {
        const data = localStorage.getItem(key);
        if (!data) return;
        
        const items = JSON.parse(data);
        if (items.length > this.maxItems) {
            const trimmed = items.slice(-this.maxItems);
            localStorage.setItem(key, JSON.stringify(trimmed));
        }
    }
    
    // Clear expired items
    clearExpired(prefix, maxAgeDays = 30) {
        const maxAge = maxAgeDays * 24 * 60 * 60 * 1000;
        const now = Date.now();
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(prefix)) {
                const item = JSON.parse(localStorage.getItem(key));
                if (item.timestamp && (now - item.timestamp) > maxAge) {
                    localStorage.removeItem(key);
                }
            }
        }
    }
    
    // Get storage usage
    getUsage() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            total += key.length + value.length;
        }
        return {
            bytes: total,
            kb: (total / 1024).toFixed(2),
            percent: ((total / (5 * 1024 * 1024)) * 100).toFixed(1)  // based on 5MB limit
        };
    }
}
Privacy & Security
What NOT to Store in localStorage
javascript
// ❌ NEVER store sensitive data
localStorage.setItem('password', 'secret123');
localStorage.setItem('creditCard', '4111-1111-1111-1111');
localStorage.setItem('authToken', 'eyJhbGci...');  // Not recommended
localStorage.setItem('ssn', '123-45-6789');

// ✅ Store only non-sensitive data
localStorage.setItem('theme', 'dark');
localStorage.setItem('fontSize', '16');
localStorage.setItem('lastVisitedPage', '/home');
Why localStorage is Not Secure
Accessible via JavaScript (XSS attacks)

Visible in DevTools

Not encrypted

Accessible by any script on same origin

Better Alternatives for Sensitive Data
Data Type	Better Storage
Auth tokens	HttpOnly cookies
User passwords	Server-side hashing
Payment info	PCI-compliant payment processor
Personal data	Server-side database
Performance Tips
Batch Operations
javascript
// ❌ Bad: Multiple writes
localStorage.setItem('key1', 'value1');
localStorage.setItem('key2', 'value2');
localStorage.setItem('key3', 'value3');

// ✅ Good: Single write with object
const data = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
};
localStorage.setItem('app_data', JSON.stringify(data));
Debounce Auto-save
javascript
let saveTimeout;
function autoSave(data) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('draft', JSON.stringify(data));
    }, 1000);
}
Lazy Loading
javascript
// Load data only when needed
let cachedData = null;

function getData() {
    if (!cachedData) {
        const saved = localStorage.getItem('app_data');
        cachedData = saved ? JSON.parse(saved) : defaultData;
    }
    return cachedData;
}
Testing localStorage
Unit Test Example (Jest)
javascript
describe('localStorage service', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    
    test('saves and loads data', () => {
        const testData = { name: 'Victor', age: 25 };
        localStorage.setItem('test', JSON.stringify(testData));
        const loaded = JSON.parse(localStorage.getItem('test'));
        expect(loaded).toEqual(testData);
    });
    
    test('returns null for missing key', () => {
        const result = localStorage.getItem('nonexistent');
        expect(result).toBeNull();
    });
});
Testing in Browser
javascript
// Clear before testing
localStorage.clear();

// Log all items
for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
}
Cross-tab Communication
localStorage events allow tabs to communicate.

javascript
// Listen for storage changes
window.addEventListener('storage', (event) => {
    console.log('Key changed:', event.key);
    console.log('Old value:', event.oldValue);
    console.log('New value:', event.newValue);
    
    // React to changes from other tabs
    if (event.key === 'theme') {
        document.body.className = event.newValue;
    }
});

// In another tab, this will trigger the event
localStorage.setItem('theme', 'dark');
Migration Examples
javascript
// Handle schema changes gracefully
class VersionedStorage {
    constructor(key, currentVersion, defaultData) {
        this.key = key;
        this.currentVersion = currentVersion;
        this.defaultData = defaultData;
    }
    
    load() {
        const saved = localStorage.getItem(this.key);
        if (!saved) {
            return this.defaultData;
        }
        
        const data = JSON.parse(saved);
        
        if (data.version !== this.currentVersion) {
            return this.migrate(data);
        }
        
        return data;
    }
    
    migrate(oldData) {
        let newData = { ...oldData, version: this.currentVersion };
        
        // Version 1 → Version 2
        if (oldData.version === 1) {
            newData = {
                ...newData,
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
        }
        
        // Version 2 → Version 3
        if (oldData.version === 2) {
            newData = {
                ...newData,
                tags: oldData.tags || []
            };
        }
        
        this.save(newData);
        return newData;
    }
    
    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}
Best Practices Checklist
Always use try/catch with JSON.parse

Provide default values for first-time users

Version your data structure

Don't store sensitive information

Clear unused data periodically

Provide a "Clear Data" option for users

Use meaningful key names

Batch operations when possible

Debounce auto-save operations

Test storage quota handling

Document your data structure

Consider migration strategy for schema changes