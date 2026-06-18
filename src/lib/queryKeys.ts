/**
 * Centralised TanStack Query key factory. Every hook references keys from here
 * so cache reads, invalidations, and prefetches stay consistent across the app.
 */

/**
 * Parameters that uniquely identify a page of assets (mirrors the API query).
 * A `type` alias (not an interface) so it satisfies the `QueryParams` index
 * signature when passed straight to the API client.
 */
export type AssetsListParams = {
  /** Full-text search across name + description. */
  search?: string;
  /** 0-based page index (API convention). */
  page: number;
  /** Page size. */
  size: number;
  /** Sort criteria, e.g. "name,asc". */
  sort?: string;
  /** Language code filter, e.g. ["en"]. */
  languageCode?: string[];
};

export const queryKeys = {
  assets: {
    all: () => ['assets'] as const,
    list: (params: AssetsListParams) => ['assets', 'list', params] as const,
  },
} as const;
