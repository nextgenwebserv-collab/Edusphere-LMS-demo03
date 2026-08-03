import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { testimonials } from '@/lib/mockData';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="accent" dot className="mx-auto">Testimonials</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Loved by educators, <span className="text-gradient">students & parents</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
            >
              <GlassCard hover className="flex h-full flex-col p-6">
                <Quote className="h-7 w-7 text-primary-400/40" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{t.text}</p>
                <div className="mt-5 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-ink-200/10 pt-4">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
