import React from 'react'
import { Customer } from '../types'

interface CustomerProfileProps {
  customer: Customer
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const getTierBadge = (tier?: string): string => {
    switch(tier) {
      case 'platinum': return '💎 Platinum';
      case 'gold': return '🥇 Gold';
      case 'silver': return '🥈 Silver';
      case 'bronze': return '🥉 Bronze';
      default: return 'No tier';
    }
  }

  return (
    <div className="card">
      <h2>👤 Customer Profile</h2>
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>{customer.name}</strong></p>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>{customer.email}</p>
        <p style={{ fontSize: '0.75rem', color: '#999' }}>Member since: {formatDate(customer.createdAt)}</p>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Loyalty Points:</span>
          <strong>{customer.loyaltyPoints}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          <span>Tier:</span>
          <strong>{getTierBadge(customer.tier)}</strong>
        </div>
      </div>
      
      <div>
        <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
          Order History: {customer.orderHistory.length} orders
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {customer.orderHistory.map(orderId => (
            <span key={orderId} className="badge" style={{ background: '#e9ecef', color: '#333' }}>
              #{orderId}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile