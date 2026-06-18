import type { AssetType, LanguageAsset } from '@/types';
import type { DataTableColumn } from '@/components/composed/DataTable';
import { Tag } from '@/components/ui/Tag';
import { MoreVerticalIcon, SortIcon, TranslateIcon } from '@/assets/icons';

/** Maps an asset type to its display label and tag tone. */
const ASSET_TYPE_META: Record<AssetType, { label: string; tone: 'tangerine' | 'lavender' }> = {
  single: { label: 'Single asset', tone: 'tangerine' },
  multiple: { label: 'Grouped asset', tone: 'lavender' },
};

interface ColumnOptions {
  /** Active-language label shown in the value column header, e.g. "English (EN - US)". */
  languageLabel: string;
  /** Fired when a row's overflow menu is activated. */
  onRowAction: (asset: LanguageAsset) => void;
}

/** Builds the Language Management table columns for the active language. */
export function buildAssetColumns({
  languageLabel,
  onRowAction,
}: ColumnOptions): DataTableColumn<LanguageAsset>[] {
  return [
    {
      id: 'name',
      header: 'Asset',
      widthClassName: 'w-1/6',
      renderCell: (asset) => <span className="font-medium">{asset.name}</span>,
    },
    {
      id: 'description',
      header: 'Description',
      widthClassName: 'w-1/4',
      renderCell: (asset) => <span className="text-text-grey-medium-high">{asset.description}</span>,
    },
    {
      id: 'locations',
      header: 'Locations',
      widthClassName: 'w-24',
      renderCell: (asset) => <Tag tone="neutral">{asset.locationsCount}</Tag>,
    },
    {
      id: 'type',
      header: 'Asset type',
      widthClassName: 'w-32',
      renderCell: (asset) => {
        if (!asset.type) return <span className="text-text-grey-medium">—</span>;
        const meta = ASSET_TYPE_META[asset.type];
        return <Tag tone={meta.tone}>{meta.label}</Tag>;
      },
    },
    {
      id: 'value',
      header: (
        <span className="inline-flex items-center gap-1">
          {languageLabel}
          <TranslateIcon size={16} className="text-text-grey-medium" />
        </span>
      ),
      widthClassName: 'w-1/5',
      renderCell: (asset) => <span className="text-text-grey-medium-high">{asset.translatedValue}</span>,
    },
    {
      id: 'createdBy',
      header: (
        <span className="inline-flex items-center gap-1">
          Created by
          <SortIcon size={12} className="text-text-grey-medium" />
        </span>
      ),
      widthClassName: 'w-40',
      renderCell: (asset) => <span>{asset.createdBy}</span>,
    },
    {
      id: 'actions',
      header: <span className="sr-only">Actions</span>,
      widthClassName: 'w-12',
      cellClassName: 'text-right',
      renderCell: (asset) => (
        <button
          type="button"
          aria-label={`Actions for ${asset.name}`}
          onClick={() => onRowAction(asset)}
          className="inline-flex size-8 items-center justify-center rounded-control text-text-grey-medium-high transition-colors hover:bg-surface-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        >
          <MoreVerticalIcon size={20} />
        </button>
      ),
    },
  ];
}
