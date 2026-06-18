import { cn } from '@/utils';
import { PlusIcon, SearchIcon, SortIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { SelectField } from '@/components/ui/SelectField';
import { Tag } from '@/components/ui/Tag';
import { TextInput } from '@/components/ui/TextInput';
import { PageHeader } from '@/components/composed/PageHeader';
import { DataTable } from '@/components/composed/DataTable';
import { Pagination } from '@/components/composed/Pagination';
import { buildAssetColumns } from './columns';
import type { LanguageManagementViewProps } from './LanguageManagementView.types';

/** Presentational shell for the Language Management index — no data fetching here. */
export function LanguageManagementView({
  languages,
  activeLanguage,
  isLanguageMenuOpen,
  onToggleLanguageMenu,
  onSelectLanguage,
  onClearLanguage,
  searchQuery,
  onSearchChange,
  onSort,
  rows,
  isLoading,
  isError,
  onRetry,
  onRowAction,
  page,
  pageCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  onAddAsset,
  onBack,
}: LanguageManagementViewProps) {
  const columns = buildAssetColumns({ languageLabel: activeLanguage.label, onRowAction });

  return (
    <div className="flex h-full flex-col bg-surface-lowest">
      <PageHeader
        title="Language Management"
        onBack={onBack}
        actions={
          <Button variant="primary" size="md" leftIcon={<PlusIcon size={20} />} onClick={onAddAsset}>
            Add asset
          </Button>
        }
      />

      <main className="flex flex-1 flex-col gap-4 overflow-auto px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <SelectField
              label="Language"
              isOpen={isLanguageMenuOpen}
              onToggle={onToggleLanguageMenu}
              toggleLabel="Choose language"
            >
              <Tag
                tone="neutral"
                leftIcon={
                  <span aria-hidden="true" className="leading-none">
                    {activeLanguage.flag}
                  </span>
                }
                onRemove={onClearLanguage}
                removeLabel={`Remove ${activeLanguage.label}`}
              >
                {activeLanguage.label}
              </Tag>
            </SelectField>

            {isLanguageMenuOpen && (
              <>
                <button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  onClick={onToggleLanguageMenu}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <ul
                  role="listbox"
                  aria-label="Language"
                  className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-control border border-outline-low bg-surface-lowest py-1 shadow-elevation-grey-s"
                >
                  {languages.map((language) => {
                    const isSelected = language.code === activeLanguage.code;
                    return (
                      <li key={language.code} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          onClick={() => onSelectLanguage(language.code)}
                          className={cn(
                            'flex w-full items-center gap-2 px-3 py-2 text-left font-sans text-body transition-colors hover:bg-surface-low focus-visible:outline-none focus-visible:bg-surface-low',
                            isSelected ? 'text-deep-blue-darkest' : 'text-text-grey-high',
                          )}
                        >
                          <span aria-hidden="true" className="leading-none">
                            {language.flag}
                          </span>
                          {language.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <TextInput
              type="search"
              aria-label="Search assets"
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              leftIcon={<SearchIcon size={20} />}
              wrapperClassName="w-full md:w-72"
            />
            <IconButton
              variant="outline"
              size="md"
              aria-label="Sort assets"
              icon={<SortIcon size={20} />}
              onClick={onSort}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-card border border-outline-low">
          <DataTable
            caption="Language assets"
            columns={columns}
            rows={rows}
            keyExtractor={(asset) => asset.id}
            isLoading={isLoading}
            isError={isError}
            onRetry={onRetry}
            emptyState={
              <p className="font-sans text-body text-text-grey-medium-high">
                No assets match your search.
              </p>
            }
          />
        </div>

        <div className="pt-2">
          <Pagination
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </main>
    </div>
  );
}
