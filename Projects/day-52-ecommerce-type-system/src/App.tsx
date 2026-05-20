// React import not required with the new JSX transform
import ProductList from './components/ProductList'
import OrderSummary from './components/OrderSummary'
import CustomerProfile from './components/CustomerProfile'
import TypeDemo from './components/TypeDemo'
import { sampleProducts, sampleOrders, sampleCustomer } from './data/sampleData'

function App() {
  return (
    <div className="container">
      <h1>🛍️ TypeScript E-Commerce Type System</h1>
      <p className="subtitle">Demonstrating Interfaces, Type Aliases, and Type Composition</p>
      
      <div className="grid">
        <ProductList products={sampleProducts} />
        <OrderSummary orders={sampleOrders} />
        <CustomerProfile customer={sampleCustomer} />
      </div>
      
      <TypeDemo />
    </div>
  )
}

export default App