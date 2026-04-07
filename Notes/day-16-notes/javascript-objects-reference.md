# 📘 JavaScript Objects Reference

## Creating Objects

### Object Literal (Recommended)
```javascript
// Basic object
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos"
};

// Empty object
const empty = {};

// Object with nested properties
const user = {
    name: "Alice",
    address: {
        street: "Main St",
        city: "New York",
        zip: "10001"
    }
};

// Object with computed property names
const propName = "dynamicKey";
const obj = {
    [propName]: "dynamic value",
    [`computed_${propName}`]: "another"
};
Using new Object()
javascript
const obj = new Object();
obj.name = "Victor";
obj.age = 25;
Object.create()
javascript
const prototype = { greet() { return "Hello"; } };
const obj = Object.create(prototype);
obj.name = "Victor";
console.log(obj.greet()); // "Hello"
Property Names and Values
Property Name Rules
javascript
const obj = {
    // Valid identifiers (no quotes needed)
    normalKey: "value",
    _private: "value",
    $dollar: "value",
    
    // Keys with special characters need quotes
    "key with spaces": "value",
    "123": "numeric key",
    "key-with-dash": "value"
};
Property Values
javascript
const obj = {
    // Primitive values
    string: "text",
    number: 42,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    
    // Complex values
    array: [1, 2, 3],
    object: { nested: "value" },
    
    // Function (method)
    method: function() {
        return this.string;
    },
    
    // Method shorthand
    shorthand() {
        return this.string;
    }
};
Accessing Properties
Dot Notation
javascript
const person = {
    name: "Victor",
    age: 25,
    address: {
        city: "Lagos"
    }
};

console.log(person.name);          // "Victor"
console.log(person.age);           // 25
console.log(person.address.city);  // "Lagos"
console.log(person.unknown);       // undefined
Bracket Notation
javascript
const person = {
    name: "Victor",
    "favorite color": "blue",
    "123": "numeric key"
};

// When to use bracket notation:
// 1. Keys with spaces or special characters
console.log(person["favorite color"]);  // "blue"

// 2. Numeric keys
console.log(person["123"]);             // "numeric key"

// 3. Dynamic keys (variables)
const key = "name";
console.log(person[key]);               // "Victor"

// 4. Expressions
const prefix = "favorite";
console.log(person[`${prefix} color`]); // "blue"
Adding and Updating Properties
javascript
const person = { name: "Victor" };

// Add new property
person.age = 25;
person["city"] = "Lagos";

// Add nested property
person.address = {};
person.address.street = "Main St";

// Add with computed key
const key = "email";
person[key] = "victor@example.com";

console.log(person);
// {
//     name: "Victor",
//     age: 25,
//     city: "Lagos",
//     address: { street: "Main St" },
//     email: "victor@example.com"
// }

// Update existing property
person.age = 26;
person["city"] = "Abuja";
Deleting Properties
javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos",
    password: "secret"
};

// Delete property
delete person.age;
console.log(person);  // { name: "Victor", city: "Lagos", password: "secret" }

// Delete nested property
delete person.address?.street;

// Delete returns true if successful
const result = delete person.password;
console.log(result);  // true

// Check if property exists
console.log("name" in person);      // true
console.log("age" in person);       // false
console.log(person.hasOwnProperty("name"));  // true
Object Methods
Method Definitions
javascript
const calculator = {
    // Traditional function
    add: function(a, b) {
        return a + b;
    },
    
    // Method shorthand (ES6+)
    subtract(a, b) {
        return a - b;
    },
    
    // Using arrow function (careful with 'this')
    multiply: (a, b) => a * b,
    
    // Method accessing 'this'
    value: 42,
    getValue() {
        return this.value;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(5, 3)); // 2
console.log(calculator.multiply(5, 3)); // 15
console.log(calculator.getValue());     // 42
The this Keyword
javascript
const person = {
    name: "Victor",
    
    // 'this' refers to the person object
    greet() {
        return `Hello, I'm ${this.name}`;
    },
    
    // Arrow function does NOT bind 'this'
    arrowGreet: () => {
        return `Hello, I'm ${this.name}`;  // 'this' is not person!
    },
    
    // Nested function - careful with 'this'
    delayedGreet() {
        setTimeout(function() {
            console.log(this.name);  // 'this' is window, not person!
        }, 1000);
    },
    
    // Fix with arrow function
    delayedGreetFixed() {
        setTimeout(() => {
            console.log(this.name);  // 'this' is person (lexical binding)
        }, 1000);
    }
};
Object Iteration
for...in Loop
javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos"
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// name: Victor
// age: 25
// city: Lagos
Object.keys(), Object.values(), Object.entries()
javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos"
};

// Get all keys
const keys = Object.keys(person);
console.log(keys);  // ["name", "age", "city"]

// Get all values
const values = Object.values(person);
console.log(values);  // ["Victor", 25, "Lagos"]

// Get key-value pairs
const entries = Object.entries(person);
console.log(entries);  // [["name", "Victor"], ["age", 25], ["city", "Lagos"]]

// Using forEach with entries
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
Object Copying
Shallow Copy
javascript
const original = { a: 1, b: { c: 2 } };

// Spread operator
const copy1 = { ...original };

// Object.assign()
const copy2 = Object.assign({}, original);

// Both create shallow copies - nested objects are still referenced
copy1.b.c = 3;
console.log(original.b.c);  // 3 (changed!)

// Spread for arrays
const arrCopy = [...originalArray];
Deep Copy
javascript
const original = { a: 1, b: { c: 2 } };

// JSON methods (works for JSON-serializable data)
const deepCopy = JSON.parse(JSON.stringify(original));

// Now nested objects are independent
deepCopy.b.c = 3;
console.log(original.b.c);  // 2 (unchanged!)

// Note: JSON methods don't work with functions, undefined, symbols
Object Freezing and Sealing
Object.freeze()
Prevents adding, deleting, or modifying properties.

javascript
const obj = { name: "Victor", age: 25 };
Object.freeze(obj);

obj.name = "Alice";     // Silent fail (or error in strict mode)
obj.city = "Lagos";     // Silent fail
delete obj.age;         // Silent fail

console.log(obj);       // { name: "Victor", age: 25 }
console.log(Object.isFrozen(obj));  // true
Object.seal()
Prevents adding or deleting properties, but allows modifying.

javascript
const obj = { name: "Victor", age: 25 };
Object.seal(obj);

obj.name = "Alice";     // Works
obj.city = "Lagos";     // Silent fail (can't add)
delete obj.age;         // Silent fail (can't delete)

console.log(obj);       // { name: "Alice", age: 25 }
console.log(Object.isSealed(obj));  // true
Object Utility Methods
javascript
const obj = { a: 1, b: 2 };

// Check if object has property
console.log(obj.hasOwnProperty("a"));     // true
console.log("a" in obj);                  // true

// Get property descriptor
const descriptor = Object.getOwnPropertyDescriptor(obj, "a");
console.log(descriptor);
// { value: 1, writable: true, enumerable: true, configurable: true }

// Define property with custom descriptor
Object.defineProperty(obj, "c", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: true
});

obj.c = 10;  // Silent fail (not writable)
console.log(obj.c);  // 3
Object Destructuring
javascript
const person = {
    name: "Victor",
    age: 25,
    city: "Lagos",
    country: "Nigeria"
};

// Basic destructuring
const { name, age } = person;
console.log(name, age);  // "Victor", 25

// Rename variables
const { name: userName, city: userCity } = person;
console.log(userName, userCity);  // "Victor", "Lagos"

// Default values
const { job = "Developer" } = person;
console.log(job);  // "Developer" (default)

// Nested destructuring
const user = {
    name: "Victor",
    address: {
        city: "Lagos",
        street: "Main St"
    }
};
const { address: { city, street } } = user;
console.log(city, street);  // "Lagos", "Main St"

// Rest operator
const { name: firstName, ...rest } = person;
console.log(firstName);  // "Victor"
console.log(rest);       // { age: 25, city: "Lagos", country: "Nigeria" }
Optional Chaining (?.)
Safe access to nested properties without errors.

javascript
const user = {
    name: "Victor",
    address: {
        city: "Lagos"
    }
};

// Without optional chaining (throws error if undefined)
// const zip = user.address.zip;  // undefined
// const street = user.address.street; // undefined

// With optional chaining
const zip = user.address?.zip;
console.log(zip);  // undefined (no error)

const street = user.address?.street?.name;
console.log(street);  // undefined

// With function calls
const result = user.getName?.();  // undefined if getName doesn't exist
Nullish Coalescing (??)
Provides default value only for null or undefined (not for falsy values).

javascript
const obj = { count: 0, name: "" };

// || gives default for any falsy value
const count1 = obj.count || 10;     // 10 (because 0 is falsy)
const name1 = obj.name || "Guest";  // "Guest" (because "" is falsy)

// ?? gives default only for null/undefined
const count2 = obj.count ?? 10;     // 0 (preserves 0)
const name2 = obj.name ?? "Guest";  // "" (preserves empty string)
const missing = obj.age ?? 18;      // 18 (age is undefined)