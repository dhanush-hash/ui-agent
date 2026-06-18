export interface PaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Current page size. */
  pageSize: number;
  /** Selectable page-size values. */
  pageSizeOptions: number[];
  /** Fired when a new page is requested. */
  onPageChange: (page: number) => void;
  /** Fired when the page size changes. */
  onPageSizeChange: (size: number) => void;
}

/** A page number, or an ellipsis gap placeholder. */
export type PageItem = number | 'ellipsis';
