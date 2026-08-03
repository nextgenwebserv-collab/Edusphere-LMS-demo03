import { Logo } from '@/components/ui/Logo';
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Live Demo', 'Integrations', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Community', 'Status', 'Support'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export function Footer() {
  return (
    <footer className="relative border-t border-ink-200/10 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 max-w-xs text-sm text-ink-500 dark:text-ink-400">
              The modern, AI-powered learning management system for tuition centers, academies, and private institutes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200/40 text-ink-500 transition-colors hover:border-primary-400/40 hover:text-primary-500 dark:border-ink-700/40 dark:text-ink-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-400">{cat}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-ink-600 transition-colors hover:text-primary-500 dark:text-ink-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200/10 pt-6 sm:flex-row">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            &copy; {new Date().getFullYear()} EduSphere LMS. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
