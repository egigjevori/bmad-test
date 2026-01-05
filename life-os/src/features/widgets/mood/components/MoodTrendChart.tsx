import { useLiveQuery } from 'dexie-react-hooks';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { getMoodTrend, type MoodTrendPoint } from '../db';
import { MOOD_EMOJIS, type MoodLevel } from '../types';

interface MoodTrendChartProps {
  days?: number;
}

export function MoodTrendChart({ days = 7 }: MoodTrendChartProps) {
  const trendData = useLiveQuery(() => getMoodTrend(days), [days]);

  if (!trendData) {
    return (
      <div className="flex h-24 items-center justify-center">
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const hasData = trendData.some((d) => d.mood !== null);

  if (!hasData) {
    return (
      <div className="flex h-24 items-center justify-center">
        <p className="text-xs text-muted-foreground">
          No mood data yet. Start logging to see trends.
        </p>
      </div>
    );
  }

  // Filter out null values for the chart but keep structure for x-axis
  const chartData = trendData.map((d) => ({
    ...d,
    mood: d.mood ?? undefined,
  }));

  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="dayLabel"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            interval={0}
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            tickFormatter={(value) => MOOD_EMOJIS[value as MoodLevel] || ''}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as MoodTrendPoint;
                if (data.mood === null) return null;
                return (
                  <div className="rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
                    <p className="font-medium">
                      {MOOD_EMOJIS[Math.round(data.mood) as MoodLevel]} {data.mood.toFixed(1)}
                    </p>
                    {data.energy && (
                      <p className="text-muted-foreground">
                        Energy: {data.energy.toFixed(1)}/10
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-primary)' }}
            activeDot={{ r: 5, fill: 'var(--color-primary)' }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
