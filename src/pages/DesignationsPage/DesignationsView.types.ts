import type { Designation } from '@/types';
import type { TabItem } from '@/components/composed/TabBar';

export interface DesignationsViewProps {
  /** Tabs shown under the header. */
  tabs: TabItem[];
  /** Currently selected tab id. */
  activeTab: string;
  onTabChange: (id: string) => void;

  /** Hierarchy data and its async states (owned by the container). */
  designations: Designation[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;

  /** Zoom state, applied to the canvas via a Tailwind scale class. */
  zoom: number;
  scaleClass: string;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;

  /** Action handlers. */
  onAddDesignation: () => void;
  onMore: () => void;
  onExpand: () => void;
  onFit: () => void;
}
