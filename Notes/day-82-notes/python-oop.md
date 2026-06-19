# 📘 Python Object-Oriented Programming

## 🎯 What is OOP?

Object-Oriented Programming (OOP) is a programming paradigm that organizes code around **objects** (data) rather than functions and logic. Python fully supports OOP with classes, inheritance, polymorphism, and encapsulation.

---

## 📝 Part 1: Classes & Objects

### Class Definition

A class is a blueprint for creating objects. It defines the properties (attributes) and behaviors (methods) that objects of that class will have.

```python
# Basic class definition
class Person:
    pass  # Empty class

# Create an instance (object)
person = Person()
print(type(person))  # <class '__main__.Person'>
```

### The __init__ Constructor

`__init__` is the constructor method called when an object is instantiated. It initializes the object's attributes.

```python
class Person:
    def __init__(self, name, age):
        """Constructor - initializes new Person objects"""
        self.name = name
        self.age = age

# Create instances
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

print(person1.name)  # Alice
print(person2.age)   # 25
```

### The self Parameter

`self` refers to the current instance (like `this` in JavaScript). It is always the first parameter of instance methods.

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

| Attribute Type | Definition | Access | Shared |
|----------------|-----------|---------|--------|
| **Instance** | Defined in `__init__` with `self` | Per instance | No |
| **Class** | Defined at class level | Shared across all instances | Yes |

```python
class Car:
    # Class attributes (shared by all instances)
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
print(car1.brand)  # Toyota

# Class attribute accessed via instance
print(car1.wheels)  # 4

# Modify class attribute (affects all instances)
Car.wheels = 6
print(car1.wheels)  # 6
```

---

## 🔧 Part 2: Methods & Properties

### Instance Methods

Instance methods operate on instance data and require `self` as the first parameter.

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

student = Student("Alice", [85, 90, 78])
print(student.average())      # 84.333...
student.add_grade(95)
print(student.average())      # 87.0
```

### @classmethod

Class methods receive the class as the first parameter (`cls`) and can access/modify class attributes.

```python
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

print(Person.get_count())  # 0
p1 = Person("Alice")
p2 = Person("Bob")
print(Person.get_count())  # 2

anon = Person.create_anonymous()
print(anon.name)  # Anonymous
```

### @staticmethod

Static methods do not receive `self` or `cls`. They are like regular functions but belong to the class namespace.

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def multiply(a, b):
        return a * b

# No instance needed - call directly on class
print(MathUtils.add(5, 3))      # 8
print(MathUtils.multiply(4, 5)) # 20
```

### @property Decorator

Properties allow you to define methods that are accessed like attributes, with getter/setter functionality.

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
        """Set temperature in Celsius with validation"""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        """Computed property - no setter"""
        return (self._celsius * 9/5) + 32

temp = Temperature(25)
print(temp.celsius)      # 25 (getter)
print(temp.fahrenheit)   # 77.0 (computed)

temp.celsius = 30        # (setter)
print(temp.fahrenheit)   # 86.0
```

### __str__ and __repr__

| Method | Purpose | Used By |
|--------|---------|---------|
| `__str__` | User-friendly string | `print()`, `str()` |
| `__repr__` | Developer-friendly, unambiguous | `repr()`, REPL |

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        """User-friendly - shown to users"""
        return f"{self.name} - ${self.price:.2f}"

    def __repr__(self):
        """Developer-friendly - should be unambiguous"""
        return f"Product('{self.name}', {self.price})"

product = Product("Laptop", 999.99)

print(product)           # Laptop - $999.99 (__str__)
print(repr(product))     # Product('Laptop', 999.99) (__repr__)
```

---

## 👪 Part 3: Inheritance

### Basic Inheritance

A child class inherits all attributes and methods from its parent class.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):  # Method overriding
        return "Woof!"

    def wag_tail(self):  # New method
        return "Wagging tail"

dog = Dog("Rex")
print(dog.name)        # Rex (inherited)
print(dog.speak())     # Woof! (overridden)
print(dog.wag_tail())  # Wagging tail (own method)
```

### super() - Calling Parent Methods

```python
class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

    def start(self):
        return f"{self.brand} engine started"

class Car(Vehicle):
    def __init__(self, brand, year, doors):
        super().__init__(brand, year)  # Call parent constructor
        self.doors = doors

    def start(self):
        # Extend parent method
        parent_start = super().start()
        return f"{parent_start} - Car ready"

car = Car("Toyota", 2024, 4)
print(car.start())     # Toyota engine started - Car ready
print(car.doors)       # 4
```

### Method Overriding

Child classes can override parent methods to provide specific implementations.

```python
class Bird:
    def fly(self):
        return "Flying..."

    def sound(self):
        return "Chirp"

class Penguin(Bird):
    def fly(self):
        return "I can't fly, but I can swim!"

    def sound(self):
        return "Squawk"

class Sparrow(Bird):
    def sound(self):
        return "Tweet"

penguin = Penguin()
sparrow = Sparrow()

print(penguin.fly())   # I can't fly, but I can swim!
print(penguin.sound()) # Squawk
print(sparrow.sound()) # Tweet
```

### Multiple Inheritance

A class can inherit from multiple parent classes. Method Resolution Order (MRO) determines which method is called.

```python
class Flyable:
    def move(self):
        return "Flying..."

class Swimmable:
    def move(self):
        return "Swimming..."

class Duck(Flyable, Swimmable):
    def move(self):
        # MRO: Duck → Flyable → Swimmable
        return "I can do both!"

duck = Duck()
print(duck.move())  # I can do both!

# Check MRO
print(Duck.__mro__)
# (<class '__main__.Duck'>, <class '__main__.Flyable'>, 
#  <class '__main__.Swimmable'>, <class 'object'>)
```

### Abstract Base Classes

Abstract classes define methods that must be implemented by subclasses.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Abstract method - must be implemented"""
        pass

    @abstractmethod
    def perimeter(self):
        """Abstract method - must be implemented"""
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(rect.area())      # 15
print(rect.perimeter()) # 16

# Cannot instantiate abstract class
# shape = Shape()  # TypeError: Can't instantiate abstract class Shape
```

---

## 📊 Quick Reference

### Class Syntax Summary

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
| `AttributeError: 'Class' object has no attribute 'attr'` | Attribute not defined | Define attribute in `__init__` |
| `TypeError: method() missing 1 required positional argument: 'self'` | Calling method without instance | Call on instance, not class |
| `RecursionError` | Infinite recursion | Check method calls |
| `NameError: name 'Class' is not defined` | Class not imported/defined | Import or define class |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **class keyword** | Defines a blueprint for objects |
| **__init__ is constructor** | Called when object is created |
| **self = this** | Refers to current instance |
| **Instance attributes = unique** | Defined with `self` |
| **Class attributes = shared** | Defined at class level |
| **@classmethod vs @staticmethod** | `cls` vs no special parameter |
| **@property creates getter** | Method accessed like attribute |
| **Inheritance = IS-A relationship** | Child IS A type of Parent |
| **super() calls parent** | Use in child methods |
| **@abstractmethod** | Forces child implementation |

