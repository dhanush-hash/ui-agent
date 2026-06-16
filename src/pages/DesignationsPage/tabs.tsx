import { ActivityIcon, DataflowIcon } from '@/assets/icons';
import type { TabItem } from '@/components/composed/TabBar';

export const DESIGNATIONS_TAB_ID = 'designations';
export const AUDIT_LOGS_TAB_ID = 'audit-logs';

/** Tab definitions for the Designations screen. */
export const DESIGNATION_TABS: TabItem[] = [
  { id: DESIGNATIONS_TAB_ID, label: 'Designations', icon: <DataflowIcon size={16} /> },
  { id: AUDIT_LOGS_TAB_ID, label: 'Audit logs', icon: <ActivityIcon size={16} /> },
];
