export type Role = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  childName?: string;
  childId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  batch: string;
  avatar: string;
  attendance: number;
  progress: number;
  feesPaid: boolean;
  xp: number;
  rank: number;
  streak: number;
  badges: string[];
  enrolledCourses: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  batches: string[];
  avatar: string;
  rating: number;
  studentsCount: number;
  salaryStatus: 'paid' | 'pending';
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  batch: string;
  thumbnail: string;
  chapters: Chapter[];
  progress: number;
  studentsEnrolled: number;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  duration: string;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'class' | 'assignment' | 'fee' | 'announcement' | 'badge';
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  self?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'class' | 'exam' | 'assignment' | 'holiday';
  time?: string;
}

export interface FeeRecord {
  id: string;
  student: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  invoice: string;
}

export interface Activity {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  icon: string;
}
