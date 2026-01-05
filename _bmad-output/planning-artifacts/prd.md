---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments:
  - product-brief-life-os-2025-12-29.md
  - architecture-life-os-2025-12-29.md
  - project-context.md
workflowType: 'prd'
status: 'complete'
project_name: 'Life OS'
user_name: 'Nova'
date: '2025-12-29'
---

# Product Requirements Document - Life OS

**Author:** Nova
**Date:** 2025-12-29
**Version:** 1.0

---

## Executive Summary

Life OS is a frontend-only personal dashboard that unifies habit tracking, mood logging, and quick notes into a single customizable interface. Built for privacy-conscious users who want to track their daily life without fragmented apps or cloud dependencies, Life OS puts control back in the user's hands through a modular widget system and a visually engaging "heartbeat" timeline.

### What Makes This Special

| Differentiator | Description |
|----------------|-------------|
| **Widget Architecture** | Add/remove features freely - no forced structure |
| **Living Timeline** | Animated bottom bar shows life patterns at a glance |
| **100% Private** | Frontend-only, all data stays in local IndexedDB |
| **Modern Stack** | React 18, shadcn/ui, Magic UI, Motion - premium feel |

### Project Classification

- **Technical Type:** Web Application (SPA)
- **Domain:** Personal Productivity
- **Complexity:** Medium
- **Project Context:** Greenfield - new project

---

## Problem Statement

### The Problem

Personal tracking tools are fragmented across multiple apps, each with its own data silo, login, and learning curve. Users who want a holistic view of their habits, moods, and thoughts must juggle:
- Habitica for habits
- Daylio for moods
- Apple Notes for thoughts

They never see how these aspects of their life connect.

### Problem Impact

Without unified tracking, patterns remain invisible:
- Users can't see that their mood dips on days they skip exercise
- Can't notice that their best journaling happens on weekends
- The cognitive overhead of multiple apps leads to abandonment

### Why Existing Solutions Fall Short

| Solution | Limitation |
|----------|------------|
| **Habitica** | Gamification adds complexity, not clarity |
| **Daylio** | Mood-focused, limited habit integration |
| **Notion** | Requires significant setup and maintenance |
| **Most apps** | Cloud-dependent, privacy-compromising, inflexible structure |

---

## Target Users

### Primary Persona: The Self-Tracking Developer

| Attribute | Detail |
|-----------|--------|
| **Name** | Nova |
| **Role** | Developer building for personal use |
| **Context** | Wants a unified place to track daily life without app-hopping |
| **Motivation** | Productivity, self-awareness, keeping things simple |

### User Goals

1. Track habits consistently without friction
2. Log mood/energy to spot patterns
3. Capture quick thoughts throughout the day
4. See daily life at a glance via the bottom bar

### Pain Points

- Too many apps for different tracking needs
- Privacy concerns with cloud-based tools
- Existing apps don't match personal workflow

### Success Looks Like

- Opening Life OS becomes a natural part of the day
- Patterns become visible through the living timeline
- Zero friction to log a habit, mood, or thought

---

## User Journey

| Stage | Experience |
|-------|------------|
| **Morning** | Open app → check today's habits → log morning mood |
| **Throughout Day** | Quick note capture → complete habits as done → occasional mood check-in |
| **Evening** | Review day in bottom bar → mark remaining habits → optional reflection |
| **Weekly** | Scroll timeline to see patterns → notice color trends |

---

## Success Metrics

### Personal Success Criteria

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Daily Usage** | Use Life OS at least once per day for 2+ weeks | Check habit/mood entries over time |
| **Replaced Other Tools** | Stop using separate habit/mood apps | No longer opening Habitica, Daylio, etc. |
| **Low Friction** | Logging takes <10 seconds | Feels effortless, not a chore |
| **Pattern Visibility** | Bottom bar reveals trends | Can spot good/bad weeks at a glance |

### Project Success Criteria

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **MVP Complete** | Dashboard + 3 widgets working | Habits, Mood, Notes all functional |
| **Widget System Works** | Can add/remove widgets easily | Architecture proves flexible |
| **Looks Good** | Modern, polished UI | Feels like a "real" app, not a prototype |

---

## Functional Requirements

### FR-1: Dashboard Shell

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | Dashboard displays widget grid using React Grid Layout | Must Have |
| FR-1.2 | Widgets can be dragged to new positions | Must Have |
| FR-1.3 | Widgets can be resized within min/max constraints | Must Have |
| FR-1.4 | Layout persists across browser sessions | Must Have |
| FR-1.5 | Default layout provided on first load | Must Have |
| FR-1.6 | Widget add/remove from settings | Must Have |

### FR-2: Bottom Bar ("The Heartbeat")

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Collapsible horizontal bar at screen bottom | Must Have |
| FR-2.2 | Horizontal scrolling calendar showing recent days | Must Have |
| FR-2.3 | Days color-coded based on widget data (habits=green, mood=warm, notes=purple) | Must Have |
| FR-2.4 | Today highlighted with accent ring | Must Have |
| FR-2.5 | Gentle pulse animation on today's date | Should Have |
| FR-2.6 | Tap day to show summary popup | Must Have |
| FR-2.7 | Popup shows: mood emoji, habit %, notes count | Must Have |
| FR-2.8 | Popup has "View full day" action | Should Have |

### FR-3: Habit Tracker Widget

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Create new habits with name | Must Have |
| FR-3.2 | Edit existing habit name | Must Have |
| FR-3.3 | Delete/archive habits | Must Have |
| FR-3.4 | Mark habit complete for today | Must Have |
| FR-3.5 | Show completion states: Done, Skipped, Missed | Must Have |
| FR-3.6 | Display current streak count | Must Have |
| FR-3.7 | Show habit completion percentage | Should Have |
| FR-3.8 | Provide getSummary(date) for bottom bar | Must Have |

### FR-4: Mood Tracker Widget

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Log mood on 1-5 scale with emoji faces | Must Have |
| FR-4.2 | Log energy level separately from mood | Must Have |
| FR-4.3 | Support multiple check-ins per day | Must Have |
| FR-4.4 | Add optional quick tags (anxious, calm, motivated, etc.) | Should Have |
| FR-4.5 | Show today's mood entries | Must Have |
| FR-4.6 | Display mini trend chart | Should Have |
| FR-4.7 | Provide getSummary(date) for bottom bar | Must Have |

### FR-5: Quick Notes Widget

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-5.1 | One-tap instant note capture | Must Have |
| FR-5.2 | Support note types: thought, idea, quote, link, task | Should Have |
| FR-5.3 | Add tags to notes | Should Have |
| FR-5.4 | Pin important notes to top | Should Have |
| FR-5.5 | Archive notes without deleting | Should Have |
| FR-5.6 | Notes linked to creation date | Must Have |
| FR-5.7 | Provide getSummary(date) for bottom bar | Must Have |

### FR-6: Settings

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-6.1 | Light/dark theme toggle | Must Have |
| FR-6.2 | Enable/disable individual widgets | Must Have |
| FR-6.3 | Reset layout to default | Should Have |

---

## Non-Functional Requirements

### NFR-1: Privacy & Data

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1.1 | All data stored locally in IndexedDB | 100% local |
| NFR-1.2 | No external API calls for user data | Zero network data transfer |
| NFR-1.3 | Data never leaves the user's device | Frontend-only architecture |

### NFR-2: Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-2.1 | Initial load time | < 2 seconds |
| NFR-2.2 | Interaction response time | < 100ms |
| NFR-2.3 | Smooth animations | 60fps |
| NFR-2.4 | Widget grid drag/resize | No jank |

### NFR-3: Usability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-3.1 | Logging a habit/mood/note | < 10 seconds |
| NFR-3.2 | Responsive design | Desktop-first, tablet-friendly |
| NFR-3.3 | Keyboard accessible | Basic navigation |

### NFR-4: Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-4.1 | Data persistence | Survives browser restart |
| NFR-4.2 | Layout persistence | Survives browser restart |
| NFR-4.3 | Error handling | Graceful, no data loss |

---

## Technical Architecture Summary

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 + TypeScript + Vite |
| **Styling** | TailwindCSS + shadcn/ui + Magic UI |
| **Dashboard** | React Grid Layout |
| **Animations** | Motion + AutoAnimate |
| **State** | Zustand (global) + Dexie liveQuery (reactive) |
| **Database** | Dexie.js (IndexedDB) |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod |
| **Routing** | React Router |

### Key Architecture Decisions

1. **Widget-owned data** - Each widget defines its own Dexie tables
2. **Feature-based structure** - Code organized by feature, not type
3. **Named exports only** - No default exports for consistency
4. **ISO date strings** - All dates stored as "YYYY-MM-DD" strings

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Dashboard (main widget grid) |
| `/day/:date` | Full day view |
| `/settings` | App settings |

---

## Out of Scope (MVP)

| Feature | Reason | When |
|---------|--------|------|
| Journal Widget | Phase 2 - after core widgets proven | Post-MVP |
| Daily Summary Widget | Phase 2 - requires data from core widgets | Post-MVP |
| Goals & Milestones | Future feature module | Later |
| Health & Body Tracking | Future feature module | Later |
| Mental Wellness Tools | Future feature module | Later |
| PWA/Offline Support | Descoped for simplicity | Maybe Later |
| Backup/Export | Descoped for simplicity | Maybe Later |
| Multi-user/Sync | Not needed for personal use | Not Planned |

---

## MVP Acceptance Criteria

- [ ] Dashboard loads with default layout
- [ ] Can add/remove/resize widgets
- [ ] Layout persists across sessions
- [ ] Bottom bar shows calendar with color-coded days
- [ ] Can tap day to see summary popup
- [ ] Habit tracker: create, complete, view streaks
- [ ] Mood tracker: log mood, see today's entries
- [ ] Quick notes: capture, tag, view notes
- [ ] Light/dark theme works
- [ ] Deployed to GitHub Pages

---

## Implementation Sequence

1. Project initialization (Vite + shadcn)
2. Dexie database setup
3. Zustand stores (layout, settings)
4. Dashboard shell + React Grid Layout
5. Widget registry + base widget interface
6. Bottom bar with calendar
7. Habit Tracker widget
8. Mood Tracker widget
9. Quick Notes widget
10. Settings page
11. GitHub Pages deployment

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| IndexedDB storage limits | Data loss at scale | Monitor storage usage, warn user |
| Browser clears storage | Data loss | Document limitation clearly |
| React Grid Layout complexity | Development delays | Follow official examples closely |
| Widget isolation breaks | Cross-widget bugs | Strict architectural boundaries |

---

## Future Vision

Features will be added one widget at a time, in this likely order:

1. **Journal Widget** - Rich text entries with prompts
2. **Daily Summary Widget** - Auto-generated reviews
3. **Goals Widget** - Milestone tracking
4. **Health Widgets** - Sleep, water, exercise
5. **Mental Wellness** - Gratitude, meditation timer
6. **Productivity** - Pomodoro, daily priorities
7. **Advanced Reviews** - Weekly/monthly/yearly summaries

Each new widget follows the same pattern: self-contained, self-registering, owns its own data.

---

## Document References

| Document | Purpose |
|----------|---------|
| `product-brief-life-os-2025-12-29.md` | Original vision and scope |
| `architecture-life-os-2025-12-29.md` | Technical decisions and patterns |
| `project-context.md` | AI agent implementation rules |

---

**PRD Status:** COMPLETE
**Ready for:** Epic & Story creation
