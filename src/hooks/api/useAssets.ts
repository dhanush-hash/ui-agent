import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/apiClient';
import { queryKeys, type AssetsListParams } from '@/lib/queryKeys';
import type { LanguageAsset } from '@/types';
import type { AssetResponseDTO, AssetsPageDTO } from '@/types/api/asset';

/** A page of assets mapped into the UI-facing shape, with pagination metadata. */
export interface LanguageAssetsPage {
  assets: LanguageAsset[];
  totalElements: number;
  totalPages: number;
  /** 0-based page index returned by the API. */
  page: number;
  size: number;
}

/** Picks a representative translated value for the active language column. */
function representativeValue(dto: AssetResponseDTO, languageCode: string): string {
  const translationsForLanguage = dto.translations?.[languageCode];
  if (!translationsForLanguage) return '';
  const [firstValue] = Object.values(translationsForLanguage);
  return firstValue ?? '';
}

/** Maps a raw API asset into the table row shape consumed by the view. */
function mapAsset(dto: AssetResponseDTO, languageCode: string): LanguageAsset {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    locationsCount: dto.locations_count,
    type: dto.type,
    translatedValue: representativeValue(dto, languageCode),
    createdBy: dto.created_by,
  };
}

export interface UseAssetsParams {
  /** Free-text search; empty/whitespace is omitted from the request. */
  search?: string;
  /** 1-based page index from the UI (converted to 0-based for the API). */
  page: number;
  /** Page size. */
  size: number;
  /** Sort direction applied to the asset name. */
  sortDirection?: 'asc' | 'desc';
  /** Active language code; drives both the filter and the value column. */
  languageCode: string;
  enabled?: boolean;
}

/**
 * Loads a page of language assets from `GET /assets`. Server state owned by
 * TanStack Query; search, sort, and pagination are all server-side. The raw
 * paged DTO is mapped to `LanguageAsset[]` via `select` so the container and
 * view stay free of API-shaped data.
 */
export function useAssets({
  search,
  page,
  size,
  sortDirection = 'asc',
  languageCode,
  enabled = true,
}: UseAssetsParams) {
  const params: AssetsListParams = {
    search: search?.trim() ? search.trim() : undefined,
    page: Math.max(page - 1, 0),
    size,
    sort: `name,${sortDirection}`,
    languageCode: [languageCode],
  };

  return useQuery({
    queryKey: queryKeys.assets.list(params),
    queryFn: ({ signal }) => apiGet<AssetsPageDTO>('/assets', { params, signal }),
    enabled,
    placeholderData: keepPreviousData,
    select: (data): LanguageAssetsPage => ({
      assets: data.content.map((dto) => mapAsset(dto, languageCode)),
      totalElements: data.total_elements,
      totalPages: data.total_pages,
      page: data.number,
      size: data.size,
    }),
  });
}
