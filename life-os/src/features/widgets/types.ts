import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Widget summary data returned by getSummary()
 * Used by the bottom bar to display day summaries
 */
export interface WidgetSummary {
  /** Widget ID */
  widgetId: string;
  /** Primary display value (e.g., "4/5 habits", "🙂 Good") */
  primary: string;
  /** Optional secondary value (e.g., "80%", "4/5") */
  secondary?: string;
  /** Color to use in the bottom bar */
  color: string;
  /** Whether this widget has data for the given date */
  hasData: boolean;
}

/**
 * Widget size constraints
 */
export interface WidgetSizes {
  /** Minimum width in grid units */
  minW: number;
  /** Minimum height in grid units */
  minH: number;
  /** Maximum width in grid units */
  maxW?: number;
  /** Maximum height in grid units */
  maxH?: number;
  /** Default width in grid units */
  defaultW: number;
  /** Default height in grid units */
  defaultH: number;
}

/**
 * Widget configuration and metadata
 */
export interface WidgetConfig {
  /** Unique widget identifier */
  id: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Icon component from lucide-react */
  icon: LucideIcon;
  /** Size constraints */
  sizes: WidgetSizes;
  /** Category for grouping in settings */
  category: 'tracking' | 'productivity' | 'wellness' | 'other';
}

/**
 * Widget component props
 */
export interface WidgetProps {
  /** Widget ID */
  id: string;
  /** Current date in ISO format (YYYY-MM-DD) */
  date: string;
}

/**
 * Complete widget definition
 */
export interface Widget {
  /** Widget configuration */
  config: WidgetConfig;
  /** Widget component */
  component: ComponentType<WidgetProps>;
  /**
   * Get summary data for a specific date
   * Used by the bottom bar to display day summaries
   */
  getSummary: (date: string) => Promise<WidgetSummary>;
}
