# 📘 JavaScript Functions Reference

## Function Declarations

A function declaration defines a named function. It is hoisted (can be called before it appears in code).

```javascript
// Syntax
function functionName(parameter1, parameter2) {
    // code to execute
    return value;
}

// Example
function greet(name) {
    return `Hello, ${name}!`;
}

// Can be called before declaration (hoisting)
console.log(greet("Victor")); // Works!
Characteristics:

Hoisted to the top of their scope

Can be called before definition

Creates its own this binding

Can be used as constructors with new

Function Expressions
A function expression assigns a function to a variable. It is not hoisted.

javascript
// Syntax
const functionName = function(parameter1, parameter2) {
    // code to execute
    return value;
};

// Example
const greet = function(name) {
    return `Hello, ${name}!`;
};

// Cannot be called before definition (ReferenceError)
// greet("Victor"); // Error!

// Must be called after definition
console.log(greet("Victor")); // Works!
Characteristics:

Not hoisted (defined at runtime)

Can be anonymous or named

More flexible than declarations

Named Function Expression:

javascript
const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
};
Arrow Functions (ES6+)
A shorter syntax for writing functions.

javascript
// Syntax
const functionName = (parameters) => {
    // code to execute
    return value;
};

// Examples

// No parameters
const sayHello = () => {
    return "Hello!";
};

// Single parameter - parentheses optional
const greet = name => {
    return `Hello, ${name}!`;
};

// Multiple parameters
const add = (a, b) => {
    return a + b;
};

// Implicit return (no curly braces)
const multiply = (a, b) => a * b;

// Returning object (wrap in parentheses)
const createUser = (name, age) => ({ name: name, age: age });

// Multi-line needs explicit return
const processNumbers = (numbers) => {
    const doubled = numbers.map(n => n * 2);
    return doubled.reduce((sum, n) => sum + n, 0);
};
Characteristics:

Shorter syntax

No this binding (lexical this)

No arguments object

Cannot be used as constructors

Cannot be hoisted

Parameters and Arguments
Basic Parameters
javascript
function multiply(a, b) {
    return a * b;
}

multiply(5, 3);  // 15
Default Parameters
javascript
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

greet();           // "Hello, Guest!"
greet("Victor");   // "Hello, Victor!"
Rest Parameters (... )
Collects remaining arguments into an array.

javascript
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4);  // 10

function logAll(first, second, ...rest) {
    console.log(first);  // 1
    console.log(second); // 2
    console.log(rest);   // [3, 4, 5]
}
logAll(1, 2, 3, 4, 5);
Destructuring Parameters
javascript
// Object destructuring
function greet({ name, age }) {
    return `${name} is ${age} years old`;
}

const user = { name: "Victor", age: 25 };
greet(user);  // "Victor is 25 years old"

// Array destructuring
function getFirstAndSecond([first, second]) {
    return { first, second };
}

getFirstAndSecond([10, 20, 30]);  // { first: 10, second: 20 }
Return Values
javascript
// Explicit return
function add(a, b) {
    return a + b;
}

// No return (returns undefined)
function logMessage(msg) {
    console.log(msg);
    // implicit return undefined
}

// Early return
function isAdult(age) {
    if (age >= 18) {
        return true;
    }
    return false;
}

// Returning multiple values (using array or object)
function getCoordinates() {
    return { x: 10, y: 20 };
}
const { x, y } = getCoordinates();
Function Types Comparison
Feature	Declaration	Expression	Arrow
Hoisting	Yes	No	No
this binding	Own	Own	Lexical
Constructor (new)	Yes	Yes	No
arguments object	Yes	Yes	No
Syntax	Verbose	Verbose	Concise
Implicit return	No	No	Yes (single expression)
IIFE (Immediately Invoked Function Expression)
Runs as soon as it is defined.

javascript
// Syntax
(function() {
    console.log("Runs immediately");
})();

// With parameters
(function(name) {
    console.log(`Hello, ${name}`);
})("Victor");

// Arrow function IIFE
(() => {
    console.log("Arrow IIFE");
})();
Callback Functions
Functions passed as arguments to other functions.

javascript
// Callback example
function processUserInput(callback) {
    const name = prompt("Enter your name:");
    callback(name);
}

processUserInput((name) => {
    console.log(`Hello, ${name}!`);
});

// Array methods use callbacks
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num));
const doubled = numbers.map(num => num * 2);
Higher-Order Functions
Functions that take other functions as arguments or return functions.

javascript
// Returns a function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Arrow version
const multiplier = factor => number => number * factor;
Scope
javascript
// Global scope
const globalVar = "I'm global";

function example() {
    // Function scope
    const functionVar = "I'm in a function";
    
    if (true) {
        // Block scope (let, const)
        let blockVar = "I'm in a block";
        console.log(globalVar);    // Accessible
        console.log(functionVar);  // Accessible
    }
    
    // console.log(blockVar);      // Error! Not accessible outside block
}

// console.log(functionVar);       // Error! Not accessible outside function
Closures
A function that remembers variables from its outer scope even after the outer function has returned.

javascript
function counter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const increment = counter();
console.log(increment());  // 1
console.log(increment());  // 2
console.log(increment());  // 3

// Practical example
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeting("Hello");
const sayHi = createGreeting("Hi");

console.log(sayHello("Victor"));  // "Hello, Victor!"
console.log(sayHi("Victor"));     // "Hi, Victor!"