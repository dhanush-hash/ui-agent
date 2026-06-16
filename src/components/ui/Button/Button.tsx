import { cn } from '@/utils';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-deep-blue-darkest text-surface-lowest border border-transparent hover:opacity-90',
  secondary:
    'bg-surface-lowest text-text-grey-high border border-outline-medium hover:bg-surface-low',
  ghost: 'bg-transparent text-text-grey-high border border-transparent hover:bg-surface-medium',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-control gap-1.5 px-3 text-label',
  md: 'h-control gap-2 px-4 text-title',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-control font-title font-medium',
        'transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children && <span className="whitespace-nowrap">{children}</span>}
      {rightIcon}
    </button>
  );
}
