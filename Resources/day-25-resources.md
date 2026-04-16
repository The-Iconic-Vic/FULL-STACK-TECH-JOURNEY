# 📚 Day 25 Resources - API Data Display & Filtering

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Array.map() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map |
| MDN: Array.filter() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter |
| MDN: Array.sort() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort |
| MDN: Array.slice() | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice |
| MDN: Fetch API | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |
| MDN: Template Literals | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals |
| TheMealDB API Docs | https://www.themealdb.com/api.php |
| JSONPlaceholder Docs | https://jsonplaceholder.typicode.com |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Display API Data with map() | https://youtu.be/0vRmN1t5mYE |
| Filter and Search Arrays | https://youtu.be/4l6HHLUQlwY |
| Sort Arrays in JavaScript | https://youtu.be/4l6HHLUQlwY |
| Pagination Tutorial | https://youtu.be/3aVqR5a-JqU |
| Building a Recipe App | https://youtu.be/01YKQ0tJFtE |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| TheMealDB API | Free recipe API | https://www.themealdb.com |
| JSONPlaceholder | Fake API for testing | https://jsonplaceholder.typicode.com |
| Random User API | Fake user data | https://randomuser.me |
| Dog CEO API | Random dog images | https://dog.ceo |
| Quote API | Random quotes | https://quotable.io |
| Postman | Test APIs | https://postman.com |

## 📝 Array Methods Cheatsheet

### map()
Transforms each element and returns new array.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6]

const items = [{ name: 'A' }, { name: 'B' }];
const names = items.map(item => item.name);
// ['A', 'B']
```

### filter()
Returns elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

const activeUsers = users.filter(user => user.active);
```

### sort()
Sorts array (modifies original).

```javascript
// Numbers
numbers.sort((a, b) => a - b);  // Ascending
numbers.sort((a, b) => b - a);  // Descending

// Strings
strings.sort();  // Ascending
strings.sort((a, b) => b.localeCompare(a));  // Descending

// By property
items.sort((a, b) => a.price - b.price);
items.sort((a, b) => a.name.localeCompare(b.name));
```

### slice()
Extracts portion of array.

```javascript
const items = [1, 2, 3, 4, 5];
items.slice(0, 3);  // [1, 2, 3]
items.slice(2);      // [3, 4, 5]
items.slice(-2);     // [4, 5]
```

## ✅ Common Patterns

### Display Data with map()
```javascript
const html = data.map(item => `
    <div class="card">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
    </div>
`).join('');
container.innerHTML = html;
```

### Search Filter
```javascript
const filtered = allItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Sort by Title
```javascript
const sorted = [...items].sort((a, b) => 
    a.title.localeCompare(b.title)
);
```

### Pagination (Load More)
```javascript
const displayed = allItems.slice(0, visibleCount);
visibleCount += 10;
```

### Pagination (Page Numbers)
```javascript
const start = (page - 1) * limit;
const end = start + limit;
const pageItems = allItems.slice(start, end);
```

## 🎯 API Endpoints for Practice

| API | Endpoint | Use |
|-----|----------|-----|
| TheMealDB | `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken` | Search by ingredient |
| TheMealDB | `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772` | Get recipe by ID |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/posts` | Posts |
| JSONPlaceholder | `https://jsonplaceholder.typicode.com/users` | Users |
| Dog CEO | `https://dog.ceo/api/breeds/image/random` | Random dog |
| Random User | `https://randomuser.me/api/?results=10` | Multiple users |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| HTML shows [object Object] | Forgot `.join('')` after map() | Add `.join('')` |
| Sort not working for strings | Default sort is case-sensitive | Use `.localeCompare()` |
| Filter not updating | Not re-rendering | Call render after filter |
| Pagination showing wrong items | Off-by-one error | Check slice indices |
| API returns null | No results | Check for null before mapping |
| Loading state never hides | Error in try/catch | Add finally block |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| JavaScript Array Methods | https://javascript.info/array-methods |
| Building a Search Component | https://css-tricks.com/building-a-search-component/ |
| Pagination Best Practices | https://www.smashingmagazine.com/2020/10/pagination-best-practices/ |
| Working with APIs | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs |

