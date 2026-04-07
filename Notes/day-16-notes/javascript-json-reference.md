# 📘 JavaScript JSON Reference

## What is JSON?

JSON (JavaScript Object Notation) is a lightweight data format used for data exchange. It is language-independent but uses conventions familiar to JavaScript programmers.

### JSON vs JavaScript Object

| Feature | JavaScript Object | JSON |
|---------|-------------------|------|
| Keys | Quotes optional | Must be double quotes |
| Strings | Single or double quotes | Double quotes only |
| Comments | ✅ Allowed | ❌ Not allowed |
| Functions | ✅ Allowed | ❌ Not allowed |
| undefined | ✅ Allowed | ❌ Not allowed |
| Date objects | ✅ Allowed | ❌ Not allowed (string) |

### Valid JSON Example
```json
{
    "name": "Victor",
    "age": 25,
    "isStudent": true,
    "hobbies": ["coding", "reading"],
    "address": {
        "city": "Lagos",
        "zip": "100001"
    },
    "score": null
}
Invalid JSON Examples
json
// Invalid: single quotes
{ 'name': 'Victor' }

// Invalid: unquoted key
{ name: "Victor" }

// Invalid: trailing comma
{ "name": "Victor", }

// Invalid: comments
{ "name": "Victor" /* comment */ }

// Invalid: undefined
{ "name": undefined }

// Invalid: function
{ "getName": function() { return "Victor"; } }
JSON.stringify()
Converts a JavaScript object to a JSON string.

Basic Usage
javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos",
    isStudent: true,
    hobbies: ["coding", "reading"],
    address: {
        street: "Main St",
        zip: "100001"
    }
};

const jsonString = JSON.stringify(person);
console.log(jsonString);
// {"name":"Victor","age":25,"city":"Lagos","isStudent":true,"hobbies":["coding","reading"],"address":{"street":"Main St","zip":"100001"}}
With Indentation (Pretty Print)
javascript
// 2 spaces indentation
const pretty = JSON.stringify(person, null, 2);
console.log(pretty);
/*
{
  "name": "Victor",
  "age": 25,
  "city": "Lagos",
  "isStudent": true,
  "hobbies": [
    "coding",
    "reading"
  ],
  "address": {
    "street": "Main St",
    "zip": "100001"
  }
}
*/

// Tab indentation
const tabbed = JSON.stringify(person, null, "\t");
With Replacer Function
javascript
const user = {
    name: "Victor",
    password: "secret123",
    email: "victor@example.com",
    age: 25
};

// Exclude sensitive data
const safe = JSON.stringify(user, (key, value) => {
    if (key === "password") {
        return undefined;  // Exclude password
    }
    return value;
});
console.log(safe);
// {"name":"Victor","email":"victor@example.com","age":25}

// Transform values
const transformed = JSON.stringify(user, (key, value) => {
    if (key === "age") {
        return value + 1;  // Increment age
    }
    return value;
});
With Replacer Array
javascript
const user = {
    name: "Victor",
    password: "secret123",
    email: "victor@example.com",
    age: 25
};

// Only include specific keys
const filtered = JSON.stringify(user, ["name", "email"]);
console.log(filtered);
// {"name":"Victor","email":"victor@example.com"}
JSON.parse()
Converts a JSON string back to a JavaScript object.

Basic Usage
javascript
const jsonString = '{"name":"Victor","age":25,"city":"Lagos"}';

const person = JSON.parse(jsonString);
console.log(person.name);   // "Victor"
console.log(person.age);    // 25
console.log(person.city);   // "Lagos"
Parsing Arrays
javascript
const jsonArray = '[{"name":"Alice"},{"name":"Bob"},{"name":"Charlie"}]';

const people = JSON.parse(jsonArray);
console.log(people[0].name);  // "Alice"
console.log(people.length);   // 3

people.forEach(person => {
    console.log(person.name);
});
With Reviver Function
javascript
const jsonString = '{"name":"Victor","birthday":"1995-06-15","score":"42"}';

const data = JSON.parse(jsonString, (key, value) => {
    // Convert birthday string to Date object
    if (key === "birthday") {
        return new Date(value);
    }
    // Convert score string to number
    if (key === "score") {
        return Number(value);
    }
    return value;
});

console.log(data.birthday instanceof Date);  // true
console.log(data.score);                     // 42 (number)
Error Handling
javascript
const invalidJSON = '{name: "Victor"}';  // Invalid - missing quotes

try {
    const data = JSON.parse(invalidJSON);
    console.log(data);
} catch (error) {
    console.error("Invalid JSON:", error.message);
    // Invalid JSON: Unexpected token n in JSON at position 1
}
Practical Use Cases
Saving to localStorage
javascript
// Save object
const user = { name: "Victor", theme: "dark" };
localStorage.setItem("user", JSON.stringify(user));

// Retrieve object
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name);   // "Victor"
Deep Copy (Clone) Objects
javascript
const original = {
    name: "Victor",
    address: {
        city: "Lagos",
        zip: "100001"
    },
    hobbies: ["coding", "reading"]
};

// Deep copy using JSON
const deepCopy = JSON.parse(JSON.stringify(original));

// Modify copy
deepCopy.address.city = "Abuja";
deepCopy.hobbies.push("gaming");

// Original unchanged
console.log(original.address.city);  // "Lagos"
console.log(original.hobbies);       // ["coding", "reading"]
API Communication (Preview - Future Week)
javascript
// Sending data to server
async function sendData(data) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

// Receiving data from server
async function fetchData() {
    const response = await fetch("/api/users");
    const users = await response.json();  // Automatically parses JSON
    return users;
}
JSON Limitations
What JSON Cannot Represent
javascript
const obj = {
    // Functions are lost
    greet: function() { return "Hello"; },
    
    // undefined becomes null
    optional: undefined,
    
    // Symbol is ignored
    id: Symbol("id"),
    
    // Date becomes string
    date: new Date(),
    
    // NaN and Infinity become null
    notANumber: NaN,
    infinity: Infinity
};

const json = JSON.stringify(obj);
console.log(json);
// {"optional":null,"date":"2024-01-01T00:00:00.000Z","notANumber":null,"infinity":null}
// greet and id are missing
Circular References
javascript
const obj = { name: "Victor" };
obj.self = obj;  // Circular reference

// This throws an error
// JSON.stringify(obj);  // TypeError: Converting circular structure to JSON
JSON Schema Basics
JSON Schema is used to validate JSON structure (for APIs).

json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": { "type": "string", "minLength": 1 },
        "age": { "type": "number", "minimum": 0, "maximum": 150 },
        "email": { "type": "string", "format": "email" }
    },
    "required": ["name", "email"]
}
Common JSON Patterns
API Response Format
json
{
    "status": "success",
    "code": 200,
    "data": {
        "users": [
            { "id": 1, "name": "Alice" },
            { "id": 2, "name": "Bob" }
        ]
    },
    "message": "Users retrieved successfully"
}
Error Response Format
json
{
    "status": "error",
    "code": 400,
    "error": {
        "message": "Invalid input",
        "details": [
            { "field": "email", "message": "Email is required" }
        ]
    }
}
Configuration File Format
json
{
    "appName": "MyApp",
    "version": "1.0.0",
    "apiUrl": "https://api.example.com",
    "features": {
        "darkMode": true,
        "notifications": false
    },
    "timeout": 5000
}