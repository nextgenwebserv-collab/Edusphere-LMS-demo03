import type {
  Student,
  Teacher,
  Course,
  Quiz,
  Notification,
  ChatMessage,
  CalendarEvent,
  FeeRecord,
  Activity,
} from '@/types';

export const students: Student[] = [
  { id: 's1', name: 'Maya Rao', email: 'maya@edusphere.io', grade: 'Grade 11', batch: 'Morning A', avatar: 'MR', attendance: 96, progress: 82, feesPaid: true, xp: 4820, rank: 1, streak: 24, badges: ['Math Wizard', 'Quiz Champion', '7-Day Streak'], enrolledCourses: ['c1', 'c2', 'c3'] },
  { id: 's2', name: 'Liam Chen', email: 'liam@edusphere.io', grade: 'Grade 10', batch: 'Morning A', avatar: 'LC', attendance: 91, progress: 74, feesPaid: true, xp: 3910, rank: 2, streak: 12, badges: ['Science Star'], enrolledCourses: ['c1', 'c2'] },
  { id: 's3', name: 'Aisha Khan', email: 'aisha@edusphere.io', grade: 'Grade 12', batch: 'Evening B', avatar: 'AK', attendance: 88, progress: 90, feesPaid: false, xp: 3650, rank: 3, streak: 8, badges: ['Bookworm', 'Top Scorer'], enrolledCourses: ['c2', 'c3'] },
  { id: 's4', name: 'Noah Patel', email: 'noah@edusphere.io', grade: 'Grade 11', batch: 'Weekend C', avatar: 'NP', attendance: 79, progress: 61, feesPaid: false, xp: 2100, rank: 7, streak: 3, badges: ['Rising Star'], enrolledCourses: ['c1'] },
  { id: 's5', name: 'Emma Wilson', email: 'emma@edusphere.io', grade: 'Grade 10', batch: 'Morning A', avatar: 'EW', attendance: 94, progress: 78, feesPaid: true, xp: 3400, rank: 4, streak: 15, badges: ['Consistent Learner'], enrolledCourses: ['c1', 'c3'] },
  { id: 's6', name: 'Ethan Brooks', email: 'ethan@edusphere.io', grade: 'Grade 12', batch: 'Evening B', avatar: 'EB', attendance: 85, progress: 67, feesPaid: true, xp: 2980, rank: 5, streak: 6, badges: ['Team Player'], enrolledCourses: ['c2'] },
  { id: 's7', name: 'Olivia Diaz', email: 'olivia@edusphere.io', grade: 'Grade 11', batch: 'Weekend C', avatar: 'OD', attendance: 92, progress: 85, feesPaid: true, xp: 3520, rank: 6, streak: 18, badges: ['Math Wizard', 'Quick Thinker'], enrolledCourses: ['c1', 'c2', 'c3'] },
  { id: 's8', name: 'Lucas Park', email: 'lucas@edusphere.io', grade: 'Grade 10', batch: 'Morning A', avatar: 'LP', attendance: 71, progress: 54, feesPaid: false, xp: 1640, rank: 8, streak: 1, badges: [], enrolledCourses: ['c1'] },
];

export const teachers: Teacher[] = [
  { id: 't1', name: 'Daniel Cole', email: 'daniel@edusphere.io', subject: 'Mathematics', batches: ['Morning A', 'Weekend C'], avatar: 'DC', rating: 4.9, studentsCount: 42, salaryStatus: 'paid' },
  { id: 't2', name: 'Priya Sharma', email: 'priya@edusphere.io', subject: 'Physics', batches: ['Evening B'], avatar: 'PS', rating: 4.8, studentsCount: 28, salaryStatus: 'paid' },
  { id: 't3', name: 'Marcus Lee', email: 'marcus@edusphere.io', subject: 'Chemistry', batches: ['Morning A', 'Evening B'], avatar: 'ML', rating: 4.7, studentsCount: 35, salaryStatus: 'pending' },
  { id: 't4', name: 'Hannah Grey', email: 'hannah@edusphere.io', subject: 'Biology', batches: ['Weekend C'], avatar: 'HG', rating: 4.9, studentsCount: 22, salaryStatus: 'paid' },
];

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Mathematics — Algebra & Calculus',
    subject: 'Mathematics',
    teacher: 'Daniel Cole',
    batch: 'Morning A',
    thumbnail: 'math',
    progress: 72,
    studentsEnrolled: 42,
    chapters: [
      {
        id: 'ch1', title: 'Foundations of Algebra',
        lessons: [
          { id: 'l1', title: 'Variables & Expressions', type: 'video', duration: '14 min', completed: true },
          { id: 'l2', title: 'Linear Equations', type: 'video', duration: '18 min', completed: true },
          { id: 'l3', title: 'Algebra Practice Set', type: 'pdf', duration: '6 pages', completed: true },
        ],
      },
      {
        id: 'ch2', title: 'Quadratic Functions',
        lessons: [
          { id: 'l4', title: 'Solving Quadratics', type: 'video', duration: '22 min', completed: true },
          { id: 'l5', title: 'The Quadratic Formula', type: 'video', duration: '16 min', completed: false },
          { id: 'l6', title: 'Quiz: Quadratics', type: 'quiz', duration: '10 min', completed: false },
        ],
      },
      {
        id: 'ch3', title: 'Introduction to Calculus',
        lessons: [
          { id: 'l7', title: 'Limits & Continuity', type: 'video', duration: '25 min', completed: false },
          { id: 'l8', title: 'Derivatives Basics', type: 'video', duration: '28 min', completed: false },
          { id: 'l9', title: 'Calculus Notes', type: 'pdf', duration: '12 pages', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Physics — Mechanics & Thermodynamics',
    subject: 'Physics',
    teacher: 'Priya Sharma',
    batch: 'Evening B',
    thumbnail: 'physics',
    progress: 58,
    studentsEnrolled: 28,
    chapters: [
      {
        id: 'ch1', title: 'Newtonian Mechanics',
        lessons: [
          { id: 'l1', title: "Newton's Three Laws", type: 'video', duration: '20 min', completed: true },
          { id: 'l2', title: 'Friction & Forces', type: 'video', duration: '17 min', completed: true },
          { id: 'l3', title: 'Mechanics Problem Set', type: 'pdf', duration: '8 pages', completed: false },
        ],
      },
      {
        id: 'ch2', title: 'Thermodynamics',
        lessons: [
          { id: 'l4', title: 'Laws of Thermodynamics', type: 'video', duration: '24 min', completed: false },
          { id: 'l5', title: 'Heat Transfer', type: 'video', duration: '19 min', completed: false },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Chemistry — Organic Foundations',
    subject: 'Chemistry',
    teacher: 'Marcus Lee',
    batch: 'Morning A',
    thumbnail: 'chemistry',
    progress: 41,
    studentsEnrolled: 35,
    chapters: [
      {
        id: 'ch1', title: 'Organic Compounds',
        lessons: [
          { id: 'l1', title: 'Hydrocarbons', type: 'video', duration: '15 min', completed: true },
          { id: 'l2', title: 'Functional Groups', type: 'video', duration: '21 min', completed: false },
          { id: 'l3', title: 'Quiz: Organic Basics', type: 'quiz', duration: '8 min', completed: false },
        ],
      },
    ],
  },
];

export const sampleQuiz: Quiz = {
  id: 'q1',
  title: 'Quadratic Functions Quiz',
  subject: 'Mathematics',
  difficulty: 'medium',
  questions: [
    {
      id: 'qq1',
      question: 'What is the discriminant of x² + 4x + 3 = 0?',
      options: ['4', '2', '16', '28'],
      correctIndex: 0,
      explanation: 'Discriminant = b² - 4ac = 16 - 12 = 4. A positive discriminant means two real roots.',
    },
    {
      id: 'qq2',
      question: 'The vertex form of a parabola is:',
      options: ['y = ax² + bx + c', 'y = a(x - h)² + k', 'y = mx + b', 'y = a(x + h)² - k'],
      correctIndex: 1,
      explanation: 'Vertex form is y = a(x - h)² + k, where (h, k) is the vertex of the parabola.',
    },
    {
      id: 'qq3',
      question: 'If the discriminant is negative, the quadratic has:',
      options: ['Two real roots', 'One real root', 'No real roots', 'Infinite roots'],
      correctIndex: 2,
      explanation: 'A negative discriminant means the quadratic has no real roots (two complex conjugate roots).',
    },
    {
      id: 'qq4',
      question: 'The roots of x² - 5x + 6 = 0 are:',
      options: ['1 and 6', '2 and 3', '-2 and -3', '6 and -1'],
      correctIndex: 1,
      explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3.',
    },
    {
      id: 'qq5',
      question: 'The axis of symmetry for y = x² + 6x + 5 is:',
      options: ['x = 3', 'x = -3', 'x = 6', 'x = -6'],
      correctIndex: 1,
      explanation: 'Axis of symmetry: x = -b/(2a) = -6/2 = -3.',
    },
  ],
};

export const notifications: Notification[] = [
  { id: 'n1', title: 'Live class starting soon', body: 'Advanced Mathematics starts in 15 minutes.', type: 'class', time: '5m ago', read: false },
  { id: 'n2', title: 'Assignment graded', body: 'Your Calculus Problem Set received 18/20.', type: 'assignment', time: '1h ago', read: false },
  { id: 'n3', title: 'Fee reminder', body: 'Tuition fee of $120 due in 3 days.', type: 'fee', time: '3h ago', read: false },
  { id: 'n4', title: 'New badge unlocked!', body: 'You earned the "7-Day Streak" badge.', type: 'badge', time: '1d ago', read: true },
  { id: 'n5', title: 'New announcement', body: 'Mid-term exams scheduled for next Friday.', type: 'announcement', time: '2d ago', read: true },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', sender: 'Daniel Cole', avatar: 'DC', text: 'Welcome everyone! Today we cover quadratic functions.', time: '10:01' },
  { id: 'm2', sender: 'Maya Rao', avatar: 'MR', text: 'Got a question about the discriminant formula, sir.', time: '10:04' },
  { id: 'm3', sender: 'Daniel Cole', avatar: 'DC', text: 'Great question — it tells us the nature of the roots.', time: '10:05' },
  { id: 'm4', sender: 'Liam Chen', avatar: 'LC', text: 'Will the quiz include vertex form?', time: '10:07' },
  { id: 'm5', sender: 'Daniel Cole', avatar: 'DC', text: 'Yes, vertex form is in scope for the quiz.', time: '10:08' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Advanced Math — Live', date: '2026-08-03', type: 'class', time: '10:00' },
  { id: 'e2', title: 'Physics Assignment Due', date: '2026-08-05', type: 'assignment' },
  { id: 'e3', title: 'Chemistry Quiz', date: '2026-08-07', type: 'exam', time: '14:00' },
  { id: 'e4', title: 'Mid-term Exam', date: '2026-08-14', type: 'exam', time: '09:00' },
  { id: 'e5', title: 'Founders Day (Holiday)', date: '2026-08-20', type: 'holiday' },
  { id: 'e6', title: 'Physics — Live', date: '2026-08-06', type: 'class', time: '16:00' },
];

export const feeRecords: FeeRecord[] = [
  { id: 'f1', student: 'Maya Rao', amount: 120, status: 'paid', dueDate: '2026-07-15', invoice: 'INV-2026-001' },
  { id: 'f2', student: 'Aisha Khan', amount: 120, status: 'pending', dueDate: '2026-08-10', invoice: 'INV-2026-002' },
  { id: 'f3', student: 'Noah Patel', amount: 90, status: 'overdue', dueDate: '2026-07-01', invoice: 'INV-2026-003' },
  { id: 'f4', student: 'Lucas Park', amount: 90, status: 'overdue', dueDate: '2026-07-01', invoice: 'INV-2026-004' },
  { id: 'f5', student: 'Liam Chen', amount: 120, status: 'paid', dueDate: '2026-07-15', invoice: 'INV-2026-005' },
  { id: 'f6', student: 'Emma Wilson', amount: 120, status: 'paid', dueDate: '2026-07-15', invoice: 'INV-2026-006' },
  { id: 'f7', student: 'Ethan Brooks', amount: 120, status: 'pending', dueDate: '2026-08-10', invoice: 'INV-2026-007' },
];

export const adminActivity: Activity[] = [
  { id: 'a1', actor: 'Maya Rao', action: 'completed quiz', target: 'Quadratic Functions', time: '12m ago', icon: 'check' },
  { id: 'a2', actor: 'Daniel Cole', action: 'started live class', target: 'Morning A Batch', time: '1h ago', icon: 'video' },
  { id: 'a3', actor: 'Aisha Khan', action: 'submitted assignment', target: 'Newtonian Mechanics', time: '2h ago', icon: 'file' },
  { id: 'a4', actor: 'System', action: 'auto-generated invoice', target: 'INV-2026-002', time: '3h ago', icon: 'receipt' },
  { id: 'a5', actor: 'Priya Sharma', action: 'graded submissions', target: 'Physics Batch B', time: '5h ago', icon: 'star' },
];

export const attendanceTrend = [
  { month: 'Feb', value: 88 },
  { month: 'Mar', value: 91 },
  { month: 'Apr', value: 85 },
  { month: 'May', value: 93 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 94 },
  { month: 'Aug', value: 92 },
];

export const revenueData = [
  { month: 'Feb', revenue: 18400, expenses: 9200 },
  { month: 'Mar', revenue: 21200, expenses: 10100 },
  { month: 'Apr', revenue: 19800, expenses: 9800 },
  { month: 'May', revenue: 24600, expenses: 11200 },
  { month: 'Jun', revenue: 27800, expenses: 12100 },
  { month: 'Jul', revenue: 31200, expenses: 13400 },
  { month: 'Aug', revenue: 34800, expenses: 14200 },
];

export const subjectPerformance = [
  { subject: 'Math', score: 82 },
  { subject: 'Physics', score: 76 },
  { subject: 'Chemistry', score: 68 },
  { subject: 'Biology', score: 88 },
];

export const weeklyProgress = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 62 },
  { day: 'Wed', minutes: 38 },
  { day: 'Thu', minutes: 70 },
  { day: 'Fri', minutes: 55 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 30 },
];

export const leaderboard = students
  .slice()
  .sort((a, b) => b.xp - a.xp)
  .map((s, i) => ({ ...s, rank: i + 1 }));

export const testimonials = [
  { name: 'Dr. Priya Nair', role: 'Director, Apex Academy', avatar: 'PN', text: 'EduSphere transformed how our 40+ teachers manage batches. The AI quiz generator alone saves us 10 hours a week.', rating: 5 },
  { name: 'Rajesh Kumar', role: 'Parent', avatar: 'RK', text: "I can finally see my daughter's progress in real time — attendance, grades, and fee status all in one place.", rating: 5 },
  { name: 'Sarah Mitchell', role: 'Student, Grade 12', avatar: 'SM', text: 'The AI tutor explains calculus step-by-step at 11pm before exams. It feels like having a personal coach 24/7.', rating: 5 },
  { name: 'Marcus Lee', role: 'Chemistry Teacher', avatar: 'ML', text: 'Live classes with the interactive whiteboard feel more engaging than any video call tool I have used.', rating: 5 },
];

export const partnerLogos = ['Apex Academy', 'BrightMinds', 'EduPrime', 'Scholars Hub', 'NextGen Tutors', 'BrainWave', 'LearnLink', 'Prime Institute'];

export const courseFees = [
  { courseId: 'c1', courseName: 'Advanced Mathematics', fee: 45, period: 'month', enrolled: 42 },
  { courseId: 'c2', courseName: 'Physics', fee: 40, period: 'month', enrolled: 28 },
  { courseId: 'c3', courseName: 'Chemistry', fee: 38, period: 'month', enrolled: 35 },
  { courseId: 'c4', courseName: 'Biology', fee: 35, period: 'month', enrolled: 22 },
];

export const pricingPlans = [
  {
    name: 'Basic',
    monthly: 29,
    annual: 290,
    tagline: 'For small tuition centers getting started',
    features: ['Up to 50 students', '2 teacher accounts', 'Course management', 'Basic analytics', 'Email support'],
    highlight: false,
  },
  {
    name: 'Pro Academy',
    monthly: 79,
    annual: 790,
    tagline: 'For growing academies that need more power',
    features: ['Up to 500 students', 'Unlimited teachers', 'Live virtual classroom', 'AI Tutor & Quiz Generator', 'Advanced analytics', 'Payment processing', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    monthly: 199,
    annual: 1990,
    tagline: 'For multi-branch institutes at scale',
    features: ['Unlimited students', 'Multi-branch management', 'Custom AI training', 'White-label branding', 'Dedicated account manager', 'SLA & 24/7 support', 'API access'],
    highlight: false,
  },
];

export const aiTutorResponses: Record<string, string> = {
  default: "Great question! Let me break this down step by step.\n\nStep 1: Identify what we know and what we need to find.\nStep 2: Choose the right approach based on the concept involved.\nStep 3: Apply the formula or method carefully.\nStep 4: Verify your answer makes sense in context.\n\nWould you like me to work through a specific example, or shall I generate a practice problem for you?",
  math: "Let's solve this together.\n\nFor a quadratic equation ax² + bx + c = 0:\n1. Identify a, b, and c.\n2. Compute the discriminant: Δ = b² - 4ac.\n3. If Δ > 0: two real roots. If Δ = 0: one repeated root. If Δ < 0: no real roots.\n4. Apply the quadratic formula: x = (-b ± √Δ) / 2a.\n\nTip: Always check your roots by substituting back into the original equation!",
  physics: "Physics problems become easier when you follow a framework:\n\n1. Draw a free-body diagram if forces are involved.\n2. List known variables and the unknown you are solving for.\n3. Pick the right equation (e.g., F = ma, v = u + at).\n4. Solve symbolically first, then plug in numbers.\n5. Check units — they should always work out.\n\nWant me to walk through a specific Newton's law problem?",
};

export const batchOptions = ['Morning A', 'Evening B', 'Weekend C'];
export const gradeOptions = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
