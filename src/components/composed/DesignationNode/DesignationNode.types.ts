import type { DesignationVariant } from '@/types';

export interface DesignationNodeProps {
  /** 1-based depth, rendered as the "Level N" caption above the card. */
  level: number;
  /** Title shown on the card. */
  label: string;
  /** Visual state of the card. */
  variant?: DesignationVariant;
}
