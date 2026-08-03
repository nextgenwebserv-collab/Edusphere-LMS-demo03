import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useStore } from '@/store/useStore';
import { AdminOverview } from '@/components/dashboards/admin/AdminOverview';
import { StudentManagement } from '@/components/dashboards/admin/StudentManagement';
import { TeacherManagement } from '@/components/dashboards/admin/TeacherManagement';
import { CourseBatchManagement } from '@/components/dashboards/admin/CourseBatchManagement';
import { FeeManagement } from '@/components/dashboards/admin/FeeManagement';
import { SystemReports } from '@/components/dashboards/admin/SystemReports';
import { TeacherOverview } from '@/components/dashboards/teacher/TeacherOverview';
import { AttendancePage } from '@/components/dashboards/teacher/TakeAttendanceModal';
import { AssignmentManager } from '@/components/dashboards/teacher/AssignmentManager';
import { AIQuizCreator } from '@/components/dashboards/teacher/AIQuizCreator';
import { ContentUploader } from '@/components/dashboards/teacher/ContentUploader';
import { StudentOverview } from '@/components/dashboards/student/StudentOverview';
import { StudentCourses } from '@/components/dashboards/student/StudentCourses';
import { GamificationHub } from '@/components/dashboards/student/GamificationHub';
import { ParentOverview } from '@/components/dashboards/parent/ParentOverview';
import { FullCalendarWidget } from '@/components/shared/FullCalendarWidget';

// Lazy-load heavy components (3D + charts + classroom)
const CoursePlayer = lazy(() => import('@/components/dashboards/student/CoursePlayer').then(m => ({ default: m.CoursePlayer })));
const InteractiveQuiz = lazy(() => import('@/components/dashboards/student/InteractiveQuiz').then(m => ({ default: m.InteractiveQuiz })));
const LiveClassroom = lazy(() => import('@/components/classroom/LiveClassroom').then(m => ({ default: m.LiveClassroom })));

function LoadingFallback() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
    </div>
  );
}

function renderView(role: string, view: string, navigate: (id: string) => void) {
  switch (role) {
    case 'admin':
      switch (view) {
        case 'overview': return <AdminOverview />;
        case 'students': return <StudentManagement />;
        case 'teachers': return <TeacherManagement />;
        case 'courses': return <CourseBatchManagement />;
        case 'fees': return <FeeManagement />;
        case 'reports': return <SystemReports />;
        default: return <AdminOverview />;
      }
    case 'teacher':
      switch (view) {
        case 'overview': return <TeacherOverview onNavigate={navigate} />;
        case 'attendance': return <AttendancePage />;
        case 'assignments': return <AssignmentManager />;
        case 'quiz-creator': return <AIQuizCreator />;
        case 'content': return <ContentUploader />;
        case 'classroom': return <Suspense fallback={<LoadingFallback />}><LiveClassroom /></Suspense>;
        default: return <TeacherOverview onNavigate={navigate} />;
      }
    case 'student':
      switch (view) {
        case 'overview': return <StudentOverview onNavigate={navigate} />;
        case 'courses': return <StudentCourses onOpenCourse={() => navigate('course-player')} />;
        case 'course-player': return <Suspense fallback={<LoadingFallback />}><CoursePlayer /></Suspense>;
        case 'quiz': return <Suspense fallback={<LoadingFallback />}><InteractiveQuiz /></Suspense>;
        case 'gamification': return <GamificationHub />;
        case 'calendar': return <FullCalendarWidget />;
        case 'classroom': return <Suspense fallback={<LoadingFallback />}><LiveClassroom /></Suspense>;
        default: return <StudentOverview onNavigate={navigate} />;
      }
    case 'parent':
      switch (view) {
        case 'overview': return <ParentOverview onNavigate={navigate} />;
        case 'attendance': return <FullCalendarWidget />;
        case 'fees': return <FeeManagement />;
        case 'calendar': return <FullCalendarWidget />;
        case 'messages': return <FullCalendarWidget />;
        default: return <ParentOverview onNavigate={navigate} />;
      }
    default:
      return null;
  }
}

export function DashboardShell() {
  const user = useStore((s) => s.user);
  const [view, setView] = useState('overview');
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!user) return null;

  const navigate = (id: string) => setView(id);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-base))]">
      <Navbar onMobileMenu={() => setMobileMenu(true)} />
      <div className="flex">
        <Sidebar active={view} onNavigate={navigate} mobileOpen={mobileMenu} onCloseMobile={() => setMobileMenu(false)} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${user.role}-${view}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {renderView(user.role, view, navigate)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
