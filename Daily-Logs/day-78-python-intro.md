# 📅 Day 78: Python Introduction & Setup

**Date:** June 15, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Python Overview, Installation, Virtual Environments, Basic Syntax, Data Types, Dynamic Typing

---

## 📋 Learning Objectives

- ✅ Understand what Python is and why it's used for AI/backend development
- ✅ Install Python 3.12+ and set up VS Code
- ✅ Create and activate virtual environments with `venv`
- ✅ Understand Python's dynamic typing system
- ✅ Master Python's indentation-based syntax
- ✅ Work with basic data types: int, float, str, bool

---

## 🎯 Part 1: What is Python?

### Python Overview

Python is a **high-level, interpreted programming language** known for its readability and versatility. It's widely used for:

| Domain | Popular Use Cases |
|--------|-------------------|
| **Backend Development** | Django, FastAPI, Flask |
| **Data Science** | Pandas, NumPy, Jupyter |
| **Machine Learning/AI** | TensorFlow, PyTorch, scikit-learn |
| **Automation** | Scripts, web scraping |
| **DevOps** | Infrastructure automation |

### Python vs JavaScript

| Aspect | JavaScript | Python |
|--------|------------|--------|
| **Typing** | Dynamic | Dynamic |
| **Code Blocks** | `{ curly braces }` | Indentation |
| **Variable Declaration** | `let`, `const`, `var` | None (just assign) |
| **Line Endings** | Semicolon (optional) | Newline |
| **String Interpolation** | `${variable}` | `f"{variable}"` |
| **Arrays/Lists** | `[]` | `[]` |
| **Objects/Dicts** | `{}` | `{}` |

### Why Python for AI/Backend?

| Reason | Explanation |
|--------|-------------|
| **Readable Syntax** | Indentation-based, reads like English |
| **Rich Ecosystem** | Extensive libraries for every need |
| **Great for Prototyping** | Dynamic typing speeds development |
| **Strong Community** | Abundant resources and support |
| **AI/ML Libraries** | TensorFlow, PyTorch, scikit-learn |

---

## 🔧 Part 2: Setting Up Python

### Step 1: Install Python

**Windows:**
1. Download from [python.org](https://python.org)
2. Check "Add Python to PATH"
3. Verify installation:
```bash
python --version
```

**macOS/Linux:**
```bash
# macOS (using Homebrew)
brew install python@3.12

# Ubuntu/Debian
sudo apt update
sudo apt install python3.12 python3-pip

# Verify
python3 --version
```

### Step 2: VS Code Extensions

Install these extensions:
| Extension | Purpose |
|-----------|---------|
| **Python** (Microsoft) | Language support, IntelliSense |
| **Pylance** | Fast type checking |
| **Python Debugger** | Debugging support |

### Step 3: Virtual Environments

Virtual environments isolate project dependencies.

```bash
# Create virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate

# Deactivate when done
deactivate

# Verify activation (should show (venv) in terminal)
# (venv) C:\project>
```

### Step 4: pip Package Manager

```bash
# Install a package
pip install package-name

# Install from requirements.txt
pip install -r requirements.txt

# List installed packages
pip list

# Uninstall package
pip uninstall package-name

# Freeze current packages to file
pip freeze > requirements.txt
```

---

## 📝 Part 3: Basic Syntax

### Your First Python Program

```python
# hello.py - Single line comment

print("Hello, World!")  # This prints to console

"""
Multi-line comment
Can span multiple lines
Use triple quotes
"""

# No semicolons needed (but allowed)
print("Welcome to Python")
```

### Variables (No Declaration Keywords)

```python
# JavaScript: let name = "John"
# Python: name = "John"

name = "Victor"        # String
age = 28               # Integer
price = 19.99          # Float
is_active = True       # Boolean
items = []             # Empty list
person = {}            # Empty dict

# Multiple assignment
x, y, z = 1, 2, 3

# Same value for multiple variables
a = b = c = 0
```

### Dynamic Typing

```python
# Variables can change type at runtime
data = 42          # int
print(type(data))  # <class 'int'>

data = "hello"     # str (allowed!)
print(type(data))  # <class 'str'>

data = [1, 2, 3]   # list (allowed!)
print(type(data))  # <class 'list'>
```

### Data Types Reference

| Type | Example | `type()` Output |
|------|---------|-----------------|
| Integer | `age = 25` | `<class 'int'>` |
| Float | `price = 19.99` | `<class 'float'>` |
| String | `name = "John"` | `<class 'str'>` |
| Boolean | `is_valid = True` | `<class 'bool'>` |
| None | `value = None` | `<class 'NoneType'>` |

### Type Checking and Conversion

```python
# Check type
age = 25
print(type(age))  # <class 'int'>

# Type conversion
str_age = str(age)      # "25"
int_value = int("100")  # 100
float_value = float(5)  # 5.0

# Check if variable is specific type
isinstance(age, int)    # True
isinstance(name, str)   # True
```

### Indentation Matters

Python uses **indentation** (whitespace) to define code blocks, not curly braces.

```python
# ✅ Correct indentation (4 spaces or tab)
if age >= 18:
    print("Adult")           # Inside if block
    print("You can vote")    # Inside if block
print("Always runs")         # Outside if block

# ❌ Wrong - IndentationError
if age >= 18:
print("Adult")               # IndentationError: expected indented block
```

### Input and Output

```python
# Print with multiple arguments
print("Hello", "World", 123)  # Hello World 123

# Print with separator
print("a", "b", "c", sep="-")  # a-b-c

# Print without newline
print("Loading", end="...")
print("Done")  # Loading...Done

# User input (always returns string)
name = input("Enter your name: ")
age = int(input("Enter your age: "))  # Convert to int
price = float(input("Enter price: ")) # Convert to float
```

### String Formatting (f-strings)

```python
name = "Victor"
age = 28

# f-string (Python 3.6+) - RECOMMENDED
message = f"My name is {name} and I am {age} years old"

# .format() method (older)
message = "My name is {} and I am {} years old".format(name, age)

# % formatting (oldest)
message = "My name is %s and I am %d years old" % (name, age)

# Print formatted directly
print(f"Hello, {name}!")
print(f"Next year you will be {age + 1}")
```

---

## 🏗️ Part 4: Mini-Project - User Info Script

### Complete Implementation

```python
# user_info.py
"""
User Information Collection Script
Demonstrates: input(), f-strings, type conversion, calculations
"""

import datetime

# Get user input
print("=" * 40)
print("     USER INFORMATION COLLECTOR")
print("=" * 40)

name = input("Enter your name: ")
age = input("Enter your age: ")
city = input("Enter your city: ")

# Convert age to integer
age = int(age)

# Calculate birth year
current_year = datetime.datetime.now().year
birth_year = current_year - age

# Calculate birth decade
birth_decade = (birth_year // 10) * 10

# Format name (capitalize)
formatted_name = name.strip().title()

# Display summary
print("\n" + "=" * 40)
print("           YOUR SUMMARY")
print("=" * 40)
print(f"Name:         {formatted_name}")
print(f"Age:          {age}")
print(f"City:         {city}")
print(f"Birth Year:   {birth_year}")
print(f"Birth Decade: {birth_decade}s")
print(f"You were born in the {birth_decade}s!")

# Determine age category
print("\n" + "-" * 40)
if age < 13:
    category = "Child"
elif age < 20:
    category = "Teenager"
elif age < 60:
    category = "Adult"
else:
    category = "Senior"

print(f"Age Category: {category}")

# Fun fact about birth year
print("\n" + "=" * 40)
print("          FUN FACT")
print("=" * 40)

if birth_year % 100 == 0:
    print(f"{birth_year} is a century year!")
elif birth_year % 4 == 0:
    print(f"{birth_year} was a leap year!")
else:
    print(f"{birth_year} was not a leap year.")

print("\nThank you for using the User Information Collector!")
```

### Running the Script

```bash
# Make sure virtual environment is activated (optional)
python user_info.py
```

### Example Output

```
========================================
     USER INFORMATION COLLECTOR
========================================
Enter your name: victor innocent
Enter your age: 28
Enter your city: Lagos

========================================
           YOUR SUMMARY
========================================
Name:         Victor Innocent
Age:          28
City:         Lagos
Birth Year:   1998
Birth Decade: 1990s
You were born in the 1990s!

----------------------------------------
Age Category: Adult

========================================
          FUN FACT
========================================
1998 was not a leap year.

Thank you for using the User Information Collector!
```

---

## 📊 Quick Reference

### Python vs JavaScript Side-by-Side

| Operation | JavaScript | Python |
|-----------|------------|--------|
| Variable | `let x = 5` | `x = 5` |
| Constant | `const x = 5` | (no built-in) |
| Console | `console.log(x)` | `print(x)` |
| If statement | `if (x > 0) { }` | `if x > 0:` |
| For loop | `for (let i = 0; i < 5; i++)` | `for i in range(5):` |
| While loop | `while (condition) { }` | `while condition:` |
| Function | `function name() { }` | `def name():` |
| Comment | `// comment` | `# comment` |
| Multi-line comment | `/* comment */` | `""" comment """` |

### Common Python Commands

| Command | Purpose |
|---------|---------|
| `python script.py` | Run Python script |
| `python` | Start interactive REPL |
| `pip install package` | Install package |
| `pip freeze > requirements.txt` | Save dependencies |
| `python -m venv venv` | Create virtual environment |
| `source venv/bin/activate` | Activate venv (macOS/Linux) |
| `venv\Scripts\activate` | Activate venv (Windows) |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `IndentationError` | Mixing tabs and spaces | Use consistent 4 spaces |
| `NameError: name 'x' not defined` | Variable not defined | Define variable before use |
| `ValueError` | Wrong type conversion | Check input before converting |
| `ModuleNotFoundError` | Package not installed | Run `pip install package` |
| `SyntaxError: invalid syntax` | Missing colon `:` | Add colon after if/for/def |
| `python: command not found` | Python not in PATH | Reinstall with "Add to PATH" |

---

## ✅ Day 78 Checklist

- [ ] Install Python 3.12+ on your system
- [ ] Verify installation with `python --version`
- [ ] Install VS Code Python extension
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment
- [ ] Create `hello.py` and run it
- [ ] Practice variable assignment and dynamic typing
- [ ] Understand indentation rules
- [ ] Use `input()` to get user data
- [ ] Use f-strings for string formatting
- [ ] Complete `user_info.py` mini-project
- [ ] Push code to GitHub

