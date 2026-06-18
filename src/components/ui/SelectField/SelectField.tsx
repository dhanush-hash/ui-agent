import { cn } from '@/utils';
import { ChevronDownIcon } from '@/assets/icons';
import type { SelectFieldProps } from './SelectField.types';

/**
 * Bordered field with a floating label that hosts selected-value tokens and a
 * dropdown toggle. Presentational only — the menu itself is owned by the caller.
 * Not a native `<select>` because the value area renders removable `Tag` tokens
 * (interactive children can't live inside a `<button>`).
 */
export function SelectField({
  label,
  children,
  onToggle,
  isOpen = false,
  toggleLabel,
  className,
}: SelectFieldProps) {
  return (
    <div
      className={cn(
        'relative flex h-control items-center gap-2 rounded-control border border-outline-medium bg-surface-lowest pl-3 pr-2',
        className,
      )}
    >
      <span className="absolute -top-2 left-2 bg-surface-lowest px-1 font-sans text-caption text-text-grey-medium">
        {label}
      </span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">{children}</div>
      <button
        type="button"
        aria-label={toggleLabel ?? `Toggle ${label} options`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={onToggle}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-text-grey-medium transition-colors hover:text-text-grey-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
      >
        <ChevronDownIcon size={20} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>
    </div>
  );
}
