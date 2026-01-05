import { db, createTimestamps } from '@/lib/db';

import type { PomodoroSession, SessionType } from './types';

/**
 * Get all sessions for a specific date
 */
export async function getSessionsForDate(
  date: string
): Promise<PomodoroSession[]> {
  return db.pomodoroSessions.where('date').equals(date).toArray();
}

/**
 * Add a completed session
 */
export async function addSession(
  date: string,
  type: SessionType,
  duration: number
): Promise<number> {
  const timestamps = createTimestamps();
  return db.pomodoroSessions.add({
    date,
    type,
    duration,
    completedAt: new Date().toISOString(),
    ...timestamps,
  });
}

/**
 * Get pomodoro summary for bottom bar
 */
export async function getPomodoroSummary(
  date: string
): Promise<{ count: number; totalMinutes: number }> {
  const sessions = await getSessionsForDate(date);
  const workSessions = sessions.filter((s) => s.type === 'work');

  const count = workSessions.length;
  const totalMinutes = Math.round(
    workSessions.reduce((acc, s) => acc + s.duration, 0) / 60
  );

  return { count, totalMinutes };
}

/**
 * Get today's pomodoro count
 */
export async function getTodayPomodoroCount(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  const sessions = await getSessionsForDate(today);
  return sessions.filter((s) => s.type === 'work').length;
}
