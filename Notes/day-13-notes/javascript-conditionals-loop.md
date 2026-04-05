# 📘 JavaScript Conditionals & Loops Reference

## Conditionals

### if Statement

```javascript
// Basic if
if (condition) {
    // code runs if condition is true
}

// Example
if (age >= 18) {
    console.log('You can vote');
}
if/else Statement
javascript
if (condition) {
    // runs if true
} else {
    // runs if false
}

// Example
if (age >= 18) {
    console.log('Adult');
} else {
    console.log('Minor');
}
if/else if/else Statement
javascript
if (condition1) {
    // runs if condition1 true
} else if (condition2) {
    // runs if condition1 false and condition2 true
} else {
    // runs if all conditions false
}

// Example
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}
Ternary Operator
Shortcut for simple if/else.

javascript
// Syntax
condition ? valueIfTrue : valueIfFalse;

// Example
const status = age >= 18 ? 'adult' : 'minor';

// Multiple ternaries (use sparingly)
const message = score >= 90 ? 'A' :
                score >= 80 ? 'B' :
                score >= 70 ? 'C' : 'F';
switch Statement
Best when comparing one value against many possibilities.

javascript
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code if no match
}

// Example
const day = new Date().getDay();

switch (day) {
    case 0:
        console.log('Sunday');
        break;
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday');
        break;
    case 3:
        console.log('Wednesday');
        break;
    case 4:
        console.log('Thursday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
        console.log('Saturday');
        break;
    default:
        console.log('Invalid day');
}

// Multiple cases
switch (day) {
    case 0:
    case 6:
        console.log('Weekend');
        break;
    default:
        console.log('Weekday');
}
Note: break prevents falling through to next case.

Truthy and Falsy Values
Falsy Values (act like false)
Value	Falsy?
false	✅
0	✅
"" (empty string)	✅
null	✅
undefined	✅
NaN	✅
Truthy Values (act like true)
Everything else: true, 1, "hello", [], {}, function() {}

javascript
// Shorthand checks
if (name) {  // Runs if name is not empty string, null, or undefined
    console.log(name);
}

// Default values
const username = inputName || 'Guest';
Loops
for Loop
Best when you know how many iterations.

javascript
// Syntax
for (initialization; condition; increment) {
    // code to repeat
}

// Basic
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// Loop through array
const fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Loop backwards
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(fruits[i]);
}

// Step by 2
for (let i = 0; i < 10; i += 2) {
    console.log(i);  // 0, 2, 4, 6, 8
}
for...of Loop
Iterates over iterable values (arrays, strings, etc.).

javascript
// Array
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
    console.log(fruit);
}

// String
const name = 'Victor';
for (const char of name) {
    console.log(char);  // V, i, c, t, o, r
}

// With index (using entries)
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
for...in Loop
Iterates over object properties (not recommended for arrays).

javascript
const user = {
    name: 'Victor',
    age: 25,
    city: 'Lagos'
};

for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}
while Loop
Best when you don't know how many iterations.

javascript
// Syntax
while (condition) {
    // code to repeat
}

// Example
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// User input until valid
let input = '';
while (input !== 'quit') {
    input = prompt('Enter command (quit to exit)');
    console.log(`You entered: ${input}`);
}
do...while Loop
Runs at least once.

javascript
// Syntax
do {
    // code to repeat (runs at least once)
} while (condition);

// Example
let count = 0;
do {
    console.log(count);  // Runs once even if count >= 5
    count++;
} while (count < 5);

// User input (guarantees at least one prompt)
let input;
do {
    input = prompt('Enter "yes" to continue');
} while (input !== 'yes');
Break and Continue
break
Exits the loop immediately.

javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;  // Stops at 5
    }
    console.log(i);  // 0, 1, 2, 3, 4
}

// Find first match
const numbers = [10, 20, 30, 40, 50];
let found = null;
for (const num of numbers) {
    if (num === 30) {
        found = num;
        break;
    }
}
continue
Skips the current iteration and continues to the next.

javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;  // Skip i = 2
    }
    console.log(i);  // 0, 1, 3, 4
}

// Skip even numbers
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    console.log(i);  // 1, 3, 5, 7, 9
}
Array Iteration Methods
forEach
Executes a function for each array element.

javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// Modifying DOM
document.querySelectorAll('.item').forEach(item => {
    item.classList.add('highlight');
});
map
Creates a new array by transforming each element.

javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// doubled = [2, 4, 6, 8, 10]

const names = ['alice', 'bob', 'charlie'];
const capitalized = names.map(name => name[0].toUpperCase() + name.slice(1));
// capitalized = ['Alice', 'Bob', 'Charlie']
filter
Creates a new array with elements that pass a test.

javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
// evens = [2, 4, 6]

const users = [
    { name: 'Alice', active: true },
    { name: 'Bob', active: false },
    { name: 'Charlie', active: true }
];
const activeUsers = users.filter(user => user.active);
reduce
Reduces array to a single value.

javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, current) => total + current, 0);
// sum = 15

const max = numbers.reduce((max, current) => current > max ? current : max, numbers[0]);

// Group by property
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
// count = { apple: 3, banana: 2, orange: 1 }
some / every
javascript
// some - at least one passes
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(num => num % 2 === 0);  // true

// every - all pass
const allEven = numbers.every(num => num % 2 === 0);  // false
Loop Comparison Table
Method	Use Case	Returns	Can Break
for	Need index, custom increment	Nothing	Yes
for...of	Iterate array values	Nothing	Yes
while	Unknown iterations	Nothing	Yes
forEach	Execute for each item	Nothing	No
map	Transform each item	New array	No
filter	Select items	New array	No
reduce	Combine to single value	Single value	No
some	Check if any pass	Boolean	No
every	Check if all pass	Boolean	No
Nested Loops
javascript
// Multiplication table
for (let i = 1; i <= 5; i++) {
    let row = '';
    for (let j = 1; j <= 5; j++) {
        row += `${i * j}\t`;
    }
    console.log(row);
}

// Comparing arrays
const array1 = [1, 2, 3];
const array2 = [2, 3, 4];
const common = [];

for (const item1 of array1) {
    for (const item2 of array2) {
        if (item1 === item2 && !common.includes(item1)) {
            common.push(item1);
        }
    }
}
// common = [2, 3]
Performance Tips
javascript
// Bad - recalculates length each iteration
for (let i = 0; i < array.length; i++) { }

// Good - cache length
for (let i = 0, len = array.length; i < len; i++) { }

// Bad - DOM access in loop
for (let i = 0; i < 100; i++) {
    document.querySelector('.container').innerHTML += `<div>${i}</div>`;
}

// Good - build string first
let html = '';
for (let i = 0; i < 100; i++) {
    html += `<div>${i}</div>`;
}
document.querySelector('.container').innerHTML = html;