# 📘 JavaScript Arrays Reference

## Creating Arrays

```javascript
// Array literal (recommended)
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = ['text', 42, true, null];
const empty = [];

// Array constructor
const arr1 = new Array();           // []
const arr2 = new Array(5);          // [empty × 5]
const arr3 = new Array(1, 2, 3);    // [1, 2, 3]

// Array.of() - avoids single number issue
const arr4 = Array.of(5);           // [5]

// Array.from() - from iterable or array-like
const str = Array.from('hello');    // ['h', 'e', 'l', 'l', 'o']
const nodeList = Array.from(document.querySelectorAll('div'));
Accessing Elements
javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Index access (0-based)
console.log(fruits[0]);     // 'apple'
console.log(fruits[2]);     // 'orange'
console.log(fruits[10]);    // undefined

// First element
const first = fruits[0];

// Last element
const last = fruits[fruits.length - 1];

// Modify element
fruits[1] = 'blueberry';
console.log(fruits);        // ['apple', 'blueberry', 'orange', 'grape']

// Add at index (creates empty slots)
fruits[6] = 'kiwi';
console.log(fruits);        // ['apple', 'blueberry', 'orange', 'grape', empty, empty, 'kiwi']
length Property
javascript
const fruits = ['apple', 'banana', 'orange'];

// Get length
console.log(fruits.length);     // 3

// Set length (truncates)
fruits.length = 2;
console.log(fruits);            // ['apple', 'banana']

// Set length (extends with empty slots)
fruits.length = 5;
console.log(fruits);            // ['apple', 'banana', empty × 3]

// Clear array
fruits.length = 0;
console.log(fruits);            // []

// Last element trick
const last = fruits[fruits.length - 1];
Adding Elements
Method	Position	Returns	Modifies Original
push()	End	New length	Yes
unshift()	Beginning	New length	Yes
javascript
const fruits = ['apple', 'banana'];

// push() - add to end
fruits.push('orange');
console.log(fruits);    // ['apple', 'banana', 'orange']

const newLength = fruits.push('grape', 'kiwi');
console.log(newLength); // 5
console.log(fruits);    // ['apple', 'banana', 'orange', 'grape', 'kiwi']

// unshift() - add to beginning
fruits.unshift('mango');
console.log(fruits);    // ['mango', 'apple', 'banana', 'orange', 'grape', 'kiwi']

fruits.unshift('pear', 'peach');
console.log(fruits);    // ['pear', 'peach', 'mango', 'apple', 'banana', 'orange', 'grape', 'kiwi']
Removing Elements
Method	Position	Returns	Modifies Original
pop()	End	Removed element	Yes
shift()	Beginning	Removed element	Yes
javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// pop() - remove from end
const last = fruits.pop();
console.log(last);      // 'grape'
console.log(fruits);    // ['apple', 'banana', 'orange']

// shift() - remove from beginning
const first = fruits.shift();
console.log(first);     // 'apple'
console.log(fruits);    // ['banana', 'orange']
Finding Elements
Method	Description	Returns
indexOf()	Find index of value	Index or -1
lastIndexOf()	Find last index	Index or -1
includes()	Check existence	Boolean
find()	Find first match	Element or undefined
findIndex()	Find index of first match	Index or -1
javascript
const fruits = ['apple', 'banana', 'orange', 'banana', 'grape'];

// indexOf()
console.log(fruits.indexOf('banana'));      // 1
console.log(fruits.indexOf('banana', 2));   // 3 (start from index 2)
console.log(fruits.indexOf('mango'));       // -1

// lastIndexOf()
console.log(fruits.lastIndexOf('banana'));  // 3
console.log(fruits.lastIndexOf('mango'));   // -1

// includes()
console.log(fruits.includes('orange'));     // true
console.log(fruits.includes('mango'));      // false
console.log(fruits.includes('banana', 2));  // true (starts search at index 2)

// find() - for complex conditions
const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
];

const user = users.find(u => u.name === 'Bob');
console.log(user);  // { id: 2, name: 'Bob', age: 30 }

const youngUser = users.find(u => u.age < 30);
console.log(youngUser);  // { id: 1, name: 'Alice', age: 25 }

// findIndex()
const index = users.findIndex(u => u.id === 3);
console.log(index);  // 2
const notFound = users.findIndex(u => u.id === 99);
console.log(notFound);  // -1
Creating Strings from Arrays
javascript
const fruits = ['apple', 'banana', 'orange'];

// join()
console.log(fruits.join());              // 'apple,banana,orange'
console.log(fruits.join(', '));          // 'apple, banana, orange'
console.log(fruits.join(' - '));         // 'apple - banana - orange'
console.log(fruits.join(''));            // 'applebananaorange'

// toString()
console.log(fruits.toString());          // 'apple,banana,orange'

// toLocaleString()
console.log(fruits.toLocaleString());    // 'apple,banana,orange'
Combining Arrays
javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// concat()
const combined = arr1.concat(arr2);
console.log(combined);  // [1, 2, 3, 4, 5, 6]

const all = arr1.concat(arr2, arr3);
console.log(all);       // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// concat() doesn't modify original
console.log(arr1);      // [1, 2, 3]
console.log(arr2);      // [4, 5, 6]

// Spread operator (modern)
const spreadCombined = [...arr1, ...arr2];
console.log(spreadCombined);  // [1, 2, 3, 4, 5, 6]

// push() with spread
arr1.push(...arr2);
console.log(arr1);      // [1, 2, 3, 4, 5, 6]
Extracting Portions (slice)
javascript
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];

// slice(start, end) - end not included
const citrus = fruits.slice(1, 4);
console.log(citrus);    // ['banana', 'orange', 'grape']

// slice(start) - to end
const fromIndex2 = fruits.slice(2);
console.log(fromIndex2);  // ['orange', 'grape', 'kiwi']

// slice() with negative indices
const lastTwo = fruits.slice(-2);
console.log(lastTwo);   // ['grape', 'kiwi']

const middle = fruits.slice(-3, -1);
console.log(middle);    // ['orange', 'grape']

// slice() - creates shallow copy
const copy = fruits.slice();
console.log(copy);      // ['apple', 'banana', 'orange', 'grape', 'kiwi']
Adding/Removing at Index (splice)
javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Remove elements
// splice(start, deleteCount)
const removed = fruits.splice(1, 2);
console.log(removed);   // ['banana', 'orange']
console.log(fruits);    // ['apple', 'grape']

// Add elements
// splice(start, deleteCount, items...)
fruits.splice(1, 0, 'mango', 'peach');
console.log(fruits);    // ['apple', 'mango', 'peach', 'grape']

// Replace elements
fruits.splice(2, 1, 'kiwi');
console.log(fruits);    // ['apple', 'mango', 'kiwi', 'grape']

// Remove last element
fruits.splice(-1, 1);
console.log(fruits);    // ['apple', 'mango', 'kiwi']
Reversing and Sorting
javascript
// reverse()
const numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers);   // [5, 4, 3, 2, 1]

// sort() - default (string order)
const letters = ['c', 'a', 'b', 'e', 'd'];
letters.sort();
console.log(letters);   // ['a', 'b', 'c', 'd', 'e']

// sort() - numbers (needs compare function)
const nums = [10, 2, 5, 1, 100];
nums.sort();            // Wrong! [1, 10, 100, 2, 5] (string comparison)
nums.sort((a, b) => a - b);  // Ascending: [1, 2, 5, 10, 100]
nums.sort((a, b) => b - a);  // Descending: [100, 10, 5, 2, 1]

// sort() - objects
const users = [
    { name: 'Charlie', age: 35 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];

// Sort by name
users.sort((a, b) => a.name.localeCompare(b.name));
// [{ name: 'Alice'... }, { name: 'Bob'... }, { name: 'Charlie'... }]

// Sort by age
users.sort((a, b) => a.age - b.age);
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, { name: 'Charlie', age: 35 }]
Checking if Array
javascript
const arr = [1, 2, 3];
const notArr = 'hello';

// Array.isArray()
console.log(Array.isArray(arr));     // true
console.log(Array.isArray(notArr));  // false

// instanceof
console.log(arr instanceof Array);   // true
Array Destructuring
javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Basic destructuring
const [first, second] = fruits;
console.log(first);   // 'apple'
console.log(second);  // 'banana'

// Skip elements
const [first, , third] = fruits;
console.log(first);   // 'apple'
console.log(third);   // 'orange'

// Rest operator
const [head, ...tail] = fruits;
console.log(head);    // 'apple'
console.log(tail);    // ['banana', 'orange', 'grape']

// Default values
const [a, b, c, d, e = 'default'] = fruits;
console.log(e);       // 'default'

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);    // 2, 1
Common Patterns
javascript
// Copy array
const original = [1, 2, 3];
const copy = [...original];
const copy2 = original.slice();
const copy3 = Array.from(original);

// Remove duplicates
const withDuplicates = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(withDuplicates)];
console.log(unique);  // [1, 2, 3, 4]

// Flatten array (one level)
const nested = [1, [2, 3], [4, 5]];
const flat = [].concat(...nested);
console.log(flat);    // [1, 2, 3, 4, 5]

// Check if all elements pass test
const allEven = [2, 4, 6].every(n => n % 2 === 0);  // true
const anyEven = [1, 2, 3].some(n => n % 2 === 0);   // true

// Fill array
const filled = new Array(5).fill(0);
console.log(filled);  // [0, 0, 0, 0, 0]
Array Properties and Methods Quick Reference
Category	Method	Description
Properties	length	Number of elements
Add/Remove	push()	Add to end
pop()	Remove from end
unshift()	Add to beginning
shift()	Remove from beginning
splice()	Add/remove at index
Extract	slice()	Extract portion
concat()	Combine arrays
Search	indexOf()	Find index
lastIndexOf()	Find last index
includes()	Check existence
find()	Find element
findIndex()	Find index
Transform	join()	Create string
reverse()	Reverse order
sort()	Sort elements
Iterate	forEach()	Execute function
map()	Transform each
filter()	Filter elements
reduce()	Accumulate value
Check	every()	All pass test
some()	Any pass test
Array.isArray()	Is array?