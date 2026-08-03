import { motion } from 'framer-motion';
import { Check, BookOpen, Users, Clock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { courseFees } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { useStore } from '@/store/useStore';

export function PricingSection() {
  const setAuthOpen = useStore((s) => s.setAuthOpen);

  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="success" dot className="mx-auto">Course Pricing</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Pay per <span className="text-gradient">course</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Simple, transparent monthly fees for each course. No bundled plans — only pay for what you learn.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courseFees.map((c, i) => (
            <motion.div
              key={c.courseId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover className="group h-full p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-500 transition-transform group-hover:scale-110">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{c.courseName}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold">{formatCurrency(c.fee)}</span>
                  <span className="text-sm text-ink-400">/{c.period}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  <li className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> Live classes
                  </li>
                  <li className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> AI tutor access
                  </li>
                  <li className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> Course materials
                  </li>
                  <li className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> Quizzes & certificates
                  </li>
                </ul>
                <div className="mt-4 flex items-center gap-3 border-t border-ink-200/10 pt-4 text-xs text-ink-400">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.enrolled} enrolled</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Monthly</span>
                </div>
                <Button variant="outline" className="mt-5 w-full" onClick={() => setAuthOpen(true)}>
                  Enroll Now
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-400">
          All courses include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}
