# 📘 LocalStorage Reference

## Web Storage API

The Web Storage API provides mechanisms to store key-value pairs in the browser.

### Storage Types

| Storage | Persistence | Scope | Lifetime |
|---------|-------------|-------|----------|
| `localStorage` | Persistent | All tabs/windows | Until manually cleared |
| `sessionStorage` | Tab-specific | Current tab only | Until tab closes |

---

## localStorage Methods

### setItem(key, value)
Saves data to localStorage.

```javascript
// Save string
localStorage.setItem('name', 'Victor');
localStorage.setItem('age', '25');  // Numbers become strings

// Save boolean
localStorage.setItem('isLoggedIn', 'true');

// ⚠️ Arrays and objects need JSON.stringify()
const todos = [{ id: 1, text: 'Learn JS' }];
localStorage.setItem('todos', JSON.stringify(todos));
getItem(key)
Retrieves data from localStorage.

javascript
// Get string
const name = localStorage.getItem('name');  // 'Victor'
const age = localStorage.getItem('age');    // '25' (string!)

// ⚠️ Returns null if key doesn't exist
const missing = localStorage.getItem('nothing');  // null

// Parse arrays/objects
const savedTodos = localStorage.getItem('todos');
const todos = savedTodos ? JSON.parse(savedTodos) : [];
removeItem(key)
Removes a specific item.

javascript
localStorage.removeItem('name');
localStorage.removeItem('age');
clear()
Removes all items from localStorage.

javascript
localStorage.clear();  // All data gone!
key(index)
Returns the key name at a specific index.

javascript
// Get first key
const firstKey = localStorage.key(0);

// Loop through all keys
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}
length
Returns the number of stored items.

javascript
const itemCount = localStorage.length;
console.log(`You have ${itemCount} items saved`);
JSON Methods for Storage
JSON.stringify()
Converts JavaScript object/array to JSON string.

javascript
// Array to JSON string
const todos = [
    { id: 1, text: 'Learn JS', completed: false },
    { id: 2, text: 'Build app', completed: true }
];
const jsonString = JSON.stringify(todos);
// '[{"id":1,"text":"Learn JS","completed":false},{"id":2,"text":"Build app","completed":true}]'

// Object to JSON string
const user = { name: 'Victor', age: 25, theme: 'dark' };
const userJson = JSON.stringify(user);
// '{"name":"Victor","age":25,"theme":"dark"}'

// Pretty print (with indentation)
const pretty = JSON.stringify(todos, null, 2);
JSON.parse()
Converts JSON string back to JavaScript object/array.

javascript
// Parse array
const jsonString = localStorage.getItem('todos');
const todos = JSON.parse(jsonString);
console.log(todos[0].text);  // 'Learn JS'

// Parse object
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson);
console.log(user.name);  // 'Victor'

// ⚠️ Error if invalid JSON
try {
    const data = JSON.parse(invalidString);
} catch (error) {
    console.error('Invalid JSON:', error);
}
Complete Save/Load Patterns
Pattern 1: Save and Load Array
javascript
// Save array
function saveArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

// Load array
function loadArray(key, defaultValue = []) {
    const saved = localStorage.getItem(key);
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultValue;
}

// Usage
const todos = loadArray('todos', []);
todos.push({ id: Date.now(), text: 'New task' });
saveArray('todos', todos);
Pattern 2: Save and Load Object
javascript
// Save object
function saveObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

// Load object
function loadObject(key, defaultValue = {}) {
    const saved = localStorage.getItem(key);
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultValue;
}

// Usage
const settings = loadObject('settings', { theme: 'light', fontSize: 16 });
settings.theme = 'dark';
saveObject('settings', settings);
Pattern 3: First Visit Handling
javascript
function initializeData(key, defaultData) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(defaultData));
    }
    return JSON.parse(localStorage.getItem(key));
}

// Usage
const defaultTodos = [
    { id: 1, text: 'Welcome!', completed: false },
    { id: 2, text: 'Try editing this', completed: false }
];
const todos = initializeData('todos', defaultTodos);
sessionStorage
Same methods as localStorage, but data clears when tab closes.

javascript
// Save to sessionStorage
sessionStorage.setItem('draft', JSON.stringify(formData));

// Load from sessionStorage
const draft = sessionStorage.getItem('draft');
const formData = draft ? JSON.parse(draft) : null;

// Remove
sessionStorage.removeItem('draft');

// Clear all
sessionStorage.clear();
When to Use sessionStorage
Use Case	Why
Form drafts	Don't need after tab closes
Shopping cart	Session-based
Temporary preferences	Don't persist across sessions
Sensitive data (one-time)	Clears when tab closes
Storage Limits
Storage	Typical Limit
localStorage	5-10 MB per origin
sessionStorage	5-10 MB per origin
javascript
// Approximate storage usage
function getStorageSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        total += key.length + value.length;
    }
    return (total / 1024).toFixed(2) + ' KB';
}

// Check if near limit
if (getStorageSize() > 9000) {  // 9 MB
    console.warn('Storage almost full!');
}
Common Errors & Solutions
Error	Cause	Solution
JSON.parse() error	Invalid JSON string	Use try/catch
getItem() returns null	Key doesn't exist	Provide default value
QuotaExceededError	Storage full	Clear unused data
[object Object] saved	Forgot JSON.stringify()	Use JSON.stringify()
javascript
// Safe JSON parsing
function safeJSONParse(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
    }
}

// Safe getItem with default
function getItem(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
}
Browser DevTools
View localStorage in DevTools
Open DevTools (F12)

Go to Application tab

Expand Storage → Local Storage

Select your domain

View/edit/delete key-value pairs

Clear localStorage from DevTools
Right-click → Clear

Or use console: localStorage.clear()