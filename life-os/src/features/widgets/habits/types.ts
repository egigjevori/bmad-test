import type { BaseEntry } from '@/lib/db';

/**
 * Habit definition
 */
export interface Habit {
  id?: number;
  name: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Habit completion status
 */
export type CompletionStatus = 'done' | 'skipped' | 'missed';

/**
 * Daily habit completion record
 */
export interface HabitCompletion extends BaseEntry {
  habitId: number;
  status: CompletionStatus;
}

/**
 * Habit with its completion status for a specific day
 */
export interface HabitWithStatus extends Habit {
  completion?: HabitCompletion;
  streak: number;
}
