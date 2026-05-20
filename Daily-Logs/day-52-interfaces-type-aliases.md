# 📅 Day 52: Interfaces & Type Aliases

**Date:** May 20, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Interfaces, Type Aliases, Extending, Implementing, Declaration Merging

---

## 📋 Learning Objectives

- ✅ Create and use interfaces with optional and readonly properties
- ✅ Extend interfaces using `extends` keyword
- ✅ Understand the key differences between interfaces and type aliases
- ✅ Use union types, intersection types, and primitive types with type aliases
- ✅ Understand declaration merging (interfaces only)
- ✅ Implement interfaces in classes

---

## 📝 Part 1: Interfaces

### What is an Interface?

An interface defines the shape of an object - what properties and methods it should have.

```typescript
// Basic interface
interface Person {
    name: string;
    age: number;
    email: string;
}

// Using the interface
const user: Person = {
    name: "Victor",
    age: 25,
    email: "victor@example.com"
};
```

---

### Optional Properties (`?`)

Properties that may or may not exist on the object.

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;   // Optional
    discount?: number;      // Optional
}

// All are valid
const product1: Product = { id: 1, name: "Laptop", price: 999 };
const product2: Product = { id: 2, name: "Mouse", price: 25, description: "Wireless mouse" };
const product3: Product = { id: 3, name: "Keyboard", price: 75, description: "Mechanical", discount: 10 };
```

---

### Readonly Properties

Properties that cannot be changed after the object is created.

```typescript
interface User {
    readonly id: number;     // Cannot be modified
    readonly createdAt: Date; // Cannot be modified
    name: string;             // Can be modified
    email: string;            // Can be modified
}

const user: User = {
    id: 1,
    createdAt: new Date(),
    name: "Victor",
    email: "victor@example.com"
};

// ❌ Cannot modify readonly properties
// user.id = 2;           // Error!
// user.createdAt = new Date(); // Error!

// ✅ Can modify regular properties
user.name = "Victor Updated";
user.email = "new@example.com";
```

---

### Index Signatures

For objects with dynamic property names.

```typescript
// All property values must be strings
interface StringDictionary {
    [key: string]: string;
}

const colors: StringDictionary = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
};

// Mixed types
interface ScoreDictionary {
    [key: string]: number;
}

const scores: ScoreDictionary = {
    math: 95,
    science: 88,
    history: 92
};
```

---

## 🔗 Part 2: Interface Inheritance (Extending)

### Extending a Single Interface

```typescript
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: string;
    department: string;
}

const employee: Employee = {
    name: "Alice",
    age: 30,
    employeeId: "EMP001",
    department: "Engineering"
};
```

---

### Extending Multiple Interfaces

```typescript
interface Name {
    firstName: string;
    lastName: string;
}

interface Contact {
    email: string;
    phone: string;
}

interface Employee extends Name, Contact {
    employeeId: string;
}

const employee: Employee = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    employeeId: "EMP001"
};
```

---

### Interface vs Class Implementation

```typescript
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

class Document implements Printable, Loggable {
    print(): void {
        console.log("Printing document...");
    }
    
    log(): void {
        console.log("Logging document...");
    }
}
```

---

## 🆚 Part 3: Type Aliases vs Interfaces

### Key Differences

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration merging | ✅ Yes | ❌ No |
| Extends | `extends` keyword | `&` (intersection) |
| Primitives | ❌ No | ✅ Yes |
| Unions | ❌ No | ✅ Yes |
| Tuples | ❌ No | ✅ Yes |
| Function types | ✅ Yes | ✅ Yes |

---

### What Type Aliases Can Do (Interfaces Cannot)

#### 1. Primitive Types
```typescript
// ✅ Type alias (interface cannot do this)
type UserID = string | number;
type UserName = string;
type IsActive = boolean;

// ❌ Interface cannot alias primitives
// interface UserID = string;  // Error!
```

#### 2. Union Types
```typescript
// ✅ Type alias for unions
type Status = "pending" | "active" | "completed" | "failed";
type Result = string | number | boolean | null;

// ❌ Interface cannot create unions
// interface Status { } // Can't represent union
```

#### 3. Tuple Types
```typescript
// ✅ Type alias for tuples
type Point = [number, number];
type RGB = [number, number, number];
type UserInfo = [string, number, boolean];

// ❌ Interface cannot define tuples
// interface Point { } // Would need separate properties
```

#### 4. Intersection Types
```typescript
// ✅ Type alias with intersection
type Person = { name: string } & { age: number };
type DiscountedProduct = Product & { discount: number };

// ✅ Interface also works (but differently)
interface Person extends Name, Age { }
```

---

### What Interfaces Can Do (Type Aliases Cannot)

#### 1. Declaration Merging

Interfaces with the same name are automatically merged.

```typescript
// ✅ Interface declaration merging
interface Box {
    width: number;
    height: number;
}

interface Box {
    depth: number;
}

// Final Box interface has all three properties
const box: Box = {
    width: 100,
    height: 200,
    depth: 300
};

// ❌ Type alias cannot be redeclared
// type Box = { width: number; };
// type Box = { height: number; }; // Error: Duplicate identifier
```

#### 2. Cleaner Extends Syntax

```typescript
// ✅ Interface extends (cleaner)
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// ❌ Type intersection (more verbose)
type Animal = { name: string; };
type Dog = Animal & { breed: string; };
```

---

### When to Use Which

| Scenario | Recommendation |
|----------|----------------|
| Object shape that may be extended later | Interface |
| Library/API that others will extend | Interface |
| Union types | Type Alias |
| Primitive aliases | Type Alias |
| Tuple types | Type Alias |
| Function types | Either (both work) |
| Intersection types | Type Alias |

---

## 🏗️ Part 4: Implementing Interfaces in Classes

TypeScript supports object-oriented programming with interfaces.

```typescript
// Interface defining contract
interface Repository<T> {
    findById(id: number): T | undefined;
    findAll(): T[];
    save(item: T): void;
    delete(id: number): boolean;
}

// Class implementing the interface
class UserRepository implements Repository<User> {
    private users: User[] = [];
    
    findById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }
    
    findAll(): User[] {
        return [...this.users];
    }
    
    save(user: User): void {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index === -1) {
            this.users.push(user);
        } else {
            this.users[index] = user;
        }
    }
    
    delete(id: number): boolean {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
}
```

---

## 📝 Quick Reference

### Interface Syntax
```typescript
interface Name {
    required: string;
    optional?: string;
    readonly immutable: number;
    [key: string]: string;  // Index signature
}
```s

### Extending Interfaces
```typescript
interface Child extends Parent1, Parent2 {
    ownProperty: string;
}
```

### Type Aliases
```typescript
type Primitive = string | number;
type Tuple = [string, number];
type Intersection = A & B;
type FunctionType = (param: string) => void;
```

### Implementing in Classes
```typescript
class MyClass implements MyInterface {
    // Must implement all interface members
}
```

---

## ✅ Day 52 Checklist

- [ ] Create interfaces with optional and readonly properties
- [ ] Extend interfaces using `extends` keyword
- [ ] Add index signatures for dynamic properties
- [ ] Understand declaration merging (interfaces only)
- [ ] Create type aliases for unions, primitives, and tuples
- [ ] Use intersection types (`&`) to combine types
- [ ] Know when to use interfaces vs type aliases
- [ ] Implement interfaces in classes
- [ ] Build E-Commerce Type System project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Interfaces define object shapes** - use for objects that may be extended
2. **`extends` keyword** for interface inheritance (multiple inheritance allowed)
3. **Optional properties (`?`)** and **readonly properties** add flexibility
4. **Declaration merging** only works with interfaces - type aliases cannot be redeclared
5. **Type aliases can do unions, primitives, and tuples** - interfaces cannot
6. **Use `&` for intersection types** with type aliases
7. **Both can define function types** - choose based on preference
8. **Classes can implement interfaces** - enforces a contract
