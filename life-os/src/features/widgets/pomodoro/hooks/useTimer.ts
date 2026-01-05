import { useState, useRef, useCallback, useEffect } from 'react';

import { getToday } from '@/lib/db';

import { addSession, getTodayPomodoroCount } from '../db';
import type {
  TimerState,
  SessionType,
  TimerHookState,
  PomodoroConfig,
} from '../types';
import { DEFAULT_CONFIG } from '../types';

/**
 * Custom hook for Pomodoro timer with drift correction
 */
export function useTimer(config: PomodoroConfig = DEFAULT_CONFIG) {
  const [state, setState] = useState<TimerState>('idle');
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [timeRemaining, setTimeRemaining] = useState(config.workDuration);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Get the duration for the current session type
  const getDuration = useCallback(
    (type: SessionType): number => {
      switch (type) {
        case 'work':
          return config.workDuration;
        case 'shortBreak':
          return config.shortBreakDuration;
        case 'longBreak':
          return config.longBreakDuration;
      }
    },
    [config]
  );

  // Load today's pomodoro count on mount
  useEffect(() => {
    getTodayPomodoroCount().then(setPomodoroCount);
  }, []);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Start or resume the timer
  const start = useCallback(() => {
    if (state === 'running') return;

    const now = Date.now();

    if (state === 'paused') {
      // Resume from paused state - adjust start time
      startTimeRef.current = now - (pausedTimeRef.current - startTimeRef.current);
    } else {
      // Fresh start
      startTimeRef.current = now;
      pausedTimeRef.current = 0;
    }

    setState('running');

    const totalDuration = getDuration(sessionType);

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, totalDuration - elapsed);

      setTimeRemaining(remaining);

      if (remaining <= 0) {
        // Timer complete
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setState('complete');

        // Save completed session
        const today = getToday();
        addSession(today, sessionType, totalDuration);

        // Update pomodoro count if work session
        if (sessionType === 'work') {
          setPomodoroCount((prev) => prev + 1);
        }
      }
    }, 100); // Update frequently for smooth countdown
  }, [state, sessionType, getDuration]);

  // Pause the timer
  const pause = useCallback(() => {
    if (state !== 'running') return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    pausedTimeRef.current = Date.now();
    setState('paused');
  }, [state]);

  // Reset to initial state
  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setState('idle');
    setTimeRemaining(getDuration(sessionType));
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  }, [sessionType, getDuration]);

  // Start the next session after completion
  const startNextSession = useCallback(() => {
    let nextType: SessionType;

    if (sessionType === 'work') {
      // After work, decide break type
      const completedPomodoros = pomodoroCount;
      if (completedPomodoros > 0 && completedPomodoros % config.pomodorosUntilLongBreak === 0) {
        nextType = 'longBreak';
      } else {
        nextType = 'shortBreak';
      }
    } else {
      // After any break, go back to work
      nextType = 'work';
    }

    setSessionType(nextType);
    setTimeRemaining(getDuration(nextType));
    setState('idle');
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  }, [sessionType, pomodoroCount, config.pomodorosUntilLongBreak, getDuration]);

  // Skip to a specific session type
  const skipTo = useCallback(
    (type: SessionType) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setSessionType(type);
      setTimeRemaining(getDuration(type));
      setState('idle');
      startTimeRef.current = 0;
      pausedTimeRef.current = 0;
    },
    [getDuration]
  );

  const timerState: TimerHookState = {
    state,
    sessionType,
    timeRemaining,
    totalTime: getDuration(sessionType),
    pomodoroCount,
  };

  return {
    ...timerState,
    start,
    pause,
    reset,
    startNextSession,
    skipTo,
  };
}
