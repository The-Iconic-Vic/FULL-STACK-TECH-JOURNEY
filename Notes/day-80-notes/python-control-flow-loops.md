# 📘 Python Control Flow & Loops

## 🎯 Overview

Python's control flow structures determine the order in which code executes. This guide covers conditional statements, loops, and loop control mechanisms.

---

## 📝 Part 1: Conditionals

### if/elif/else Statements

Python uses indentation to define code blocks, not curly braces. The `elif` keyword is used for "else if" (no `else if` in Python).

```python
# Basic if statement
age = 18
if age >= 18:
    print("Adult")
    print("You can vote")

# if/else
temperature = 25
if temperature > 30:
    print("Hot")
else:
    print("Not hot")

# if/elif/else (multiple conditions)
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print(f"Grade: {grade}")  # Grade: B

# Nested conditionals
age = 25
is_student = True
if age >= 18:
    if is_student:
        print("Adult student")
    else:
        print("Adult non-student")
else:
    print("Minor")
```

### Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `x == 5` |
| `!=` | Not equal to | `x != 5` |
| `>` | Greater than | `x > 5` |
| `<` | Less than | `x < 5` |
| `>=` | Greater than or equal | `x >= 5` |
| `<=` | Less than or equal | `x <= 5` |

```python
age = 25
name = "Victor"

print(age == 25)   # True
print(age != 30)   # True
print(age > 20)    # True
print(age < 18)    # False

# String comparison (lexicographic)
print("apple" < "banana")  # True
print("abc" == "abc")      # True
```

### Logical Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `and` | Both conditions True | `x > 0 and x < 10` |
| `or` | At least one condition True | `x < 0 or x > 10` |
| `not` | Negates condition | `not x > 0` |

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")

if age < 18 or age > 65:
    print("Special rate applies")

if not has_license:
    print("You need a license")

# Combining multiple conditions
score = 85
attendance = 90
if score >= 80 and attendance >= 85:
    print("Excellent student")
elif score >= 60 or attendance >= 70:
    print("Passing")
else:
    print("Needs improvement")
```

### in Operator (Membership)

```python
# Check if value exists in sequence
fruits = ["apple", "banana", "orange"]

if "apple" in fruits:
    print("Apple is in the list")

if "grape" not in fruits:
    print("Grape is not in the list")

# With strings
text = "Hello World"
if "World" in text:
    print("Contains World")

# With dictionaries (checks keys)
user = {"name": "Alice", "age": 30}
if "name" in user:
    print(f"Name: {user['name']}")
```

---

## 🔄 Part 2: For Loops

### range() Function

```python
# Basic range(start, end, step)
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):   # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)

# Reverse range
for i in range(5, 0, -1):  # 5, 4, 3, 2, 1
    print(i)

# Sum of numbers
total = 0
for i in range(1, 11):
    total += i
print(f"Sum of 1-10: {total}")  # 55
```

### Iterating Collections

```python
# Iterate list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# enumerate() - index + value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# enumerate with custom start
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

# Iterate strings
word = "Python"
for char in word:
    print(char)

# Iterate dictionary
user = {"name": "Alice", "age": 30}
for key, value in user.items():
    print(f"{key}: {value}")
```

### zip() - Parallel Iteration

```python
# Iterate multiple lists simultaneously
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Three lists
cities = ["NYC", "LA", "Chicago"]
for name, age, city in zip(names, ages, cities):
    print(f"{name} ({age}) lives in {city}")

# Convert to list
pairs = list(zip(names, ages))
# [('Alice', 25), ('Bob', 30), ('Charlie', 35)]

# Stops at shortest list
names = ["Alice", "Bob", "Charlie", "David"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name}: {age}")  # David not printed
```

---

## ⏳ Part 3: While Loops

```python
# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# While with user input
user_input = ""
while user_input != "quit":
    user_input = input("Enter command (or 'quit'): ")
    if user_input != "quit":
        print(f"You entered: {user_input}")

# While with sentinel value
total = 0
num = 1
while num != 0:
    num = int(input("Enter number (0 to stop): "))
    total += num
print(f"Total: {total}")

# Infinite loop (use with caution)
# while True:
#     print("This runs forever")
```

### While vs For

| For Loop | While Loop |
|----------|------------|
| Known number of iterations | Unknown number of iterations |
| `for i in range(10):` | `while count < 10:` |
| Iterating collections | Condition-dependent |
| Simpler and safer | More flexible |

```python
# For - known count
for i in range(10):
    print(i)

# While - condition-dependent
numbers = [1, 2, 3, 4, 5]
i = 0
while i < len(numbers):
    print(numbers[i])
    i += 1
```

---

## 🛑 Part 4: Loop Control

### break - Exit Loop

```python
# Break exits loop entirely
for i in range(10):
    if i == 5:
        break
    print(i)  # Prints 0, 1, 2, 3, 4

# break in while
while True:
    user_input = input("Enter number (or 'quit'): ")
    if user_input == "quit":
        break
    print(f"You entered: {user_input}")
```

### continue - Skip Iteration

```python
# Skip current iteration
for i in range(10):
    if i % 2 == 0:  # Skip even numbers
        continue
    print(i)  # Only odd numbers

# continue in while
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue
    print(i)
```

### else Clause on Loops

```python
# else runs if loop completes without break
for i in range(5):
    print(i)
else:
    print("Loop completed normally")

# else does NOT run if break occurs
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("This will not run")

# Practical example: search
numbers = [1, 2, 3, 4, 5]
search = 6

for num in numbers:
    if num == search:
        print("Found!")
        break
else:
    print("Not found!")
```

---

## 📋 Part 5: List Comprehensions

```python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension (much cleaner)
squares = [x**2 for x in range(10)]

# With condition (filtering)
evens = [x for x in range(20) if x % 2 == 0]

# With if-else (transformation)
parity = ["even" if x % 2 == 0 else "odd" for x in range(10)]

# Nested loops
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]

# Flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Set comprehension
unique_squares = {x**2 for x in range(10)}

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}
```

---

## 📊 Quick Reference

### Control Flow Summary

| Concept | Syntax |
|---------|--------|
| If | `if condition:` |
| Else if | `elif condition:` |
| Else | `else:` |
| For range | `for i in range(n):` |
| For iterable | `for item in items:` |
| For with index | `for i, item in enumerate(items):` |
| Parallel | `for a, b in zip(list1, list2):` |
| While | `while condition:` |
| Infinite | `while True:` |
| Break | `break` |
| Continue | `continue` |
| For-else | `else:` after for loop |

### List Comprehension Patterns

| Pattern | Purpose |
|---------|---------|
| `[x for x in iterable]` | Transform each item |
| `[x for x in iterable if condition]` | Filter items |
| `[expr if cond else expr for x in iterable]` | Transform with condition |
| `[expr for x in iterable for y in iterable2]` | Nested loops |
| `{x for x in iterable}` | Set comprehension |
| `{key: value for x in iterable}` | Dict comprehension |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `IndentationError` | Inconsistent indentation | Use consistent 4 spaces |
| `NameError` | Variable not defined | Define before use |
| `ValueError` | Invalid input conversion | Use try/except |
| Infinite loop | Condition never False | Ensure condition updates |
| `StopIteration` | next() on empty iterator | Check length first |
| Missing colon `:` | Syntax error | Add `:` after condition |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Indentation defines blocks** | No curly braces, use consistent 4 spaces |
| **elif = else if** | No `else if` in Python |
| **range() is exclusive at end** | `range(5)` gives 0-4, not 5 |
| **enumerate() gives index** | `for i, item in enumerate(list)` |
| **zip() pairs iterables** | Stops at shortest |
| **break exits loop** | Use for early termination |
| **continue skips iteration** | Use to skip specific cases |
| **else runs if no break** | Use for search patterns |
| **List comprehensions are concise** | One-line list creation with filters |

