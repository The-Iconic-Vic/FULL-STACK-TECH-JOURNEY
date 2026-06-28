import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply glassmorphism styling @default false */
  glass?: boolean;
  /** Add a subtle hover-lift animation @default false */
  hoverable?: boolean;
  /** Remove default padding from the card body */
  noPadding?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card root container. Compose with sub-components for structured layouts.
 *
 * @example
 * <Card hoverable>
 *   <CardHeader><CardTitle>Hello</CardTitle></CardHeader>
 *   <CardContent>...</CardContent>
 *   <CardFooter>...</CardFooter>
 * </Card>
 */
export function Card({ glass = false, hoverable = false, noPadding = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={[
        styles.card,
        glass ? styles.glass : '',
        hoverable ? styles.hoverable : '',
        noPadding ? styles.noPadding : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

/** Card header slot — typically contains title and description */
export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={[styles.header, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

/** Primary heading inside a Card */
export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3 className={[styles.title, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </h3>
  );
}

/** Subtitle or descriptive text inside a Card */
export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p className={[styles.description, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  );
}

/** Card body — the main content slot */
export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={[styles.content, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

/** Card footer — typically for actions or metadata */
export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={[styles.footer, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}
