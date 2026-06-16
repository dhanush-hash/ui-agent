import { Outlet } from 'react-router-dom';

/** Full-viewport application shell. Page content renders through the outlet. */
export function RootLayout() {
  return (
    <div className="h-full min-h-screen bg-surface-low">
      <Outlet />
    </div>
  );
}
