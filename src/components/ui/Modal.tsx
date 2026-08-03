import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ open, onClose, title, description, children, className, size = 'md' }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={cn(
              'relative w-full overflow-hidden rounded-3xl border border-ink-200/20 bg-white/95 text-ink-900 shadow-2xl dark:border-ink-700/40 dark:bg-ink-900/95 dark:text-ink-50',
              sizeClasses[size],
              className,
            )}
          >
            {title && (
              <div className="flex items-start justify-between gap-4 border-b border-ink-200/10 p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold">{title}</h3>
                  {description && <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100/60 dark:hover:bg-ink-800/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
