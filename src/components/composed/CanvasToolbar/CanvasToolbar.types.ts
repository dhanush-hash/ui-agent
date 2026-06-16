export interface CanvasToolbarProps {
  /** Current zoom percentage, shown in the zoom control. */
  zoom: number;
  /** Whether the zoom-in / zoom-out controls are enabled. */
  canZoomIn: boolean;
  canZoomOut: boolean;
  onAddDesignation: () => void;
  onExpand: () => void;
  onFit: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  /** Resets the zoom to 100%. */
  onZoomReset: () => void;
}
