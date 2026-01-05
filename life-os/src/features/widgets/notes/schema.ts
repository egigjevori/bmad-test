import { z } from 'zod';

/**
 * Note creation/update schema
 */
export const noteSchema = z.object({
  content: z
    .string()
    .min(1, 'Note content is required')
    .max(5000, 'Note must be 5000 characters or less'),
  type: z.enum(['thought', 'idea', 'quote', 'link', 'task']).default('thought'),
  tags: z.array(z.string()).default([]),
});

export type NoteFormData = z.infer<typeof noteSchema>;
