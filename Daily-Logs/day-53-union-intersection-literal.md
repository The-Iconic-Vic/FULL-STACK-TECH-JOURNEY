# 📅 Day 53: Union, Intersection & Literal Types

**Date:** May 21, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Union Types, Intersection Types, Literal Types, Discriminated Unions

---

## 📋 Learning Objectives

- ✅ Create union types using `|` (OR) syntax
- ✅ Create intersection types using `&` (AND) syntax
- ✅ Understand literal types (string, number, boolean literals)
- ✅ Build discriminated unions for type-safe code
- ✅ Use type narrowing with `typeof`, `in`, and `instanceof`
- ✅ Apply these concepts to real-world form validation

---

## 🎯 Part 1: Union Types

### What are Union Types?

Union types allow a value to be one of several types.

```typescript
// A value can be string OR number
let value: string | number = "hello";
value = 42;        // ✅ Valid
value = true;      // ❌ Error: boolean not allowed

// Function parameter with union
function format(value: string | number): string {
    return `Value: ${value}`;
}

// Array of union types
let items: (string | number)[] = ["apple", 42, "banana", 100];
```

---

### Common Union Type Patterns

```typescript
// Nullable types
type NullableString = string | null;
type OptionalNumber = number | undefined;

// API response
type ApiResponse = string | number | object | null;

// Multiple primitives
type ID = string | number;
type Result = string | boolean | null;

// Function return type
function getData(id: number): string | null {
    // returns string or null
}
```

---

### Type Narrowing with Unions

When you have a union, you need to narrow the type before using type-specific operations.

```typescript
function printLength(value: string | string[]) {
    // ❌ Error: Property 'length' does not exist on type 'string | string[]'
    // console.log(value.length);
    
    // ✅ Narrow the type
    if (typeof value === "string") {
        console.log(value.length);  // string has .length
    } else {
        console.log(value.length);  // array has .length
    }
}
```

**Type Narrowing Methods:**

| Method | Example |
|--------|---------|
| `typeof` | `typeof value === "string"` |
| `in` | `"property" in object` |
| `instanceof` | `value instanceof Array` |
| `Array.isArray()` | `Array.isArray(value)` |
| Custom type guard | `isString(value)` |

---

## 🔗 Part 2: Intersection Types

### What are Intersection Types?

Intersection types combine multiple types into one. The resulting type has ALL properties from all types.

```typescript
interface Name {
    firstName: string;
    lastName: string;
}

interface Age {
    age: number;
}

// Intersection type - has firstName, lastName, AND age
type Person = Name & Age;

const person: Person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
```

---

### Intersection vs Extends

| Feature | Extends (Interface) | Intersection (&) |
|---------|---------------------|------------------|
| Syntax | `interface B extends A` | `type C = A & B` |
| Conflicts | Compiler error | Property becomes `never` |
| Declaration merging | Yes | No |
| Works with unions | No | Yes |

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

---

### Practical Intersection Examples

```typescript
// Combining multiple interfaces
type User = Name & Age & Contact & Address;

// Adding properties to existing type
type Timestamped = { createdAt: Date; updatedAt: Date };
type Todo = { title: string; completed: boolean } & Timestamped;

// Mixins pattern
type WithId = { id: number };
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type Entity = WithId & WithTimestamps;
```

---

## 📝 Part 3: Literal Types

### String Literal Types

A string literal type is a type that accepts ONLY a specific string.

```typescript
// Specific string literals
type Direction = "north" | "south" | "east" | "west";
let dir: Direction = "north";  // ✅ Valid
dir = "north-east";             // ❌ Error

type Status = "pending" | "active" | "completed" | "failed";
let status: Status = "pending";  // ✅ Valid
status = "done";                  // ❌ Error
```

---

### Number Literal Types

```typescript
// Specific numbers
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;   // ✅ Valid
roll = 7;                 // ❌ Error

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
let day: Weekday = 2;     // ✅ Valid (Tuesday)
```

---

### Boolean Literal Types

```typescript
type IsTrue = true;
let value: IsTrue = true;   // ✅ Valid
value = false;               // ❌ Error

type YesNo = true | false;   // Same as boolean
```

---

## 🎯 Part 4: Discriminated Unions

### What is a Discriminated Union?

A discriminated union (also called "tagged union" or "algebraic data type") uses a literal type property to distinguish between different shapes.

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
    size: number;
};

type Shape = Circle | Rectangle | Square;
```

---

### Type-Safe Function with Discriminated Union

```typescript
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "square":
            return shape.size ** 2;
        default:
            // TypeScript ensures all cases are handled
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;
    }
}
```

**Benefits of Discriminated Unions:**
- TypeScript knows which properties are available in each case
- Exhaustiveness checking ensures all types are handled
- Compile-time safety, no runtime surprises

---

## 🔧 Part 5: Type Guards

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
interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }

function getArea(shape: Circle | Square): number {
    if ("radius" in shape) {
        return Math.PI * shape.radius ** 2;
    }
    return shape.side ** 2;
}
```

### Custom Type Guard

```typescript
function isCircle(shape: Circle | Square): shape is Circle {
    return "radius" in shape;
}

function getArea(shape: Circle | Square): number {
    if (isCircle(shape)) {
        return Math.PI * shape.radius ** 2;
    }
    return shape.side ** 2;
}
```

---

## 📊 Part 6: Form Validator System Example

### Types Definition

```typescript
// Discriminated union for field types
type TextField = {
    type: "text";
    label: string;
    name: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
};

type EmailField = {
    type: "email";
    label: string;
    name: string;
    required?: boolean;
};

type NumberField = {
    type: "number";
    label: string;
    name: string;
    required?: boolean;
    min?: number;
    max?: number;
};

type SelectField = {
    type: "select";
    label: string;
    name: string;
    required?: boolean;
    options: string[];
};

type FormField = TextField | EmailField | NumberField | SelectField;

// Literal types for validation rules
type ValidationRuleName = "required" | "minLength" | "maxLength" | "min" | "max" | "pattern" | "email";

type ValidationRule = {
    name: ValidationRuleName;
    value?: any;
    message: string;
};

type ValidationError = {
    field: string;
    message: string;
};
```

### Validation Functions

```typescript
function validateField(field: FormField, value: string): string | null {
    switch (field.type) {
        case "text":
            if (field.required && !value) return `${field.label} is required`;
            if (field.minLength && value.length < field.minLength) {
                return `${field.label} must be at least ${field.minLength} characters`;
            }
            if (field.maxLength && value.length > field.maxLength) {
                return `${field.label} must be at most ${field.maxLength} characters`;
            }
            break;
            
        case "email":
            if (field.required && !value) return `${field.label} is required`;
            if (value && !/^\S+@\S+\.\S+$/.test(value)) {
                return `Please enter a valid email address`;
            }
            break;
            
        case "number":
            if (field.required && !value) return `${field.label} is required`;
            const num = Number(value);
            if (isNaN(num)) return `${field.label} must be a number`;
            if (field.min !== undefined && num < field.min) {
                return `${field.label} must be at least ${field.min}`;
            }
            if (field.max !== undefined && num > field.max) {
                return `${field.label} must be at most ${field.max}`;
            }
            break;
            
        case "select":
            if (field.required && !value) return `${field.label} is required`;
            if (value && !field.options.includes(value)) {
                return `Please select a valid option`;
            }
            break;
    }
    
    return null;
}
```

---

## 📝 Quick Reference

### Union Types
```typescript
type StringOrNumber = string | number;
type Status = "pending" | "active" | "completed";
```

### Intersection Types
```typescript
type Person = Name & Age & Contact;
type Timestamped<T> = T & { createdAt: Date };
```

### Literal Types
```typescript
type Direction = "north" | "south" | "east" | "west";
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
type TrueOnly = true;
```

### Discriminated Union
```typescript
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;
```

### Type Guards
```typescript
typeof value === "string"
"property" in object
value instanceof Class
Array.isArray(value)
```

---

## ✅ Day 53 Checklist

- [ ] Create union types with `|` syntax
- [ ] Use intersection types with `&` syntax
- [ ] Create string, number, and boolean literal types
- [ ] Build discriminated unions with a common `kind` property
- [ ] Write type guards using `typeof`, `in`, and `instanceof`
- [ ] Handle exhaustive checking with `never` type
- [ ] Build Form Validator System project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Union types (`|`)** = value can be one of several types
2. **Intersection types (`&`)** = value must have ALL properties from all types
3. **Literal types** = exact values (not just shapes)
4. **Discriminated unions** = union with a literal property to distinguish variants
5. **Type narrowing** = required before using type-specific operations
6. **`never` type** = helps with exhaustive checking in switch statements
7. **Custom type guards** = functions returning `value is Type` for reusability

