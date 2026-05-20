import React from 'react'
import { Product, formatPrice } from '../types'

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="card">
      <h2>📦 Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="product-name">{product.name}</span>
            <span className="product-price">{formatPrice(product.price)}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
            {product.category} • 
            <span className={product.inStock ? 'badge badge-instock' : 'badge badge-outstock'} style={{ marginLeft: '0.5rem' }}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          {product.description && (
            <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.25rem' }}>
              {product.description}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProductList