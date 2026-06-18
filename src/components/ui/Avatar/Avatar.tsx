import { cn } from '@/utils';
import type { AvatarProps, AvatarSize } from './Avatar.types';

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'size-8 text-caption',
  md: 'size-11 text-body',
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Circular user avatar — renders the image when available, initials otherwise. */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-medium font-sans font-medium text-text-grey-medium-high',
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  );
}
