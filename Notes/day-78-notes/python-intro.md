# 📘 Python Introduction & Setup

## 🎯 What is Python?

Python is a **high-level, interpreted programming language** designed for readability and versatility. Created by Guido van Rossum and first released in 1991, Python emphasizes code readability through significant indentation and clean syntax.

### Key Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Interpreted** | Executes line by line, no compilation step |
| **Dynamically Typed** | Variable types determined at runtime |
| **Strongly Typed** | No implicit type conversion between unrelated types |
| **Object-Oriented** | Everything in Python is an object |
| **Garbage Collected** | Automatic memory management |

### Python vs JavaScript Comparison

| Aspect | JavaScript | Python |
|--------|------------|--------|
| **Syntax** | Curly braces `{}` for blocks | Indentation for blocks |
| **Variable declaration** | `let`, `const`, `var` | Direct assignment |
| **Line termination** | Semicolon (optional) | Newline |
| **Type system** | Dynamic, loosely typed | Dynamic, strongly typed |
| **String interpolation** | Template literals `${var}` | f-strings `f"{var}"` |
| **Arrays** | `[]` | `[]` (lists) |
| **Objects** | `{}` | `{}` (dictionaries) |
| **Function definition** | `function name() {}` | `def name():` |
| **Conditionals** | `if (condition) {}` | `if condition:` |

### Why Python for AI/Backend?

| Use Case | Popular Libraries |
|----------|-------------------|
| **Web Development** | Django, Flask, FastAPI |
| **Data Science** | Pandas, NumPy, SciPy |
| **Machine Learning** | TensorFlow, PyTorch, scikit-learn |
| **Web Scraping** | BeautifulSoup, Scrapy, Selenium |
| **Automation** | Requests, Paramiko, Fabric |
| **DevOps** | Ansible, SaltStack, Docker SDK |

---

## 🔧 Installation & Setup

### Installing Python

**Windows:**
1. Download installer from [python.org/downloads](https://python.org/downloads)
2. Check "Add Python to PATH" during installation
3. Verify installation:
```bash
python --version
# Python 3.12.x
```

**macOS:**
```bash
# Using Homebrew (recommended)
brew install python@3.12
python3 --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3.12 python3-pip
python3 --version
```

### VS Code Extensions

| Extension | Extension ID | Purpose |
|-----------|--------------|---------|
| Python | `ms-python.python` | Language support, IntelliSense |
| Pylance | `ms-python.vscode-pylance` | Fast type checking |
| Python Debugger | `ms-python.debugpy` | Debugging support |

---

## 📦 Virtual Environments

### Why Virtual Environments?

Virtual environments isolate project dependencies, preventing conflicts between different projects.

| Without venv | With venv |
|--------------|-----------|
| All packages installed globally | Packages installed per project |
| Version conflicts common | No conflicts |
| Hard to reproduce | `requirements.txt` for reproducibility |

### Creating and Managing Virtual Environments

```bash
# Create virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate

# Verify activation (should show (venv) in terminal)
(venv) C:\project>

# Deactivate
deactivate

# Delete virtual environment
rm -rf venv     # macOS/Linux
rmdir /s venv   # Windows
```

### pip Package Manager

```bash
# Install a package
pip install requests

# Install specific version
pip install requests==2.28.0

# Install from requirements file
pip install -r requirements.txt

# List installed packages
pip list

# Generate requirements file
pip freeze > requirements.txt

# Uninstall package
pip uninstall requests
```

---

## 📝 Python Basic Syntax

### Comments

```python
# Single line comment

"""
Multi-line comment
Can span multiple lines
Using triple quotes
"""

# This is also a multi-line comment
# Each line starts with a hash
```

### Print Function

```python
# Basic print
print("Hello, World!")

# Multiple arguments (automatically adds space)
print("Hello", "World", 123)   # Hello World 123

# Custom separator
print("a", "b", "c", sep="-")   # a-b-c

# Custom ending (default is newline)
print("Loading", end="...")
print("Done")   # Loading...Done

# Print with formatting
name = "Victor"
print(f"Hello, {name}!")   # Hello, Victor!
```

### Variables

```python
# Basic assignment (no keywords)
name = "Victor"        # String
age = 28               # Integer
price = 19.99          # Float
is_active = True       # Boolean
data = None            # NoneType

# Multiple assignment
x, y, z = 1, 2, 3

# Same value for multiple variables
a = b = c = 0
```

### Variable Naming Rules

| Rule | Valid | Invalid |
|------|-------|---------|
| Start with letter or underscore | `name`, `_private` | `1name` |
| Remainder can be letters, numbers, underscore | `user_name`, `name123` | `user-name` |
| Case sensitive | `Name` ≠ `name` | - |
| Cannot be keywords | - | `if`, `for`, `while` |

### Python Keywords (Reserved)

| | | | |
|---|---|---|---|
| False | await | else | import |
| None | break | except | in |
| True | class | finally | is |
| and | continue | for | lambda |
| as | def | from | nonlocal |
| assert | del | global | not |
| async | elif | if | or |

---

## 📊 Data Types

### Basic Data Types

| Type | Example | `type()` Output |
|------|---------|-----------------|
| Integer | `age = 42` | `<class 'int'>` |
| Float | `price = 19.99` | `<class 'float'>` |
| String | `name = "John"` | `<class 'str'>` |
| Boolean | `is_ok = True` | `<class 'bool'>` |
| None | `value = None` | `<class 'NoneType'>` |

### Type Checking

```python
# Check type
age = 25
print(type(age))  # <class 'int'>

# Check if variable is specific type
isinstance(age, int)   # True
isinstance(name, str)  # True

# Compare types
type(age) == int       # True
type(age) == str       # False
```

### Type Conversion

```python
# String to integer
int("100")          # 100

# String to float
float("19.99")      # 19.99

# Number to string
str(42)             # "42"
str(3.14)           # "3.14"

# Integer to float
float(5)            # 5.0

# Float to integer (truncates)
int(3.99)           # 3

# String to boolean
bool("True")        # True (non-empty string)
bool("")            # False (empty string)
```

### Dynamic Typing

```python
# Python allows type changes at runtime
data = 42          # int
print(type(data))  # <class 'int'>

data = "hello"     # str (allowed!)
print(type(data))  # <class 'str'>

data = [1, 2, 3]   # list (allowed!)
print(type(data))  # <class 'list'>
```

---

## 🔄 Indentation Rules

### The Rule

Python uses **indentation** (whitespace) to define code blocks. **Consistency is critical.**

```python
# ✅ Correct - 4 spaces (PEP 8 standard)
if age >= 18:
    print("Adult")
    print("Can vote")

# ✅ Correct - Tab (but don't mix!)
if age >= 18:
    print("Adult")

# ❌ Wrong - No indentation
if age >= 18:
print("Adult")        # IndentationError

# ❌ Wrong - Inconsistent indentation
if age >= 18:
    print("Adult")
      print("Can vote")   # IndentationError
```

### Indentation Best Practices

| Practice | Recommendation |
|----------|----------------|
| **Spaces vs Tabs** | Use spaces (PEP 8) |
| **Indentation size** | 4 spaces per level |
| **Consistency** | Never mix tabs and spaces |
| **Empty blocks** | Use `pass` statement |

```python
# Empty block placeholder
if condition:
    pass  # Do nothing yet
```

---

## 📥 Input Function

```python
# Basic input (always returns string)
name = input("Enter your name: ")

# Convert to integer
age = int(input("Enter your age: "))

# Convert to float
price = float(input("Enter price: "))

# Multiple inputs (split)
x, y = input("Enter two numbers: ").split()
```

---

## 📊 Quick Reference

### Common Python Commands

| Command | Purpose |
|---------|---------|
| `python script.py` | Run Python script |
| `python` | Start interactive REPL |
| `python -m venv venv` | Create virtual environment |
| `source venv/bin/activate` | Activate venv (Unix) |
| `venv\Scripts\activate` | Activate venv (Windows) |
| `deactivate` | Deactivate venv |
| `pip install package` | Install package |
| `pip freeze > requirements.txt` | Save dependencies |
| `pip install -r requirements.txt` | Install dependencies |
| `pip list` | List installed packages |

### Python vs JavaScript Quick Reference

| Operation | JavaScript | Python |
|-----------|------------|--------|
| Variable | `let x = 5` | `x = 5` |
| Constant | `const x = 5` | (use uppercase naming) |
| Console | `console.log(x)` | `print(x)` |
| If | `if (x > 0) { }` | `if x > 0:` |
| Else if | `else if (x < 0)` | `elif x < 0:` |
| For loop | `for (let i = 0; i < 5; i++)` | `for i in range(5):` |
| While loop | `while (condition) { }` | `while condition:` |
| Function | `function name() { }` | `def name():` |
| Comment | `// comment` | `# comment` |
| Multi-line comment | `/* comment */` | `""" comment """` |

---

## 🐛 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `IndentationError` | Mixed tabs/spaces | Use consistent 4 spaces |
| `NameError: name 'x' is not defined` | Variable used before assignment | Define variable first |
| `TypeError` | Operation on wrong type | Convert to correct type |
| `ValueError` | Invalid conversion | Validate input first |
| `SyntaxError: invalid syntax` | Missing colon `:` | Add colon after if/for/def |
| `ModuleNotFoundError` | Package not installed | Run `pip install package` |
| `FileNotFoundError` | File doesn't exist | Check file path |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Indentation defines blocks** | No curly braces, indentation matters |
| **No variable keywords** | Just assign: `x = 5` |
| **Dynamically typed** | Variables can change type |
| **Virtual environments** | Isolate project dependencies |
| **f-strings for formatting** | `f"Hello {name}"` |
| **input() returns string** | Convert to int/float as needed |
| **Python is strongly typed** | No implicit type coercion |

