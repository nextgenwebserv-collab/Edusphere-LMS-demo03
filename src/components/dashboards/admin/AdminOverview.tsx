import { Users, GraduationCap, DollarSign, TrendingUp, Award, Bell, Video, FileText } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from 'recharts';
import { revenueData, attendanceTrend, adminActivity, students, teachers } from '@/lib/mockData';
import { useStore } from '@/store/useStore';

const activityIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  check: Award,
  video: Video,
  file: FileText,
  receipt: DollarSign,
  star: Award,
};

export function AdminOverview() {
  const theme = useStore((s) => s.theme);
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.06)';

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={formatNumber(1248)} icon={<Users className="h-5 w-5" />} trend={{ value: '+12.4%', up: true }} delay={0} />
        <StatCard label="Active Teachers" value={48} icon={<GraduationCap className="h-5 w-5" />} trend={{ value: '+3', up: true }} accent="accent" delay={0.1} />
        <StatCard label="Monthly Revenue" value={formatCurrency(34800)} icon={<DollarSign className="h-5 w-5" />} trend={{ value: '+11.5%', up: true }} accent="success" delay={0.2} />
        <StatCard label="Avg Attendance" value="92%" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: '+2.1%', up: true }} accent="info" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Revenue Overview</h3>
              <p className="text-sm text-ink-400">Monthly revenue vs expenses</p>
            </div>
            <Badge tone="success" dot>+11.5% growth</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 12, color: '#fff', fontSize: 12 }}
                formatter={(v) => formatCurrency(Number(v))}
              />
              <Area type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={2.5} fill="url(#rev)" />
              <Area type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} fill="url(#exp)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Attendance donut */}
        <GlassCard className="flex flex-col items-center p-6">
          <h3 className="self-start font-display text-lg font-semibold">Attendance Rate</h3>
          <p className="self-start text-sm text-ink-400">Last 7 months</p>
          <ProgressRing value={92} size={160} label="overall" sublabel="1,148 of 1,248" className="mt-4" />
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={attendanceTrend}>
              <XAxis dataKey="month" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Bottom row: activity + top performers */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity feed */}
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-1">
            {adminActivity.map((a) => {
              const Icon = activityIcon[a.icon] || Bell;
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-ink-100/40 dark:hover:bg-ink-800/40">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-500/10 text-primary-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      <span className="font-semibold">{a.actor}</span> {a.action}{' '}
                      <span className="text-primary-500">{a.target}</span>
                    </p>
                    <p className="text-xs text-ink-400">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Top students */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Top Performers</h3>
            <Badge tone="warning"><Award className="h-3 w-3" /> This month</Badge>
          </div>
          <div className="space-y-2">
            {students.slice().sort((a, b) => b.xp - a.xp).slice(0, 5).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-ink-100/40 dark:hover:bg-ink-800/40">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-500' : i === 1 ? 'bg-ink-300/20 text-ink-300' : i === 2 ? 'bg-orange-500/20 text-orange-500' : 'bg-ink-200/20 text-ink-400'}`}>
                  {i + 1}
                </span>
                <Avatar name={s.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-ink-400">{s.xp.toLocaleString()} XP · {s.grade}</p>
                </div>
                <Badge tone="success">{s.progress}%</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Batch performance bar */}
      <GlassCard className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Batch-wise Performance</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[
            { batch: 'Morning A', students: 42, avg: 84 },
            { batch: 'Evening B', students: 35, avg: 79 },
            { batch: 'Weekend C', students: 28, avg: 71 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="batch" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 12, color: '#fff', fontSize: 12 }} />
            <Bar dataKey="students" fill="#22d3ee" radius={[6, 6, 0, 0]} name="Students" />
            <Bar dataKey="avg" fill="#10b981" radius={[6, 6, 0, 0]} name="Avg Score" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
