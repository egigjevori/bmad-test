import { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import type { WidgetProps } from '@/features/widgets/types';
import { getToday } from '@/lib/db';

import { getTodayJournalEntry, saveJournalEntry } from '../db';
import { JOURNAL_PROMPTS } from '../types';

/**
 * Journal Widget
 * A distraction-free daily journaling experience
 */
export function JournalWidget(_props: WidgetProps) {
  const today = getToday();
  const entry = useLiveQuery(() => getTodayJournalEntry());

  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Sync content with database entry
  useEffect(() => {
    if (entry !== undefined) {
      setContent(entry?.content ?? '');
      setPrompt(entry?.prompt);
    }
  }, [entry]);

  // Debounced auto-save
  useEffect(() => {
    if (entry === undefined) return; // Wait for initial load

    const timeoutId = setTimeout(async () => {
      if (content !== (entry?.content ?? '')) {
        setIsSaving(true);
        await saveJournalEntry(today, content, prompt);
        setLastSaved(new Date());
        setIsSaving(false);
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [content, prompt, today, entry]);

  const getRandomPrompt = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    const newPrompt = JOURNAL_PROMPTS[randomIndex];
    setPrompt(newPrompt);
  }, []);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-journal" />
          <span className="text-sm font-medium">Today's Journal</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={getRandomPrompt}
          className="h-7 px-2 text-xs gap-1"
          title="Get a prompt"
        >
          <Sparkles className="h-3 w-3" />
          Inspire me
        </Button>
      </div>

      {/* Prompt display */}
      <AnimatePresence mode="wait">
        {prompt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 p-2 rounded-md bg-journal/10 border border-journal/20"
          >
            <p className="text-sm text-journal italic">{prompt}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text area */}
      <div className="flex-1 relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today?"
          className="h-full resize-none border-none bg-muted/30 focus-visible:ring-journal/50 text-sm leading-relaxed"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>{wordCount} words</span>
        <div className="flex items-center gap-1">
          {isSaving ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Saving...</span>
            </>
          ) : lastSaved ? (
            <span>Saved</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
