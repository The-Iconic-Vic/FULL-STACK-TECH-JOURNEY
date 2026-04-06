# 📚 Day 15 Resources - JavaScript Arrays & Array Methods

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Arrays | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array |
| MDN: Array Methods | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods |
| MDN: Array.prototype.push() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push |
| MDN: Array.prototype.pop() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop |
| MDN: Array.prototype.forEach() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach |
| MDN: Array.prototype.filter() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter |
| MDN: Array.prototype.map() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map |
| MDN: Array.prototype.reduce() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce |
| MDN: Array.prototype.find() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find |
| JavaScript.info: Arrays | https://javascript.info/array |
| JavaScript.info: Array Methods | https://javascript.info/array-methods |
| W3Schools: JavaScript Arrays | https://www.w3schools.com/js/js_arrays.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| JavaScript Arrays Tutorial | https://youtu.be/7W4pQQ20nJg |
| Array Methods Explained | https://youtu.be/R8rmfD9Y5-c |
| forEach, map, filter, reduce | https://youtu.be/zdp0zrpKzIE |
| JavaScript Array Crash Course | https://youtu.be/3D9MZ1cdF9I |
| 10 Array Methods You Should Know | https://youtu.be/Urwzk6ILvPQ |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Chrome DevTools Console | Test array methods | Built into Chrome |
| JS Array Visualizer | Visualize array operations | https://www.csfieldguide.org.nz/en/interactives/array-visualizer/ |
| JSFiddle | Online playground | https://jsfiddle.net |
| CodePen | Frontend playground | https://codepen.io |

## 📝 Array Methods Cheatsheet

### Adding/Removing Elements

| Method | Action | Returns | Modifies |
|--------|--------|---------|----------|
| `push(item)` | Add to end | New length | ✅ |
| `pop()` | Remove from end | Removed item | ✅ |
| `unshift(item)` | Add to start | New length | ✅ |
| `shift()` | Remove from start | Removed item | ✅ |
| `splice(start, deleteCount, items)` | Add/remove at index | Removed items | ✅ |

### Accessing/Extracting

| Method | Action | Returns | Modifies |
|--------|--------|---------|----------|
| `slice(start, end)` | Extract portion | New array | ❌ |
| `concat(arr1, arr2)` | Combine arrays | New array | ❌ |
| `join(separator)` | Create string | String | ❌ |
| `indexOf(item)` | Find index | Index or -1 | ❌ |
| `lastIndexOf(item)` | Find last index | Index or -1 | ❌ |
| `includes(item)` | Check existence | Boolean | ❌ |
| `find(callback)` | Find element | Element or undefined | ❌ |
| `findIndex(callback)` | Find index | Index or -1 | ❌ |

### Transforming

| Method | Action | Returns | Modifies |
|--------|--------|---------|----------|
| `reverse()` | Reverse order | The array | ✅ |
| `sort(compareFn)` | Sort elements | The array | ✅ |
| `map(callback)` | Transform each | New array | ❌ |
| `filter(callback)` | Select elements | New array | ❌ |
| `reduce(callback, initial)` | Accumulate | Single value | ❌ |
| `forEach(callback)` | Execute for each | undefined | ❌ |
| `every(callback)` | Check all | Boolean | ❌ |
| `some(callback)` | Check any | Boolean | ❌ |

## 📝 Array Creation Cheatsheet

```javascript
// Literal (recommended)
const arr = [1, 2, 3];

// Constructor
const arr2 = new Array(5);     // [empty × 5]
const arr3 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of()
const arr4 = Array.of(5);      // [5]

// Array.from()
const arr5 = Array.from('hello'); // ['h','e','l','l','o']
const arr6 = Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]

// Spread operator
const arr7 = [...'hello'];     // ['h','e','l','l','o']
```

## 📝 Loop Methods Cheatsheet

```javascript
// Traditional for loop
for (let i = 0; i < arr.length; i++) { }

// for...of (values only)
for (const item of arr) { }

// for...of with index
for (const [index, item] of arr.entries()) { }

// forEach
arr.forEach(item => { });

// map (returns new array)
const newArr = arr.map(item => item * 2);

// filter (returns new array)
const filtered = arr.filter(item => item > 5);

// reduce (returns single value)
const sum = arr.reduce((acc, curr) => acc + curr, 0);
```

## 📝 Common Array Patterns

### Remove Duplicates
```javascript
const unique = [...new Set([1, 2, 2, 3, 3, 4])];
// [1, 2, 3, 4]
```

### Clone Array
```javascript
const clone = [...original];
const clone2 = original.slice();
const clone3 = Array.from(original);
```

### Get Last Element
```javascript
const last = arr[arr.length - 1];
const last2 = arr.slice(-1)[0];
const last3 = arr.pop(); // (removes it!)
```

### Check if Array
```javascript
Array.isArray(arr);  // true
arr instanceof Array; // true
```

### Empty Array
```javascript
arr = [];           // Reassign
arr.length = 0;     // Clear in place
arr.splice(0, arr.length); // Clear in place
```

### Convert to Array
```javascript
// NodeList to Array
const arr = Array.from(nodeList);
const arr2 = [...nodeList];

// Arguments to Array
function example() {
    const args = Array.from(arguments);
    const args2 = [...arguments];
}
```

## 🎮 Interactive Learning

| Platform | Description | Link |
|----------|-------------|------|
| freeCodeCamp | JavaScript curriculum | https://freecodecamp.org |
| JavaScript30 | 30-day vanilla JS challenge | https://javascript30.com |
| Codecademy | JavaScript courses | https://codecademy.com |
| Exercism | JavaScript practice | https://exercism.org/tracks/javascript |
| Codewars | Coding challenges | https://codewars.com |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `arr.sort()` gives wrong order for numbers | Sorts as strings | Use `arr.sort((a,b) => a - b)` |
| `forEach` can't break early | Designed that way | Use `for` loop or `for...of` |
| `map` returns undefined | Missing return statement | Always return value or use `forEach` |
| `filter` returns empty array | Condition never true | Check your condition logic |
| `reduce` returns NaN | No initial value | Always provide initial value |
| Modifying array while iterating | Index shifting | Use `for` loop backwards or copy array |
| `indexOf` returns -1 | Item not found | Check with `includes()` first |

## ✅ Code Examples

### Shopping List Pattern
```javascript
let items = [];

// Add
items.push('Milk');

// Remove last
items.pop();

// Display
items.forEach(item => console.log(item));

// Count
console.log(items.length);
```

### Movie Watchlist Pattern
```javascript
let movies = [
    { title: 'Inception', rating: 5 }
];

// Add
movies.push({ title: 'Interstellar', rating: 4 });

// Remove last
movies.pop();

// Filter high rated
const highRated = movies.filter(m => m.rating > 4);

// Calculate average
const avg = movies.map(m => m.rating).reduce((s, r) => s + r, 0) / movies.length;

// Display
movies.forEach(m => console.log(`${m.title}: ${m.rating}⭐`));
```

## 📚 Further Reading

| Topic | Link |
|-------|------|
| JavaScript Array Explorer | https://arrayexplorer.netlify.app |
| 10 Array Methods You Should Know | https://dev.to/frugencefidelis/10-javascript-array-methods-you-should-know-4lk3 |
| Array vs Set vs Object | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array |
| Big O of Array Methods | https://dev.to/lukocastillo/time-complexity-big-o-for-js-array-methods-and-iteration-methods-3n0k |

