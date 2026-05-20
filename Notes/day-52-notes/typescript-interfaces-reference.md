# 📘 TypeScript Interfaces & Type Aliases Reference

## Interfaces

### Basic Interface

```typescript
interface Person {
    name: string;
    age: number;
    email: string;
}

const user: Person = {
    name: "Victor",
    age: 25,
    email: "victor@example.com"
};
```

### Optional Properties (`?`)

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;  // Optional
    discount?: number;     // Optional
}

// All valid
const p1: Product = { id: 1, name: "Laptop", price: 999 };
const p2: Product = { id: 2, name: "Mouse", price: 25, description: "Wireless" };
const p3: Product = { id: 3, name: "Keyboard", price: 75, discount: 10 };
```

### Readonly Properties

```typescript
interface User {
    readonly id: number;
    readonly createdAt: Date;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    createdAt: new Date(),
    name: "Victor",
    email: "victor@example.com"
};

// ❌ Cannot modify readonly
// user.id = 2;           // Error
// user.createdAt = new Date(); // Error

// ✅ Can modify regular
user.name = "Victor Updated";
```

### Index Signatures

```typescript
// String values
interface StringDict {
    [key: string]: string;
}

const colors: StringDict = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
};

// Number values
interface ScoreDict {
    [key: string]: number;
}

const scores: ScoreDict = {
    math: 95,
    science: 88,
    history: 92
};
```

---

## Interface Inheritance

### Extending Single Interface

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
    salary: number;
}

const employee: Employee = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    employeeId: "EMP001",
    salary: 75000
};
```

### Extending with Type Alias (Intersection)

```typescript
type Person = { name: string; age: number };
type Contact = { email: string; phone: string };

type Employee = Person & Contact & { employeeId: string };
```

---

## Type Aliases

### Primitive Aliases

```typescript
type UserID = string | number;
type UserName = string;
type IsActive = boolean;
type Status = "pending" | "active" | "completed";
```

### Union Types

```typescript
type Status = "pending" | "in-progress" | "completed";
type Result = string | number | boolean | null;
type HttpResponse = [number, string | object];
```

### Tuple Types

```typescript
type Point = [number, number];
type RGB = [number, number, number];
type UserInfo = [string, number, boolean];
type ApiResponse = [number, { data: any; message: string }];
```

### Function Types

```typescript
type Callback = (data: string) => void;
type MathOperation = (a: number, b: number) => number;
type EventHandler = (event: Event) => void;

const add: MathOperation = (a, b) => a + b;
```

### Intersection Types

```typescript
type Name = { firstName: string; lastName: string };
type Contact = { email: string; phone: string };

type Person = Name & Contact;

const person: Person = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890"
};
```

---

## Interface vs Type Alias Comparison

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration merging | ✅ Yes | ❌ No |
| Extends syntax | `extends` | `&` (intersection) |
| Primitives | ❌ No | ✅ Yes |
| Unions | ❌ No | ✅ Yes |
| Tuples | ❌ No | ✅ Yes |
| Function types | ✅ Yes | ✅ Yes |
| Classes can implement | ✅ Yes | ✅ Yes |

### Declaration Merging (Interfaces Only)

```typescript
// Multiple declarations merge automatically
interface Box {
    width: number;
    height: number;
}

interface Box {
    depth: number;
}

// Final Box has all three properties
const box: Box = { width: 100, height: 200, depth: 300 };

// Type aliases cannot merge
type Box = { width: number };
// type Box = { height: number }; // Error: Duplicate identifier
```

---

## Implementing Interfaces in Classes

```typescript
interface Printable {
    print(): void;
    getContent(): string;
}

interface Loggable {
    log(): void;
}

class Document implements Printable, Loggable {
    private content: string;
    
    constructor(content: string) {
        this.content = content;
    }
    
    print(): void {
        console.log(this.content);
    }
    
    getContent(): string {
        return this.content;
    }
    
    log(): void {
        console.log(`[LOG] ${new Date().toISOString()}: ${this.content}`);
    }
}
```

### Generic Interfaces

```typescript
interface Repository<T> {
    findById(id: number): T | undefined;
    findAll(): T[];
    save(item: T): void;
    delete(id: number): boolean;
}

class UserRepository implements Repository<User> {
    private users: User[] = [];
    
    findById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
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

## Common Patterns

### Extending vs Implementing

```typescript
// Interface extending another interface
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Class implementing interface
class Labrador implements Dog {
    name: string;
    breed: string;
    
    constructor(name: string) {
        this.name = name;
        this.breed = "Labrador";
    }
}
```

### Type Guard with Union Types

```typescript
type Success = { success: true; data: string };
type Failure = { success: false; error: string };
type Result = Success | Failure;

function handleResult(result: Result): void {
    if (result.success) {
        console.log("Data:", result.data);
    } else {
        console.error("Error:", result.error);
    }
}
```

### Discriminated Unions

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
    switch(shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * shape.radius ** 2;
    }
}
```

---

## Quick Reference

### Interface
```typescript
interface Name {
    required: string;
    optional?: string;
    readonly fixed: number;
    [key: string]: string;  // Index signature
}

interface Child extends Parent1, Parent2 {
    own: string;
}
```

### Type Alias
```typescript
type Primitive = string | number;
type Tuple = [string, number];
type Intersection = A & B;
type FunctionType = (param: string) => void;
type Union = "option1" | "option2" | "option3";
```

### Class Implementation
```typescript
class MyClass implements MyInterface {
    // Must implement all interface members
}
```

### When to Use

| Use Interface | Use Type Alias |
|---------------|----------------|
| Object shapes | Primitives |
| APIs that others extend | Unions |
| Declaration merging needed | Tuples |
| Class contracts | Intersection types |
| | Function types (optional) |
