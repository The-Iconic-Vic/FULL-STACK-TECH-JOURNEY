import FormValidator from './components/FormValidator'
import ValidationDemo from './components/ValidationDemo'
import ShapeAreaDemo from './components/ShapeAreaDemo'

function App() {
  return (
    <div className="container">
      <h1>🔧 TypeScript Form Validator</h1>
      <p className="subtitle">Demonstrating Union, Intersection & Literal Types</p>
      
      <div className="grid">
        <FormValidator />
        <div>
          <ValidationDemo />
          <ShapeAreaDemo />
        </div>
      </div>
    </div>
  )
}

export default App