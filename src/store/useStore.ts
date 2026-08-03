import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, User, Notification } from '@/types';
import { notifications as seedNotifications } from '@/lib/mockData';

type Theme = 'dark' | 'light';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;

  authOpen: boolean;
  setAuthOpen: (open: boolean) => void;

  user: User | null;
  login: (role: Role, name?: string, email?: string) => void;
  logout: () => void;

  notifications: Notification[];
  markAllRead: () => void;
  unreadCount: () => number;

  aiTutorOpen: boolean;
  setAiTutorOpen: (open: boolean) => void;

  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;

  notifOpen: boolean;
  setNotifOpen: (open: boolean) => void;
}

const roleDefaults: Record<Role, { name: string; email: string }> = {
  admin: { name: 'Administrator', email: 'admin@edusphere.io' },
  teacher: { name: 'Teacher', email: 'teacher@edusphere.io' },
  student: { name: 'Student', email: 'student@edusphere.io' },
  parent: { name: 'Parent', email: 'parent@edusphere.io' },
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: next });
        applyTheme(next);
      },
      setTheme: (t) => {
        set({ theme: t });
        applyTheme(t);
      },

      authOpen: false,
      setAuthOpen: (authOpen) => set({ authOpen }),

      user: null,
      login: (role, name, email) => {
        const defaults = roleDefaults[role];
        const user: User = {
          id: `u-${role}-${Date.now()}`,
          name: name?.trim() || defaults.name,
          email: email?.trim() || defaults.email,
          role,
          avatar: (name || defaults.name)
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase(),
          ...(role === 'parent' ? { childName: 'Maya Rao', childId: 'u-student' } : {}),
        };
        set({ user, authOpen: false });
      },
      logout: () => set({ user: null }),

      notifications: seedNotifications,
      markAllRead: () =>
        set({
          notifications: get().notifications.map((n) => ({ ...n, read: true })),
        }),
      unreadCount: () => get().notifications.filter((n) => !n.read).length,

      aiTutorOpen: false,
      setAiTutorOpen: (aiTutorOpen) => set({ aiTutorOpen }),

      chatOpen: false,
      setChatOpen: (chatOpen) => set({ chatOpen }),

      notifOpen: false,
      setNotifOpen: (notifOpen) => set({ notifOpen }),
    }),
    {
      name: 'edusphere-store',
      partialize: (s) => ({ theme: s.theme, user: s.user }),
    },
  ),
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

if (typeof window !== 'undefined') {
  const theme = useStore.getState().theme;
  applyTheme(theme);
}
