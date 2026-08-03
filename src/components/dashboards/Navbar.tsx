import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageSquare, Search, ChevronDown, LogOut, Settings, User as UserIcon, Sparkles, Menu } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Avatar } from '@/components/ui/Avatar';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import type { Role } from '@/types';

const roleLabels: Record<Role, string> = {
  admin: 'Admin Console',
  teacher: 'Teacher Portal',
  student: 'Student Space',
  parent: 'Parent Portal',
};

export function Navbar({ onMobileMenu }: { onMobileMenu: () => void }) {
  const { user, logout, setChatOpen, setNotifOpen, setAiTutorOpen, unreadCount, notifications } = useStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40">
      <div className="glass-strong border-b border-ink-200/10">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-3">
            <button onClick={onMobileMenu} className="grid h-10 w-10 place-items-center rounded-lg text-ink-500 hover:bg-ink-100/60 dark:hover:bg-ink-800/60 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <Logo size="sm" />
            <span className="hidden rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-semibold text-primary-500 sm:inline-block">
              {roleLabels[user.role]}
            </span>
          </div>

          {/* Center: search */}
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              placeholder="Search students, classes, courses..."
              className="h-10 w-full rounded-xl border border-ink-200/40 bg-white/40 pl-10 pr-4 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40"
            />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-ink-200/40 px-1.5 py-0.5 text-[10px] text-ink-400 lg:block">⌘K</kbd>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setAiTutorOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-500/15 to-accent-500/15 px-3 py-2 text-sm font-semibold text-primary-500 transition-all hover:shadow-glow-sm sm:flex"
            >
              <Sparkles className="h-4 w-4" /> AI Tutor
            </button>
            <ThemeToggle />
            <button
              onClick={() => setChatOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-lg text-ink-500 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-400" />
            </button>
            <button
              onClick={() => setNotifOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-lg text-ink-500 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-ink-100/60 dark:hover:bg-ink-800/60"
              >
                <Avatar name={user.name} size="sm" online />
                <ChevronDown className={cn('hidden h-4 w-4 text-ink-400 transition-transform sm:block', profileOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="glass-strong absolute right-0 top-12 w-60 overflow-hidden rounded-xl shadow-glow-lg"
                  >
                    <div className="border-b border-ink-200/10 p-3">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-ink-400">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      {[
                        { icon: UserIcon, label: 'My Profile' },
                        { icon: Settings, label: 'Settings' },
                      ].map((item) => (
                        <button key={item.label} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-600 hover:bg-ink-100/60 dark:text-ink-300 dark:hover:bg-ink-800/60">
                          <item.icon className="h-4 w-4" /> {item.label}
                        </button>
                      ))}
                      <div className="my-1.5 h-px bg-ink-200/10" />
                      <button onClick={logout} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-red-500 hover:bg-red-500/10">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
