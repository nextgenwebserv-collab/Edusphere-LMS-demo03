import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, BookOpen, Lightbulb, FileText, Brain } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { aiTutorResponses } from '@/lib/mockData';

interface Msg { role: 'user' | 'ai'; text: string }

const suggestions = [
  { icon: Brain, label: 'Explain quadratic equations' },
  { icon: Lightbulb, label: 'Help me solve a physics problem' },
  { icon: FileText, label: 'Summarize my chemistry notes' },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('math') || lower.includes('quadrat') || lower.includes('equation') || lower.includes('algebra')) return aiTutorResponses.math;
  if (lower.includes('physic') || lower.includes('force') || lower.includes('newton')) return aiTutorResponses.physics;
  return aiTutorResponses.default;
}

export function AITutorDrawer() {
  const { aiTutorOpen, setAiTutorOpen } = useStore();
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: "Hi! I'm your AI Tutor. Ask me anything about your subjects — I can explain concepts, solve problems step-by-step, and summarize your notes." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const ask = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'ai', text: getResponse(text) }]);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {aiTutorOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink-950/40 backdrop-blur-sm"
            onClick={() => setAiTutorOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-[91] flex h-full w-full max-w-md flex-col glass-strong shadow-glow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-200/10 p-4">
              <div className="flex items-center gap-3">
                <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 text-white shadow-glow">
                  <Sparkles className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 dark:border-ink-900" />
                </div>
                <div>
                  <p className="font-display font-semibold">AI Tutor</p>
                  <p className="text-xs text-emerald-500">Online · instant responses</p>
                </div>
              </div>
              <button onClick={() => setAiTutorOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'ai' && (
                    <div className="mr-2 mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm ${m.role === 'user' ? 'bg-primary-500 text-white' : 'glass'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="glass flex items-center gap-1 rounded-2xl px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-2 w-2 rounded-full bg-primary-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-400">
                    <BookOpen className="h-3.5 w-3.5" /> Try asking
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.label}
                          onClick={() => ask(s.label)}
                          className="flex items-center gap-1.5 rounded-full border border-ink-200/40 bg-white/30 px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-primary-400/40 hover:text-primary-500 dark:border-ink-700/40 dark:bg-ink-900/30 dark:text-ink-300"
                        >
                          <Icon className="h-3.5 w-3.5" /> {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-ink-200/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && ask(input)}
                placeholder="Ask your AI tutor anything..."
                className="h-11 flex-1 rounded-xl border border-ink-200/40 bg-white/40 px-3.5 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40"
              />
              <button onClick={() => ask(input)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-500 text-white hover:bg-primary-400">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
