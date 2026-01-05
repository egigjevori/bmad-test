import type { BaseEntry } from '@/lib/db';

/**
 * Mood level (1-5 scale)
 */
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Energy level (1-10 scale)
 */
export type EnergyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Predefined mood tags
 */
export const MOOD_TAGS = [
  'Calm',
  'Focused',
  'Stressed',
  'Anxious',
  'Happy',
  'Tired',
  'Energetic',
  'Productive',
  'Creative',
  'Social',
] as const;

export type MoodTag = (typeof MOOD_TAGS)[number];

/**
 * Mood emoji mapping
 */
export const MOOD_EMOJIS: Record<MoodLevel, string> = {
  1: '😢',
  2: '😕',
  3: '😐',
  4: '🙂',
  5: '😄',
};

/**
 * Mood descriptors
 */
export const MOOD_LABELS: Record<MoodLevel, string> = {
  1: 'Awful',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

/**
 * Mood entry record
 */
export interface MoodEntry extends BaseEntry {
  mood: MoodLevel;
  energy?: EnergyLevel;
  tags: MoodTag[];
  note?: string;
}
