import { useState } from 'react';
import { Check, X, Clock, Send, CheckCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { students } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type Status = 'present' | 'absent' | 'late' | 'unmarked';

interface Row { id: string; name: string; avatar: string; status: Status }

export function TakeAttendanceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rows, setRows] = useState<Row[]>(
    students.slice(0, 6).map((s) => ({ id: s.id, name: s.name, avatar: s.avatar, status: 'unmarked' as Status })),
  );
  const [sent, setSent] = useState(false);

  const mark = (id: string, status: Status) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
    setSent(false);
  };

  const markAll = (status: Status) => {
    setRows(rows.map((r) => ({ ...r, status })));
    setSent(false);
  };

  const counts = {
    present: rows.filter((r) => r.status === 'present').length,
    absent: rows.filter((r) => r.status === 'absent').length,
    late: rows.filter((r) => r.status === 'late').length,
    unmarked: rows.filter((r) => r.status === 'unmarked').length,
  };

  const save = () => {
    setSent(true);
    setTimeout(() => { onClose(); setSent(false); }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} title="Take Attendance" description="Morning A Batch · Advanced Mathematics" size="lg">
      <div className="space-y-4">
        {/* Summary bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success" dot>{counts.present} Present</Badge>
          <Badge tone="error" dot>{counts.absent} Absent</Badge>
          <Badge tone="warning" dot>{counts.late} Late</Badge>
          <Badge tone="neutral" dot>{counts.unmarked} Unmarked</Badge>
          <div className="ml-auto flex gap-1.5">
            <Button size="sm" variant="outline" onClick={() => markAll('present')}>Mark all present</Button>
          </div>
        </div>

        {/* Roster */}
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-xl border border-ink-200/10 p-3">
              <Avatar name={r.name} size="sm" />
              <span className="flex-1 text-sm font-semibold">{r.name}</span>
              <div className="flex gap-1.5">
                {([
                  { key: 'present', icon: Check, label: 'Present', tone: 'success' as const },
                  { key: 'late', icon: Clock, label: 'Late', tone: 'warning' as const },
                  { key: 'absent', icon: X, label: 'Absent', tone: 'error' as const },
                ] as const).map((opt) => {
                  const Icon = opt.icon;
                  const active = r.status === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => mark(r.id, opt.key)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                        active
                          ? opt.tone === 'success' ? 'bg-emerald-500 text-white' : opt.tone === 'warning' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                          : 'border border-ink-200/40 text-ink-500 hover:bg-ink-100/50 dark:border-ink-700/40 dark:hover:bg-ink-800/50',
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {sent && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-500">
            <CheckCheck className="h-4 w-4" /> Attendance saved and notifications sent to parents.
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} loading={sent}><Send className="h-4 w-4" /> Save & Notify</Button>
        </div>
      </div>
    </Modal>
  );
}

export function AttendancePage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Attendance</h2>
          <p className="text-sm text-ink-400">Mark attendance and notify parents instantly</p>
        </div>
        <Button onClick={() => setOpen(true)}><CheckCheck className="h-4 w-4" /> Take Attendance</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Present Today', value: '38', tone: 'success' as const },
          { label: 'Absent', value: '3', tone: 'error' as const },
          { label: 'Late', value: '1', tone: 'warning' as const },
          { label: 'Rate (Month)', value: '92%', tone: 'primary' as const },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className="font-display text-2xl font-bold"><Badge tone={s.tone}>{s.value}</Badge></p>
            <p className="mt-1 text-xs text-ink-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <TakeAttendanceModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
