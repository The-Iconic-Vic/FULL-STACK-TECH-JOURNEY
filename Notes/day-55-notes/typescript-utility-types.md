# 📘 TypeScript Utility Types & Advanced Patterns

## Utility Types

### Partial<T>

Makes all properties of T optional.

```typescript
interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// All properties become optional
type PartialTodo = Partial<Todo>;
// { id?: number; title?: string; description?: string; completed?: boolean; }

function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
    return { ...todo, ...updates };
}

// Usage
const todo: Todo = { id: 1, title: "Learn TS", description: "Study", completed: false };
updateTodo(todo, { completed: true });  // ✅ Only 'completed' needed
```

---

### Required<T>

Makes all properties of T required (removes optional `?`).

```typescript
interface Config {
    apiUrl?: string;
    timeout?: number;
    retries?: number;
}

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

### Readonly<T>

Makes all properties of T immutable.

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
// user.name = "New Name";  // Error
```

---

### Pick<T, K>

Selects only the specified properties from T.

```typescript
interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

type TodoPreview = Pick<Todo, 'id' | 'title' | 'completed'>;

const preview: TodoPreview = {
    id: 1,
    title: "Learn TypeScript",
    completed: false
    // ✅ description and createdAt not required
};
```

---

### Omit<T, K>

Excludes the specified properties from T.

```typescript
interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// Exclude auto-generated fields
type NewTodo = Omit<Todo, 'id' | 'createdAt'>;

const newTodo: NewTodo = {
    title: "New Task",
    description: "Task description",
    completed: false
    // ✅ id and createdAt not required
};
```

### Pick vs Omit

| Pick | Omit |
|------|------|
| Select FEW properties | Exclude FEW properties |
| `Pick<T, 'id' | 'name'>` | `Omit<T, 'password' | 'token'>` |
| Good for API responses | Good for creating new entities |

---

### Record<K, V>

Creates an object type with keys of type K and values of type V.

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
// ❌ Missing 'admin' or 'user' or 'guest' would cause error

// Normalized state pattern
type NormalizedTodos = Record<string, Todo>;
const todos: NormalizedTodos = {
    "1": { id: 1, title: "Learn TS", completed: false },
    "2": { id: 2, title: "Build app", completed: true }
};
```

---

### Exclude<T, U>

Removes types from a union.

```typescript
type Status = 'pending' | 'active' | 'completed' | 'failed';

type ActiveOrCompleted = Exclude<Status, 'pending' | 'failed'>;
// 'active' | 'completed'

type NonError = Exclude<Status, 'failed'>;
// 'pending' | 'active' | 'completed'
```

### Extract<T, U>

Keeps only matching types from a union.

```typescript
type Status = 'pending' | 'active' | 'completed' | 'failed';

type PendingOrFailed = Extract<Status, 'pending' | 'failed'>;
// 'pending' | 'failed'

type ActiveOnly = Extract<Status, 'active'>;
// 'active'
```

### NonNullable<T>

Removes `null` and `undefined` from a type.

```typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;  // string

type WithNull = number | null;
type WithoutNull = NonNullable<WithNull>;  // number
```

---

## Mapped Types

### Basic Mapped Type

```typescript
// Make all properties optional
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Make all properties nullable
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

// Usage
interface User {
    id: number;
    name: string;
    email: string;
}

type OptionalUser = Partial<User>;
// { id?: number; name?: string; email?: string; }
```

### Key Remapping (TS 4.1+)

```typescript
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface User {
    id: number;
    name: string;
    email: string;
}

type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; getEmail: () => string; }
```

---

## Conditional Types

### Basic Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false

// Nested conditional
type TypeName<T> = 
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends null ? "null" :
    "object";
```

### Infer Keyword

```typescript
// Extract return type from function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(name: string): string {
    return `Hello, ${name}`;
}

type GreetReturn = ReturnType<typeof greet>;  // string

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element = ArrayElement<string[]>;  // string
```

---

## Type Guards

### typeof Type Guard

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

### instanceof Type Guard

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

### in Operator Type Guard

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

// Array type guard
function isUserArray(obj: any): obj is User[] {
    return Array.isArray(obj) && obj.every(isUser);
}

// Usage
function processData(data: unknown): void {
    if (isUser(data)) {
        console.log(data.name);  // TypeScript knows it's User
        console.log(data.email);
    }
    
    if (isUserArray(data)) {
        data.forEach(user => console.log(user.name));
    }
}
```

---

## Generic Store Class (Complete Example)

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

// Usage with Todo app
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

// Subscribe
store.subscribe(state => {
    console.log('State updated:', state);
});

// Partial update
store.setState({ loading: true });

// Select
const currentFilter = store.select('filter');

// Update todo
const updateTodo = (id: number, updates: Partial<Todo>) => {
    const currentTodos = store.select('todos');
    const updatedTodos = currentTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
    );
    store.setState({ todos: updatedTodos });
};
```

---

## Quick Reference

### Utility Types

| Utility | Syntax | Purpose |
|---------|--------|---------|
| Partial | `Partial<T>` | All properties optional |
| Required | `Required<T>` | All properties required |
| Readonly | `Readonly<T>` | All properties immutable |
| Pick | `Pick<T, K>` | Select specific properties |
| Omit | `Omit<T, K>` | Exclude specific properties |
| Record | `Record<K, V>` | Key-value object |
| Exclude | `Exclude<T, U>` | Remove from union |
| Extract | `Extract<T, U>` | Keep from union |
| NonNullable | `NonNullable<T>` | Remove null/undefined |

### Type Guards

| Guard | Syntax |
|-------|--------|
| typeof | `typeof value === "string"` |
| instanceof | `value instanceof Date` |
| in | `"property" in object` |
| Custom | `function isType(obj): obj is Type` |

### Mapped Types

```typescript
type Optional<T> = { [P in keyof T]?: T[P]; }
type Readonly<T> = { readonly [P in keyof T]: T[P]; }
type Nullable<T> = { [P in keyof T]: T[P] | null; }
```

### Conditional Types

```typescript
type IsArray<T> = T extends any[] ? true : false;
type ElementType<T> = T extends (infer U)[] ? U : T;
