import { db, createTimestamps, updateTimestamp } from '@/lib/db';

import type { Note, NoteType } from './types';

/**
 * Get all active notes for a specific date
 */
export async function getNotesForDate(date: string): Promise<Note[]> {
  const notes = await db.notes
    .where('date')
    .equals(date)
    .and((note) => !note.archived)
    .toArray();

  // Sort: pinned first, then by createdAt descending
  return notes.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

/**
 * Get all notes (including archived) for a date
 */
export async function getAllNotesForDate(date: string): Promise<Note[]> {
  return db.notes.where('date').equals(date).toArray();
}

/**
 * Add a new note
 */
export async function addNote(
  date: string,
  content: string,
  type: NoteType = 'thought',
  tags: string[] = []
): Promise<number> {
  const timestamps = createTimestamps();
  return db.notes.add({
    date,
    content,
    type,
    tags,
    pinned: false,
    archived: false,
    ...timestamps,
  });
}

/**
 * Update a note
 */
export async function updateNote(
  id: number,
  updates: Partial<Pick<Note, 'content' | 'type' | 'tags'>>
): Promise<void> {
  await db.notes.update(id, {
    ...updates,
    ...updateTimestamp(),
  });
}

/**
 * Toggle note pinned status
 */
export async function togglePinNote(id: number): Promise<boolean> {
  const note = await db.notes.get(id);
  if (!note) return false;

  const newPinned = !note.pinned;
  await db.notes.update(id, {
    pinned: newPinned,
    ...updateTimestamp(),
  });
  return newPinned;
}

/**
 * Archive a note
 */
export async function archiveNote(id: number): Promise<void> {
  await db.notes.update(id, {
    archived: true,
    pinned: false, // Unpin when archiving
    ...updateTimestamp(),
  });
}

/**
 * Unarchive a note
 */
export async function unarchiveNote(id: number): Promise<void> {
  await db.notes.update(id, {
    archived: false,
    ...updateTimestamp(),
  });
}

/**
 * Delete a note permanently
 */
export async function deleteNote(id: number): Promise<void> {
  await db.notes.delete(id);
}

/**
 * Get notes summary for bottom bar
 */
export async function getNotesSummary(
  date: string
): Promise<{ count: number; types: Record<NoteType, number> }> {
  const notes = await getNotesForDate(date);

  const types: Record<NoteType, number> = {
    thought: 0,
    idea: 0,
    quote: 0,
    link: 0,
    task: 0,
  };

  notes.forEach((note) => {
    types[note.type]++;
  });

  return { count: notes.length, types };
}
