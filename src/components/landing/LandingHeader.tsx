import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Live Demo', href: '#live-demo' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
];

export function LandingHeader() {
  const setAuthOpen = useStore((s) => s.setAuthOpen);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className={cn('mx-auto max-w-7xl px-4 transition-all duration-300 sm:px-6', scrolled && 'pt-2')}>
        <div className={cn('flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6', scrolled ? 'glass-strong shadow-glow-soft' : 'bg-transparent')}>
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100/60 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800/50 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => setAuthOpen(true)}>
              Sign in
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => setAuthOpen(true)}>
              Get started
            </Button>
            <button
              className="grid h-10 w-10 place-items-center rounded-lg border border-ink-200/40 text-ink-600 dark:border-ink-700/50 dark:text-ink-300 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong mt-2 rounded-2xl p-4 shadow-glow-soft md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-100/60 dark:text-ink-300 dark:hover:bg-ink-800/50"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { setAuthOpen(true); setMobileOpen(false); }}>Sign in</Button>
                <Button size="sm" className="flex-1" onClick={() => { setAuthOpen(true); setMobileOpen(false); }}>Get started</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
