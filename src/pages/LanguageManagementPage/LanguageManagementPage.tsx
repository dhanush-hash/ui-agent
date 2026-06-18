import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LanguageAsset } from '@/types';
import { DEFAULT_LANGUAGE, LANGUAGES, useLanguageAssets } from '@/hooks';
import { LanguageManagementView } from './LanguageManagementView';

const PAGE_SIZE_OPTIONS = [8, 16, 24, 50];

type SortDirection = 'asc' | 'desc';

function matchesQuery(asset: LanguageAsset, query: string): boolean {
  const haystack = `${asset.name} ${asset.description} ${asset.translatedValue} ${asset.createdBy}`.toLowerCase();
  return haystack.includes(query);
}

/**
 * Container for the Language Management index. Owns server state (TanStack Query),
 * the language filter, search, sort, and pagination; derives the visible page of
 * rows and delegates all rendering to `LanguageManagementView`.
 */
export function LanguageManagementPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useLanguageAssets();

  const [activeLanguageCode, setActiveLanguageCode] = useState(DEFAULT_LANGUAGE.code);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const activeLanguage =
    LANGUAGES.find((language) => language.code === activeLanguageCode) ?? DEFAULT_LANGUAGE;

  const filtered = useMemo(() => {
    const assets = data ?? [];
    const query = searchQuery.trim().toLowerCase();
    const matched = query ? assets.filter((asset) => matchesQuery(asset, query)) : assets;
    const direction = sortDirection === 'asc' ? 1 : -1;
    return [...matched].sort((a, b) => a.name.localeCompare(b.name) * direction);
  }, [data, searchQuery, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filtered, currentPage, pageSize],
  );

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
      rows={pageRows}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      onRowAction={handleRowAction}
      page={currentPage}
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
