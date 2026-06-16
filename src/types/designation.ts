/** Visual state of a designation node in the hierarchy. */
export type DesignationVariant = 'default' | 'active';

/**
 * A single designation in the org hierarchy. The hierarchy in this screen is a
 * linear chain (Level 1 → 2 → 3), so designations are stored as an ordered list
 * keyed by ascending `level`.
 */
export interface Designation {
  id: string;
  /** 1-based depth in the hierarchy. Drives the staircase indentation. */
  level: number;
  /** Title shown on the node card, e.g. "CEO". */
  label: string;
  /** `active` renders the filled deep-blue card; `default` renders the outlined card. */
  variant: DesignationVariant;
}
