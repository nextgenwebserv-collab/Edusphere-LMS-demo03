import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Clock, Users, ChevronRight, FileText, HelpCircle, Video, CheckCircle2, Lock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { courses } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const subjectGradients: Record<string, string> = {
  Mathematics: 'from-primary-500/30 via-primary-600/20 to-accent-500/20',
  Physics: 'from-blue-500/30 via-blue-600/20 to-primary-500/20',
  Chemistry: 'from-emerald-500/30 via-emerald-600/20 to-accent-500/20',
};

const lessonIcon = { video: Video, pdf: FileText, quiz: HelpCircle };

export function StudentCourses({ onOpenCourse }: { onOpenCourse?: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCourse = courses.find((c) => c.id === selected);

  if (selectedCourse) {
    const totalLessons = selectedCourse.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
    const completedLessons = selectedCourse.chapters.reduce((s, ch) => s + ch.lessons.filter((l) => l.completed).length, 0);

    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelected(null)} className="text-sm font-medium text-ink-400 hover:text-primary-500">
            All Courses
          </button>
          <ChevronRight className="h-4 w-4 text-ink-400" />
          <span className="text-sm font-semibold">{selectedCourse.title}</span>
        </div>

        <GlassCard className="overflow-hidden p-0">
          {/* Header banner */}
          <div className={cn('relative bg-gradient-to-br p-6', subjectGradients[selectedCourse.subject] || 'from-primary-500/20 to-accent-500/20')}>
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge tone="primary" className="mb-2">{selectedCourse.subject}</Badge>
                <h2 className="font-display text-2xl font-bold">{selectedCourse.title}</h2>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">Taught by {selectedCourse.teacher} · {selectedCourse.batch}</p>
              </div>
              <ProgressRing value={selectedCourse.progress} size={110} label="complete" />
            </div>
          </div>

          {/* Chapters */}
          <div className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Course Content</h3>
              <span className="text-sm text-ink-400">{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="space-y-3">
              {selectedCourse.chapters.map((ch, ci) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.05 }}
                  className="rounded-xl border border-ink-200/10 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold">{ci + 1}. {ch.title}</p>
                    <Badge tone="neutral">{ch.lessons.length} lessons</Badge>
                  </div>
                  <div className="space-y-1">
                    {ch.lessons.map((l) => {
                      const Icon = lessonIcon[l.type];
                      return (
                        <div key={l.id} className={cn('flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm', l.completed ? 'text-ink-600 dark:text-ink-300' : 'text-ink-500')}>
                          <Icon className={cn('h-4 w-4 shrink-0', l.type === 'video' ? 'text-primary-500' : l.type === 'pdf' ? 'text-blue-500' : 'text-amber-500')} />
                          <span className="flex-1">{l.title}</span>
                          <span className="text-xs text-ink-400">{l.duration}</span>
                          {l.completed ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Lock className="h-3 w-3 text-ink-400" />}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
            <Button className="mt-5 w-full" size="lg" onClick={onOpenCourse}>
              <PlayCircle className="h-5 w-5" /> Continue Learning
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold">My Courses</h2>
        <p className="text-sm text-ink-400">Pick up where you left off</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => {
          const totalLessons = c.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
          const completed = c.chapters.reduce((s, ch) => s + ch.lessons.filter((l) => l.completed).length, 0);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard hover className="group h-full cursor-pointer overflow-hidden p-0" onClick={() => setSelected(c.id)}>
                {/* Thumbnail */}
                <div className={cn('relative flex h-32 items-center justify-center bg-gradient-to-br', subjectGradients[c.subject] || 'from-primary-500/20 to-accent-500/20')}>
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <BookOpen className="h-10 w-10 text-white/80" />
                  <div className="absolute right-3 top-3">
                    <Badge tone={c.progress >= 75 ? 'success' : c.progress >= 40 ? 'warning' : 'primary'}>{c.progress}%</Badge>
                  </div>
                </div>
                {/* Body */}
                <div className="p-4">
                  <Badge tone="primary" className="mb-2">{c.subject}</Badge>
                  <h3 className="font-display font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-xs text-ink-400">by {c.teacher}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-ink-400">
                    <span className="flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" /> {completed}/{totalLessons}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.studentsEnrolled}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-ink-200/30 dark:bg-ink-800/50">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-accent-400" style={{ width: `${c.progress}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-ink-400">{c.batch}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary-500 transition-transform group-hover:translate-x-0.5">
                      Continue <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
