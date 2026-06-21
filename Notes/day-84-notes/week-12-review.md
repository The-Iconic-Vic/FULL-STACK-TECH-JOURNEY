# 📘 Week 12 Review: Python Basics

## 🎯 Week 12 Overview

This week covered the fundamentals of Python programming, including syntax, data structures, control flow, functions, OOP, file handling, and error handling. These concepts provide the foundation for building robust Python applications.

---

## 📁 Day 78: Python Introduction & Setup

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Dynamic Typing** | Variables don't require type declarations, can change type |
| **Indentation** | Python uses whitespace to define code blocks |
| **Virtual Environments** | Isolated package environments |

### Python vs JavaScript

| Aspect | JavaScript | Python |
|--------|------------|--------|
| Variable declaration | `let x = 5` | `x = 5` |
| Code blocks | `{ }` | Indentation |
| Console | `console.log()` | `print()` |
| Comments | `//` | `#` |
| String interpolation | `${var}` | `f"{var}"` |

### Basic Syntax

```python
# Variables (no keywords needed)
name = "Victor"
age = 28
price = 19.99
is_active = True

# Type checking
print(type(name))  # <class 'str'>

# Dynamic typing
data = 42     # int
data = "text" # now str

# Indentation matters
if age >= 18:
    print("Adult")
    print("Inside if")
# Outside if block
```

---

## 📊 Day 79: Data Types & Structures

### Data Structure Comparison

| Structure | Mutable? | Ordered? | Syntax |
|-----------|----------|----------|--------|
| **List** | ✅ Yes | ✅ Yes | `[1, 2, 3]` |
| **Tuple** | ❌ No | ✅ Yes | `(1, 2, 3)` |
| **Dictionary** | ✅ Yes | ✅ Yes | `{"key": "value"}` |
| **Set** | ✅ Yes | ❌ No | `{1, 2, 3}` |

### Common Operations

```python
# Lists
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
fruits[0] = "kiwi"
first_two = fruits[:2]

# Dictionaries (like JS objects)
user = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "JavaScript"]
}
print(user["name"])
user["email"] = "alice@example.com"

# List comprehensions
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

---

## 🔄 Day 80: Control Flow & Loops

### Conditionals

```python
# if/elif/else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Logical operators
if age >= 18 and has_license:
    print("Can drive")

if "apple" in fruits:
    print("Found!")
```

### Loops

```python
# For loops
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Parallel iteration
names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name}: {age}")

# While loops
count = 0
while count < 5:
    print(count)
    count += 1

# Loop control
for i in range(10):
    if i == 5:
        break      # Exit loop
    if i % 2 == 0:
        continue   # Skip iteration
    print(i)
```

---

## 📦 Day 81: Functions & Scope

### Function Basics

```python
# Function definition
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Variable arguments
def sum_all(*args):
    return sum(args)

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Lambda functions
square = lambda x: x ** 2
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
```

### Scope

```python
# Local vs Global
global_var = "global"

def example():
    local_var = "local"
    print(global_var)  # Can access global

def modify_global():
    global global_var  # Required to modify
    global_var = "modified"

# nonlocal for nested functions
def outer():
    x = "outer"
    def inner():
        nonlocal x     # Modify outer scope
        x = "inner"
```

---

## 🏗️ Day 82: Object-Oriented Programming

### Class Basics

```python
class Person:
    species = "Homo sapiens"  # Class attribute
    
    def __init__(self, name, age):
        self.name = name      # Instance attribute
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"
    
    @property
    def is_adult(self):
        return self.age >= 18
    
    def __str__(self):
        return f"{self.name} ({self.age})"

# Inheritance
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def greet(self):  # Method overriding
        return f"Hello, I'm student {self.name}"
```

### Methods Types

| Method Type | Decorator | First Parameter | Use Case |
|-------------|-----------|-----------------|----------|
| Instance | None | `self` | Instance-specific operations |
| Class | `@classmethod` | `cls` | Factory methods, class state |
| Static | `@staticmethod` | None | Utility functions |

---

## 📁 Day 83: File Handling & Error Handling

### File I/O

```python
# Reading files
with open('data.txt', 'r') as file:
    content = file.read()
    lines = file.readlines()

# Writing files
with open('output.txt', 'w') as file:
    file.write("Hello World\n")

# Append
with open('output.txt', 'a') as file:
    file.write("Appended text\n")
```

### Error Handling

```python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Can't divide by zero!")
else:
    print(f"Result: {result}")
finally:
    print("Execution complete")

# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative!")
    return age
```

### JSON Handling

```python
import json

# Write JSON
data = {"name": "John", "age": 30}
with open('data.json', 'w') as f:
    json.dump(data, f, indent=4)

# Read JSON
with open('data.json', 'r') as f:
    data = json.load(f)

# String operations
json_string = json.dumps(data)
parsed = json.loads(json_string)
```

---

## 📊 Quick Reference: Python Essentials

### Common Built-in Functions

| Function | Purpose |
|----------|---------|
| `len()` | Length of sequence |
| `type()` | Type of object |
| `str()`, `int()`, `float()` | Type conversion |
| `range()` | Generate sequence |
| `enumerate()` | Index + value |
| `zip()` | Parallel iteration |
| `sum()`, `max()`, `min()` | Aggregations |
| `sorted()` | Sort iterable |

### Common String Methods

| Method | Purpose |
|--------|---------|
| `.lower()`, `.upper()` | Case conversion |
| `.strip()` | Remove whitespace |
| `.split()` | Split into list |
| `.join()` | Join list to string |
| `.replace()` | Replace substring |
| `.startswith()`, `.endswith()` | Check prefixes/suffixes |

### Common List Methods

| Method | Purpose |
|--------|---------|
| `.append()` | Add to end |
| `.pop()` | Remove from end |
| `.insert()` | Insert at index |
| `.remove()` | Remove by value |
| `.sort()` | Sort in place |
| `.reverse()` | Reverse in place |
| `.index()` | Find index |
| `.count()` | Count occurrences |

### Common Dictionary Methods

| Method | Purpose |
|--------|---------|
| `.keys()` | Get all keys |
| `.values()` | Get all values |
| `.items()` | Get key-value pairs |
| `.get()` | Get value with default |
| `.pop()` | Remove by key |
| `.update()` | Merge dictionaries |

### Common File Modes

| Mode | Description |
|------|-------------|
| `'r'` | Read (default) |
| `'w'` | Write (overwrites) |
| `'a'` | Append |
| `'r+'` | Read and Write |
| `'x'` | Exclusive create |

### Common Exceptions

| Exception | Description |
|-----------|-------------|
| `ValueError` | Invalid value |
| `TypeError` | Wrong type |
| `FileNotFoundError` | File missing |
| `ZeroDivisionError` | Division by zero |
| `KeyError` | Missing key |
| `IndexError` | Out of range |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Python uses indentation** | No curly braces, indentation defines blocks |
| **Dynamic typing** | Variables can change type |
| **Lists are mutable** | Can add, remove, modify elements |
| **Tuples are immutable** | Cannot be changed after creation |
| **Dictionaries map keys to values** | Fast lookups |
| **Sets store unique values** | Automatic duplicate removal |
| **Functions use def** | `def name(params):` |
| **Classes use class** | `class Name:` |
| **with auto-closes files** | No need to manually close |
| **try/except handles errors** | Prevents crashes |
| **JSON for data persistence** | Simple, human-readable format |

