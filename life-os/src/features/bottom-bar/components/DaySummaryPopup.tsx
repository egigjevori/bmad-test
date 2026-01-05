import { format } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { getHabitSummary } from '@/features/widgets/habits/db';
import { getMoodSummary } from '@/features/widgets/mood/db';
import { getNotesSummary } from '@/features/widgets/notes/db';
import { MOOD_EMOJIS, MOOD_LABELS, type MoodLevel } from '@/features/widgets/mood/types';

interface DaySummaryPopupProps {
  date: Date;
  onClose: () => void;
}

export function DaySummaryPopup({ date, onClose }: DaySummaryPopupProps) {
  const navigate = useNavigate();
  const dateStr = format(date, 'yyyy-MM-dd');
  const displayDate = format(date, 'EEEE, MMMM d');

  // Fetch summaries for the selected date
  const summaries = useLiveQuery(async () => {
    const [habits, mood, notes] = await Promise.all([
      getHabitSummary(dateStr),
      getMoodSummary(dateStr),
      getNotesSummary(dateStr),
    ]);
    return { habits, mood, notes };
  }, [dateStr]);

  const handleViewFullDay = () => {
    navigate(`/day/${dateStr}`);
    onClose();
  };

  if (!summaries) {
    return null;
  }

  const hasAnyData =
    summaries.habits.total > 0 ||
    summaries.mood.mood !== null ||
    summaries.notes.count > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-lg border bg-popover p-3 shadow-lg"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{displayDate}</h3>
        <button
          onClick={onClose}
          className="rounded p-1 hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Summaries */}
      {hasAnyData ? (
        <div className="space-y-2">
          {/* Habits */}
          {summaries.habits.total > 0 && (
            <div className="flex items-center gap-2 rounded-md bg-green-50 dark:bg-green-950/30 p-2">
              <span className="text-lg">✓</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {summaries.habits.completed}/{summaries.habits.total} habits
                </p>
                <p className="text-xs text-muted-foreground">
                  {summaries.habits.percentage}% complete
                </p>
              </div>
            </div>
          )}

          {/* Mood */}
          {summaries.mood.mood !== null && (
            <div className="flex items-center gap-2 rounded-md bg-amber-50 dark:bg-amber-950/30 p-2">
              <span className="text-lg">
                {MOOD_EMOJIS[summaries.mood.mood as MoodLevel]}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {MOOD_LABELS[summaries.mood.mood as MoodLevel]}
                </p>
                {summaries.mood.count > 1 && (
                  <p className="text-xs text-muted-foreground">
                    {summaries.mood.count} check-ins
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {summaries.notes.count > 0 && (
            <div className="flex items-center gap-2 rounded-md bg-purple-50 dark:bg-purple-950/30 p-2">
              <span className="text-lg">📝</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {summaries.notes.count} note{summaries.notes.count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="py-2 text-center text-sm text-muted-foreground">
          No data for this day
        </p>
      )}

      {/* View Full Day button */}
      <button
        onClick={handleViewFullDay}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-primary py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        View Full Day
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
