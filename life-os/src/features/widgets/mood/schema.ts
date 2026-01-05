import { z } from 'zod';

/**
 * Mood entry validation schema
 */
export const moodEntrySchema = z.object({
  mood: z.number().min(1).max(5),
  energy: z.number().min(1).max(10).optional(),
  tags: z.array(z.string()).default([]),
  note: z.string().max(500).optional(),
});

export type MoodEntryFormData = z.infer<typeof moodEntrySchema>;
