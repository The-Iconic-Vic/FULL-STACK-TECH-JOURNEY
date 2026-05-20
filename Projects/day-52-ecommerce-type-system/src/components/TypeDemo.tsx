import React from 'react'
import { DiscountedProduct, formatPrice } from '../types'
import { sampleProducts } from '../data/sampleData'

const TypeDemo: React.FC = () => {
  // Demonstrating intersection type
  const discountedProduct: DiscountedProduct = {
    ...sampleProducts[0],
    discountPercentage: 20,
    discountedPrice: sampleProducts[0].price * 0.8
  }

  // Demonstrating union type
  let userId: string | number = "user_123";
  const numericId: string | number = 456;

  // Demonstrating tuple
  const coordinates: [number, number] = [40.7128, -74.0060];

  // Demonstrating type alias usage
  const sortOptions: { value: string; label: string }[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h2>🔧 TypeScript Type System Demo</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Interface Extending</h3>
        <pre style={{ background: '#f0f0f0', padding: '0.5rem', borderRadius: '8px', fontSize: '0.7rem', overflow: 'auto' }}>
{`interface Person {
  name: string;
  age: number;
}

interface Customer extends Person {
  orderHistory: number[];
  loyaltyPoints: number;
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Type Aliases (Unions & Intersections)</h3>
        <pre style={{ background: '#f0f0f0', padding: '0.5rem', borderRadius: '8px', fontSize: '0.7rem', overflow: 'auto' }}>
{`type Status = "pending" | "shipped" | "delivered";
type UserID = string | number;
type DiscountedProduct = Product & { discount: number; }`}
        </pre>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Intersection Type Example</h3>
        <div style={{ background: '#e8f4fd', padding: '0.75rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem' }}>
            <strong>{discountedProduct.name}</strong><br />
            Original: {formatPrice(discountedProduct.price)}<br />
            Discount: {discountedProduct.discountPercentage}% OFF<br />
            <span style={{ color: '#28a745' }}>Sale Price: {formatPrice(discountedProduct.discountedPrice)}</span>
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Union Type Example</h3>
        <div style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>
            User ID (string): {userId}<br />
            User ID (number): {numericId}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sort Options Example</h3>
        <div style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '8px' }}>
          <ul style={{ fontSize: '0.8rem', margin: 0, paddingLeft: '1rem' }}>
            {sortOptions.map((option) => (
              <li key={option.value}>{option.label} ({option.value})</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Tuple Example</h3>
        <div style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '8px' }}>
          <code style={{ fontSize: '0.7rem' }}>
            Coordinates: [{coordinates[0]}, {coordinates[1]}]
          </code>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Type vs Interface Comparison</h3>
        <pre style={{ background: '#f0f0f0', padding: '0.5rem', borderRadius: '8px', fontSize: '0.7rem', overflow: 'auto' }}>
{`// Interface (extends, declaration merging)
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// Type (unions, primitives, tuples)
type ID = string | number;
type Point = [number, number];
type Callback = (data: string) => void;`}
        </pre>
      </div>
    </div>
  )
}

export default TypeDemo