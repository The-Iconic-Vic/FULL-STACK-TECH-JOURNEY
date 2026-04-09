# 📚 Day 18 Resources - LocalStorage & Data Persistence

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Web Storage API | https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API |
| MDN: localStorage | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| MDN: sessionStorage | https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage |
| MDN: JSON.stringify() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify |
| MDN: JSON.parse() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse |
| W3Schools: localStorage | https://www.w3schools.com/jsref/prop_win_localstorage.asp |
| W3Schools: JSON Tutorial | https://www.w3schools.com/js/js_json.asp |
| JavaScript.info: LocalStorage | https://javascript.info/localstorage |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| localStorage Tutorial | https://youtu.be/auMcR9Y4Qxg |
| JSON.stringify() & JSON.parse() | https://youtu.be/6I3YqWw2OB4 |
| Build a Notes App with localStorage | https://youtu.be/01YKQ0tJFtE |
| Persistent Todo List | https://youtu.be/2wCpkOk2uCg |
| Web Storage API Explained | https://youtu.be/7m4UuX_G0wk |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools (Application tab) | View/edit localStorage | Built into Chrome |
| JSON Formatter | Format JSON data | https://jsonformatter.org |
| JSON Validator | Validate JSON syntax | https://jsonlint.com |
| LocalStorage Inspector | Browser extension | Chrome Web Store |

## 📝 localStorage Cheatsheet

### Basic Methods
```javascript
// Save
localStorage.setItem('key', 'value');

// Get
const value = localStorage.getItem('key');

// Remove
localStorage.removeItem('key');

// Clear all
localStorage.clear();

// Get key by index
const key = localStorage.key(0);

// Number of items
const count = localStorage.length;
```

### JSON Methods
```javascript
// Save array/object
localStorage.setItem('key', JSON.stringify(myArray));

// Load array/object
const myArray = JSON.parse(localStorage.getItem('key')) || [];

// Pretty print
JSON.stringify(data, null, 2);
```

### First Visit Pattern
```javascript
function loadData(key, defaultData) {
    const saved = localStorage.getItem(key);
    if (saved) {
        return JSON.parse(saved);
    }
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
}
```

## 📝 localStorage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| Persistence | Forever | Until tab closes |
| Shared across tabs | Yes | No |
| Survives browser restart | Yes | No |
| Use case | User preferences, saved data | Form drafts, temporary data |

## ✅ Common Code Patterns

### Save/Load Array
```javascript
// Save
function saveArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

// Load
function loadArray(key, defaultValue = []) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}
```

### Save/Load Object
```javascript
// Save
function saveObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

// Load
function loadObject(key, defaultValue = {}) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}
```

### Todo List Storage
```javascript
// Load todos
function loadTodos() {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
}

// Save todos
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add todo
function addTodo(text) {
    const todos = loadTodos();
    todos.push({ id: Date.now(), text, completed: false });
    saveTodos(todos);
}
```

### Notes App Storage
```javascript
// Note structure
{
    id: Date.now(),
    title: "Note Title",
    content: "Note content...",
    timestamp: Date.now()
}

// Save notes
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes
function loadNotes() {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
}
```

### User Preferences
```javascript
// Save preference
function savePreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Load preference
function loadPreference(key, defaultValue) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}

// Theme example
function setTheme(theme) {
    document.body.className = theme;
    savePreference('theme', theme);
}

function loadTheme() {
    const theme = loadPreference('theme', 'light');
    document.body.className = theme;
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `[object Object]` saved | Forgot JSON.stringify() | Use `JSON.stringify()` |
| `JSON.parse()` error | Invalid JSON | Use try/catch |
| Data lost after refresh | Using sessionStorage | Use localStorage instead |
| Storage quota exceeded | Too much data | Clear old data, use less |
| Data not persisting | Private/incognito mode | Handle gracefully |
| `getItem()` returns null | First visit | Provide default value |

## 🔧 Debugging Tips

### View localStorage in DevTools
1. Open DevTools (`F12`)
2. Click **Application** tab
3. Expand **Storage** → **Local Storage**
4. Select your domain
5. View/edit/delete key-value pairs

### Console Commands
```javascript
// View all localStorage
console.table(localStorage);

// Check storage usage
let total = 0;
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    total += key.length + value.length;
}
console.log(`${(total / 1024).toFixed(2)} KB used`);

// Clear localStorage
localStorage.clear();
```

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Web Storage API Best Practices | https://developers.google.com/web/fundamentals/architecture/browser-storage |
| IndexedDB (advanced storage) | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API |
| Cookies vs localStorage vs sessionStorage | https://www.freecodecamp.org/news/cookies-localstorage-sessionstorage/ |
| Storage for Web Applications | https://www.w3.org/TR/webstorage/ |
