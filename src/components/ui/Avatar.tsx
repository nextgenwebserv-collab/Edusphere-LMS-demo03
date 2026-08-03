import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  ring?: boolean;
  online?: boolean;
}

const sizeMap = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
};

const gradients = [
  'from-primary-400 to-primary-600',
  'from-accent-400 to-accent-600',
  'from-blue-400 to-blue-600',
  'from-amber-400 to-amber-600',
  'from-pink-400 to-pink-600',
  'from-emerald-400 to-emerald-600',
];

function hashIndex(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % mod;
}

export function Avatar({ name, size = 'md', className, ring, online }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const grad = gradients[hashIndex(name, gradients.length)];
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-sm',
          sizeMap[size],
          grad,
          ring && 'ring-2 ring-white/20 dark:ring-white/10',
        )}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-ink-900',
            online ? 'bg-emerald-400' : 'bg-ink-400',
          )}
        />
      )}
    </div>
  );
}
