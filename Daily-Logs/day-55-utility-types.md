# 📅 Day 55: Utility Types & Advanced Patterns

**Date:** May 23, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** Utility Types, Mapped Types, Conditional Types, Type Guards

---

## 📋 Learning Objectives

- ✅ Use `Partial<T>` for optional properties (updates, patches)
- ✅ Use `Required<T>` to make all properties required
- ✅ Use `Readonly<T>` for immutable state
- ✅ Select properties with `Pick<T, K>` and `Omit<T, K>`
- ✅ Create typed dictionaries with `Record<K, V>`
- ✅ Understand mapped types and conditional types
- ✅ Write custom type guards with `is` keyword

---

## 🔧 Part 1: Utility Types

### `Partial<T>`

Makes all properties of type `T` optional. Perfect for update operations.

```typescript
interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// All properties become optional
function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
    return { ...todo, ...updates };
}

// Usage
const todo: Todo = { id: 1, title: "Learn TS", description: "Study utilities", completed: false };
const updated = updateTodo(todo, { completed: true });
// Only 'completed' is required, others optional
```

**Common use cases:**
- API PATCH requests (partial updates)
- Form data before submission
- Default values merging

---

### `Required<T>`

Makes all properties of type `T` required (removes optional `?`).

```typescript
interface Config {
    apiUrl?: string;
    timeout?: number;
    retries?: number;
}

// All properties become required
type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; }

const config: RequiredConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};
// ❌ Missing any property causes error
```

---

### `Readonly<T>`

Makes all properties of type `T` immutable (cannot be reassigned).

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
    id: 1,
    name: "Victor",
    email: "victor@example.com"
};

// ❌ Cannot reassign
// user.name = "New Name";  // Error: Cannot assign to 'name' because it is a read-only property
```

**Common use cases:**
- Redux state (immutable)
- Props that shouldn't be modified
- Configuration objects

---

### `Pick<T, K>`

Selects only the specified properties from type `T`.

```typescript
interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// Select only id, title, and completed
type TodoPreview = Pick<Todo, 'id' | 'title' | 'completed'>;

const preview: TodoPreview = {
    id: 1,
    title: "Learn TypeScript",
    completed: false
    // ✅ description and createdAt not required
};
```

**Common use cases:**
- API responses (return only needed fields)
- List views (previews instead of full objects)
- Database projections

---

### `Omit<T, K>`

Excludes the specified properties from type `T`.

```typescript
interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// Exclude id and createdAt (auto-generated fields)
type NewTodo = Omit<Todo, 'id' | 'createdAt'>;

const newTodo: NewTodo = {
    title: "New Task",
    description: "Task description",
    completed: false
    // ✅ id and createdAt not required
};
```

**Pick vs Omit:**
| Use Pick when | Use Omit when |
|---------------|----------------|
| You want FEW properties | You want to EXCLUDE few properties |
| `Pick<T, 'id' | 'name'>` | `Omit<T, 'password' | 'token'>` |

---

### `Record<K, V>`

Creates an object type with keys of type `K` and values of type `V`.

```typescript
// Dictionary with string keys and number values
type ScoreMap = Record<string, number>;

const scores: ScoreMap = {
    math: 95,
    science: 88,
    history: 92
};

// Specific keys union
type UserRole = 'admin' | 'user' | 'guest';
type Permissions = Record<UserRole, string[]>;

const permissions: Permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
};
```

**Common use cases:**
- Normalized state (by ID)
- Dictionaries/maps
- Configuration objects

---

### `Exclude<T, U>` and `Extract<T, U>`

```typescript
// Exclude - remove types from union
type Status = 'pending' | 'active' | 'completed' | 'failed';
type ActiveOrCompleted = Exclude<Status, 'pending' | 'failed'>;  // 'active' | 'completed'

// Extract - keep only matching types
type PendingOrFailed = Extract<Status, 'pending' | 'failed'>;  // 'pending' | 'failed'
```

### `NonNullable<T>`

Removes `null` and `undefined` from a type.

```typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;  // string
```

---

## 🔄 Part 2: Mapped Types

### Basic Mapped Type

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
```

### Using `keyof` with Mapped Types

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type UserKeys = keyof User;  // 'id' | 'name' | 'email'

// Custom mapped type
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; getEmail: () => string; }
```

### Conditional Types

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>;     // true
type B = IsArray<number>;        // false

// Return type based on input
type ElementType<T> = T extends any[] ? T[number] : T;

type E1 = ElementType<string[]>;  // string
type E2 = ElementType<number>;    // number
```

---

## 🛡️ Part 3: Type Guards

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

### `instanceof` Type Guard

```typescript
class Dog { bark() { console.log("Woof!"); } }
class Cat { meow() { console.log("Meow!"); } }

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark();  // TypeScript knows it's Dog
    } else {
        animal.meow();  // TypeScript knows it's Cat
    }
}
```

### `in` Operator Type Guard

```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    side: number;
}

function getArea(shape: Circle | Square): number {
    if ("radius" in shape) {
        return Math.PI * shape.radius ** 2;
    }
    return shape.side ** 2;
}
```

### Custom Type Guard with `is`

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

function isUser(obj: any): obj is User {
    return obj && 
           typeof obj.id === 'number' &&
           typeof obj.name === 'string' &&
           typeof obj.email === 'string';
}

// Usage
function processData(data: unknown): void {
    if (isUser(data)) {
        console.log(data.name);  // TypeScript knows it's User
        console.log(data.email);
    }
}
```

### Array Type Guard

```typescript
function isUserArray(obj: any): obj is User[] {
    return Array.isArray(obj) && obj.every(isUser);
}

// Usage
const data: unknown = fetchUsers();
if (isUserArray(data)) {
    data.forEach(user => console.log(user.name));
}
```

---

## 🏗️ Part 4: Generic State Management System

### Complete Store Class

```typescript
type Listener<T> = (state: T) => void;

class Store<T> {
    private state: T;
    private listeners: Listener<T>[] = [];
    
    constructor(initialState: T) {
        this.state = initialState;
    }
    
    // Readonly state (immutable from outside)
    getState(): Readonly<T> {
        return this.state;
    }
    
    // Partial updates
    setState(updates: Partial<T>): void {
        this.state = { ...this.state, ...updates };
        this.notifyListeners();
    }
    
    // Select specific property
    select<K extends keyof T>(key: K): T[K] {
        return this.state[key];
    }
    
    // Subscribe to changes
    subscribe(listener: Listener<T>): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.state));
    }
}
```

### Usage with Todo App

```typescript
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface AppState {
    todos: Todo[];
    filter: 'all' | 'active' | 'completed';
    loading: boolean;
}

const store = new Store<AppState>({
    todos: [],
    filter: 'all',
    loading: false
});

// Subscribe to changes
store.subscribe(state => {
    console.log('State updated:', state);
});

// Update with Partial
store.setState({ loading: true });

// Partial update for specific todo
const updateTodo = (id: number, updates: Partial<Todo>) => {
    const currentTodos = store.select('todos');
    const updatedTodos = currentTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
    );
    store.setState({ todos: updatedTodos });
};
```

---

## 📝 Quick Reference

### Utility Types Summary

| Utility | Purpose | Example |
|---------|---------|---------|
| `Partial<T>` | All properties optional | `Partial<Todo>` |
| `Required<T>` | All properties required | `Required<Config>` |
| `Readonly<T>` | All properties immutable | `Readonly<State>` |
| `Pick<T, K>` | Select properties | `Pick<Todo, 'id' | 'title'>` |
| `Omit<T, K>` | Exclude properties | `Omit<Todo, 'createdAt'>` |
| `Record<K, V>` | Key-value object | `Record<string, Todo>` |
| `Exclude<T, U>` | Remove from union | `Exclude<Status, 'pending'>` |
| `Extract<T, U>` | Keep from union | `Extract<Status, 'active'>` |
| `NonNullable<T>` | Remove null/undefined | `NonNullable<string | null>` |

### Type Guards

| Guard | Example |
|-------|---------|
| `typeof` | `typeof value === "string"` |
| `instanceof` | `value instanceof Date` |
| `in` | `"property" in object` |
| Custom | `function isUser(obj): obj is User` |

### Mapped Types

```typescript
type Optional<T> = { [P in keyof T]?: T[P]; }
type Readonly<T> = { readonly [P in keyof T]: T[P]; }
type Nullable<T> = { [P in keyof T]: T[P] | null; }
```

---

## ✅ Day 55 Checklist

- [ ] Use `Partial<T>` for partial updates
- [ ] Use `Required<T>` to enforce all properties
- [ ] Use `Readonly<T>` for immutable data
- [ ] Select properties with `Pick<T, K>` and `Omit<T, K>`
- [ ] Create dictionaries with `Record<K, V>`
- [ ] Understand `Exclude`, `Extract`, `NonNullable`
- [ ] Write custom type guards with `is` keyword
- [ ] Use `typeof`, `instanceof`, `in` type guards
- [ ] Build State Management System project
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **`Partial<T>` is perfect for updates** - API PATCH, form data, default values
2. **`Pick` selects properties** - great for view models and API responses
3. **`Omit` excludes properties** - perfect for creating new entities
4. **`Record<K, V>` creates dictionaries** - normalized state, maps
5. **`Readonly<T>` ensures immutability** - prevents accidental mutations
6. **Type guards narrow types** - `typeof`, `instanceof`, `in`, custom guards
7. **Custom guards use `is` keyword** - reusable type checking
8. **Mapped types transform properties** - create new types from existing ones

