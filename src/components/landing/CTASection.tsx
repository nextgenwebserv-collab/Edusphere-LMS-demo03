import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useStore } from '@/store/useStore';

export function CTASection() {
  const setAuthOpen = useStore((s) => s.setAuthOpen);
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard glow className="relative overflow-hidden p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="aurora-blob bg-blob-cyan h-60 w-60 -left-10 -top-10 animate-aurora" />
              <div className="aurora-blob bg-blob-emerald h-52 w-52 -right-10 -bottom-10 animate-aurora" style={{ animationDelay: '4s' }} />
            </div>
            <div className="relative">
              <div className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-500">
                <Sparkles className="h-3.5 w-3.5" /> Ready to transform your academy?
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Start your <span className="text-gradient">free trial</span> today
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500 dark:text-ink-400">
                Join 500+ institutions using EduSphere to deliver modern, engaging learning experiences.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" onClick={() => setAuthOpen(true)} className="btn-glow w-full sm:w-auto">
                  Get started free <ArrowRight className="h-4.5 w-4.5" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
