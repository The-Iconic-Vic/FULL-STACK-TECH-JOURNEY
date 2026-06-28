import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

/** Width size presets for the modal dialog */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Controls visibility of the modal */
  isOpen: boolean;
  /** Callback fired when the modal requests to close */
  onClose: () => void;
  /** Optional title rendered in the header bar */
  title?: string;
  /** Modal width size preset @default 'md' */
  size?: ModalSize;
  /** Whether clicking the backdrop dismisses the modal @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape dismisses the modal @default true */
  closeOnEscape?: boolean;
  /** Content rendered inside the modal body */
  children?: React.ReactNode;
  /** Content rendered in a sticky footer below the body */
  footer?: React.ReactNode;
  /** Optional extra class for the dialog element */
  className?: string;
}

/**
 * Modal dialog rendered via React Portal with backdrop, focus trap, and animation.
 *
 * @example
 * const [isOpen, toggle] = useToggle();
 * <Modal isOpen={isOpen} onClose={toggle} title="Confirm action" size="md">
 *   <p>Are you sure?</p>
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  footer,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save focus before opening, restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Move focus into dialog on next tick
      requestAnimationFrame(() => {
        dialogRef.current?.focus();
      });
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0', 10));
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (closeOnEscape && e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }

      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      }
    },
    [closeOnEscape, onClose]
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={[styles.dialog, styles[size], className ?? ''].filter(Boolean).join(' ')}
      >
        {/* Header */}
        {(title != null) && (
          <div className={styles.header}>
            <h2 id="modal-title" className={styles.title}>{title}</h2>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className={styles.closeBtn}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    modalRoot
  );
}
