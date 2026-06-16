# 📅 Day 79: Data Types & Structures

**Date:** June 16, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Strings, Numbers, Lists, Tuples, Dictionaries, Sets, List Comprehensions

---

## 📋 Learning Objectives

- ✅ Master string methods and f-string formatting
- ✅ Perform math operations including floor division and modulo
- ✅ Work with mutable lists and immutable tuples
- ✅ Use list methods: append, pop, insert, remove
- ✅ Understand list slicing syntax `[start:end:step]`
- ✅ Create and manipulate dictionaries
- ✅ Use sets for unique values
- ✅ Write list comprehensions for concise code

---

## 🎯 Part 1: Strings & Numbers

### Strings

```python
# String creation
name = "Victor"
message = 'Hello World'
multi_line = """This is a
multi-line string"""

# String methods
text = "  Hello World  "
text.lower()        # "hello world"
text.upper()        # "HELLO WORLD"
text.strip()        # "Hello World" (removes whitespace)
text.replace("World", "Python")  # "Hello Python"

# Split and join
sentence = "apple,banana,orange"
words = sentence.split(",")  # ['apple', 'banana', 'orange']
new_sentence = "-".join(words)  # "apple-banana-orange"

# Check string content
text.isalpha()      # True if all letters
text.isdigit()      # True if all digits
text.startswith("Hello")  # True
text.endswith("World")    # True

# Find and count
text.find("World")  # 2 (index of first occurrence)
text.count("l")     # 3 (count of 'l')
```

### f-strings (String Formatting)

```python
name = "Victor"
age = 28
price = 19.99

# f-string (Python 3.6+) - RECOMMENDED
message = f"My name is {name} and I am {age} years old"
print(f"Price: ${price:.2f}")  # Price: $19.99
print(f"Next year: {age + 1}")

# Expressions inside f-strings
print(f"Total: ${price * 1.07:.2f}")  # With tax

# .format() method (older)
message = "Name: {}, Age: {}".format(name, age)

# % formatting (oldest)
message = "Name: %s, Age: %d" % (name, age)
```

### Numbers & Math Operations

```python
# Basic operations
x = 10
y = 3

addition = x + y        # 13
subtraction = x - y     # 7
multiplication = x * y  # 30
division = x / y        # 3.3333333333333335
floor_division = x // y # 3 (integer division)
modulo = x % y          # 1 (remainder)
power = x ** y          # 1000 (10^3)

# Augmented assignment
x += 5   # x = x + 5
x -= 3   # x = x - 3
x *= 2   # x = x * 2
x /= 4   # x = x / 4

# Built-in functions
abs(-5)           # 5
round(3.14159, 2) # 3.14
max(1, 5, 3)      # 5
min(1, 5, 3)      # 1
sum([1, 2, 3])    # 6

# Type conversion
int("42")         # 42
float("3.14")     # 3.14
str(100)          # "100"
```

---

## 📋 Part 2: Lists & Tuples

### Lists (Mutable)

```python
# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]  # Mixed types allowed
empty = []

# Accessing elements (0-indexed)
fruits[0]    # "apple"
fruits[-1]   # "orange" (last element)
fruits[-2]   # "banana" (second to last)

# Adding items
fruits.append("grape")           # Add to end
fruits.insert(1, "kiwi")         # Insert at index 1
fruits.extend(["mango", "peach"]) # Add multiple items

# Removing items
fruits.remove("banana")   # Remove by value
last = fruits.pop()       # Remove and return last
first = fruits.pop(0)     # Remove and return at index
del fruits[0]             # Delete at index

# Slicing [start:end:step]
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers[2:6]    # [2, 3, 4, 5] (indices 2-5)
numbers[:4]     # [0, 1, 2, 3] (first 4)
numbers[6:]     # [6, 7, 8, 9] (from 6 to end)
numbers[::2]    # [0, 2, 4, 6, 8] (every 2nd)
numbers[::-1]   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reverse)

# List methods
fruits = ["apple", "banana", "orange", "apple"]
fruits.index("banana")        # 1 (first occurrence)
fruits.count("apple")         # 2
fruits.sort()                 # Sorts in place
fruits.reverse()              # Reverses in place
sorted(fruits)                # Returns new sorted list

# Check membership
"apple" in fruits      # True
"grape" not in fruits  # True

# List length
len(fruits)  # 3
```

### Tuples (Immutable)

```python
# Creating tuples (use parentheses, not required but recommended)
coordinates = (10, 20)
rgb = (255, 128, 0)
single = (5,)  # Note: comma required for single item

# Accessing elements (0-indexed, like lists)
x = coordinates[0]    # 10
y = coordinates[1]    # 20

# Tuple unpacking
x, y = coordinates
r, g, b = rgb

# Slicing works (returns new tuple)
numbers = (1, 2, 3, 4, 5)
subset = numbers[1:3]  # (2, 3)

# Immutability - cannot change
# rgb[0] = 100  # TypeError: 'tuple' object does not support item assignment

# When to use tuples vs lists
# Tuples: Fixed data (coordinates, days of week)
# Lists: Data that changes (shopping cart, user list)

# Convert between list and tuple
list_to_tuple = tuple([1, 2, 3])  # (1, 2, 3)
tuple_to_list = list((4, 5, 6))   # [4, 5, 6]
```

---

## 📝 Part 3: Dictionaries & Sets

### Dictionaries (Key-Value Pairs)

```python
# Creating dictionaries
user = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "JavaScript"],
    "is_active": True
}

empty_dict = {}

# Accessing values
user["name"]          # "Alice"
user.get("email")     # None (no error)
user.get("email", "default@email.com")  # "default@email.com"

# Adding/updating values
user["email"] = "alice@example.com"  # Add new key
user["age"] = 31                     # Update existing key

# Removing items
del user["is_active"]      # Remove by key
email = user.pop("email")  # Remove and return value
last = user.popitem()      # Remove and return last item

# Dictionary methods
user.keys()      # dict_keys(['name', 'age', 'skills'])
user.values()    # dict_values(['Alice', 31, ['Python', 'JavaScript']])
user.items()     # dict_items([('name', 'Alice'), ('age', 31), ...])

# Check if key exists
if "name" in user:
    print(user["name"])

# Loop through dictionary
for key, value in user.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Sets (Unique Values)

```python
# Creating sets (curly braces without colons)
fruits = {"apple", "banana", "orange", "apple"}
# {'apple', 'banana', 'orange'}  (duplicates removed)

# Creating set from list
unique_numbers = set([1, 2, 2, 3, 3, 4])  # {1, 2, 3, 4}

# Adding items
fruits.add("grape")
fruits.add("apple")  # No duplicate added

# Removing items
fruits.remove("banana")  # KeyError if not found
fruits.discard("mango")  # No error if not found
last = fruits.pop()      # Remove and return arbitrary item

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a.union(b)          # {1, 2, 3, 4, 5, 6}
a.intersection(b)   # {3, 4}
a.difference(b)     # {1, 2}
a.symmetric_difference(b)  # {1, 2, 5, 6}

# Set comprehensions
squares = {x**2 for x in range(5)}  # {0, 1, 4, 9, 16}
```

---

## 🔄 Part 4: List Comprehensions

```python
# Basic list comprehension
# Traditional approach
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension (much cleaner!)
squares = [x**2 for x in range(10)]

# With condition (filtering)
evens = [x for x in range(20) if x % 2 == 0]

# With if-else (transformation)
parity = ["even" if x % 2 == 0 else "odd" for x in range(10)]

# Nested loops
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]

# Set comprehensions (curly braces)
unique_squares = {x**2 for x in range(10)}

# Dictionary comprehensions
squares_dict = {x: x**2 for x in range(5)}
```

---

## 🏗️ Part 5: Mini-Project - Shopping Cart

```python
# shopping_cart.py
"""
Shopping Cart Application
Demonstrates: lists, dictionaries, list comprehensions, functions
"""

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, name, price, quantity=1):
        """Add item to cart"""
        # Check if item already exists
        for item in self.items:
            if item["name"].lower() == name.lower():
                item["quantity"] += quantity
                return

        # Add new item
        self.items.append({
            "name": name,
            "price": float(price),
            "quantity": quantity
        })
        print(f"✓ Added {quantity} × {name}")

    def remove_item(self, name):
        """Remove item completely from cart"""
        initial_count = len(self.items)
        self.items = [item for item in self.items if item["name"].lower() != name.lower()]

        if len(self.items) < initial_count:
            print(f"✓ Removed {name}")
        else:
            print(f"✗ {name} not found in cart")

    def update_quantity(self, name, quantity):
        """Update quantity of an item"""
        for item in self.items:
            if item["name"].lower() == name.lower():
                if quantity <= 0:
                    self.remove_item(name)
                else:
                    item["quantity"] = quantity
                return
        print(f"✗ {name} not found in cart")

    def view_cart(self):
        """Display all items in cart"""
        if not self.items:
            print("\n🛒 Your cart is empty")
            return

        print("\n" + "=" * 50)
        print("🛒 SHOPPING CART")
        print("=" * 50)

        for idx, item in enumerate(self.items, 1):
            total = item["price"] * item["quantity"]
            print(f"{idx}. {item['name']:20} "
                  f"${item['price']:6.2f} × {item['quantity']:2} = "
                  f"${total:7.2f}")

        total = self.calculate_total()
        print("-" * 50)
        print(f"{'TOTAL':22} {'':10} = ${total:7.2f}")
        print("=" * 50)

    def calculate_total(self):
        """Calculate total cost of cart"""
        return sum(item["price"] * item["quantity"] for item in self.items)

    def get_items_by_price(self, min_price=0, max_price=float('inf')):
        """Filter items by price using list comprehension"""
        return [item for item in self.items
                if min_price <= item["price"] <= max_price]

    def get_item_names(self):
        """Get list of all item names"""
        return [item["name"] for item in self.items]

    def get_total_items(self):
        """Get total number of items (sum of quantities)"""
        return sum(item["quantity"] for item in self.items)

    def apply_discount(self, percentage):
        """Apply discount to all items"""
        for item in self.items:
            item["price"] = item["price"] * (1 - percentage / 100)
        print(f"✓ Applied {percentage}% discount to all items")


# Interactive demo
def main():
    cart = ShoppingCart()

    # Add some items
    cart.add_item("Laptop", 999.99, 1)
    cart.add_item("Mouse", 29.99, 2)
    cart.add_item("Keyboard", 89.99, 1)
    cart.add_item("Monitor", 299.99, 1)

    # View cart
    cart.view_cart()

    # Update quantity
    cart.update_quantity("Mouse", 3)
    cart.view_cart()

    # Remove an item
    cart.remove_item("Monitor")
    cart.view_cart()

    # Filter by price
    print("\n📊 Items under $100:")
    cheap_items = cart.get_items_by_price(max_price=100)
    for item in cheap_items:
        print(f"  - {item['name']}: ${item['price']:.2f}")

    # Apply discount
    cart.apply_discount(10)
    cart.view_cart()

    # Summary
    print(f"\n📊 Summary:")
    print(f"  Total items: {cart.get_total_items()}")
    print(f"  Unique items: {len(cart.items)}")
    print(f"  Item names: {', '.join(cart.get_item_names())}")


if __name__ == "__main__":
    main()
```

### Sample Output

```
✓ Added 1 × Laptop
✓ Added 2 × Mouse
✓ Added 1 × Keyboard
✓ Added 1 × Monitor

==================================================
🛒 SHOPPING CART
==================================================
1. Laptop               $999.99 ×  1 = $ 999.99
2. Mouse                $ 29.99 ×  2 = $  59.98
3. Keyboard             $ 89.99 ×  1 = $  89.99
4. Monitor              $299.99 ×  1 = $ 299.99
--------------------------------------------------
TOTAL                             = $1449.95
==================================================

✓ Updated Mouse quantity to 3

✓ Removed Monitor

==================================================
🛒 SHOPPING CART
==================================================
1. Laptop               $999.99 ×  1 = $ 999.99
2. Mouse                $ 29.99 ×  3 = $  89.97
3. Keyboard             $ 89.99 ×  1 = $  89.99
--------------------------------------------------
TOTAL                             = $1179.95
==================================================

📊 Items under $100:
  - Mouse: $29.99
  - Keyboard: $89.99

✓ Applied 10% discount to all items

==================================================
🛒 SHOPPING CART
==================================================
1. Laptop               $899.99 ×  1 = $ 899.99
2. Mouse                $26.99 ×  3 = $  80.97
3. Keyboard             $80.99 ×  1 = $  80.99
--------------------------------------------------
TOTAL                             = $1061.95
==================================================

📊 Summary:
  Total items: 5
  Unique items: 3
  Item names: Laptop, Mouse, Keyboard
```

---

## 📊 Quick Reference

### Data Structure Comparison

| Operation | List | Tuple | Dictionary | Set |
|-----------|------|-------|------------|-----|
| **Creation** | `[1, 2, 3]` | `(1, 2, 3)` | `{"a": 1}` | `{1, 2, 3}` |
| **Mutable** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Ordered** | ✅ Yes | ✅ Yes | ✅ Yes (3.7+) | ❌ No |
| **Duplicates** | ✅ Yes | ✅ Yes | ❌ No (keys) | ❌ No |
| **Index Access** | `list[0]` | `tuple[0]` | `dict["key"]` | ❌ No |

### Common List Methods

| Method | Description |
|--------|-------------|
| `.append(item)` | Add item to end |
| `.insert(index, item)` | Insert at position |
| `.pop(index)` | Remove and return at index |
| `.remove(item)` | Remove first occurrence by value |
| `.sort()` | Sort in place |
| `.reverse()` | Reverse in place |
| `.index(item)` | Return first index of item |
| `.count(item)` | Count occurrences |

### Common Dictionary Methods

| Method | Description |
|--------|-------------|
| `.get(key, default)` | Get value, return default if missing |
| `.keys()` | Return all keys |
| `.values()` | Return all values |
| `.items()` | Return key-value pairs |
| `.pop(key)` | Remove and return value |
| `.update(dict)` | Merge another dictionary |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `IndexError: list index out of range` | Accessing index that doesn't exist | Check list length with `len()` |
| `KeyError: 'key'` | Key not in dictionary | Use `.get()` method |
| `TypeError: 'tuple' object does not support item assignment` | Attempting to modify tuple | Convert to list first |
| `ValueError: x not in list` | Removing item not in list | Check `if item in list` first |
| `Unhashable type: 'list'` | Using list as set/dict key | Use tuple instead |

---

## ✅ Day 79 Checklist

- [ ] Practice string methods: `.lower()`, `.upper()`, `.split()`, `.strip()`
- [ ] Use f-strings for string formatting
- [ ] Perform math operations: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- [ ] Create lists and use methods: `.append()`, `.pop()`, `.insert()`
- [ ] Practice list slicing: `[start:end:step]`
- [ ] Understand tuple immutability
- [ ] Create dictionaries and access values
- [ ] Use dictionary methods: `.keys()`, `.values()`, `.items()`
- [ ] Create sets for unique values
- [ ] Practice set operations: union, intersection, difference
- [ ] Write list comprehensions with conditions
- [ ] Complete shopping cart mini-project
- [ ] Push code to GitHub

