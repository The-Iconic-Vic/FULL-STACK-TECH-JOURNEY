# 📚 Day 54 Resources - Generics

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| TypeScript: Generics | https://www.typescriptlang.org/docs/handbook/2/generics.html |
| TypeScript: Generic Functions | https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions |
| TypeScript: Generic Classes | https://www.typescriptlang.org/docs/handbook/2/classes.html#generic-classes |
| TypeScript: Utility Types | https://www.typescriptlang.org/docs/handbook/utility-types.html |
| TypeScript: Type Inference | https://www.typescriptlang.org/docs/handbook/type-inference.html |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| TypeScript Generics Tutorial | https://youtu.be/EcCTPIInMWM |
| Generics in TypeScript | https://youtu.be/2jM5l1QxE1g |
| Advanced TypeScript Generics | https://youtu.be/4f5x1C3zBqE |
| TypeScript Generic Constraints | https://youtu.be/0DdM6H1QjYM |

## 📝 Generic Function Cheatsheet

```typescript
// Basic
function identity<T>(value: T): T { return value; }

// Multiple types
function pair<T, U>(a: T, b: U): [T, U] { return [a, b]; }

// Constraint
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

## 📝 Generic Interface Cheatsheet

```typescript
// Basic
interface Box<T> {
    value: T;
}

// API Response
interface ApiResponse<T> {
    data: T;
    status: number;
    success: boolean;
}

// Multiple types
interface Pair<T, U> {
    first: T;
    second: U;
}
```

## 📝 Generic Class Cheatsheet

```typescript
// Stack
class Stack<T> {
    private items: T[] = [];
    push(item: T): void { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
}

// Queue
class Queue<T> {
    private items: T[] = [];
    enqueue(item: T): void { this.items.push(item); }
    dequeue(): T | undefined { return this.items.shift(); }
}
```

## 📝 Built-in Generics Cheatsheet

| Generic | Description | Example |
|---------|-------------|---------|
| `Array<T>` | Array of type T | `Array<string>` |
| `Promise<T>` | Promise resolving to T | `Promise<User>` |
| `Record<K, V>` | Object with keys K, values V | `Record<string, number>` |
| `Partial<T>` | All properties optional | `Partial<User>` |
| `Readonly<T>` | All properties readonly | `Readonly<User>` |

## 🎯 Generic API Client Pattern

```typescript
class ApiClient {
    async get<T>(url: string): Promise<T> { }
    async post<T, U>(url: string, data: U): Promise<T> { }
    async put<T, U>(url: string, data: U): Promise<T> { }
    async delete<T>(url: string): Promise<T> { }
}

interface User { id: number; name: string; }
const users = await api.get<User[]>("/users");
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Type 'unknown' is not assignable | Generic not constrained | Add `extends` constraint |
| Property 'length' does not exist | T doesn't guarantee length | Use `T extends { length: number }` |
| Argument not assignable | Wrong type parameter | Check the type being passed |
| Cannot find name 'T' | T not declared | Add `<T>` before parameters |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| TypeScript Deep Dive: Generics | https://basarat.gitbook.io/typescript/type-system/generics |
| Advanced TypeScript Patterns | https://www.typescriptlang.org/docs/handbook/advanced-types.html |
| TypeScript Utility Types | https://www.typescriptlang.org/docs/handbook/utility-types.html |

