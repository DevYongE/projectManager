import type { ButtonHTMLAttributes } from 'react';

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      {...props}
    >
      {children}
    </button>
  );
}
