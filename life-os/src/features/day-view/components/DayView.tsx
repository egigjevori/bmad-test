import { useParams, Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

import { WidgetGrid } from '@/features/dashboard/components/WidgetGrid';
import { BottomBar } from '@/features/bottom-bar';

export function DayView() {
  const { date } = useParams<{ date: string }>();
  const dateStr = date || format(new Date(), 'yyyy-MM-dd');
  const parsedDate = parseISO(dateStr);
  const displayDate = format(parsedDate, 'EEEE, MMMM d, yyyy');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{displayDate}</h1>
            <p className="text-sm text-muted-foreground">Day View</p>
          </div>
        </div>
      </header>

      {/* Widget Grid - same as main dashboard */}
      <main className="p-4">
        <WidgetGrid date={dateStr} />
      </main>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}
