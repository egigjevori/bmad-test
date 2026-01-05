import type { BaseEntry } from '@/lib/db';

/**
 * Journal prompts to inspire reflection
 */
export const JOURNAL_PROMPTS = [
  'What are you grateful for today?',
  'What was the highlight of your day?',
  'What did you learn today?',
  'How are you feeling right now?',
  'What challenged you today?',
  'What would make tomorrow great?',
  'What are you proud of?',
  'What could you have done better?',
  'Who made a difference in your day?',
  'What are you looking forward to?',
] as const;

/**
 * Journal entry record
 * One entry per day for focused daily reflection
 */
export interface JournalEntry extends BaseEntry {
  content: string;
  prompt?: string;
  wordCount: number;
}
