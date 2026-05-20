import React from 'react'
import { Order, calculateOrderTotal, formatPrice, getStatusClass } from '../types'

interface OrderSummaryProps {
  orders: Order[]
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orders }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="card">
      <h2>📋 Recent Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="order-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Order #{order.id}</strong>
            <span className={`badge ${getStatusClass(order.status)}`}>
              {order.status.toUpperCase()}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
            Placed: {formatDate(order.createdAt)}
            {order.shippedAt && ` • Shipped: ${formatDate(order.shippedAt)}`}
          </div>
          <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
            {order.items.map(item => (
              <div key={item.id}>
                {item.quantity}x {item.name} ({formatPrice(item.price)} each)
              </div>
            ))}
          </div>
          <div className="order-total">
            Total: {formatPrice(calculateOrderTotal(order.items))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderSummary