import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'outline' | 'subtle';
export type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon to render. Sized by the button, not the icon. */
  icon: ReactNode;
  /** Accessible name — required because the button has no visible text. */
  'aria-label': string;
  /** Visual style of the button. */
  variant?: IconButtonVariant;
  /** Size scale — `sm` is 38px (header), `md` is 40px (canvas toolbar). */
  size?: IconButtonSize;
}
