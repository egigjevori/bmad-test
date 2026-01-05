import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Dashboard } from '@/features/dashboard/components/Dashboard';
import { DayView } from '@/features/day-view/components/DayView';
import { Settings } from '@/features/settings/components/Settings';

/**
 * Handle SPA redirect from 404.html for GitHub Pages
 */
function SPARedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem('spa-redirect');
    if (redirect) {
      sessionStorage.removeItem('spa-redirect');
      // Remove the base path prefix if present
      const basePath = '/bmad-test';
      const path = redirect.startsWith(basePath)
        ? redirect.slice(basePath.length)
        : redirect;
      // Navigate to the stored path
      if (path && path !== '/') {
        navigate(path, { replace: true });
      }
    }
  }, [navigate]);

  return null;
}

export function App() {
  return (
    <BrowserRouter basename="/bmad-test">
      <SPARedirectHandler />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/day/:date" element={<DayView />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
