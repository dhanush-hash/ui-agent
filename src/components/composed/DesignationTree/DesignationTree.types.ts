import type { Designation } from '@/types';

export interface DesignationTreeProps {
  /** Ordered hierarchy (Level 1 first). Rendered as a descending staircase. */
  designations: Designation[];
}
