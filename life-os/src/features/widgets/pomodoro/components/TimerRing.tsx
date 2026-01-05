import { motion } from 'motion/react';

import type { SessionType, TimerState } from '../types';

interface TimerRingProps {
  timeRemaining: number;
  totalTime: number;
  sessionType: SessionType;
  state: TimerState;
}

/**
 * Format seconds to MM:SS
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get color based on session type
 */
function getSessionColor(type: SessionType): string {
  switch (type) {
    case 'work':
      return 'var(--color-pomodoro-work)';
    case 'shortBreak':
      return 'var(--color-pomodoro-break)';
    case 'longBreak':
      return 'var(--color-pomodoro-long-break)';
  }
}

/**
 * Get session label
 */
function getSessionLabel(type: SessionType): string {
  switch (type) {
    case 'work':
      return 'Focus';
    case 'shortBreak':
      return 'Short Break';
    case 'longBreak':
      return 'Long Break';
  }
}

/**
 * Circular timer ring with countdown
 */
export function TimerRing({
  timeRemaining,
  totalTime,
  sessionType,
  state,
}: TimerRingProps) {
  const progress = totalTime > 0 ? timeRemaining / totalTime : 1;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference * (1 - progress);
  const color = getSessionColor(sessionType);

  return (
    <div className="relative flex items-center justify-center">
      {/* SVG Ring */}
      <svg
        className="w-full h-full max-w-[180px] max-h-[180px] -rotate-90"
        viewBox="0 0 100 100"
      >
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted-foreground/20"
        />

        {/* Progress ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Session label */}
        <span
          className="text-xs font-medium uppercase tracking-wider mb-1"
          style={{ color }}
        >
          {getSessionLabel(sessionType)}
        </span>

        {/* Time display */}
        <motion.span
          className="text-3xl font-bold tabular-nums"
          animate={
            state === 'complete'
              ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }
              : {}
          }
          transition={{
            duration: 0.8,
            repeat: state === 'complete' ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {formatTime(timeRemaining)}
        </motion.span>

        {/* State indicator */}
        {state === 'paused' && (
          <span className="text-xs text-muted-foreground mt-1">Paused</span>
        )}
        {state === 'complete' && (
          <motion.span
            className="text-xs font-medium mt-1"
            style={{ color }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Complete!
          </motion.span>
        )}
      </div>
    </div>
  );
}
