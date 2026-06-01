import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message – triggers error styling */
  error?: string;
  /** Helper text displayed below the input when no error */
  helperText?: string;
  /** Icon or element rendered on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Icon or element rendered on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Makes the input fill its container width @default true */
  fullWidth?: boolean;
}

/**
 * Input component with label, error handling, helper text, and icon support.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Username" error="Username is taken" leftIcon={<UserIcon />} />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id: externalId,
      disabled,
      ...props
    },
    ref
  ) => {
    const internalId = useId();
    const id = externalId ?? internalId;
    const descId = `${id}-desc`;
    const hasDesc = !!(error || helperText);

    return (
      <div
        className={[
          styles.wrapper,
          fullWidth ? styles.fullWidth : '',
          disabled ? styles.disabled : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        <div className={[styles.inputWrapper, error ? styles.hasError : ''].filter(Boolean).join(' ')}>
          {leftIcon && (
            <span className={styles.iconLeft} aria-hidden="true">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={hasDesc ? descId : undefined}
            className={[
              styles.input,
              leftIcon ? styles.withLeftIcon : '',
              rightIcon ? styles.withRightIcon : '',
              className ?? '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          {rightIcon && (
            <span className={styles.iconRight} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>

        {hasDesc && (
          <p
            id={descId}
            className={[styles.helpText, error ? styles.errorText : ''].filter(Boolean).join(' ')}
            role={error ? 'alert' : undefined}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
