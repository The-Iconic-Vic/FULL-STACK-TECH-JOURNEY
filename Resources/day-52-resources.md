# 📚 Day 52 Resources - Interfaces & Type Aliases

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| TypeScript: Interfaces | https://www.typescriptlang.org/docs/handbook/2/objects.html |
| TypeScript: Type Aliases | https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases |
| TypeScript: Extending Types | https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types |
| TypeScript: Classes & Interfaces | https://www.typescriptlang.org/docs/handbook/2/classes.html |
| TypeScript: Declaration Merging | https://www.typescriptlang.org/docs/handbook/declaration-merging.html |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| TypeScript Interfaces Tutorial | https://youtu.be/IOpJZkQ7E1s |
| Type Aliases vs Interfaces | https://youtu.be/oiN87KxQhbs |
| Extending Types in TypeScript | https://youtu.be/4f5x1C3zBqE |
| Advanced TypeScript Types | https://youtu.be/2jM5l1QxE1g |

## 📝 Interfaces Cheatsheet

### Basic Interface
```typescript
interface Person {
    name: string;
    age: number;
    email?: string;     // optional
    readonly id: number; // readonly
}
```

### Extending
```typescript
interface Employee extends Person {
    employeeId: string;
}

interface Manager extends Employee, Contact { }
```

### Index Signature
```typescript
interface Dictionary {
    [key: string]: string;
}
```

### Function Interface
```typescript
interface Greet {
    (name: string): string;
}
```

## 📝 Type Aliases Cheatsheet

### Primitives
```typescript
type UserID = string | number;
type Status = "pending" | "active" | "completed";
```

### Tuples
```typescript
type Point = [number, number];
type RGB = [number, number, number];
```

### Intersection
```typescript
type Person = { name: string } & { age: number };
```

### Function
```typescript
type Callback = (data: string) => void;
```

## ✅ Interface vs Type Alias Comparison

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration merging | ✅ | ❌ |
| Extends syntax | `extends` | `&` |
| Primitives | ❌ | ✅ |
| Unions | ❌ | ✅ |
| Tuples | ❌ | ✅ |
| Function types | ✅ | ✅ |
| Implements in class | ✅ | ✅ |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| TypeScript Deep Dive: Interfaces | https://basarat.gitbook.io/typescript/type-system/interfaces |
| Advanced TypeScript Types | https://www.typescriptlang.org/docs/handbook/advanced-types.html |
| Mapped Types | https://www.typescriptlang.org/docs/handbook/2/mapped-types.html |
| Conditional Types | https://www.typescriptlang.org/docs/handbook/2/conditional-types.html |

