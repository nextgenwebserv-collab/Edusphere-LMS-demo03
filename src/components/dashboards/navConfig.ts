import type { Role } from '@/types';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Wallet, BarChart3,
  Video, CheckSquare, FileText, Sparkles, Trophy, Calendar, MessageSquare,
  UserCog,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navConfig: Record<Role, NavItem[]> = {
  admin: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'courses', label: 'Courses & Batches', icon: BookOpen },
    { id: 'fees', label: 'Fee Management', icon: Wallet },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ],
  teacher: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'quiz-creator', label: 'AI Quiz Creator', icon: Sparkles },
    { id: 'content', label: 'Content Upload', icon: BookOpen },
    { id: 'classroom', label: 'Live Classroom', icon: Video },
  ],
  student: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'quiz', label: 'Interactive Quiz', icon: Sparkles },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'classroom', label: 'Live Class', icon: Video },
  ],
  parent: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'fees', label: 'Fee Status', icon: Wallet },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ],
};

export const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
};
