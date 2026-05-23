# 📚 Day 55 Resources - Utility Types & Advanced Patterns

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| TypeScript: Utility Types | https://www.typescriptlang.org/docs/handbook/utility-types.html |
| TypeScript: Mapped Types | https://www.typescriptlang.org/docs/handbook/2/mapped-types.html |
| TypeScript: Conditional Types | https://www.typescriptlang.org/docs/handbook/2/conditional-types.html |
| TypeScript: Type Guards | https://www.typescriptlang.org/docs/handbook/2/narrowing.html |
| TypeScript: Template Literal Types | https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| TypeScript Utility Types | https://youtu.be/2jM5l1QxE1g |
| Advanced TypeScript Patterns | https://youtu.be/4f5x1C3zBqE |
| Type Guards in TypeScript | https://youtu.be/0DdM6H1QjYM |
| Mapped Types Explained | https://youtu.be/2lXk2yPZ1d0 |

## 📝 Utility Types Cheatsheet

| Utility | Syntax | Example |
|---------|--------|---------|
| Partial | `Partial<T>` | `Partial<{ name: string }>` → `{ name?: string }` |
| Required | `Required<T>` | `Required<{ name?: string }>` → `{ name: string }` |
| Readonly | `Readonly<T>` | `Readonly<{ name: string }>` → `{ readonly name: string }` |
| Pick | `Pick<T, K>` | `Pick<User, 'id' | 'name'>` |
| Omit | `Omit<T, K>` | `Omit<User, 'password'>` |
| Record | `Record<K, V>` | `Record<string, number>` |
| Exclude | `Exclude<T, U>` | `Exclude<"a" | "b", "a">` → `"b"` |
| Extract | `Extract<T, U>` | `Extract<"a" | "b", "a">` → `"a"` |
| NonNullable | `NonNullable<T>` | `NonNullable<string | null>` → `string` |

## 📝 Type Guards Cheatsheet

### Built-in Guards

```typescript
// typeof
if (typeof value === "string") { }
if (typeof value === "number") { }
if (typeof value === "boolean") { }

// instanceof
if (value instanceof Date) { }
if (value instanceof Array) { }

// in
if ("property" in object) { }

// Array
if (Array.isArray(value)) { }
```

### Custom Guard
```typescript
function isUser(obj: any): obj is User {
    return obj && typeof obj.id === 'number';
}
```

## 📝 Mapped Types Cheatsheet

```typescript
// Basic
type Optional<T> = { [P in keyof T]?: T[P]; }

// Readonly
type Readonly<T> = { readonly [P in keyof T]: T[P]; }

// Pick
type Pick<T, K extends keyof T> = { [P in K]: T[P]; }

// Record
type Record<K extends keyof any, T> = { [P in K]: T; }
```

## 🎯 Common Patterns

### Update Function
```typescript
function updateEntity<T extends { id: number }>(
    items: T[], 
    id: number, 
    updates: Partial<T>
): T[] {
    return items.map(item => 
        item.id === id ? { ...item, ...updates } : item
    );
}
```

### Normalized State
```typescript
type NormalizedState<T extends { id: number }> = {
    byId: Record<string, T>;
    allIds: string[];
};
```

### Type-Safe Event System
```typescript
type EventMap = {
    userLogin: { userId: number; timestamp: Date };
    userLogout: { userId: number };
    dataUpdate: { data: any };
};

type Emit = <K extends keyof EventMap>(event: K, payload: EventMap[K]) => void;
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Type 'string' is not assignable to type 'never'` | Incompatible intersection | Check types being intersected |
| `Property 'X' does not exist on type 'Partial<T>'` | Optional property | Use optional chaining or check existence |
| `Type guard always returns true` | Wrong logic in guard | Fix the condition |
| `Cannot find name 'K'` | Generic not declared | Add `<T, K extends keyof T>` |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| TypeScript Deep Dive: Utility Types | https://basarat.gitbook.io/typescript/type-system/utility-types |
| Advanced TypeScript Patterns | https://www.typescriptlang.org/docs/handbook/advanced-types.html |
| TypeScript Template Literal Types | https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html |
| TypeScript Compiler API | https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API |

