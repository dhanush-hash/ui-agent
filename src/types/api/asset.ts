import type { AssetType } from '@/types';

/**
 * Types generated from the Language Translation Service OpenAPI spec
 * (`docs/swagger.yml`). Field names mirror the JSON payload exactly (snake_case).
 */

/**
 * Map of language code → (translation key → value).
 * Generated from `AssetResponseDTO.translations`.
 * @example { en: { welcome: "Welcome" }, fr: { welcome: "Bienvenue" } }
 */
export type AssetTranslations = Record<string, Record<string, string>>;

/** Generated from OpenAPI schema: #/components/schemas/AssetResponseDTO */
export interface AssetResponseDTO {
  id: string;
  name: string;
  description: string;
  /** Number of locations assigned to this asset. */
  locations_count: number;
  /** Per-language translation key/value pairs. Empty when none assigned. */
  translations: AssetTranslations;
  /** `null` when the asset has no assigned locations to derive a type from. */
  type: AssetType | null;
  published_translation_keys?: string[];
  draft_translation_keys?: string[];
  /** UUID of the creating user. */
  created_by: string;
  /** UUID of the last updating user. */
  updated_by: string;
  /** ISO 8601 timestamp. */
  created_at: string;
  /** ISO 8601 timestamp. */
  updated_at: string;
}

/**
 * Spring-style paged envelope returned by `GET /assets`.
 * `number` is the 0-based page index.
 */
export interface AssetsPageDTO {
  content: AssetResponseDTO[];
  total_elements: number;
  total_pages: number;
  size: number;
  number: number;
}
