# E-Commerce Type System - Day 52 Project

## Project Overview
A TypeScript e-commerce type system demonstrating interfaces, type aliases, and type composition.

## Key Concepts Demonstrated

### Interfaces
- Interface declaration and properties
- Extending interfaces (inheritance)
- Optional properties (`?`)
- Readonly properties

### Type Aliases
- Union types (`|`)
- Intersection types (`&`)
- Primitive type aliases
- Tuple types
- Function type aliases

### Type Composition
- Interface extending interface
- Type intersection combining types
- Union types for status values

## Type Definitions

| Type | Description |
|------|-------------|
| `Person` | Base person interface |
| `Customer` | Extends Person with order history |
| `Product` | Product interface with readonly id |
| `CartItem` | Extends Product with quantity |
| `Order` | Order with status union type |
| `OrderStatus` | Union type: 'pending' \| 'shipped' \| 'delivered' \| 'cancelled' |
| `DiscountedProduct` | Intersection type (Product & discount) |

## Interface vs Type Alias

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Extends | ✅ (`extends`) | ✅ (`&`) |
| Implements | ✅ | ✅ |
| Declaration merging | ✅ | ❌ |
| Unions | ❌ | ✅ |
| Primitives | ❌ | ✅ |
| Tuples | ❌ | ✅ |
| Function types | ✅ | ✅ |

## Setup Instructions

```bash
cd day-52-ecommerce-type-system
npm install
npm run dev
Key TypeScript Features Used
typescript
// Interface with readonly and optional
interface Product {
  readonly id: number;
  name: string;
  description?: string;
}

// Interface extending
interface Customer extends Person {
  loyaltyPoints: number;
  tier?: 'bronze' | 'silver' | 'gold';
}

// Type alias for union
type OrderStatus = 'pending' | 'shipped' | 'delivered';

// Type alias for intersection
type DiscountedProduct = Product & { discount: number };

// Type alias for tuple
type Coordinates = [number, number];
Project Structure
text
src/
├── types/
│   └── index.ts          # All type definitions
├── data/
│   └── sampleData.ts     # Sample data with types
├── components/
│   ├── ProductList.tsx
│   ├── OrderSummary.tsx
│   ├── CustomerProfile.tsx
│   └── TypeDemo.tsx
├── App.tsx
└── main.tsx