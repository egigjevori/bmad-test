import { format, parseISO } from 'date-fns';

/**
 * Format a Date object to ISO date string (YYYY-MM-DD)
 * Used for storing dates in Dexie
 */
export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Format an ISO date string for display
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Dec 29, 2025")
 */
export function formatDisplay(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy');
}

/**
 * Format an ISO date string for short display
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @returns Short formatted date string (e.g., "Dec 29")
 */
export function formatShortDisplay(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d');
}

/**
 * Get the day of week from an ISO date string
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @returns Day of week (e.g., "Mon", "Tue")
 */
export function getDayOfWeek(dateStr: string): string {
  return format(parseISO(dateStr), 'EEE');
}

/**
 * Get the day number from an ISO date string
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @returns Day number (e.g., "29")
 */
export function getDayNumber(dateStr: string): string {
  return format(parseISO(dateStr), 'd');
}

/**
 * Today's date as ISO string
 */
export const TODAY = formatDateKey(new Date());

/**
 * Check if a date string represents today
 */
export function isToday(dateStr: string): boolean {
  return dateStr === TODAY;
}
