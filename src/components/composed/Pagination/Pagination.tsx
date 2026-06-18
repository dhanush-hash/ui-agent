import { useState } from 'react';
import { cn } from '@/utils';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import type { PageItem, PaginationProps } from './Pagination.types';

/** Builds a compact page list with ellipsis gaps around the current page. */
function getPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const items: PageItem[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pageCount - 1, page + 1);
  if (start > 2) items.push('ellipsis');
  for (let p = start; p <= end; p += 1) items.push(p);
  if (end < pageCount - 1) items.push('ellipsis');
  items.push(pageCount);
  return items;
}

function ArrowButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-7 items-center justify-center rounded-control text-text-grey-medium-high transition-colors hover:bg-surface-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** Footer pagination: page-size selector, page navigator, and a jump-to control. */
export function Pagination({
  page,
  pageCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const [jumpValue, setJumpValue] = useState('');

  const goTo = (target: number) => {
    const clamped = Math.min(Math.max(target, 1), pageCount);
    if (clamped !== page) onPageChange(clamped);
  };

  const parsedJump = Number(jumpValue);
  const jumpIsValid = jumpValue !== '' && Number.isInteger(parsedJump) && parsedJump >= 1 && parsedJump <= pageCount;

  const handleJump = () => {
    if (!jumpIsValid) return;
    goTo(parsedJump);
    setJumpValue('');
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-sans text-caption text-text-grey-medium-high"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="page-size" className="whitespace-nowrap">
          Page Size:
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="h-8 rounded-control border border-outline-medium bg-surface-lowest px-2 text-caption text-text-grey-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {String(option).padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>

      <span aria-hidden="true" className="h-5 w-px bg-outline-low" />

      <div className="flex items-center gap-1">
        <ArrowButton label="First page" onClick={() => goTo(1)} disabled={page <= 1}>
          <ChevronsLeftIcon size={16} />
        </ArrowButton>
        <ArrowButton label="Previous page" onClick={() => goTo(page - 1)} disabled={page <= 1}>
          <ChevronLeftIcon size={16} />
        </ArrowButton>

        {getPageItems(page, pageCount).map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-1 text-text-grey-medium">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              onClick={() => goTo(item)}
              className={cn(
                'inline-flex size-7 items-center justify-center rounded-control border text-caption transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark',
                item === page
                  ? 'border-transparent bg-deep-blue-dark text-surface-lowest'
                  : 'border-outline-low text-text-grey-high hover:bg-surface-medium',
              )}
            >
              {item}
            </button>
          ),
        )}

        <ArrowButton label="Next page" onClick={() => goTo(page + 1)} disabled={page >= pageCount}>
          <ChevronRightIcon size={16} />
        </ArrowButton>
        <ArrowButton label="Last page" onClick={() => goTo(pageCount)} disabled={page >= pageCount}>
          <ChevronsRightIcon size={16} />
        </ArrowButton>
      </div>

      <span aria-hidden="true" className="h-5 w-px bg-outline-low" />

      <div className="flex items-center gap-2">
        <label htmlFor="jump-to" className="whitespace-nowrap">
          Jump to:
        </label>
        <input
          id="jump-to"
          type="number"
          min={1}
          max={pageCount}
          inputMode="numeric"
          value={jumpValue}
          placeholder="Page"
          onChange={(event) => setJumpValue(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleJump()}
          className="h-8 w-16 rounded-control border border-outline-medium bg-surface-lowest px-2 text-caption text-text-grey-high placeholder:text-text-grey-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        />
        <Button variant="primary" size="sm" disabled={!jumpIsValid} onClick={handleJump}>
          Confirm
        </Button>
      </div>
    </nav>
  );
}
