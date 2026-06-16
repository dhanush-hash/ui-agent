import { cn } from '@/utils';
import type { IconButtonProps, IconButtonSize, IconButtonVariant } from './IconButton.types';

const variantClasses: Record<IconButtonVariant, string> = {
  outline: 'bg-surface-lowest border border-outline-medium hover:bg-surface-low',
  subtle:
    'bg-surface-low border border-outline-medium shadow-elevation-grey-s hover:bg-surface-medium',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'size-icon-control',
  md: 'size-control',
};

export function IconButton({
  icon,
  variant = 'outline',
  size = 'md',
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-control text-text-grey-high',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
