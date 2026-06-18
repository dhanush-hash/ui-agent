import type { ReactNode } from 'react';

export interface SelectFieldProps {
  /** Floating label shown above the field border. */
  label: string;
  /** Selected-value content — typically one or more `Tag` tokens. */
  children: ReactNode;
  /** Fired when the field's dropdown affordance is activated. */
  onToggle?: () => void;
  /** Reflects the open state of the associated dropdown for aria-expanded. */
  isOpen?: boolean;
  /** Accessible name for the toggle control. */
  toggleLabel?: string;
  className?: string;
}
