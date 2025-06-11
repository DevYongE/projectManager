import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Basic card wrapper used across pages for consistent layout.
export function Card({ children, className }: CardProps): JSX.Element {
  return (
    <div className={`rounded-lg bg-white p-6 shadow ${className ?? ''}`}>
      {children}
    </div>
  );
}
