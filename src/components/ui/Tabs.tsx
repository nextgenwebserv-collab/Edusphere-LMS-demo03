import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  children?: ReactNode;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
              isActive
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-ink-500 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-200',
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {tab.label}
            {isActive && (
              <span className="absolute inset-0 -z-10 rounded-lg bg-primary-500/10 ring-1 ring-primary-500/20" />
            )}
          </button>
        );
      })}
    </div>
  );
}
