import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const sizeMap = {
  sm: { box: 'h-8 w-8', icon: 'h-4.5 w-4.5', text: 'text-lg' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-xl' },
  lg: { box: 'h-12 w-12', icon: 'h-6 w-6', text: 'text-2xl' },
};

export function Logo({ className, showText = true, size = 'md', onClick }: LogoProps) {
  const { user, logout } = useStore();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    // If logged in, clicking the logo logs out and returns to landing page
    if (user) {
      logout();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn('flex items-center gap-2.5 transition-opacity hover:opacity-90', className)}
      title={user ? 'Back to home' : 'EduSphere home'}
    >
      <div
        className={cn(
          'relative grid place-items-center rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 text-white shadow-glow',
          sizeMap[size].box,
        )}
      >
        <GraduationCap className={sizeMap[size].icon} />
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </div>
      {showText && (
        <span className={cn('font-display font-bold tracking-tight', sizeMap[size].text)}>
          Edu<span className="text-gradient">Sphere</span>
        </span>
      )}
    </button>
  );
}
