import { Sun, Moon, Monitor } from 'lucide-react';

import { cn } from '@/shared/utils/cn';
import { useTheme } from '@/shared/hooks';

type ThemeOption = 'light' | 'system' | 'dark';

interface ThemeOptionConfig {
  value: ThemeOption;
  label: string;
  icon: typeof Sun;
}

const THEME_OPTIONS: ThemeOptionConfig[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Theme</p>
          <p className="text-xs text-muted-foreground">
            Choose how the app looks
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className={cn(
                'flex flex-1 flex-col items-center gap-2 rounded-lg border p-3 transition-all',
                'hover:border-primary/50 hover:bg-accent',
                isSelected
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground'
              )}
              aria-pressed={isSelected}
              aria-label={`Set theme to ${option.label}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
