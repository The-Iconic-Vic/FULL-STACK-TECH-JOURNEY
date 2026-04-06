# 📘 JavaScript Array Methods Reference

## Adding/Removing Elements

### push() - Add to End
```javascript
const arr = [1, 2, 3];
arr.push(4);           // [1, 2, 3, 4]
arr.push(5, 6);        // [1, 2, 3, 4, 5, 6]
const len = arr.push(7);  // len = 7
pop() - Remove from End
javascript
const arr = [1, 2, 3, 4];
const last = arr.pop();   // last = 4, arr = [1, 2, 3]
unshift() - Add to Beginning
javascript
const arr = [3, 4, 5];
arr.unshift(1, 2);    // [1, 2, 3, 4, 5]
shift() - Remove from Beginning
javascript
const arr = [1, 2, 3, 4];
const first = arr.shift();  // first = 1, arr = [2, 3, 4]
Extracting and Combining
slice() - Extract Portion
javascript
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 4);      // [2, 3, 4] (index 1 to 3)
arr.slice(2);         // [3, 4, 5] (index 2 to end)
arr.slice(-2);        // [4, 5] (last 2)
arr.slice();          // [1, 2, 3, 4, 5] (shallow copy)
splice() - Add/Remove at Index
javascript
const arr = [1, 2, 3, 4, 5];

// Remove
arr.splice(1, 2);     // removes 2 elements starting at index 1 -> [1, 4, 5]

// Add
arr.splice(2, 0, 6, 7); // add 6,7 at index 2 -> [1, 4, 6, 7, 5]

// Replace
arr.splice(1, 1, 8);  // replace 1 element at index 1 with 8 -> [1, 8, 6, 7, 5]
concat() - Combine Arrays
javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

arr1.concat(arr2);           // [1, 2, 3, 4]
arr1.concat(arr2, arr3);     // [1, 2, 3, 4, 5, 6]
arr1.concat(7, 8);           // [1, 2, 7, 8]

// Does not modify original
console.log(arr1);           // [1, 2]
Searching
indexOf()
javascript
const arr = [1, 2, 3, 2, 1];
arr.indexOf(2);           // 1
arr.indexOf(2, 2);        // 3 (start search from index 2)
arr.indexOf(5);           // -1 (not found)
lastIndexOf()
javascript
const arr = [1, 2, 3, 2, 1];
arr.lastIndexOf(2);       // 3
arr.lastIndexOf(2, 2);    // 1 (search backwards from index 2)
includes()
javascript
const arr = [1, 2, 3];
arr.includes(2);          // true
arr.includes(5);          // false
arr.includes(2, 2);       // false (start search from index 2)
find()
javascript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

users.find(u => u.id === 2);        // { id: 2, name: 'Bob' }
users.find(u => u.name === 'Dave'); // undefined
findIndex()
javascript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

users.findIndex(u => u.id === 2);   // 1
users.findIndex(u => u.id === 99);  // -1
Transforming
join()
javascript
const arr = ['apple', 'banana', 'orange'];
arr.join();           // 'apple,banana,orange'
arr.join(', ');       // 'apple, banana, orange'
arr.join(' - ');      // 'apple - banana - orange'
arr.join('');         // 'applebananaorange'
reverse()
javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();        // [5, 4, 3, 2, 1]
// Modifies original array
sort()
javascript
// Strings
const letters = ['c', 'a', 'b'];
letters.sort();       // ['a', 'b', 'c']

// Numbers (need compare function)
const nums = [10, 2, 5, 1];
nums.sort();          // [1, 10, 2, 5] (string comparison)
nums.sort((a, b) => a - b);   // [1, 2, 5, 10] (ascending)
nums.sort((a, b) => b - a);   // [10, 5, 2, 1] (descending)

// Objects
const users = [
    { name: 'Charlie', age: 35 },
    { name: 'Alice', age: 25 }
];
users.sort((a, b) => a.name.localeCompare(b.name));  // Sort by name
users.sort((a, b) => a.age - b.age);                 // Sort by age
Iteration Methods
forEach()
javascript
const arr = [1, 2, 3];

arr.forEach(num => console.log(num));
// 1
// 2
// 3

arr.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3

// Does not return anything (undefined)
map()
javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

const names = ['alice', 'bob', 'charlie'];
const capitalized = names.map(n => n[0].toUpperCase() + n.slice(1));
// ['Alice', 'Bob', 'Charlie']

// Creates new array, does not modify original
filter()
javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6]

const users = [
    { name: 'Alice', active: true },
    { name: 'Bob', active: false },
    { name: 'Charlie', active: true }
];
const activeUsers = users.filter(u => u.active);
// [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
reduce()
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

// Group by property
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
// { apple: 3, banana: 2, orange: 1 }
every() and some()
javascript
const numbers = [2, 4, 6, 8, 10];

// every() - all elements pass test
const allEven = numbers.every(n => n % 2 === 0);   // true
const allGreaterThan5 = numbers.every(n => n > 5); // false

// some() - at least one passes
const hasEven = numbers.some(n => n % 2 === 0);    // true
const hasGreaterThan10 = numbers.some(n => n > 10); // false
Method Comparison Table
Method	Returns	Modifies Original	Use Case
push()	New length	Yes	Add to end
pop()	Removed element	Yes	Remove from end
unshift()	New length	Yes	Add to beginning
shift()	Removed element	Yes	Remove from beginning
slice()	New array	No	Extract portion
splice()	Removed elements	Yes	Add/remove at index
concat()	New array	No	Combine arrays
indexOf()	Index or -1	No	Find index
includes()	Boolean	No	Check existence
find()	Element or undefined	No	Find element
forEach()	undefined	No	Execute function
map()	New array	No	Transform each
filter()	New array	No	Select elements
reduce()	Single value	No	Accumulate
every()	Boolean	No	Check all
some()	Boolean	No	Check any
text

---

## Chaining Methods

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chain filter, map, reduce
const result = numbers
    .filter(n => n % 2 === 0)     // [2, 4, 6, 8, 10]
    .map(n => n * 2)               // [4, 8, 12, 16, 20]
    .reduce((sum, n) => sum + n, 0); // 60

console.log(result);  // 60