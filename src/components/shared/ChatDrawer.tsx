import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Paperclip, Search, Phone, Video } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { chatMessages as seedMsgs } from '@/lib/mockData';
import type { ChatMessage } from '@/types';
import { useStore } from '@/store/useStore';

const contacts = [
  { name: 'Daniel Cole', role: 'Math Teacher', avatar: 'DC', online: true },
  { name: 'Morning A Batch', role: 'Group · 42', avatar: 'MA', online: true },
  { name: 'Priya Sharma', role: 'Physics Teacher', avatar: 'PS', online: false },
  { name: 'Maya Rao', role: 'Student', avatar: 'MR', online: true },
];

export function ChatDrawer() {
  const { chatOpen, setChatOpen } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>(seedMsgs);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: `m${Date.now()}`, sender: 'You', avatar: 'ME', text: input, time: 'now', self: true }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink-950/40 backdrop-blur-sm"
            onClick={() => setChatOpen(false)}
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
                <Avatar name="Daniel Cole" size="md" online />
                <div>
                  <p className="font-semibold">Daniel Cole</p>
                  <p className="text-xs text-emerald-500">Online · Math Teacher</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><Phone className="h-4 w-4" /></button>
                <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><Video className="h-4 w-4" /></button>
                <button onClick={() => setChatOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><X className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1">
              {/* Contacts list */}
              <div className="hidden w-44 shrink-0 border-r border-ink-200/10 p-2 sm:block">
                <div className="relative mb-2">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
                  <input placeholder="Search" className="h-8 w-full rounded-lg border border-ink-200/40 bg-white/30 pl-8 text-xs focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/30" />
                </div>
                {contacts.map((c) => (
                  <button key={c.name} className="flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-ink-100/50 dark:hover:bg-ink-800/50">
                    <Avatar name={c.name} size="xs" online={c.online} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold">{c.name}</p>
                      <p className="truncate text-[10px] text-ink-400">{c.role}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
                      {!m.self && <Avatar name={m.sender} size="xs" className="mr-2 mt-auto" />}
                      <div className={`max-w-[75%] ${m.self ? 'items-end' : ''}`}>
                        {!m.self && <p className="mb-0.5 text-xs font-medium text-ink-400">{m.sender}</p>}
                        <div className={`rounded-2xl px-3.5 py-2 text-sm ${m.self ? 'bg-primary-500 text-white' : 'glass'}`}>
                          {m.text}
                        </div>
                        <p className={`mt-0.5 text-[10px] text-ink-400 ${m.self ? 'text-right' : ''}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Input */}
                <div className="flex items-center gap-2 border-t border-ink-200/10 p-3">
                  <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><Paperclip className="h-4 w-4" /></button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Type a message..."
                    className="h-10 flex-1 rounded-lg border border-ink-200/40 bg-white/40 px-3 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40"
                  />
                  <button onClick={send} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-500 text-white hover:bg-primary-400">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
