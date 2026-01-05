import { useState, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ListChecks, Plus, Check, Pencil, Trash2, Flame, X } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import type { WidgetProps } from '../../types';
import type { HabitWithStatus } from '../types';
import {
  getHabits,
  getCompletionsForDate,
  addHabit,
  updateHabit,
  toggleHabitCompletion,
  archiveHabit,
  calculateStreak,
} from '../db';

export function HabitWidget({ date }: WidgetProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  // Live query for habits
  const habits = useLiveQuery(() => getHabits(), []);
  const completions = useLiveQuery(() => getCompletionsForDate(date), [date]);

  // Combine habits with their completion status
  const habitsWithStatus = useLiveQuery(async (): Promise<HabitWithStatus[]> => {
    if (!habits) return [];

    const result: HabitWithStatus[] = [];
    for (const habit of habits) {
      const completion = completions?.find((c) => c.habitId === habit.id);
      const streak = await calculateStreak(habit.id!);
      result.push({
        ...habit,
        completion,
        streak,
      });
    }
    return result;
  }, [habits, completions]);

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return;

    await addHabit(newHabitName.trim());
    setNewHabitName('');
    setIsAdding(false);
  };

  const handleStartEdit = (habit: HabitWithStatus) => {
    setEditingId(habit.id!);
    setEditName(habit.name);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editName.trim()) return;

    await updateHabit(editingId, { name: editName.trim() });
    setEditingId(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleToggle = async (habitId: number) => {
    await toggleHabitCompletion(habitId, date);
  };

  const handleArchive = async (habitId: number) => {
    await archiveHabit(habitId);
  };

  const completedCount =
    habitsWithStatus?.filter((h) => h.completion?.status === 'done').length ?? 0;
  const totalCount = habitsWithStatus?.length ?? 0;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-green-600 dark:text-green-400" />
          <h3 className="font-medium">Habits</h3>
          {totalCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {completedCount}/{totalCount} ({percentage}%)
            </span>
          )}
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="rounded-md p-1 hover:bg-muted"
          aria-label="Add habit"
        >
          <Plus className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {isAdding && (
          <div className="flex gap-2 border-b p-3">
            <input
              ref={inputRef}
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddHabit();
                if (e.key === 'Escape') {
                  setIsAdding(false);
                  setNewHabitName('');
                }
              }}
              placeholder="New habit name..."
              className="flex-1 rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleAddHabit}
              className="rounded-md bg-primary px-2 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        )}

        {(!habitsWithStatus || habitsWithStatus.length === 0) && !isAdding ? (
          <div className="flex flex-1 items-center justify-center p-4 text-muted-foreground">
            <p className="text-sm">No habits yet. Click + to add one.</p>
          </div>
        ) : (
          <ul ref={listRef} className="divide-y">
            {habitsWithStatus?.map((habit) => (
              <li
                key={habit.id}
                className="group flex items-center gap-3 px-3 py-2 hover:bg-muted/50"
              >
                <button
                  onClick={() => handleToggle(habit.id!)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    habit.completion?.status === 'done'
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-muted-foreground/30 hover:border-green-500'
                  }`}
                  aria-label={`Toggle ${habit.name}`}
                >
                  {habit.completion?.status === 'done' && (
                    <Check className="h-3 w-3" />
                  )}
                </button>

                {editingId === habit.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      className="flex-1 rounded-md border bg-background px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="text-xs text-primary hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <span
                    className={`flex-1 text-sm ${
                      habit.completion?.status === 'done'
                        ? 'text-muted-foreground line-through'
                        : ''
                    }`}
                  >
                    {habit.name}
                  </span>
                )}

                {habit.streak > 0 && editingId !== habit.id && (
                  <span className="flex items-center gap-1 text-xs text-orange-500">
                    <Flame className="h-3 w-3" />
                    {habit.streak}
                  </span>
                )}

                {editingId !== habit.id && (
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleStartEdit(habit)}
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label="Edit habit"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleArchive(habit.id!)}
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-destructive"
                      aria-label="Delete habit"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
