# 📅 Day 50: TypeScript Introduction & Setup

**Date:** May 18, 2026  
**Author:** Victor Innocent (Iconic_Vic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Why TypeScript, TypeScript Setup, Basic Types

---

## 📋 Learning Objectives

- ✅ Understand why TypeScript is the industry standard for large applications
- ✅ Recognize the problem: JavaScript runtime errors vs TypeScript compile-time errors
- ✅ Set up a new React + TypeScript project with Vite
- ✅ Understand `tsconfig.json` and TypeScript compiler options
- ✅ Use basic type annotations: `string`, `number`, `boolean`, `null`, `undefined`
- ✅ Understand type inference vs explicit annotations
- ✅ Avoid `any` and understand why it defeats the purpose of TypeScript

---

## 🤔 Part 1: Why TypeScript?

### The Problem with JavaScript

JavaScript is dynamically typed. This means variables can change types at runtime, leading to bugs that only appear in production.

```javascript
// JavaScript - No error until runtime
function greet(name) {
    return name.toUpperCase();
}

greet("Victor");  // "VICTOR" ✅
greet(42);        // Runtime error: "name.toUpperCase is not a function" 💥
```

**The issue:** This error only happens when someone actually calls `greet(42)`. If that code path isn't tested, it reaches production!

---

### TypeScript Catches Errors at Compile Time

```typescript
// TypeScript - Error at compile time (in VS Code, before running)
function greet(name: string): string {
    return name.toUpperCase();
}

greet("Victor");  // ✅ Works
greet(42);        // ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'string'
```

**The difference:** TypeScript catches the error immediately in your editor, not when the user runs the code.

---

### Benefits of TypeScript

| Benefit | Description |
|---------|-------------|
| **Static Type Checking** | Catches errors during development, not in production |
| **Better IDE Support** | Autocomplete, IntelliSense, refactoring tools |
| **Self-Documenting Code** | Types tell you what functions expect and return |
| **Safer Refactoring** | Change a type and see all affected code |
| **Industry Standard** | 80%+ of large React codebases use TypeScript |

---

### Who Uses TypeScript?

- **Microsoft** (created TypeScript, uses it in VSCode, Teams, Office)
- **Google** (Angular is built with TypeScript)
- **Airbnb** (converted entire codebase to TypeScript)
- **Facebook** (uses TypeScript for large parts of the codebase)
- **Netflix, Uber, Slack, Shopify**

---

## 🛠️ Part 2: Setting Up TypeScript

### Creating a React + TypeScript Project with Vite

```bash
# Create new project with TypeScript template
npm create vite@latest my-ts-app -- --template react-ts

# Navigate to project
cd my-ts-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

### Project Structure (React + TypeScript)

```
my-ts-app/
├── index.html
├── package.json
├── vite.config.ts          # Vite config (now .ts)
├── tsconfig.json           # Main TypeScript config
├── tsconfig.app.json       # App-specific TypeScript config
├── tsconfig.node.json      # Node-specific TypeScript config
├── src/
│   ├── main.tsx            # Entry point (now .tsx)
│   ├── App.tsx             # App component (.tsx)
│   ├── App.css
│   ├── vite-env.d.ts       # TypeScript environment declarations
│   └── main.tsx
└── ...
```

---

### Understanding `tsconfig.json`

The `tsconfig.json` file tells TypeScript how to compile your code.

```json
{
  "compilerOptions": {
    "target": "ES2020",           // Which JavaScript version to compile to
    "module": "ESNext",           // Module system
    "lib": ["ES2020", "DOM", "DOM.Iterable"],  // Available type definitions
    "jsx": "react-jsx",           // How to compile JSX
    "strict": true,               // Enable all strict type checking options
    "noUnusedLocals": true,       // Error on unused variables
    "noUnusedParameters": true,   // Error on unused parameters
    "skipLibCheck": true          // Skip type checking of declaration files
  }
}
```

**Key Options:**

| Option | Description |
|--------|-------------|
| `strict` | Enables all strict type checking options (recommended) |
| `noUnusedLocals` | Warns about variables declared but never used |
| `noUnusedParameters` | Warns about parameters declared but never used |
| `target` | JavaScript version for output (ES2020, ES5, etc.) |

---

### TypeScript Compiler (`tsc`)

```bash
# Run the TypeScript compiler
npx tsc

# Watch mode (recompile on changes)
npx tsc --watch

# Generate a config file
npx tsc --init
```

**What `tsc` does:**
- Reads your `.ts` and `.tsx` files
- Checks for type errors
- Compiles them to JavaScript (`.js` files)

---

## 📝 Part 3: Basic Types

### Type Annotations

Type annotations explicitly tell TypeScript what type a variable should be.

```typescript
// Basic syntax: variableName: type
let name: string = "Victor";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

---

### Primitive Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text | `let name: string = "Victor"` |
| `number` | Numbers (integers and decimals) | `let age: number = 25` |
| `boolean` | True or false | `let isActive: boolean = true` |
| `null` | Intentional absence of value | `let data: null = null` |
| `undefined` | Uninitialized value | `let notSet: undefined = undefined` |

---

### Type Inference

TypeScript can often guess the type without an explicit annotation.

```typescript
// TypeScript infers these types automatically
let name = "Victor";      // Type: string
let age = 25;             // Type: number
let isActive = true;      // Type: boolean

// You don't need to write:
// let name: string = "Victor";
```

**When to use explicit annotations:**
- Function parameters
- Function return types
- Variables initialized with `null` or `undefined`
- When you want to be explicit (code clarity)

---

### The `any` Type (Avoid!)

`any` disables all type checking for a variable. **Defeats the purpose of TypeScript!**

```typescript
let something: any = "hello";
something = 42;        // ✅ No error - dangerous!
something = true;      // ✅ No error - still dangerous!
something.toUpperCase(); // ✅ No error at compile time, but will crash at runtime!
```

**When to use `any`:** Almost never. Only when migrating JavaScript to TypeScript or dealing with truly dynamic data.

---

### The `unknown` Type (Safe Alternative)

`unknown` is the type-safe alternative to `any`. You must check the type before using it.

```typescript
let userInput: unknown = "hello";

// ❌ Error: 'userInput' is of type 'unknown'
// userInput.toUpperCase();

// ✅ Must check type first
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase()); // Works!
}
```

**When to use `unknown`:** When you really don't know the type but want type safety (API responses, user input).

---

## 🎯 Part 4: TypeScript in React

### Typing Props in React Components

```tsx
// Define props type
interface GreetingProps {
    name: string;
    age?: number;  // Optional prop (?:)
}

function Greeting({ name, age }: GreetingProps) {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            {age && <p>Age: {age}</p>}
        </div>
    );
}

// Usage
<Greeting name="Victor" />        // ✅ age is optional
<Greeting name="Victor" age={25} /> // ✅
<Greeting age={25} />               // ❌ Error: name is required
```

---

### Typing useState

```tsx
import { useState } from 'react';

// TypeScript infers the type
const [count, setCount] = useState(0);     // count is number
const [name, setName] = useState('');      // name is string

// Explicit type (useful for null or complex types)
const [user, setUser] = useState<User | null>(null);

interface User {
    id: number;
    name: string;
}
```

---

### Typing Events

```tsx
// Form input event
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
};

// Button click event
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked');
};

// Form submit event
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle submission
};
```

---

## 📝 Quick Reference

### Basic Types
```typescript
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let n: null = null;
let u: undefined = undefined;
```

### Type Inference
```typescript
let inferredString = "hello";  // TypeScript knows this is string
let inferredNumber = 42;       // TypeScript knows this is number
```

### Avoid `any`
```typescript
// ❌ Bad
let data: any = fetchData();

// ✅ Good
let data: unknown = fetchData();
// then check type before using
```

### Function Types
```typescript
// Parameter and return types
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;
```

### Array Types
```typescript
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ['a', 'b', 'c'];  // Generic syntax
```

---

## ✅ Day 50 Checklist

- [ ] Understand why TypeScript is better than plain JavaScript for large apps
- [ ] Create a new React + TypeScript project with Vite
- [ ] Understand `tsconfig.json` and its key options
- [ ] Use basic type annotations: `string`, `number`, `boolean`
- [ ] Understand when to use explicit types vs type inference
- [ ] Know why `any` is dangerous and when to use `unknown` instead
- [ ] Type props in React components
- [ ] Type `useState` hooks
- [ ] Build Type Explorer component
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **TypeScript catches bugs at compile time** – not in production
2. **TypeScript is the industry standard** – used by 80%+ of large React codebases
3. **`tsconfig.json` controls TypeScript compilation** – `strict: true` is recommended
4. **Type inference is powerful** – let TypeScript guess types when obvious
5. **Avoid `any`** – it disables type checking and defeats the purpose
6. **Use `unknown` instead of `any`** – it forces you to check types before use
7. **`.tsx` files** are for React components with TypeScript
8. **Better IDE support** – autocomplete, refactoring, jump to definition
