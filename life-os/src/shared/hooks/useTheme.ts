import { useEffect } from 'react';

import { useSettingsStore } from '@/lib/stores';

/**
 * Hook to manage theme state and initialization
 * Ensures theme is applied on mount
 */
export function useTheme() {
  const { theme, setTheme } = useSettingsStore();

  useEffect(() => {
    // Apply theme on mount
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
  }, [theme]);

  return {
    theme,
    setTheme,
    isDark:
      theme === 'dark' ||
      (theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
}
