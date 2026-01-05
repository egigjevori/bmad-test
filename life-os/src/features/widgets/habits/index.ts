import { ListChecks } from 'lucide-react';

import { registerWidget } from '../registry';
import type { Widget, WidgetSummary } from '../types';

import { HabitWidget } from './components/HabitWidget';
import { getHabitSummary } from './db';

/**
 * Get habit summary for a specific date
 */
async function getSummary(date: string): Promise<WidgetSummary> {
  const { completed, total, percentage } = await getHabitSummary(date);

  return {
    widgetId: 'habits',
    primary: `${completed}/${total} habits`,
    secondary: `${percentage}%`,
    color: 'var(--color-habit)',
    hasData: total > 0,
  };
}

const habitWidget: Widget = {
  config: {
    id: 'habits',
    name: 'Habit Tracker',
    description: 'Track daily habits and streaks',
    icon: ListChecks,
    category: 'tracking',
    sizes: {
      minW: 2,
      minH: 2,
      maxW: 6,
      maxH: 8,
      defaultW: 4,
      defaultH: 4,
    },
  },
  component: HabitWidget,
  getSummary,
};

registerWidget(habitWidget);

export { HabitWidget };
