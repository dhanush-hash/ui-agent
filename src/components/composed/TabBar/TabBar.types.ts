import type { ReactNode } from 'react';

export interface TabItem {
  /** Stable identifier used for selection and as the React key. */
  id: string;
  /** Visible tab label. */
  label: string;
  /** Leading icon. */
  icon: ReactNode;
}

export interface TabBarProps {
  /** Tabs to render, in display order. */
  tabs: TabItem[];
  /** Currently selected tab id. */
  activeId: string;
  /** Fired with the id of the newly selected tab. */
  onChange: (id: string) => void;
  /** Optional trailing slot (e.g. a hint affordance) rendered on the right. */
  trailing?: ReactNode;
}
