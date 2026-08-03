import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-glow hover:shadow-glow-lg hover:from-primary-300 hover:to-primary-500',
  secondary:
    'bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-glow-accent hover:brightness-110',
  ghost:
    'text-ink-600 dark:text-ink-300 hover:bg-ink-100/60 dark:hover:bg-ink-800/50',
  outline:
    'border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-200 hover:bg-ink-100/60 dark:hover:bg-ink-800/50',
  danger:
    'bg-gradient-to-br from-red-500 to-red-600 text-white hover:brightness-110',
  success:
    'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:brightness-110',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-5 text-sm rounded-xl gap-2',
  lg: 'h-13 px-7 text-base rounded-xl gap-2.5 py-3.5',
  icon: 'h-10 w-10 rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none select-none',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
