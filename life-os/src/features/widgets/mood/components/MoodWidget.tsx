import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { SmilePlus, Trash2, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import type { WidgetProps } from '../../types';
import type { MoodLevel, MoodTag } from '../types';
import { MOOD_EMOJIS, MOOD_LABELS, MOOD_TAGS } from '../types';
import { getMoodEntriesForDate, logMood, deleteMoodEntry } from '../db';
import { MoodTrendChart } from './MoodTrendChart';

export function MoodWidget({ date }: WidgetProps) {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [energy, setEnergy] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<MoodTag[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrend, setShowTrend] = useState(false);

  // Live query for today's mood entries
  const moodEntries = useLiveQuery(
    () => getMoodEntriesForDate(date),
    [date]
  );

  const handleMoodSelect = async (mood: MoodLevel) => {
    setSelectedMood(mood);

    if (!isExpanded) {
      // Quick log - just the mood
      await logMood(date, mood);
      setSelectedMood(null);
    }
  };

  const handleLogWithDetails = async () => {
    if (!selectedMood) return;

    await logMood(date, selectedMood, energy as 1|2|3|4|5|6|7|8|9|10, selectedTags);
    setSelectedMood(null);
    setSelectedTags([]);
    setEnergy(5);
    setIsExpanded(false);
  };

  const toggleTag = (tag: MoodTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDeleteEntry = async (id: number) => {
    await deleteMoodEntry(id);
  };

  const latestMood = moodEntries?.[moodEntries.length - 1];

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <SmilePlus className="h-4 w-4 text-amber-500" />
          <h3 className="font-medium">Mood</h3>
        </div>
        <div className="flex items-center gap-2">
          {latestMood && (
            <span className="text-sm text-muted-foreground">
              {MOOD_EMOJIS[latestMood.mood]} {MOOD_LABELS[latestMood.mood]}
            </span>
          )}
          <button
            onClick={() => setShowTrend(!showTrend)}
            className={`rounded-md p-1 hover:bg-muted ${showTrend ? 'bg-muted text-primary' : ''}`}
            aria-label="Toggle trend chart"
          >
            <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {/* Trend Chart */}
        <AnimatePresence>
          {showTrend && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b pb-3"
            >
              <p className="mb-2 text-xs text-muted-foreground">7-Day Trend</p>
              <MoodTrendChart days={7} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            How are you feeling?
          </p>
          <div className="flex justify-center gap-2">
            {([1, 2, 3, 4, 5] as MoodLevel[]).map((level) => (
              <motion.button
                key={level}
                onClick={() => handleMoodSelect(level)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full p-2 text-2xl transition-colors ${
                  selectedMood === level
                    ? 'bg-primary/20 ring-2 ring-primary'
                    : 'hover:bg-muted'
                }`}
                aria-label={MOOD_LABELS[level]}
              >
                {MOOD_EMOJIS[level]}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {!isExpanded ? (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="w-full text-center text-xs text-primary hover:underline"
                >
                  + Add more details
                </button>
              ) : (
                <>
                  {/* Energy slider */}
                  <div>
                    <label className="mb-2 block text-xs text-muted-foreground">
                      Energy Level: {energy}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energy}
                      onChange={(e) => setEnergy(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="mb-2 block text-xs text-muted-foreground">
                      How would you describe it?
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {MOOD_TAGS.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`rounded-full px-2 py-0.5 text-xs transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Log button */}
                  <button
                    onClick={handleLogWithDetails}
                    className="w-full rounded-md bg-primary py-2 text-sm text-primary-foreground hover:bg-primary/90"
                  >
                    Log Mood
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Today's entries - enhanced with tags display */}
        {moodEntries && moodEntries.length > 0 && (
          <div className="mt-auto border-t pt-3">
            <p className="mb-2 text-xs text-muted-foreground">
              Today's check-ins ({moodEntries.length})
            </p>
            <div className="space-y-2">
              {moodEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-start gap-2 rounded-lg bg-muted/50 p-2"
                >
                  <span className="text-lg">{MOOD_EMOJIS[entry.mood]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {MOOD_LABELS[entry.mood]}
                      </span>
                      {entry.energy && (
                        <span className="text-xs text-muted-foreground">
                          ⚡ {entry.energy}/10
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {entry.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id!)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
