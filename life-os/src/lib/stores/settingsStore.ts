import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface SettingsState {
  /**
   * Current theme setting
   */
  theme: Theme;

  /**
   * Bottom bar collapsed state
   */
  isBottomBarCollapsed: boolean;

  /**
   * Set theme
   */
  setTheme: (theme: Theme) => void;

  /**
   * Toggle bottom bar collapsed state
   */
  toggleBottomBar: () => void;

  /**
   * Set bottom bar collapsed state
   */
  setBottomBarCollapsed: (collapsed: boolean) => void;
}

/**
 * Apply theme to document
 */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.classList.toggle('dark', isDark);
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      isBottomBarCollapsed: false,

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleBottomBar: () =>
        set((state) => ({
          isBottomBarCollapsed: !state.isBottomBarCollapsed,
        })),

      setBottomBarCollapsed: (collapsed) =>
        set({ isBottomBarCollapsed: collapsed }),
    }),
    {
      name: 'life-os-settings',
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.theme) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      const { theme } = useSettingsStore.getState();
      if (theme === 'system') {
        applyTheme('system');
      }
    });
}
