import { useState } from 'react';
import './index.css';

import {
  Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Modal, ToastProvider, useToast,
  useToggle, useLocalStorage, useMediaQuery,
} from './lib/index';

import {
  Zap, Box, Type, LayoutGrid, Bell, Code2, Layers,
  Sun, Moon, Plus, Trash2, Save, User, Mail, Eye, EyeOff,
  ArrowRight, CheckCircle2, AlertCircle, AlertTriangle, Info,
  Keyboard, HardDrive, Monitor,
} from 'lucide-react';

// ─── Toast Buttons (inner component to access context) ───────────────────────

function ToastButtons() {
  const { addToast } = useToast();

  return (
    <div className="toastGrid">
      {(
        [
          { variant: 'info',    label: 'Info',    icon: <Info size={14} /> },
          { variant: 'success', label: 'Success', icon: <CheckCircle2 size={14} /> },
          { variant: 'warning', label: 'Warning', icon: <AlertTriangle size={14} /> },
          { variant: 'error',   label: 'Error',   icon: <AlertCircle size={14} /> },
        ] as const
      ).map(({ variant, label, icon }) => (
        <Button
          key={variant}
          variant={variant === 'error' ? 'danger' : variant === 'success' ? 'primary' : 'secondary'}
          size="sm"
          leftIcon={icon}
          onClick={() =>
            addToast({
              variant,
              message: `${label} notification`,
              description: `This is a ${variant} toast with auto-dismiss.`,
            })
          }
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('ui-theme', 'light');
  const isDark = theme === 'dark';
  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  // Sync theme attribute on first render
  useState(() => {
    document.documentElement.setAttribute('data-theme', theme);
  });

  // Hooks demo state
  const [isToggled, toggle, setToggle] = useToggle(false);
  const [storedName, setStoredName] = useLocalStorage<string>('demo-name', '');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  // Button loading demo
  const [isLoading, setIsLoading] = useState(false);
  const simulateLoad = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Input state
  const [inputVal, setInputVal] = useState('');
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [hasError, setHasError] = useState(false);

  // Modal
  const [isModalOpen, , setModalOpen] = useToggle(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');

  return (
    <ToastProvider position="top-right">
      <div className="app">
        {/* ── Header ── */}
        <header className="appHeader">
          <div className="headerLogo">
            <div className="logoBadge">
              <Layers size={14} />
            </div>
            IconicUI
          </div>
          <div className="headerActions">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {isMobile ? '📱 Mobile' : '🖥️ Desktop'}
            </span>
            <button
              className="themeToggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="heroBg" />
          <div className="heroEyebrow">
            <Zap size={12} />
            Type-Safe Component Library
          </div>
          <h1 className="heroTitle">
            Build beautiful UIs with{' '}
            <span className="heroGradient">IconicUI</span>
          </h1>
          <p className="heroSubtitle">
            A fully typed, accessible, and customizable React component library.
            5 production-ready components, 3 powerful custom hooks, CSS Modules, and auto-generated type declarations.
          </p>
          <div className="heroBadges">
            {['TypeScript', 'React 19', 'CSS Modules', 'Vite', 'Accessible', 'Dark Mode'].map((b) => (
              <span key={b} className="badge">
                {b}
              </span>
            ))}
          </div>
        </section>

        <main className="main">

          {/* ═══════════════════════════════════════════════════════
              1. BUTTON COMPONENT
          ═══════════════════════════════════════════════════════ */}
          <section className="section">
            <div className="sectionHeader">
              <div className="sectionIcon"><Box size={16} /></div>
              <div>
                <h2 className="sectionTitle">Button</h2>
                <p className="sectionDesc">Variants · Sizes · Loading State · Icons</p>
              </div>
            </div>

            <div className="grid">
              {/* Variants */}
              <div className="demoCard">
                <div className="demoCardHead">
                  <span className="demoLabel">Variants</span>
                </div>
                <div className="demoBody" style={{ flexWrap: 'wrap' }}>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="demoCard">
                <div className="demoCardHead">
                  <span className="demoLabel">Sizes</span>
                </div>
                <div className="demoBody">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Icons & Loading */}
              <div className="demoCard">
                <div className="demoCardHead">
                  <span className="demoLabel">Icons & Loading</span>
                </div>
                <div className="demoBody" style={{ flexWrap: 'wrap' }}>
                  <Button leftIcon={<Plus size={15} />}>Add Item</Button>
                  <Button variant="danger" leftIcon={<Trash2 size={15} />}>Delete</Button>
                  <Button variant="outline" rightIcon={<ArrowRight size={15} />}>Next</Button>
                  <Button
                    isLoading={isLoading}
                    leftIcon={<Save size={15} />}
                    onClick={simulateLoad}
                    variant="primary"
                  >
                    {isLoading ? 'Saving…' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>

            <pre className="codeBlock" style={{ marginTop: '1rem' }}>{`import { Button } from './lib';

<Button variant="primary" size="md" isLoading={false}>
  Save Changes
</Button>

<Button variant="danger" leftIcon={<Trash2 />}>
  Delete
</Button>`}</pre>
          </section>

          {/* ═══════════════════════════════════════════════════════
              2. INPUT COMPONENT
          ═══════════════════════════════════════════════════════ */}
          <section className="section">
            <div className="sectionHeader">
              <div className="sectionIcon"><Type size={16} /></div>
              <div>
                <h2 className="sectionTitle">Input</h2>
                <p className="sectionDesc">Labels · Helper Text · Error State · Icons</p>
              </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              <div className="demoCard">
                <div className="demoCardHead"><span className="demoLabel">Basic Label</span></div>
                <div className="demoBody demoBodyColumn" style={{ padding: '1.25rem 1.5rem' }}>
                  <Input label="Full Name" placeholder="John Doe" />
                </div>
              </div>

              <div className="demoCard">
                <div className="demoCardHead"><span className="demoLabel">With Icons</span></div>
                <div className="demoBody demoBodyColumn" style={{ padding: '1.25rem 1.5rem', gap: '1rem' }}>
                  <Input label="Email" type="email" leftIcon={<Mail size={15} />} placeholder="you@example.com" />
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    leftIcon={<User size={15} />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--text-muted)', padding: 0 }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="demoCard">
                <div className="demoCardHead"><span className="demoLabel">Error & Helper</span></div>
                <div className="demoBody demoBodyColumn" style={{ padding: '1.25rem 1.5rem', gap: '1rem' }}>
                  <Input
                    label="Username"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setHasError(e.target.value.length > 0 && e.target.value.length < 3);
                    }}
                    error={hasError ? 'Username must be at least 3 characters' : undefined}
                    helperText={!hasError ? 'Must be at least 3 characters' : undefined}
                    placeholder="cooluser"
                  />
                </div>
              </div>
            </div>

            <pre className="codeBlock" style={{ marginTop: '1rem' }}>{`import { Input } from './lib';

<Input
  label="Email"
  type="email"
  leftIcon={<Mail />}
  error="Invalid email address"
  helperText="We'll never share your email."
/>`}</pre>
          </section>

          {/* ═══════════════════════════════════════════════════════
              3. CARD COMPONENT
          ═══════════════════════════════════════════════════════ */}
          <section className="section">
            <div className="sectionHeader">
              <div className="sectionIcon"><LayoutGrid size={16} /></div>
              <div>
                <h2 className="sectionTitle">Card</h2>
                <p className="sectionDesc">Header · Content · Footer slots · Glass & Hoverable</p>
              </div>
            </div>

            <div className="grid">
              <Card hoverable>
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>With header, content, and footer slots. Hover to lift!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Cards are versatile containers. Use sub-components for structured layouts with consistent spacing.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="primary">Learn More</Button>
                  <Button size="sm" variant="ghost">Dismiss</Button>
                </CardFooter>
              </Card>

              <Card glass hoverable>
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                  <CardDescription>Glassmorphism styling with backdrop blur</CardDescription>
                </CardHeader>
                <CardContent>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Apply <code style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0 4px', borderRadius: '4px' }}>glass</code> prop for a frosted-glass aesthetic.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compact Card</CardTitle>
                  <CardDescription>Without hoverable — static layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {['TypeScript', 'CSS Modules', 'Accessible'].map((tag) => (
                      <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <pre className="codeBlock" style={{ marginTop: '1rem' }}>{`import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './lib';

<Card hoverable glass>
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
    <CardDescription>Frosted glass effect</CardDescription>
  </CardHeader>
  <CardContent>Your content here</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>`}</pre>
          </section>

          {/* ═══════════════════════════════════════════════════════
              4. MODAL COMPONENT
          ═══════════════════════════════════════════════════════ */}
          <section className="section">
            <div className="sectionHeader">
              <div className="sectionIcon"><Keyboard size={16} /></div>
              <div>
                <h2 className="sectionTitle">Modal</h2>
                <p className="sectionDesc">Portal · Focus Trap · Backdrop · Escape Key · Sizes</p>
              </div>
            </div>

            <Card>
              <CardContent>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {(['sm', 'md', 'lg'] as const).map((s) => (
                    <Button
                      key={s}
                      variant={modalSize === s ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => { setModalSize(s); openModal(); }}
                    >
                      Open {s.toUpperCase()} Modal
                    </Button>
                  ))}
                </div>
                <div className="divider" />
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  ✅ Rendered via <strong>React Portal</strong> · ✅ <strong>Focus Trap</strong> (Tab key stays inside) ·
                  ✅ Press <kbd style={{ background: 'var(--secondary-light)', border: '1px solid var(--surface-border)', padding: '1px 5px', borderRadius: '4px', fontSize: '0.8em' }}>Esc</kbd> to dismiss ·
                  ✅ Scroll-locked body · ✅ Backdrop blur
                </p>
              </CardContent>
            </Card>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Confirm Deletion"
              size={modalSize}
              footer={
                <>
                  <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                  <Button variant="danger" onClick={closeModal} leftIcon={<Trash2 size={14} />}>Delete</Button>
                </>
              }
            >
              <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.
              </p>
              <Card style={{ background: 'var(--danger-light)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <CardContent>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.875rem' }}>
                    <AlertCircle size={15} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--danger)', fontWeight: 500 }}>Warning: This action is irreversible.</span>
                  </div>
                </CardContent>
              </Card>
            </Modal>

            <pre className="codeBlock" style={{ marginTop: '1rem' }}>{`import { Modal, useToggle } from './lib';

const [isOpen, , setOpen] = useToggle();

<Modal
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  title="Confirm Deletion"
  size="md"
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  Modal content here…
</Modal>`}</pre>
          </section>

          {/* ═══════════════════════════════════════════════════════
              5. TOAST COMPONENT
          ═══════════════════════════════════════════════════════ */}
          <section className="section">
            <div className="sectionHeader">
              <div className="sectionIcon"><Bell size={16} /></div>
              <div>
                <h2 className="sectionTitle">Toast</h2>
                <p className="sectionDesc">Context Provider · Variants · Auto-dismiss · Pause on Hover · Progress Bar</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fire a Notification</CardTitle>
                <CardDescription>Toasts stack in the top-right. Hover to pause auto-dismiss.</CardDescription>
              </CardHeader>
              <CardContent>
                <ToastButtons />
              </CardContent>
            </Card>

            <pre className="codeBlock" style={{ marginTop: '1rem' }}>{`import { ToastProvider, useToast } from './lib';

// Wrap your app:
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Use anywhere inside:
const { addToast } = useToast();
addToast({
  variant: 'success',
  message: 'Changes saved!',
  description: 'Your profile has been updated.',
  duration: 4000,
});`}</pre>
          </section>

          {/* ═══════════════════════════════════════════════════════
              6. CUSTOM HOOKS
          ═══════════════════════════════════════════════════════ */}
          <section className="section">
            <div className="sectionHeader">
              <div className="sectionIcon"><Code2 size={16} /></div>
              <div>
                <h2 className="sectionTitle">Custom Hooks</h2>
                <p className="sectionDesc">useToggle · useLocalStorage · useMediaQuery</p>
              </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>

              {/* useToggle */}
              <div className="hookPanel">
                <h3 className="hookTitle">
                  <Code2 size={15} />
                  <span className="hookMono">useToggle</span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                  Manages a boolean toggle with type-safe state and a stable toggle callback.
                </p>
                <div className="hookOutput">
                  <span>value:</span>
                  <span className="hookOutputValue">{String(isToggled)}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.625rem' }}>
                  <Button size="sm" variant={isToggled ? 'primary' : 'secondary'} onClick={toggle}>
                    Toggle ({isToggled ? 'ON' : 'OFF'})
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setToggle(false)}>
                    Reset
                  </Button>
                </div>
              </div>

              {/* useLocalStorage */}
              <div className="hookPanel">
                <h3 className="hookTitle">
                  <HardDrive size={15} />
                  <span className="hookMono">useLocalStorage</span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                  Persists state to <code style={{ fontFamily: 'monospace' }}>localStorage</code>. Reload the page — your name stays!
                </p>
                <Input
                  placeholder="Type your name…"
                  value={storedName}
                  onChange={(e) => setStoredName(e.target.value)}
                  leftIcon={<User size={14} />}
                />
                <div className="hookOutput">
                  <span>Stored value:</span>
                  <span className="hookOutputValue">"{storedName || '—'}"</span>
                </div>
              </div>

              {/* useMediaQuery */}
              <div className="hookPanel">
                <h3 className="hookTitle">
                  <Monitor size={15} />
                  <span className="hookMono">useMediaQuery</span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                  Evaluates CSS media queries reactively. Resize the window to see it update!
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div className="hookOutput">
                    <span>(max-width: 768px):</span>
                    <span className="hookOutputValue">{String(isMobile)}</span>
                  </div>
                  <div className="hookOutput">
                    <span>prefers-color-scheme: dark:</span>
                    <span className="hookOutputValue">{String(prefersDark)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ── Footer ── */}
        <footer className="appFooter">
          <p>
            <strong>IconicUI</strong> — Type-Safe React Component Library ·{' '}
            Built with <span style={{ color: 'var(--danger)' }}>♥</span> using TypeScript, CSS Modules & Vite
          </p>
        </footer>
      </div>
    </ToastProvider>
  );
}
