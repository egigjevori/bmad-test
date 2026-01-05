import { Link } from 'react-router-dom';
import { Settings as SettingsIcon } from 'lucide-react';

import { WidgetGrid } from './WidgetGrid';
import { BottomBar } from '@/features/bottom-bar';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Life OS</h1>
            <p className="text-sm text-muted-foreground">
              Your personal life dashboard
            </p>
          </div>
          <Link
            to="/settings"
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Settings"
          >
            <SettingsIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* Widget Grid */}
      <main className="p-4">
        <WidgetGrid />
      </main>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}
