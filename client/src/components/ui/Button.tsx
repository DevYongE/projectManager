import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

// Central button component styled with Tailwind for consistent UI.
export function Button({
  children,
  className,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`rounded-md bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
