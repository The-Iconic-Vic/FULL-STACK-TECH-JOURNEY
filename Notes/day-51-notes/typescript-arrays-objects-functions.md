# 📘 TypeScript Arrays, Objects & Functions Reference

## Arrays

### Array Syntax

```typescript
// Method 1: Type[] (recommended)
let fruits: string[] = ["apple", "banana", "orange"];
let scores: number[] = [95, 87, 92];
let flags: boolean[] = [true, false, true];

// Method 2: Array<Type> (generic syntax)
let fruits: Array<string> = ["apple", "banana", "orange"];
let scores: Array<number> = [95, 87, 92];
```

### Mixed Type Arrays

```typescript
// Union types for mixed arrays
let mixed: (string | number)[] = ["apple", 42, "banana", 100];
let flexible: (string | number | boolean)[] = ["hello", 42, true];
```

### readonly Arrays

```typescript
// Cannot be modified after creation
const colors: readonly string[] = ["red", "green", "blue"];

// ❌ Not allowed:
// colors.push("yellow");    // Error
// colors[0] = "orange";     // Error
// colors.pop();              // Error

// Alternative syntax
const sizes: ReadonlyArray<string> = ["S", "M", "L"];
```

### Empty Arrays

```typescript
// Must provide type annotation for empty arrays
let emptyStrings: string[] = [];
let emptyNumbers: Array<number> = [];

// TypeScript will infer from usage
let inferred = [];  // Type: any[] (not good)
```

---

## Tuples

### Basic Tuples

Tuples are fixed-length arrays with specific types at each position.

```typescript
// Exactly [string, number]
let user: [string, number] = ["John", 25];

// Access by index
let name = user[0];  // string
let age = user[1];   // number

// ❌ Wrong order
let wrong: [string, number] = [25, "John"];  // Error

// ❌ Wrong length
let wrong: [string, number] = ["John"];      // Error
let wrong: [string, number] = ["John", 25, true]; // Error
```

### Common Tuple Use Cases

```typescript
// Coordinates (latitude, longitude)
let coordinates: [number, number] = [40.7128, -74.0060];

// RGB color
let rgb: [number, number, number] = [255, 128, 0];

// API response [status, data]
let response: [number, string] = [200, "Success"];

// Key-value pair
let entry: [string, number] = ["age", 25];
```

### Optional Tuple Elements

```typescript
// Using ? for optional elements
let optionalTuple: [string, number?] = ["John"];
optionalTuple = ["John", 25];  // Also valid

// Multiple optionals (must be at the end)
let flexible: [string, number?, boolean?] = ["start"];
flexible = ["start", 42];
flexible = ["start", 42, true];
```

### Rest Elements in Tuples

```typescript
// Variable length after fixed types
let stringNumbers: [string, ...number[]] = ["apple", 1, 2, 3];
// First must be string, then any number of numbers

let mixedRest: [string, ...(string | number)[]] = ["start", 1, "middle", 2];

// Using rest at the beginning
let restFirst: [...number[], string] = [1, 2, 3, "end"];
```

### Labeled Tuples (TypeScript 4.0+)

```typescript
// Labels for documentation (no runtime effect)
let user: [name: string, age: number] = ["John", 25];
let point: [x: number, y: number] = [10, 20];
let rgb: [red: number, green: number, blue: number] = [255, 128, 0];
```

---

## Objects

### Inline Object Types

```typescript
// Direct inline annotation
let user: { name: string; age: number } = {
    name: "John",
    age: 25
};

// Function parameter with inline type
function greet(person: { name: string; age: number }): string {
    return `Hello ${person.name}`;
}
```

### Type Aliases

```typescript
// Define reusable type
type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};

// Use anywhere
let user: User = {
    id: 1,
    name: "John",
    email: "john@example.com",
    isActive: true
};

function processUser(user: User): void { }
function saveUser(user: User): void { }
```

### Optional Properties

```typescript
type Person = {
    name: string;      // Required
    age: number;       // Required
    email?: string;    // Optional
    phone?: string;    // Optional
};

// All are valid
const p1: Person = { name: "John", age: 25 };
const p2: Person = { name: "Jane", age: 30, email: "jane@example.com" };
const p3: Person = { name: "Bob", age: 40, email: "bob@example.com", phone: "123-456-7890" };

// Safe access with optional chaining
console.log(p1.email?.toUpperCase());  // undefined
console.log(p2.email?.toUpperCase());  // "JANE@EXAMPLE.COM"
```

### readonly Properties

```typescript
type Config = {
    readonly apiUrl: string;   // Cannot change
    readonly timeout: number;   // Cannot change
    retries: number;            // Can change
};

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};

// ❌ Cannot modify readonly
// config.apiUrl = "new-url";  // Error

// ✅ Can modify non-readonly
config.retries = 5;  // Works
```

### Index Signatures

For objects with dynamic property names.

```typescript
// All property values must be string
type StringDict = {
    [key: string]: string;
};

let dict: StringDict = {
    name: "John",
    city: "New York",
    country: "USA"
};

// Mixed value types
type MixedDict = {
    [key: string]: string | number;
};

let scores: MixedDict = {
    math: 95,
    science: 88,
    name: "John"
};
```

---

## Type Aliases vs Interfaces

| Feature | Type Alias | Interface |
|---------|------------|-----------|
| Syntax | `type User = { ... }` | `interface User { ... }` |
| Extends | `&` (intersection) | `extends` |
| Implements | Yes | Yes |
| Declaration merging | No | Yes |
| Primitives | Yes | No |
| Unions | Yes | No |
| Tuples | Yes | No |

```typescript
// Type alias (more flexible)
type ID = string | number;
type Point = [number, number];
type Callback = (data: string) => void;

// Interface (better for objects)
interface User {
    name: string;
    age: number;
}

interface Admin extends User {
    permissions: string[];
}
```

---

## Functions

### Parameter and Return Types

```typescript
// Basic function
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Void return (no return value)
function log(message: string): void {
    console.log(message);
}

// Never return (function never completes)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) { }
}
```

### Destructuring Parameters

```typescript
// Object destructuring
function printUser({ name, age }: { name: string; age: number }): void {
    console.log(`${name}: ${age}`);
}

// With type alias
type User = { name: string; age: number };
function printUser({ name, age }: User): void {
    console.log(`${name}: ${age}`);
}

// Array destructuring
function getFirst([first]: number[]): number {
    return first;
}
```

### Optional Parameters (`?`)

```typescript
// Optional parameters must come after required ones
function greet(name: string, age?: number): string {
    if (age) {
        return `Hello ${name}, age ${age}`;
    }
    return `Hello ${name}`;
}

greet("John");        // "Hello John"
greet("John", 25);    // "Hello John, age 25"
```

### Default Parameters

```typescript
// Default values (also make parameter optional)
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

greet("John");           // "Hello, John!"
greet("John", "Hi");     // "Hi, John!"

// Multiple defaults
function createUser(name: string, age: number = 18, isActive: boolean = true): object {
    return { name, age, isActive };
}
```

### Rest Parameters (`...`)

```typescript
// Collect remaining arguments into array
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4, 5);  // 15
sum(10, 20);          // 30

// Rest with other parameters (must be last)
function introduce(greeting: string, ...names: string[]): string {
    return `${greeting}, ${names.join(" and ")}!`;
}

introduce("Hello", "Alice", "Bob", "Charlie");  // "Hello, Alice and Bob and Charlie!"
```

### Function Type Expressions

```typescript
// Type alias for function signature
type MathOperation = (a: number, b: number) => number;

// Using the type
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Callback parameter
function process(data: string, callback: (result: string) => void): void {
    callback(data.toUpperCase());
}

// Function returning a function
function multiplier(factor: number): (value: number) => number {
    return (value) => value * factor;
}

const double = multiplier(2);
console.log(double(5));  // 10
```

### Function Overloads

```typescript
// Multiple function signatures
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value * 2;
}

process("hello");  // "HELLO"
process(42);       // 84
```

---

## Common Patterns

### Array Utility Functions

```typescript
type User = { id: number; name: string; active: boolean };

// Filter users
function getActiveUsers(users: User[]): User[] {
    return users.filter(user => user.active);
}

// Map to names
function getUserNames(users: User[]): string[] {
    return users.map(user => user.name);
}

// Find by id
function findUserById(users: User[], id: number): User | undefined {
    return users.find(user => user.id === id);
}
```

### Object Transformation

```typescript
type User = { id: number; name: string; age: number };

// Update property
function updateUserAge(user: User, newAge: number): User {
    return { ...user, age: newAge };
}

// Pick specific properties
function getUserSummary(user: User): { name: string; age: number } {
    const { name, age } = user;
    return { name, age };
}
```

### Validation Functions

```typescript
type ValidationResult = { valid: boolean; errors?: string[] };

function validateUser(user: { name: string; age: number }): ValidationResult {
    const errors: string[] = [];
    
    if (!user.name || user.name.length < 2) {
        errors.push("Name must be at least 2 characters");
    }
    
    if (user.age < 18) {
        errors.push("Age must be at least 18");
    }
    
    return { valid: errors.length === 0, errors };
}
```

---

## Quick Reference

### Arrays
```typescript
let a: string[] = [];
let b: Array<number> = [];
let c: readonly string[] = [];
let d: (string | number)[] = [];
```

### Tuples
```typescript
let t: [string, number] = ["a", 1];
let opt: [string, number?] = ["a"];
let rest: [string, ...number[]] = ["a", 1, 2];
```

### Objects
```typescript
type Name = { required: string; optional?: number; readonly fixed: boolean };
```

### Functions
```typescript
function fn(p: string): number { }
const fn = (p: string): number => { };
function opt(p?: string) { }
function def(p: string = "default") { }
function rest(...p: number[]) { }
