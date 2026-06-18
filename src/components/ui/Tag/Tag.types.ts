import type { HTMLAttributes, ReactNode } from 'react';

/** Colour intent of the tag. */
export type TagTone = 'neutral' | 'tangerine' | 'lavender';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour intent — drives background and text colour. */
  tone?: TagTone;
  /** Optional element rendered before the label (e.g. a flag or icon). */
  leftIcon?: ReactNode;
  /** When provided, renders a trailing remove (×) button. */
  onRemove?: () => void;
  /** Accessible label for the remove button. Required when `onRemove` is set. */
  removeLabel?: string;
  /** Tag label. */
  children: ReactNode;
}
