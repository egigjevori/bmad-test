import { SmilePlus } from 'lucide-react';

import { registerWidget } from '../registry';
import type { Widget, WidgetSummary } from '../types';

import { MoodWidget } from './components/MoodWidget';
import { getMoodSummary } from './db';
import { MOOD_EMOJIS, MOOD_LABELS } from './types';

/**
 * Get mood summary for a specific date
 */
async function getSummary(date: string): Promise<WidgetSummary> {
  const { mood, count } = await getMoodSummary(date);

  if (!mood) {
    return {
      widgetId: 'mood',
      primary: 'No mood logged',
      color: 'var(--color-mood)',
      hasData: false,
    };
  }

  return {
    widgetId: 'mood',
    primary: `${MOOD_EMOJIS[mood]} ${MOOD_LABELS[mood]}`,
    secondary: count > 1 ? `${count} check-ins` : undefined,
    color: 'var(--color-mood)',
    hasData: true,
  };
}

const moodWidget: Widget = {
  config: {
    id: 'mood',
    name: 'Mood Tracker',
    description: 'Log your mood and energy levels',
    icon: SmilePlus,
    category: 'wellness',
    sizes: {
      minW: 2,
      minH: 2,
      maxW: 6,
      maxH: 4,
      defaultW: 4,
      defaultH: 2,
    },
  },
  component: MoodWidget,
  getSummary,
};

registerWidget(moodWidget);

export { MoodWidget };
