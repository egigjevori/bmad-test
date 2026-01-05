import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import type { WidgetProps } from '@/features/widgets/types';

import { useTimer } from '../hooks/useTimer';
import { TimerRing } from './TimerRing';

/**
 * Pomodoro Timer Widget
 * A clean, intuitive focus timer following the Pomodoro Technique
 */
export function PomodoroWidget(_props: WidgetProps) {
  const timer = useTimer();

  const handleMainAction = () => {
    switch (timer.state) {
      case 'idle':
      case 'paused':
        timer.start();
        break;
      case 'running':
        timer.pause();
        break;
      case 'complete':
        timer.startNextSession();
        break;
    }
  };

  const getMainButtonIcon = () => {
    switch (timer.state) {
      case 'idle':
      case 'paused':
        return <Play className="h-5 w-5" />;
      case 'running':
        return <Pause className="h-5 w-5" />;
      case 'complete':
        return <SkipForward className="h-5 w-5" />;
    }
  };

  const getMainButtonLabel = () => {
    switch (timer.state) {
      case 'idle':
        return 'Start';
      case 'paused':
        return 'Resume';
      case 'running':
        return 'Pause';
      case 'complete':
        return 'Next';
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      {/* Timer Ring */}
      <div className="flex-1 flex items-center justify-center w-full">
        <TimerRing
          timeRemaining={timer.timeRemaining}
          totalTime={timer.totalTime}
          sessionType={timer.sessionType}
          state={timer.state}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        {/* Reset button - only show when not idle */}
        {timer.state !== 'idle' && (
          <Button
            variant="outline"
            size="icon"
            onClick={timer.reset}
            className="h-10 w-10 rounded-full"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}

        {/* Main action button */}
        <Button
          onClick={handleMainAction}
          className="h-12 px-6 rounded-full gap-2"
          variant={timer.state === 'complete' ? 'default' : 'default'}
        >
          {getMainButtonIcon()}
          <span>{getMainButtonLabel()}</span>
        </Button>

        {/* Skip button - only show when idle or paused */}
        {(timer.state === 'idle' || timer.state === 'paused') && (
          <Button
            variant="outline"
            size="icon"
            onClick={timer.startNextSession}
            className="h-10 w-10 rounded-full"
            title="Skip to next"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Pomodoro count indicator */}
      {timer.pomodoroCount > 0 && (
        <div className="flex items-center gap-1 mt-3">
          {Array.from({ length: Math.min(timer.pomodoroCount, 8) }).map(
            (_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                title={`Pomodoro ${i + 1}`}
              />
            )
          )}
          {timer.pomodoroCount > 8 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{timer.pomodoroCount - 8}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
