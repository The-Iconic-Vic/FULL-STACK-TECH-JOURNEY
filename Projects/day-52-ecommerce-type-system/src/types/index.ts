// ============================================
// INTERFACES
// ============================================

// Base Person interface
export interface Person {
  readonly id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Extending Person interface
export interface Customer extends Person {
  orderHistory: number[];  // Array of order IDs
  loyaltyPoints: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';  // Optional with union
}

// Product interface
export interface Product {
  readonly id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description?: string;  // Optional property
}

// CartItem interface (extends Product with quantity)
export interface CartItem extends Product {
  quantity: number;
}

// Order interface
export interface Order {
  readonly id: number;
  customerId: number;
  items: CartItem[];
  status: OrderStatus;
  createdAt: Date;
  shippedAt?: Date;  // Optional - only set when shipped
  deliveredAt?: Date; // Optional - only set when delivered
}

// ============================================
// TYPE ALIASES
// ============================================

// Union type for order status
export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

// Union type for product categories
export type ProductCategory = 'electronics' | 'clothing' | 'books' | 'home' | 'beauty';

// Intersection type example
export type DiscountedProduct = Product & {
  discountPercentage: number;
  discountedPrice: number;
};

// Type alias for primitive (can't do with interface)
export type UserID = string | number;

// Type alias for tuple
export type Coordinates = [number, number];

// Type alias for function signature
export type CalculateTotal = (items: CartItem[]) => number;

// Type alias for union of string literals
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

// ============================================
// FUNCTIONS WITH TYPES
// ============================================

// Calculate order total
export const calculateOrderTotal: CalculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Format currency
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// Get order status badge class
export function getStatusClass(status: OrderStatus): string {
  switch(status) {
    case 'pending': return 'status-pending';
    case 'shipped': return 'status-shipped';
    case 'delivered': return 'status-delivered';
    case 'cancelled': return 'status-cancelled';
  }
}

// Find product by ID
export function findProductById(products: Product[], id: number): Product | undefined {
  return products.find(p => p.id === id);
}

// Get customer tier based on loyalty points
export function getCustomerTier(points: number): Customer['tier'] {
  if (points >= 5000) return 'platinum';
  if (points >= 2000) return 'gold';
  if (points >= 500) return 'silver';
  if (points >= 100) return 'bronze';
  return undefined;
}