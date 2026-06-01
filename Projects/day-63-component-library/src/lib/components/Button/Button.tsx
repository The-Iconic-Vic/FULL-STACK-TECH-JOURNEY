import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

/** Visual style variant of the button */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

/** Size of the button */
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant @default 'primary' */
  variant?: ButtonVariant;
  /** Size of the button @default 'md' */
  size?: ButtonSize;
  /** Shows a loading spinner and disables interaction @default false */
  isLoading?: boolean;
  /** Icon rendered before the label text */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label text */
  rightIcon?: React.ReactNode;
  /** Makes the button fill its container width */
  fullWidth?: boolean;
}

/**
 * Button component with multiple variants, sizes, loading states, and icon support.
 *
 * @example
 * <Button variant="primary" size="md" isLoading={false}>Submit</Button>
 * <Button variant="outline" leftIcon={<PlusIcon />}>Add Item</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      isLoading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={styles.spinner} aria-hidden="true" />
        ) : (
          leftIcon && <span className={styles.icon}>{leftIcon}</span>
        )}
        {children && <span className={styles.label}>{children}</span>}
        {!isLoading && rightIcon && (
          <span className={styles.icon}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
