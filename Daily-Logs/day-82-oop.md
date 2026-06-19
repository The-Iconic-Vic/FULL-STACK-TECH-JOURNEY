# 📅 Day 82: Object-Oriented Programming

**Date:** June 19, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Classes, Objects, __init__, self, Instance/Class Attributes, Methods, @property, Inheritance, super()

---

## 📋 Learning Objectives

- ✅ Define classes with the `class` keyword
- ✅ Use `__init__` constructor to initialize objects
- ✅ Understand the `self` parameter (like `this` in JavaScript)
- ✅ Differentiate between instance and class attributes
- ✅ Create instance methods, class methods, and static methods
- ✅ Use `@property` decorator for computed attributes
- ✅ Implement `__str__` and `__repr__` for string representation
- ✅ Use inheritance with parent/child classes
- ✅ Use `super()` to call parent methods
- ✅ Override methods in child classes

---

## 🎯 Part 1: Classes & Objects

### Defining a Class

```python
# Basic class definition
class Person:
    pass  # Empty class (placeholder)

# Create an instance (object)
person = Person()
print(type(person))  # <class '__main__.Person'>
```

### The __init__ Constructor

```python
class Person:
    def __init__(self, name, age):
        """Constructor - called when object is created"""
        self.name = name      # Instance attribute
        self.age = age        # Instance attribute

# Create instances
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

print(person1.name)  # Alice
print(person2.age)   # 25
```

### The self Parameter

`self` refers to the current instance (like `this` in JavaScript).

```python
class Dog:
    def __init__(self, name):
        self.name = name
    
    def bark(self):
        # self refers to the specific dog instance
        return f"{self.name} says: Woof!"

dog1 = Dog("Rex")
dog2 = Dog("Buddy")

print(dog1.bark())  # Rex says: Woof!
print(dog2.bark())  # Buddy says: Woof!
```

### Instance vs Class Attributes

```python
class Car:
    # Class attribute (shared by all instances)
    wheels = 4
    vehicle_type = "car"
    
    def __init__(self, brand, model):
        # Instance attributes (unique to each instance)
        self.brand = brand
        self.model = model

# Access class attribute
print(Car.wheels)  # 4

# Access instance attributes
car1 = Car("Toyota", "Camry")
car2 = Car("Honda", "Civic")

print(car1.brand)   # Toyota
print(car2.brand)   # Honda

# Class attribute accessed via instance
print(car1.wheels)  # 4
print(car2.wheels)  # 4

# Modify class attribute (affects all instances)
Car.wheels = 6
print(car1.wheels)  # 6
print(car2.wheels)  # 6

# Modify instance attribute (only affects that instance)
car1.wheels = 8
print(car1.wheels)  # 8
print(car2.wheels)  # 6
```

---

## 🔧 Part 2: Methods & Properties

### Instance Methods

```python
class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades
    
    def average(self):
        """Calculate average grade"""
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)
    
    def add_grade(self, grade):
        """Add a new grade"""
        self.grades.append(grade)
    
    def get_info(self):
        """Get student information"""
        return f"{self.name}: Average = {self.average():.2f}"

student = Student("Alice", [85, 90, 78])
print(student.average())      # 84.33333333333333
student.add_grade(95)
print(student.average())      # 87.0
print(student.get_info())     # Alice: Average = 87.00
```

### @classmethod and @staticmethod

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        """Static method - no self parameter needed"""
        return a + b
    
    @staticmethod
    def multiply(a, b):
        return a * b
    
    @classmethod
    def create_from_string(cls, data):
        """Class method - receives class as first parameter"""
        # Creates instance using class method
        return cls(data)

class Person:
    count = 0
    
    def __init__(self, name):
        self.name = name
        Person.count += 1
    
    @classmethod
    def get_count(cls):
        """Class method accessing class attribute"""
        return cls.count
    
    @classmethod
    def create_anonymous(cls):
        """Factory method creating instance with default name"""
        return cls("Anonymous")

# Using static methods (no instance needed)
print(MathUtils.add(5, 3))      # 8
print(MathUtils.multiply(4, 5)) # 20

# Using class methods
print(Person.get_count())       # 0
p1 = Person("Alice")
p2 = Person("Bob")
print(Person.get_count())       # 2

# Factory method
anon = Person.create_anonymous()
print(anon.name)                # Anonymous
```

### @property Decorator

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Get temperature in Celsius"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Set temperature in Celsius"""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit (computed property)"""
        return (self._celsius * 9/5) + 32
    
    @property
    def kelvin(self):
        """Get temperature in Kelvin (computed property)"""
        return self._celsius + 273.15

temp = Temperature(25)
print(temp.celsius)      # 25 (getter)
print(temp.fahrenheit)   # 77.0 (computed)
print(temp.kelvin)       # 298.15 (computed)

temp.celsius = 30        # (setter)
print(temp.fahrenheit)   # 86.0

# temp.celsius = -300    # ValueError: Temperature below absolute zero!
```

### __str__ and __repr__

```python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    
    def __str__(self):
        """User-friendly string representation"""
        return f"{self.name} - ${self.price:.2f} ({self.stock} in stock)"
    
    def __repr__(self):
        """Developer-friendly string representation"""
        return f"Product('{self.name}', {self.price}, {self.stock})"

product = Product("Laptop", 999.99, 5)

# __str__ is called by print() and str()
print(product)           # Laptop - $999.99 (5 in stock)

# __repr__ is called by repr() and in the REPL
print(repr(product))     # Product('Laptop', 999.99, 5)

# __repr__ should be unambiguous and reconstructable
# eval(repr(product)) would create the same object
```

---

## 👪 Part 3: Inheritance

### Basic Inheritance

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"
    
    def move(self):
        return "Moving..."

class Dog(Animal):
    def speak(self):
        return "Woof!"
    
    def wag_tail(self):
        return "Wagging tail"

class Cat(Animal):
    def speak(self):
        return "Meow!"
    
    def purr(self):
        return "Purring..."

dog = Dog("Rex")
cat = Cat("Whiskers")

print(dog.name)         # Rex (inherited)
print(dog.speak())      # Woof! (overridden)
print(dog.move())       # Moving... (inherited)
print(dog.wag_tail())   # Wagging tail (own method)

print(cat.name)         # Whiskers
print(cat.speak())      # Meow!
print(cat.purr())       # Purring...
```

### super() - Calling Parent Methods

```python
class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year
        self.speed = 0
    
    def start(self):
        return f"{self.brand} engine started"
    
    def accelerate(self, amount):
        self.speed += amount
        return f"Speed: {self.speed} km/h"
    
    def stop(self):
        self.speed = 0
        return "Vehicle stopped"

class Car(Vehicle):
    def __init__(self, brand, year, doors):
        # Call parent constructor
        super().__init__(brand, year)
        self.doors = doors
    
    def start(self):
        # Extend parent method
        parent_start = super().start()
        return f"{parent_start} - Car ready to drive"
    
    def honk(self):
        return "Beep beep!"

class Motorcycle(Vehicle):
    def __init__(self, brand, year, has_sidecar):
        super().__init__(brand, year)
        self.has_sidecar = has_sidecar
    
    def wheelie(self):
        return "Doing a wheelie!"

# Usage
car = Car("Toyota", 2024, 4)
print(car.start())      # Toyota engine started - Car ready to drive
print(car.accelerate(50))  # Speed: 50 km/h (inherited)
print(car.honk())       # Beep beep!
print(f"Car has {car.doors} doors")  # Car has 4 doors

bike = Motorcycle("Harley", 2023, False)
print(bike.start())     # Harley engine started
print(bike.wheelie())   # Doing a wheelie!
```

### Multiple Inheritance

```python
class Flyable:
    def fly(self):
        return "Flying..."
    
    def land(self):
        return "Landing..."

class Swimmable:
    def swim(self):
        return "Swimming..."
    
    def dive(self):
        return "Diving..."

class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Quack!"

class Penguin(Swimmable):
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Squawk!"

# Method Resolution Order (MRO)
duck = Duck("Donald")
print(duck.fly())    # Flying... (from Flyable)
print(duck.swim())   # Swimming... (from Swimmable)
print(duck.speak())  # Quack! (own method)

print(Duck.__mro__)  # Shows method resolution order
# (<class '__main__.Duck'>, <class '__main__.Flyable'>, 
#  <class '__main__.Swimmable'>, <class 'object'>)

penguin = Penguin("Pingu")
print(penguin.swim())   # Swimming...
print(penguin.speak())  # Squawk!
```

---

## 🏗️ Part 4: Mini-Project - Bank Account System

```python
# bank_account.py
"""
Bank Account System
Demonstrates: classes, inheritance, properties, methods
"""

import random
from abc import ABC, abstractmethod

class BankAccount(ABC):
    """Abstract base class for all bank accounts"""
    
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self.account_number = self._generate_account_number()
        self._balance = initial_balance
        self.transactions = []
        
        if initial_balance > 0:
            self.transactions.append(f"Initial deposit: ${initial_balance:.2f}")
    
    @staticmethod
    def _generate_account_number():
        """Generate a random 10-digit account number"""
        return ''.join(str(random.randint(0, 9)) for _ in range(10))
    
    @property
    def balance(self):
        """Get current balance (read-only property)"""
        return self._balance
    
    def deposit(self, amount):
        """Deposit money into account"""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        
        self._balance += amount
        self.transactions.append(f"Deposit: ${amount:.2f}")
        return f"Deposited ${amount:.2f}. New balance: ${self._balance:.2f}"
    
    def withdraw(self, amount):
        """Withdraw money from account"""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        
        if amount > self._balance:
            raise ValueError(f"Insufficient funds. Balance: ${self._balance:.2f}")
        
        self._balance -= amount
        self.transactions.append(f"Withdrawal: ${amount:.2f}")
        return f"Withdrew ${amount:.2f}. New balance: ${self._balance:.2f}"
    
    @abstractmethod
    def get_account_type(self):
        """Abstract method - must be implemented by subclasses"""
        pass
    
    def get_transaction_history(self):
        """Get all transactions"""
        return self.transactions
    
    def __str__(self):
        return f"{self.get_account_type()} - {self.account_holder} - ${self._balance:.2f}"
    
    def __repr__(self):
        return f"{self.__class__.__name__}('{self.account_holder}', {self._balance})"

class SavingsAccount(BankAccount):
    def __init__(self, account_holder, initial_balance=0, interest_rate=0.04):
        super().__init__(account_holder, initial_balance)
        self.interest_rate = interest_rate
    
    def get_account_type(self):
        return "Savings Account"
    
    def add_interest(self):
        """Add interest to balance"""
        interest = self._balance * self.interest_rate
        self._balance += interest
        self.transactions.append(f"Interest earned: ${interest:.2f}")
        return f"Interest of ${interest:.2f} added. Balance: ${self._balance:.2f}"
    
    def withdraw(self, amount):
        """Savings account withdrawal (limited to 5 per month)"""
        monthly_withdrawals = len([t for t in self.transactions 
                                   if t.startswith("Withdrawal:") 
                                   and self.transactions.index(t) > len(self.transactions) - 30])
        
        if monthly_withdrawals >= 5:
            raise ValueError("Monthly withdrawal limit reached (5)")
        
        return super().withdraw(amount)

class CheckingAccount(BankAccount):
    def __init__(self, account_holder, initial_balance=0, overdraft_limit=100):
        super().__init__(account_holder, initial_balance)
        self.overdraft_limit = overdraft_limit
    
    def get_account_type(self):
        return "Checking Account"
    
    def withdraw(self, amount):
        """Checking account with overdraft protection"""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        
        max_withdrawal = self._balance + self.overdraft_limit
        if amount > max_withdrawal:
            raise ValueError(f"Exceeds overdraft limit. Available: ${max_withdrawal:.2f}")
        
        self._balance -= amount
        self.transactions.append(f"Withdrawal: ${amount:.2f}")
        
        if self._balance < 0:
            return f"Withdrew ${amount:.2f}. Overdraft: ${abs(self._balance):.2f}"
        return f"Withdrew ${amount:.2f}. New balance: ${self._balance:.2f}"

class BusinessAccount(BankAccount):
    def __init__(self, account_holder, initial_balance=0, transaction_fee=0.50):
        super().__init__(account_holder, initial_balance)
        self.transaction_fee = transaction_fee
    
    def get_account_type(self):
        return "Business Account"
    
    def withdraw(self, amount):
        """Business account with transaction fee"""
        total_amount = amount + self.transaction_fee
        if total_amount > self._balance:
            raise ValueError(f"Insufficient funds including fee: ${self._balance:.2f}")
        
        self._balance -= total_amount
        self.transactions.append(f"Withdrawal: ${amount:.2f} + Fee: ${self.transaction_fee:.2f}")
        return f"Withdrew ${amount:.2f} (fee ${self.transaction_fee:.2f}). Balance: ${self._balance:.2f}"
    
    def deposit(self, amount):
        """Business account deposit with transaction fee on large amounts"""
        if amount > 10000:
            fee = amount * 0.001
            amount -= fee
            self.transactions.append(f"Processing fee: ${fee:.2f}")
        
        return super().deposit(amount)

# Example usage
def main():
    # Create accounts
    savings = SavingsAccount("Alice", 1000, 0.05)
    checking = CheckingAccount("Bob", 500, 200)
    business = BusinessAccount("Charlie", 5000)
    
    print("=" * 50)
    print("BANK ACCOUNT DEMO")
    print("=" * 50)
    
    # Savings account
    print("\n📊 SAVINGS ACCOUNT")
    print(f"Account: {savings.account_number}")
    print(savings.deposit(500))
    print(savings.withdraw(200))
    print(savings.add_interest())
    
    # Checking account
    print("\n📊 CHECKING ACCOUNT")
    print(f"Account: {checking.account_number}")
    print(checking.deposit(300))
    print(checking.withdraw(800))  # Uses overdraft
    
    # Business account
    print("\n📊 BUSINESS ACCOUNT")
    print(f"Account: {business.account_number}")
    print(business.deposit(15000))  # Large deposit with fee
    print(business.withdraw(1000))
    
    # Transactions
    print("\n📝 TRANSACTION HISTORY")
    for account in [savings, checking, business]:
        print(f"\n{account.get_account_type()} - {account.account_holder}:")
        for transaction in account.get_transaction_history():
            print(f"  • {transaction}")
    
    print("\n" + "=" * 50)

if __name__ == "__main__":
    main()
```

### Sample Output

```
==================================================
BANK ACCOUNT DEMO
==================================================

📊 SAVINGS ACCOUNT
Account: 4829156730
Deposited $500.00. New balance: $1500.00
Withdrew $200.00. New balance: $1300.00
Interest of $65.00 added. Balance: $1365.00

📊 CHECKING ACCOUNT
Account: 7391054826
Deposited $300.00. New balance: $800.00
Withdrew $800.00. Overdraft: $0.00

📊 BUSINESS ACCOUNT
Account: 2958376140
Deposited $14985.00. New balance: $19985.00
Withdrew $1000.00 (fee $0.50). Balance: $18984.50

📝 TRANSACTION HISTORY

Savings Account - Alice:
  • Initial deposit: $1000.00
  • Deposit: $500.00
  • Withdrawal: $200.00
  • Interest earned: $65.00

Checking Account - Bob:
  • Initial deposit: $500.00
  • Deposit: $300.00
  • Withdrawal: $800.00

Business Account - Charlie:
  • Initial deposit: $5000.00
  • Processing fee: $15.00
  • Deposit: $14985.00
  • Withdrawal: $1000.00 + Fee: $0.50
```

---

## 📊 Quick Reference

### Class Syntax

| Concept | Syntax | Example |
|---------|--------|---------|
| Class | `class Name:` | `class Person:` |
| Constructor | `def __init__(self):` | `def __init__(self, name):` |
| Instance attr | `self.attr` | `self.name = name` |
| Class attr | `Class.attr` | `Person.species = "Human"` |
| Instance method | `def method(self):` | `def greet(self):` |
| Class method | `@classmethod` | `@classmethod def from_json(cls):` |
| Static method | `@staticmethod` | `@staticmethod def validate():` |
| Property | `@property` | `@property def age(self):` |
| String repr | `__str__`/`__repr__` | `def __str__(self):` |

### Inheritance Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `class Child(Parent):` | Inherit from parent | `class Student(Person):` |
| `super()` | Call parent method | `super().__init__(name)` |
| `@abstractmethod` | Abstract method | `@abstractmethod def area(self):` |
| `__mro__` | Method Resolution Order | `print(Class.__mro__)` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `TypeError: __init__() missing 1 required positional argument` | Missing required parameter | Provide all required arguments |
| `AttributeError: 'Class' object has no attribute 'attr'` | Attribute not defined | Define attribute in __init__ |
| `TypeError: method() missing 1 required positional argument: 'self'` | Calling method without instance | Call on instance, not class |
| `RecursionError` | Infinite recursion in method | Check method calls |
| `NameError: name 'Class' is not defined` | Class not imported or defined | Import or define class |

---

## ✅ Day 82 Checklist

- [ ] Define classes with `class` keyword
- [ ] Use `__init__` constructor
- [ ] Understand `self` parameter
- [ ] Differentiate instance vs class attributes
- [ ] Create instance methods
- [ ] Use `@classmethod` and `@staticmethod`
- [ ] Use `@property` for computed attributes
- [ ] Implement `__str__` and `__repr__`
- [ ] Create inheritance with parent/child classes
- [ ] Use `super()` to call parent methods
- [ ] Override methods in child classes
- [ ] Complete bank account mini-project
- [ ] Push code to GitHub

