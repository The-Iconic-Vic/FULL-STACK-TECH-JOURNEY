# 📘 Python Data Types & Structures

## 🎯 Overview

Python provides several built-in data structures for organizing and manipulating data. Understanding these structures is essential for writing efficient Python code.

---

## 📝 Part 1: Strings & Numbers

### Strings

```python
# String creation
name = "Victor"
message = 'Hello World'
multi_line = """This is a
multi-line string"""

# Common string methods
text = "  Hello World  "
text.lower()           # "hello world"
text.upper()           # "HELLO WORLD"
text.strip()           # "Hello World" (removes whitespace)
text.replace("World", "Python")  # "Hello Python"

# Split and join
sentence = "apple,banana,orange"
words = sentence.split(",")        # ['apple', 'banana', 'orange']
new = "-".join(words)              # "apple-banana-orange"

# Check string content
text.isalpha()         # True if all letters
text.isdigit()         # True if all digits
text.startswith("Hello")  # True
text.endswith("World")    # True
text.find("World")     # 2 (index of first occurrence)
text.count("l")        # 3 (count of 'l')
```

### f-strings (Python 3.6+)

```python
name = "Victor"
age = 28
price = 19.99

# f-string - RECOMMENDED
print(f"My name is {name} and I am {age} years old")
print(f"Price: ${price:.2f}")      # Price: $19.99
print(f"Next year: {age + 1}")

# Expressions inside f-strings
print(f"Total: ${price * 1.07:.2f}")  # With tax

# .format() method (older)
print("Name: {}, Age: {}".format(name, age))

# % formatting (oldest)
print("Name: %s, Age: %d" % (name, age))
```

### Numbers & Math Operations

```python
# Basic operations
x, y = 10, 3
addition = x + y          # 13
subtraction = x - y       # 7
multiplication = x * y    # 30
division = x / y          # 3.3333333333333335
floor_division = x // y   # 3 (integer division)
modulo = x % y            # 1 (remainder)
power = x ** y            # 1000 (10^3)

# Augmented assignment
x += 5    # x = x + 5
x -= 3    # x = x - 3

# Built-in functions
abs(-5)              # 5
round(3.14159, 2)    # 3.14
max(1, 5, 3)         # 5
min(1, 5, 3)         # 3
sum([1, 2, 3])       # 6

# Type conversion
int("42")    # 42
float("3.14")  # 3.14
str(100)    # "100"
```

---

## 📋 Part 2: Lists & Tuples

### Lists (Mutable - can change)

| Property | Value |
|----------|-------|
| **Mutable** | ✅ Yes |
| **Ordered** | ✅ Yes |
| **Duplicate elements** | ✅ Yes |
| **Syntax** | `[1, 2, 3]` |

```python
# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Accessing elements
fruits[0]      # "apple"
fruits[-1]     # "orange" (last element)
fruits[-2]     # "banana"

# Adding items
fruits.append("grape")           # Add to end
fruits.insert(1, "kiwi")         # Insert at index
fruits.extend(["mango", "peach"]) # Add multiple

# Removing items
fruits.remove("banana")  # By value
last = fruits.pop()      # Remove and return last
first = fruits.pop(0)    # Remove and return at index
del fruits[0]            # Delete at index
```

### List Slicing

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

numbers[2:6]      # [2, 3, 4, 5] (indices 2-5)
numbers[:4]       # [0, 1, 2, 3] (first 4)
numbers[6:]       # [6, 7, 8, 9] (from 6 to end)
numbers[::2]      # [0, 2, 4, 6, 8] (every 2nd)
numbers[::-1]     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reverse)
```

### Tuples (Immutable - cannot change)

| Property | Value |
|----------|-------|
| **Mutable** | ❌ No |
| **Ordered** | ✅ Yes |
| **Duplicate elements** | ✅ Yes |
| **Syntax** | `(1, 2, 3)` |

```python
# Creating tuples
coordinates = (10, 20)
rgb = (255, 128, 0)
single = (5,)      # Note: comma required for single item

# Accessing elements
x = coordinates[0]  # 10
y = coordinates[1]  # 20

# Tuple unpacking
x, y = coordinates
r, g, b = rgb

# Slicing (returns new tuple)
numbers = (1, 2, 3, 4, 5)
subset = numbers[1:3]  # (2, 3)

# Convert between list and tuple
list_to_tuple = tuple([1, 2, 3])  # (1, 2, 3)
tuple_to_list = list((4, 5, 6))   # [4, 5, 6]
```

### When to Use Lists vs Tuples

| Use Lists | Use Tuples |
|-----------|------------|
| Data changes frequently | Data is fixed |
| Shopping cart | Coordinates (x, y) |
| User list | Days of the week |
| Dynamic content | Configuration values |

---

## 📝 Part 3: Dictionaries & Sets

### Dictionaries (Key-Value Pairs)

| Property | Value |
|----------|-------|
| **Mutable** | ✅ Yes |
| **Ordered** | ✅ Yes (Python 3.7+) |
| **Keys** | Immutable, unique |
| **Syntax** | `{"key": "value"}` |

```python
# Creating dictionaries
user = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "JavaScript"],
    "is_active": True
}

# Accessing values
user["name"]          # "Alice"
user.get("email")     # None (no error)
user.get("email", "default@email.com")  # "default@email.com"

# Adding/updating
user["email"] = "alice@example.com"  # Add new key
user["age"] = 31                     # Update key

# Removing
del user["is_active"]      # Remove by key
email = user.pop("email")  # Remove and return value

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
```

### Sets (Unique Values)

| Property | Value |
|----------|-------|
| **Mutable** | ✅ Yes |
| **Ordered** | ❌ No |
| **Duplicate elements** | ❌ No (auto-removed) |
| **Syntax** | `{1, 2, 3}` |

```python
# Creating sets
fruits = {"apple", "banana", "orange", "apple"}
# {'apple', 'banana', 'orange'}  (duplicates removed)

# Adding/removing
fruits.add("grape")
fruits.remove("banana")   # KeyError if not found
fruits.discard("mango")   # No error if not found

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a.union(b)                 # {1, 2, 3, 4, 5, 6}
a.intersection(b)          # {3, 4}
a.difference(b)            # {1, 2}
a.symmetric_difference(b)  # {1, 2, 5, 6}
```

---

## 🔄 Part 4: List Comprehensions

### Syntax

```python
[expression for item in iterable if condition]
```

### Examples

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition (filtering)
evens = [x for x in range(20) if x % 2 == 0]

# With if-else (transformation)
parity = ["even" if x % 2 == 0 else "odd" for x in range(10)]

# Nested loops
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]

# Set comprehension
unique_squares = {x**2 for x in range(10)}

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}
```

---

## 📊 Quick Reference

### Data Structure Comparison

| Operation | List | Tuple | Dictionary | Set |
|-----------|------|-------|------------|-----|
| **Creation** | `[1, 2, 3]` | `(1, 2, 3)` | `{"a": 1}` | `{1, 2, 3}` |
| **Mutable** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Ordered** | ✅ Yes | ✅ Yes | ✅ Yes (3.7+) | ❌ No |
| **Duplicates Allowed** | ✅ Yes | ✅ Yes | ❌ No (keys) | ❌ No |
| **Index Access** | `list[0]` | `tuple[0]` | `dict["key"]` | ❌ No |

### Common Methods Reference

| List Methods | Dictionary Methods | Set Methods |
|--------------|-------------------|-------------|
| `.append(item)` | `.get(key, default)` | `.add(item)` |
| `.insert(i, item)` | `.keys()` | `.remove(item)` |
| `.pop(index)` | `.values()` | `.discard(item)` |
| `.remove(item)` | `.items()` | `.union(other)` |
| `.sort()` | `.pop(key)` | `.intersection(other)` |
| `.reverse()` | `.update(dict)` | `.difference(other)` |
| `.index(item)` | `.clear()` | `.symmetric_difference(other)` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `IndexError: list index out of range` | Accessing invalid index | Check `len(list)` first |
| `KeyError: 'key'` | Key not in dictionary | Use `.get()` method |
| `TypeError: 'tuple' object does not support item assignment` | Modifying tuple | Convert to list first |
| `ValueError: x not in list` | Removing item not in list | Check `if item in list` first |
| `Unhashable type: 'list'` | Using list as set/dict key | Convert list to tuple |
| `TypeError: unhashable type: 'dict'` | Using dict as set/dict key | Use tuple or frozenset |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Lists are mutable** | Can add, remove, modify elements |
| **Tuples are immutable** | Cannot be changed after creation |
| **Dictionaries map keys to values** | Fast lookups by key |
| **Sets store unique values** | Automatic duplicate removal |
| **Slicing creates new sequences** | `[start:end:step]` syntax |
| **List comprehensions are concise** | One-line list creation with filters |
| **Use `.get()` for dictionaries** | Avoids KeyError |

