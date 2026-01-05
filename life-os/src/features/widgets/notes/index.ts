import { StickyNote } from 'lucide-react';

import { registerWidget } from '../registry';
import type { Widget, WidgetSummary } from '../types';

import { NotesWidget } from './components/NotesWidget';
import { getNotesSummary } from './db';

/**
 * Get notes summary for a specific date
 */
async function getSummary(date: string): Promise<WidgetSummary> {
  const { count } = await getNotesSummary(date);

  return {
    widgetId: 'notes',
    primary: `${count} note${count !== 1 ? 's' : ''}`,
    color: 'var(--color-notes)',
    hasData: count > 0,
  };
}

const notesWidget: Widget = {
  config: {
    id: 'notes',
    name: 'Quick Notes',
    description: 'Capture thoughts and ideas instantly',
    icon: StickyNote,
    category: 'productivity',
    sizes: {
      minW: 2,
      minH: 2,
      maxW: 8,
      maxH: 8,
      defaultW: 4,
      defaultH: 4,
    },
  },
  component: NotesWidget,
  getSummary,
};

registerWidget(notesWidget);

export { NotesWidget };
