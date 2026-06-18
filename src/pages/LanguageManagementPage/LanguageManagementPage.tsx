import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LanguageAsset } from '@/types';
import { useAssets } from '@/hooks';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants/languages';
import { LanguageManagementView } from './LanguageManagementView';

const PAGE_SIZE_OPTIONS = [8, 16, 24, 50];

type SortDirection = 'asc' | 'desc';

/**
 * Container for the Language Management index. Owns the language filter, search,
 * sort, and pagination, and drives `GET /assets` (server-side search/sort/paging)
 * via `useAssets`. All rendering is delegated to `LanguageManagementView`.
 */
export function LanguageManagementPage() {
  const navigate = useNavigate();

  const [activeLanguageCode, setActiveLanguageCode] = useState(DEFAULT_LANGUAGE.code);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const activeLanguage =
    LANGUAGES.find((language) => language.code === activeLanguageCode) ?? DEFAULT_LANGUAGE;

  const { data, isLoading, isError, refetch } = useAssets({
    search: searchQuery,
    page,
    size: pageSize,
    sortDirection,
    languageCode: activeLanguage.code,
  });

  const rows = data?.assets ?? [];
  const pageCount = Math.max(1, data?.totalPages ?? 1);

  const handleSelectLanguage = useCallback((code: string) => {
    setActiveLanguageCode(code);
    setIsLanguageMenuOpen(false);
    setPage(1);
  }, []);

  const handleClearLanguage = useCallback(() => {
    setActiveLanguageCode(DEFAULT_LANGUAGE.code);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handleSort = useCallback(() => {
    setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  const handleAddAsset = useCallback(() => {
    // Wire to the create-asset flow (route/modal) when it exists.
  }, []);

  const handleRowAction = useCallback((_asset: LanguageAsset) => {
    // Wire to the row overflow menu when it exists.
  }, []);

  return (
    <LanguageManagementView
      languages={LANGUAGES}
      activeLanguage={activeLanguage}
      isLanguageMenuOpen={isLanguageMenuOpen}
      onToggleLanguageMenu={() => setIsLanguageMenuOpen((open) => !open)}
      onSelectLanguage={handleSelectLanguage}
      onClearLanguage={handleClearLanguage}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onSort={handleSort}
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      onRowAction={handleRowAction}
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
      onAddAsset={handleAddAsset}
      onBack={() => navigate(-1)}
    />
  );
}
