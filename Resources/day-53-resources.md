# 📚 Day 53 Resources - Union, Intersection & Literal Types

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| TypeScript: Union Types | https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types |
| TypeScript: Intersection Types | https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types |
| TypeScript: Literal Types | https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types |
| TypeScript: Discriminated Unions | https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions |
| TypeScript: Type Guards | https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards |
| TypeScript: Exhaustiveness Checking | https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Union and Intersection Types | https://youtu.be/0DdM6H1QjYM |
| Discriminated Unions Explained | https://youtu.be/4f5x1C3zBqE |
| Type Guards in TypeScript | https://youtu.be/2jM5l1QxE1g |
| Advanced TypeScript Patterns | https://youtu.be/2lXk2yPZ1d0 |

## 📝 Union Types Cheatsheet

```typescript
// Basic union
type ID = string | number;

// Union with literals
type Status = "pending" | "active" | "completed";

// Nullable union
type MaybeString = string | null | undefined;

// Function parameter union
function process(value: string | number) { }

// Array union
let items: (string | number)[] = [];
```

## 📝 Intersection Types Cheatsheet

```typescript
// Basic intersection
type Person = { name: string } & { age: number };

// Multiple intersection
type Entity = WithId & WithTimestamps & WithName;

// Generic intersection
type Timestamped<T> = T & { createdAt: Date };

// Intersection with primitive (rare)
type NumericString = string & { __brand: "numeric" };
```

## 📝 Literal Types Cheatsheet

```typescript
// String literal
type Direction = "north" | "south" | "east" | "west";

// Number literal
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

// Boolean literal
type TrueOnly = true;

// Template literal (TypeScript 4.1+)
type Greeting = `hello_${string}`;
```

## 📝 Discriminated Union Cheatsheet

```typescript
// Define variants
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };

// Create union
type Shape = Circle | Square;

// Type-safe function
function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.side ** 2;
    }
}
```

## 📝 Type Guards Cheatsheet

```typescript
// typeof guard
if (typeof value === "string") { }

// in guard
if ("property" in object) { }

// instanceof guard
if (value instanceof Date) { }

// Array guard
if (Array.isArray(value)) { }

// Custom guard
function isString(value: any): value is string {
    return typeof value === "string";
}
```

## 🎯 Common Patterns

### Exhaustive Checking with `never`

```typescript
function assertUnreachable(x: never): never {
    throw new Error("Unhandled case: " + x);
}

function handleShape(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.side ** 2;
        default: return assertUnreachable(shape);
    }
}
```

### Branded Types

```typescript
type UserId = string & { __brand: "UserId" };
type ProductId = string & { __brand: "ProductId" };

function createUserId(id: string): UserId {
    return id as UserId;
}
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Property not available on union | TypeScript can't guarantee property exists | Use type guard or discriminated union |
| Intersection with conflicting properties | Types have incompatible properties | Type becomes `never` - redesign types |
| Forgetting to handle all union cases | Missing case in switch | Add exhaustive check with `never` |
| `never` type appears | Unreachable code or impossible type | Check your type logic |
| Type guard not working | Wrong condition | Use correct narrowing technique |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Advanced TypeScript Types | https://www.typescriptlang.org/docs/handbook/advanced-types.html |
| Template Literal Types | https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html |
| Type Manipulation | https://www.typescriptlang.org/docs/handbook/2/types-from-types.html |
| Conditional Types | https://www.typescriptlang.org/docs/handbook/2/conditional-types.html |

