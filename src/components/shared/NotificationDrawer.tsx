import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, Video, FileText, Wallet, Award, Megaphone } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const typeIcon = {
  class: { icon: Video, color: 'text-primary-500 bg-primary-500/15' },
  assignment: { icon: FileText, color: 'text-blue-500 bg-blue-500/15' },
  fee: { icon: Wallet, color: 'text-amber-500 bg-amber-500/15' },
  badge: { icon: Award, color: 'text-accent-500 bg-accent-500/15' },
  announcement: { icon: Megaphone, color: 'text-secondary-400 bg-secondary-400/15' },
};

export function NotificationDrawer() {
  const { notifOpen, setNotifOpen, notifications, markAllRead } = useStore();

  return (
    <AnimatePresence>
      {notifOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink-950/40 backdrop-blur-sm"
            onClick={() => setNotifOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-[91] flex h-full w-full max-w-sm flex-col glass-strong shadow-glow-lg"
          >
            <div className="flex items-center justify-between border-b border-ink-200/10 p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary-500" />
                <h3 className="font-display text-lg font-semibold">Notifications</h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={markAllRead} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-500 hover:bg-ink-100/60 dark:hover:bg-ink-800/60">
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
                <button onClick={() => setNotifOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {notifications.map((n) => {
                const { icon: Icon, color } = typeIcon[n.type];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      'flex gap-3 rounded-xl p-3 transition-colors',
                      n.read ? 'bg-transparent' : 'bg-primary-500/5',
                    )}
                  >
                    <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg', color)}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{n.title}</p>
                        {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-400" />}
                      </div>
                      <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">{n.body}</p>
                      <p className="mt-1 text-xs text-ink-400">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
