# 📘 TypeScript Union, Intersection & Literal Types

## Union Types (`|`)

Union types allow a value to be one of several types.

### Basic Union Types

```typescript
// Primitive unions
let id: string | number = "abc123";
id = 123;  // ✅ valid

let status: "pending" | "active" | "completed" = "pending";
status = "active";     // ✅ valid
status = "done";       // ❌ Error: not in union

// Function parameter union
function format(value: string | number): string {
    return `Value: ${value}`;
}
```

### Union with Arrays

```typescript
// Array of mixed types
let items: (string | number)[] = ["apple", 42, "banana", 100];

// Union of array types
let data: string[] | number[] = ["a", "b", "c"];
data = [1, 2, 3];  // ✅ valid
data = ["a", 1];   // ❌ Error: mixed types not allowed in array union
```

### Common Union Patterns

```typescript
// Nullable types
type NullableString = string | null;
type OptionalNumber = number | undefined;

// API response types
type ApiResponse = { success: true; data: any } | { success: false; error: string };

// Function return unions
function findUser(id: number): User | null {
    // returns User or null
}
```

### Type Narrowing with Unions

```typescript
function process(value: string | string[] | null): number {
    // Need to narrow before using type-specific properties
    if (value === null) {
        return 0;
    }
    
    if (typeof value === "string") {
        return value.length;
    }
    
    return value.length;  // value is string[] here
}
```

---

## Intersection Types (`&`)

Intersection types combine multiple types into one.

### Basic Intersection Types

```typescript
interface Name {
    firstName: string;
    lastName: string;
}

interface Age {
    age: number;
}

interface Contact {
    email: string;
    phone: string;
}

// Person has all properties from Name, Age, AND Contact
type Person = Name & Age & Contact;

const person: Person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    phone: "123-456-7890"
};
```

### Intersection vs Extends

| Feature | Extends (Interface) | Intersection (`&`) |
|---------|---------------------|-------------------|
| Syntax | `interface B extends A` | `type C = A & B` |
| Declaration merging | ✅ Yes | ❌ No |
| Works with unions | ❌ No | ✅ Yes |
| Conflict handling | Compiler error | Property becomes `never` |

```typescript
// Extends (interface)
interface A { value: string; }
interface B extends A { }  // Works

// Intersection (type)
type C = A & B;  // Works

// Conflict example
interface X { type: string; }
interface Y { type: number; }
type Z = X & Y;  // type: never (string & number impossible)
```

### Practical Intersection Examples

```typescript
// Adding timestamp to any type
type Timestamped<T> = T & { createdAt: Date; updatedAt: Date };

type Todo = Timestamped<{
    id: number;
    title: string;
    completed: boolean;
}>;

// Mixin pattern
type WithId = { id: number };
type WithName = { name: string };
type WithTimestamps = { createdAt: Date };

type Entity = WithId & WithName & WithTimestamps;
```

---

## Literal Types

Literal types are types that represent exactly one specific value.

### String Literal Types

```typescript
// Single string literal
type Hello = "hello";
let greeting: Hello = "hello";  // ✅ valid
greeting = "hi";                // ❌ Error

// Union of string literals (common pattern)
type Direction = "north" | "south" | "east" | "west";
let dir: Direction = "north";   // ✅ valid
dir = "north-east";              // ❌ Error

type Status = "pending" | "processing" | "shipped" | "delivered";
type Color = "red" | "green" | "blue" | "yellow" | "black" | "white";
```

### Number Literal Types

```typescript
// Single number literal
type One = 1;
let num: One = 1;    // ✅ valid
num = 2;             // ❌ Error

// Union of number literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;  // ✅ valid
roll = 7;                // ❌ Error

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;
```

### Boolean Literal Types

```typescript
type True = true;
let isTrue: True = true;   // ✅ valid
isTrue = false;            // ❌ Error

// Union of boolean literals (same as boolean)
type YesNo = true | false;
```

---

## Discriminated Unions

A discriminated union uses a literal property to distinguish between different types in a union.

### Basic Discriminated Union

```typescript
// Each type has a unique 'kind' property (the discriminator)
type Circle = {
    kind: "circle";
    radius: number;
};

type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
};

type Square = {
    kind: "square";
    side: number;
};

type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
};

type Shape = Circle | Rectangle | Square | Triangle;
```

### Type-Safe Function with Discriminated Union

```typescript
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "square":
            return shape.side ** 2;
        case "triangle":
            return (shape.base * shape.height) / 2;
        default:
            // Exhaustive check - ensures all cases are handled
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
```

### Exhaustive Checking with `never`

The `never` type ensures all union variants are handled.

```typescript
function assertUnreachable(x: never): never {
    throw new Error("Unhandled case: " + x);
}

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "square":
            return shape.side ** 2;
        // If we forget triangle, TypeScript will error
        default:
            return assertUnreachable(shape);
    }
}
```

---

## Type Guards

### `typeof` Type Guard

```typescript
function process(value: string | number | boolean): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    if (typeof value === "number") {
        return value.toFixed(2);
    }
    return value.toString();
}
```

### `in` Type Guard

```typescript
interface Circle { radius: number; }
interface Square { side: number; }

function getArea(shape: Circle | Square): number {
    if ("radius" in shape) {
        return Math.PI * shape.radius ** 2;
    }
    return shape.side ** 2;
}
```

### `instanceof` Type Guard

```typescript
class Dog { bark() { console.log("Woof!"); } }
class Cat { meow() { console.log("Meow!"); } }

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
```

### Custom Type Guard

```typescript
interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }

function isCircle(shape: Circle | Square): shape is Circle {
    return shape.kind === "circle";
}

function getArea(shape: Circle | Square): number {
    if (isCircle(shape)) {
        return Math.PI * shape.radius ** 2;
    }
    return shape.side ** 2;
}
```

---

## Form Validator Example

### Types

```typescript
// Discriminated union for form fields
type FormField = 
    | { type: "text"; name: string; label: string; required?: boolean; minLength?: number; maxLength?: number }
    | { type: "email"; name: string; label: string; required?: boolean }
    | { type: "number"; name: string; label: string; required?: boolean; min?: number; max?: number }
    | { type: "select"; name: string; label: string; required?: boolean; options: string[] };

// Literal types for validation rules
type ValidationRuleName = "required" | "minLength" | "maxLength" | "min" | "max" | "email";

// Result type
type ValidationResult = { valid: true } | { valid: false; errors: string[] };
```

### Validation Function

```typescript
function validateField(field: FormField, value: string): ValidationResult {
    const errors: string[] = [];
    
    switch (field.type) {
        case "text":
            if (field.required && !value) {
                errors.push(`${field.label} is required`);
            }
            if (field.minLength && value.length < field.minLength) {
                errors.push(`${field.label} must be at least ${field.minLength} characters`);
            }
            if (field.maxLength && value.length > field.maxLength) {
                errors.push(`${field.label} must be at most ${field.maxLength} characters`);
            }
            break;
            
        case "email":
            if (field.required && !value) {
                errors.push(`${field.label} is required`);
            }
            if (value && !/^\S+@\S+\.\S+$/.test(value)) {
                errors.push(`Please enter a valid email address`);
            }
            break;
            
        case "number":
            if (field.required && !value) {
                errors.push(`${field.label} is required`);
            }
            const num = Number(value);
            if (value && isNaN(num)) {
                errors.push(`${field.label} must be a number`);
            }
            if (field.min !== undefined && num < field.min) {
                errors.push(`${field.label} must be at least ${field.min}`);
            }
            if (field.max !== undefined && num > field.max) {
                errors.push(`${field.label} must be at most ${field.max}`);
            }
            break;
            
        case "select":
            if (field.required && !value) {
                errors.push(`${field.label} is required`);
            }
            if (value && !field.options.includes(value)) {
                errors.push(`Please select a valid option`);
            }
            break;
    }
    
    return errors.length === 0 ? { valid: true } : { valid: false, errors };
}
```

---

## Quick Reference

### Union Types
```typescript
type A = string | number;
type B = "red" | "green" | "blue";
type C = string | null | undefined;
```

### Intersection Types
```typescript
type A = { name: string } & { age: number };
type B = T & { createdAt: Date };
```

### Literal Types
```typescript
type A = "hello";
type B = 42;
type C = true;
type D = "yes" | "no" | "maybe";
```

### Discriminated Union
```typescript
type A = { kind: "typeA"; value: string };
type B = { kind: "typeB"; count: number };
type C = A | B;
```

### Type Guards
```typescript
typeof x === "string"
"prop" in x
x instanceof Class
Array.isArray(x)
