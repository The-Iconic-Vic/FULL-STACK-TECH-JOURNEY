import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

/** Toast notification severity */
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

/** Screen position where toasts stack */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastItem {
  /** Unique identifier for the toast */
  id: string;
  /** Main notification message */
  message: string;
  /** Optional secondary description */
  description?: string;
  /** Visual variant controlling icon and color @default 'info' */
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms. Set to 0 to disable @default 4000 */
  duration?: number;
}

export interface AddToastOptions extends Omit<ToastItem, 'id'> {}

interface ToastContextValue {
  /** Add a new toast notification */
  addToast: (options: AddToastOptions) => string;
  /** Dismiss a toast by its ID */
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Individual Toast Item ───────────────────────────────────────────────────

const ICONS: Record<ToastVariant, React.ReactNode> = {
  info: <Info size={17} />,
  success: <CheckCircle2 size={17} />,
  warning: <AlertTriangle size={17} />,
  error: <AlertCircle size={17} />,
};

interface ToastItemComponentProps extends ToastItem {
  onRemove: (id: string) => void;
}

function ToastItemComponent({ id, message, description, variant = 'info', duration = 4000, onRemove }: ToastItemComponentProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(() => onRemove(id), duration);
  }, [duration, id, onRemove]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Start auto-dismiss timer on mount
  React.useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  return (
    <div
      className={[styles.toast, styles[variant]].join(' ')}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <span className={styles.icon}>{ICONS[variant]}</span>
      <div className={styles.toastBody}>
        <p className={styles.message}>{message}</p>
        {description && <p className={styles.toastDesc}>{description}</p>}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        className={styles.dismissBtn}
        onClick={() => onRemove(id)}
      >
        <X size={14} />
      </button>
      {duration > 0 && (
        <div
          className={styles.progressBar}
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
}

// ─── Toast Provider ──────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default screen position for toasts @default 'top-right' */
  position?: ToastPosition;
}

/**
 * Wraps the app to provide toast notification capability.
 * Use `useToast()` inside any child to trigger toasts.
 *
 * @example
 * <ToastProvider position="bottom-right">
 *   <App />
 * </ToastProvider>
 */
export function ToastProvider({ children, position = 'top-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((options: AddToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, ...options }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        className={[styles.container, styles[position.replace('-', '_') as keyof typeof styles]].join(' ')}
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastItemComponent key={toast.id} {...toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── useToast Hook ───────────────────────────────────────────────────────────

/**
 * Hook to access toast controls. Must be used inside a `<ToastProvider>`.
 *
 * @returns An object with `addToast` and `removeToast` functions.
 *
 * @example
 * const { addToast } = useToast();
 * addToast({ message: 'Saved!', variant: 'success' });
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}
