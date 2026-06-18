import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import type { DataTableColumn, DataTableProps } from './DataTable.types';

function StateRow<T>({ columns, children }: { columns: DataTableColumn<T>[]; children: React.ReactNode }) {
  return (
    <tr>
      <td colSpan={columns.length} className="px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-3 text-center">{children}</div>
      </td>
    </tr>
  );
}

/**
 * Generic, presentational data table. Columns are supplied as render-prop
 * definitions (Section 7.5), so the table stays domain-agnostic and reusable
 * across screens. Loading, error, and empty states are rendered inline.
 */
export function DataTable<T>({
  columns,
  rows,
  keyExtractor,
  caption,
  isLoading,
  isError,
  onRetry,
  emptyState,
  onRowClick,
}: DataTableProps<T>) {
  function renderBody() {
    if (isLoading) {
      return (
        <StateRow columns={columns}>
          <Spinner label="Loading" />
        </StateRow>
      );
    }

    if (isError) {
      return (
        <StateRow columns={columns}>
          <p className="font-sans text-body text-text-grey-medium-high">Something went wrong while loading.</p>
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try again
            </Button>
          )}
        </StateRow>
      );
    }

    if (rows.length === 0) {
      return (
        <StateRow columns={columns}>
          {emptyState ?? (
            <p className="font-sans text-body text-text-grey-medium-high">No records to display.</p>
          )}
        </StateRow>
      );
    }

    return rows.map((row, index) => (
      <tr
        key={keyExtractor(row)}
        onClick={onRowClick ? () => onRowClick(row) : undefined}
        className={cn(
          'border-b border-outline-low last:border-b-0',
          index % 2 === 1 ? 'bg-surface-low' : 'bg-surface-lowest',
          onRowClick && 'cursor-pointer hover:bg-surface-medium',
        )}
      >
        {columns.map((column) => (
          <td
            key={column.id}
            className={cn(
              'px-4 py-4 align-middle font-sans text-body text-text-grey-high',
              column.widthClassName,
              column.cellClassName,
            )}
          >
            {column.renderCell(row)}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <table className="w-full border-collapse">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="border-b border-outline-medium">
          {columns.map((column) => (
            <th
              key={column.id}
              scope="col"
              className={cn(
                'px-4 py-3 text-left align-middle font-sans text-caption font-medium uppercase tracking-wide text-text-grey-medium',
                column.widthClassName,
                column.cellClassName,
              )}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
}
