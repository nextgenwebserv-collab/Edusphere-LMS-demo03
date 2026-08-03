import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';

// Lazy-load the 3D canvas — it's heavy (Three.js) and not needed on first paint
const HeroCanvas3D = lazy(() => import('@/components/3d/HeroCanvas3D').then(m => ({ default: m.HeroCanvas3D })));

const typingWords = ['Tuition Centers', 'Academies', 'Private Institutes', 'Learning Hubs'];

export function HeroSection() {
  const setAuthOpen = useStore((s) => s.setAuthOpen);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % typingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      {/* Background grid + aurora blobs */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-blob bg-blob-cyan h-96 w-96 -left-20 top-20 animate-aurora" />
        <div className="aurora-blob bg-blob-emerald h-80 w-80 right-0 top-40 animate-aurora" style={{ animationDelay: '3s' }} />
        <div className="aurora-blob bg-blob-blue h-72 w-72 left-1/3 bottom-0 animate-aurora" style={{ animationDelay: '6s' }} />
      </div>
      {/* Radial fade overlay */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade from-transparent via-transparent to-[rgb(var(--bg-base))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-4">
        {/* Left: copy */}
        <div className="z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge tone="primary" dot className="mx-auto lg:mx-0">
              <Sparkles className="h-3 w-3" /> AI-Powered LMS
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            The modern LMS for
            <br className="hidden sm:block" />
            <span className="relative inline-block min-h-[1.1em]">
              {typingWords.map((w, i) => (
                <motion.span
                  key={w}
                  className="text-gradient absolute left-0 top-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: i === wordIdx ? 1 : 0, y: i === wordIdx ? 0 : 10 }}
                  transition={{ duration: 0.4 }}
                >
                  {w}
                </motion.span>
              ))}
              <span className="invisible">{typingWords[0]}</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-400 lg:mx-0"
          >
            Live virtual classrooms, an AI tutor that explains anything step-by-step, gamified learning,
            and powerful analytics — all in one beautifully designed platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button size="lg" onClick={() => setAuthOpen(true)} className="btn-glow w-full sm:w-auto">
              Start free trial <ArrowRight className="h-4.5 w-4.5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Play className="h-4 w-4" /> Watch demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6 lg:justify-start"
          >
            {[
              { icon: Users, label: '12K+ students' },
              { icon: Zap, label: '500+ live classes / day' },
              { icon: Award, label: '98% satisfaction' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400">
                <Icon className="h-4 w-4 text-primary-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]"
        >
          <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" /></div>}>
            <HeroCanvas3D className="absolute inset-0 h-full w-full" />
          </Suspense>
          {/* Floating glass stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="glass absolute left-2 top-6 hidden rounded-2xl p-3 shadow-glow-soft sm:block"
          >
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/15 text-emerald-500">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-ink-500 dark:text-ink-400">Top learner</p>
                <p className="text-sm font-bold">Maya Rao</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="glass absolute bottom-8 right-2 hidden rounded-2xl p-3 shadow-glow-soft sm:block"
          >
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-500/15 text-primary-500">
                <Zap className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-ink-500 dark:text-ink-400">Live class</p>
                <p className="text-sm font-bold">42 attending</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
