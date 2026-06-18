import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/composed/AppHeader';
import { SideNav } from '@/components/composed/SideNav';

/**
 * Full-viewport application shell: the global top bar spans the width, the side
 * navigation rail runs down the left, and the routed page renders in the content
 * region (each page owns its own `<main>` landmark).
 */
export function RootLayout() {
  return (
    <div className="flex h-screen flex-col bg-surface-low">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <SideNav />
        <div className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
