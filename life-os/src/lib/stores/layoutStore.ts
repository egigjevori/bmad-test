import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Layout item for react-grid-layout
 */
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}

/**
 * Default layout for first-time users
 * Widgets are arranged in a sensible default configuration
 */
const DEFAULT_LAYOUTS: Record<string, LayoutItem[]> = {
  lg: [
    { i: 'habits', x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
    { i: 'mood', x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
    { i: 'pomodoro', x: 4, y: 2, w: 2, h: 3, minW: 2, minH: 3 },
    { i: 'notes', x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
  ],
  md: [
    { i: 'habits', x: 0, y: 0, w: 6, h: 4, minW: 2, minH: 2 },
    { i: 'mood', x: 6, y: 0, w: 6, h: 2, minW: 2, minH: 2 },
    { i: 'pomodoro', x: 6, y: 2, w: 3, h: 3, minW: 2, minH: 3 },
    { i: 'notes', x: 0, y: 4, w: 12, h: 4, minW: 2, minH: 2 },
  ],
  sm: [
    { i: 'habits', x: 0, y: 0, w: 6, h: 4, minW: 2, minH: 2 },
    { i: 'mood', x: 0, y: 4, w: 6, h: 2, minW: 2, minH: 2 },
    { i: 'pomodoro', x: 0, y: 6, w: 6, h: 3, minW: 2, minH: 3 },
    { i: 'notes', x: 0, y: 9, w: 6, h: 4, minW: 2, minH: 2 },
  ],
};

interface LayoutState {
  /**
   * Layouts for each breakpoint
   */
  layouts: Record<string, LayoutItem[]>;

  /**
   * Which widgets are currently enabled/visible
   */
  enabledWidgets: string[];

  /**
   * Update layouts for a specific breakpoint
   */
  setLayouts: (breakpoint: string, layout: LayoutItem[]) => void;

  /**
   * Update all layouts at once
   */
  setAllLayouts: (layouts: Record<string, LayoutItem[]>) => void;

  /**
   * Toggle a widget on/off
   */
  toggleWidget: (widgetId: string) => void;

  /**
   * Enable a widget
   */
  enableWidget: (widgetId: string) => void;

  /**
   * Disable a widget
   */
  disableWidget: (widgetId: string) => void;

  /**
   * Reset layouts to default
   */
  resetLayouts: () => void;

  /**
   * Check if a widget is enabled
   */
  isWidgetEnabled: (widgetId: string) => boolean;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      layouts: DEFAULT_LAYOUTS,
      enabledWidgets: ['habits', 'mood', 'notes', 'pomodoro'],

      setLayouts: (breakpoint, layout) =>
        set((state) => ({
          layouts: { ...state.layouts, [breakpoint]: layout },
        })),

      setAllLayouts: (layouts) => set({ layouts }),

      toggleWidget: (widgetId) =>
        set((state) => {
          const isEnabled = state.enabledWidgets.includes(widgetId);
          return {
            enabledWidgets: isEnabled
              ? state.enabledWidgets.filter((id) => id !== widgetId)
              : [...state.enabledWidgets, widgetId],
          };
        }),

      enableWidget: (widgetId) =>
        set((state) => ({
          enabledWidgets: state.enabledWidgets.includes(widgetId)
            ? state.enabledWidgets
            : [...state.enabledWidgets, widgetId],
        })),

      disableWidget: (widgetId) =>
        set((state) => ({
          enabledWidgets: state.enabledWidgets.filter((id) => id !== widgetId),
        })),

      resetLayouts: () =>
        set({
          layouts: DEFAULT_LAYOUTS,
          enabledWidgets: ['habits', 'mood', 'notes', 'pomodoro'],
        }),

      isWidgetEnabled: (widgetId) => get().enabledWidgets.includes(widgetId),
    }),
    {
      name: 'life-os-layout',
    }
  )
);
