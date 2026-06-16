import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import {
  CenterFocusIcon,
  ChevronDownIcon,
  ExpandIcon,
  MinusIcon,
  PlusIcon,
} from '@/assets/icons';
import type { CanvasToolbarProps } from './CanvasToolbar.types';

function Divider() {
  return <span aria-hidden className="h-6 w-px bg-outline-low" />;
}

/** Floating canvas controls: add designation, expand, fit-to-view, and zoom. */
export function CanvasToolbar({
  zoom,
  canZoomIn,
  canZoomOut,
  onAddDesignation,
  onExpand,
  onFit,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: CanvasToolbarProps) {
  return (
    <div className="flex items-center gap-3 rounded-card border border-outline-low bg-surface-lowest p-3 shadow-elevation-blue-l">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="md"
          leftIcon={<PlusIcon size={20} />}
          onClick={onAddDesignation}
        >
          Add Designation
        </Button>
        <Divider />
        <IconButton
          variant="subtle"
          size="md"
          aria-label="Expand canvas"
          icon={<ExpandIcon size={20} />}
          onClick={onExpand}
        />
      </div>

      <Divider />

      <div className="flex items-center gap-3">
        <IconButton
          variant="subtle"
          size="md"
          aria-label="Fit to view"
          icon={<CenterFocusIcon size={20} />}
          onClick={onFit}
        />
        <div className="flex h-control items-center gap-2 rounded-control border border-outline-medium px-4">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={onZoomOut}
            disabled={!canZoomOut}
            className="inline-flex size-5 items-center justify-center text-text-grey-medium-high transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MinusIcon size={20} />
          </button>
          <button
            type="button"
            aria-label={`Zoom level ${zoom} percent, reset to 100%`}
            onClick={onZoomReset}
            className="flex items-center gap-2 rounded-control bg-surface-medium px-2 py-1 transition-colors hover:bg-outline-low"
          >
            <span className="font-title text-caption font-medium text-text-grey-medium-high">
              {zoom}%
            </span>
            <ChevronDownIcon size={16} className="text-text-grey-medium-high" />
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={onZoomIn}
            disabled={!canZoomIn}
            className="inline-flex size-5 items-center justify-center text-text-grey-medium-high transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PlusIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
