---
stepsCompleted: [1, 2, 3, 4, 5, 6]
status: complete
inputDocuments:
  - IDEA.md
  - PROCESS.md
date: 2025-12-29
author: Nova
project_name: Life OS
---

# Product Brief: Life OS

## Executive Summary

Life OS is a frontend-only personal dashboard that unifies habit tracking, mood logging, journaling, and quick notes into a single customizable interface. Built for privacy-conscious users who want to track their daily life without fragmented apps or cloud dependencies, Life OS puts control back in the user's hands through a modular widget system and a visually engaging "heartbeat" timeline.

---

## Core Vision

### Problem Statement

Personal tracking tools are fragmented across multiple apps, each with its own data silo, login, and learning curve. Users who want a holistic view of their habits, moods, and thoughts must juggle Habitica for habits, Daylio for moods, Apple Notes for thoughts - never seeing how these connect.

### Problem Impact

Without unified tracking, patterns remain invisible. Users can't see that their mood dips on days they skip exercise, or that their best journaling happens on weekends. The cognitive overhead of multiple apps leads to abandonment.

### Why Existing Solutions Fall Short

- **Habitica**: Gamification adds complexity, not clarity
- **Daylio**: Mood-focused, limited habit integration
- **Notion**: Requires significant setup and maintenance
- **Most apps**: Cloud-dependent, privacy-compromising, inflexible structure

### Proposed Solution

Life OS provides a single, customizable dashboard where users add only the widgets they need. A habit tracker, mood logger, and quick notes form the MVP core, with journaling and reviews coming next. The signature "heartbeat" bottom bar visualizes life patterns through color-coded days and micro-animations.

### Key Differentiators

| Differentiator | Description |
|----------------|-------------|
| **Widget Architecture** | Add/remove features freely - no forced structure |
| **Living Timeline** | Animated bottom bar shows patterns at a glance |
| **100% Private** | Frontend-only, all data in local IndexedDB |
| **Modern Stack** | React 18, shadcn/ui, Magic UI, Motion - premium feel |

---

## Target Users

### Primary Users

**Persona: The Self-Tracking Developer**

| Attribute | Detail |
|-----------|--------|
| **Name** | Nova (you) |
| **Role** | Developer building for personal use |
| **Context** | Wants a unified place to track daily life without app-hopping |
| **Motivation** | Productivity, self-awareness, keeping things simple |

**Goals:**
- Track habits consistently without friction
- Log mood/energy to spot patterns
- Capture quick thoughts throughout the day
- See daily life at a glance via the bottom bar

**Pain Points with Current Solutions:**
- Too many apps for different tracking needs
- Privacy concerns with cloud-based tools
- Existing apps don't match personal workflow

**Success Looks Like:**
- Opening Life OS becomes a natural part of the day
- Patterns become visible through the living timeline
- Zero friction to log a habit, mood, or thought

### Secondary Users

N/A - Single user application, no sharing or collaboration features needed.

### User Journey

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

### BMAD Learning Goals

| Goal | Validation |
|------|------------|
| **Workflow Works** | Product Brief → Architecture → Epics → Code succeeded |
| **Artifacts Useful** | Documents helped guide development, not just ceremony |
| **Time Well Spent** | BMAD added clarity without excessive overhead |

### Business Objectives

N/A - Personal project, no commercial goals.

### Key Performance Indicators

N/A - Not tracking business KPIs for this project.

---

## MVP Scope

### Core Features (Phase 1)

| Component | Description | Priority |
|-----------|-------------|----------|
| **Dashboard Shell** | React Grid Layout base, widget registry, layout persistence, settings | Must Have |
| **Bottom Bar** | Collapsible calendar strip, color-coded days, micro-animations, day summary popup | Must Have |
| **Habit Tracker Widget** | CRUD habits, daily check-ins, streaks, completion states | Must Have |
| **Mood Tracker Widget** | Mood/energy scale, quick tags, multiple check-ins per day | Must Have |
| **Quick Notes Widget** | Instant capture, note types, tagging, pin/archive | Must Have |

### Out of Scope for MVP

| Feature | Reason | When |
|---------|--------|------|
| Journal Widget | Phase 2 - after core widgets proven | Post-MVP |
| Daily Summary Widget | Phase 2 - requires data from core widgets | Post-MVP |
| Goals & Milestones | Future feature module | Later |
| Health & Body Tracking | Future feature module | Later |
| Mental Wellness Tools | Future feature module | Later |
| Productivity Tools | Future feature module | Later |
| Reviews & Summaries | Future feature module | Later |
| PWA/Offline Support | Descoped for simplicity | Maybe Later |
| Backup/Export | Descoped for simplicity | Maybe Later |
| Multi-user/Sync | Not needed for personal use | Not Planned |

### MVP Success Criteria

- [ ] Dashboard loads with default layout
- [ ] Can add/remove/resize widgets
- [ ] Layout persists across sessions
- [ ] Bottom bar shows calendar with color-coded days
- [ ] Can tap day to see summary popup
- [ ] Habit tracker: create, complete, view streaks
- [ ] Mood tracker: log mood, see today's entries
- [ ] Quick notes: capture, tag, view notes

### Future Vision

**Post-MVP Expansion Strategy:**
Features will be added one widget at a time, in this likely order:

1. **Journal Widget** - Rich text entries with prompts
2. **Daily Summary Widget** - Auto-generated reviews
3. **Goals Widget** - Milestone tracking
4. **Health Widgets** - Sleep, water, exercise
5. **Mental Wellness** - Gratitude, meditation timer
6. **Productivity** - Pomodoro, daily priorities
7. **Advanced Reviews** - Weekly/monthly/yearly summaries

Each new widget follows the same pattern: self-contained, self-registering, owns its own data.
