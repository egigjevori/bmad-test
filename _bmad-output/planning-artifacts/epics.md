---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - prd.md
  - architecture-life-os-2025-12-29.md
  - ux-design-specification.md
  - project-context.md
  - product-brief-life-os-2025-12-29.md
project_name: 'Life OS'
user_name: 'Nova'
date: '2025-12-29'
status: 'complete'
---

# Life OS - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Life OS, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

---

## Epic List Summary

| Epic | Title | Stories | Priority |
|------|-------|---------|----------|
| 1 | Foundation & Dashboard Shell | 6 | Must Have |
| 2 | Habit Tracking | 5 | Must Have |
| 3 | Mood Tracking | 4 | Must Have |
| 4 | Quick Notes | 4 | Must Have |
| 5 | Bottom Bar "Heartbeat" | 4 | Must Have |
| 6 | Settings & Deployment | 4 | Must Have |

**Total: 27 Stories**

---

## FR Coverage Map

| FR | Epic | Story |
|----|------|-------|
| FR-1.1 | Epic 1 | Story 1.3 |
| FR-1.2 | Epic 1 | Story 1.3 |
| FR-1.3 | Epic 1 | Story 1.3 |
| FR-1.4 | Epic 1 | Story 1.4 |
| FR-1.5 | Epic 1 | Story 1.4 |
| FR-1.6 | Epic 6 | Story 6.2 |
| FR-2.1 | Epic 5 | Story 5.1 |
| FR-2.2 | Epic 5 | Story 5.1 |
| FR-2.3 | Epic 5 | Story 5.2 |
| FR-2.4 | Epic 5 | Story 5.2 |
| FR-2.5 | Epic 5 | Story 5.2 |
| FR-2.6 | Epic 5 | Story 5.3 |
| FR-2.7 | Epic 5 | Story 5.3 |
| FR-2.8 | Epic 5 | Story 5.3 |
| FR-3.1 | Epic 2 | Story 2.2 |
| FR-3.2 | Epic 2 | Story 2.2 |
| FR-3.3 | Epic 2 | Story 2.2 |
| FR-3.4 | Epic 2 | Story 2.3 |
| FR-3.5 | Epic 2 | Story 2.3 |
| FR-3.6 | Epic 2 | Story 2.4 |
| FR-3.7 | Epic 2 | Story 2.4 |
| FR-3.8 | Epic 2 | Story 2.5 |
| FR-4.1 | Epic 3 | Story 3.1 |
| FR-4.2 | Epic 3 | Story 3.1 |
| FR-4.3 | Epic 3 | Story 3.2 |
| FR-4.4 | Epic 3 | Story 3.2 |
| FR-4.5 | Epic 3 | Story 3.2 |
| FR-4.6 | Epic 3 | Story 3.3 |
| FR-4.7 | Epic 3 | Story 3.4 |
| FR-5.1 | Epic 4 | Story 4.1 |
| FR-5.2 | Epic 4 | Story 4.2 |
| FR-5.3 | Epic 4 | Story 4.2 |
| FR-5.4 | Epic 4 | Story 4.3 |
| FR-5.5 | Epic 4 | Story 4.3 |
| FR-5.6 | Epic 4 | Story 4.1 |
| FR-5.7 | Epic 4 | Story 4.4 |
| FR-6.1 | Epic 6 | Story 6.1 |
| FR-6.2 | Epic 6 | Story 6.2 |
| FR-6.3 | Epic 6 | Story 6.2 |

---

## Epic 1: Foundation & Dashboard Shell

**Goal:** Establish the project foundation and create a working dashboard where widgets can be added, removed, dragged, and resized.

**User Outcome:** Users have a customizable dashboard ready for widgets.

---

### Story 1.1: Project Initialization

As a developer,
I want to initialize the project with Vite, React 18, TypeScript, and shadcn/ui,
So that I have a solid foundation following the architecture decisions.

**Acceptance Criteria:**

**Given** no project exists
**When** I run the initialization commands
**Then** a new Vite + React + TypeScript project is created
**And** shadcn/ui is initialized with the correct configuration
**And** TailwindCSS is configured with custom design tokens
**And** the feature-based directory structure is created

**Tasks:**
- [ ] Run `npm create vite@latest life-os -- --template react-ts`
- [ ] Run `npx shadcn@latest init` with New York style, Zinc base color
- [ ] Install dependencies: react-grid-layout, zustand, dexie, dexie-react-hooks, react-router-dom, motion, @formkit/auto-animate, recharts, react-hook-form, zod, date-fns, lucide-react
- [ ] Create directory structure: `src/features/`, `src/shared/`, `src/lib/`, `src/styles/`
- [ ] Configure path aliases in tsconfig.json (`@/` → `src/`)
- [ ] Set up CSS custom properties from UX design tokens
- [ ] Configure Inter font

---

### Story 1.2: Core Infrastructure Setup

As a developer,
I want to set up Dexie database, Zustand stores, and React Router,
So that all features have consistent infrastructure to build upon.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I set up the core infrastructure
**Then** Dexie database instance is created at `lib/db.ts`
**And** Zustand layout store is created with persist middleware
**And** React Router is configured with routes (/, /day/:date, /settings)
**And** App shell with routing is working

**Tasks:**
- [ ] Create `lib/db.ts` with Dexie instance
- [ ] Create `lib/stores/layoutStore.ts` with Zustand + persist
- [ ] Create `lib/stores/settingsStore.ts` for theme preference
- [ ] Set up React Router in `main.tsx`
- [ ] Create App shell component with router outlet
- [ ] Create basic route components (Dashboard, DayView, Settings)

---

### Story 1.3: Widget Grid Implementation

As a user,
I want to see widgets in a draggable, resizable grid layout,
So that I can customize my dashboard to my preferences.

**Acceptance Criteria:**

**Given** I am on the dashboard
**When** I drag a widget
**Then** the widget moves to the new position smoothly
**And** other widgets reflow to accommodate

**Given** I am on the dashboard
**When** I resize a widget by dragging its edges
**Then** the widget resizes within its min/max constraints
**And** other widgets reflow to accommodate

**Given** I drag a widget
**When** I release it
**Then** the layout is visually stable with no jank

**Tasks:**
- [ ] Install and configure react-grid-layout
- [ ] Create `features/dashboard/components/WidgetGrid.tsx`
- [ ] Create `features/dashboard/components/WidgetWrapper.tsx`
- [ ] Implement drag-and-drop with visual feedback
- [ ] Implement resize with min/max constraints
- [ ] Style grid to match UX specifications (12-column, 16px gutters)

---

### Story 1.4: Layout Persistence

As a user,
I want my dashboard layout to persist across browser sessions,
So that I don't have to reorganize my widgets every time I open the app.

**Acceptance Criteria:**

**Given** I have customized my dashboard layout
**When** I close and reopen the browser
**Then** my layout is restored exactly as I left it

**Given** it's my first time using the app
**When** I open the dashboard
**Then** I see the default layout with widgets arranged sensibly

**Tasks:**
- [ ] Implement layout save to Zustand store on every change
- [ ] Implement layout restore on app load
- [ ] Create default layout configuration
- [ ] Handle first-time user experience (default layout)

---

### Story 1.5: Widget Registry System

As a developer,
I want a widget registry pattern where widgets self-register,
So that adding new widgets is consistent and doesn't require modifying core code.

**Acceptance Criteria:**

**Given** a widget module is created
**When** it calls `registerWidget()`
**Then** the widget appears in the available widgets list
**And** the widget can be added to the dashboard

**Given** the dashboard loads
**When** the widget registry is initialized
**Then** all registered widgets are available

**Tasks:**
- [ ] Create `features/widgets/registry.ts` with registration functions
- [ ] Create `features/widgets/types.ts` with Widget interface
- [ ] Implement `registerWidget()` function
- [ ] Implement `getRegisteredWidgets()` function
- [ ] Create widget discovery mechanism (import all widget index files)

---

### Story 1.6: Theme System Foundation

As a user,
I want the app to support light and dark themes,
So that I can use it comfortably in different lighting conditions.

**Acceptance Criteria:**

**Given** I open the app for the first time
**When** my system preference is dark mode
**Then** the app loads in dark mode

**Given** I am using the app
**When** I toggle the theme
**Then** the app smoothly transitions to the other theme (200ms)
**And** my preference is saved

**Tasks:**
- [ ] Implement CSS custom properties for light/dark themes
- [ ] Create theme detection from system preference
- [ ] Implement theme toggle logic in settingsStore
- [ ] Add smooth transition on theme change
- [ ] Persist theme preference in localStorage

---

## Epic 2: Habit Tracking

**Goal:** Enable users to track daily habits, mark completions, and see their streaks.

**User Outcome:** Users can track habits consistently and see their progress over time.

---

### Story 2.1: Habit Widget Structure

As a developer,
I want to create the Habit Tracker widget following the widget architecture,
So that it integrates seamlessly with the dashboard.

**Acceptance Criteria:**

**Given** the widget registry exists
**When** the Habit widget is imported
**Then** it registers itself with correct metadata (id, name, icon, sizes)
**And** it can be added to the dashboard

**Tasks:**
- [ ] Create `features/widgets/habits/` directory structure
- [ ] Create `habits/types.ts` with Habit interface
- [ ] Create `habits/schema.ts` with Zod validation
- [ ] Create `habits/db.ts` with Dexie table definition
- [ ] Create `habits/index.ts` with widget registration
- [ ] Create `habits/components/HabitWidget.tsx` shell

---

### Story 2.2: Habit CRUD Operations

As a user,
I want to create, edit, and delete habits,
So that I can customize what I'm tracking.

**Acceptance Criteria:**

**Given** I am viewing the Habits widget
**When** I tap the "+" button and enter a habit name
**Then** a new habit is created and appears in my list

**Given** I have a habit in my list
**When** I tap the edit action
**Then** I can modify the habit name
**And** changes are saved immediately

**Given** I have a habit in my list
**When** I tap the delete/archive action
**Then** the habit is removed from my active list
**And** historical data is preserved

**Tasks:**
- [ ] Create habit creation form/modal
- [ ] Implement `addHabit()` function with Dexie
- [ ] Create habit edit functionality
- [ ] Implement `updateHabit()` function
- [ ] Create delete/archive functionality
- [ ] Implement `archiveHabit()` function
- [ ] Add AutoAnimate for list animations

---

### Story 2.3: Daily Habit Completion

As a user,
I want to mark habits as complete, skipped, or missed for today,
So that I can track my daily progress.

**Acceptance Criteria:**

**Given** I see my habits for today
**When** I tap a habit's checkbox
**Then** it is marked as complete with instant visual feedback (ripple + green)
**And** the completion is saved to the database

**Given** I completed a habit by mistake
**When** I tap the checkbox again
**Then** the completion is undone

**Given** I want to skip a habit
**When** I long-press and select "Skip"
**Then** the habit shows as skipped (neutral, not red)
**And** my streak is preserved

**Tasks:**
- [ ] Create `habits/components/HabitItem.tsx`
- [ ] Implement completion toggle with instant feedback
- [ ] Create completion states (done, skipped, missed)
- [ ] Implement `toggleHabitCompletion()` function
- [ ] Add ripple animation on completion
- [ ] Implement undo via toast (3 seconds)

---

### Story 2.4: Streak Tracking

As a user,
I want to see my current streak for each habit,
So that I'm motivated to maintain consistency.

**Acceptance Criteria:**

**Given** I have completed a habit for 5 consecutive days
**When** I view my habits
**Then** I see "🔥 5 day streak" next to that habit

**Given** I skip a day with the "Skip" option
**When** I view my streak
**Then** my streak is preserved (skip doesn't break streak)

**Given** I miss a day completely
**When** I view my streak the next day
**Then** my streak resets to 0 (or 1 if I complete today)

**Tasks:**
- [ ] Implement `calculateStreak()` function
- [ ] Create streak display component
- [ ] Handle skip vs miss logic for streak calculation
- [ ] Add milestone celebration at 7, 30, 100 days
- [ ] Show completion percentage if desired

---

### Story 2.5: Habit Widget Summary for Bottom Bar

As a user,
I want the bottom bar to show my habit completion summary for any day,
So that I can see my progress at a glance.

**Acceptance Criteria:**

**Given** the bottom bar requests habit data for a date
**When** `getSummary(date)` is called
**Then** it returns habit completion count and percentage (e.g., "4/5 habits (80%)")

**Tasks:**
- [ ] Implement `getSummary(date: string)` function
- [ ] Return WidgetSummary type with completion data
- [ ] Ensure efficient querying (indexed by date)

---

## Epic 3: Mood Tracking

**Goal:** Enable users to log their mood and energy levels throughout the day.

**User Outcome:** Users can track how they're feeling and identify patterns over time.

---

### Story 3.1: Mood Widget & Basic Logging

As a user,
I want to log my mood on a 1-5 scale with emoji faces,
So that I can track how I'm feeling throughout the day.

**Acceptance Criteria:**

**Given** I am viewing the Mood widget
**When** I tap an emoji face (😢 😕 😐 🙂 😄)
**Then** my mood is logged with a timestamp
**And** the emoji scales with a bounce animation

**Given** I am logging my mood
**When** I also want to log energy
**Then** I can adjust the energy slider (1-10) separately from mood

**Tasks:**
- [ ] Create `features/widgets/mood/` directory structure
- [ ] Create `mood/types.ts` with MoodEntry interface
- [ ] Create `mood/db.ts` with Dexie table
- [ ] Create `mood/components/MoodWidget.tsx`
- [ ] Create `mood/components/MoodSelector.tsx` with emoji faces
- [ ] Create energy slider component
- [ ] Implement mood logging with Motion animations

---

### Story 3.2: Multiple Check-ins & Tags

As a user,
I want to log my mood multiple times per day and add context tags,
So that I can capture how my mood changes and what influences it.

**Acceptance Criteria:**

**Given** I've already logged my mood today
**When** I log again later
**Then** both entries are saved with timestamps
**And** I can see all my entries for today

**Given** I am logging my mood
**When** I tap quick tags (Calm, Focused, Stressed, etc.)
**Then** the selected tags are saved with my mood entry

**Tasks:**
- [ ] Support multiple mood entries per day
- [ ] Create `mood/components/MoodEntryList.tsx`
- [ ] Create quick tags component
- [ ] Implement tag toggle logic
- [ ] Display today's entries in the widget

---

### Story 3.3: Mood Trend Visualization

As a user,
I want to see a mini trend chart of my recent moods,
So that I can spot patterns at a glance.

**Acceptance Criteria:**

**Given** I have mood entries over the past week
**When** I view the Mood widget
**Then** I see a small line chart showing mood over time

**Tasks:**
- [ ] Create mini chart component using Recharts
- [ ] Query mood data for trend period
- [ ] Style chart to match UX design (minimal, soft colors)

---

### Story 3.4: Mood Widget Summary for Bottom Bar

As a user,
I want the bottom bar to show my mood summary for any day,
So that I can see my emotional state at a glance.

**Acceptance Criteria:**

**Given** the bottom bar requests mood data for a date
**When** `getSummary(date)` is called
**Then** it returns the primary mood emoji and descriptor (e.g., "🙂 Good (4/5)")

**Tasks:**
- [ ] Implement `getSummary(date: string)` function
- [ ] Calculate average/primary mood for the day
- [ ] Return WidgetSummary type with mood data

---

## Epic 4: Quick Notes

**Goal:** Enable users to instantly capture thoughts, ideas, and links.

**User Outcome:** Users can capture thoughts with zero friction throughout their day.

---

### Story 4.1: Quick Note Capture

As a user,
I want to capture a note with one tap,
So that I don't lose thoughts when they come to me.

**Acceptance Criteria:**

**Given** I am viewing the Notes widget
**When** I tap the "+" button or note input
**Then** I can immediately type my note
**And** the note is saved as I type (debounced)
**And** the note is linked to today's date

**Tasks:**
- [ ] Create `features/widgets/notes/` directory structure
- [ ] Create `notes/types.ts` with Note interface
- [ ] Create `notes/db.ts` with Dexie table
- [ ] Create `notes/components/NotesWidget.tsx`
- [ ] Create `notes/components/NoteInput.tsx`
- [ ] Implement auto-save with debounce
- [ ] Link notes to creation date (ISO string)

---

### Story 4.2: Note Types & Tags

As a user,
I want to categorize my notes by type and add tags,
So that I can organize and find them later.

**Acceptance Criteria:**

**Given** I am creating a note
**When** I select a note type (💭 Thought, 💡 Idea, 💬 Quote, 🔗 Link, ☑️ Task)
**Then** the note is saved with that type
**And** the icon is displayed on the note card

**Given** I am viewing a note
**When** I add tags
**Then** the tags are displayed on the note card

**Tasks:**
- [ ] Create note type selector
- [ ] Implement note type storage and display
- [ ] Create tag input component
- [ ] Display tags on note cards

---

### Story 4.3: Pin & Archive Notes

As a user,
I want to pin important notes to the top and archive old ones,
So that I can focus on what's relevant.

**Acceptance Criteria:**

**Given** I have a note I want to keep visible
**When** I pin it
**Then** it stays at the top of my notes list
**And** it has a subtle visual indicator (yellow left border)

**Given** I have a note I'm done with
**When** I archive it
**Then** it disappears from my active list
**And** I can still find it if I need it

**Tasks:**
- [ ] Implement pin toggle functionality
- [ ] Sort notes with pinned at top
- [ ] Implement archive functionality
- [ ] Style pinned and archived states

---

### Story 4.4: Notes Widget Summary for Bottom Bar

As a user,
I want the bottom bar to show my notes count for any day,
So that I can see my capture activity at a glance.

**Acceptance Criteria:**

**Given** the bottom bar requests notes data for a date
**When** `getSummary(date)` is called
**Then** it returns the note count (e.g., "📝 3 notes")

**Tasks:**
- [ ] Implement `getSummary(date: string)` function
- [ ] Count notes for the given date
- [ ] Return WidgetSummary type with count

---

## Epic 5: Bottom Bar "Heartbeat"

**Goal:** Create the signature timeline that shows life patterns at a glance.

**User Outcome:** Users can see their data patterns and quickly access any day's summary.

---

### Story 5.1: Bottom Bar Shell & Calendar Strip

As a user,
I want a collapsible bar at the bottom showing recent days,
So that I can navigate my timeline easily.

**Acceptance Criteria:**

**Given** I am on the dashboard
**When** I look at the bottom of the screen
**Then** I see a horizontal scrollable calendar showing recent days

**Given** the bottom bar is expanded
**When** I tap the collapse button
**Then** it smoothly collapses to show only color dots (24px height)

**Given** the bottom bar is collapsed
**When** I tap anywhere on it
**Then** it expands to show the full calendar (64px height)

**Tasks:**
- [ ] Create `features/bottom-bar/components/BottomBar.tsx`
- [ ] Create `features/bottom-bar/components/CalendarStrip.tsx`
- [ ] Implement horizontal scrolling with 7-9 visible days
- [ ] Implement collapse/expand with animation (300ms)
- [ ] Style according to UX specs

---

### Story 5.2: Day Color Coding & Today Highlight

As a user,
I want days color-coded based on what I logged,
So that I can see patterns at a glance.

**Acceptance Criteria:**

**Given** a day has habit completions
**When** I view the calendar
**Then** that day shows green color

**Given** a day has mood entries
**When** I view the calendar
**Then** that day shows warm colors (based on mood)

**Given** a day has notes
**When** I view the calendar
**Then** that day shows purple color

**Given** a day has multiple types of entries
**When** I view the calendar
**Then** that day shows blended/stacked colors

**Given** today is visible in the calendar
**When** I view the calendar
**Then** today has a pulsing blue accent ring

**Tasks:**
- [ ] Create `features/bottom-bar/components/DayCell.tsx`
- [ ] Implement color aggregation logic from all widgets
- [ ] Create color blending for multiple data types
- [ ] Implement today highlight with pulse animation
- [ ] Handle empty days (gray, low opacity)

---

### Story 5.3: Day Summary Popup

As a user,
I want to tap a day and see a summary popup,
So that I can quickly review that day's data.

**Acceptance Criteria:**

**Given** I tap a day in the calendar
**When** that day has data
**Then** a popup appears showing: habit %, mood emoji, notes count

**Given** the popup is open
**When** I tap "View Full Day"
**Then** I navigate to `/day/:date`

**Given** the popup is open
**When** I tap outside it or swipe down
**Then** the popup dismisses

**Tasks:**
- [ ] Create `features/bottom-bar/components/DaySummaryPopup.tsx`
- [ ] Aggregate data from all widgets using getSummary()
- [ ] Implement popup animation (fade + slide up, 150ms)
- [ ] Implement "View Full Day" navigation
- [ ] Implement dismiss behavior

---

### Story 5.4: Day View Page

As a user,
I want to view all my data for a specific day on a dedicated page,
So that I can review and reflect on that day in detail.

**Acceptance Criteria:**

**Given** I navigate to `/day/2025-12-29`
**When** the page loads
**Then** I see all habits, mood entries, and notes for that day
**And** I can still interact with items (complete habits, etc.)

**Tasks:**
- [ ] Create `features/day-view/components/DayView.tsx`
- [ ] Query all widget data for the specified date
- [ ] Display data in a clean, scrollable layout
- [ ] Allow interactions with data items

---

## Epic 6: Settings & Deployment

**Goal:** Enable users to personalize their experience and make the app accessible online.

**User Outcome:** Users can customize their dashboard and access it from anywhere.

---

### Story 6.1: Theme Toggle

As a user,
I want to toggle between light and dark themes in settings,
So that I can choose what's comfortable for my eyes.

**Acceptance Criteria:**

**Given** I am on the Settings page
**When** I toggle the theme switch
**Then** the app theme changes with a smooth transition
**And** my preference is saved

**Tasks:**
- [ ] Create `features/settings/components/Settings.tsx`
- [ ] Create theme toggle component
- [ ] Connect to settingsStore
- [ ] Ensure smooth transition animation

---

### Story 6.2: Widget Management

As a user,
I want to enable/disable widgets and reset my layout,
So that I can customize what I see on my dashboard.

**Acceptance Criteria:**

**Given** I am on the Settings page
**When** I toggle a widget off
**Then** it disappears from my dashboard

**Given** I am on the Settings page
**When** I toggle a widget on
**Then** it appears on my dashboard in a default position

**Given** I have messed up my layout
**When** I tap "Reset Layout"
**Then** my layout returns to the default configuration

**Tasks:**
- [ ] Create widget management section in Settings
- [ ] Implement widget enable/disable logic
- [ ] Implement layout reset functionality
- [ ] Save widget visibility preferences

---

### Story 6.3: Keyboard Shortcuts

As a power user,
I want keyboard shortcuts for common actions,
So that I can use the app efficiently.

**Acceptance Criteria:**

**Given** I am on the dashboard
**When** I press `H`
**Then** the Habits widget is focused

**Given** I am on the dashboard
**When** I press `M`
**Then** the mood logging modal opens

**Given** I am on the dashboard
**When** I press `N`
**Then** the note input is focused

**Given** I am anywhere in the app
**When** I press `T`
**Then** the bottom bar scrolls to today

**Tasks:**
- [ ] Implement global keyboard listener
- [ ] Create keyboard shortcut handler
- [ ] Implement focus management for widgets
- [ ] Document shortcuts in Settings

---

### Story 6.4: GitHub Pages Deployment

As a developer,
I want the app deployed to GitHub Pages with CI/CD,
So that it's accessible from anywhere.

**Acceptance Criteria:**

**Given** I push to the main branch
**When** GitHub Actions runs
**Then** the app is built and deployed to GitHub Pages
**And** the app is accessible at the GitHub Pages URL

**Tasks:**
- [ ] Configure Vite for base path (if needed)
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure GitHub Pages in repository settings
- [ ] Test deployment pipeline

---

## Implementation Order

### Phase 1: Foundation (Epic 1)
1. Story 1.1: Project Initialization
2. Story 1.2: Core Infrastructure Setup
3. Story 1.6: Theme System Foundation
4. Story 1.5: Widget Registry System
5. Story 1.3: Widget Grid Implementation
6. Story 1.4: Layout Persistence

### Phase 2: Core Widgets (Epics 2, 3, 4)
7. Story 2.1: Habit Widget Structure
8. Story 2.2: Habit CRUD Operations
9. Story 2.3: Daily Habit Completion
10. Story 2.4: Streak Tracking
11. Story 2.5: Habit Widget Summary
12. Story 3.1: Mood Widget & Basic Logging
13. Story 3.2: Multiple Check-ins & Tags
14. Story 3.3: Mood Trend Visualization
15. Story 3.4: Mood Widget Summary
16. Story 4.1: Quick Note Capture
17. Story 4.2: Note Types & Tags
18. Story 4.3: Pin & Archive Notes
19. Story 4.4: Notes Widget Summary

### Phase 3: Bottom Bar (Epic 5)
20. Story 5.1: Bottom Bar Shell & Calendar Strip
21. Story 5.2: Day Color Coding & Today Highlight
22. Story 5.3: Day Summary Popup
23. Story 5.4: Day View Page

### Phase 4: Polish & Deploy (Epic 6)
24. Story 6.1: Theme Toggle
25. Story 6.2: Widget Management
26. Story 6.3: Keyboard Shortcuts
27. Story 6.4: GitHub Pages Deployment

---

## MVP Acceptance Criteria Mapping

| Criteria | Epic.Story |
|----------|------------|
| Dashboard loads with default layout | 1.4 |
| Can add/remove/resize widgets | 1.3, 6.2 |
| Layout persists across sessions | 1.4 |
| Bottom bar shows calendar with color-coded days | 5.1, 5.2 |
| Can tap day to see summary popup | 5.3 |
| Habit tracker: create, complete, view streaks | 2.2, 2.3, 2.4 |
| Mood tracker: log mood, see today's entries | 3.1, 3.2 |
| Quick notes: capture, tag, view notes | 4.1, 4.2 |
| Light/dark theme works | 1.6, 6.1 |
| Deployed to GitHub Pages | 6.4 |

---

**Epics Status:** COMPLETE
**Total Stories:** 27
**Ready for:** Sprint Planning / Development
