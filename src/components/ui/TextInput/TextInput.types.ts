import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Icon rendered inside the field, before the input. */
  leftIcon?: ReactNode;
  /** Icon or control rendered inside the field, after the input. */
  rightIcon?: ReactNode;
  /** Extra classes for the outer wrapper. */
  wrapperClassName?: string;
}
