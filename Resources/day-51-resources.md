# 📚 Day 51 Resources - Arrays, Objects & Functions

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| TypeScript: Arrays | https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays |
| TypeScript: Tuples | https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types |
| TypeScript: Object Types | https://www.typescriptlang.org/docs/handbook/2/objects.html |
| TypeScript: Type Aliases | https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases |
| TypeScript: Functions | https://www.typescriptlang.org/docs/handbook/2/functions.html |
| TypeScript: More on Functions | https://www.typescriptlang.org/docs/handbook/2/functions.html |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| TypeScript Arrays & Tuples | https://youtu.be/0DdM6H1QjYM |
| TypeScript Objects & Types | https://youtu.be/IOpJZkQ7E1s |
| TypeScript Functions Tutorial | https://youtu.be/6Uj6iSmNuwU |
| TypeScript Type Aliases vs Interfaces | https://youtu.be/oiN87KxQhbs |

## 📝 Arrays Cheatsheet

| Syntax | Description |
|--------|-------------|
| `string[]` | Array of strings |
| `Array<number>` | Array of numbers (generic) |
| `readonly string[]` | Immutable array |
| `(string \| number)[]` | Mixed types array |
| `[string, number]` | Tuple (fixed length) |
| `[string, number?]` | Tuple with optional |
| `[string, ...number[]]` | Tuple with rest |

## 📝 Objects Cheatsheet

| Syntax | Description |
|--------|-------------|
| `{ name: string }` | Inline object type |
| `type User = { name: string }` | Type alias |
| `age?: number` | Optional property |
| `readonly id: number` | Readonly property |
| `[key: string]: string` | Index signature |

## 📝 Functions Cheatsheet

| Syntax | Description |
|--------|-------------|
| `function fn(p: string): number` | Regular function |
| `const fn = (p: string): number => {}` | Arrow function |
| `age?: number` | Optional parameter |
| `age: number = 18` | Default parameter |
| `...rest: number[]` | Rest parameter |
| `type Callback = (data: string) => void` | Function type |

## ✅ Type Aliases vs Interfaces

| Feature | Type Alias | Interface |
|---------|------------|-----------|
| Primitives | ✅ | ❌ |
| Unions | ✅ | ❌ |
| Tuples | ✅ | ❌ |
| Declaration merging | ❌ | ✅ |
| Extends | `&` | `extends` |
| Implements | ✅ | ✅ |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Property 'push' does not exist on type 'readonly string[]'` | Using readonly array | Remove readonly or use non-mutating methods |
| `Tuple type '[string, number]' of length 2 has no element at index 2` | Accessing beyond tuple length | Check index is within bounds |
| `Property 'email' does not exist on type '{ name: string; age: number; }'` | Missing property in type | Add property to type definition |
| `Argument of type 'number' is not assignable to parameter of type 'string'` | Wrong parameter type | Fix the argument type |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| TypeScript Deep Dive: Arrays | https://basarat.gitbook.io/typescript/type-system/arrays |
| Advanced TypeScript Types | https://www.typescriptlang.org/docs/handbook/advanced-types.html |
| TypeScript Utility Types | https://www.typescriptlang.org/docs/handbook/utility-types.html |
| TypeScript Function Overloads | https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads |

