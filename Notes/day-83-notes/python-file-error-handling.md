# 📘 Python File Handling & Error Handling

## 🎯 Overview

File handling and error handling are essential skills for building robust applications. Python provides simple yet powerful tools for working with files and gracefully handling errors.

---

## 📁 Part 1: File I/O

### Opening Files

The `open()` function is used to open files. It returns a file object that can be used for reading or writing.

```python
# Basic usage (manual close)
file = open('data.txt', 'r')
content = file.read()
file.close()

# Using 'with' statement (auto-close)
with open('data.txt', 'r') as file:
    content = file.read()
# File is automatically closed here
```

### File Modes

| Mode | Description | File Must Exist | Creates File |
|------|-------------|-----------------|--------------|
| `'r'` | Read (default) | Yes | No |
| `'w'` | Write (overwrites) | No | Yes |
| `'a'` | Append | No | Yes |
| `'r+'` | Read and Write | Yes | No |
| `'x'` | Exclusive creation | No | Yes (fails if exists) |
| `'t'` | Text mode (default) | - | - |
| `'b'` | Binary mode | - | - |

### Reading Files

```python
# Read entire file as string
with open('data.txt', 'r') as file:
    content = file.read()

# Read specific number of characters
with open('data.txt', 'r') as file:
    first_10 = file.read(10)

# Read line by line
with open('data.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Read all lines into list
with open('data.txt', 'r') as file:
    lines = file.readlines()

# Read one line at a time
with open('data.txt', 'r') as file:
    line = file.readline()
    while line:
        print(line.strip())
        line = file.readline()
```

### Writing Files

```python
# Write to file (overwrites)
with open('output.txt', 'w') as file:
    file.write("Hello World!\n")
    file.write("Line 2\n")

# Write multiple lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open('output.txt', 'w') as file:
    file.writelines(lines)

# Append to file
with open('output.txt', 'a') as file:
    file.write("This is appended\n")

# Writing with formatting
name = "Alice"
age = 30
with open('user.txt', 'w') as file:
    file.write(f"Name: {name}\n")
    file.write(f"Age: {age}\n")
```

### File Methods Summary

| Method | Purpose |
|--------|---------|
| `.read()` | Read entire file as string |
| `.readline()` | Read one line (including newline) |
| `.readlines()` | Read all lines into list |
| `.write(string)` | Write string to file |
| `.writelines(list)` | Write list of strings |
| `.close()` | Close file |
| `.seek(offset)` | Move to position in file |
| `.tell()` | Get current file position |

---

## 🔧 Part 2: Error Handling

### try/except Basics

The `try/except` block catches and handles exceptions (errors) that occur during execution.

```python
# Basic try/except
try:
    number = int(input("Enter a number: "))
    print(f"You entered: {number}")
except ValueError:
    print("That's not a valid number!")

# Catching specific exceptions
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Can't divide by zero!")
except Exception as e:
    print(f"Unexpected error: {e}")
```

### else and finally

```python
# else - runs if no exception
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Can't divide by zero!")
else:
    print(f"Result: {result}")  # Runs only on success
finally:
    print("Execution complete")  # Always runs

# finally for cleanup
try:
    file = open('data.txt', 'r')
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    file.close()  # Always closes even if error
```

### Raising Exceptions

```python
# Raising built-in exceptions
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero!")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(f"Error: {e}")

# Raising with custom message
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative!")
    if age > 150:
        raise ValueError("Age cannot be greater than 150!")
    return age

# Re-raising exceptions
try:
    age = validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")
    raise  # Re-raise the exception
```

### Common Exceptions

| Exception | Description | Common Cause |
|-----------|-------------|--------------|
| `ValueError` | Invalid value | Wrong type conversion |
| `TypeError` | Wrong type | Operation on wrong type |
| `FileNotFoundError` | File missing | File doesn't exist |
| `ZeroDivisionError` | Division by zero | Dividing by zero |
| `KeyError` | Key missing | Dictionary key not found |
| `IndexError` | Index out of range | List index out of bounds |
| `ImportError` | Module missing | Module not installed |
| `PermissionError` | No permission | Can't access file |

---

## 📦 Part 3: JSON Handling

### What is JSON?

JSON (JavaScript Object Notation) is a lightweight data format that is easy for humans to read and write, and easy for machines to parse and generate.

### JSON Methods

| Function | Purpose |
|----------|---------|
| `json.dump(obj, file)` | Write JSON to file |
| `json.load(file)` | Read JSON from file |
| `json.dumps(obj)` | Convert object to JSON string |
| `json.loads(string)` | Parse JSON string to object |

### json.dump() - Write JSON to File

```python
import json

data = {
    "name": "Alice",
    "age": 30,
    "city": "NYC",
    "skills": ["Python", "JavaScript"],
    "is_active": True
}

# Write to file with indentation
with open('data.json', 'w') as file:
    json.dump(data, file, indent=4)

# Without indentation (compact)
with open('data.json', 'w') as file:
    json.dump(data, file)
```

### json.load() - Read JSON from File

```python
import json

# Read from file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data['name'])      # Alice
print(data['skills'])    # ['Python', 'JavaScript']

# With error handling
try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError:
    print("Invalid JSON format!")
```

### json.dumps() - JSON to String

```python
import json

data = {"name": "Bob", "age": 25}

# Convert to JSON string
json_string = json.dumps(data)
print(json_string)  # {"name": "Bob", "age": 25}

# With formatting
json_string = json.dumps(data, indent=4)
print(json_string)
# {
#     "name": "Bob",
#     "age": 25
# }

# Sort keys
json_string = json.dumps(data, sort_keys=True, indent=4)
```

### json.loads() - String to JSON

```python
import json

# Parse JSON string
json_string = '{"name": "Charlie", "age": 35}'
data = json.loads(json_string)
print(data['name'])  # Charlie
print(data['age'])   # 35

# Handling invalid JSON
invalid_json = '{"name": "Charlie", age: 35}'  # Missing quotes
try:
    data = json.loads(invalid_json)
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

### JSON Serialization of Custom Objects

```python
import json
from datetime import datetime

class User:
    def __init__(self, name, age, created_at):
        self.name = name
        self.age = age
        self.created_at = created_at
    
    def to_dict(self):
        return {
            'name': self.name,
            'age': self.age,
            'created_at': self.created_at.isoformat()
        }

# Create user
user = User("Alice", 30, datetime.now())

# Serialize custom object
json_string = json.dumps(user.to_dict(), indent=4)
print(json_string)

# Deserialize
data = json.loads(json_string)
print(f"Name: {data['name']}")
print(f"Created: {data['created_at']}")
```

---

## 📊 Quick Reference

### File Modes Summary

| Mode | Read | Write | Create | Truncate |
|------|------|-------|--------|----------|
| `'r'` | ✅ | ❌ | ❌ | ❌ |
| `'w'` | ❌ | ✅ | ✅ | ✅ |
| `'a'` | ❌ | ✅ | ✅ | ❌ |
| `'r+'` | ✅ | ✅ | ❌ | ❌ |
| `'x'` | ❌ | ✅ | ✅ | ❌ |

### Error Handling Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `try` | Code that might raise exception | `try:` |
| `except` | Handle specific exception | `except ValueError:` |
| `else` | Run if no exception | `else:` |
| `finally` | Always run (cleanup) | `finally:` |
| `raise` | Manually raise exception | `raise ValueError("msg")` |

### JSON Methods

| Method | Input | Output | Example |
|--------|-------|--------|---------|
| `json.dump()` | Object, File | None | `json.dump(data, file)` |
| `json.load()` | File | Object | `data = json.load(file)` |
| `json.dumps()` | Object | String | `s = json.dumps(data)` |
| `json.loads()` | String | Object | `data = json.loads(s)` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `FileNotFoundError` | File doesn't exist | Check path or create file |
| `PermissionError` | No write permission | Check file permissions |
| `json.JSONDecodeError` | Invalid JSON format | Validate JSON syntax |
| `UnicodeDecodeError` | Encoding mismatch | Specify `encoding='utf-8'` |
| `ValueError` | Invalid conversion | Validate input before conversion |
| `TypeError` | Wrong type operation | Check variable types |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Use `with` for file operations** | Auto-closes files |
| **File modes control behavior** | `'r'`, `'w'`, `'a'`, `'r+'` |
| **try/except catches errors** | Prevents program crashes |
| **Catch specific exceptions** | Better error handling |
| **else runs on success** | Code that should run only if no error |
| **finally runs always** | Cleanup code |
| **raise to throw exceptions** | Create custom errors |
| **json.dump() for JSON files** | Write JSON to file |
| **json.load() for reading** | Read JSON from file |

