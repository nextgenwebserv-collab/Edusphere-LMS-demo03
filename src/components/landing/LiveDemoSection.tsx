import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Bot, Send, Sparkles, Mic, MicOff, VideoOff, Hand, Users, PenTool } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Tabs } from '@/components/ui/Tabs';

const aiChat = [
  { role: 'user', text: 'Explain the quadratic formula with an example.' },
  { role: 'ai', text: "Sure! The quadratic formula solves ax² + bx + c = 0:\n\nx = (-b ± √(b² - 4ac)) / 2a\n\nExample: x² + 4x + 3 = 0\n• a=1, b=4, c=3\n• Discriminant = 16 - 12 = 4\n• x = (-4 ± 2) / 2\n• x = -1 or x = -3\n\nWant me to generate a practice problem?" },
];

export function LiveDemoSection() {
  const [tab, setTab] = useState('classroom');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [handUp, setHandUp] = useState(false);

  return (
    <section id="live-demo" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="accent" dot className="mx-auto">Live Demo</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            See it in <span className="text-gradient">action</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Experience the virtual classroom and AI tutor — no signup required.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xs">
          <Tabs
            tabs={[
              { id: 'classroom', label: 'Virtual Classroom', icon: Video },
              { id: 'aitutor', label: 'AI Tutor', icon: Bot },
            ]}
            active={tab}
            onChange={setTab}
            className="glass rounded-xl p-1.5"
          />
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <AnimatePresence mode="wait">
            {tab === 'classroom' && (
              <motion.div key="classroom" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <GlassCard className="overflow-hidden p-0">
                  {/* Top bar */}
                  <div className="flex items-center justify-between border-b border-ink-200/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                      <span className="text-sm font-semibold">LIVE · Advanced Mathematics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
                      <Users className="h-4 w-4" /> 42
                    </div>
                  </div>
                  {/* Video grid */}
                  <div className="grid grid-cols-3 gap-2 bg-ink-950/40 p-3 sm:grid-cols-4">
                    {/* Teacher (big) */}
                    <div className="relative col-span-2 row-span-2 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/30 to-accent-500/20 sm:col-span-2">
                      <Avatar name="Daniel Cole" size="xl" />
                      <span className="absolute bottom-2 left-2 rounded-md bg-ink-950/70 px-2 py-0.5 text-xs font-medium text-white">Daniel Cole · Teacher</span>
                      <span className="absolute right-2 top-2 flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
                    </div>
                    {/* Students */}
                    {['Maya Rao', 'Liam Chen', 'Aisha Khan', 'Noah Patel', 'Emma Wilson', 'Ethan Brooks'].map((n, i) => (
                      <div key={n} className="relative flex aspect-video items-center justify-center rounded-lg bg-ink-800/40">
                        <Avatar name={n} size="sm" />
                        <span className="absolute bottom-1 left-1 truncate rounded bg-ink-950/60 px-1.5 py-0.5 text-[10px] text-white">{n.split(' ')[0]}</span>
                        {i === 2 && <MicOff className="absolute right-1 top-1 h-3 w-3 text-red-400" />}
                      </div>
                    ))}
                  </div>
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center justify-center gap-2 border-t border-ink-200/10 p-3">
                    {[
                      { icon: micOn ? Mic : MicOff, active: micOn, onClick: () => setMicOn(!micOn), label: 'Mic' },
                      { icon: camOn ? Video : VideoOff, active: camOn, onClick: () => setCamOn(!camOn), label: 'Cam' },
                      { icon: Hand, active: handUp, onClick: () => setHandUp(!handUp), label: 'Raise' },
                      { icon: PenTool, active: false, onClick: () => {}, label: 'Board' },
                    ].map((c) => {
                      const Icon = c.icon;
                      return (
                        <button
                          key={c.label}
                          onClick={c.onClick}
                          className={`grid h-10 w-10 place-items-center rounded-lg transition-all ${c.active ? 'bg-primary-500/20 text-primary-400' : 'bg-ink-100/60 text-ink-500 hover:bg-ink-200/60 dark:bg-ink-800/60 dark:text-ink-400 dark:hover:bg-ink-700/60'}`}
                        >
                          <Icon className="h-5 w-5" />
                        </button>
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {tab === 'aitutor' && (
              <motion.div key="ai" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <GlassCard className="overflow-hidden p-0">
                  <div className="flex items-center gap-2 border-b border-ink-200/10 px-4 py-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">EduSphere AI Tutor</p>
                      <p className="text-xs text-emerald-500">Online · responds instantly</p>
                    </div>
                  </div>
                  <div className="max-h-80 space-y-4 overflow-y-auto p-4">
                    {aiChat.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'ai' && <Avatar name="AI" size="sm" className="mr-2" />}
                        <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-primary-500 text-white' : 'glass'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 border-t border-ink-200/10 p-3">
                    <input
                      placeholder="Ask anything..."
                      className="h-10 flex-1 rounded-lg border border-ink-200/40 bg-white/40 px-3 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40"
                    />
                    <button className="grid h-10 w-10 place-items-center rounded-lg bg-primary-500 text-white">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
