import { Timer } from 'lucide-react';

import { registerWidget } from '../registry';
import type { Widget, WidgetSummary } from '../types';

import { PomodoroWidget } from './components/PomodoroWidget';
import { getPomodoroSummary } from './db';

/**
 * Get pomodoro summary for a specific date
 */
async function getSummary(date: string): Promise<WidgetSummary> {
  const { count, totalMinutes } = await getPomodoroSummary(date);

  return {
    widgetId: 'pomodoro',
    primary: `🍅 ${count} pomodoro${count !== 1 ? 's' : ''}`,
    secondary: `${totalMinutes} min focused`,
    color: 'var(--color-pomodoro)',
    hasData: count > 0,
  };
}

const pomodoroWidget: Widget = {
  config: {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus timer using the Pomodoro Technique',
    icon: Timer,
    category: 'productivity',
    sizes: {
      minW: 2,
      minH: 3,
      maxW: 4,
      maxH: 5,
      defaultW: 2,
      defaultH: 3,
    },
  },
  component: PomodoroWidget,
  getSummary,
};

registerWidget(pomodoroWidget);

export { PomodoroWidget };
