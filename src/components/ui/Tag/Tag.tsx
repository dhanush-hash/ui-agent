import { cn } from '@/utils';
import { CloseIcon } from '@/assets/icons';
import type { TagProps, TagTone } from './Tag.types';

const toneClasses: Record<TagTone, string> = {
  neutral: 'bg-surface-medium text-text-grey-high',
  tangerine: 'bg-accent-tangerine-wash text-accent-tangerine',
  lavender: 'bg-accent-lavender-wash text-accent-lavender',
};

/** Compact pill used for status badges, count chips, and removable filter tokens. */
export function Tag({
  tone = 'neutral',
  leftIcon,
  onRemove,
  removeLabel,
  children,
  className,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-control px-2 py-0.5 font-sans text-caption',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {leftIcon}
      <span className="whitespace-nowrap">{children}</span>
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel ?? 'Remove'}
          onClick={onRemove}
          className="ml-0.5 inline-flex shrink-0 items-center justify-center rounded-sm text-current opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </span>
  );
}
