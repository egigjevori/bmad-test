import { BookOpen } from 'lucide-react';

import { registerWidget } from '../registry';
import type { Widget, WidgetSummary } from '../types';

import { JournalWidget } from './components/JournalWidget';
import { getJournalSummary } from './db';

/**
 * Get journal summary for a specific date
 */
async function getSummary(date: string): Promise<WidgetSummary> {
  const { hasEntry, wordCount } = await getJournalSummary(date);

  return {
    widgetId: 'journal',
    primary: hasEntry ? `📔 ${wordCount} words` : '📔 No entry',
    secondary: hasEntry ? 'Journaled today' : 'Start writing',
    color: 'var(--color-journal)',
    hasData: hasEntry,
  };
}

const journalWidget: Widget = {
  config: {
    id: 'journal',
    name: 'Journal',
    description: 'Daily journaling for reflection and mindfulness',
    icon: BookOpen,
    category: 'wellness',
    sizes: {
      minW: 2,
      minH: 3,
      maxW: 6,
      maxH: 6,
      defaultW: 4,
      defaultH: 4,
    },
  },
  component: JournalWidget,
  getSummary,
};

registerWidget(journalWidget);

export { JournalWidget };
