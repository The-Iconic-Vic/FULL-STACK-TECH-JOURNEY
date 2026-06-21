# 📅 Day 84: Week 12 Review & Capstone

**Date:** June 21, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Week 12 Review, Practice Challenges, Capstone Project

---

## 📋 Learning Objectives

- ✅ Review all concepts from Days 78-83
- ✅ Complete 5 practice challenges without notes
- ✅ Build a complete contact management application
- ✅ Apply OOP, file handling, and error handling together
- ✅ Document and share the final project

---

## 🎯 Part 1: Week 12 Concepts Summary

### Day 78: Python Introduction

| Concept | Key Points |
|---------|-----------|
| **Dynamic Typing** | Variables can change type at runtime |
| **Indentation** | Defines code blocks (no curly braces) |
| **Data Types** | int, float, str, bool, None |
| **Virtual Environments** | `python -m venv venv` |

```python
# Quick reference
name = "Victor"      # str (no keywords needed)
age = 28             # int
price = 19.99        # float
is_active = True     # bool
```

### Day 79: Data Types & Structures

| Concept | Key Points |
|---------|-----------|
| **List** | Mutable, ordered `[1, 2, 3]` |
| **Tuple** | Immutable, ordered `(1, 2, 3)` |
| **Dictionary** | Key-value pairs `{"key": "value"}` |
| **Set** | Unique values `{1, 2, 3}` |
| **List Comprehension** | `[x**2 for x in range(10)]` |

```python
# Quick reference
fruits = ["apple", "banana"]    # List
fruits.append("orange")

user = {"name": "Alice", "age": 30}  # Dict
user["email"] = "alice@example.com"

evens = [x for x in range(20) if x % 2 == 0]  # List comp
```

### Day 80: Control Flow & Loops

| Concept | Key Points |
|---------|-----------|
| **if/elif/else** | Conditional execution |
| **for loop** | Iterate over sequences |
| **while loop** | Execute while condition True |
| **break/continue** | Loop control |
| **enumerate()** | Index + value |
| **zip()** | Parallel iteration |

```python
# Quick reference
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "F"

for i, item in enumerate(items):
    print(f"{i}: {item}")

for a, b in zip(list1, list2):
    print(a, b)
```

### Day 81: Functions & Scope

| Concept | Key Points |
|---------|-----------|
| **def** | Define functions |
| ***args** | Variable positional arguments |
| **kwargs** | Variable keyword arguments |
| **lambda** | Anonymous functions |
| **global** | Modify global variables |
| **nonlocal** | Modify enclosing scope |

```python
# Quick reference
def greet(name="World"):        # Default param
    return f"Hello, {name}!"

def sum_all(*args):             # *args
    return sum(args)

square = lambda x: x ** 2       # Lambda
```

### Day 82: Object-Oriented Programming

| Concept | Key Points |
|---------|-----------|
| **class** | Blueprint for objects |
| **__init__** | Constructor |
| **self** | Instance reference |
| **@classmethod** | Class-level methods |
| **@staticmethod** | Static methods |
| **@property** | Computed attributes |
| **Inheritance** | Child classes |
| **super()** | Call parent methods |

```python
# Quick reference
class Person:
    species = "Homo sapiens"  # Class attr
    
    def __init__(self, name):
        self.name = name      # Instance attr
    
    def greet(self):
        return f"Hello, {self.name}"
    
    @property
    def is_adult(self):
        return self.age >= 18

class Student(Person):
    def __init__(self, name, student_id):
        super().__init__(name)
        self.student_id = student_id
```

### Day 83: File Handling & Error Handling

| Concept | Key Points |
|---------|-----------|
| **open()** | Open files with modes |
| **with** | Auto-close context manager |
| **try/except** | Handle exceptions |
| **else** | Run if no exception |
| **finally** | Always run |
| **raise** | Raise exceptions |
| **json.dump/load** | JSON persistence |

```python
# Quick reference
with open('file.txt', 'r') as f:
    content = f.read()

try:
    num = int(input("Enter: "))
except ValueError:
    print("Invalid!")
else:
    print(f"Valid: {num}")
finally:
    print("Done")

import json
with open('data.json', 'w') as f:
    json.dump(data, f, indent=4)
```

---

## 📝 Part 2: Practice Challenges

### Challenge #1: First Non-Repeating Character

**Task:** Write a function that returns the first non-repeating character in a string.

```python
# Solution
def first_non_repeating(s):
    char_count = {}
    
    # Count occurrences
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Find first character with count 1
    for char in s:
        if char_count[char] == 1:
            return char
    
    return None

# Test
print(first_non_repeating("aabbccd"))  # d
print(first_non_repeating("aabbcc"))   # None
```

### Challenge #2: Even Numbers List Comprehension

**Task:** Create a list comprehension that filters even numbers from 1-50.

```python
# Solution
evens = [x for x in range(1, 51) if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10, ... 50]

# Bonus: Even numbers divisible by 3
even_divisible_by_3 = [x for x in range(1, 51) if x % 2 == 0 and x % 3 == 0]
print(even_divisible_by_3)  # [6, 12, 18, 24, 30, 36, 42, 48]
```

### Challenge #3: Rectangle Class

**Task:** Write a class `Rectangle` with area and perimeter methods.

```python
# Solution
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    def __str__(self):
        return f"Rectangle({self.width} x {self.height})"
    
    @property
    def is_square(self):
        return self.width == self.height

# Test
rect = Rectangle(5, 3)
print(rect.area())        # 15
print(rect.perimeter())   # 16
print(rect.is_square)     # False
```

### Challenge #4: CSV Average Calculation

**Task:** Read a CSV file and calculate the average of a column.

```python
# Solution
def calculate_column_average(filename, column_index):
    """
    Read CSV file and calculate average of specified column.
    Assumes first row is header.
    """
    total = 0
    count = 0
    
    try:
        with open(filename, 'r') as file:
            lines = file.readlines()
            # Skip header row (first line)
            for line in lines[1:]:
                columns = line.strip().split(',')
                if len(columns) > column_index:
                    try:
                        value = float(columns[column_index].strip())
                        total += value
                        count += 1
                    except ValueError:
                        print(f"Skipping invalid value: {columns[column_index]}")
        
        if count == 0:
            return None
        
        return total / count
    except FileNotFoundError:
        print(f"File not found: {filename}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

# Test with sample data
# Create a sample CSV first
sample_data = """Name,Age,Score
Alice,25,85.5
Bob,30,92.0
Charlie,22,78.5
Diana,28,95.0
"""
with open('sample.csv', 'w') as f:
    f.write(sample_data)

avg = calculate_column_average('sample.csv', 2)
print(f"Average score: {avg}")  # Average score: 87.75
```

### Challenge #5: Safe Integer Parsing

**Task:** Use try/except to safely parse user input as integer.

```python
# Solution
def safe_parse_int(prompt, retries=3):
    """Safely parse user input as integer with retries."""
    for attempt in range(retries):
        try:
            user_input = input(prompt)
            value = int(user_input)
            print(f"Successfully parsed: {value}")
            return value
        except ValueError:
            remaining = retries - attempt - 1
            if remaining > 0:
                print(f"Invalid input. {remaining} attempts remaining.")
            else:
                print("No attempts remaining. Returning None.")
                return None

# Test
age = safe_parse_int("Enter your age: ", 3)
if age is not None:
    print(f"Age: {age}")
```

---

## 🏗️ Part 3: Week 12 Capstone Project

### Contact Management System

**Requirements:**
- Contact model with name, phone, email, address
- CRUD operations: Add, view, update, delete
- Search by name or phone
- JSON file persistence
- Error handling for duplicates and invalid input
- User-friendly terminal interface

### Capstone Project Structure

```python
# contact_manager.py
"""
Contact Management System
Week 12 Capstone Project
"""

import json
import os
from datetime import datetime

class Contact:
    """Contact model class"""
    def __init__(self, name, phone, email="", address=""):
        self.name = name
        self.phone = phone
        self.email = email
        self.address = address
        self.created_at = datetime.now().isoformat()
        self.updated_at = None
    
    def to_dict(self):
        """Convert contact to dictionary for JSON storage"""
        return {
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create contact from dictionary"""
        contact = cls(data["name"], data["phone"], data["email"], data["address"])
        contact.created_at = data.get("created_at", datetime.now().isoformat())
        contact.updated_at = data.get("updated_at")
        return contact
    
    def update(self, name=None, phone=None, email=None, address=None):
        """Update contact fields"""
        if name:
            self.name = name
        if phone:
            self.phone = phone
        if email is not None:
            self.email = email
        if address is not None:
            self.address = address
        self.updated_at = datetime.now().isoformat()
    
    def __str__(self):
        """String representation for display"""
        return f"Name: {self.name}\nPhone: {self.phone}\nEmail: {self.email or 'N/A'}\nAddress: {self.address or 'N/A'}"

class ContactManager:
    """Contact management system"""
    
    def __init__(self, filename="contacts.json"):
        self.filename = filename
        self.contacts = []
        self.load()
    
    def load(self):
        """Load contacts from JSON file"""
        try:
            with open(self.filename, 'r') as file:
                data = json.load(file)
                self.contacts = [Contact.from_dict(item) for item in data]
            print(f"✅ Loaded {len(self.contacts)} contacts from {self.filename}")
        except FileNotFoundError:
            print(f"📝 No existing file found. Starting with empty contact list.")
            self.contacts = []
        except json.JSONDecodeError:
            print(f"❌ Invalid JSON format. Starting with empty contact list.")
            self.contacts = []
        except Exception as e:
            print(f"❌ Error loading contacts: {e}")
            self.contacts = []
    
    def save(self):
        """Save contacts to JSON file"""
        try:
            data = [contact.to_dict() for contact in self.contacts]
            with open(self.filename, 'w') as file:
                json.dump(data, file, indent=4)
            print(f"💾 Saved {len(self.contacts)} contacts to {self.filename}")
        except Exception as e:
            print(f"❌ Error saving contacts: {e}")
    
    def add(self, contact):
        """Add a new contact"""
        # Check for duplicate name
        if self.find_by_name(contact.name):
            print(f"❌ Contact with name '{contact.name}' already exists!")
            return False
        
        self.contacts.append(contact)
        self.save()
        print(f"✅ Contact '{contact.name}' added successfully!")
        return True
    
    def find_by_name(self, name):
        """Find contact by name (case-insensitive)"""
        for contact in self.contacts:
            if contact.name.lower() == name.lower():
                return contact
        return None
    
    def search(self, query):
        """Search contacts by name or phone"""
        query = query.lower()
        results = []
        for contact in self.contacts:
            if query in contact.name.lower() or query in contact.phone:
                results.append(contact)
        return results
    
    def view_all(self):
        """Display all contacts"""
        if not self.contacts:
            print("📝 No contacts found!")
            return
        
        print("\n" + "=" * 60)
        print(f"📋 CONTACTS ({len(self.contacts)})")
        print("=" * 60)
        for i, contact in enumerate(self.contacts, 1):
            print(f"{i}. {contact.name} - {contact.phone}")
        print("=" * 60)
    
    def view_contact(self, name):
        """View full details of a contact"""
        contact = self.find_by_name(name)
        if not contact:
            print(f"❌ Contact '{name}' not found!")
            return
        
        print("\n" + "=" * 60)
        print(f"📋 CONTACT DETAILS")
        print("=" * 60)
        print(contact)
        print("-" * 60)
        print(f"Created: {contact.created_at}")
        if contact.updated_at:
            print(f"Updated: {contact.updated_at}")
        print("=" * 60)
    
    def update(self, name, new_name=None, phone=None, email=None, address=None):
        """Update a contact"""
        contact = self.find_by_name(name)
        if not contact:
            print(f"❌ Contact '{name}' not found!")
            return False
        
        # Check for duplicate name if changing
        if new_name and new_name != name:
            if self.find_by_name(new_name):
                print(f"❌ Contact with name '{new_name}' already exists!")
                return False
        
        contact.update(new_name, phone, email, address)
        self.save()
        print(f"✅ Contact '{name}' updated successfully!")
        return True
    
    def delete(self, name):
        """Delete a contact"""
        contact = self.find_by_name(name)
        if not contact:
            print(f"❌ Contact '{name}' not found!")
            return False
        
        self.contacts.remove(contact)
        self.save()
        print(f"🗑️ Contact '{name}' deleted successfully!")
        return True
    
    def view_summary(self):
        """Display summary statistics"""
        total = len(self.contacts)
        if total == 0:
            print("📝 No contacts to summarize.")
            return
        
        with_email = sum(1 for c in self.contacts if c.email)
        with_address = sum(1 for c in self.contacts if c.address)
        
        print("\n" + "=" * 60)
        print("📊 CONTACT SUMMARY")
        print("=" * 60)
        print(f"Total contacts: {total}")
        print(f"Contacts with email: {with_email}")
        print(f"Contacts with address: {with_address}")
        print(f"Contacts without phone: {sum(1 for c in self.contacts if not c.phone)}")
        print("=" * 60)

def main():
    """Main application loop"""
    manager = ContactManager()
    
    print("\n" + "=" * 60)
    print("📱 CONTACT MANAGEMENT SYSTEM")
    print("=" * 60)
    
    while True:
        print("\n📖 COMMANDS")
        print("-" * 40)
        print("  add           - Add a new contact")
        print("  list          - List all contacts")
        print("  view <name>   - View contact details")
        print("  search <term> - Search contacts")
        print("  update <name> - Update a contact")
        print("  delete <name> - Delete a contact")
        print("  summary       - Show contact statistics")
        print("  help          - Show this menu")
        print("  exit          - Exit application")
        print("-" * 40)
        
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
                continue
            
            elif action == 'add':
                print("\n➕ ADD NEW CONTACT")
                print("-" * 30)
                name = input("Name: ").strip()
                if not name:
                    print("❌ Name is required!")
                    continue
                
                phone = input("Phone: ").strip()
                if not phone:
                    print("❌ Phone is required!")
                    continue
                
                email = input("Email (optional): ").strip()
                address = input("Address (optional): ").strip()
                
                contact = Contact(name, phone, email, address)
                manager.add(contact)
            
            elif action == 'list':
                manager.view_all()
            
            elif action == 'view':
                if not arg:
                    print("❌ Please provide a name: view <name>")
                    continue
                manager.view_contact(arg)
            
            elif action == 'search':
                if not arg:
                    print("❌ Please provide a search term: search <term>")
                    continue
                results = manager.search(arg)
                if results:
                    print(f"\n🔍 Found {len(results)} matching contacts:")
                    for contact in results:
                        print(f"  • {contact.name} - {contact.phone}")
                else:
                    print(f"🔍 No contacts found matching '{arg}'")
            
            elif action == 'update':
                if not arg:
                    print("❌ Please provide a name: update <name>")
                    continue
                
                contact = manager.find_by_name(arg)
                if not contact:
                    print(f"❌ Contact '{arg}' not found!")
                    continue
                
                print(f"\n✏️ UPDATING CONTACT: {arg}")
                print("-" * 30)
                print("Leave blank to keep current value")
                
                new_name = input(f"Name ({contact.name}): ").strip()
                phone = input(f"Phone ({contact.phone}): ").strip()
                email = input(f"Email ({contact.email or 'N/A'}): ").strip()
                address = input(f"Address ({contact.address or 'N/A'}): ").strip()
                
                manager.update(arg, new_name or None, phone or None, email or None, address or None)
            
            elif action == 'delete':
                if not arg:
                    print("❌ Please provide a name: delete <name>")
                    continue
                
                confirm = input(f"⚠️ Delete contact '{arg}'? (y/n): ").lower()
                if confirm == 'y':
                    manager.delete(arg)
                else:
                    print("❌ Deletion cancelled.")
            
            elif action == 'summary':
                manager.view_summary()
            
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

---

## 📊 Quick Reference

### Week 12 Summary Table

| Day | Concept | Key Syntax |
|-----|---------|------------|
| 78 | Python Intro | `x = 5`, `if x > 0:` |
| 79 | Data Structures | `[1, 2]`, `(1, 2)`, `{"a": 1}` |
| 80 | Loops | `for i in range(5):`, `while x < 10:` |
| 81 | Functions | `def name():`, `lambda x: x*2` |
| 82 | OOP | `class Name:`, `def __init__(self):` |
| 83 | File/Error | `with open():`, `try/except` |

### Python vs JavaScript Quick Reference

| Concept | JavaScript | Python |
|---------|------------|--------|
| Variable | `let x = 5` | `x = 5` |
| Console | `console.log()` | `print()` |
| If | `if (x > 0) {}` | `if x > 0:` |
| For | `for (let i=0; i<5; i++)` | `for i in range(5):` |
| Function | `function name() {}` | `def name():` |
| Class | `class Name {}` | `class Name:` |
| Object | `{ key: value }` | `{"key": "value"}` |
| Try | `try { } catch(e) { }` | `try: except: ` |

---

## ✅ Day 84 Checklist

- [ ] Review all Week 12 concepts (Days 78-83)
- [ ] Complete Challenge #1 (non-repeating character)
- [ ] Complete Challenge #2 (even numbers comprehension)
- [ ] Complete Challenge #3 (Rectangle class)
- [ ] Complete Challenge #4 (CSV average)
- [ ] Complete Challenge #5 (safe integer parsing)
- [ ] Build complete Contact Management System
- [ ] Test all functionality (add, view, update, delete, search)
- [ ] Document the project
- [ ] Push code to GitHub

