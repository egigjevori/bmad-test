# Story 6.2: Widget Management

Status: done

## Story

As a user,
I want to enable/disable widgets and reset my layout,
So that I can customize what I see on my dashboard.

## Acceptance Criteria

1. **Given** I am on the Settings page
   **When** I view the Widgets section
   **Then** I see a list of all available widgets with toggle switches

2. **Given** I am on the Settings page
   **When** I toggle a widget off
   **Then** it disappears from my dashboard immediately
   **And** my preference is saved to localStorage

3. **Given** I am on the Settings page
   **When** I toggle a widget on
   **Then** it appears on my dashboard in a default position
   **And** my preference is saved to localStorage

4. **Given** I have messed up my layout
   **When** I tap "Reset Layout"
   **Then** my layout returns to the default configuration
   **And** all widgets are re-enabled

## Tasks / Subtasks

- [x] Task 1: Create WidgetToggles component (AC: #1, #2, #3)
  - [x] Create `src/features/settings/components/WidgetToggles.tsx`
  - [x] Import `getWidgetConfigs()` from widget registry
  - [x] Import `useLayoutStore` for toggle state
  - [x] Display each widget with icon, name, description, and Switch
  - [x] Connect switches to `toggleWidget()` action

- [x] Task 2: Create ResetLayoutButton component (AC: #4)
  - [x] Create `src/features/settings/components/ResetLayoutButton.tsx`
  - [x] Add confirmation dialog before reset (destructive action)
  - [x] Connect to `resetLayouts()` action from layoutStore

- [x] Task 3: Update Settings page (AC: #1, #4)
  - [x] Import WidgetToggles and ResetLayoutButton into Settings.tsx
  - [x] Replace placeholder text in Widgets section
  - [x] Add Reset Layout button at bottom of Widgets section
  - [x] Style section consistently with Appearance section

- [x] Task 4: Verify dashboard integration (AC: #2, #3)
  - [x] Confirm WidgetGrid respects `enabledWidgets` filter
  - [x] Test toggle off removes widget from grid
  - [x] Test toggle on adds widget to grid at default position

- [x] Task 5: Test persistence (AC: #2, #3)
  - [x] Verify `life-os-layout` localStorage key stores enabledWidgets
  - [x] Test refresh preserves widget visibility preferences

## Dev Notes

### Existing Infrastructure (DO NOT RECREATE)

The widget management infrastructure was built in Stories 1.4 and 1.5. The following already exists and works:

**Layout Store** (`src/lib/stores/layoutStore.ts`):
```typescript
interface LayoutState {
  layouts: Record<string, LayoutItem[]>;
  enabledWidgets: string[];  // Already tracks enabled widgets!
  toggleWidget: (widgetId: string) => void;  // Already implemented!
  enableWidget: (widgetId: string) => void;
  disableWidget: (widgetId: string) => void;
  resetLayouts: () => void;  // Already implemented!
  isWidgetEnabled: (widgetId: string) => boolean;
}

// Default enabled: ['habits', 'mood', 'notes']
// Persisted to: 'life-os-layout' localStorage key
```

**Widget Registry** (`src/features/widgets/registry.ts`):
```typescript
// Get all widget configs for settings UI
export function getWidgetConfigs(): WidgetConfig[];

// WidgetConfig includes: id, name, description, icon, sizes, category
```

**Widget Config Type** (`src/features/widgets/types.ts`):
```typescript
interface WidgetConfig {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;  // For display in settings
  sizes: WidgetSizes;
  category: 'tracking' | 'productivity' | 'wellness' | 'other';
}
```

### Implementation Pattern

```typescript
// WidgetToggles.tsx pattern
import { getWidgetConfigs } from '@/features/widgets/registry';
import { useLayoutStore } from '@/lib/stores/layoutStore';
import { Switch } from '@/shared/components/ui/switch';

export function WidgetToggles() {
  const widgets = getWidgetConfigs();
  const { enabledWidgets, toggleWidget, isWidgetEnabled } = useLayoutStore();

  return (
    <div className="space-y-4">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        return (
          <div key={widget.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{widget.name}</p>
                <p className="text-xs text-muted-foreground">{widget.description}</p>
              </div>
            </div>
            <Switch
              checked={isWidgetEnabled(widget.id)}
              onCheckedChange={() => toggleWidget(widget.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
```

```typescript
// ResetLayoutButton.tsx pattern
import { useLayoutStore } from '@/lib/stores/layoutStore';
import { Button } from '@/shared/components/ui/button';

export function ResetLayoutButton() {
  const resetLayouts = useLayoutStore((s) => s.resetLayouts);

  const handleReset = () => {
    // Consider adding a confirmation dialog
    resetLayouts();
  };

  return (
    <Button variant="outline" onClick={handleReset}>
      Reset Layout
    </Button>
  );
}
```

### Architecture Compliance

| Rule | Requirement |
|------|-------------|
| Exports | Named exports only (no default) |
| Naming | PascalCase for components |
| Imports | External → Internal (@/) → Relative → Types |
| State | Use existing useLayoutStore, do NOT create new store |
| Styling | Tailwind classes only, use `cn()` utility |
| UI Components | Use shadcn/ui Switch and Button components |

### File Locations

| File | Path |
|------|------|
| WidgetToggles | `src/features/settings/components/WidgetToggles.tsx` |
| ResetLayoutButton | `src/features/settings/components/ResetLayoutButton.tsx` |
| Settings (update) | `src/features/settings/components/Settings.tsx` |
| Layout Store (existing) | `src/lib/stores/layoutStore.ts` |
| Widget Registry (existing) | `src/features/widgets/registry.ts` |
| Switch (existing) | `src/shared/components/ui/switch.tsx` |

### Project Structure Notes

- Settings feature follows architecture: `features/settings/components/`
- UI components are in `shared/components/ui/`
- All stores are in `lib/stores/`
- Widget registry is in `features/widgets/`
- No new stores needed - use existing layoutStore

### Previous Story Intelligence (Story 6.1)

**Learnings from 6.1:**
- ThemeSelector pattern works well for settings section components
- Settings.tsx has consistent section structure (rounded-lg border bg-card p-6 shadow-sm)
- Switch component from shadcn/ui already installed and working
- Follow same import/export patterns

**Files that already exist:**
- `src/shared/components/ui/switch.tsx` - shadcn/ui Switch (installed in 6.1)
- `src/features/settings/components/ThemeSelector.tsx` - Good pattern reference
- `src/features/settings/components/Settings.tsx` - Has placeholder Widgets section

### Dashboard Integration Notes

The WidgetGrid component should already filter widgets by `enabledWidgets` from layoutStore. Verify this is working:

```typescript
// Expected pattern in WidgetGrid.tsx
const enabledWidgets = useLayoutStore((s) => s.enabledWidgets);
const widgets = getRegisteredWidgets().filter((w) =>
  enabledWidgets.includes(w.config.id)
);
```

If this filtering is NOT implemented, it will need to be added as part of this story.

### Available Widgets for Toggle

Currently registered widgets (from registry.ts):
- `habits` - Habit Tracker (tracking)
- `mood` - Mood Tracker (wellness)
- `notes` - Quick Notes (productivity)

### References

- [Source: architecture-life-os-2025-12-29.md#Frontend Architecture] - Component patterns
- [Source: architecture-life-os-2025-12-29.md#State Management] - Zustand patterns
- [Source: project-context.md#Framework-Specific Rules] - React component structure
- [Source: epics.md#Story 6.2] - Original story definition
- [Source: epics.md#Story 1.4] - Layout persistence foundation
- [Source: epics.md#Story 1.5] - Widget registry system

### Testing Notes

- Manual testing sufficient for this story
- Verify: Toggle off removes widget from dashboard
- Verify: Toggle on adds widget to dashboard
- Verify: Reset Layout returns to default (all 3 widgets enabled, default positions)
- Verify: Preferences persist across page refresh
- Verify: Switch states match actual widget visibility

### Dependencies

- Story 1.4 (Layout Persistence) - DONE
- Story 1.5 (Widget Registry System) - DONE
- Story 6.1 (Theme Toggle) - DONE (installed Switch component)
- shadcn/ui Button component - may need install if not present

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - clean implementation

### Completion Notes List

- Task 1: Created WidgetToggles.tsx displaying all widgets with icons, names, descriptions, and Switch components
- Task 2: Created ResetLayoutButton.tsx with inline confirmation dialog (destructive action safety)
- Task 3: Updated Settings.tsx to use new components, styled consistently with Appearance section
- Task 4: Verified WidgetGrid already filters by enabledWidgets and shows helpful message when no widgets enabled
- Task 5: Confirmed Zustand persist middleware saves enabledWidgets to 'life-os-layout' localStorage key
- Installed shadcn/ui Button component (was missing)
- Build verified successful via `npx vite build --mode development`

### File List

**New Files:**
- `src/shared/components/ui/button.tsx` - shadcn/ui Button component
- `src/features/settings/components/WidgetToggles.tsx` - Widget toggle list component
- `src/features/settings/components/ResetLayoutButton.tsx` - Reset layout with confirmation

**Modified Files:**
- `src/features/settings/components/Settings.tsx` - Added WidgetToggles and ResetLayoutButton

## Change Log

- 2026-01-05: Story 6.2 Widget Management implemented - all tasks complete, ready for review
