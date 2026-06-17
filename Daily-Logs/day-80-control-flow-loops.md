# 📅 Day 80: Control Flow & Loops

**Date:** June 17, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Conditionals (if/elif/else), Loops (for, while), Loop Control (break, continue, else), List Comprehensions

---

## 📋 Learning Objectives

- ✅ Master if/elif/else conditional statements
- ✅ Use comparison and logical operators
- ✅ Write for loops with range() and iterating collections
- ✅ Use enumerate() for index + value iteration
- ✅ Use zip() for parallel iteration
- ✅ Write while loops
- ✅ Control loops with break, continue, and else
- ✅ Write list comprehensions with conditions

---

## 🎯 Part 1: Conditionals

### if/elif/else Statements

Python uses `if`, `elif` (short for else if), and `else` for conditional execution.

```python
# Basic if statement (no parentheses needed)
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
# Comparison examples
age = 25
name = "Victor"

print(age == 25)   # True
print(age != 30)   # True
print(age > 20)    # True
print(age < 18)    # False

# String comparison (lexicographic)
print("apple" < "banana")  # True (a comes before b)
print("abc" == "abc")      # True
```

### Logical Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `and` | Both conditions True | `x > 0 and x < 10` |
| `or` | At least one condition True | `x < 0 or x > 10` |
| `not` | Negates condition | `not x > 0` |

```python
# Logical operators
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

### Nested Conditionals

```python
# Nested if statements
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

---

## 🔄 Part 2: For Loops

### for loop with range()

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

# Calculate sum with range
total = 0
for i in range(1, 11):
    total += i
print(f"Sum of 1-10: {total}")  # 55
```

### Iterating Lists

```python
# Iterate over list elements
fruits = ["apple", "banana", "cherry", "date"]

for fruit in fruits:
    print(fruit)

# Iterate with index using enumerate()
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# enumerate with custom start value
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

# Iterate over strings
word = "Python"
for char in word:
    print(char)
```

### zip() - Parallel Iteration

```python
# Iterate multiple lists simultaneously
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# zip with three lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["NYC", "LA", "Chicago"]

for name, age, city in zip(names, ages, cities):
    print(f"{name} ({age}) lives in {city}")

# zip returns iterator (convert to list)
pairs = list(zip(names, ages))
print(pairs)  # [('Alice', 25), ('Bob', 30), ('Charlie', 35)]

# Handle uneven lengths (stops at shortest)
names = ["Alice", "Bob", "Charlie", "David"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name}: {age}")  # David is not printed
```

### Iterating Dictionaries

```python
user = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Iterate keys
for key in user:
    print(key)

# Iterate values
for value in user.values():
    print(value)

# Iterate key-value pairs
for key, value in user.items():
    print(f"{key}: {value}")
```

---

## ⏳ Part 3: While Loops

### Basic while loop

```python
# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# While with user input
user_input = ""
while user_input != "quit":
    user_input = input("Enter a command (or 'quit' to exit): ")
    if user_input != "quit":
        print(f"You entered: {user_input}")

# While with sentinel value
total = 0
num = 1
while num != 0:
    num = int(input("Enter a number (0 to stop): "))
    total += num
print(f"Total: {total}")

# Infinite loop (use with caution!)
# while True:
#     print("This runs forever")
```

### While vs For

```python
# For loop - known number of iterations
for i in range(10):
    print(i)

# While loop - unknown number of iterations
numbers = [1, 2, 3, 4, 5]
i = 0
while i < len(numbers):
    print(numbers[i])
    i += 1

# When to use while: when condition depends on runtime data
password = ""
while len(password) < 8:
    password = input("Enter password (min 8 chars): ")
    if len(password) < 8:
        print("Too short!")
```

---

## 🛑 Part 4: Loop Control

### break - Exit Loop

```python
# Break out of loop entirely
for i in range(10):
    if i == 5:
        break  # Loop stops at 5
    print(i)

# Break in while
while True:
    user_input = input("Enter a number (or 'quit'): ")
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
    print(i)  # Only prints odd numbers

# Skip in while
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

# Practical example: searching
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

### Basic List Comprehensions

```python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension (much cleaner)
squares = [x**2 for x in range(10)]

# With condition (filtering)
evens = [x for x in range(20) if x % 2 == 0]

# Odd numbers
odds = [x for x in range(20) if x % 2 != 0]
```

### With if-else

```python
# Transform based on condition
parity = ["even" if x % 2 == 0 else "odd" for x in range(10)]
# ['even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd']

# Classify numbers
categories = ["positive" if x > 0 else "zero" if x == 0 else "negative" for x in range(-5, 6)]
```

### Nested List Comprehensions

```python
# Nested loops
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b'), (3, 'a'), (3, 'b')]

# Flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Set and Dictionary Comprehensions

```python
# Set comprehension
unique_squares = {x**2 for x in range(10)}
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

---

## 🏗️ Part 6: Mini-Project - Guess Number Game

```python
# guess_number.py
"""
Number Guessing Game
Demonstrates: while loops, conditionals, break, random numbers
"""

import random

def guess_number_game():
    print("=" * 40)
    print("      🎯 NUMBER GUESSING GAME")
    print("=" * 40)
    print("\nI'm thinking of a number between 1 and 100.")
    print("You have 7 guesses to find it!\n")

    # Generate random number
    target = random.randint(1, 100)
    max_guesses = 7
    attempts = 0
    best_score = None

    # Try to load best score from file
    try:
        with open("best_score.txt", "r") as f:
            best_score = int(f.read().strip())
    except FileNotFoundError:
        best_score = None

    if best_score:
        print(f"🏆 Best score: {best_score} guesses")

    while attempts < max_guesses:
        try:
            guess = int(input(f"Guess {attempts + 1}/{max_guesses}: "))
        except ValueError:
            print("❌ Please enter a valid number!")
            continue

        attempts += 1

        if guess < target:
            print("📈 Too low! Try higher.")
        elif guess > target:
            print("📉 Too high! Try lower.")
        else:
            print(f"\n🎉 Correct! The number was {target}!")
            print(f"✅ You got it in {attempts} guesses!")

            # Update best score
            if best_score is None or attempts < best_score:
                best_score = attempts
                print(f"🏆 New best score: {best_score} guesses!")
                with open("best_score.txt", "w") as f:
                    f.write(str(best_score))
            break

    if attempts == max_guesses:
        print(f"\n😢 Game Over! The number was {target}.")
        print(f"💡 Hint: Try again and use the clues!")

    print("\n" + "=" * 40)

    # Ask to play again
    play_again = input("\nPlay again? (y/n): ").lower()
    if play_again == 'y':
        guess_number_game()
    else:
        print("\nThanks for playing! 👋")

if __name__ == "__main__":
    guess_number_game()
```

### Sample Output

```
========================================
      🎯 NUMBER GUESSING GAME
========================================

I'm thinking of a number between 1 and 100.
You have 7 guesses to find it!

Guess 1/7: 50
📉 Too high! Try lower.
Guess 2/7: 25
📉 Too high! Try lower.
Guess 3/7: 12
📈 Too low! Try higher.
Guess 4/7: 18
📈 Too low! Try higher.
Guess 5/7: 22
📉 Too high! Try lower.
Guess 6/7: 20
🎉 Correct! The number was 20!
✅ You got it in 6 guesses!

========================================

Play again? (y/n):
```

---

## 📊 Quick Reference

### Conditionals

| Concept | Syntax |
|---------|--------|
| If | `if condition:` |
| Else if | `elif condition:` |
| Else | `else:` |
| And | `condition1 and condition2` |
| Or | `condition1 or condition2` |
| Not | `not condition` |

### Loops

| Concept | Syntax |
|---------|--------|
| For range | `for i in range(n):` |
| For list | `for item in items:` |
| For with index | `for i, item in enumerate(items):` |
| Parallel | `for a, b in zip(list1, list2):` |
| While | `while condition:` |
| Infinite | `while True:` |

### Loop Control

| Statement | Effect |
|-----------|--------|
| `break` | Exit loop entirely |
| `continue` | Skip to next iteration |
| `else` | Run if loop completes without break |

### List Comprehension

| Pattern | Purpose |
|---------|---------|
| `[x for x in iterable]` | Transform each item |
| `[x for x in iterable if condition]` | Filter items |
| `[expr if cond else expr for x in iterable]` | Transform with condition |
| `[expr for x in iterable for y in iterable2]` | Nested loops |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `IndentationError` | Inconsistent indentation | Use consistent 4 spaces |
| `NameError` | Variable not defined | Define variable before use |
| `ValueError` | Invalid input conversion | Use try/except for user input |
| Infinite loop | Condition never becomes False | Ensure condition updates |
| `StopIteration` | Using next() on empty iterator | Check length before next() |

---

## ✅ Day 80 Checklist

- [ ] Write if/elif/else statements
- [ ] Use comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- [ ] Use logical operators: `and`, `or`, `not`
- [ ] Use `in` operator for membership
- [ ] Write for loops with `range()`
- [ ] Use `enumerate()` for index + value
- [ ] Use `zip()` for parallel iteration
- [ ] Write while loops
- [ ] Use `break` to exit loops
- [ ] Use `continue` to skip iterations
- [ ] Use `else` clauses on loops
- [ ] Write list comprehensions with conditions
- [ ] Complete number guessing game
- [ ] Push code to GitHub
