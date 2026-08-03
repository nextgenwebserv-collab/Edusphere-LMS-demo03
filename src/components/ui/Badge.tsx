import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary-500/15 text-primary-600 dark:text-primary-300 border-primary-500/20',
  accent: 'bg-accent-500/15 text-accent-600 dark:text-accent-300 border-accent-500/20',
  success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/20',
  error: 'bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/20',
  info: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/20',
  neutral: 'bg-ink-200/60 dark:bg-ink-800/60 text-ink-600 dark:text-ink-300 border-ink-300/30 dark:border-ink-700/40',
};

const dotTone: Record<Tone, string> = {
  primary: 'bg-primary-400',
  accent: 'bg-accent-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-blue-400',
  neutral: 'bg-ink-400',
};

export function Badge({ className, tone = 'neutral', dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotTone[tone])} />}
      {children}
    </span>
  );
}
