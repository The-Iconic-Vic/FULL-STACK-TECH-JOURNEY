# 📅 Day 54: Generics

**Date:** May 22, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Generic Functions, Generic Interfaces, Generic Classes, Built-in Generics

---

## 📋 Learning Objectives

- ✅ Write generic functions with type parameters `<T>`
- ✅ Use type inference with generics
- ✅ Add generic constraints with `extends` keyword
- ✅ Work with multiple type parameters `<T, U>`
- ✅ Create generic interfaces and classes
- ✅ Understand built-in generics: `Array<T>`, `Promise<T>`, `Record<K, V>`

---

## 🎯 Part 1: Generic Functions

### What are Generics?

Generics allow you to create reusable code that works with multiple types while maintaining type safety.

```typescript
// Without generics - need separate functions for each type
function identityString(value: string): string { return value; }
function identityNumber(value: number): number { return value; }
function identityBoolean(value: boolean): boolean { return value; }

// With generics - one function works for all types
function identity<T>(value: T): T {
    return value;
}

// Usage
let str = identity<string>("hello");  // Explicit type
let num = identity(42);               // TypeScript infers T = number
let bool = identity(true);            // TypeScript infers T = boolean
```

---

### Generic Function Syntax

```typescript
// Basic syntax
function functionName<T>(param: T): T {
    return param;
}

// Arrow function syntax
const functionName = <T>(param: T): T => param;

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Usage
const result = pair<string, number>("age", 25);
// or with inference
const result2 = pair("name", "Victor");  // T = string, U = string
```

---

### Generic Constraints

Use `extends` to limit what types can be used with a generic.

```typescript
// Constraint: T must have a 'length' property
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

// Works with string (has length)
getLength("hello");     // 5

// Works with array (has length)
getLength([1, 2, 3]);   // 3

// ❌ Error: number doesn't have length
// getLength(42);

// Constraint with interface
interface HasId {
    id: number;
}

function getById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}
```

---

### Keyof Constraint

Use `keyof` to constrain a generic to the keys of an object.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Victor", age: 25, city: "Lagos" };

getProperty(user, "name");  // ✅ string
getProperty(user, "age");   // ✅ number
// getProperty(user, "invalid"); // ❌ Error: 'invalid' is not in 'name' | 'age' | 'city'
```

---

## 🔧 Part 2: Generic Interfaces

### Basic Generic Interface

```typescript
interface Box<T> {
    value: T;
    getValue(): T;
}

// Usage
const stringBox: Box<string> = {
    value: "hello",
    getValue() {
        return this.value;
    }
};

const numberBox: Box<number> = {
    value: 42,
    getValue() {
        return this.value;
    }
};
```

---

### Generic Interface for API Responses

```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}

// Usage with different types
interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

async function fetchUser(): Promise<ApiResponse<User>> {
    const response = await fetch('/api/user');
    return response.json();
}

async function fetchProducts(): Promise<ApiResponse<Product[]>> {
    const response = await fetch('/api/products');
    return response.json();
}
```

---

### Generic Interface with Multiple Types

```typescript
interface Pair<T, U> {
    first: T;
    second: U;
    swap(): Pair<U, T>;
}

const pair: Pair<string, number> = {
    first: "age",
    second: 25,
    swap() {
        return { first: this.second, second: this.first };
    }
};
```

---

## 📦 Part 3: Generic Classes

### Basic Generic Class

```typescript
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}

// Usage
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // 3

const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
stringStack.push("c");
```

---

### Generic Queue Class

```typescript
class Queue<T> {
    private items: T[] = [];
    
    enqueue(item: T): void {
        this.items.push(item);
    }
    
    dequeue(): T | undefined {
        return this.items.shift();
    }
    
    front(): T | undefined {
        return this.items[0];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
```

---

### Generic Class with Constraints

```typescript
interface Comparable<T> {
    compareTo(other: T): number;
}

class PriorityQueue<T extends Comparable<T>> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
        this.items.sort((a, b) => a.compareTo(b));
    }
    
    remove(): T | undefined {
        return this.items.shift();
    }
}
```

---

## 🌐 Part 4: Built-in Generics

### Array<T>

```typescript
// Array type syntax
let numbers: Array<number> = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
let users: Array<User> = [{ id: 1, name: "Victor" }];

// Equivalent to
let numbers2: number[] = [1, 2, 3];
```

### Promise<T>

```typescript
// Promise that resolves to string
const promise: Promise<string> = new Promise((resolve) => {
    resolve("hello");
});

// Async function returns Promise<T>
async function fetchData(): Promise<User> {
    const response = await fetch('/api/user');
    return response.json();
}
```

### Record<K, V>

`Record<K, V>` creates an object type with keys of type K and values of type V.

```typescript
// Object with string keys and number values
let scores: Record<string, number> = {
    math: 95,
    science: 88,
    history: 92
};

// Object with specific keys
type UserRole = "admin" | "user" | "guest";
let permissions: Record<UserRole, string[]> = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};
```

### Partial<T>

`Partial<T>` makes all properties of T optional (detailed on Day 55)

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// All properties become optional
function updateUser(id: number, updates: Partial<User>): void {
    // updates can have id, name, email, or none of them
}
```

---

## 🏗️ Part 5: Generic API Client Example

### API Response Interface

```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}

interface ApiError {
    status: number;
    message: string;
}
```

### Generic API Client Class

```typescript
class ApiClient {
    private baseUrl: string;
    
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            const data = await response.json();
            
            return {
                data,
                status: response.status,
                message: response.ok ? "Success" : "Error",
                success: response.ok
            };
        } catch (error) {
            return {
                data: null as T,
                status: 500,
                message: error instanceof Error ? error.message : "Unknown error",
                success: false
            };
        }
    }
    
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "GET" });
    }
    
    async post<T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }
    
    async put<T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }
    
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}

// Usage
interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    body: string;
}

const api = new ApiClient("https://jsonplaceholder.typicode.com");

// TypeScript knows users is User[]
const usersResponse = await api.get<User[]>("/users");
if (usersResponse.success) {
    console.log(usersResponse.data); // User[]
}

// TypeScript knows posts is Post[]
const postsResponse = await api.get<Post[]>("/posts");

// Create a new post
const newPost = await api.post<Post, { title: string; body: string }>(
    "/posts",
    { title: "New Post", body: "Content here" }
);
```

---

## 📝 Quick Reference

### Generic Functions
```typescript
function identity<T>(arg: T): T { return arg; }
const identity = <T>(arg: T): T => arg;
function pair<T, U>(a: T, b: U): [T, U] { return [a, b]; }
```

### Generic Constraints
```typescript
function getLength<T extends { length: number }>(item: T): number
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
```

### Generic Interfaces
```typescript
interface Box<T> { value: T; }
interface ApiResponse<T> { data: T; status: number; }
interface Pair<T, U> { first: T; second: U; }
```

### Generic Classes
```typescript
class Stack<T> { private items: T[] = []; push(item: T): void; }
class Queue<T> { private items: T[] = []; enqueue(item: T): void; }
```

### Built-in Generics
```typescript
Array<T>
Promise<T>
Record<K, V>
Partial<T>
Readonly<T>
```

---

## ✅ Day 54 Checklist

- [ ] Write generic functions with type parameters `<T>`
- [ ] Use type inference with generics
- [ ] Add generic constraints with `extends`
- [ ] Use multiple type parameters `<T, U>`
- [ ] Create generic interfaces
- [ ] Create generic classes
- [ ] Understand `Array<T>`, `Promise<T>`, `Record<K, V>`
- [ ] Build Generic API Client project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Generics = type-safe reusable code** - write once, use with many types
2. **`<T>` is a placeholder** - replaced with actual type when used
3. **Type inference usually works** - you don't always need to specify the type
4. **Constraints limit generics** - use `extends` to require specific properties
5. **Multiple type parameters** - use `<T, U, V>` for different types
6. **Generics work with functions, interfaces, and classes**
7. **`keyof` constraint** - ensure a key exists on an object
8. **Built-in generics** - `Array<T>`, `Promise<T>`, `Record<K, V>` are everywhere

