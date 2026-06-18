import type { ReactNode } from 'react';

export interface SideNavItem {
  /** Stable identifier. */
  id: string;
  /** Accessible label (also used as the tooltip title). */
  label: string;
  /** Rail icon. */
  icon: ReactNode;
  /** Route path. When present the item navigates and reflects the active route. */
  to?: string;
}

export interface SideNavProps {
  /** Navigation items, top to bottom. Defaults to the standard module rail. */
  items?: SideNavItem[];
}
