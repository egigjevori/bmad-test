import Dexie, { type EntityTable } from 'dexie';

import type { Habit, HabitCompletion } from '@/features/widgets/habits/types';
import type { MoodEntry } from '@/features/widgets/mood/types';
import type { Note } from '@/features/widgets/notes/types';

/**
 * Base interface for all widget data entries
 * Widgets extend this with their own fields
 */
export interface BaseEntry {
  id?: number;
  date: string; // ISO date string (YYYY-MM-DD)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Life OS Database
 */
class LifeOSDatabase extends Dexie {
  habits!: EntityTable<Habit, 'id'>;
  habitCompletions!: EntityTable<HabitCompletion, 'id'>;
  moods!: EntityTable<MoodEntry, 'id'>;
  notes!: EntityTable<Note, 'id'>;

  constructor() {
    super('life-os');

    this.version(2).stores({
      habits: '++id, name, archived, createdAt',
      habitCompletions: '++id, habitId, date, [habitId+date]',
      moods: '++id, date, mood, createdAt',
      notes: '++id, date, type, pinned, archived, createdAt',
    });
  }
}

export const db = new LifeOSDatabase();

/**
 * Helper to get today's ISO date string
 */
export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Helper to create timestamps
 */
export function createTimestamps() {
  const now = new Date().toISOString();
  return {
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Helper to update the updatedAt timestamp
 */
export function updateTimestamp() {
  return {
    updatedAt: new Date().toISOString(),
  };
}
