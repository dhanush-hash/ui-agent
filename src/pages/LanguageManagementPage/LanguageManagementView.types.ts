import type { Language, LanguageAsset } from '@/types';

export interface LanguageManagementViewProps {
  /** Available languages for the filter dropdown. */
  languages: Language[];
  /** Currently selected language (drives the value column). */
  activeLanguage: Language;
  /** Whether the language dropdown menu is open. */
  isLanguageMenuOpen: boolean;
  onToggleLanguageMenu: () => void;
  onSelectLanguage: (code: string) => void;
  /** Clears the active-language filter token. */
  onClearLanguage: () => void;

  /** Free-text search query. */
  searchQuery: string;
  onSearchChange: (value: string) => void;
  /** Fired when the sort control is activated. */
  onSort: () => void;

  /** Page of rows to render (already filtered + paginated by the container). */
  rows: LanguageAsset[];
  isLoading: boolean;
  isError: boolean;
  /** Error detail surfaced in the table's error state. */
  errorMessage?: string | null;
  onRetry: () => void;
  /** Fired when a row's overflow menu is activated. */
  onRowAction: (asset: LanguageAsset) => void;

  /** Pagination state. */
  page: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  /** Header actions. */
  onAddAsset: () => void;
  onBack: () => void;
}
