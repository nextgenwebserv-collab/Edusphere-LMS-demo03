import { Video, FileText, CheckSquare, Clock, Users, Play, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { StatCard } from '@/components/ui/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyProgress, students } from '@/lib/mockData';
import { useStore } from '@/store/useStore';

const todayClasses = [
  { id: '1', subject: 'Advanced Mathematics', batch: 'Morning A', time: '10:00 AM', students: 42, status: 'live' },
  { id: '2', subject: 'Algebra Revision', batch: 'Weekend C', time: '2:00 PM', students: 28, status: 'upcoming' },
  { id: '3', subject: 'Calculus Workshop', batch: 'Morning A', time: '4:00 PM', students: 42, status: 'upcoming' },
];

const pendingReviews = [
  { id: '1', student: 'Maya Rao', assignment: 'Quadratic Problem Set', submitted: '2h ago', avatar: 'MR' },
  { id: '2', student: 'Liam Chen', assignment: 'Algebra Worksheet', submitted: '5h ago', avatar: 'LC' },
  { id: '3', student: 'Aisha Khan', assignment: 'Calculus HW #3', submitted: '1d ago', avatar: 'AK' },
];

export function TeacherOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const theme = useStore((s) => s.theme);
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.06)';

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Classes" value={3} icon={<Video className="h-5 w-5" />} delay={0} />
        <StatCard label="Students" value={42} icon={<Users className="h-5 w-5" />} accent="accent" delay={0.1} />
        <StatCard label="Pending Reviews" value={8} icon={<FileText className="h-5 w-5" />} accent="warning" delay={0.2} />
        <StatCard label="Avg Rating" value="4.9" icon={<CheckSquare className="h-5 w-5" />} accent="success" delay={0.3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Today's Schedule</h3>
            <Button size="sm" onClick={() => onNavigate('classroom')}><Play className="h-4 w-4" /> Start Live Class</Button>
          </div>
          <div className="space-y-3">
            {todayClasses.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-xl border border-ink-200/10 bg-ink-100/20 p-4 transition-colors hover:bg-ink-100/40 dark:bg-ink-800/20 dark:hover:bg-ink-800/40">
                <div className="flex w-16 shrink-0 flex-col items-center">
                  <Clock className="h-4 w-4 text-primary-500" />
                  <span className="mt-1 text-xs font-semibold">{c.time.split(' ')[0]}</span>
                  <span className="text-[10px] text-ink-400">{c.time.split(' ')[1]}</span>
                </div>
                <div className="h-10 w-px bg-ink-200/20" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{c.subject}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-ink-400">
                    <Badge tone="info">{c.batch}</Badge>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.students}</span>
                  </div>
                </div>
                {c.status === 'live' ? (
                  <Button size="sm" variant="danger" onClick={() => onNavigate('classroom')}><span className="flex h-2 w-2 animate-pulse rounded-full bg-white" /> Live Now</Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => onNavigate('classroom')}>Join</Button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick attendance widget */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Quick Attendance</h3>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('attendance')}>Full</Button>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative grid h-32 w-32 place-items-center rounded-full bg-emerald-500/10">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-emerald-500">38</p>
                <p className="text-xs text-ink-400">of 42 present</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-ink-500">Present</span><Badge tone="success">38</Badge></div>
            <div className="flex items-center justify-between"><span className="text-ink-500">Absent</span><Badge tone="error">3</Badge></div>
            <div className="flex items-center justify-between"><span className="text-ink-500">Late</span><Badge tone="warning">1</Badge></div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending reviews */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Pending Assignment Reviews</h3>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('assignments')}>View all</Button>
          </div>
          <div className="space-y-2">
            {pendingReviews.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-ink-100/40 dark:hover:bg-ink-800/40">
                <Avatar name={r.student} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{r.student}</p>
                  <p className="truncate text-xs text-ink-400">{r.assignment}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-400">{r.submitted}</p>
                  <button onClick={() => onNavigate('assignments')} className="text-xs font-medium text-primary-500 hover:underline">Review</button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Weekly engagement */}
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Student Engagement (this week)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="day" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Bar dataKey="minutes" fill="#22d3ee" radius={[6, 6, 0, 0]} name="Active minutes" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Top students strip */}
      <GlassCard className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">My Top Students</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {students.slice().sort((a, b) => b.progress - a.progress).slice(0, 4).map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border border-ink-200/10 p-3">
              <Avatar name={s.name} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-ink-400">{s.progress}% progress</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
