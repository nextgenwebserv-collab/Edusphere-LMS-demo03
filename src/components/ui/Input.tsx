import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon: Icon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
          )}
          <input
            ref={ref}
            className={cn(
              'h-11 w-full rounded-xl border border-ink-200/60 bg-white/50 px-3.5 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:border-primary-400/60 focus:outline-none focus:ring-2 focus:ring-primary-400/20 dark:border-ink-700/60 dark:bg-ink-900/40 dark:text-ink-100 dark:placeholder:text-ink-500',
              Icon && 'pl-11',
              error && 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-ink-200/60 bg-white/50 px-3.5 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition-all focus:border-primary-400/60 focus:outline-none focus:ring-2 focus:ring-primary-400/20 dark:border-ink-700/60 dark:bg-ink-900/40 dark:text-ink-100 dark:placeholder:text-ink-500',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
