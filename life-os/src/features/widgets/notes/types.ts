import type { BaseEntry } from '@/lib/db';

/**
 * Note type icons and labels
 */
export const NOTE_TYPES = {
  thought: { emoji: '💭', label: 'Thought' },
  idea: { emoji: '💡', label: 'Idea' },
  quote: { emoji: '💬', label: 'Quote' },
  link: { emoji: '🔗', label: 'Link' },
  task: { emoji: '☑️', label: 'Task' },
} as const;

export type NoteType = keyof typeof NOTE_TYPES;

/**
 * Note entry record
 */
export interface Note extends BaseEntry {
  content: string;
  type: NoteType;
  tags: string[];
  pinned: boolean;
  archived: boolean;
}

/**
 * Note with display info
 */
export interface NoteWithInfo extends Note {
  typeEmoji: string;
  typeLabel: string;
}
