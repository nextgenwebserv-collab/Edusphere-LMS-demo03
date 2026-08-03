import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
  strong?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, hover = false, strong = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          strong ? 'glass-strong' : 'glass',
          'rounded-2xl shadow-glow-soft',
          hover && 'transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5',
          glow && 'neon-border',
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = 'GlassCard';
