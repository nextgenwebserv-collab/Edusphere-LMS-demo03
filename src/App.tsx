import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { LandingPage } from '@/components/landing/LandingPage';
import { AuthModal } from '@/components/auth/AuthModal';
import { DashboardShell } from '@/components/dashboards/DashboardShell';
import { ChatDrawer } from '@/components/shared/ChatDrawer';
import { NotificationDrawer } from '@/components/shared/NotificationDrawer';
import { AITutorDrawer } from '@/components/shared/AITutorDrawer';

function App() {
  const user = useStore((s) => s.user);
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  return (
    <>
      {user ? <DashboardShell /> : <LandingPage />}
      <AuthModal />
      <ChatDrawer />
      <NotificationDrawer />
      <AITutorDrawer />
    </>
  );
}

export default App;
