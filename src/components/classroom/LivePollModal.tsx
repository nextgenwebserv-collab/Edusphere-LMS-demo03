import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, Check, Users } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface PollOption { id: string; text: string; votes: number }
interface Poll { id: string; question: string; options: PollOption[]; totalVotes: number }

const initialPoll: Poll = {
  id: 'p1',
  question: 'Which topic should we review next?',
  options: [
    { id: 'a', text: 'Quadratic equations', votes: 18 },
    { id: 'b', text: 'Calculus derivatives', votes: 12 },
    { id: 'c', text: 'Linear algebra', votes: 7 },
    { id: 'd', text: 'Trigonometry', votes: 5 },
  ],
  totalVotes: 42,
};

export function LivePollModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [poll, setPoll] = useState<Poll>(initialPoll);
  const [voted, setVoted] = useState<string | null>(null);

  const vote = (optId: string) => {
    if (voted) return;
    setVoted(optId);
    setPoll((p) => ({
      ...p,
      totalVotes: p.totalVotes + 1,
      options: p.options.map((o) => o.id === optId ? { ...o, votes: o.votes + 1 } : o),
    }));
  };

  return (
    <Modal open={open} onClose={onClose} title="Live Poll" description="Real-time student responses" size="md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{poll.question}</h3>
          <Badge tone="success" dot><Users className="h-3 w-3" /> {poll.totalVotes} voted</Badge>
        </div>
        <div className="space-y-2">
          {poll.options.map((o) => {
            const pct = Math.round((o.votes / poll.totalVotes) * 100);
            const isVoted = voted === o.id;
            return (
              <button
                key={o.id}
                onClick={() => vote(o.id)}
                disabled={!!voted}
                className={`relative w-full overflow-hidden rounded-xl border p-3.5 text-left transition-all ${isVoted ? 'border-primary-400/60' : voted ? 'border-ink-200/20' : 'border-ink-200/30 hover:border-primary-400/40'}`}
              >
                <div className="absolute inset-0 bg-primary-500/10 transition-all" style={{ width: `${voted ? pct : 0}%` }} />
                <div className="relative flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {isVoted && <Check className="h-4 w-4 text-primary-500" />}
                    {o.text}
                  </span>
                  {voted && <span className="font-display text-sm font-bold text-primary-500">{pct}%</span>}
                </div>
              </button>
            );
          })}
        </div>
        {voted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl bg-emerald-500/10 p-3 text-center text-sm text-emerald-500">
            Thanks for voting! Results update in real time.
          </motion.div>
        )}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>Close poll</Button>
        </div>
      </div>
    </Modal>
  );
}
