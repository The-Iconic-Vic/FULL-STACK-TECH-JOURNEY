# 📚 Day 50 Resources - TypeScript Introduction & Setup

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| TypeScript Official Docs | https://www.typescriptlang.org/docs/ |
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook/intro.html |
| TypeScript Basic Types | https://www.typescriptlang.org/docs/handbook/basic-types.html |
| TypeScript in React | https://www.typescriptlang.org/docs/handbook/react-&-webpack.html |
| Vite + TypeScript | https://vitejs.dev/guide/features.html#typescript |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| TypeScript Crash Course | https://youtu.be/d56mG7DezGs |
| TypeScript for React Developers | https://youtu.be/5Z2yu0m8w5Y |
| TypeScript Basics in 30 Minutes | https://youtu.be/ahCwqrYpIuM |
| TypeScript Fundamentals | https://youtu.be/ahCwqrYpIuM |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| TypeScript Playground | Try TypeScript online | https://www.typescriptlang.org/play |
| Vite | Build tool with TS support | https://vitejs.dev |
| TSConfig Generator | Generate tsconfig.json | https://www.typescriptlang.org/tsconfig |
| TypeScript Deep Dive | Free online book | https://basarat.gitbook.io/typescript/ |

## 📝 TypeScript Cheatsheet

### Basic Types
```typescript
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let n: null = null;
let u: undefined = undefined;
let anyValue: any = "anything";
let unknownValue: unknown = "must check before use";
```

### Type Inference
```typescript
let inferredString = "hello";  // TypeScript knows this is string
let inferredNumber = 42;        // TypeScript knows this is number
```

### Functions
```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

### Interfaces
```typescript
interface User {
    name: string;
    age: number;
    email?: string;  // optional
}
```

### React Component
```tsx
interface Props {
    name: string;
    onAction?: () => void;
}

const Component = ({ name, onAction }: Props) => {
    return <div>{name}</div>;
};
```

## ✅ TypeScript vs JavaScript Comparison

| Feature | JavaScript | TypeScript |
|---------|------------|------------|
| Type checking | Runtime | Compile-time |
| Error discovery | When code runs | While typing |
| IDE support | Basic | Excellent |
| Learning curve | Easy | Moderate |
| Compilation required | No | Yes (tsc) |
| Industry adoption | Universal | 80%+ of large React apps |

## 🐛 Common TypeScript Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Type 'number' is not assignable to type 'string'` | Wrong type assignment | Fix the value or change the type |
| `Object is possibly 'null'` | Variable might be null | Add null check (`if (obj)`) |
| `Property 'x' does not exist on type 'Y'` | Object missing property | Add property to type definition |
| `Cannot find name 'React'` | Missing import | Add `import React from 'react'` |
| `Binding element 'X' implicitly has an 'any' type` | Missing type annotation | Add type to parameter |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| TypeScript Deep Dive | https://basarat.gitbook.io/typescript/ |
| React TypeScript Cheatsheet | https://react-typescript-cheatsheet.netlify.app/ |
| TypeScript Design Patterns | https://refactoring.guru/design-patterns/typescript |
| TypeScript Roadmap | https://github.com/microsoft/TypeScript/wiki/Roadmap |

