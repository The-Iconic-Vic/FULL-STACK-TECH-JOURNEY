# 📅 Day 15: JavaScript Arrays & Array Methods

**Date:** April 6, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Arrays, Array Methods, Looping Through Arrays

---

## 📋 Learning Objectives

- ✅ Create arrays using `[]` and `new Array()`
- ✅ Access array elements by index (0-based)
- ✅ Use the `length` property
- ✅ Modify arrays with `push()`, `pop()`, `unshift()`, `shift()`
- ✅ Find elements with `indexOf()`, `includes()`, `find()`
- ✅ Create strings with `join()`
- ✅ Combine arrays with `concat()`
- ✅ Loop through arrays with `for` loop, `forEach()`, `for...of`

---

## 📦 Part 1: Arrays Fundamentals

### What is an Array?

An array is a data structure that stores multiple values in a single variable. Think of it as a numbered list.

```javascript
// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = ['text', 42, true, null];
const empty = [];

// Using new Array() (less common)
const arr = new Array(5);     // Creates array with 5 empty slots
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
```

---

### Accessing Elements by Index

Array indices start at **0** (first element is index 0).

```javascript
const fruits = ['apple', 'banana', 'orange'];

console.log(fruits[0]);  // 'apple'
console.log(fruits[1]);  // 'banana'
console.log(fruits[2]);  // 'orange'
console.log(fruits[3]);  // undefined (doesn't exist)

// Modifying elements
fruits[1] = 'blueberry';
console.log(fruits);  // ['apple', 'blueberry', 'orange']
```

---

### The `length` Property

The `length` property returns the number of elements in an array.

```javascript
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.length);  // 3

// length is writeable
fruits.length = 2;
console.log(fruits);  // ['apple', 'banana'] (last element removed)

// Last element trick
const lastItem = fruits[fruits.length - 1];
console.log(lastItem);  // 'banana'
```

---

### Modifying Arrays by Index

```javascript
const items = ['a', 'b', 'c'];

// Change value at index
items[1] = 'z';
console.log(items);  // ['a', 'z', 'c']

// Add at specific index (leaves empty slots)
items[5] = 'f';
console.log(items);  // ['a', 'z', 'c', empty, empty, 'f']
console.log(items.length);  // 6
```

---

## 🔧 Part 2: Essential Array Methods

### Adding Elements

| Method | Description | Example |
|--------|-------------|---------|
| `push()` | Adds to **end** | `arr.push('item')` |
| `unshift()` | Adds to **beginning** | `arr.unshift('item')` |

```javascript
const fruits = ['apple', 'banana'];

// push() - add to end
fruits.push('orange');
console.log(fruits);  // ['apple', 'banana', 'orange']

// unshift() - add to beginning
fruits.unshift('grape');
console.log(fruits);  // ['grape', 'apple', 'banana', 'orange']

// push returns new length
const newLength = fruits.push('kiwi');
console.log(newLength);  // 5
```

---

### Removing Elements

| Method | Description | Example |
|--------|-------------|---------|
| `pop()` | Removes from **end** | `const last = arr.pop()` |
| `shift()` | Removes from **beginning** | `const first = arr.shift()` |

```javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// pop() - remove from end
const last = fruits.pop();
console.log(last);     // 'grape'
console.log(fruits);   // ['apple', 'banana', 'orange']

// shift() - remove from beginning
const first = fruits.shift();
console.log(first);    // 'apple'
console.log(fruits);   // ['banana', 'orange']
```

---

### Finding Elements

| Method | Description | Returns |
|--------|-------------|---------|
| `indexOf()` | Finds index of value | Index or -1 |
| `lastIndexOf()` | Finds last index of value | Index or -1 |
| `includes()` | Checks if value exists | Boolean |
| `find()` | Finds first matching element | Element or undefined |
| `findIndex()` | Finds index of first match | Index or -1 |

```javascript
const fruits = ['apple', 'banana', 'orange', 'banana'];

// indexOf()
console.log(fruits.indexOf('banana'));     // 1
console.log(fruits.indexOf('grape'));      // -1 (not found)
console.log(fruits.indexOf('banana', 2));  // 3 (start search from index 2)

// lastIndexOf()
console.log(fruits.lastIndexOf('banana')); // 3

// includes()
console.log(fruits.includes('orange'));    // true
console.log(fruits.includes('grape'));     // false

// find() - works with objects
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

const user = users.find(u => u.name === 'Bob');
console.log(user);  // { name: 'Bob', age: 30 }

// findIndex()
const index = users.findIndex(u => u.age === 30);
console.log(index);  // 1
```

---

### Creating Strings from Arrays

```javascript
const fruits = ['apple', 'banana', 'orange'];

// join() - combines with separator
console.log(fruits.join());           // 'apple,banana,orange'
console.log(fruits.join(', '));       // 'apple, banana, orange'
console.log(fruits.join(' - '));      // 'apple - banana - orange'
console.log(fruits.join(''));         // 'applebananaorange'

// toString() - similar to join(',')
console.log(fruits.toString());       // 'apple,banana,orange'
```

---

### Combining Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// concat() - combines arrays
const combined = arr1.concat(arr2);
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Multiple arrays
const arr3 = [7, 8, 9];
const all = arr1.concat(arr2, arr3);
console.log(all);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Spread operator (modern alternative)
const spreadCombined = [...arr1, ...arr2];
console.log(spreadCombined);  // [1, 2, 3, 4, 5, 6]
```

---

### Other Useful Methods

| Method | Description | Example |
|--------|-------------|---------|
| `slice()` | Creates shallow copy | `arr.slice(1, 3)` |
| `splice()` | Adds/removes at position | `arr.splice(1, 2, 'new')` |
| `reverse()` | Reverses array | `arr.reverse()` |
| `sort()` | Sorts array | `arr.sort()` |

```javascript
// slice() - creates new array from portion
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
const citrus = fruits.slice(1, 4);  // from index 1 to 4 (not including 4)
console.log(citrus);  // ['banana', 'orange', 'grape']

// splice() - modifies original
const removed = fruits.splice(2, 1, 'mango');
console.log(fruits);   // ['apple', 'banana', 'mango', 'grape', 'kiwi']
console.log(removed);  // ['orange']

// reverse()
const numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers);  // [5, 4, 3, 2, 1]

// sort() - converts to strings then sorts
const letters = ['c', 'a', 'b', 'e', 'd'];
letters.sort();
console.log(letters);  // ['a', 'b', 'c', 'd', 'e']

// sort() with numbers (needs compare function)
const nums = [10, 2, 5, 1, 100];
nums.sort((a, b) => a - b);
console.log(nums);  // [1, 2, 5, 10, 100]
```

---

## 🔄 Part 3: Looping Through Arrays

### for Loop (Traditional)

```javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Basic for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// For loop with index
for (let i = 0; i < fruits.length; i++) {
    console.log(`${i}: ${fruits[i]}`);
}

// For loop backwards
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(fruits[i]);
}
```

---

### for...of Loop

Simpler syntax when you only need values, not indices.

```javascript
const fruits = ['apple', 'banana', 'orange'];

for (const fruit of fruits) {
    console.log(fruit);
}

// With index (using entries)
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
```

---

### forEach() Method

The most common array iteration method.

```javascript
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
```

---

### Comparison of Looping Methods

| Method | Use Case | Can Break? | Has Index? |
|--------|----------|------------|------------|
| `for` loop | Need index, custom increment | Yes | Yes |
| `for...of` | Values only, no index needed | Yes | No (use entries) |
| `forEach()` | Execute function for each | No | Yes |

```javascript
// When to use each

// Use for loop when you need to break early
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === target) {
        break;
    }
}

// Use for...of when you only need values
for (const item of items) {
    console.log(item);
}

// Use forEach for side effects (like DOM updates)
items.forEach(item => {
    list.innerHTML += `<li>${item}</li>`;
});
```

---

## 📝 Quick Reference

### Array Creation
```javascript
const arr = [1, 2, 3];
const empty = [];
const arr2 = new Array(5);
```

### Common Methods

| Method | Action | Modifies Original |
|--------|--------|-------------------|
| `push()` | Add to end | Yes |
| `pop()` | Remove from end | Yes |
| `unshift()` | Add to beginning | Yes |
| `shift()` | Remove from beginning | Yes |
| `concat()` | Combine arrays | No |
| `slice()` | Extract portion | No |
| `splice()` | Add/remove at index | Yes |
| `indexOf()` | Find index | No |
| `includes()` | Check existence | No |
| `join()` | Create string | No |
| `reverse()` | Reverse order | Yes |
| `sort()` | Sort array | Yes |

### Looping Methods
```javascript
// Traditional for
for (let i = 0; i < arr.length; i++) { }

// for...of
for (const item of arr) { }

// forEach
arr.forEach(item => { });
```

---

## ✅ Day 15 Checklist

- [ ] Create arrays with `[]`
- [ ] Access elements by index
- [ ] Use `length` property
- [ ] Add elements with `push()`, `unshift()`
- [ ] Remove elements with `pop()`, `shift()`
- [ ] Find elements with `indexOf()`, `includes()`, `find()`
- [ ] Create strings with `join()`
- [ ] Combine arrays with `concat()`
- [ ] Loop with `for` loop
- [ ] Loop with `for...of`
- [ ] Loop with `forEach()`
- [ ] Build Shopping List mini-project
- [ ] Build Movie Watchlist mini-project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Arrays are zero-indexed** — first element is at index 0
2. **`length` property** gives the number of elements
3. **`push()` and `pop()`** work with the end of the array (fast)
4. **`unshift()` and `shift()`** work with the beginning (slower)
5. **`forEach()` is the most common** way to loop through arrays
6. **`for...of`** is cleaner when you don't need the index
7. **`find()`** returns the element, `findIndex()` returns the position
8. **`filter()`** creates a new array with elements that pass a test
9. **`map()`** creates a new array by transforming each element
10. **`slice()` copies**, `splice()` modifies the original
