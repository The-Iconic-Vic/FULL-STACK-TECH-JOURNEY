# Shopping List Manager - Day 15 Project

## Project Overview
A simple shopping list manager demonstrating JavaScript array fundamentals and basic array methods.

## Skills Practiced
- Creating arrays (`[]`)
- Accessing elements by index
- `length` property
- `push()` - add item to end
- `pop()` - remove item from end
- `forEach()` - loop through array
- DOM manipulation with array data

## File Structure
day-15-shopping-list/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Array Methods Used

| Method | Purpose | Example |
|--------|---------|---------|
| `push()` | Add item to end | `shoppingItems.push('Milk')` |
| `pop()` | Remove last item | `shoppingItems.pop()` |
| `forEach()` | Loop through all items | `items.forEach((item, i) => { })` |
| `length` | Get item count | `shoppingItems.length` |

## Key JavaScript Code

```javascript
// Array declaration
let shoppingItems = [];

// Add item (push)
shoppingItems.push(newItem);

// Remove last item (pop)
const removedItem = shoppingItems.pop();

// Loop through array (forEach)
shoppingItems.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});

// Get array length
const count = shoppingItems.length;
Features
Add items to shopping list

Remove last item

Display all items with numbers

Real-time item count

Enter key support

Empty state handling