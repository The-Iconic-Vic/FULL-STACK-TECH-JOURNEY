# 📘 JavaScript Looping Through Arrays Reference

## for Loop (Traditional)

Best when you need index control or want to break early.

```javascript
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];

// Basic for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// With index and value
for (let i = 0; i < fruits.length; i++) {
    console.log(`${i}: ${fruits[i]}`);
}

// Loop backwards
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(fruits[i]);
}

// Step by 2
for (let i = 0; i < fruits.length; i += 2) {
    console.log(fruits[i]);
}

// Break early
for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === 'orange') {
        console.log('Found orange at index', i);
        break;
    }
}

// Continue (skip)
for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === 'banana') {
        continue;
    }
    console.log(fruits[i]);
}
for...of Loop
Best when you only need values, not indices.

javascript
const fruits = ['apple', 'banana', 'orange'];

// Basic for...of
for (const fruit of fruits) {
    console.log(fruit);
}

// With break
for (const fruit of fruits) {
    if (fruit === 'banana') break;
    console.log(fruit);
}

// With continue
for (const fruit of fruits) {
    if (fruit === 'banana') continue;
    console.log(fruit);
}

// Getting index with entries()
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}

// Strings are iterable
for (const char of 'hello') {
    console.log(char);  // 'h', 'e', 'l', 'l', 'o'
}
forEach() Method
Most common for array iteration. Cannot break or continue.

javascript
const fruits = ['apple', 'banana', 'orange'];

// Basic forEach
fruits.forEach(function(fruit) {
    console.log(fruit);
});

// Arrow function
fruits.forEach(fruit => console.log(fruit));

// With index
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

// With array parameter
fruits.forEach((fruit, index, array) => {
    console.log(`${index}: ${fruit} in [${array}]`);
});

// Cannot break (use for loop if you need break)
// This will NOT work:
fruits.forEach(fruit => {
    if (fruit === 'banana') break;  // Syntax Error
});
for...in Loop (Not Recommended for Arrays)
Iterates over enumerable properties (including array indices as strings).

javascript
const fruits = ['apple', 'banana', 'orange'];

// Works but not recommended
for (const index in fruits) {
    console.log(fruits[index]);  // 'apple', 'banana', 'orange'
}

// Problems:
// 1. Iterates over enumerable properties (not just indices)
// 2. Order is not guaranteed
// 3. Includes prototype properties

// Adding a custom property
fruits.custom = 'hello';
for (const index in fruits) {
    console.log(index);  // '0', '1', '2', 'custom'
}

// Use for...of or forEach instead
map() Method
Creates a new array by transforming each element.

javascript
const numbers = [1, 2, 3, 4, 5];

// Transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// With index
const indexed = numbers.map((n, i) => `${i}: ${n}`);
console.log(indexed);  // ['0: 1', '1: 2', '2: 3', '3: 4', '4: 5']

// Map array of objects
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];
const names = users.map(u => u.name);
console.log(names);  // ['Alice', 'Bob']
filter() Method
Creates a new array with elements that pass a test.

javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Filter numbers greater than 5
const greaterThan5 = numbers.filter(n => n > 5);
console.log(greaterThan5);  // [6, 7, 8, 9, 10]

// Filter objects
const users = [
    { name: 'Alice', active: true },
    { name: 'Bob', active: false },
    { name: 'Charlie', active: true }
];
const activeUsers = users.filter(u => u.active);
console.log(activeUsers);  // [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
reduce() Method
Reduces array to a single value.

javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((total, current) => total + current, 0);
console.log(sum);  // 15

// Product
const product = numbers.reduce((total, current) => total * current, 1);
console.log(product);  // 120

// Max value
const max = numbers.reduce((max, current) => current > max ? current : max, numbers[0]);
console.log(max);  // 5

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count);  // { apple: 3, banana: 2, orange: 1 }

// Group by property
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 }
];
const groupedByAge = people.reduce((acc, person) => {
    const age = person.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(person);
    return acc;
}, {});
every() and some() Methods
javascript
const numbers = [2, 4, 6, 8, 10];

// every() - all elements must pass
const allEven = numbers.every(n => n % 2 === 0);   // true
const allGreaterThan5 = numbers.every(n => n > 5); // false

// some() - at least one must pass
const hasEven = numbers.some(n => n % 2 === 0);    // true
const hasGreaterThan10 = numbers.some(n => n > 10); // false

// Practical examples
const cart = [
    { item: 'Laptop', price: 1000, inStock: true },
    { item: 'Mouse', price: 20, inStock: true },
    { item: 'Keyboard', price: 50, inStock: false }
];

// Check if all items are in stock
const allInStock = cart.every(item => item.inStock);  // false

// Check if any item is expensive (> $500)
const hasExpensiveItem = cart.some(item => item.price > 500);  // true
Method Comparison Table
Method	Use Case	Returns	Can Break	Has Index
for loop	Need index, custom increment	Nothing	Yes	Yes
for...of	Values only	Nothing	Yes	No (use entries)
forEach()	Execute for each item	undefined	No	Yes
map()	Transform each item	New array	No	Yes
filter()	Select items	New array	No	Yes
reduce()	Combine to single value	Single value	No	Yes
every()	Check if all pass	Boolean	No (early exit)	Yes
some()	Check if any pass	Boolean	No (early exit)	Yes
Performance Considerations
javascript
// For loops are fastest
const arr = [1, 2, 3, 4, 5];

// Fastest
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// Cached length (slightly faster)
for (let i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}

// Slightly slower but more readable
for (const item of arr) {
    console.log(item);
}

// Slower but functional
arr.forEach(item => console.log(item));
When to Use Which
Scenario	Best Choice
Need to break early	for loop or for...of
Need index and can't break	forEach()
Need to transform each item	map()
Need to filter items	filter()
Need to sum/reduce to single value	reduce()
Need to check condition on all items	every() or some()
Need index and want to break	for loop
Only need values, want to break	for...of
Need to execute side effects (DOM updates)	forEach()