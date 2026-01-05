import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format, subDays, addDays } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';

import { DayCell, type DayData } from './DayCell';
import { getHabitSummary } from '@/features/widgets/habits/db';
import { getMoodSummary } from '@/features/widgets/mood/db';
import { getNotesSummary } from '@/features/widgets/notes/db';
import { TODAY } from '@/shared/utils';

interface CalendarStripProps {
  isCollapsed: boolean;
  daysToShow?: number;
}

export function CalendarStrip({
  isCollapsed,
  daysToShow = 14,
}: CalendarStripProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current date from URL if on day view
  const currentDateFromUrl = location.pathname.startsWith('/day/')
    ? location.pathname.replace('/day/', '')
    : null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  // Generate array of dates
  const dates: Date[] = [];
  for (let i = daysToShow - 1; i >= 0; i--) {
    dates.push(subDays(today, i));
  }
  // Add a few future days
  for (let i = 1; i <= 3; i++) {
    dates.push(addDays(today, i));
  }

  // Fetch data for all dates
  const dayDataMap = useLiveQuery(async () => {
    const map = new Map<string, DayData>();

    for (const date of dates) {
      const dateStr = format(date, 'yyyy-MM-dd');
      const [habits, mood, notes] = await Promise.all([
        getHabitSummary(dateStr),
        getMoodSummary(dateStr),
        getNotesSummary(dateStr),
      ]);

      map.set(dateStr, {
        date,
        habits: { completed: habits.completed, total: habits.total },
        mood: mood.mood,
        notes: notes.count,
      });
    }

    return map;
  }, [dates.length]);

  // Scroll to today on mount
  useEffect(() => {
    if (scrollRef.current) {
      const todayIndex = dates.findIndex(
        (d) => format(d, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
      );
      const cellWidth = isCollapsed ? 32 : 48; // approximate
      const scrollPos = todayIndex * cellWidth - scrollRef.current.clientWidth / 2 + cellWidth / 2;
      scrollRef.current.scrollLeft = Math.max(0, scrollPos);
    }
  }, [isCollapsed]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-1 overflow-x-auto scrollbar-hide px-2"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {dates.map((date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const data = dayDataMap?.get(dateStr) || { date };
        const isToday = dateStr === TODAY;
        const isSelected = currentDateFromUrl === dateStr || (!currentDateFromUrl && isToday);

        const handleClick = () => {
          if (isToday && !currentDateFromUrl) {
            // Already on dashboard showing today - do nothing
            return;
          }
          if (isToday) {
            // Go back to dashboard for today
            navigate('/');
          } else {
            // Navigate to day view
            navigate(`/day/${dateStr}`);
          }
        };

        return (
          <DayCell
            key={dateStr}
            data={data}
            isCollapsed={isCollapsed}
            isSelected={isSelected}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
}
