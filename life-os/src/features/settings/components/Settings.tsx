import { Link } from 'react-router-dom';

import { ResetLayoutButton } from './ResetLayoutButton';
import { ThemeSelector } from './ThemeSelector';
import { WidgetToggles } from './WidgetToggles';

export function Settings() {
  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-8">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Settings</h1>
      </header>

      <main className="mx-auto max-w-2xl space-y-6">
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Appearance</h2>
          <ThemeSelector />
        </section>

        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Widgets</h2>
              <p className="text-sm text-muted-foreground">
                Enable or disable dashboard widgets
              </p>
            </div>
          </div>
          <WidgetToggles />
          <div className="mt-6 border-t pt-4">
            <ResetLayoutButton />
          </div>
        </section>
      </main>
    </div>
  );
}
