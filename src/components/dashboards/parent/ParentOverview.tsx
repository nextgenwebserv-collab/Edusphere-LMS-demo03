import { TrendingUp, Wallet, Calendar, Award, BookOpen, CheckCircle2, Clock, MessageSquare, Star } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { attendanceTrend, subjectPerformance, feeRecords, calendarEvents, students } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { formatCurrency } from '@/lib/utils';

const remarks = [
  { teacher: 'Daniel Cole', subject: 'Mathematics', text: 'Maya is excelling in algebra. Highly recommend advanced calculus track.', avatar: 'DC', time: '2 days ago' },
  { teacher: 'Priya Sharma', subject: 'Physics', text: 'Great improvement in problem-solving. Keep up the consistent effort!', avatar: 'PS', time: '5 days ago' },
];

export function ParentOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const theme = useStore((s) => s.theme);
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.06)';
  const child = students[0];
  const childFee = feeRecords[0];

  return (
    <div className="space-y-6">
      {/* Child summary */}
      <GlassCard glow className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-blob bg-blob-cyan h-40 w-40 -right-6 -top-6 animate-aurora" />
        </div>
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={child.name} size="xl" online />
            <div>
              <p className="text-sm text-ink-400">Monitoring</p>
              <h2 className="font-display text-2xl font-bold">{child.name}</h2>
              <p className="text-sm text-ink-400">{child.grade} · {child.batch}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="primary"><TrendingUp className="h-3 w-3" /> {child.progress}% progress</Badge>
            <Badge tone="success"><CheckCircle2 className="h-3 w-3" /> {child.attendance}% attendance</Badge>
            <Badge tone={child.feesPaid ? 'success' : 'warning'} dot>{child.feesPaid ? 'Fees paid' : 'Fees due'}</Badge>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Progress" value={`${child.progress}%`} icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard label="Attendance" value={`${child.attendance}%`} icon={<CheckCircle2 className="h-5 w-5" />} accent="success" />
        <StatCard label="Courses" value={child.enrolledCourses.length} icon={<BookOpen className="h-5 w-5" />} accent="accent" />
        <StatCard label="Badges" value={child.badges.length} icon={<Award className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance chart */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#att)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Subject scores */}
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Subject Scores</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={subjectPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="subject" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} width={60} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Bar dataKey="score" fill="#22d3ee" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fee status */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Fee Status</h3>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('fees')}>Details</Button>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-ink-100/30 p-4 dark:bg-ink-800/20">
            <div className="flex items-center gap-3">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${childFee.status === 'paid' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'}`}>
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{formatCurrency(childFee.amount)}</p>
                <p className="text-xs text-ink-400">Due {childFee.dueDate}</p>
              </div>
            </div>
            <Badge tone={childFee.status === 'paid' ? 'success' : 'warning'} dot className="capitalize">{childFee.status}</Badge>
          </div>
        </GlassCard>

        {/* Upcoming exams */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Upcoming Exams</h3>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('calendar')}>Calendar</Button>
          </div>
          <div className="space-y-2">
            {calendarEvents.filter((e) => e.type === 'exam').map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-xl border border-ink-200/10 p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-500"><Calendar className="h-5 w-5" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{e.title}</p>
                  <p className="text-xs text-ink-400">{e.date}{e.time && ` · ${e.time}`}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Teacher remarks */}
      <GlassCard className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Teacher Remarks</h3>
        <div className="space-y-3">
          {remarks.map((r, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-ink-200/10 p-4">
              <Avatar name={r.teacher} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{r.teacher}</p>
                  <span className="text-xs text-ink-400">{r.time}</span>
                </div>
                <p className="text-xs text-ink-400">{r.subject}</p>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{r.text}</p>
                <div className="mt-2 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
