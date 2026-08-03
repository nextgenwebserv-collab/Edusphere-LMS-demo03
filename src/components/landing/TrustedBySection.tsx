import { partnerLogos } from '@/lib/mockData';

export function TrustedBySection() {
  const logos = [...partnerLogos, ...partnerLogos];
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-ink-400">
          Trusted by 500+ educational institutions worldwide
        </p>
        <div className="relative mt-8 overflow-hidden">
          {/* fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[rgb(var(--bg-base))] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[rgb(var(--bg-base))] to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-12">
            {logos.map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap font-display text-xl font-bold text-ink-400 transition-colors hover:text-ink-600 dark:hover:text-ink-200"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-primary-400 to-accent-400" />
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
