import { useCallback, useState } from 'react';
import { useDesignations, useZoom } from '@/hooks';
import { DesignationsView } from './DesignationsView';
import { DESIGNATIONS_TAB_ID, DESIGNATION_TABS } from './tabs';

/**
 * Container for the Designations screen. Owns server state (TanStack Query),
 * tab selection, and canvas zoom; delegates all rendering to `DesignationsView`.
 */
export function DesignationsPage() {
  const { data, isLoading, isError, refetch } = useDesignations();
  const { zoom, scaleClass, zoomIn, zoomOut, reset, canZoomIn, canZoomOut } = useZoom();
  const [activeTab, setActiveTab] = useState<string>(DESIGNATIONS_TAB_ID);

  const handleAddDesignation = useCallback(() => {
    // Wire to the create-designation flow (route/modal) when it exists.
  }, []);

  const handleMore = useCallback(() => {
    // Wire to the overflow menu when it exists.
  }, []);

  const handleExpand = useCallback(() => {
    // Wire to full-screen canvas mode when it exists.
  }, []);

  return (
    <DesignationsView
      tabs={DESIGNATION_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      designations={data ?? []}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      zoom={zoom}
      scaleClass={scaleClass}
      canZoomIn={canZoomIn}
      canZoomOut={canZoomOut}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      onZoomReset={reset}
      onAddDesignation={handleAddDesignation}
      onMore={handleMore}
      onExpand={handleExpand}
      onFit={reset}
    />
  );
}
