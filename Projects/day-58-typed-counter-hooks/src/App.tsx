import TypedCounter from './components/TypedCounter'
import AutoCounter from './components/AutoCounter'
import TypedFormWrapper from './components/TypedForm'

function App() {
  return (
    <div className="container">
      <h1>🔧 Typed React Hooks</h1>
      <p className="subtitle">Demonstrating useReducer, useRef, useImperativeHandle with TypeScript</p>
      
      <div className="grid">
        <TypedCounter />
        <AutoCounter />
        <TypedFormWrapper />
      </div>
    </div>
  )
}

export default App