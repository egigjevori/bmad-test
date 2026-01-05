---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - product-brief-life-os-2025-12-29.md
  - prd.md
  - project-context.md
  - architecture-life-os-2025-12-29.md
project_name: 'Life OS'
user_name: 'Nova'
date: '2025-12-29'
status: 'complete'
---

# UX Design Specification - Life OS

**Author:** Nova
**Date:** 2025-12-29
**Version:** 1.0

---

## Executive Summary

### Project Vision

Life OS is a personal life dashboard that unifies habit tracking, mood logging, and quick notes into a single, customizable widget-based interface. The UX prioritizes **zero friction** (<10 seconds to log anything), **pattern visibility** (the "Heartbeat" bottom bar), and **calm aesthetics** (muted colors, gentle animations).

### Target Users

**Primary:** Self-tracking developer seeking unified personal tracking without app fragmentation.

| Attribute | Value |
|-----------|-------|
| Tech Savvy | High |
| Primary Device | Desktop |
| Usage Pattern | Multiple times daily (morning, throughout day, evening) |
| Key Motivation | Self-awareness, productivity, simplicity |

### Key Design Challenges

1. **Widget Density vs. Clarity** - Balance information density with visual breathing room
2. **One-Tap Capture** - Minimize friction for habit completion and note capture
3. **Pattern Recognition** - Make the bottom bar timeline genuinely useful for spotting trends
4. **Emotional Design** - Create calm, not anxiety; encourage, not guilt

### Design Opportunities

1. **Living Timeline** - The animated "Heartbeat" bar creates emotional connection to personal data
2. **Color Language** - Consistent color-coding enables instant pattern recognition
3. **Micro-Interactions** - Gentle animations reward completion without gamification pressure
4. **Personal Ownership** - Drag/drop widget customization creates "my dashboard" feeling

---

## Design Principles

### Core Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Calm Over Chaos** | Reduce cognitive load, not add to it | Muted palette, ample whitespace, no aggressive notifications |
| **Friction-Free** | Every interaction should feel effortless | One-tap completions, instant visual feedback |
| **Patterns Over Points** | Show trends, not just data | Color-coded timeline, not raw numbers |
| **Encourage, Don't Guilt** | Celebrate streaks, don't shame misses | Positive micro-copy, gentle empty states |
| **Own Your Data** | Privacy is a feature | Local-first, no cloud dependency messaging |

### Design Philosophy

Based on 2025 dashboard UX best practices:
- **5-6 widgets maximum** in initial view - avoid overwhelming the user
- **7-8 visual elements** is the cognitive limit - respect mental processing
- **Consistent visual language** - same colors, fonts, chart styles throughout
- **Annotations and tooltips** - users shouldn't have to guess what things mean

---

## Color System

### Primary Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Background** | `#FAFAFA` (light) / `#0F0F0F` (dark) | Main background |
| **Surface** | `#FFFFFF` (light) / `#1A1A1A` (dark) | Cards, widgets |
| **Surface Elevated** | `#FFFFFF` (light) / `#242424` (dark) | Popups, modals |
| **Border** | `#E5E5E5` (light) / `#2A2A2A` (dark) | Dividers, widget borders |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Habits (Green)** | `#22C55E` | Habit completion, streaks |
| **Mood Warm** | `#F59E0B` → `#EF4444` | Mood scale (great → struggling) |
| **Notes (Purple)** | `#A855F7` | Note indicators, tags |
| **Today Accent** | `#3B82F6` | Today ring, active states |
| **Muted Text** | `#737373` | Secondary text, placeholders |

### Bottom Bar Day Colors

Days in the timeline are color-coded based on activity:

| State | Color | Opacity |
|-------|-------|---------|
| Empty day | `#D4D4D4` | 30% |
| Habits only | Green | 100% |
| Mood only | Warm spectrum | 100% |
| Notes only | Purple | 100% |
| Multiple types | Blended/stacked gradient | 100% |
| Today | Blue accent ring + content color | 100% |

### Color Application Rules

- **Never pure black text** - Use `#171717` for primary text
- **Muted, not vibrant** - All colors at 80% saturation max
- **Consistent meaning** - Green always means habits, purple always means notes
- **Dark mode parity** - All colors have dark mode equivalents

---

## Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **Display** | 24px | 600 | 1.2 | Widget titles |
| **Heading** | 18px | 600 | 1.3 | Section headers |
| **Body** | 14px | 400 | 1.5 | Primary content |
| **Body Small** | 13px | 400 | 1.5 | Secondary content |
| **Caption** | 12px | 500 | 1.4 | Labels, metadata |
| **Micro** | 11px | 500 | 1.3 | Badges, counts |

### Typography Rules

- **No text smaller than 11px** - Accessibility baseline
- **Medium weight for emphasis** - Not bold, which feels aggressive
- **Sentence case** for UI text - More friendly than ALL CAPS
- **Numbers use tabular figures** - For aligned streaks and counts

---

## Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps, icon padding |
| `--space-2` | 8px | Related element gaps |
| `--space-3` | 12px | Standard component padding |
| `--space-4` | 16px | Widget internal padding |
| `--space-5` | 24px | Section separation |
| `--space-6` | 32px | Major section gaps |

### Layout Grid

```
Dashboard Grid:
├── 12-column grid
├── 16px gutters
├── Widgets snap to 1-column minimum
├── Responsive breakpoints:
│   ├── Desktop: 1280px+ (12 columns)
│   ├── Tablet: 768px-1279px (8 columns)
│   └── Mobile: <768px (4 columns, stacked)
```

### Widget Sizing

| Widget | Min Size | Default Size | Max Size |
|--------|----------|--------------|----------|
| Habits | 2×3 | 3×4 | 6×6 |
| Mood | 2×2 | 3×3 | 4×4 |
| Notes | 2×3 | 3×4 | 6×6 |

---

## Component Library

### Widget Card

```
┌─────────────────────────────────────┐
│ ○ Widget Title              ⋯ Menu │  ← Header (48px)
├─────────────────────────────────────┤
│                                     │
│           Widget Content            │  ← Scrollable content area
│                                     │
│                                     │
├─────────────────────────────────────┤
│ + Quick Action                      │  ← Footer (optional, 40px)
└─────────────────────────────────────┘

Styling:
- Border radius: 12px
- Background: Surface color
- Border: 1px solid Border color
- Shadow: 0 1px 3px rgba(0,0,0,0.05)
- Hover: Subtle elevation increase
```

### Habit Item

```
┌─────────────────────────────────────┐
│ ○ Habit Name                   ✓ □ │
│   🔥 12 day streak                  │
└─────────────────────────────────────┘

States:
- Default: Empty checkbox
- Completed: Filled green checkbox with checkmark
- Skipped: Dashed border, gray background
- Missed: Red accent (subtle, not aggressive)

Interactions:
- Tap checkbox: Instant toggle with ripple
- Long press: Show skip/edit options
- Streak badge: Pulsing fire emoji at milestones (7, 30, 100)
```

### Mood Selector

```
┌─────────────────────────────────────┐
│         How are you feeling?         │
│                                      │
│   😢    😕    😐    🙂    😄        │
│    1     2     3     4     5         │
│                                      │
│   Energy: ━━━━━━○━━━━━━━━ 7/10      │
│                                      │
│   Quick tags: [Calm] [Focused] +     │
└─────────────────────────────────────┘

Interactions:
- Tap emoji: Scale animation, instant selection
- Drag energy slider: Real-time value update
- Tap tag: Toggle on/off with color fill
```

### Quick Note Card

```
┌─────────────────────────────────────┐
│ 📝 Just had a great idea about...   │
│                                      │
│ #idea #work                 2:34 PM │
└─────────────────────────────────────┘

States:
- Default: White/dark surface
- Pinned: Subtle yellow left border
- Archived: 50% opacity, strikethrough

Types & Icons:
- Thought: 💭
- Idea: 💡
- Quote: 💬
- Link: 🔗
- Task: ☑️
```

### Day Summary Popup

```
         ┌─────────────────────────┐
         │  December 29, 2024      │
         ├─────────────────────────┤
         │  ✓ 4/5 habits (80%)     │
         │  🙂 Mood: Good (4/5)    │
         │  📝 3 notes             │
         ├─────────────────────────┤
         │  [View Full Day]        │
         └─────────────────────────┘
              ▼ (arrow to day cell)

Trigger: Tap on day cell in bottom bar
Animation: Fade in + slide up (150ms)
Dismiss: Tap outside or swipe down
```

---

## Bottom Bar ("The Heartbeat")

### Visual Design

```
┌─────────────────────────────────────────────────────────────┐
│  ◀  │ 23 │ 24 │ 25 │ 26 │ 27 │ 28 │[29]│ 30 │ 31 │  ▶  │ ▲ │
└─────────────────────────────────────────────────────────────┘
         ●    ●    ○    ●    ●    ○   ●●   ○    ○         ← Color dots
                                     ↑
                                  TODAY
                               (pulsing ring)
```

### Specifications

| Property | Value |
|----------|-------|
| Height (expanded) | 64px |
| Height (collapsed) | 24px |
| Day cell width | 44px |
| Day cell height | 44px |
| Border radius | 8px |
| Visible days | 7-9 (responsive) |

### Day Cell States

| State | Visual |
|-------|--------|
| Today | Blue ring (pulsing every 3s), content color fill |
| Has data | Colored based on content type(s) |
| Empty | Light gray, low opacity |
| Hover | Subtle scale (1.05) + shadow |
| Selected | Ring + popup appears |

### Micro-Animations

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Today pulse | Continuous | 2s | ease-in-out |
| Day hover | Mouse enter | 150ms | ease-out |
| Scroll | Drag/swipe | 200ms | spring |
| Collapse/expand | Toggle button | 300ms | ease-in-out |
| Popup appear | Day tap | 150ms | ease-out |
| Ripple on complete | Habit checked | 400ms | ease-out |

### Collapse Behavior

- **Collapsed state:** Shows only colored dots, no numbers
- **Expand trigger:** Tap anywhere on bar or ▲ button
- **Collapse trigger:** Tap ▲ button (becomes ▼)
- **Auto-collapse:** Never (user controls)

---

## Interaction Patterns

### One-Tap Actions

| Action | Gesture | Feedback |
|--------|---------|----------|
| Complete habit | Tap checkbox | Ripple + checkmark + sound (optional) |
| Log mood | Tap emoji | Scale bounce + selection ring |
| Capture note | Tap + button | Expand form inline |
| Toggle widget | Drag edge | Resize handles appear |

### Frictionless Capture

Based on habit tracker UX research: "The simple act of marking a habit 'done' needs to be completely frictionless. A single tap should toggle its state. This action must trigger immediate visual feedback."

**Implementation:**
- No confirmation dialogs for common actions
- Undo available via toast (3 seconds)
- Optimistic UI updates (instant feedback)
- Error states are non-blocking

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `H` | Focus habit widget |
| `M` | Open mood log |
| `N` | New quick note |
| `T` | Jump to today |
| `←` / `→` | Navigate days |
| `Esc` | Close popup/modal |

---

## Empty States

### First Launch

```
┌─────────────────────────────────────┐
│                                     │
│         Welcome to Life OS          │
│                                     │
│    Your personal life dashboard     │
│    starts here. Add your first      │
│    habit to begin tracking.         │
│                                     │
│         [+ Add First Habit]         │
│                                     │
└─────────────────────────────────────┘
```

### Empty Widget

```
┌─────────────────────────────────────┐
│ ○ Habits                      ⋯     │
├─────────────────────────────────────┤
│                                     │
│      No habits yet                  │
│                                     │
│      Track something you do         │
│      (or want to do) daily.         │
│                                     │
│         [+ Add Habit]               │
│                                     │
└─────────────────────────────────────┘
```

### Empty Day (Bottom Bar)

- Gray dot, no popup on tap
- Tooltip: "No entries for this day"

### Microcopy Principles

- **Encouraging, not nagging** - "Ready when you are" not "You haven't logged today!"
- **Helpful, not empty** - Suggest what to do, not just say "empty"
- **Personal tone** - "your" habits, "your" mood
- **No guilt language** - Never use "missed", prefer "not yet logged"

---

## Motion & Animation

### Animation Principles

Based on 2025 trends: "Micro-interactions can help by dynamically adjusting the interface based on user interactions."

| Principle | Application |
|-----------|-------------|
| **Purposeful** | Every animation has a reason |
| **Subtle** | 150-300ms, never jarring |
| **Responsive** | Instant feedback (<100ms for user actions) |
| **Consistent** | Same easing curves throughout |

### Motion Tokens

```css
--duration-instant: 100ms;
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-enter: 200ms;
--duration-exit: 150ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Key Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Habit complete | Checkmark draw + ripple | 400ms | spring |
| Mood select | Scale bounce | 200ms | spring |
| Widget resize | Smooth scale | 200ms | ease-out |
| Popup enter | Fade + slide up | 150ms | ease-out |
| Popup exit | Fade + slide down | 100ms | ease-in |
| Today pulse | Opacity 0.7→1→0.7 | 2000ms | ease-in-out |
| List item add | Fade in + slide down | 200ms | ease-out |
| List item remove | Fade out + collapse | 150ms | ease-in |

### AutoAnimate Usage

```tsx
// Lists use AutoAnimate for add/remove
import { useAutoAnimate } from '@formkit/auto-animate/react';

function HabitList() {
  const [parent] = useAutoAnimate();
  return <ul ref={parent}>{habits.map(...)}</ul>;
}
```

### Motion (Framer Motion) Usage

```tsx
// Explicit animations use Motion
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.15 }}
>
```

---

## Responsive Design

### Breakpoints

| Name | Width | Columns | Notes |
|------|-------|---------|-------|
| Desktop | ≥1280px | 12 | Full dashboard experience |
| Tablet | 768-1279px | 8 | Widgets stack more |
| Mobile | <768px | 4 | Single column, bottom bar fixed |

### Layout Adaptations

**Desktop (Default):**
- Full widget grid with drag/resize
- Bottom bar horizontal, 9 visible days
- Side-by-side widgets

**Tablet:**
- Reduced widget grid
- Bottom bar shows 7 days
- Some widgets stack vertically

**Mobile:**
- Single-column widget stack
- Bottom bar shows 5 days
- Full-width widgets
- Floating action button for quick capture

### Touch Targets

- Minimum tap target: 44×44px
- Habit checkbox: 48×48px touch area
- Bottom bar days: 44×44px

---

## Accessibility

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for text |
| Focus indicators | Visible 2px ring on all interactive elements |
| Keyboard navigation | Full app accessible via keyboard |
| Screen reader | Semantic HTML, ARIA labels |
| Motion | Respect `prefers-reduced-motion` |

### Reduced Motion

When `prefers-reduced-motion: reduce`:
- Disable pulse animations
- Instant transitions (no animations)
- Static states instead of animated

### Color Blind Support

- Don't rely on color alone - use icons + color
- Habit complete: ✓ icon + green
- Mood: Emoji faces + color
- Notes: 📝 icon + purple

---

## Dark Mode

### Color Mapping

| Light | Dark |
|-------|------|
| `#FAFAFA` background | `#0F0F0F` |
| `#FFFFFF` surface | `#1A1A1A` |
| `#171717` text | `#FAFAFA` |
| `#737373` muted | `#A3A3A3` |
| `#E5E5E5` border | `#2A2A2A` |

### Implementation

```css
:root {
  --bg: #FAFAFA;
  --surface: #FFFFFF;
  --text: #171717;
}

[data-theme="dark"] {
  --bg: #0F0F0F;
  --surface: #1A1A1A;
  --text: #FAFAFA;
}
```

### Toggle Behavior

- System preference detection on first load
- Manual toggle in settings
- Preference persisted in localStorage
- Smooth transition when toggling (200ms)

---

## Mental Wellness Considerations

Based on research: Mood tracking apps should use "a light, playful aesthetic with emojis, smooth animations, and soft gradients that resonate with an emotionally-aware audience."

### Special Treatment for Sensitive Features

| Feature | Special Consideration |
|---------|----------------------|
| Mood logging | No judgment language, optional entry |
| Missed habits | No red X, just unfilled (neutral) |
| Streaks | Celebrate, don't punish breaks |
| Empty states | Encouraging, never guilt-inducing |

### Visual Softening

- Mood widget uses **warmer, softer colors**
- Rounder corners (16px vs 12px standard)
- More whitespace
- Gentler shadows
- No aggressive notifications

### Microcopy Examples

| ❌ Avoid | ✅ Use Instead |
|----------|----------------|
| "You missed 3 days" | "Welcome back!" |
| "Streak broken" | "New streak starting" |
| "No mood logged" | "How are you feeling?" |
| "Complete your habits!" | "Your habits for today" |

---

## Design Tokens Summary

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #171717;
  --color-text-muted: #737373;
  --color-border: #E5E5E5;
  --color-habit: #22C55E;
  --color-mood-great: #22C55E;
  --color-mood-good: #84CC16;
  --color-mood-okay: #F59E0B;
  --color-mood-low: #F97316;
  --color-mood-bad: #EF4444;
  --color-notes: #A855F7;
  --color-today: #3B82F6;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  /* Motion */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Implementation Notes

### shadcn/ui Customization

Override these shadcn/ui defaults in `globals.css`:

```css
@layer base {
  :root {
    --radius: 0.75rem; /* 12px */
    --primary: 217 91% 60%; /* Blue for today accent */
    --muted: 0 0% 45%; /* Gray for secondary text */
  }
}
```

### Tailwind Extensions

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        habit: '#22C55E',
        notes: '#A855F7',
        today: '#3B82F6',
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
    },
  },
};
```

---

## Sources

Dashboard UX:
- [20 Best Dashboard UI/UX Design Principles 2025](https://medium.com/@allclonescript/20-best-dashboard-ui-ux-design-principles-you-need-in-2025-30b661f2f795)
- [Dashboard Design Principles - UXPin](https://www.uxpin.com/studio/blog/dashboard-design-principles/)
- [Dashboard UX Best Practices - DesignRush](https://www.designrush.com/agency/ui-ux-design/dashboard/trends/dashboard-ux)

Habit Tracking UX:
- [Habit Tracker Calendar UX - RapidNative](https://www.rapidnative.com/blogs/habit-tracker-calendar)
- [Habitify UX Case Study](https://medium.com/design-bootcamp/build-better-habits-with-habitify-a-ui-ux-case-study-e2ed563f97a4)

Mood Tracking UI:
- [Mood Tracker App UI Features - Life Planner](https://thelifeplanner.co/blog/post/mood_tracker_app_ui_features_that_make_tracking_fun_and_easy.html)
- [UI Design Trends 2025 - ChillyBin](https://www.chillybin.co/ui-design-trends-2025/)

Micro-Interactions:
- [Bottom Navigation with Micro-Interactions - Fegno](https://www.fegno.com/build-bottom-navigation-bar-with-micro-interactions/)
- [Micro-Interactions for Navigation - PixelFree](https://blog.pixelfreestudio.com/how-to-use-micro-interactions-for-better-navigation/)

---

**UX Design Status:** COMPLETE
**Ready for:** Wireframing & Implementation
