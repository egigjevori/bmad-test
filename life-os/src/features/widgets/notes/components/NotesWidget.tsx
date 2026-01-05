import { useState, useRef, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { StickyNote, Plus, Pin, Archive, X } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import type { WidgetProps } from '../../types';
import type { NoteType } from '../types';
import { NOTE_TYPES } from '../types';
import {
  getNotesForDate,
  addNote,
  updateNote,
  togglePinNote,
  archiveNote,
} from '../db';

export function NotesWidget({ date }: WidgetProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedType, setSelectedType] = useState<NoteType>('thought');
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [listRef] = useAutoAnimate<HTMLDivElement>();

  // Live query for notes
  const notes = useLiveQuery(() => getNotesForDate(date), [date]);

  // Auto-save debounce for editing
  useEffect(() => {
    if (editingId === null || !editContent) return;

    const timeout = setTimeout(() => {
      updateNote(editingId, { content: editContent });
    }, 500);

    return () => clearTimeout(timeout);
  }, [editingId, editContent]);

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !newTags.includes(tag)) {
      setNewTags([...newTags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewTags(newTags.filter((t) => t !== tagToRemove));
  };

  const handleAddNote = async () => {
    if (!newNoteContent.trim()) return;

    await addNote(date, newNoteContent.trim(), selectedType, newTags);
    setNewNoteContent('');
    setSelectedType('thought');
    setNewTags([]);
    setTagInput('');
    setIsAdding(false);
  };

  const handleStartEdit = (noteId: number, content: string) => {
    setEditingId(noteId);
    setEditContent(content);
  };

  const handleFinishEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handlePin = async (noteId: number) => {
    await togglePinNote(noteId);
  };

  const handleArchive = async (noteId: number) => {
    await archiveNote(noteId);
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-purple-500" />
          <h3 className="font-medium">Notes</h3>
          {notes && notes.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {notes.length}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="rounded-md p-1 hover:bg-muted"
          aria-label="Add note"
        >
          <Plus className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {isAdding && (
          <div className="border-b p-3">
            {/* Type selector */}
            <div className="mb-2 flex gap-1">
              {(Object.keys(NOTE_TYPES) as NoteType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-md px-2 py-1 text-sm transition-colors ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  title={NOTE_TYPES[type].label}
                >
                  {NOTE_TYPES[type].emoji}
                </button>
              ))}
            </div>

            <textarea
              ref={inputRef}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) handleAddNote();
                if (e.key === 'Escape') {
                  setIsAdding(false);
                  setNewNoteContent('');
                  setNewTags([]);
                }
              }}
              placeholder="Write your note... (⌘+Enter to save)"
              className="mb-2 min-h-[60px] w-full resize-none rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Tag input */}
            <div className="mb-2">
              <div className="flex flex-wrap gap-1 mb-1">
                {newTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add tags..."
                  className="flex-1 rounded-md border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleAddTag}
                  className="rounded-md bg-muted px-2 py-1 text-xs hover:bg-muted/80"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewNoteContent('');
                  setNewTags([]);
                  setTagInput('');
                }}
                className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="rounded-md bg-primary px-2 py-1 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {(!notes || notes.length === 0) && !isAdding ? (
          <div className="flex flex-1 items-center justify-center p-4 text-muted-foreground">
            <p className="text-sm">No notes yet. Click + to add one.</p>
          </div>
        ) : (
          <div ref={listRef} className="divide-y">
            {notes?.map((note) => (
              <div
                key={note.id}
                className={`group relative p-3 transition-colors hover:bg-muted/50 ${
                  note.pinned ? 'border-l-2 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20' : ''
                }`}
              >
                {/* Actions */}
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handlePin(note.id!)}
                    className={`rounded p-1 hover:bg-muted ${
                      note.pinned ? 'text-yellow-500' : 'text-muted-foreground'
                    }`}
                    aria-label={note.pinned ? 'Unpin' : 'Pin'}
                  >
                    <Pin className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleArchive(note.id!)}
                    className="rounded p-1 text-muted-foreground hover:bg-muted"
                    aria-label="Archive"
                  >
                    <Archive className="h-3 w-3" />
                  </button>
                </div>

                {/* Type indicator */}
                <span className="mr-2 text-sm">
                  {NOTE_TYPES[note.type].emoji}
                </span>

                {/* Content */}
                {editingId === note.id ? (
                  <div className="mt-1">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[40px] w-full resize-none rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                    <button
                      onClick={handleFinishEdit}
                      className="mt-1 text-xs text-primary hover:underline"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <span
                    onClick={() => handleStartEdit(note.id!, note.content)}
                    className="cursor-text text-sm"
                  >
                    {note.content}
                  </span>
                )}

                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 text-xs text-purple-700 dark:text-purple-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(note.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
