import { db, createTimestamps, updateTimestamp } from '@/lib/db';

import type { Habit, HabitCompletion, CompletionStatus } from './types';

/**
 * Get all active (non-archived) habits
 */
export async function getHabits(): Promise<Habit[]> {
  return db.habits.where('archived').equals(0).toArray();
}

/**
 * Get all habits including archived
 */
export async function getAllHabits(): Promise<Habit[]> {
  return db.habits.toArray();
}

/**
 * Add a new habit
 */
export async function addHabit(name: string): Promise<number> {
  const timestamps = createTimestamps();
  return db.habits.add({
    name,
    archived: false,
    ...timestamps,
  });
}

/**
 * Update a habit
 */
export async function updateHabit(
  id: number,
  updates: Partial<Pick<Habit, 'name' | 'archived'>>
): Promise<void> {
  await db.habits.update(id, {
    ...updates,
    ...updateTimestamp(),
  });
}

/**
 * Archive a habit (soft delete)
 */
export async function archiveHabit(id: number): Promise<void> {
  await updateHabit(id, { archived: true });
}

/**
 * Delete a habit permanently
 */
export async function deleteHabit(id: number): Promise<void> {
  await db.transaction('rw', [db.habits, db.habitCompletions], async () => {
    await db.habitCompletions.where('habitId').equals(id).delete();
    await db.habits.delete(id);
  });
}

/**
 * Get completions for a specific date
 */
export async function getCompletionsForDate(
  date: string
): Promise<HabitCompletion[]> {
  return db.habitCompletions.where('date').equals(date).toArray();
}

/**
 * Get completion for a specific habit and date
 */
export async function getCompletion(
  habitId: number,
  date: string
): Promise<HabitCompletion | undefined> {
  return db.habitCompletions
    .where('[habitId+date]')
    .equals([habitId, date])
    .first();
}

/**
 * Toggle habit completion for a date
 */
export async function toggleHabitCompletion(
  habitId: number,
  date: string
): Promise<CompletionStatus | null> {
  const existing = await getCompletion(habitId, date);

  if (existing) {
    // Remove completion (toggle off)
    await db.habitCompletions.delete(existing.id!);
    return null;
  }

  // Add completion
  const timestamps = createTimestamps();
  await db.habitCompletions.add({
    habitId,
    date,
    status: 'done',
    ...timestamps,
  });
  return 'done';
}

/**
 * Set habit status (done, skipped, missed)
 */
export async function setHabitStatus(
  habitId: number,
  date: string,
  status: CompletionStatus
): Promise<void> {
  const existing = await getCompletion(habitId, date);
  const timestamps = createTimestamps();

  if (existing) {
    await db.habitCompletions.update(existing.id!, {
      status,
      ...updateTimestamp(),
    });
  } else {
    await db.habitCompletions.add({
      habitId,
      date,
      status,
      ...timestamps,
    });
  }
}

/**
 * Calculate streak for a habit
 */
export async function calculateStreak(habitId: number): Promise<number> {
  const completions = await db.habitCompletions
    .where('habitId')
    .equals(habitId)
    .toArray();

  if (completions.length === 0) return 0;

  // Sort by date descending
  const sorted = completions
    .filter((c) => c.status === 'done' || c.status === 'skipped')
    .sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) return 0;

  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  let checkDate = new Date(today);

  // Check if today or yesterday has a completion (streak might be ongoing)
  const todayCompletion = sorted.find((c) => c.date === today);
  const yesterday = new Date(checkDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  const yesterdayCompletion = sorted.find((c) => c.date === yesterdayStr);

  if (!todayCompletion && !yesterdayCompletion) {
    return 0; // Streak broken
  }

  // Start from the most recent completion
  const startDate = todayCompletion ? today : yesterdayStr;
  checkDate = new Date(startDate);

  for (const completion of sorted) {
    const expectedDate = checkDate.toISOString().split('T')[0];

    if (completion.date === expectedDate) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (completion.date < expectedDate) {
      // Gap in dates, streak broken
      break;
    }
  }

  return streak;
}

/**
 * Get habit summary for bottom bar
 */
export async function getHabitSummary(
  date: string
): Promise<{ completed: number; total: number; percentage: number }> {
  const habits = await getHabits();
  const completions = await getCompletionsForDate(date);

  const completed = completions.filter((c) => c.status === 'done').length;
  const total = habits.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
