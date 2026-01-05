import type { Widget, WidgetConfig, WidgetSummary } from './types';

/**
 * Widget registry - stores all registered widgets
 */
const widgetRegistry = new Map<string, Widget>();

/**
 * Register a widget with the registry
 * Widgets call this on module load to self-register
 */
export function registerWidget(widget: Widget): void {
  if (widgetRegistry.has(widget.config.id)) {
    console.warn(`Widget "${widget.config.id}" is already registered`);
    return;
  }
  widgetRegistry.set(widget.config.id, widget);
}

/**
 * Get a widget by ID
 */
export function getWidget(id: string): Widget | undefined {
  return widgetRegistry.get(id);
}

/**
 * Get all registered widgets
 */
export function getRegisteredWidgets(): Widget[] {
  return Array.from(widgetRegistry.values());
}

/**
 * Get all widget configs (for settings UI)
 */
export function getWidgetConfigs(): WidgetConfig[] {
  return getRegisteredWidgets().map((w) => w.config);
}

/**
 * Get summary data for all widgets for a specific date
 */
export async function getAllWidgetSummaries(
  date: string
): Promise<WidgetSummary[]> {
  const widgets = getRegisteredWidgets();
  const summaries = await Promise.all(
    widgets.map((widget) => widget.getSummary(date))
  );
  return summaries.filter((s) => s.hasData);
}

/**
 * Check if a widget is registered
 */
export function isWidgetRegistered(id: string): boolean {
  return widgetRegistry.has(id);
}

/**
 * Initialize all widgets
 * Call this once at app startup to trigger widget registration
 */
export async function initializeWidgets(): Promise<void> {
  // Import all widget modules to trigger registration
  // Each widget module calls registerWidget() on import
  await import('./habits');
  await import('./mood');
  await import('./notes');
  await import('./pomodoro');
}
