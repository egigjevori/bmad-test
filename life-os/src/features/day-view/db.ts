import { db, createTimestamps, updateTimestamp } from '@/lib/db';
import type { DayCanvas, CanvasStroke } from './types';

/**
 * Get canvas data for a specific date
 */
export async function getCanvasForDate(date: string): Promise<DayCanvas | undefined> {
  return db.dayCanvases.where('date').equals(date).first();
}

/**
 * Save canvas data for a specific date
 */
export async function saveCanvas(date: string, strokes: CanvasStroke[]): Promise<void> {
  const existing = await getCanvasForDate(date);
  const canvasData = JSON.stringify(strokes);

  if (existing) {
    await db.dayCanvases.update(existing.id!, {
      canvasData,
      ...updateTimestamp(),
    });
  } else {
    await db.dayCanvases.add({
      date,
      canvasData,
      ...createTimestamps(),
    });
  }
}

/**
 * Get strokes from canvas data
 */
export async function getStrokesForDate(date: string): Promise<CanvasStroke[]> {
  const canvas = await getCanvasForDate(date);
  if (!canvas) return [];
  try {
    return JSON.parse(canvas.canvasData);
  } catch {
    return [];
  }
}

/**
 * Clear canvas for a specific date
 */
export async function clearCanvas(date: string): Promise<void> {
  const existing = await getCanvasForDate(date);
  if (existing) {
    await db.dayCanvases.delete(existing.id!);
  }
}
