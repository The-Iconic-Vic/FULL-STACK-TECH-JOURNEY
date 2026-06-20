# 📅 Day 83: File Handling & Error Handling

**Date:** June 20, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** File I/O, Error Handling, JSON, try/except, with Statement

---

## 📋 Learning Objectives

- ✅ Read and write files using `open()` with different modes
- ✅ Use the `with` statement for automatic file closure
- ✅ Handle errors with `try/except` blocks
- ✅ Catch specific exceptions like `ValueError`, `FileNotFoundError`
- ✅ Use `else` and `finally` clauses
- ✅ Raise exceptions with `raise`
- ✅ Work with JSON data using `json.load()`, `json.dump()`, `json.loads()`, `json.dumps()`

---

## 🎯 Part 1: File I/O

### Opening Files with `open()`

```python
# Basic file open (manual close)
file = open('data.txt', 'r')  # 'r' = read mode
content = file.read()
file.close()  # Always close!

# Using 'with' statement (auto-closes)
with open('data.txt', 'r') as file:
    content = file.read()
# File is automatically closed here
```

### File Modes

| Mode | Description | Behavior |
|------|-------------|----------|
| `'r'` | Read (default) | File must exist |
| `'w'` | Write | Overwrites file, creates if doesn't exist |
| `'a'` | Append | Adds to end, creates if doesn't exist |
| `'r+'` | Read and Write | File must exist |
| `'x'` | Exclusive creation | Fails if file exists |

### Reading Files

```python
# Read entire file as string
with open('data.txt', 'r') as file:
    content = file.read()
    print(content)

# Read line by line
with open('data.txt', 'r') as file:
    for line in file:
        print(line.strip())  # strip() removes newline

# Read all lines into list
with open('data.txt', 'r') as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())

# Read specific number of characters
with open('data.txt', 'r') as file:
    first_10 = file.read(10)
    print(first_10)
```

### Writing Files

```python
# Write to file (overwrites)
with open('output.txt', 'w') as file:
    file.write("Hello World!\n")
    file.write("This is line 2\n")
    file.write("Line 3\n")

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

---

## 🔧 Part 2: Error Handling

### try/except Basics

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

| Exception | Description |
|-----------|-------------|
| `ValueError` | Invalid value type or format |
| `TypeError` | Wrong type operation |
| `FileNotFoundError` | File doesn't exist |
| `ZeroDivisionError` | Division by zero |
| `KeyError` | Key missing in dictionary |
| `IndexError` | Index out of range |
| `ImportError` | Module not found |
| `PermissionError` | No permission for operation |

---

## 📦 Part 3: JSON Handling

### What is JSON?

JSON (JavaScript Object Notation) is a lightweight data format commonly used for data exchange.

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

# Write to file
with open('data.json', 'w') as file:
    json.dump(data, file, indent=4)  # indent for readability

# With custom separators
with open('data.json', 'w') as file:
    json.dump(data, file, separators=(',', ':'), indent=2)
```

### json.load() - Read JSON from File

```python
import json

# Read from file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data['name'])      # Alice
print(data['skills'])    # ['Python', 'JavaScript']

# Reading with error handling
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
except json.JSONDecodeError:
    print("Invalid JSON format!")
```

### Working with JSON in Files

```python
# Complete example: Save and load user data
import json

def save_user(user_data, filename='user.json'):
    """Save user data to JSON file"""
    try:
        with open(filename, 'w') as file:
            json.dump(user_data, file, indent=4)
        print(f"User data saved to {filename}")
    except Exception as e:
        print(f"Error saving data: {e}")

def load_user(filename='user.json'):
    """Load user data from JSON file"""
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print("No user data found!")
        return None
    except json.JSONDecodeError:
        print("Invalid JSON format!")
        return None

# Usage
user = {
    "name": "Alice",
    "age": 30,
    "preferences": {
        "theme": "dark",
        "language": "en"
    }
}

save_user(user)
loaded = load_user()
if loaded:
    print(f"Loaded: {loaded['name']}")
    print(f"Preferences: {loaded['preferences']}")
```

---

## 🏗️ Part 4: Mini-Project - Todo CLI

```python
# todo_cli.py
"""
Todo CLI Application
Demonstrates: File I/O, JSON, Error Handling
"""

import json
import os
from datetime import datetime

class TodoCLI:
    def __init__(self, filename='todos.json'):
        self.filename = filename
        self.todos = []
        self.load_todos()
    
    def load_todos(self):
        """Load todos from JSON file"""
        try:
            with open(self.filename, 'r') as file:
                self.todos = json.load(file)
            print(f"✅ Loaded {len(self.todos)} todos")
        except FileNotFoundError:
            print("📝 No existing todo file. Starting fresh...")
            self.todos = []
        except json.JSONDecodeError:
            print("❌ Invalid JSON format. Starting fresh...")
            self.todos = []
    
    def save_todos(self):
        """Save todos to JSON file"""
        try:
            with open(self.filename, 'w') as file:
                json.dump(self.todos, file, indent=4)
            print("💾 Todos saved successfully")
        except Exception as e:
            print(f"❌ Error saving todos: {e}")
    
    def add_todo(self, text):
        """Add a new todo"""
        if not text.strip():
            print("❌ Todo text cannot be empty!")
            return
        
        todo = {
            'id': len(self.todos) + 1,
            'text': text.strip(),
            'completed': False,
            'created_at': datetime.now().isoformat(),
            'completed_at': None
        }
        self.todos.append(todo)
        self.save_todos()
        print(f"✅ Added: '{text}' (ID: {todo['id']})")
    
    def list_todos(self):
        """List all todos"""
        if not self.todos:
            print("📝 No todos found!")
            return
        
        print("\n📋 TODO LIST")
        print("-" * 50)
        for todo in self.todos:
            status = "✅" if todo['completed'] else "⬜"
            date = todo['created_at'][:10]
            print(f"{status} [{todo['id']}] {todo['text']} ({date})")
        print("-" * 50)
        print(f"Total: {len(self.todos)} | "
              f"Completed: {sum(1 for t in self.todos if t['completed'])} | "
              f"Pending: {sum(1 for t in self.todos if not t['completed'])}")
    
    def complete_todo(self, todo_id):
        """Mark a todo as completed"""
        for todo in self.todos:
            if todo['id'] == todo_id:
                if todo['completed']:
                    print(f"⚠️ Todo #{todo_id} is already completed!")
                    return
                
                todo['completed'] = True
                todo['completed_at'] = datetime.now().isoformat()
                self.save_todos()
                print(f"✅ Completed: '{todo['text']}'")
                return
        
        print(f"❌ Todo #{todo_id} not found!")
    
    def delete_todo(self, todo_id):
        """Delete a todo"""
        for i, todo in enumerate(self.todos):
            if todo['id'] == todo_id:
                deleted = self.todos.pop(i)
                self.save_todos()
                print(f"🗑️ Deleted: '{deleted['text']}'")
                return
        
        print(f"❌ Todo #{todo_id} not found!")
    
    def clear_completed(self):
        """Delete all completed todos"""
        completed = [t for t in self.todos if t['completed']]
        if not completed:
            print("📝 No completed todos to clear!")
            return
        
        confirm = input(f"Delete {len(completed)} completed todos? (y/n): ")
        if confirm.lower() == 'y':
            self.todos = [t for t in self.todos if not t['completed']]
            self.save_todos()
            print(f"🗑️ Cleared {len(completed)} completed todos")
    
    def search_todos(self, query):
        """Search todos by text"""
        results = [t for t in self.todos if query.lower() in t['text'].lower()]
        
        if not results:
            print(f"🔍 No todos found matching '{query}'")
            return
        
        print(f"\n🔍 Search Results: '{query}'")
        print("-" * 50)
        for todo in results:
            status = "✅" if todo['completed'] else "⬜"
            print(f"{status} [{todo['id']}] {todo['text']}")
        print("-" * 50)
        print(f"Found {len(results)} matching todos")
    
    def show_help(self):
        """Display help menu"""
        print("\n📖 COMMANDS")
        print("-" * 40)
        print("  add <text>     - Add a new todo")
        print("  list           - List all todos")
        print("  complete <id>  - Mark todo as completed")
        print("  delete <id>    - Delete a todo")
        print("  clear          - Clear completed todos")
        print("  search <text>  - Search todos")
        print("  help           - Show this help")
        print("  exit           - Exit application")
        print("-" * 40)

def main():
    """Main application loop"""
    app = TodoCLI()
    
    print("\n" + "=" * 50)
    print("📋 TODO CLI APPLICATION")
    print("=" * 50)
    app.show_help()
    
    while True:
        try:
            command = input("\n📝 > ").strip()
            
            if not command:
                continue
            
            parts = command.split(maxsplit=1)
            action = parts[0].lower()
            arg = parts[1] if len(parts) > 1 else None
            
            if action == 'exit':
                print("👋 Goodbye!")
                break
            elif action == 'help':
                app.show_help()
            elif action == 'add':
                if arg:
                    app.add_todo(arg)
                else:
                    print("❌ Please provide todo text: add <text>")
            elif action == 'list':
                app.list_todos()
            elif action == 'complete':
                if arg:
                    try:
                        todo_id = int(arg)
                        app.complete_todo(todo_id)
                    except ValueError:
                        print("❌ Please provide a valid ID")
                else:
                    print("❌ Please provide ID: complete <id>")
            elif action == 'delete':
                if arg:
                    try:
                        todo_id = int(arg)
                        app.delete_todo(todo_id)
                    except ValueError:
                        print("❌ Please provide a valid ID")
                else:
                    print("❌ Please provide ID: delete <id>")
            elif action == 'clear':
                app.clear_completed()
            elif action == 'search':
                if arg:
                    app.search_todos(arg)
                else:
                    print("❌ Please provide search text: search <text>")
            else:
                print(f"❌ Unknown command: '{action}'")
                print("Type 'help' for available commands")
                
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
```

### Sample Output

```
==================================================
📋 TODO CLI APPLICATION
==================================================

📖 COMMANDS
----------------------------------------
  add <text>     - Add a new todo
  list           - List all todos
  complete <id>  - Mark todo as completed
  delete <id>    - Delete a todo
  clear          - Clear completed todos
  search <text>  - Search todos
  help           - Show this help
  exit           - Exit application
----------------------------------------

📝 > add Learn Python
✅ Added: 'Learn Python' (ID: 1)

📝 > add Build a project
✅ Added: 'Build a project' (ID: 2)

📝 > add Write documentation
✅ Added: 'Write documentation' (ID: 3)

📝 > list

📋 TODO LIST
--------------------------------------------------
⬜ [1] Learn Python (2024-06-20)
⬜ [2] Build a project (2024-06-20)
⬜ [3] Write documentation (2024-06-20)
--------------------------------------------------
Total: 3 | Completed: 0 | Pending: 3

📝 > complete 2
✅ Completed: 'Build a project'

📝 > list

📋 TODO LIST
--------------------------------------------------
⬜ [1] Learn Python (2024-06-20)
✅ [2] Build a project (2024-06-20)
⬜ [3] Write documentation (2024-06-20)
--------------------------------------------------
Total: 3 | Completed: 1 | Pending: 2

📝 > delete 3
🗑️ Deleted: 'Write documentation'

📝 > list

📋 TODO LIST
--------------------------------------------------
⬜ [1] Learn Python (2024-06-20)
✅ [2] Build a project (2024-06-20)
--------------------------------------------------
Total: 2 | Completed: 1 | Pending: 1

📝 > exit
👋 Goodbye!
```

### Example todos.json File

```json
[
    {
        "id": 1,
        "text": "Learn Python",
        "completed": false,
        "created_at": "2024-06-20T10:30:00",
        "completed_at": null
    },
    {
        "id": 2,
        "text": "Build a project",
        "completed": true,
        "created_at": "2024-06-20T10:30:15",
        "completed_at": "2024-06-20T10:35:00"
    }
]
```

---

## 📊 Quick Reference

### File Modes

| Mode | Purpose | File Must Exist |
|------|---------|-----------------|
| `'r'` | Read | Yes |
| `'w'` | Write (overwrite) | No |
| `'a'` | Append | No |
| `'r+'` | Read and Write | Yes |
| `'x'` | Exclusive create | No (fails if exists) |

### File Methods

| Method | Purpose |
|--------|---------|
| `.read()` | Read entire file |
| `.readline()` | Read one line |
| `.readlines()` | Read all lines into list |
| `.write()` | Write string |
| `.writelines()` | Write list of strings |
| `.close()` | Close file |

### Error Handling Keywords

| Keyword | Purpose |
|---------|---------|
| `try` | Code that might raise exception |
| `except` | Handle specific exception |
| `else` | Run if no exception |
| `finally` | Always run (cleanup) |
| `raise` | Manually raise exception |

### JSON Functions

| Function | Purpose |
|----------|---------|
| `json.dump(obj, file)` | Write JSON to file |
| `json.load(file)` | Read JSON from file |
| `json.dumps(obj)` | Convert to JSON string |
| `json.loads(string)` | Parse JSON string |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `FileNotFoundError` | File doesn't exist | Check path or create file |
| `PermissionError` | No write permission | Check file permissions |
| `json.JSONDecodeError` | Invalid JSON format | Validate JSON syntax |
| `UnicodeDecodeError` | Encoding mismatch | Specify encoding: `open(file, 'r', encoding='utf-8')` |
| `ValueError` | Invalid conversion | Validate input before conversion |

---

## ✅ Day 83 Checklist

- [ ] Open files with `with` statement
- [ ] Read files with `.read()`, `.readlines()`
- [ ] Write files with `.write()`
- [ ] Use different file modes: `'r'`, `'w'`, `'a'`
- [ ] Handle errors with `try/except`
- [ ] Catch specific exceptions
- [ ] Use `else` and `finally` clauses
- [ ] Raise exceptions with `raise`
- [ ] Write JSON with `json.dump()`
- [ ] Read JSON with `json.load()`
- [ ] Convert strings with `json.dumps()` and `json.loads()`
- [ ] Complete todo CLI mini-project
- [ ] Push code to GitHub

