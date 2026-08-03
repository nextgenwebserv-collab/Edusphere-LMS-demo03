import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

type Accent = 'primary' | 'accent' | 'info' | 'warning' | 'error' | 'success';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; up: boolean };
  accent?: Accent;
  delay?: number;
}

const accentClasses: Record<Accent, string> = {
  primary: 'from-primary-500/20 to-primary-500/0 text-primary-500',
  accent: 'from-accent-500/20 to-accent-500/0 text-accent-500',
  info: 'from-blue-500/20 to-blue-500/0 text-blue-500',
  warning: 'from-amber-500/20 to-amber-500/0 text-amber-500',
  error: 'from-red-500/20 to-red-500/0 text-red-500',
  success: 'from-emerald-500/20 to-emerald-500/0 text-emerald-500',
};

export function StatCard({ label, value, icon, trend, accent = 'primary', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard hover className="group relative overflow-hidden p-5">
        <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl transition-opacity group-hover:opacity-80', accentClasses[accent])} />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-ink-500 dark:text-ink-400">{label}</p>
            <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className={cn('grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br', accentClasses[accent])}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="relative mt-3 flex items-center gap-1.5 text-xs">
            {trend.up ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={trend.up ? 'text-emerald-500' : 'text-red-500'}>{trend.value}</span>
            <span className="text-ink-400">vs last month</span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
