# 📅 Day 51: Arrays, Objects & Functions

**Date:** May 19, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Arrays, Tuples, Objects, Type Aliases, Functions

---

## 📋 Learning Objectives

- ✅ Master array syntax: `string[]` and `Array<string>`
- ✅ Understand `readonly` arrays (immutable after creation)
- ✅ Use tuples for fixed-length arrays with specific types
- ✅ Create object types inline and with type aliases
- ✅ Use optional properties (`?`) and readonly properties
- ✅ Type function parameters, return values, optional/default/rest parameters

---

## 📦 Part 1: Arrays & Tuples

### Array Syntax

There are two ways to write array types in TypeScript:

```typescript
// Method 1: Type[] (recommended, cleaner)
let fruits: string[] = ["apple", "banana", "orange"];
let scores: number[] = [95, 87, 92, 88];
let flags: boolean[] = [true, false, true];

// Method 2: Array<Type> (generic syntax)
let fruits: Array<string> = ["apple", "banana", "orange"];
let scores: Array<number> = [95, 87, 92, 88];
```

**Mixed type arrays (use union types):**
```typescript
// Array can contain strings OR numbers
let mixed: (string | number)[] = ["apple", 42, "banana", 100];

// Array with specific mixed types (tuple - see below)
let user: [string, number] = ["John", 25];
```



### `readonly` Arrays

`readonly` prevents modification of the array after creation.

```typescript
// Readonly array - cannot be changed
const colors: readonly string[] = ["red", "green", "blue"];

// ❌ These operations are NOT allowed:
// colors.push("yellow");     // Error: Property 'push' does not exist
// colors[0] = "orange";      // Error: Index signature in type 'readonly string[]'
// colors.pop();              // Error: Property 'pop' does not exist

// ✅ Can still read:
console.log(colors[0]);      // "red"
console.log(colors.length);  // 3

// Alternative syntax: ReadonlyArray<string>
const sizes: ReadonlyArray<string> = ["S", "M", "L"];
```

**Use cases for readonly arrays:**
- Configuration data that shouldn't change
- Function parameters when you don't want the function to modify the array
- API responses that should be treated as immutable

---

### Tuples

Tuples are arrays with **fixed length** and **specific types at each position**.

```typescript
// Basic tuple: exactly [string, number]
let user: [string, number] = ["John", 25];

// Access by index
console.log(user[0]);  // "John"
console.log(user[1]);  // 25

// ❌ Wrong types:
// let user2: [string, number] = [25, "John"];  // Error!

// ❌ Wrong length:
// let user3: [string, number] = ["John"];      // Error!
// let user4: [string, number] = ["John", 25, true]; // Error!
```

**Common tuple use cases:**

```typescript
// Coordinates
let coordinates: [number, number] = [40.7128, -74.0060];

// Key-value pair
let entry: [string, number] = ["age", 25];

// API response with status and data
let apiResponse: [number, string] = [200, "Success"];

// RGB color
let rgb: [number, number, number] = [255, 128, 0];
```

---

### Optional Tuple Elements (Rest elements)

Tuples can have optional elements using `?` or rest elements using `...`.

```typescript
// Optional elements (using ?)
let optionalTuple: [string, number?] = ["John"];
optionalTuple = ["John", 25];  // Also valid

// Rest elements (variable length)
let stringNumbers: [string, ...number[]] = ["apple", 1, 2, 3];
// First element must be string, followed by any number of numbers

let mixedRest: [string, ...(string | number)[]] = ["start", 1, "middle", 2, "end"];
```

---

### Labeled Tuples (TypeScript 4.0+)

Adding labels to tuple elements for better documentation.

```typescript
// Labeled tuple
let user: [name: string, age: number] = ["John", 25];

// The labels don't affect type checking, just documentation
let point: [x: number, y: number] = [10, 20];
```

---

## 📁 Part 2: Objects & Type Aliases

### Inline Object Types

Define object structure directly where it's used.

```typescript
// Inline type annotation
let user: { name: string; age: number } = {
    name: "John",
    age: 25
};

// Function parameter with inline type
function greet(person: { name: string; age: number }): string {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
}

// Returns object with inline type
function getPerson(): { name: string; age: number } {
    return { name: "Jane", age: 30 };
}
```

**Problem:** Inline types become repetitive when used in multiple places.

```typescript
// ❌ Repetitive and hard to maintain
function processUser(user: { id: number; name: string; email: string }) { }
function saveUser(user: { id: number; name: string; email: string }) { }
function displayUser(user: { id: number; name: string; email: string }) { }
```

---

### Type Aliases

Type aliases create reusable type names.

```typescript
// Define a type alias
type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};

// Use it everywhere
function processUser(user: User) { }
function saveUser(user: User) { }
function displayUser(user: User) { }

// Create variable with type
const currentUser: User = {
    id: 1,
    name: "John",
    email: "john@example.com",
    isActive: true
};
```

**Type alias naming conventions:**
- PascalCase (capital first letter)
- Descriptive names (User, Product, ApiResponse)
- Singular (not Users)

---

### Optional Properties (`?`)

Properties that may or may not exist on the object.

```typescript
type Person = {
    name: string;        // Required
    age: number;         // Required
    email?: string;      // Optional - may be undefined
    phone?: string;      // Optional - may be undefined
};

// ✅ All valid:
const person1: Person = { name: "John", age: 25 };
const person2: Person = { name: "Jane", age: 30, email: "jane@example.com" };
const person3: Person = { name: "Bob", age: 40, email: "bob@example.com", phone: "123-456-7890" };

// Access optional property safely
console.log(person1.email?.toUpperCase());  // undefined (no error)
console.log(person2.email?.toUpperCase());  // "JANE@EXAMPLE.COM"
```

---

### `readonly` Properties

Properties that cannot be changed after object creation.

```typescript
type Config = {
    readonly apiUrl: string;    // Cannot be changed
    readonly timeout: number;    // Cannot be changed
    retries: number;             // Can be changed
};

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};

// ❌ Cannot modify readonly properties:
// config.apiUrl = "https://new-api.com";  // Error!
// config.timeout = 10000;                  // Error!

// ✅ Can modify non-readonly properties:
config.retries = 5;  // Works!
```

---

### Combining Types (Intersection)

Combine multiple types into one using `&`.

```typescript
type Name = {
    firstName: string;
    lastName: string;
};

type Contact = {
    email: string;
    phone: string;
};

type Person = Name & Contact;

const person: Person = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890"
};
```

---

## 🎯 Part 3: Functions

### Parameter Type Annotations

```typescript
// Basic parameter types
function greet(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old`;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Destructuring parameters
function printUser({ name, age }: { name: string; age: number }): void {
    console.log(`${name}: ${age}`);
}
```

---

### Return Type Annotations

**Best practice: Explicit return types are better than implicit.**

```typescript
// Explicit return type (recommended)
function add(a: number, b: number): number {
    return a + b;
}

// TypeScript can infer, but explicit is clearer
function subtract(a: number, b: number) {
    return a - b;  // TypeScript infers return type as number
}

// void return (no return value)
function log(message: string): void {
    console.log(message);
    // No return statement (or return;)
}

// never return (function never completes)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // never exits
    }
}
```

---

### Optional Parameters (`?`)

Parameters that may or may not be provided.

```typescript
// Optional parameter must come after required ones
function greet(name: string, age?: number): string {
    if (age) {
        return `Hello ${name}, you are ${age} years old`;
    }
    return `Hello ${name}`;
}

greet("John");           // "Hello John"
greet("John", 25);       // "Hello John, you are 25 years old"
```

---

### Default Parameters

Parameters with default values (also make them optional).

```typescript
// Default parameter value
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

greet("John");              // "Hello, John!"
greet("John", "Hi");        // "Hi, John!"

// Default with optional
function createUser(name: string, age: number = 18, isActive: boolean = true): object {
    return { name, age, isActive };
}
```

---

### Rest Parameters (`...`)

Collect remaining arguments into an array.

```typescript
// Rest parameter with array type
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4, 5);  // 15
sum(10, 20);          // 30

// Rest parameter with specific types (tuple)
function introduce(greeting: string, ...names: string[]): string {
    return `${greeting}, ${names.join(" and ")}!`;
}

introduce("Hello", "Alice", "Bob", "Charlie");  // "Hello, Alice and Bob and Charlie!"

// Rest must be last parameter
function example(first: string, ...rest: number[], last: string): void { }  // ❌ Error
```

---

### Function Type Expressions

Define function signatures as types.

```typescript
// Function type alias
type MathOperation = (a: number, b: number) => number;

// Using the type
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// Callback parameter type
function processData(data: string, callback: (result: string) => void): void {
    const processed = data.toUpperCase();
    callback(processed);
}
```

---

## 🎯 Part 4: Complete User Directory Example

```typescript
// 1. Define User type
type User = {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean;  // optional
};

// 2. Sample users array
let users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", isAdmin: true },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com", isAdmin: false }
];

// 3. Add user function
function addUser(user: User): User[] {
    users.push(user);
    return users;
}

// 4. Find user by ID
function findUserById(id: number): User | undefined {
    return users.find(user => user.id === id);
}

// 5. Get admin users
function getAdmins(userList: User[]): User[] {
    return userList.filter(user => user.isAdmin === true);
}

// 6. Usage examples
const newUser: User = { id: 4, name: "Diana", email: "diana@example.com", isAdmin: true };
addUser(newUser);

const user = findUserById(2);
console.log(user?.name);  // "Bob" (using optional chaining)

const admins = getAdmins(users);
console.log(admins.length);  // 2 (Alice and Diana)
```

---

## 📝 Quick Reference

### Arrays
```typescript
let arr: string[] = [];
let arr2: Array<number> = [];
let readonlyArr: readonly string[] = ["a", "b"];
```

### Tuples
```typescript
let tuple: [string, number] = ["hello", 42];
let optional: [string, number?] = ["hello"];
let rest: [string, ...number[]] = ["start", 1, 2, 3];
```

### Objects
```typescript
type TypeName = {
    required: string;
    optional?: number;
    readonly immutable: boolean;
};
```

### Functions
```typescript
function fn(param: string): number { }
const fn = (param: string): number => { };
function optional(param?: string) { }
function defaults(param: string = "default") { }
function rest(...params: number[]) { }
```

---

## ✅ Day 51 Checklist

- [ ] Use array syntax `string[]` and `Array<string>`
- [ ] Create `readonly` arrays for immutable data
- [ ] Define tuples for fixed-length arrays
- [ ] Use type aliases instead of inline object types
- [ ] Add optional properties with `?`
- [ ] Use `readonly` properties for immutability
- [ ] Type function parameters and return values
- [ ] Use optional parameters (`?`) and default parameters
- [ ] Use rest parameters (`...`) for variable arguments
- [ ] Build Type-Safe User Directory project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **`string[]` is preferred** over `Array<string>` for array types
2. **`readonly` arrays** prevent accidental modifications
3. **Tuples** are perfect for fixed-length, mixed-type arrays
4. **Type aliases** eliminate repetition and improve maintainability
5. **Optional properties (`?`)** handle data that may not exist
6. **`readonly` properties** prevent changes after creation
7. **Explicit return types** are better than implicit for clarity
8. **Rest parameters** must be last and have array types

