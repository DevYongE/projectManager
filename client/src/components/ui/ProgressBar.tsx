import type { CSSProperties } from 'react';

interface ProgressBarProps {
  value: number; // percentage 0-100
  className?: string;
}

// Simple progress bar showing completion percentage
function ProgressBar({ value, className }: ProgressBarProps): JSX.Element {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (
    <div className={`h-2 w-full rounded bg-gray-200 ${className ?? ''}`}>
      <div
        className="h-full rounded bg-indigo-500"
        style={{ width: `${clamped}%` } as CSSProperties}
      />
    </div>
  );
}

export default ProgressBar;
