import { motion } from 'framer-motion';
import { Trophy, Flame, Award, Star, Zap, Target, Crown, Medal } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { leaderboard } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const allBadges = [
  { id: 'b1', name: 'Math Wizard', icon: Zap, color: 'from-primary-400 to-primary-600', earned: true, desc: 'Score 90%+ in 5 math quizzes' },
  { id: 'b2', name: 'Quiz Champion', icon: Trophy, color: 'from-amber-400 to-amber-600', earned: true, desc: 'Win 10 quizzes' },
  { id: 'b3', name: '7-Day Streak', icon: Flame, color: 'from-orange-400 to-red-500', earned: true, desc: 'Study 7 days in a row' },
  { id: 'b4', name: 'Bookworm', icon: Star, color: 'from-blue-400 to-blue-600', earned: true, desc: 'Complete 3 courses' },
  { id: 'b5', name: 'Top Scorer', icon: Crown, color: 'from-emerald-400 to-emerald-600', earned: true, desc: 'Rank #1 on leaderboard' },
  { id: 'b6', name: 'Science Star', icon: Target, color: 'from-accent-400 to-accent-600', earned: false, desc: 'Score 90%+ in 5 science quizzes' },
  { id: 'b7', name: 'Quick Thinker', icon: Zap, color: 'from-secondary-400 to-secondary-600', earned: true, desc: 'Finish a quiz in under 60s' },
  { id: 'b8', name: 'Rising Star', icon: Medal, color: 'from-pink-400 to-pink-600', earned: false, desc: 'Reach 2000 XP' },
];

const rankIcons = [Crown, Medal, Medal];

export function GamificationHub() {
  const me = leaderboard[0];
  const nextLevel = 5000;
  const levelProgress = Math.round((me.xp / nextLevel) * 100);

  return (
    <div className="space-y-6">
      {/* Hero: level + XP */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard glow className="relative overflow-hidden p-6 lg:col-span-2">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-blob bg-blob-cyan h-40 w-40 -right-6 -top-6 animate-aurora" />
          </div>
          <div className="relative flex flex-col items-center gap-6 sm:flex-row">
            <ProgressRing value={levelProgress} size={140} label={`Level ${Math.floor(me.xp / 1000) + 1}`} sublabel={`${me.xp}/${nextLevel} XP`} />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-display text-2xl font-bold">{me.name}</h2>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge tone="warning"><Flame className="h-3 w-3" /> {me.streak} day streak</Badge>
                <Badge tone="primary"><Trophy className="h-3 w-3" /> Rank #{me.rank}</Badge>
                <Badge tone="accent"><Zap className="h-3 w-3" /> {me.badges.length} badges</Badge>
              </div>
              <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{nextLevel - me.xp} XP until next level — keep learning!</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-3 font-display font-semibold">Daily Goal</h3>
          <div className="flex flex-col items-center">
            <ProgressRing value={75} size={120} label="today" gradient={['#f59e0b', '#ef4444']} />
            <p className="mt-3 text-sm text-ink-400">45 of 60 min studied</p>
            <Badge tone="success" className="mt-2"><Flame className="h-3 w-3" /> On track!</Badge>
          </div>
        </GlassCard>
      </div>

      {/* Leaderboard */}
      <GlassCard className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Leaderboard</h3>
          <Badge tone="primary" dot>This month</Badge>
        </div>
        <div className="space-y-2">
          {leaderboard.map((s, i) => {
            const RankIcon = rankIcons[i] ?? Star;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn('flex items-center gap-4 rounded-xl p-3.5 transition-colors', s.id === me.id ? 'bg-primary-500/10 ring-1 ring-primary-500/20' : 'hover:bg-ink-100/40 dark:hover:bg-ink-800/40')}
              >
                <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold', i === 0 ? 'bg-amber-500/20 text-amber-500' : i === 1 ? 'bg-ink-300/20 text-ink-300' : i === 2 ? 'bg-orange-500/20 text-orange-500' : 'bg-ink-200/20 text-ink-400')}>
                  <RankIcon className="h-5 w-5" />
                </div>
                <Avatar name={s.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{s.name}</p>
                  <p className="text-xs text-ink-400">{s.batch} · {s.streak} day streak</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-primary-500">{s.xp.toLocaleString()}</p>
                  <p className="text-xs text-ink-400">XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Badges */}
      <GlassCard className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Achievements</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allBadges.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className={cn('rounded-2xl border p-4 text-center transition-all', b.earned ? 'border-ink-200/20' : 'border-dashed border-ink-200/20 opacity-50')}
              >
                <div className={cn('mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow-sm', b.earned ? b.color : 'from-ink-400 to-ink-500')}>
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-3 text-sm font-semibold">{b.name}</p>
                <p className="mt-1 text-xs text-ink-400">{b.desc}</p>
                {b.earned ? <Badge tone="success" className="mt-2">Earned</Badge> : <Badge tone="neutral" className="mt-2">Locked</Badge>}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Certificate preview */}
      <GlassCard className="relative overflow-hidden p-8 text-center">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="relative">
          <Award className="mx-auto h-12 w-12 text-amber-500" />
          <h3 className="mt-3 font-display text-xl font-bold">Certificate of Excellence</h3>
          <p className="mt-1 text-ink-400">Awarded to {me.name} for outstanding performance</p>
          <div className="mx-auto mt-4 max-w-md rounded-xl border border-ink-200/20 bg-white/40 p-4 dark:bg-ink-900/40">
            <p className="font-display text-lg font-bold">Advanced Mathematics</p>
            <p className="text-sm text-ink-400">Completed with {me.progress}% progress</p>
          </div>
          <Button className="mt-4" variant="outline"><Award className="h-4 w-4" /> Download Certificate</Button>
        </div>
      </GlassCard>
    </div>
  );
}
