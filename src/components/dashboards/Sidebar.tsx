import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { navConfig } from './navConfig';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ active, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  const { user, logout } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  if (!user) return null;
  const items = navConfig[user.role];

  const content = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn('flex items-center justify-between p-4', collapsed && 'justify-center')}>
        {collapsed ? <Logo showText={false} size="sm" /> : <Logo size="sm" />}
        <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-1.5 text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60 lg:block">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-primary-500/15 to-primary-500/5 text-primary-600 dark:text-primary-300'
                  : 'text-ink-500 hover:bg-ink-100/50 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800/50 dark:hover:text-ink-100',
                collapsed && 'justify-center',
              )}
              title={collapsed ? item.label : undefined}
            >
              {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary-500" />}
              <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-primary-500')} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Upgrade card */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <div className="glass relative overflow-hidden rounded-xl p-3.5">
            <div className="aurora-blob bg-blob-cyan h-20 w-20 -right-4 -top-4" />
            <div className="relative">
              <Badge tone="primary" className="mb-1.5"><span className="text-[10px]">PRO</span></Badge>
              <p className="text-xs font-semibold">Unlock AI Tutor Plus</p>
              <p className="mt-0.5 text-[11px] text-ink-400">Unlimited questions & summaries</p>
              <button className="mt-2 w-full rounded-lg bg-primary-500 py-1.5 text-xs font-semibold text-white hover:bg-primary-400">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User */}
      <div className={cn('border-t border-ink-200/10 p-3', collapsed && 'flex justify-center')}>
        {collapsed ? (
          <Avatar name={user.name} size="sm" />
        ) : (
          <div className="flex items-center gap-2.5">
            <Avatar name={user.name} size="sm" online />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-ink-400">{user.role}</p>
            </div>
            <button onClick={logout} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-red-500/10 hover:text-red-500">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className={cn('sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-ink-200/10 bg-[rgb(var(--bg-elev))]/40 backdrop-blur-xl transition-all duration-300 lg:block', collapsed ? 'w-20' : 'w-64')}>
        {content}
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:hidden"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-64 glass-strong shadow-glow-lg lg:hidden"
            >
              <button onClick={onCloseMobile} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60">
                <X className="h-5 w-5" />
              </button>
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
