import type { BaseEntry } from '@/lib/db';

/**
 * Timer state
 */
export type TimerState = 'idle' | 'running' | 'paused' | 'complete';

/**
 * Session type
 */
export type SessionType = 'work' | 'shortBreak' | 'longBreak';

/**
 * Pomodoro configuration
 */
export interface PomodoroConfig {
  workDuration: number; // in seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosUntilLongBreak: number;
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  pomodorosUntilLongBreak: 4,
};

/**
 * Completed pomodoro session (stored in DB)
 */
export interface PomodoroSession extends BaseEntry {
  type: SessionType;
  duration: number; // actual duration in seconds
  completedAt: string; // ISO timestamp
}

/**
 * Timer state for the hook
 */
export interface TimerHookState {
  state: TimerState;
  sessionType: SessionType;
  timeRemaining: number; // in seconds
  totalTime: number; // in seconds
  pomodoroCount: number; // completed today
}
