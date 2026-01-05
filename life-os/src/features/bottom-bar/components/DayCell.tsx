import { motion } from 'motion/react';
import { format, isToday } from 'date-fns';

export interface DayData {
  date: Date;
  habits?: { completed: number; total: number };
  mood?: number | null;
  notes?: number;
}

interface DayCellProps {
  data: DayData;
  isCollapsed: boolean;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Get color based on data presence and type
 */
function getDayColors(data: DayData): string[] {
  const colors: string[] = [];

  // Habits - green
  if (data.habits && data.habits.total > 0) {
    const completion = data.habits.completed / data.habits.total;
    if (completion >= 0.8) {
      colors.push('bg-green-500');
    } else if (completion >= 0.5) {
      colors.push('bg-green-400');
    } else if (completion > 0) {
      colors.push('bg-green-300');
    }
  }

  // Mood - warm colors based on level
  if (data.mood !== null && data.mood !== undefined) {
    if (data.mood >= 4) {
      colors.push('bg-amber-400');
    } else if (data.mood >= 3) {
      colors.push('bg-amber-300');
    } else {
      colors.push('bg-amber-200');
    }
  }

  // Notes - purple
  if (data.notes && data.notes > 0) {
    colors.push('bg-purple-400');
  }

  return colors;
}

export function DayCell({ data, isCollapsed, isSelected, onClick }: DayCellProps) {
  const colors = getDayColors(data);
  const hasData = colors.length > 0;
  const today = isToday(data.date);
  const dayNum = format(data.date, 'd');
  const dayName = format(data.date, 'EEE');

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center rounded-lg transition-all ${
        isCollapsed ? 'h-6 w-6' : 'h-14 w-10'
      } ${isSelected ? 'ring-2 ring-primary' : ''} ${
        today ? 'ring-2 ring-blue-500' : ''
      } ${hasData ? '' : 'opacity-40'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Today pulse indicator */}
      {today && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-blue-500/20"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Color dots/bars */}
      {isCollapsed ? (
        // Collapsed: single blended color dot
        <div
          className={`h-4 w-4 rounded-full ${
            colors.length > 0
              ? colors[0]
              : 'bg-muted-foreground/20'
          }`}
        />
      ) : (
        // Expanded: day info with color strip
        <>
          <span className="text-[10px] text-muted-foreground">{dayName}</span>
          <span className={`text-sm font-medium ${today ? 'text-blue-500' : ''}`}>
            {dayNum}
          </span>
          {/* Color strip at bottom */}
          <div className="mt-1 flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full">
            {colors.length > 0 ? (
              colors.map((color, i) => (
                <div
                  key={i}
                  className={`flex-1 ${color}`}
                />
              ))
            ) : (
              <div className="flex-1 bg-muted-foreground/20" />
            )}
          </div>
        </>
      )}
    </motion.button>
  );
}
