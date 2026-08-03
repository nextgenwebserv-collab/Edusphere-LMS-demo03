import { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, FileText, Calendar as CalIcon, PartyPopper } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { calendarEvents } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const typeMeta = {
  class: { icon: Video, color: 'bg-primary-500/15 text-primary-500', dot: 'bg-primary-500' },
  exam: { icon: FileText, color: 'bg-amber-500/15 text-amber-500', dot: 'bg-amber-500' },
  assignment: { icon: FileText, color: 'bg-blue-500/15 text-blue-500', dot: 'bg-blue-500' },
  holiday: { icon: PartyPopper, color: 'bg-emerald-500/15 text-emerald-500', dot: 'bg-emerald-500' },
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function FullCalendarWidget() {
  const [viewDate, setViewDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-08-03');

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDate = calendarEvents.reduce<Record<string, typeof calendarEvents>>((acc, e) => {
    (acc[e.date] ??= []).push(e);
    return acc;
  }, {});

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] ?? [] : [];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold">Calendar</h2>
        <p className="text-sm text-ink-400">Classes, exams, assignments, and holidays</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Calendar grid */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{monthNames[month]} {year}</h3>
            <div className="flex gap-1">
              <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => setViewDate(new Date(2026, 7, 1))} className="rounded-lg px-3 text-sm font-medium text-primary-500 hover:bg-primary-500/10">Today</button>
              <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((d) => <div key={d} className="py-2 text-center text-xs font-semibold uppercase text-ink-400">{d}</div>)}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={i} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const events = eventsByDate[dateStr] ?? [];
              const isSelected = selectedDate === dateStr;
              const isToday = day === 3 && month === 7 && year === 2026;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    'relative flex min-h-[64px] flex-col items-start rounded-lg border p-1.5 text-left transition-all',
                    isSelected ? 'border-primary-400/60 bg-primary-500/10' : 'border-transparent hover:bg-ink-100/40 dark:hover:bg-ink-800/40',
                    isToday && !isSelected && 'ring-1 ring-primary-400/30',
                  )}
                >
                  <span className={cn('text-xs font-semibold', isToday && 'text-primary-500')}>{day}</span>
                  {events.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-0.5">
                      {events.slice(0, 3).map((e) => (
                        <span key={e.id} className={cn('h-1.5 w-1.5 rounded-full', typeMeta[e.type].dot)} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Day detail */}
        <GlassCard className="p-6">
          <h3 className="mb-1 font-display text-lg font-semibold">
            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
          </h3>
          <p className="mb-4 text-sm text-ink-400">{selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}</p>
          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-ink-400">
              <CalIcon className="h-10 w-10 opacity-40" />
              <p className="mt-2 text-sm">No events scheduled</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map((e) => {
                const meta = typeMeta[e.type];
                const Icon = meta.icon;
                return (
                  <div key={e.id} className="flex items-center gap-3 rounded-xl border border-ink-200/10 p-3">
                    <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg', meta.color)}><Icon className="h-4 w-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{e.title}</p>
                      {e.time && <p className="text-xs text-ink-400">{e.time}</p>}
                    </div>
                    <Badge tone="neutral" className="capitalize">{e.type}</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Legend */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-ink-400">Legend:</span>
          {Object.entries(typeMeta).map(([type, meta]) => (
            <div key={type} className="flex items-center gap-1.5 text-sm">
              <span className={cn('h-2.5 w-2.5 rounded-full', meta.dot)} />
              <span className="capitalize text-ink-500">{type}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
