---
project_name: 'Life OS'
user_name: 'Nova'
date: '2025-12-29'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'critical_rules']
status: 'complete'
existing_patterns_found: 8
source_document: 'architecture-life-os-2025-12-29.md'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

| Category | Technology | Install Command |
|----------|------------|-----------------|
| **Framework** | React 18 + TypeScript | `npm create vite@latest -- --template react-ts` |
| **Build** | Vite (SWC) | Included with template |
| **Styling** | TailwindCSS + shadcn/ui + Magic UI | `npx shadcn@latest init` |
| **Dashboard** | react-grid-layout | `npm install react-grid-layout` |
| **Animations** | motion + @formkit/auto-animate | `npm install motion @formkit/auto-animate` |
| **State** | zustand | `npm install zustand` |
| **Database** | dexie + dexie-react-hooks | `npm install dexie dexie-react-hooks` |
| **Charts** | recharts | `npm install recharts` |
| **Rich Text** | @tiptap/react + @tiptap/starter-kit | `npm install @tiptap/react @tiptap/starter-kit` |
| **Forms** | react-hook-form + zod | `npm install react-hook-form zod` |
| **Routing** | react-router-dom | `npm install react-router-dom` |
| **Utilities** | date-fns + lucide-react | `npm install date-fns lucide-react` |
| **Types** | @types/react-grid-layout | `npm install -D @types/react-grid-layout` |

### Version Constraints

- **React 18+**: Required for concurrent features
- **TypeScript**: Strict mode enabled
- **Dexie 4+**: Required for `liveQuery` reactivity
- **Motion**: Lightweight Framer Motion replacement (use `motion/react` imports)

---

## Language-Specific Rules (TypeScript)

### Import/Export Patterns

- **Named exports ONLY** - No default exports anywhere
  ```typescript
  // ✅ Correct
  export function HabitList() { }
  export const useHabits = () => { }

  // ❌ Wrong
  export default function HabitList() { }
  ```

- **Import order** (enforced):
  1. External packages (`react`, `zustand`, etc.)
  2. Internal absolute imports (`@/...`)
  3. Relative imports (`./...`)
  4. Type imports (`type` keyword)

### Type Patterns

- **No `any` type** - Use `unknown` + type guards instead
- **No `I` prefix** on interfaces - Use `HabitProps` not `IHabitProps`
- **Infer types from Zod** - `type Habit = z.infer<typeof habitSchema>`

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HabitWidget`, `DaySummaryPopup` |
| Hooks | camelCase + `use` | `useHabits`, `useLiveQuery` |
| Functions | camelCase | `calculateStreak`, `formatDate` |
| Constants | UPPER_SNAKE_CASE | `MAX_HABITS`, `DEFAULT_LAYOUT` |
| Booleans | `is`/`has`/`should` prefix | `isLoading`, `hasStreak` |
| Event handlers | `handle` prefix | `handleComplete`, `handleDelete` |

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `HabitWidget.tsx` |
| Hooks | camelCase.ts | `useHabits.ts` |
| Utilities | camelCase.ts | `dateUtils.ts` |
| Types | types.ts or PascalCase | `types.ts` |
| Stores | camelCase.ts | `layoutStore.ts` |

---

## Framework-Specific Rules

### React Component Structure

```typescript
// Standard component file structure
// 1. Imports (external → internal → relative → types)
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Button } from '@/shared/components/ui/button';
import { useHabits } from '../hooks/useHabits';
import type { Habit } from '../types';

// 2. Types/Interfaces
interface HabitListProps {
  date: string;
  onComplete?: (habitId: number) => void;
}

// 3. Component (named export)
export function HabitList({ date, onComplete }: HabitListProps) {
  // hooks first, then handlers, then render
}
```

### Dexie/IndexedDB Rules

- **Store dates as ISO strings** - Never store `Date` objects
  ```typescript
  // ✅ Correct
  createdAt: '2025-12-29'

  // ❌ Wrong
  createdAt: new Date()
  ```

- **Use `useLiveQuery` for reactive data**
  ```typescript
  const habits = useLiveQuery(
    () => db.habits.where('date').equals(date).toArray(),
    [date],
    [] // default value while loading
  );
  ```

- **Table naming**: camelCase, plural (`habits`, `moodEntries`, `notes`)

### Zustand Store Pattern

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  layouts: Record<string, Layout[]>;
  setLayouts: (breakpoint: string, layout: Layout[]) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layouts: {},
      setLayouts: (breakpoint, layout) =>
        set((state) => ({
          layouts: { ...state.layouts, [breakpoint]: layout },
        })),
    }),
    { name: 'life-os-layout' }
  )
);
```

### Animation Rules

- **AutoAnimate** for list animations (add/remove items)
- **Motion** for explicit animations (enter/exit, hover states)
- **No inline styles** - Use Tailwind classes

```typescript
// AutoAnimate for lists
import { useAutoAnimate } from '@formkit/auto-animate/react';
const [parent] = useAutoAnimate();
<ul ref={parent}>{items.map(...)}</ul>

// Motion for explicit animations
import { motion } from 'motion/react';
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

---

## Testing Rules

### Test Framework

- **Vitest** for unit/integration tests (Vite-native, fast)
- **Testing Library** for React component tests
- **Playwright** or **Cypress** for E2E (future)

### Test File Organization

```
src/features/widgets/habits/
├── components/
│   ├── HabitList.tsx
│   └── HabitList.test.tsx  # Co-located tests
└── hooks/
    ├── useHabits.ts
    └── useHabits.test.ts
```

### Test Naming

- Test files: `{ComponentName}.test.tsx` or `{hookName}.test.ts`
- Test descriptions: `describe('ComponentName')` → `it('should do specific thing')`

### Testing Patterns

```typescript
import { render, screen } from '@testing-library/react';
import { HabitList } from './HabitList';

describe('HabitList', () => {
  it('should render habits for the given date', () => {
    render(<HabitList date="2025-12-29" />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
```

### What to Test

- **Unit**: Utility functions, date formatters, calculations
- **Integration**: Hooks with Dexie, component + store interactions
- **Skip**: shadcn/ui components (already tested), simple pass-through components

### Mocking Dexie

```typescript
vi.mock('@/lib/db', () => ({
  db: {
    habits: {
      toArray: vi.fn().mockResolvedValue([]),
      add: vi.fn(),
    },
  },
}));
```

---

## Code Quality & Style Rules

### Project Structure

```
src/
├── features/           # Feature-based organization
│   ├── dashboard/      # Dashboard shell
│   ├── bottom-bar/     # The "Heartbeat" bar
│   ├── settings/       # App settings
│   ├── day-view/       # Full day view
│   └── widgets/        # All widgets
│       ├── registry.ts # Widget registration
│       ├── types.ts    # Widget interface
│       ├── habits/     # Habit widget
│       ├── mood/       # Mood widget
│       └── notes/      # Notes widget
├── shared/             # Shared across features
│   ├── components/ui/  # shadcn/ui components
│   ├── hooks/          # Shared hooks
│   └── utils/          # Utility functions
├── lib/                # Core infrastructure
│   ├── db.ts           # Dexie instance
│   └── stores/         # Zustand stores
└── styles/             # Global styles
```

### Widget File Structure

Each widget MUST follow this structure:

```
features/widgets/{name}/
├── components/         # UI components
│   ├── {Name}Widget.tsx
│   └── ...
├── hooks/              # Widget-specific hooks
├── db.ts               # Dexie table definitions
├── schema.ts           # Zod validation schemas
├── types.ts            # TypeScript types
└── index.ts            # Widget registration + exports
```

### Styling Rules

- **TailwindCSS only** - No CSS files, no inline styles
- **CSS variables** for theming (defined in `globals.css`)
- **shadcn/ui** components via `npx shadcn@latest add [name]`
- **cn() utility** for conditional classes

```typescript
import { cn } from '@/shared/utils/cn';

<div className={cn('base-class', isActive && 'active-class')} />
```

### Date Handling

```typescript
// shared/utils/dateUtils.ts
import { format, parseISO } from 'date-fns';

export const formatDateKey = (date: Date): string =>
  format(date, 'yyyy-MM-dd');

export const formatDisplay = (dateStr: string): string =>
  format(parseISO(dateStr), 'MMM d, yyyy');

export const TODAY = formatDateKey(new Date());
```

- **Always use date-fns** - Never raw Date methods
- **Store as ISO strings** - `"2025-12-29"` format
- **Display via formatters** - Localized output

---

## Development Workflow Rules

### Git Workflow

- **Main branch**: `main` (production)
- **Feature branches**: `feature/{short-description}`
- **Commits**: Conventional commits preferred
  - `feat:` new feature
  - `fix:` bug fix
  - `refactor:` code refactor
  - `docs:` documentation
  - `style:` formatting only
  - `test:` adding tests

### Deployment

- **Auto-deploy** to GitHub Pages on push to `main`
- **Build command**: `npm run build`
- **Output**: `dist/` folder

### Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# Components install to shared/components/ui/
```

### Adding a New Widget

1. Create directory: `features/widgets/{name}/`
2. Create files: `components/`, `hooks/`, `db.ts`, `schema.ts`, `types.ts`, `index.ts`
3. Define Dexie tables in `db.ts`
4. Implement `Widget` interface in `index.ts`
5. Call `registerWidget()` in `index.ts`
6. Import in `features/widgets/registry.ts` to trigger registration

### Local Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run Vitest
```

---

## Critical Don't-Miss Rules

### Prohibited Patterns

| Pattern | Why It's Wrong | Do This Instead |
|---------|----------------|-----------------|
| `export default` | Inconsistent imports | `export function Name()` |
| `any` type | Type safety lost | `unknown` + type guards |
| `Date` objects in Dexie | Serialization issues | ISO strings `"2025-12-29"` |
| Inline styles | Breaks Tailwind consistency | Tailwind classes |
| Class components | Outdated pattern | Function components |
| `new Date().toISOString()` | Includes time | `format(new Date(), 'yyyy-MM-dd')` |
| Direct IndexedDB | Missing reactivity | Dexie + `useLiveQuery` |

### Widget Architecture Rules

- **Widgets are self-contained** - Never import from another widget
- **Widgets own their data** - Each widget defines its own Dexie tables
- **Widgets expose summaries** - Implement `getSummary(date)` for bottom bar
- **Registration is required** - Call `registerWidget()` or widget won't appear

### State Management Boundaries

| Data Type | Where to Store | Example |
|-----------|----------------|---------|
| Persisted user data | Dexie (IndexedDB) | Habits, mood entries, notes |
| UI layout state | Zustand + persist | Grid positions, collapsed state |
| Ephemeral UI state | React useState | Modal open, form input |
| Derived/computed | useLiveQuery | Filtered lists, aggregations |

### Common Gotchas

1. **Motion import path**: Use `motion/react` not `framer-motion`
2. **Dexie reactivity**: Always use `useLiveQuery`, not raw queries in useEffect
3. **shadcn/ui path**: Components go to `@/shared/components/ui/`
4. **Zod + RHF integration**: Use `zodResolver` from `@hookform/resolvers/zod`
5. **Grid layout types**: Import `Layout` from `react-grid-layout`

### Error Handling Pattern

```typescript
async function saveHabit(habit: Habit) {
  try {
    await db.habits.add(habit);
  } catch (error) {
    console.error('Failed to save habit:', error);
    // Show user-friendly error (toast, etc.)
  }
}
```

### Performance Rules

- **Don't re-render entire grid** - Memoize widget components
- **Limit liveQuery scope** - Query only what you need
- **Lazy load widgets** - Use dynamic imports for widget components

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

---

**Last Updated:** 2025-12-29

