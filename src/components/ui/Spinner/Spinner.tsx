import { cn } from '@/utils';

interface SpinnerProps {
  className?: string;
  /** Accessible status text announced to screen readers. */
  label?: string;
}

export function Spinner({ className, label = 'Loading' }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className={cn('inline-flex items-center', className)}>
      <span className="size-6 animate-spin rounded-full border-2 border-outline-low border-t-deep-blue-darkest" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
