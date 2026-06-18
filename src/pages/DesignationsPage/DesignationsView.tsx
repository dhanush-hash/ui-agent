import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Spinner } from '@/components/ui/Spinner';
import { PageHeader } from '@/components/composed/PageHeader';
import { TabBar } from '@/components/composed/TabBar';
import { DesignationTree } from '@/components/composed/DesignationTree';
import { CanvasToolbar } from '@/components/composed/CanvasToolbar';
import { LightbulbIcon, MoreVerticalIcon, PlusIcon } from '@/assets/icons';
import { DESIGNATIONS_TAB_ID } from './tabs';
import type { DesignationsViewProps } from './DesignationsView.types';

function CanvasState({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 p-8 text-center">
      {children}
    </div>
  );
}

/** Presentational shell for the Designations screen — no data fetching here. */
export function DesignationsView({
  tabs,
  activeTab,
  onTabChange,
  designations,
  isLoading,
  isError,
  onRetry,
  zoom,
  scaleClass,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onAddDesignation,
  onMore,
  onExpand,
  onFit,
}: DesignationsViewProps) {
  const isDesignationsTab = activeTab === DESIGNATIONS_TAB_ID;

  function renderCanvas() {
    if (isLoading) {
      return (
        <CanvasState>
          <Spinner label="Loading designations" />
        </CanvasState>
      );
    }

    if (isError) {
      return (
        <CanvasState>
          <p className="font-sans text-body text-text-grey-medium-high">
            We couldn’t load the designations.
          </p>
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </CanvasState>
      );
    }

    if (designations.length === 0) {
      return (
        <CanvasState>
          <p className="font-sans text-body text-text-grey-medium-high">No designations yet.</p>
          <Button variant="primary" size="sm" onClick={onAddDesignation}>
            Add Designation
          </Button>
        </CanvasState>
      );
    }

    return (
      <div
        className={cn(
          'origin-top-left p-11 transition-transform duration-200 ease-out',
          scaleClass,
        )}
      >
        <DesignationTree designations={designations} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-surface-lowest">
      <PageHeader
        title="Designations"
        showHelp
        actions={
          <>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusIcon size={16} />}
              onClick={onAddDesignation}
            >
              Add Designation
            </Button>
            <IconButton
              variant="outline"
              size="sm"
              aria-label="More options"
              icon={<MoreVerticalIcon size={24} />}
              onClick={onMore}
            />
          </>
        }
      />

      <TabBar
        tabs={tabs}
        activeId={activeTab}
        onChange={onTabChange}
        trailing={<LightbulbIcon className="text-warning" size={16} aria-label="Tips" />}
      />

      <main className="relative flex-1 overflow-auto">
        {isDesignationsTab ? (
          <>
            {renderCanvas()}
            <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-4">
              <div className="pointer-events-auto max-w-full overflow-x-auto">
                <CanvasToolbar
                  zoom={zoom}
                  canZoomIn={canZoomIn}
                  canZoomOut={canZoomOut}
                  onAddDesignation={onAddDesignation}
                  onExpand={onExpand}
                  onFit={onFit}
                  onZoomIn={onZoomIn}
                  onZoomOut={onZoomOut}
                  onZoomReset={onZoomReset}
                />
              </div>
            </div>
          </>
        ) : (
          <CanvasState>
            <p className="font-sans text-body text-text-grey-medium-high">
              Audit logs are not available yet.
            </p>
          </CanvasState>
        )}
      </main>
    </div>
  );
}
