import { db, createTimestamps } from '@/lib/db';

import type { MoodEntry, MoodLevel, EnergyLevel, MoodTag } from './types';

/**
 * Get all mood entries for a specific date
 */
export async function getMoodEntriesForDate(date: string): Promise<MoodEntry[]> {
  return db.moods.where('date').equals(date).toArray();
}

/**
 * Get the latest mood entry for a date
 */
export async function getLatestMoodForDate(
  date: string
): Promise<MoodEntry | undefined> {
  const entries = await getMoodEntriesForDate(date);
  if (entries.length === 0) return undefined;

  // Sort by createdAt descending and return the first
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

/**
 * Log a new mood entry
 */
export async function logMood(
  date: string,
  mood: MoodLevel,
  energy?: EnergyLevel,
  tags: MoodTag[] = [],
  note?: string
): Promise<number> {
  const timestamps = createTimestamps();
  return db.moods.add({
    date,
    mood,
    energy,
    tags,
    note,
    ...timestamps,
  });
}

/**
 * Update a mood entry
 */
export async function updateMoodEntry(
  id: number,
  updates: Partial<Pick<MoodEntry, 'mood' | 'energy' | 'tags' | 'note'>>
): Promise<void> {
  await db.moods.update(id, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Delete a mood entry
 */
export async function deleteMoodEntry(id: number): Promise<void> {
  await db.moods.delete(id);
}

/**
 * Get mood entries for a date range (for trends)
 */
export async function getMoodEntriesForRange(
  startDate: string,
  endDate: string
): Promise<MoodEntry[]> {
  return db.moods
    .where('date')
    .between(startDate, endDate, true, true)
    .toArray();
}

/**
 * Calculate average mood for a date
 */
export async function getAverageMoodForDate(
  date: string
): Promise<number | null> {
  const entries = await getMoodEntriesForDate(date);
  if (entries.length === 0) return null;

  const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
  return Math.round((sum / entries.length) * 10) / 10;
}

/**
 * Get mood summary for bottom bar
 */
export async function getMoodSummary(
  date: string
): Promise<{ mood: MoodLevel | null; count: number }> {
  const entries = await getMoodEntriesForDate(date);

  if (entries.length === 0) {
    return { mood: null, count: 0 };
  }

  // Get the most recent mood
  const sorted = entries.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return { mood: sorted[0].mood, count: entries.length };
}

/**
 * Trend data point for charts
 */
export interface MoodTrendPoint {
  date: string;
  dayLabel: string;
  mood: number | null;
  energy: number | null;
}

/**
 * Get mood trend data for the last N days
 */
export async function getMoodTrend(days: number = 7): Promise<MoodTrendPoint[]> {
  const today = new Date();
  const result: MoodTrendPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });

    const entries = await getMoodEntriesForDate(dateStr);

    if (entries.length === 0) {
      result.push({ date: dateStr, dayLabel, mood: null, energy: null });
    } else {
      const avgMood = entries.reduce((sum, e) => sum + e.mood, 0) / entries.length;
      const energyEntries = entries.filter((e) => e.energy !== undefined);
      const avgEnergy =
        energyEntries.length > 0
          ? energyEntries.reduce((sum, e) => sum + (e.energy || 0), 0) / energyEntries.length
          : null;

      result.push({
        date: dateStr,
        dayLabel,
        mood: Math.round(avgMood * 10) / 10,
        energy: avgEnergy ? Math.round(avgEnergy * 10) / 10 : null,
      });
    }
  }

  return result;
}
