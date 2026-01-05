import { db, getToday, createTimestamps, updateTimestamp } from '@/lib/db';

import type { JournalEntry } from './types';

/**
 * Get journal entry for a specific date
 */
export async function getJournalEntry(
  date: string
): Promise<JournalEntry | undefined> {
  return db.journalEntries.where('date').equals(date).first();
}

/**
 * Get today's journal entry
 */
export async function getTodayJournalEntry(): Promise<JournalEntry | undefined> {
  return getJournalEntry(getToday());
}

/**
 * Create or update journal entry for a date
 */
export async function saveJournalEntry(
  date: string,
  content: string,
  prompt?: string
): Promise<number> {
  const existing = await getJournalEntry(date);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  if (existing) {
    await db.journalEntries.update(existing.id!, {
      content,
      prompt,
      wordCount,
      ...updateTimestamp(),
    });
    return existing.id!;
  }

  return db.journalEntries.add({
    date,
    content,
    prompt,
    wordCount,
    ...createTimestamps(),
  } as JournalEntry);
}

/**
 * Delete a journal entry
 */
export async function deleteJournalEntry(id: number): Promise<void> {
  await db.journalEntries.delete(id);
}

/**
 * Get journal summary for bottom bar
 */
export async function getJournalSummary(
  date: string
): Promise<{ hasEntry: boolean; wordCount: number }> {
  const entry = await getJournalEntry(date);
  return {
    hasEntry: !!entry && entry.content.trim().length > 0,
    wordCount: entry?.wordCount ?? 0,
  };
}

/**
 * Get recent journal entries for history view
 */
export async function getRecentJournalEntries(
  limit = 7
): Promise<JournalEntry[]> {
  return db.journalEntries.orderBy('date').reverse().limit(limit).toArray();
}
