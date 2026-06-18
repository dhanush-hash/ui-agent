import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layouts/RootLayout';
import { DesignationsPage } from '@/pages/DesignationsPage';
import { LanguageManagementPage } from '@/pages/LanguageManagementPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Navigate to="/settings/designations" replace /> },
      { path: 'settings/designations', element: <DesignationsPage /> },
      { path: 'settings/language-management', element: <LanguageManagementPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
