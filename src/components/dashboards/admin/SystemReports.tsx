import { TrendingUp, Users, GraduationCap, DollarSign, Download } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, BarChart, Bar,
} from 'recharts';
import { revenueData, attendanceTrend, subjectPerformance } from '@/lib/mockData';
import { useStore } from '@/store/useStore';

export function SystemReports() {
  const theme = useStore((s) => s.theme);
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.06)';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">System Growth Reports</h2>
          <p className="text-sm text-ink-400">Analytics across the entire institution</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export Report</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue (YTD)" value="$248K" icon={<DollarSign className="h-5 w-5" />} trend={{ value: '+18%', up: true }} />
        <StatCard label="New Enrollments" value="156" icon={<Users className="h-5 w-5" />} trend={{ value: '+24%', up: true }} accent="accent" />
        <StatCard label="Course Completion" value="87%" icon={<GraduationCap className="h-5 w-5" />} trend={{ value: '+5%', up: true }} accent="info" />
        <StatCard label="Retention Rate" value="94%" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: '+2%', up: true }} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">Growth Trajectory</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 12, color: '#fff', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#growth)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="flex flex-col items-center p-6">
          <h3 className="self-start font-display text-lg font-semibold">Completion</h3>
          <ProgressRing value={87} size={160} label="overall" gradient={['#10b981', '#22d3ee']} className="mt-4" />
          <div className="mt-4 w-full space-y-2">
            {[{ label: 'Math', val: 82 }, { label: 'Physics', val: 76 }, { label: 'Chemistry', val: 68 }].map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="text-ink-500">{s.label}</span>
                <Badge tone="success">{s.val}%</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart innerRadius="30%" outerRadius="100%" data={subjectPerformance.map((s, i) => ({ ...s, fill: ['#22d3ee', '#10b981', '#3b82f6', '#f59e0b'][i] }))} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="score" cornerRadius={8} background={{ fill: gridColor }} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Bar dataKey="value" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
