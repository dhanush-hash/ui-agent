/**
 * Asset categorisation, mirrored from the Language Translation Service API
 * (`AssetResponseDTO.type`). A `single` asset holds one key; a `multiple`
 * (grouped) asset bundles several keys.
 */
export type AssetType = 'single' | 'multiple';

/**
 * UI-facing shape of a language asset row. Derived from `AssetResponseDTO` with
 * the active-language translation flattened into a single representative value.
 */
export interface LanguageAsset {
  id: string;
  /** Asset name, e.g. "Lead title". */
  name: string;
  /** Human description of what the asset is for. */
  description: string;
  /** Number of locations the asset is assigned to (`locations_count`). */
  locationsCount: number;
  /**
   * Whether the asset is a single key or a grouped (multiple-key) asset.
   * `null` when the asset has no assigned locations to derive a type from.
   */
  type: AssetType | null;
  /** Representative translated value shown in the active-language column. */
  translatedValue: string;
  /** Display name of the user who created the asset. */
  createdBy: string;
}
