import { Flame, Trophy, Award, BookOpen, Video, Bell, ChevronRight, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Avatar } from '@/components/ui/Avatar';
import { StatCard } from '@/components/ui/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyProgress, courses, notifications, leaderboard, calendarEvents } from '@/lib/mockData';
import { useStore } from '@/store/useStore';

const upcoming = [
  { id: '1', title: 'Advanced Mathematics — Live', time: '10:00 AM', type: 'class' as const, teacher: 'Daniel Cole' },
  { id: '2', title: 'Physics Assignment Due', time: 'Tomorrow', type: 'assignment' as const, teacher: 'Priya Sharma' },
  { id: '3', title: 'Chemistry Quiz', time: 'In 4 days', type: 'exam' as const, teacher: 'Marcus Lee' },
];

export function StudentOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { setAiTutorOpen } = useStore();
  const theme = useStore((s) => s.theme);
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.06)';
  const student = leaderboard[0];

  return (
    <div className="space-y-6">
      {/* Hero greeting card */}
      <GlassCard glow className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-blob bg-blob-cyan h-40 w-40 -right-6 -top-6 animate-aurora" />
          <div className="aurora-blob bg-blob-emerald h-32 w-32 -left-4 bottom-0 animate-aurora" style={{ animationDelay: '3s' }} />
        </div>
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={student.name} size="xl" online />
            <div>
              <p className="text-sm text-ink-400">Welcome back,</p>
              <h2 className="font-display text-2xl font-bold">{student.name}!</h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <Badge tone="warning"><Flame className="h-3 w-3" /> {student.streak} day streak</Badge>
                <Badge tone="primary"><Trophy className="h-3 w-3" /> Rank #{student.rank}</Badge>
                <Badge tone="accent"><Sparkles className="h-3 w-3" /> {student.xp.toLocaleString()} XP</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setAiTutorOpen(true)}><Sparkles className="h-4 w-4" /> Ask AI Tutor</Button>
            <Button variant="outline" onClick={() => onNavigate('classroom')}><Video className="h-4 w-4" /> Join Live Class</Button>
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Courses Enrolled" value={student.enrolledCourses.length} icon={<BookOpen className="h-5 w-5" />} delay={0} />
        <StatCard label="Day Streak" value={student.streak} icon={<Flame className="h-5 w-5" />} accent="warning" delay={0.1} />
        <StatCard label="Badges Earned" value={student.badges.length} icon={<Award className="h-5 w-5" />} accent="accent" delay={0.2} />
        <StatCard label="Attendance" value={`${student.attendance}%`} icon={<TrendingUp className="h-5 w-5" />} accent="success" delay={0.3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress ring + weekly chart */}
        <GlassCard className="flex flex-col items-center p-6">
          <h3 className="self-start font-display text-lg font-semibold">Learning Progress</h3>
          <ProgressRing value={student.progress} size={160} label="completed" sublabel="across all courses" className="mt-4" />
          <div className="mt-4 w-full space-y-1.5">
            {courses.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span className="truncate text-ink-500">{c.subject}</span>
                <span className="font-semibold text-primary-500">{c.progress}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Upcoming</h3>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('calendar')}>Calendar</Button>
          </div>
          <div className="space-y-3">
            {upcoming.map((u) => (
              <div key={u.id} className="flex items-center gap-4 rounded-xl border border-ink-200/10 p-4 transition-colors hover:bg-ink-100/30 dark:hover:bg-ink-800/30">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${u.type === 'class' ? 'bg-primary-500/15 text-primary-500' : u.type === 'exam' ? 'bg-amber-500/15 text-amber-500' : 'bg-blue-500/15 text-blue-500'}`}>
                  {u.type === 'class' ? <Video className="h-5 w-5" /> : u.type === 'exam' ? <Calendar className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{u.title}</p>
                  <p className="text-xs text-ink-400">{u.teacher}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{u.time}</p>
                  {u.type === 'class' && <button onClick={() => onNavigate('classroom')} className="text-xs text-primary-500 hover:underline">Join</button>}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly study time */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">Study Time This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyProgress}>
              <defs>
                <linearGradient id="study" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="day" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} unit="m" />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} formatter={(v) => `${v} min`} />
              <Area type="monotone" dataKey="minutes" stroke="#22d3ee" strokeWidth={2.5} fill="url(#study)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Leaderboard mini */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Leaderboard</h3>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('gamification')}>Full</Button>
          </div>
          <div className="space-y-2">
            {leaderboard.slice(0, 5).map((s, i) => (
              <div key={s.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${s.id === student.id ? 'bg-primary-500/10 ring-1 ring-primary-500/20' : ''}`}>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded text-xs font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-500' : i === 1 ? 'bg-ink-300/20 text-ink-300' : i === 2 ? 'bg-orange-500/20 text-orange-500' : 'bg-ink-200/20 text-ink-400'}`}>{i + 1}</span>
                <Avatar name={s.name} size="xs" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold">{s.name}</span>
                <span className="text-xs font-mono text-ink-400">{s.xp.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent announcements */}
      <GlassCard className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Recent Announcements</h3>
        <div className="space-y-2">
          {notifications.slice(0, 3).map((n) => (
            <div key={n.id} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-ink-100/40 dark:hover:bg-ink-800/40">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-500/10 text-primary-500"><Bell className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{n.title}</p>
                <p className="truncate text-xs text-ink-400">{n.body}</p>
              </div>
              <span className="text-xs text-ink-400">{n.time}</span>
              <ChevronRight className="h-4 w-4 text-ink-400" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
