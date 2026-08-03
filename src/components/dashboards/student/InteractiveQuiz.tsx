import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Clock, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight, Sparkles, Award } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { sampleQuiz } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type Phase = 'intro' | 'playing' | 'result';

export function InteractiveQuiz() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);

  const quiz = sampleQuiz;
  const q = quiz.questions[current];

  useEffect(() => {
    if (phase !== 'playing' || showExplanation) return;
    if (timeLeft === 0) { handleAnswer(null); return; }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, showExplanation]);

  const start = () => {
    setPhase('playing');
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(30);
    setShowExplanation(false);
  };

  const handleAnswer = (idx: number | null) => {
    if (showExplanation) return;
    setSelected(idx);
    setAnswers([...answers, idx ?? -1]);
    setShowExplanation(true);
  };

  const next = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(30);
      setShowExplanation(false);
    } else {
      const score = answers.reduce((s, a, i) => s + (a === quiz.questions[i].correctIndex ? 1 : 0), 0);
      if (score >= quiz.questions.length * 0.6) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#22d3ee', '#10b981', '#3b82f6'] });
      }
      setPhase('result');
    }
  };

  const score = answers.reduce((s, a, i) => s + (a === quiz.questions[i].correctIndex ? 1 : 0), 0);
  const scorePct = Math.round((score / quiz.questions.length) * 100);

  if (phase === 'intro') {
    return (
      <div className="space-y-5">
        <GlassCard glow className="relative overflow-hidden p-8 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-blob bg-blob-cyan h-40 w-40 -right-6 -top-6 animate-aurora" />
            <div className="aurora-blob bg-blob-emerald h-32 w-32 -left-4 bottom-0 animate-aurora" style={{ animationDelay: '3s' }} />
          </div>
          <div className="relative">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 text-white shadow-glow">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold">{quiz.title}</h2>
            <p className="mt-1 text-ink-400">{quiz.subject} · {quiz.difficulty} difficulty</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Badge tone="primary">{quiz.questions.length} questions</Badge>
              <Badge tone="warning"><Clock className="h-3 w-3" /> 30s per question</Badge>
              <Badge tone="accent"><Trophy className="h-3 w-3" /> +50 XP reward</Badge>
            </div>
            <Button size="lg" className="mt-6 btn-glow" onClick={start}>Start Quiz</Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="space-y-5">
        <GlassCard glow className="relative overflow-hidden p-8 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className={`aurora-blob ${scorePct >= 60 ? 'bg-blob-emerald' : 'bg-blob-cyan'} h-40 w-40 -right-6 -top-6 animate-aurora`} />
          </div>
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-glow"
            >
              <Trophy className="h-10 w-10" />
            </motion.div>
            <h2 className="mt-4 font-display text-3xl font-bold">{scorePct >= 60 ? 'Great job!' : 'Keep practicing!'}</h2>
            <p className="mt-1 text-ink-400">You scored</p>
            <p className="font-display text-5xl font-bold text-gradient">{score}/{quiz.questions.length}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge tone="success"><Award className="h-3 w-3" /> +{score * 10} XP earned</Badge>
              {scorePct === 100 && <Badge tone="primary"><Sparkles className="h-3 w-3" /> Perfect score!</Badge>}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Review Answers</h3>
          <div className="space-y-3">
            {quiz.questions.map((qq, i) => {
              const correct = answers[i] === qq.correctIndex;
              return (
                <div key={qq.id} className={cn('rounded-xl border p-4', correct ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5')}>
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{i + 1}. {qq.question}</p>
                      <p className="mt-1 text-xs text-ink-500">Correct: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{qq.options[qq.correctIndex]}</span></p>
                      {!correct && answers[i] !== -1 && <p className="text-xs text-ink-500">Your answer: <span className="font-semibold text-red-600 dark:text-red-400">{qq.options[answers[i]]}</span></p>}
                      <p className="mt-1.5 text-xs text-ink-400">{qq.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="mt-4 w-full" onClick={start}><RotateCcw className="h-4 w-4" /> Retake Quiz</Button>
        </GlassCard>
      </div>
    );
  }

  // Playing
  const isLowTime = timeLeft < 11;
  return (
    <div className="space-y-5">
      <GlassCard className="p-6">
        {/* Progress + timer */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Question {current + 1}</span>
            <span className="text-sm text-ink-400">of {quiz.questions.length}</span>
          </div>
          <div className={cn('flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold', isLowTime ? 'bg-red-500/15 text-red-500' : 'bg-primary-500/10 text-primary-500')}>
            <Clock className="h-4 w-4" /> {timeLeft}s
          </div>
        </div>
        {/* Progress bar */}
        <div className="mb-6 h-2 rounded-full bg-ink-200/30 dark:bg-ink-800/50">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-accent-400" animate={{ width: `${((current + (showExplanation ? 1 : 0)) / quiz.questions.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-xl font-semibold">{q.question}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = i === selected;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-medium transition-all',
                      !showExplanation && 'hover:border-primary-400/40 hover:bg-primary-500/5',
                      showExplanation && isCorrect && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                      showExplanation && isSelected && !isCorrect && 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400',
                      !showExplanation && !isSelected && 'border-ink-200/30 dark:border-ink-700/40',
                    )}
                  >
                    <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold', showExplanation && isCorrect ? 'bg-emerald-500 text-white' : showExplanation && isSelected && !isCorrect ? 'bg-red-500 text-white' : 'bg-ink-200/40 text-ink-500 dark:bg-ink-800/60')}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                    {showExplanation && isCorrect && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />}
                    {showExplanation && isSelected && !isCorrect && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-start gap-2 rounded-xl bg-primary-500/5 p-4 text-sm">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <div>
                  <p className="font-semibold">Explanation</p>
                  <p className="mt-0.5 text-ink-500 dark:text-ink-400">{q.explanation}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-end">
          <Button onClick={next} disabled={!showExplanation}>{current < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight className="h-4 w-4" /></Button>
        </div>
      </GlassCard>
    </div>
  );
}
