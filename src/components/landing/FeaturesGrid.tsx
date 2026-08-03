import { motion } from 'framer-motion';
import { Video, Bot, Trophy, BarChart3, BookOpen, Wallet, Calendar, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

type Tone = 'primary' | 'accent' | 'warning' | 'info' | 'success';

const toneClass: Record<Tone, string> = {
  primary: 'bg-primary-500/15 text-primary-500',
  accent: 'bg-accent-500/15 text-accent-500',
  warning: 'bg-amber-500/15 text-amber-500',
  info: 'bg-blue-500/15 text-blue-500',
  success: 'bg-emerald-500/15 text-emerald-500',
};

const features: { icon: typeof Video; title: string; desc: string; span: string; tone: Tone }[] = [
  { icon: Video, title: 'Live Virtual Classroom', desc: 'Zoom-style HD video calls with interactive whiteboard, screen share, polls, and breakout rooms.', span: 'md:col-span-2', tone: 'primary' },
  { icon: Bot, title: 'AI Tutor Suite', desc: '24/7 AI homework help, step-by-step problem solver, and instant notes summarization.', span: '', tone: 'accent' },
  { icon: Trophy, title: 'Gamification', desc: 'XP, leaderboards, daily streaks, unlockable badges, and certificates.', span: '', tone: 'warning' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'Real-time dashboards for attendance, revenue, performance, and growth metrics.', span: 'md:col-span-2', tone: 'info' },
  { icon: BookOpen, title: 'Course Builder', desc: 'Chapters, lessons, videos, PDFs, and AI-generated quizzes in one builder.', span: '', tone: 'primary' },
  { icon: Wallet, title: 'Payment & Invoicing', desc: 'Stripe-style checkout, automatic invoices, and fee tracking with reminders.', span: '', tone: 'success' },
  { icon: Calendar, title: 'Smart Calendar', desc: 'Interactive timetable for classes, exams, assignments, and holidays.', span: '', tone: 'info' },
  { icon: MessageSquare, title: 'Real-time Chat', desc: 'Direct and group messaging between teachers, students, and admins.', span: '', tone: 'accent' },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="primary" dot className="mx-auto">Features</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to run
            <br />
            a <span className="text-gradient">modern academy</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            From live classes to AI-powered learning, EduSphere replaces a dozen disconnected tools with one cohesive platform.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className={f.span}
              >
                <GlassCard hover className="group h-full p-6">
                  <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${toneClass[f.tone]} transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{f.desc}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
