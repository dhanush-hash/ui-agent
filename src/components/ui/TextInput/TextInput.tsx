import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { TextInputProps } from './TextInput.types';

/**
 * Single-line text field with optional leading/trailing icon slots.
 * The wrapper carries the border so icons sit visually inside the control.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { leftIcon, rightIcon, wrapperClassName, className, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        'flex h-control items-center gap-2 rounded-control border border-outline-medium bg-surface-lowest px-3',
        'focus-within:border-deep-blue-dark focus-within:ring-1 focus-within:ring-deep-blue-dark',
        wrapperClassName,
      )}
    >
      {leftIcon && <span className="shrink-0 text-text-grey-medium">{leftIcon}</span>}
      <input
        ref={ref}
        className={cn(
          'w-full min-w-0 bg-transparent font-sans text-body text-text-grey-high outline-none',
          'placeholder:text-text-grey-medium',
          className,
        )}
        {...props}
      />
      {rightIcon && <span className="shrink-0 text-text-grey-medium">{rightIcon}</span>}
    </div>
  );
});
