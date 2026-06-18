# 📘 Python Functions & Scope

## 🎯 Overview

Functions are reusable blocks of code that perform specific tasks. They help organize code, avoid repetition, and make programs more maintainable. Python functions are defined using the `def` keyword and support various parameter types and scope rules.

---

## 📝 Part 1: Functions Basics

### Defining Functions

```python
# Basic function definition
def greet():
    print("Hello, World!")

greet()  # Hello, World!

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Victor")  # Hello, Victor!

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)  # 8

# Function with multiple return values (returns tuple)
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([1, 2, 3, 4, 5])
# minimum = 1, maximum = 5

# Function with no return (returns None)
def log_message(message):
    print(f"[LOG] {message}")
    # Implicitly returns None
```

### Parameters and Arguments

| Concept | Description | Example |
|---------|-------------|---------|
| **Parameter** | Variable in function definition | `def greet(name):` |
| **Argument** | Value passed to function | `greet("Victor")` |
| **Positional** | Order matters | `def add(a, b):` |
| **Keyword** | Name specifies argument | `add(a=5, b=3)` |

```python
# Positional arguments (order matters)
def introduce(name, age, city):
    print(f"{name} is {age} years old and lives in {city}")

introduce("Victor", 28, "Lagos")  # Correct order

# Keyword arguments (order doesn't matter)
introduce(city="Lagos", age=28, name="Victor")

# Mixing positional and keyword (positional first)
introduce("Victor", city="Lagos", age=28)
```

### Default Parameters

```python
# Default parameter values
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Victor"))           # Hello, Victor!
print(greet("Victor", "Hi"))     # Hi, Victor!
print(greet(name="Victor", greeting="Hey"))  # Hey, Victor!

# Multiple defaults
def create_user(name, age=18, city="Unknown"):
    return {"name": name, "age": age, "city": city}

print(create_user("Alice"))  # {'name': 'Alice', 'age': 18, 'city': 'Unknown'}
print(create_user("Bob", 25))  # {'name': 'Bob', 'age': 25, 'city': 'Unknown'}

# Mutable default parameters (caution!)
def add_item(item, items=[]):  # ❌ BAD - mutable default
    items.append(item)
    return items

# Better approach
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

---

## 📦 Part 2: *args and **kwargs

### *args - Variable Positional Arguments

```python
# *args collects extra positional arguments as tuple
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3))        # 6
print(sum_all(10, 20, 30, 40)) # 100
print(sum_all())               # 0

# Using *args with regular parameters
def greet_all(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet_all("Hello", "Alice", "Bob", "Charlie")
# Hello, Alice!
# Hello, Bob!
# Hello, Charlie!

# Unpacking lists with *args
def multiply(a, b, c):
    return a * b * c

numbers = [2, 3, 4]
result = multiply(*numbers)  # Unpacks to multiply(2, 3, 4)
print(result)  # 24
```

### **kwargs - Variable Keyword Arguments

```python
# **kwargs collects keyword arguments as dictionary
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# name: Alice
# age: 30
# city: NYC

# Combining *args and **kwargs
def display_data(title, *args, **kwargs):
    print(f"Title: {title}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

display_data("My Data", 1, 2, 3, name="Alice", age=30)
# Title: My Data
# Args: (1, 2, 3)
# Kwargs: {'name': 'Alice', 'age': 30}

# Unpacking dictionaries
def create_user(name, age, city):
    return f"{name} ({age}) from {city}"

user_data = {"name": "Alice", "age": 30, "city": "NYC"}
result = create_user(**user_data)  # Unpacks dictionary
print(result)  # Alice (30) from NYC
```

### *args and **kwargs Summary

| Syntax | Purpose | Type | Example |
|--------|---------|------|---------|
| `*args` | Extra positional args | Tuple | `sum_all(1, 2, 3)` |
| `**kwargs` | Extra keyword args | Dict | `print_info(name="Alice")` |
| `*list` | Unpack list | - | `multiply(*[2, 3, 4])` |
| `**dict` | Unpack dict | - | `create_user(**user_data)` |

---

## 🔍 Part 3: Scope

### Local vs Global Scope

```python
# Global variable
global_var = "I am global"

def show_local():
    # Local variable (only exists inside function)
    local_var = "I am local"
    print(local_var)
    print(global_var)  # Can access global

show_local()
# I am local
# I am global

# print(local_var)  # NameError: local_var is not defined
```

### Variable Lookup Order (LEGB)

Python searches for variables in this order:

1. **L**ocal
2. **E**nclosing (outer functions)
3. **G**lobal
4. **B**uilt-in

```python
# Example demonstrating LEGB
x = "global"  # Global

def outer():
    x = "enclosing"  # Enclosing
    
    def inner():
        x = "local"  # Local
        print(x)
    
    inner()

outer()  # "local"

# LEGB example
print(sum)  # Built-in function
```

### global Keyword

```python
counter = 0

def increment():
    global counter  # Declare intent to modify global
    counter += 1
    print(f"Counter: {counter}")

increment()  # Counter: 1
increment()  # Counter: 2
increment()  # Counter: 3

# Multiple globals
x = 10
y = 20

def update():
    global x, y
    x = 100
    y = 200

update()
print(x, y)  # 100 200
```

### nonlocal Keyword

```python
# nonlocal for nested functions
def outer():
    value = "outer"
    
    def inner():
        nonlocal value  # Refers to value in outer scope
        value = "inner"
        print(f"Inner: {value}")
    
    inner()
    print(f"Outer: {value}")

outer()
# Inner: inner
# Outer: inner

# Practical example: counter
def counter():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

counter_func = counter()
print(counter_func())  # 1
print(counter_func())  # 2
print(counter_func())  # 3
```

### Scope Best Practices

| Practice | Bad | Good |
|----------|-----|------|
| **Using globals** | ❌ Modifying globals inside functions | ✅ Use parameters and return values |
| **Constants** | ❌ `TAX_RATE = 0.1` modified | ✅ Define as uppercase constant |
| **Docstrings** | ❌ No documentation | ✅ Include docstring with parameters |
| **Variable naming** | ❌ Confusing names | ✅ Descriptive, clear names |

```python
# ✅ GOOD: Use parameters and return values
def calculate_tax(amount):
    tax_rate = 0.1  # Local constant
    return amount * tax_rate

# ✅ GOOD: Module-level constants
TAX_RATE = 0.1  # All caps for constants

def calculate_tax(amount):
    return amount * TAX_RATE

# ✅ GOOD: Docstring
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.

    Args:
        length: The length of the rectangle
        width: The width of the rectangle

    Returns:
        The area of the rectangle (length * width)
    """
    return length * width
```

---

## 🎯 Part 4: Lambda Functions

### Basic Lambda Syntax

```python
# Regular function
def square(x):
    return x ** 2

# Lambda function (anonymous)
square = lambda x: x ** 2
print(square(5))  # 25

# Multiple parameters
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Conditional expression
max_value = lambda a, b: a if a > b else b
print(max_value(10, 20))  # 20
```

### Using Lambda with Higher-Order Functions

```python
# map() - applies function to each element
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
# [1, 4, 9, 16, 25]

# filter() - selects elements that pass condition
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4]

# sorted() - custom key function
names = ["Alice", "Bob", "Charlie"]
sorted_by_len = sorted(names, key=lambda x: len(x))
# ['Bob', 'Alice', 'Charlie']

# sorted dictionary by value
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
]
sorted_people = sorted(people, key=lambda x: x["age"])
# [{'name': 'Bob', 'age': 25}, {'name': 'Alice', 'age': 30}]
```

### Lambda vs Regular Function

| Aspect | Lambda | Regular Function |
|--------|--------|------------------|
| **Syntax** | One line | Multiple lines |
| **Name** | Anonymous | Named |
| **Return** | Implicit | Explicit `return` |
| **Complexity** | Simple expressions | Complex logic |
| **Use case** | Simple transformations | Reusable code |

```python
# When to use lambda
# ✅ Simple transformation
squared = map(lambda x: x**2, numbers)

# ✅ Sorting key
sorted(people, key=lambda x: x["age"])

# ❌ Avoid lambda for complex logic
# Use regular function instead
def calculate_discount(price, discount_type):
    if discount_type == "percentage":
        return price * 0.9
    elif discount_type == "fixed":
        return price - 10
    else:
        return price
```

---

## 📊 Quick Reference

### Function Syntax

| Concept | Syntax | Example |
|---------|--------|---------|
| Basic | `def name():` | `def greet():` |
| Parameters | `def name(p1, p2):` | `def add(a, b):` |
| Return | `return value` | `return a + b` |
| Default | `def name(p="default"):` | `def greet(name="World"):` |
| *args | `def name(*args):` | `def sum_all(*nums):` |
| **kwargs | `def name(**kwargs):` | `def print_info(**info):` |
| Lambda | `lambda x: expr` | `lambda x: x**2` |

### Scope Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `global` | Modify global variable | `global counter` |
| `nonlocal` | Modify enclosing variable | `nonlocal count` |

### Higher-Order Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `map()` | Apply function to iterable | `map(lambda x: x*2, numbers)` |
| `filter()` | Filter iterable | `filter(lambda x: x>0, numbers)` |
| `sorted()` | Sort with key | `sorted(items, key=lambda x: x["key"])` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `TypeError: missing required argument` | Missing parameter | Provide all required arguments |
| `UnboundLocalError` | Assigning to global without declaration | Use `global` keyword |
| `TypeError: X takes 2 positional arguments but 3 were given` | Too many arguments | Use `*args` for variable arguments |
| `SyntaxError: invalid syntax` | Missing colon `:` | Add `:` after function definition |
| `NameError: name 'x' is not defined` | Variable out of scope | Check variable scope |
| `TypeError: 'int' object is not callable` | Variable named same as function | Rename variable or function |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **def defines functions** | `def name(params):` starts function definition |
| **return sends output** | `return value` returns from function |
| **Default params simplify calls** | `def greet(name="World"):` |
| ***args collects positionals** | Variable number of arguments |
| ****kwargs collects keywords** | Variable number of keyword arguments |
| **local scope is default** | Variables created in functions are local |
| **global modifies global** | `global x` to modify global variable |
| **nonlocal modifies outer** | `nonlocal x` in nested functions |
| **lambda for simple functions** | One-line anonymous functions |
| **map/filter/sorted with lambda** | Common functional programming pattern |

