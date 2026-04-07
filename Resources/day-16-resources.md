# 📚 Day 16 Resources - JavaScript Objects & JSON

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Working with Objects | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects |
| MDN: Object Basics | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics |
| MDN: Object Methods | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object |
| MDN: JSON | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON |
| MDN: JSON.stringify() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify |
| MDN: JSON.parse() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse |
| MDN: Array.prototype.filter() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter |
| MDN: Array.prototype.map() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map |
| MDN: Array.prototype.find() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find |
| JavaScript.info: Objects | https://javascript.info/object |
| JavaScript.info: JSON | https://javascript.info/json |
| W3Schools: JavaScript Objects | https://www.w3schools.com/js/js_objects.asp |
| W3Schools: JSON Tutorial | https://www.w3schools.com/js/js_json.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JavaScript Objects Tutorial | https://youtu.be/X0ipw1k7ygU |
| Object Methods Explained | https://youtu.be/4l6HHLUQlwY |
| JSON Crash Course | https://youtu.be/iiADhChRriM |
| filter, map, find Tutorial | https://youtu.be/4l6HHLUQlwY |
| Arrays of Objects | https://youtu.be/U0NZQ6H_vik |
| JavaScript Object Mastery | https://youtu.be/4l6HHLUQlwY |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| JSON Formatter | Format and validate JSON | https://jsonformatter.org |
| JSON Validator | Check JSON syntax | https://jsonlint.com |
| Chrome DevTools Console | Test object methods | Built into Chrome |
| JSON to JS Converter | Convert JSON to JS object | https://json2js.com |
| JSFiddle | Online playground | https://jsfiddle.net |
| CodePen | Frontend playground | https://codepen.io |

## 📝 Objects Cheatsheet

### Object Creation
```javascript
// Literal (recommended)
const obj = { key: "value" };

// Empty object
const empty = {};

// New keyword
const obj2 = new Object();

// From variables
const name = "Victor";
const person = { name };  // { name: "Victor" }
```

### Property Access
```javascript
// Dot notation (preferred)
obj.property;

// Bracket notation (dynamic)
obj["property"];

// Nested access
obj.nested.property;
obj["nested"]["property"];
```

### Add/Update/Delete
```javascript
// Add
obj.newProp = "value";

// Update
obj.existingProp = "new value";

// Delete
delete obj.prop;
```

### Object Methods
```javascript
Object.keys(obj);      // Get all keys
Object.values(obj);    // Get all values
Object.entries(obj);   // Get [key, value] pairs
Object.assign(target, source); // Copy properties
Object.freeze(obj);    // Make immutable
Object.seal(obj);      // Prevent adding/deleting
```

### Looping Through Objects
```javascript
// for...in
for (const key in obj) {
    console.log(key, obj[key]);
}

// Object.entries with forEach
Object.entries(obj).forEach(([key, value]) => {
    console.log(key, value);
});
```

## 📝 Arrays of Objects Cheatsheet

### Common Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `filter()` | Select objects | `arr.filter(o => o.price > 50)` |
| `map()` | Transform objects | `arr.map(o => o.name)` |
| `find()` | Find first match | `arr.find(o => o.id === 5)` |
| `findIndex()` | Find index | `arr.findIndex(o => o.id === 5)` |
| `some()` | Check any | `arr.some(o => o.inStock)` |
| `every()` | Check all | `arr.every(o => o.inStock)` |
| `reduce()` | Accumulate | `arr.reduce((sum, o) => sum + o.price, 0)` |
| `forEach()` | Loop | `arr.forEach(o => console.log(o))` |
| `sort()` | Sort | `arr.sort((a,b) => a.price - b.price)` |

### Examples
```javascript
// Filter
const expensive = products.filter(p => p.price > 100);

// Map to names
const names = users.map(u => u.name);

// Find by id
const product = products.find(p => p.id === 5);

// Check all in stock
const allAvailable = products.every(p => p.inStock);

// Calculate total
const total = products.reduce((sum, p) => sum + p.price, 0);
```

## 📝 JSON Cheatsheet

### JSON Rules
```json
{
    "key": "string",           // Keys and strings in double quotes
    "number": 42,              // Numbers (no quotes)
    "boolean": true,           // true/false (no quotes)
    "null": null,              // null
    "array": [1, 2, 3],        // Arrays
    "object": { "nested": "value" }  // Nested objects
}
```

### Conversion Methods
```javascript
// Object to JSON string
const jsonString = JSON.stringify(obj);

// JSON string to Object
const obj = JSON.parse(jsonString);

// Pretty print
JSON.stringify(obj, null, 2);  // 2 spaces indentation

// With replacer function
JSON.stringify(obj, (key, value) => {
    if (key === 'password') return undefined;
    return value;
});
```

### JSON vs JavaScript Object

| Feature | JavaScript Object | JSON |
|---------|-------------------|------|
| Keys | Quotes optional | Must be double quotes |
| Strings | Single or double quotes | Double quotes only |
| Functions | ✅ Allowed | ❌ Not allowed |
| Comments | ✅ Allowed | ❌ Not allowed |
| undefined | ✅ Allowed | ❌ Not allowed |

## 🎮 Interactive Learning

| Platform | Description | Link |
|----------|-------------|------|
| Codewars | Array/Object katas (8kyu-7kyu) | https://codewars.com |
| freeCodeCamp | Object curriculum | https://freecodecamp.org |
| JavaScript30 | Day 8: HTML Canvas | https://javascript30.com |
| Codecademy | JavaScript Objects course | https://codecademy.com |
| Exercism | Object practice | https://exercism.org/tracks/javascript |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `undefined` property | Property doesn't exist | Use `obj.hasOwnProperty('key')` to check |
| `obj.key` not working | Key has spaces or special chars | Use bracket notation `obj["key with spaces"]` |
| `this` is wrong in method | Arrow function used | Use regular function for methods |
| JSON parse error | Invalid JSON syntax | Use JSON validator |
| `find()` returns undefined | No match found | Check condition, handle undefined case |
| `filter()` returns empty array | No matches | Check condition logic |
| `map()` on undefined | Array is empty | Add fallback: `(arr || []).map(...)` |

## ✅ Common Patterns

### Student Record Pattern
```javascript
const students = [
    { name: "Alice", grade: 92, age: 16 },
    { name: "Bob", grade: 78, age: 17 }
];

// Find students with grade >= 80
const topStudents = students.filter(s => s.grade >= 80);

// Get average grade
const avg = students.map(s => s.grade).reduce((a,b) => a + b, 0) / students.length;

// Add new student
students.push({ name: "Charlie", grade: 85, age: 15 });
```

### Product Catalog Pattern
```javascript
const products = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Mouse", price: 25, inStock: false }
];

// Filter by stock
const inStock = products.filter(p => p.inStock === true);

// Filter by price
const under50 = products.filter(p => p.price < 50);

// Map to card HTML
const cards = products.map(p => `
    <div class="card">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
    </div>
`).join('');
```

### Save/Load Pattern
```javascript
// Save to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load from localStorage
function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Usage
saveData('products', products);
const loadedProducts = loadData('products');
```

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Object-oriented JavaScript | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects |
| JavaScript Object Methods | https://www.freecodecamp.org/news/javascript-object-methods/ |
| Understanding JSON | https://www.json.org/json-en.html |
| Working with APIs (JSON) | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data |

