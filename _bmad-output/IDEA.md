# Life OS

> Your personal life dashboard - one place for daily reflection and growth.

A frontend-only app combining habit tracking, journaling, mood tracking, and personal wellness tools in a customizable widget-based interface. 100% private, all data stays on your device.

---

## MVP Scope

### Phase 1 - Foundation
| Widget | Purpose |
|--------|---------|
| **Dashboard Shell** | React Grid Layout base, widget registry, layout persistence |
| **Bottom Bar** | Collapsible calendar strip with day summaries |
| **Habit Tracker** | Daily habit check-ins with streaks and stats |
| **Mood Tracker** | Quick mood/energy logging with trends |
| **Quick Notes** | Fast capture for thoughts, ideas, links |

### Phase 2 - Expansion
| Widget | Purpose |
|--------|---------|
| **Journal** | Rich text daily entries with prompts |
| **Daily Summary** | Auto-generated day review, "On this day" |

---

## Expanded Feature Set

### 📓 Journaling System

| Feature | Description |
|---------|-------------|
| **Daily entry** | Rich text or markdown, auto-saved |
| **Prompt library** | 50+ rotating prompts ("What challenged you today?", "What are you avoiding?") |
| **Custom prompts** | User creates their own |
| **Prompt scheduling** | Different prompts for morning vs evening |
| **Voice-to-text** | Browser speech API for quick capture |
| **Templates** | Structured entries (morning pages, evening reflection, weekly review) |
| **Tagging** | #work #health #relationship for filtering |
| **Word count** | Daily and all-time stats |
| **Search** | Full-text search across all entries |
| **Favorites** | Star important entries |
| **On this day** | Show entries from 1 week, 1 month, 1 year ago |
| **Attachments** | Paste images (stored as base64 locally) |
| **Entry streaks** | "You've journaled 14 days in a row" |

---

### ✅ Habit Tracking

| Feature | Description |
|---------|-------------|
| **Habit CRUD** | Create, edit, archive, delete habits |
| **Frequency options** | Daily, specific days (MWF), X times per week |
| **Time of day** | Morning/afternoon/evening grouping |
| **Streaks** | Current streak, longest streak, total completions |
| **Completion states** | Done, skipped (with reason), missed |
| **Habit notes** | Optional note per completion ("ran 5k today") |
| **Habit categories** | Health, productivity, relationships, learning |
| **Habit icons/colors** | Visual customization |
| **Habit reminders** | Browser notifications at set times |
| **Rest days** | Built-in skip without breaking streak |
| **Habit stats** | Completion rate %, best day of week, trends |
| **Calendar heatmap** | GitHub-style yearly view |
| **Habit stacking** | Link habits ("After I brush teeth → meditate") |
| **Habit templates** | Pre-built habit packs (fitness starter, mindfulness, etc.) |

---

### 😊 Mood & Energy Tracking

| Feature | Description |
|---------|-------------|
| **Mood scale** | 1-5 or 1-10, with emoji faces |
| **Multiple check-ins** | Morning, afternoon, evening |
| **Energy level** | Separate from mood (can be happy but tired) |
| **Mood factors** | What influenced it? (sleep, work, social, weather) |
| **Quick tags** | Anxious, calm, motivated, stressed, grateful |
| **Mood note** | Optional context |
| **Mood trends** | Line chart over days/weeks/months |
| **Correlations** | "Your mood is 23% higher on days you exercise" |
| **Average by day** | "Tuesdays are your worst days" |
| **Mood calendar** | Color-coded month view |

---

### 📝 Quick Notes / Capture

| Feature | Description |
|---------|-------------|
| **Instant capture** | One-tap new note |
| **Note types** | Thought, idea, quote, link, task |
| **Tagging** | Organize with tags |
| **Pin notes** | Keep important ones at top |
| **Archive** | Hide without deleting |
| **Search** | Full-text |
| **Link to day** | Notes attached to specific date |
| **Markdown support** | Basic formatting |
| **Code snippets** | Syntax highlighting for devs |
| **Note to journal** | Convert note into journal entry |

---

### 🎯 Goals & Milestones

| Feature | Description |
|---------|-------------|
| **Goal creation** | Name, description, target date |
| **Goal types** | Outcome ("Lose 10kg"), habit-based ("Meditate 30 days"), project ("Launch app") |
| **Milestones** | Break goals into checkpoints |
| **Progress tracking** | Manual % or linked to habits |
| **Goal categories** | Health, career, financial, personal, relationships |
| **Quarterly goals** | OKR-style planning |
| **Goal review prompts** | "Is this still important to you?" |
| **Completed goals** | Archive with celebration 🎉 |

---

### 📊 Health & Body

| Feature | Description |
|---------|-------------|
| **Sleep log** | Bedtime, wake time, hours, quality (1-5) |
| **Sleep debt** | Track deficit over time |
| **Water intake** | Glasses/liters per day |
| **Weight** | With trend chart |
| **Body measurements** | Waist, chest, etc. (optional) |
| **Exercise log** | Type, duration, intensity, notes |
| **Nutrition quality** | Simple 1-5 rating, not calorie counting |
| **Caffeine/alcohol** | Optional tracking |
| **Symptoms** | Track headaches, fatigue, etc. |
| **Medication reminders** | Simple checklist |
| **Menstrual cycle** | For those who need it |
| **Custom metrics** | User-defined numeric trackers |

---

### 🧘 Mental Wellness

| Feature | Description |
|---------|-------------|
| **Meditation log** | Duration, type (guided, silent, breathwork) |
| **Built-in timer** | Simple meditation timer with bells |
| **Breathing exercises** | Box breathing, 4-7-8, etc. with animation |
| **Affirmations** | Daily random from library + custom |
| **Gratitude log** | 3 things per day |
| **Anxiety tracker** | Scale + triggers |
| **CBT thought record** | Situation → Automatic thought → Evidence → Reframe |
| **Worry journal** | Dump anxieties, revisit later (most don't happen) |
| **Self-compassion prompts** | "What would you tell a friend?" |
| **Crisis resources** | Hotline numbers (static, always accessible) |

---

### ⏱️ Productivity

| Feature | Description |
|---------|-------------|
| **Today's priorities** | Top 3 tasks for the day |
| **Done list** | Log accomplishments (reverse todo) |
| **Pomodoro timer** | 25/5 with session logging |
| **Focus score** | Self-rated 1-10 end of day |
| **Time blocks** | Plan day in blocks |
| **Distractions log** | What pulled you off track? |
| **Weekly planning** | Set intentions for the week |
| **Energy mapping** | When are you most productive? |

---

### 📅 Reviews & Summaries

| Feature | Description |
|---------|-------------|
| **Daily summary** | Auto-generated end of day |
| **Weekly review** | Template with prompts + auto-stats |
| **Monthly review** | Bigger picture reflection |
| **Quarterly review** | Goal progress check |
| **Year in review** | Annual stats and highlights |
| **Streak celebrations** | Milestones: 7, 30, 100, 365 days |
| **Insights feed** | "You've journaled more this month than last" |
| **Best day finder** | "March 15 was your happiest day" |

---

### ⚙️ Settings & Personalization

| Feature | Description |
|---------|-------------|
| **Themes** | Light, dark, auto, custom colors |
| **Dashboard layout** | Drag-and-drop widgets |
| **Notification settings** | Per-feature reminders |
| **Week start** | Sunday or Monday |
| **Date/time format** | Regional preferences |
| **Default views** | What shows on app open |
| **Data export** | JSON, CSV, Markdown |
| **Data import** | Restore from backup |
| **Clear data** | Nuclear option with confirmation |
| **Feature toggles** | Enable/disable modules |

---

## Technical Architecture (Frontend-Only)

### Stack Recommendation

```
┌─────────────────────────────────────────────────┐
│                    UI Layer                      │
│         React 18 + TypeScript + Vite            │
│      TailwindCSS + shadcn/ui + Magic UI         │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│              Dashboard Shell Layer               │
│     React Grid Layout (drag/drop/resize)        │
│         Widget Registry + Layout State          │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│            Animation & Interaction               │
│    Motion (Framer Motion) + AutoAnimate         │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│                 State Layer                      │
│     Zustand (global) + TanStack Query           │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│            Visualization Layer                   │
│       Recharts (trends) + Custom SVG            │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│               Persistence Layer                  │
│          Dexie.js (IndexedDB wrapper)           │
└─────────────────────────────────────────────────┘
```

### Library Choices

| Category | Library | Why |
|----------|---------|-----|
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) | Accessible, customizable, owns the code |
| **Animated Components** | [Magic UI](https://magicui.design/) | Theatrical animations, shadcn-compatible |
| **Animations** | [Motion](https://motion.dev/) | GPU-accelerated, lightweight Framer Motion |
| **Auto-Animations** | [AutoAnimate](https://auto-animate.formkit.com/) | Zero-config DOM transitions |
| **Charts** | [Recharts](https://recharts.org/) | React-native, lightweight, good for trends |
| **Calendar** | [React Day Picker](https://react-day-picker.js.org/) | Flexible, accessible date picking |
| **Rich Text** | [Tiptap](https://tiptap.dev/) | Headless editor, extensible for journaling |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent, tree-shakeable |
| **Date Utils** | [date-fns](https://date-fns.org/) | Modular, lightweight date handling |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Performant forms with validation |

### Widget Architecture

Each feature is a **self-contained widget plugin** that registers with the shell:

```typescript
interface Widget {
  id: string;
  name: string;
  icon: string;
  category: 'journal' | 'habits' | 'mood' | 'health' | 'productivity' | 'goals';
  minSize: { w: number; h: number };
  defaultSize: { w: number; h: number };
  component: React.ComponentType<WidgetProps>;
  settingsComponent?: React.ComponentType;
  // Each widget manages its own Dexie table(s)
  dbSchema: Record<string, string>;
}
```

**Widget Registry Pattern:**
- Widgets self-register on import
- Shell discovers available widgets dynamically
- Users toggle widgets on/off in settings
- Layout persisted per-user in IndexedDB

---

### Summary: Why This Works Frontend-Only

| Concern | Solution |
|---------|----------|
| Authentication | Not needed—single user, local data |
| Database | IndexedDB via Dexie.js |
| Sync | Manual (export → cloud drive) or add later |
| Hosting | Static files, free everywhere |
| Privacy | 100% local, nothing leaves device |

---

## UX Principles

### Layout & Interaction
- Features configurable to be added/removed in the UI
- Features can be dragged, dropped, and resized on the main canvas
- **Default starter layout** provided (no onboarding wizard)
- Functional density - compact but not cramped

### Visual Design
- **Muted, soft color palette** - calming, not overwhelming
- Light/dark theme support
- No excessive padding - prioritize screen real estate

### Bottom Bar - "The Heartbeat"
- **Collapsible** horizontal bar at screen bottom
- Scrollable calendar view showing recent/upcoming days
- **Aggregated summary stat** that encapsulates all active widgets (e.g., "3/5 habits · mood logged · 247 words")
- Encouraging tone, never guilt-inducing

**Color Language:**
- Days with entries show **color-coded indicators** based on content type:
  - Habits: green tones
  - Mood: warm spectrum (reflects logged mood)
  - Journal: purple/ink tones
  - Multiple items: blended/stacked colors
- Empty days: subtle gray
- Today: highlighted accent ring

**Micro-Animations:**
- Gentle **pulse** on today's date
- Soft **fade-in** as calendar scrolls
- Subtle **hover glow** on days with content
- **Ripple effect** when completing an item (emanates from today)

**Day Summary Popup:**
- Tap any day with content → **floating card** appears above bar
- Shows snapshot: mood emoji, habit %, journal excerpt, notes count
- Quick actions: "View full day" / "Add entry"
- Dismiss by tapping outside or swiping down

### Mental Wellness Widgets - Special Care
- Softer visual treatment (warmer tones, gentler corners)
- **No streaks or gamification** on anxiety/CBT/sensitive features
- Subtle prompts, never pushy notifications
- Designed for vulnerable moments - extra gentleness

