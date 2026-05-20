import { Product, Order, Customer, CartItem } from '../types';

// Sample Products
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "electronics",
    inStock: true,
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 129.99,
    category: "electronics",
    inStock: true,
    description: "RGB mechanical keyboard with blue switches"
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    price: 19.99,
    category: "clothing",
    inStock: false,
    description: "100% cotton comfortable t-shirt"
  },
  {
    id: 4,
    name: "JavaScript: The Good Parts",
    price: 29.99,
    category: "books",
    inStock: true
  },
  {
    id: 5,
    name: "Desk Lamp",
    price: 34.99,
    category: "home",
    inStock: true
  }
];

// Helper to create cart items from products
function createCartItem(product: Product, quantity: number): CartItem {
  return { ...product, quantity };
}

// Sample Orders
export const sampleOrders: Order[] = [
  {
    id: 1001,
    customerId: 1,
    items: [
      createCartItem(sampleProducts[0], 1),
      createCartItem(sampleProducts[1], 1)
    ],
    status: 'delivered',
    createdAt: new Date('2026-05-15'),
    shippedAt: new Date('2026-05-16'),
    deliveredAt: new Date('2026-05-18')
  },
  {
    id: 1002,
    customerId: 1,
    items: [
      createCartItem(sampleProducts[3], 2)
    ],
    status: 'shipped',
    createdAt: new Date('2026-05-18'),
    shippedAt: new Date('2026-05-19')
  },
  {
    id: 1003,
    customerId: 1,
    items: [
      createCartItem(sampleProducts[4], 1)
    ],
    status: 'pending',
    createdAt: new Date('2026-05-20')
  }
];

// Sample Customer
export const sampleCustomer: Customer = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  createdAt: new Date('2025-01-15'),
  orderHistory: [1001, 1002, 1003],
  loyaltyPoints: 1250,
  tier: 'gold'
};