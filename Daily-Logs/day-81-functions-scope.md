# 📅 Day 81: Functions & Scope

**Date:** June 18, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Functions, Parameters, Return Values, *args, **kwargs, Scope, Lambda Functions

---

## 📋 Learning Objectives

- ✅ Define functions with the `def` keyword
- ✅ Use parameters and return values
- ✅ Set default parameter values
- ✅ Use keyword arguments
- ✅ Handle variable arguments with `*args` and `**kwargs`
- ✅ Understand local vs global scope
- ✅ Use `global` and `nonlocal` keywords
- ✅ Write lambda functions for simple operations
- ✅ Use lambda with `map()`, `filter()`, `sorted()`

---

## 🎯 Part 1: Functions Basics

### Defining Functions

```python
# Basic function definition
def greet():
    print("Hello, World!")

# Call the function
greet()  # Hello, World!

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Victor")  # Hello, Victor!

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
```

### Parameters and Return Values

```python
# Multiple parameters
def calculate_rectangle_area(length, width):
    return length * width

area = calculate_rectangle_area(10, 5)
print(area)  # 50

# Multiple return values (returns tuple)
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([1, 2, 3, 4, 5])
print(minimum, maximum)  # 1 5

# Function with no return (returns None)
def log_message(message):
    print(f"[LOG] {message}")
    # Implicitly returns None

result = log_message("Test")  # [LOG] Test
print(result)  # None
```

### Default Parameters

```python
# Default parameter value
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Victor"))           # Hello, Victor!
print(greet("Victor", "Hi"))     # Hi, Victor!
print(greet(name="Victor", greeting="Hey"))  # Hey, Victor!

# Default parameter with list (caution!)
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

### Positional vs Keyword Arguments

```python
# Positional arguments (order matters)
def introduce(name, age, city):
    print(f"{name} is {age} years old and lives in {city}")

introduce("Victor", 28, "Lagos")  # Positional

# Keyword arguments (order doesn't matter)
introduce(city="Lagos", age=28, name="Victor")  # Keyword

# Mixing positional and keyword (positional first)
introduce("Victor", city="Lagos", age=28)
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

# Accessing global variable (read-only by default)
def read_global():
    print(global_var)  # Works

# Modifying global variable (requires global keyword)
def modify_global():
    global global_var  # Declare intent to modify
    global_var = "Modified"

modify_global()
print(global_var)  # Modified
```

### global Keyword

```python
counter = 0

def increment():
    global counter
    counter += 1
    print(f"Counter: {counter}")

increment()  # Counter: 1
increment()  # Counter: 2
increment()  # Counter: 3

# Global with multiple variables
x = 10
y = 20

def update_globals():
    global x, y
    x = 100
    y = 200

update_globals()
print(x, y)  # 100 200
```

### nonlocal Keyword (Nested Functions)

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

# Nested function with nonlocal
def counter():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

increment = counter()
print(increment())  # 1
print(increment())  # 2
print(increment())  # 3
```

### Scope Best Practices

```python
# ✅ GOOD: Use parameters and return values
def calculate_tax(amount):
    tax_rate = 0.1  # Local constant
    return amount * tax_rate

# ❌ BAD: Modify globals unnecessarily
tax_rate = 0.1
def calculate_tax_bad(amount):
    global tax_rate
    return amount * tax_rate

# ✅ GOOD: Use constants at module level
TAX_RATE = 0.1  # Module-level constant (uppercase)

def calculate_tax(amount):
    return amount * TAX_RATE

# ✅ GOOD: Use docstrings
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

# Multiple parameters in lambda
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Lambda with conditional expression
max_value = lambda a, b: a if a > b else b
print(max_value(10, 20))  # 20
```

### map() with Lambda

```python
# map() applies function to each element
numbers = [1, 2, 3, 4, 5]

# Square each number
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Convert to strings
string_nums = list(map(str, numbers))
print(string_nums)  # ['1', '2', '3', '4', '5']

# Multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [11, 22, 33]
```

### filter() with Lambda

```python
# filter() selects elements that pass condition
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Get numbers greater than 5
greater_than_5 = list(filter(lambda x: x > 5, numbers))
print(greater_than_5)  # [6, 7, 8, 9, 10]

# Filter strings by length
names = ["Alice", "Bob", "Charlie", "Dave"]
long_names = list(filter(lambda x: len(x) > 4, names))
print(long_names)  # ['Alice', 'Charlie']
```

### sorted() with Lambda

```python
# sorted() with key function
names = ["Alice", "Bob", "Charlie", "Dave", "Eve"]

# Sort by name length
sorted_by_length = sorted(names, key=lambda x: len(x))
print(sorted_by_length)  # ['Bob', 'Eve', 'Dave', 'Alice', 'Charlie']

# Sort by last character
sorted_by_last = sorted(names, key=lambda x: x[-1])
print(sorted_by_last)  # ['Eve', 'Alice', 'Bob', 'Charlie', 'Dave']

# Sort dictionary by value
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

sorted_by_age = sorted(people, key=lambda x: x["age"])
for person in sorted_by_age:
    print(person)
# {'name': 'Bob', 'age': 25}
# {'name': 'Alice', 'age': 30}
# {'name': 'Charlie', 'age': 35}
```

---

## 🏗️ Part 5: Mini-Project - Calculator Module

```python
# calculator.py
"""
Calculator Module
Demonstrates: functions, *args, error handling, docstrings
"""

import math

def add(*args):
    """
    Add all provided numbers together.
    
    Args:
        *args: Any number of numeric values
    
    Returns:
        Sum of all arguments
    """
    return sum(args)

def subtract(a, b):
    """
    Subtract b from a.
    
    Args:
        a: The number to subtract from
        b: The number to subtract
    
    Returns:
        a - b
    """
    return a - b

def multiply(*args):
    """
    Multiply all provided numbers together.
    
    Args:
        *args: Any number of numeric values
    
    Returns:
        Product of all arguments
    """
    if not args:
        return 0
    result = 1
    for num in args:
        result *= num
    return result

def divide(a, b):
    """
    Divide a by b.
    
    Args:
        a: The numerator
        b: The denominator
    
    Returns:
        a / b
    
    Raises:
        ValueError: If b is 0
    """
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(a, b):
    """
    Raise a to the power of b.
    
    Args:
        a: The base
        b: The exponent
    
    Returns:
        a ** b
    """
    return a ** b

def square_root(a):
    """
    Calculate the square root of a.
    
    Args:
        a: The number to find the square root of
    
    Returns:
        Square root of a
    
    Raises:
        ValueError: If a is negative
    """
    if a < 0:
        raise ValueError("Cannot calculate square root of negative number")
    return math.sqrt(a)

def factorial(a):
    """
    Calculate the factorial of a.
    
    Args:
        a: The number to find the factorial of
    
    Returns:
        Factorial of a
    
    Raises:
        ValueError: If a is negative or not an integer
    """
    if a < 0 or not isinstance(a, int):
        raise ValueError("Factorial only defined for non-negative integers")
    if a == 0:
        return 1
    result = 1
    for i in range(2, a + 1):
        result *= i
    return result

def display_menu():
    """Display the calculator menu."""
    print("\n" + "=" * 40)
    print("         CALCULATOR")
    print("=" * 40)
    print("1. Add (+)")
    print("2. Subtract (-)")
    print("3. Multiply (×)")
    print("4. Divide (÷)")
    print("5. Power (^)")
    print("6. Square Root (√)")
    print("7. Factorial (!)")
    print("8. Clear")
    print("9. Exit")
    print("-" * 40)

def main():
    """Main calculator loop."""
    history = []
    
    while True:
        display_menu()
        choice = input("Select operation (1-9): ").strip()
        
        if choice == "9":
            print("\nGoodbye! 👋")
            break
        
        if choice == "8":
            history.clear()
            print("\n🧹 History cleared!")
            continue
        
        try:
            if choice == "1":  # Addition
                numbers = input("Enter numbers separated by spaces: ").split()
                numbers = [float(x) for x in numbers]
                result = add(*numbers)
                history.append(f"{' + '.join(str(n) for n in numbers)} = {result}")
                print(f"\nResult: {result}")
                
            elif choice == "2":  # Subtraction
                a = float(input("Enter first number: "))
                b = float(input("Enter second number: "))
                result = subtract(a, b)
                history.append(f"{a} - {b} = {result}")
                print(f"\nResult: {result}")
                
            elif choice == "3":  # Multiplication
                numbers = input("Enter numbers separated by spaces: ").split()
                numbers = [float(x) for x in numbers]
                result = multiply(*numbers)
                history.append(f"{' × '.join(str(n) for n in numbers)} = {result}")
                print(f"\nResult: {result}")
                
            elif choice == "4":  # Division
                a = float(input("Enter numerator: "))
                b = float(input("Enter denominator: "))
                result = divide(a, b)
                history.append(f"{a} ÷ {b} = {result}")
                print(f"\nResult: {result}")
                
            elif choice == "5":  # Power
                a = float(input("Enter base: "))
                b = float(input("Enter exponent: "))
                result = power(a, b)
                history.append(f"{a} ^ {b} = {result}")
                print(f"\nResult: {result}")
                
            elif choice == "6":  # Square Root
                a = float(input("Enter number: "))
                result = square_root(a)
                history.append(f"√{a} = {result}")
                print(f"\nResult: {result}")
                
            elif choice == "7":  # Factorial
                a = int(input("Enter non-negative integer: "))
                result = factorial(a)
                history.append(f"{a}! = {result}")
                print(f"\nResult: {result}")
                
            else:
                print("\n❌ Invalid choice. Please try again.")
                continue
                
        except ValueError as e:
            print(f"\n❌ Error: {e}")
        except Exception as e:
            print(f"\n❌ An error occurred: {e}")
        
        if history:
            print(f"\n📝 History: {len(history)} calculations")
            for calc in history[-5:]:  # Show last 5 calculations
                print(f"  • {calc}")

if __name__ == "__main__":
    main()
```

### Sample Output

```
========================================
         CALCULATOR
========================================
1. Add (+)
2. Subtract (-)
3. Multiply (×)
4. Divide (÷)
5. Power (^)
6. Square Root (√)
7. Factorial (!)
8. Clear
9. Exit
----------------------------------------
Select operation (1-9): 1
Enter numbers separated by spaces: 10 20 30 40

Result: 100.0

📝 History: 1 calculations
  • 10.0 + 20.0 + 30.0 + 40.0 = 100.0

========================================
         CALCULATOR
========================================
1. Add (+)
2. Subtract (-)
3. Multiply (×)
4. Divide (÷)
5. Power (^)
6. Square Root (√)
7. Factorial (!)
8. Clear
9. Exit
----------------------------------------
Select operation (1-9): 2
Enter first number: 100
Enter second number: 25

Result: 75.0

📝 History: 2 calculations
  • 10.0 + 20.0 + 30.0 + 40.0 = 100.0
  • 100.0 - 25.0 = 75.0
```

---

## 📊 Quick Reference

### Function Syntax

| Concept | Syntax |
|---------|--------|
| Basic function | `def name():` |
| Parameters | `def name(param1, param2):` |
| Return | `return value` |
| Default | `def name(param="default"):` |
| *args | `def name(*args):` |
| **kwargs | `def name(**kwargs):` |
| Lambda | `lambda x: x * 2` |

### Scope Keywords

| Keyword | Purpose |
|---------|---------|
| `global` | Modify global variable |
| `nonlocal` | Modify variable in outer function |

### Lambda Functions

```python
# Basic
lambda x: x ** 2

# Multiple parameters
lambda a, b: a + b

# With condition
lambda x: "even" if x % 2 == 0 else "odd"

# With map()
map(lambda x: x * 2, numbers)

# With filter()
filter(lambda x: x > 0, numbers)

# With sorted()
sorted(items, key=lambda x: x["key"])
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `TypeError: missing required argument` | Missing parameter | Provide all required arguments |
| `UnboundLocalError` | Assigning to global without declaration | Use `global` keyword |
| `TypeError: X takes 2 positional arguments but 3 were given` | Too many arguments | Use `*args` for variable arguments |
| `SyntaxError: invalid syntax` | Missing colon `:` | Add `:` after function definition |
| `NameError: name 'x' is not defined` | Variable out of scope | Check variable scope |

---

## ✅ Day 81 Checklist

- [ ] Define functions with `def` keyword
- [ ] Use parameters and return values
- [ ] Set default parameter values
- [ ] Use keyword arguments
- [ ] Handle variable arguments with `*args`
- [ ] Handle keyword arguments with `**kwargs`
- [ ] Understand local vs global scope
- [ ] Use `global` keyword when needed
- [ ] Use `nonlocal` for nested functions
- [ ] Write lambda functions
- [ ] Use lambda with `map()`, `filter()`, `sorted()`
- [ ] Complete calculator mini-project
- [ ] Push code to GitHub

