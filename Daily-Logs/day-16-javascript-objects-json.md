# 📅 Day 16: JavaScript Objects & JSON

**Date:** April 7, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Objects, Arrays of Objects, JSON

---

## 📋 Learning Objectives

- ✅ Create objects using `{}` syntax
- ✅ Understand key-value pairs (properties and values)
- ✅ Access properties using dot notation and bracket notation
- ✅ Add, update, and delete object properties
- ✅ Create and use object methods
- ✅ Build arrays of objects
- ✅ Filter arrays of objects with `filter()`
- ✅ Transform arrays of objects with `map()`
- ✅ Find objects in arrays with `find()`
- ✅ Understand JSON format
- ✅ Convert between objects and JSON with `JSON.stringify()` and `JSON.parse()`

---

## 📦 Part 1: Objects Fundamentals

### What is an Object?

An object is a collection of key-value pairs (properties) that represent real-world entities. Objects allow you to group related data and functions together.

```javascript
// Object literal syntax (recommended)
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos",
    isStudent: true
};

// Empty object
const empty = {};

// Using new Object() (less common)
const obj = new Object();
```

---

### Properties (Key-Value Pairs)

Properties have keys (names) and values.

```javascript
const car = {
    brand: "Toyota",      // key: "brand", value: "Toyota"
    model: "Camry",       // key: "model", value: "Camry"
    year: 2022,           // key: "year", value: 2022
    color: "blue"         // key: "color", value: "blue"
};
```

**Valid key names:**
- Can be strings or symbols
- Usually written without quotes (if valid identifier)
- Can include spaces or special characters with quotes

```javascript
const obj = {
    normalKey: "value",
    "key with spaces": "value",
    "123": "numeric key"
};
```

---

### Accessing Properties

#### Dot Notation (Preferred for known keys)

```javascript
const person = {
    name: "Victor",
    age: 25,
    address: {
        city: "Lagos",
        street: "Main St"
    }
};

console.log(person.name);     // "Victor"
console.log(person.age);      // 25
console.log(person.address.city); // "Lagos" (nested)
```

#### Bracket Notation (For dynamic keys)

```javascript
const person = {
    name: "Victor",
    "favorite color": "blue"
};

// Use bracket notation for keys with spaces
console.log(person["favorite color"]);  // "blue"

// Use bracket notation with variables
const key = "name";
console.log(person[key]);  // "Victor"
```

---

### Adding and Updating Properties

```javascript
const user = { name: "Alice" };

// Add new property
user.age = 25;
user["city"] = "New York";

console.log(user);  // { name: "Alice", age: 25, city: "New York" }

// Update existing property
user.age = 26;
user.name = "Alicia";

console.log(user);  // { name: "Alicia", age: 26, city: "New York" }
```

---

### Deleting Properties

```javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos"
};

// Delete property
delete person.age;
console.log(person);  // { name: "Victor", city: "Lagos" }

// Check if property exists
console.log("name" in person);     // true
console.log("age" in person);      // false
console.log(person.hasOwnProperty("name")); // true
```

---

### Object Methods

Methods are functions stored as object properties.

```javascript
const person = {
    name: "Victor",
    age: 25,
    
    // Method using function expression
    greet: function() {
        return `Hello, my name is ${this.name}`;
    },
    
    // Method shorthand (ES6+)
    introduce() {
        return `I am ${this.name} and I am ${this.age} years old`;
    },
    
    // Arrow function (careful with 'this')
    arrowGreet: () => {
        // 'this' here is NOT the person object
        return `Hello`;
    }
};

console.log(person.greet());        // "Hello, my name is Victor"
console.log(person.introduce());    // "I am Victor and I am 25 years old"
```

**The `this` keyword:** Refers to the object that owns the method.

---

### Object Iteration

```javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos"
};

// for...in loop
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// name: Victor
// age: 25
// city: Lagos

// Object.keys() - returns array of keys
const keys = Object.keys(person);
console.log(keys);  // ["name", "age", "city"]

// Object.values() - returns array of values
const values = Object.values(person);
console.log(values);  // ["Victor", 25, "Lagos"]

// Object.entries() - returns array of [key, value] pairs
const entries = Object.entries(person);
console.log(entries);  // [["name", "Victor"], ["age", 25], ["city", "Lagos"]]

// Using forEach with entries
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

---

## 📚 Part 2: Arrays of Objects

### Creating an Array of Objects

Arrays can store objects as elements. This is how we manage collections of real-world data.

```javascript
// Array of student objects
const students = [
    { name: "Alice", grade: 92, age: 16 },
    { name: "Bob", grade: 78, age: 17 },
    { name: "Charlie", grade: 65, age: 15 },
    { name: "Diana", grade: 88, age: 16 }
];

// Accessing objects in array
console.log(students[0].name);     // "Alice"
console.log(students[1].grade);    // 78
console.log(students[2]["age"]);   // 15
```

---

### Filtering with `filter()`

```javascript
const students = [
    { name: "Alice", grade: 92, age: 16 },
    { name: "Bob", grade: 78, age: 17 },
    { name: "Charlie", grade: 65, age: 15 },
    { name: "Diana", grade: 88, age: 16 }
];

// Filter students with grade >= 80
const highAchievers = students.filter(student => student.grade >= 80);
console.log(highAchievers);
// [{ name: "Alice", grade: 92, age: 16 }, { name: "Diana", grade: 88, age: 16 }]

// Filter students age 16
const age16 = students.filter(student => student.age === 16);
// [{ name: "Alice", grade: 92, age: 16 }, { name: "Diana", grade: 88, age: 16 }]

// Filter with multiple conditions
const passingWithAge = students.filter(s => s.grade >= 70 && s.age >= 16);
// [{ name: "Alice", grade: 92, age: 16 }, { name: "Diana", grade: 88, age: 16 }]
```

---

### Transforming with `map()`

```javascript
const students = [
    { name: "Alice", grade: 92 },
    { name: "Bob", grade: 78 },
    { name: "Charlie", grade: 65 }
];

// Extract just names
const names = students.map(student => student.name);
console.log(names);  // ["Alice", "Bob", "Charlie"]

// Create formatted strings
const introductions = students.map(s => `${s.name} scored ${s.grade}%`);
console.log(introductions);
// ["Alice scored 92%", "Bob scored 78%", "Charlie scored 65%"]

// Add new property to each object
const withLetterGrade = students.map(s => ({
    ...s,
    letterGrade: s.grade >= 90 ? 'A' : s.grade >= 80 ? 'B' : 'C'
}));
```

---

### Finding with `find()`

```javascript
const students = [
    { id: 1, name: "Alice", grade: 92 },
    { id: 2, name: "Bob", grade: 78 },
    { id: 3, name: "Charlie", grade: 65 }
];

// Find first matching object
const bob = students.find(student => student.name === "Bob");
console.log(bob);  // { id: 2, name: "Bob", grade: 78 }

// Find by id
const student = students.find(s => s.id === 3);
console.log(student);  // { id: 3, name: "Charlie", grade: 65 }

// Returns undefined if not found
const notFound = students.find(s => s.name === "David");
console.log(notFound);  // undefined
```

---

### Other Useful Array Methods with Objects

```javascript
const products = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Mouse", price: 25, inStock: true },
    { name: "Keyboard", price: 75, inStock: false }
];

// some() - check if any product is out of stock
const hasOutOfStock = products.some(p => p.inStock === false);
console.log(hasOutOfStock);  // true

// every() - check if all products are in stock
const allInStock = products.every(p => p.inStock === true);
console.log(allInStock);  // false

// reduce() - calculate total value
const totalValue = products.reduce((sum, p) => sum + p.price, 0);
console.log(totalValue);  // 1100

// forEach() - loop through objects
products.forEach(p => {
    console.log(`${p.name}: $${p.price}`);
});
```

---

## 🔄 Part 3: JSON (JavaScript Object Notation)

### What is JSON?

JSON is a lightweight data format used to exchange data between a server and a client. It looks like JavaScript objects but with stricter rules.

**JSON Rules:**
- Keys must be in double quotes
- Strings must be in double quotes (not single)
- No comments allowed
- No functions or undefined values

```json
{
    "name": "Victor",
    "age": 25,
    "city": "Lagos",
    "isStudent": true,
    "hobbies": ["coding", "reading"],
    "address": {
        "street": "Main St",
        "zip": "100001"
    }
}
```

---

### `JSON.stringify()` - Object to JSON

Converts a JavaScript object into a JSON string.

```javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos",
    isStudent: true,
    hobbies: ["coding", "reading"]
};

const jsonString = JSON.stringify(person);
console.log(jsonString);
// {"name":"Victor","age":25,"city":"Lagos","isStudent":true,"hobbies":["coding","reading"]}

// Pretty print with indentation
const prettyJSON = JSON.stringify(person, null, 2);
console.log(prettyJSON);
/*
{
  "name": "Victor",
  "age": 25,
  "city": "Lagos",
  "isStudent": true,
  "hobbies": [
    "coding",
    "reading"
  ]
}
*/
```

---

### `JSON.parse()` - JSON to Object

Converts a JSON string back into a JavaScript object.

```javascript
const jsonString = '{"name":"Victor","age":25,"city":"Lagos"}';

const person = JSON.parse(jsonString);
console.log(person.name);  // "Victor"
console.log(person.age);   // 25

// Parsing array JSON
const jsonArray = '[{"name":"Alice"},{"name":"Bob"}]';
const people = JSON.parse(jsonArray);
console.log(people[0].name);  // "Alice"
```

---

### Practical Use Cases

```javascript
// Saving to localStorage (Day 12-13)
const user = { name: "Victor", theme: "dark" };
localStorage.setItem('user', JSON.stringify(user));

// Retrieving from localStorage
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name);  // "Victor"

// Sending data to an API (future week)
const data = { message: "Hello", timestamp: Date.now() };
const jsonData = JSON.stringify(data);
// Then send jsonData to server

// Receiving data from an API
// const response = await fetch('/api/data');
// const data = await response.json();  // Built-in JSON parsing
```

---

## 📝 Quick Reference

### Object Creation
```javascript
const obj = { key: "value" };
const empty = {};
const withMethod = {
    method() {
        return this.key;
    }
};
```

### Property Access
```javascript
obj.key;           // Dot notation
obj["key"];        // Bracket notation
```

### Add/Update/Delete
```javascript
obj.newKey = "value";   // Add
obj.key = "new";        // Update
delete obj.key;         // Delete
```

### Object Methods
```javascript
Object.keys(obj);       // Array of keys
Object.values(obj);     // Array of values
Object.entries(obj);    // Array of [key, value]
```

### Array of Objects Methods
```javascript
array.filter(obj => condition);   // Filter
array.map(obj => transform);      // Transform
array.find(obj => condition);     // Find first
array.some(obj => condition);     // Check any
array.every(obj => condition);    // Check all
```

### JSON Methods
```javascript
JSON.stringify(obj);    // Object → JSON string
JSON.parse(json);       // JSON string → Object
```

---

## ✅ Day 16 Checklist

- [ ] Create objects with `{}` syntax
- [ ] Access properties with dot and bracket notation
- [ ] Add, update, and delete properties
- [ ] Create object methods with `this`
- [ ] Build arrays of objects
- [ ] Filter objects with `filter()`
- [ ] Transform objects with `map()`
- [ ] Find objects with `find()`
- [ ] Understand JSON format rules
- [ ] Convert objects to JSON with `JSON.stringify()`
- [ ] Convert JSON to objects with `JSON.parse()`
- [ ] Build Student Records mini-project
- [ ] Build Product Catalog mini-project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Objects group related data** — perfect for representing real-world entities
2. **Use dot notation** for known property names; bracket notation for dynamic keys
3. **`this` refers to the object** inside a method
4. **Arrays of objects** are the standard way to manage collections of data
5. **`filter()` selects objects** that match a condition
6. **`map()` transforms objects** into new arrays
7. **`find()` gets the first match** — perfect for finding by id
8. **JSON is text format** for data exchange between systems
9. **`JSON.stringify()` and `JSON.parse()`** convert between JS objects and JSON
10. **LocalStorage stores strings** — use JSON.stringify() to save objects

