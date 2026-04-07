# 📘 JavaScript Object Methods Reference

## Object Static Methods

### Object.keys()
Returns array of object's own enumerable property names.
```javascript
const person = { name: "Victor", age: 25, city: "Lagos" };
const keys = Object.keys(person);
console.log(keys);  // ["name", "age", "city"]
Object.values()
Returns array of object's own enumerable property values.

javascript
const person = { name: "Victor", age: 25, city: "Lagos" };
const values = Object.values(person);
console.log(values);  // ["Victor", 25, "Lagos"]
Object.entries()
Returns array of [key, value] pairs.

javascript
const person = { name: "Victor", age: 25 };
const entries = Object.entries(person);
console.log(entries);  // [["name", "Victor"], ["age", 25]]

// Useful for iteration
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
Object.assign()
Copies properties from source objects to target object.

javascript
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target);  // { a: 1, b: 2, c: 3 }

// Create a copy (shallow)
const copy = Object.assign({}, original);

// Merge objects
const merged = Object.assign({}, obj1, obj2);
Object.freeze()
Prevents adding, deleting, or modifying properties.

javascript
const obj = { name: "Victor", age: 25 };
Object.freeze(obj);

obj.name = "Alice";     // Silent fail
obj.city = "Lagos";     // Silent fail
delete obj.age;         // Silent fail

console.log(Object.isFrozen(obj));  // true
Object.seal()
Prevents adding or deleting properties, allows modifying.

javascript
const obj = { name: "Victor", age: 25 };
Object.seal(obj);

obj.name = "Alice";     // Works
obj.city = "Lagos";     // Silent fail
delete obj.age;         // Silent fail

console.log(Object.isSealed(obj));  // true
Object.hasOwn()
Checks if object has own property (recommended over hasOwnProperty).

javascript
const person = { name: "Victor" };
console.log(Object.hasOwn(person, "name"));  // true
console.log(Object.hasOwn(person, "age"));   // false
Object.create()
Creates a new object with specified prototype.

javascript
const parent = { greet() { return "Hello"; } };
const child = Object.create(parent);
child.name = "Victor";

console.log(child.name);   // "Victor"
console.log(child.greet()); // "Hello" (inherited)
Object.defineProperty()
Defines a new property with custom descriptor.

javascript
const obj = {};

Object.defineProperty(obj, "readOnly", {
    value: 42,
    writable: false,
    enumerable: true,
    configurable: true
});

obj.readOnly = 100;  // Silent fail
console.log(obj.readOnly);  // 42
Object.defineProperties()
Defines multiple properties.

javascript
const obj = {};

Object.defineProperties(obj, {
    prop1: { value: 1, writable: true },
    prop2: { value: 2, writable: true }
});
Object.getOwnPropertyDescriptor()
Returns property descriptor.

javascript
const obj = { name: "Victor" };
const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
console.log(descriptor);
// { value: "Victor", writable: true, enumerable: true, configurable: true }
Object.getOwnPropertyNames()
Returns array of all property names (including non-enumerable).

javascript
const obj = { a: 1, b: 2 };
Object.defineProperty(obj, "c", { value: 3, enumerable: false });

console.log(Object.keys(obj));        // ["a", "b"] (enumerable only)
console.log(Object.getOwnPropertyNames(obj)); // ["a", "b", "c"] (all)
Object.getOwnPropertySymbols()
Returns array of symbol properties.

javascript
const sym = Symbol("id");
const obj = { [sym]: 123, name: "Victor" };
const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols);  // [Symbol(id)]
Object.getPrototypeOf()
Returns prototype of object.

javascript
const obj = {};
const proto = Object.getPrototypeOf(obj);
console.log(proto === Object.prototype);  // true
Object.setPrototypeOf()
Sets prototype of object.

javascript
const parent = { greet() { return "Hello"; } };
const child = { name: "Victor" };
Object.setPrototypeOf(child, parent);
console.log(child.greet());  // "Hello"
Object.is()
Compares if two values are the same (similar to === but handles NaN).

javascript
console.log(Object.is(5, 5));        // true
console.log(Object.is(NaN, NaN));    // true (=== would be false)
console.log(Object.is(-0, +0));      // false (=== would be true)
Object.groupBy() (ES2024)
Groups array elements by a key.

javascript
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 25 }
];

const grouped = Object.groupBy(people, person => person.age);
console.log(grouped);
// {
//     "25": [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }],
//     "30": [{ name: "Bob", age: 30 }]
// }
Array Methods with Objects
filter()
Creates new array with objects that pass test.

javascript
const products = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Mouse", price: 25, inStock: true },
    { name: "Keyboard", price: 75, inStock: false }
];

const inStock = products.filter(p => p.inStock);
console.log(inStock);
// [{ name: "Laptop", price: 1000, inStock: true }, { name: "Mouse", price: 25, inStock: true }]

const affordable = products.filter(p => p.price < 50);
// [{ name: "Mouse", price: 25, inStock: true }]
map()
Creates new array by transforming objects.

javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

// Extract names
const names = users.map(u => u.name);
console.log(names);  // ["Alice", "Bob", "Charlie"]

// Create formatted strings
const introductions = users.map(u => `${u.name} is ${u.age} years old`);
// ["Alice is 25 years old", "Bob is 30 years old", "Charlie is 35 years old"]

// Add new property
const withIsAdult = users.map(u => ({ ...u, isAdult: u.age >= 18 }));
find()
Returns first object that matches condition.

javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
console.log(user);  // { id: 2, name: "Bob" }

const notFound = users.find(u => u.id === 99);
console.log(notFound);  // undefined
findIndex()
Returns index of first object that matches condition.

javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const index = users.findIndex(u => u.id === 2);
console.log(index);  // 1

// Remove object at found index
if (index !== -1) {
    users.splice(index, 1);
}
some()
Checks if at least one object passes test.

javascript
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 }
];

const hasExpensive = products.some(p => p.price > 500);
console.log(hasExpensive);  // true

const hasFree = products.some(p => p.price === 0);
console.log(hasFree);  // false
every()
Checks if all objects pass test.

javascript
const products = [
    { name: "Laptop", inStock: true },
    { name: "Mouse", inStock: true },
    { name: "Keyboard", inStock: true }
];

const allInStock = products.every(p => p.inStock);
console.log(allInStock);  // true

const products2 = [
    { name: "Laptop", inStock: true },
    { name: "Mouse", inStock: false }
];
console.log(products2.every(p => p.inStock));  // false
reduce()
Accumulates objects into single value.

javascript
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 }
];

// Sum of all prices
const total = products.reduce((sum, p) => sum + p.price, 0);
console.log(total);  // 1100

// Group by property
const fruits = [
    { name: "apple", category: "fruit" },
    { name: "banana", category: "fruit" },
    { name: "carrot", category: "vegetable" }
];

const grouped = fruits.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
}, {});
sort()
Sorts array of objects.

javascript
const products = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 }
];

// Sort by price (ascending)
products.sort((a, b) => a.price - b.price);
// Mouse (25), Keyboard (75), Laptop (1000)

// Sort by price (descending)
products.sort((a, b) => b.price - a.price);

// Sort by name (string)
const users = [
    { name: "Charlie" },
    { name: "Alice" },
    { name: "Bob" }
];
users.sort((a, b) => a.name.localeCompare(b.name));
// Alice, Bob, Charlie
forEach()
Iterates through array of objects.

javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

users.forEach(user => {
    console.log(`${user.name} is ${user.age} years old`);
});

// Modify objects (directly)
users.forEach(user => {
    user.isAdult = user.age >= 18;
});
Common Patterns with Objects
Convert Array to Object
javascript
// From array of pairs
const pairs = [["name", "Victor"], ["age", 25]];
const obj = Object.fromEntries(pairs);
console.log(obj);  // { name: "Victor", age: 25 }

// From array of objects (grouping)
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];
const usersById = Object.fromEntries(users.map(u => [u.id, u]));
// { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" } }
Convert Object to Array
javascript
const obj = { a: 1, b: 2, c: 3 };

// Keys
const keys = Object.keys(obj);      // ["a", "b", "c"]

// Values
const values = Object.values(obj);  // [1, 2, 3]

// Pairs
const pairs = Object.entries(obj);  // [["a",1], ["b",2], ["c",3]]
Pick Specific Properties
javascript
function pick(obj, keys) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => keys.includes(key))
    );
}

const user = { id: 1, name: "Victor", password: "secret", email: "victor@example.com" };
const safe = pick(user, ["id", "name", "email"]);
// { id: 1, name: "Victor", email: "victor@example.com" }
Omit Specific Properties
javascript
function omit(obj, keysToRemove) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
    );
}

const user = { id: 1, name: "Victor", password: "secret", email: "victor@example.com" };
const safe = omit(user, ["password"]);
// { id: 1, name: "Victor", email: "victor@example.com" }
Merge Objects
javascript
const defaults = { theme: "light", fontSize: 16 };
const userPrefs = { theme: "dark" };

// Shallow merge (last wins)
const settings = { ...defaults, ...userPrefs };
// { theme: "dark", fontSize: 16 }

// Deep merge (custom function)
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === "object") {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}