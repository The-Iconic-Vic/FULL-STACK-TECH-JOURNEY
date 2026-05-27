import ToggleDemo from './components/ToggleDemo'
import LocalStorageDemo from './components/LocalStorageDemo'
import FetchDemo from './components/FetchDemo'
import DebounceDemo from './components/DebounceDemo'
import PreviousDemo from './components/PreviousDemo'
import IntervalDemo from './components/IntervalDemo'
import TimeoutDemo from './components/TimeoutDemo'
import EventListenerDemo from './components/EventListenerDemo'
import MediaQueryDemo from './components/MediaQueryDemo'
import CopyToClipboardDemo from './components/CopyToClipboardDemo'

function App() {
  return (
    <div className="container">
      <h1>🎣 Typing Custom Hooks</h1>
      <p className="subtitle">10 Reusable, Type-Safe Custom Hooks with TypeScript</p>
      
      <div className="grid">
        <ToggleDemo />
        <LocalStorageDemo />
        <FetchDemo />
        <DebounceDemo />
        <PreviousDemo />
        <IntervalDemo />
        <TimeoutDemo />
        <EventListenerDemo />
        <MediaQueryDemo />
        <CopyToClipboardDemo />
      </div>
    </div>
  )
}

export default App