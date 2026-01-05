import { z } from 'zod';

/**
 * Habit creation/update schema
 */
export const habitSchema = z.object({
  name: z
    .string()
    .min(1, 'Habit name is required')
    .max(100, 'Habit name must be 100 characters or less'),
});

export type HabitFormData = z.infer<typeof habitSchema>;

/**
 * Completion status schema
 */
export const completionStatusSchema = z.enum(['done', 'skipped', 'missed']);
