import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  /** Stable column identifier. */
  id: string;
  /** Header content — usually the column label, optionally with an accessory icon. */
  header: ReactNode;
  /** Renders the cell body for a given row. */
  renderCell: (row: T) => ReactNode;
  /** Tailwind sizing classes for the column (e.g. `w-48`, `flex-1`). */
  widthClassName?: string;
  /** Extra classes applied to both the header and body cells (e.g. alignment). */
  cellClassName?: string;
}

export interface DataTableProps<T> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. */
  rows: T[];
  /** Returns a stable React key for a row. */
  keyExtractor: (row: T) => string;
  /** Accessible table caption (visually hidden). */
  caption?: string;
  /** Async states owned by the caller. */
  isLoading?: boolean;
  isError?: boolean;
  /** Error detail shown in the error state. Falls back to a generic message. */
  errorMessage?: string | null;
  onRetry?: () => void;
  /** Rendered when there are no rows and no loading/error state. */
  emptyState?: ReactNode;
  /** Invoked when a row is activated (click). Makes rows focusable when set. */
  onRowClick?: (row: T) => void;
}
