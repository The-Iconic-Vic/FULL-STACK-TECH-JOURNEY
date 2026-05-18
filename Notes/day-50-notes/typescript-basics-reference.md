# 📘 TypeScript Basics Reference

## What is TypeScript?

TypeScript is a superset of JavaScript that adds static type checking. It compiles to plain JavaScript.

```
TypeScript Code → TypeScript Compiler (tsc) → JavaScript Code (runs in browser)
```

---

## JavaScript vs TypeScript

| Feature | JavaScript | TypeScript |
|---------|------------|------------|
| Type checking | Runtime only | Compile-time (in your editor) |
| Error discovery | When code runs | While you type |
| IDE support | Basic | Excellent (autocomplete, refactoring) |
| Learning curve | Easy | Moderate |
| Industry adoption | Universal | 80%+ of large React apps |

---

## Setting Up TypeScript

### New Project with Vite

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

### Adding TypeScript to Existing Project

```bash
# Install TypeScript
npm install -D typescript @types/react @types/react-dom

# Create config file
npx tsc --init
```

---

## TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true
  }
}
```

### Key Compiler Options

| Option | Description | Recommended |
|--------|-------------|-------------|
| `strict` | Enables all strict type checking | ✅ true |
| `noUnusedLocals` | Error on unused variables | ✅ true |
| `noUnusedParameters` | Error on unused parameters | ✅ true |
| `target` | JavaScript version | ES2020 |
| `jsx` | JSX compilation | react-jsx |

---

## Basic Types

### Primitive Types

```typescript
// String
let name: string = "Victor";
let greeting: string = 'Hello';

// Number (integers and decimals)
let age: number = 25;
let price: number = 19.99;
let negative: number = -10;

// Boolean
let isActive: boolean = true;
let isComplete: boolean = false;

// Null and Undefined
let empty: null = null;
let notSet: undefined = undefined;
```

---

### Type Inference

TypeScript can guess types automatically.

```typescript
// Inferred types (no annotation needed)
let name = "Victor";     // TypeScript knows this is string
let age = 25;            // TypeScript knows this is number
let isActive = true;     // TypeScript knows this is boolean

// When inference doesn't work (null/undefined need annotation)
let user = null;         // Type: any (bad)
let user: string | null = null;  // ✅ Good: explicit type
```

---

### The `any` Type (Avoid!)

`any` disables type checking - defeats the purpose of TypeScript.

```typescript
// ❌ BAD - Disables type checking
let data: any = fetchUser();
data = 42;               // No error
data.toUpperCase();      // No error at compile time (will crash at runtime)

// ✅ GOOD - Use unknown instead
let data: unknown = fetchUser();
if (typeof data === 'string') {
    console.log(data.toUpperCase());
}
```

---

### The `unknown` Type

`unknown` is type-safe alternative to `any`. You must check type before using.

```typescript
let userInput: unknown = "hello";

// ❌ Error: Object is of type 'unknown'
// userInput.toUpperCase();

// ✅ Must narrow the type
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase());  // Works!
}
```

---

## Arrays

```typescript
// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];
let names2: Array<string> = ["Alice", "Bob"];  // Generic syntax

// Array of numbers
let ages: number[] = [25, 30, 35];

// Mixed types (use union)
let mixed: (string | number)[] = ["Alice", 25, "Bob", 30];
```

---

## Functions

### Parameter and Return Types

```typescript
// Explicit parameter and return types
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Void return (no return value)
function logMessage(message: string): void {
    console.log(message);
}

// Optional parameters (use ?)
function greet(name: string, age?: number): string {
    return age ? `${name} is ${age} years old` : name;
}
```

---

## Objects and Interfaces

### Object Type Annotation

```typescript
// Inline object type
let user: { name: string; age: number } = {
    name: "Victor",
    age: 25
};

// Error: missing age property
let user2: { name: string; age: number } = {
    name: "Victor"
    // ❌ Property 'age' is missing
};
```

### Interface (Recommended)

```typescript
interface User {
    name: string;
    age: number;
    email?: string;      // Optional property (?:)
}

let user: User = {
    name: "Victor",
    age: 25
};

// With optional property
let user2: User = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"  // ✅ Optional, can be omitted
};
```

---

## Union and Intersection Types

### Union Types (`|`)

Value can be one of several types.

```typescript
// ID can be string OR number
let id: string | number = "abc123";
id = 123;  // ✅ Also valid

// Function parameter
function format(value: string | number): string {
    return value.toString();
}
```

### Intersection Types (`&`)

Combine multiple types.

```typescript
interface Name {
    name: string;
}

interface Age {
    age: number;
}

type Person = Name & Age;

let person: Person = {
    name: "Victor",
    age: 25
};
```

---

## Type Aliases

Create custom names for types.

```typescript
type ID = string | number;
type UserRole = "admin" | "user" | "guest";

let userId: ID = "abc123";
let role: UserRole = "admin";

// Function using type alias
function setRole(role: UserRole) {
    console.log(role);
}
```

---

## TypeScript in React

### Typing Props

```tsx
// Interface for component props
interface GreetingProps {
    name: string;
    age?: number;           // Optional
    onGreet?: (name: string) => void;  // Optional callback
}

function Greeting({ name, age, onGreet }: GreetingProps) {
    const handleClick = () => {
        onGreet?.(name);
    };
    
    return (
        <div>
            <h1>Hello, {name}!</h1>
            {age && <p>Age: {age}</p>}
            {onGreet && <button onClick={handleClick}>Greet</button>}
        </div>
    );
}
```

### Typing useState

```tsx
import { useState } from 'react';

// TypeScript infers from initial value
const [count, setCount] = useState(0);      // count is number
const [name, setName] = useState('');       // name is string

// Explicit type (useful for null or complex)
const [user, setUser] = useState<User | null>(null);

interface User {
    id: number;
    name: string;
}
```

### Typing Events

```tsx
// Input change event
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
};

// Button click event
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Clicked');
};

// Form submit event
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic
};

// Generic event for any element
const handleChangeGeneric = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
};
```

---

## Type Assertions (Type Casting)

Tell TypeScript you know the type better than it does.

```tsx
// Using 'as' syntax
const myElement = document.getElementById('app') as HTMLDivElement;

// Using angle brackets (not in TSX)
const myElement = <HTMLDivElement>document.getElementById('app');
```

---

## Common TypeScript Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Type 'number' is not assignable to type 'string'` | Assigning wrong type | Fix the value or change the type |
| `Property 'name' does not exist on type '{}'` | Object missing property | Define the type or add the property |
| `Object is possibly 'null'` | Variable might be null | Add null check (`if (obj)`) |
| `Argument of type 'string' is not assignable to parameter of type 'number'` | Wrong argument type | Convert the value or change parameter type |

---

## Quick Reference

### Basic Types
```typescript
string, number, boolean, null, undefined, any, unknown, void
```

### Array Types
```typescript
let arr: string[] = [];
let arr: Array<number> = [];
```

### Function Types
```typescript
function fn(param: string): number { }
const fn = (param: string): number => { }
```

### Object Types
```typescript
let obj: { name: string; age: number } = {};
interface MyInterface { name: string; }
type MyType = { name: string; };
```

### Union Types
```typescript
let id: string | number;
```

### React Component
```tsx
interface Props { name: string; }
const Component = ({ name }: Props) => { };
```
