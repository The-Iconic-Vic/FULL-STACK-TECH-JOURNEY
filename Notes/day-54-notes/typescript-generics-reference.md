# 📘 TypeScript Generics Reference

## What are Generics?

Generics allow you to create reusable components that work with multiple types while maintaining type safety.

```typescript
// Without generics - need separate functions
function identityString(value: string): string { return value; }
function identityNumber(value: number): number { return value; }

// With generics - one function works for all
function identity<T>(value: T): T {
    return value;
}
```

---

## Generic Functions

### Basic Syntax

```typescript
// Function declaration
function identity<T>(value: T): T {
    return value;
}

// Arrow function
const identity = <T>(value: T): T => value;

// Explicit type argument
let result = identity<string>("hello");

// Type inference (TypeScript figures out T)
let result = identity("hello");  // T is string
```

### Multiple Type Parameters

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Usage
const result = pair<string, number>("age", 25);
// TypeScript infers types
const result2 = pair("name", "Victor");  // [string, string]

function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const person = merge({ name: "Victor" }, { age: 25 });
// person has type { name: string } & { age: number }
```

### Generic Constraints (`extends`)

Limits what types can be used with the generic.

```typescript
// T must have a 'length' property
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

getLength("hello");     // ✅ string has length
getLength([1, 2, 3]);   // ✅ array has length
// getLength(42);       // ❌ number has no length

// T must have 'id' property
interface HasId {
    id: number;
}

function getById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}
```

### `keyof` Constraint

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Victor", age: 25, city: "Lagos" };

getProperty(user, "name");  // string
getProperty(user, "age");   // number
// getProperty(user, "invalid"); // Error: argument 'invalid' is not assignable
```

---

## Generic Interfaces

### Basic Generic Interface

```typescript
interface Box<T> {
    value: T;
    getValue(): T;
}

const stringBox: Box<string> = {
    value: "hello",
    getValue() { return this.value; }
};

const numberBox: Box<number> = {
    value: 42,
    getValue() { return this.value; }
};
```

### Generic Interface for API Responses

```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}

interface User {
    id: number;
    name: string;
}

async function fetchUser(): Promise<ApiResponse<User>> {
    const response = await fetch('/api/user');
    return response.json();
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch('/api/users');
    return response.json();
}
```

### Multiple Type Parameters in Interface

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

### Generic Interface with Methods

```typescript
interface Repository<T> {
    findById(id: number): T | undefined;
    findAll(): T[];
    save(item: T): void;
    delete(id: number): boolean;
}

class UserRepository implements Repository<User> {
    // Must implement all methods
}
```

---

## Generic Classes

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
```

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
    
    size(): number {
        return this.items.length;
    }
}
```

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
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Usage
class Person implements Comparable<Person> {
    constructor(public name: string, public age: number) {}
    
    compareTo(other: Person): number {
        return this.age - other.age;
    }
}

const pq = new PriorityQueue<Person>();
pq.add(new Person("Alice", 30));
pq.add(new Person("Bob", 25));
pq.add(new Person("Charlie", 35));
// Removes in order: Bob (25), Alice (30), Charlie (35)
```

---

## Built-in Generics

### Array<T>

```typescript
let numbers: Array<number> = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
let users: Array<User> = [];

// Equivalent syntax
let numbers2: number[] = [1, 2, 3];
```

### Promise<T>

```typescript
const promise: Promise<string> = new Promise((resolve) => {
    resolve("hello");
});

async function fetchData(): Promise<User> {
    const response = await fetch('/api/user');
    return response.json();
}

// Promise with multiple types
type ApiResult<T> = Promise<{ data: T; error: null } | { data: null; error: string }>;
```

### Record<K, V>

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

// Accessing values
scores.math;      // number
permissions.admin; // string[]
```

### Partial<T> (Utility Type)

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

function updateUser(id: number, updates: Partial<User>): void {
    // updates can have any subset of User properties
    // { name: "new name" }
    // { age: 30 }
    // { name: "new", email: "new@example.com" }
}
```

### Readonly<T>

```typescript
const user: Readonly<User> = {
    id: 1,
    name: "Victor",
    email: "victor@example.com",
    age: 25
};

// ❌ Cannot modify
// user.name = "New Name";
```

---

## Generic API Client Example

### Types

```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}

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
```

### API Client Class

```typescript
class ApiClient {
    constructor(private baseUrl: string) {}
    
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
const api = new ApiClient("https://jsonplaceholder.typicode.com");

// TypeScript knows users is User[]
const usersResponse = await api.get<User[]>("/users");
if (usersResponse.success) {
    console.log(usersResponse.data); // User[]
}

// Create new post
const newPost = await api.post<Post, { title: string; body: string }>(
    "/posts",
    { title: "New Post", body: "Content here" }
);
```

---

## Quick Reference

### Generic Function
```typescript
function identity<T>(arg: T): T { return arg; }
const identity = <T>(arg: T): T => arg;
function pair<T, U>(a: T, b: U): [T, U] { return [a, b]; }
```

### Generic Constraint
```typescript
function getLength<T extends { length: number }>(item: T): number
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
```

### Generic Interface
```typescript
interface Box<T> { value: T; }
interface ApiResponse<T> { data: T; status: number; }
interface Pair<T, U> { first: T; second: U; }
```

### Generic Class
```typescript
class Stack<T> { private items: T[] = []; push(item: T): void; }
class Queue<T> { private items: T[] = []; enqueue(item: T): void; }
```

### Built-in Generics
```typescript
Array<T>        // Array of type T
Promise<T>      // Promise resolving to T
Record<K, V>    // Object with keys K, values V
Partial<T>      // All properties optional
Readonly<T>     // All properties readonly
