import { useState } from 'react';
import { Sparkles, Plus, Trash2, Wand2, Copy, FileText } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';

interface GenQuestion { question: string; options: string[]; correct: number; explanation: string }

const generatedQuestions: GenQuestion[] = [
  { question: 'What is the derivative of x³?', options: ['3x²', 'x²', '3x', 'x⁴'], correct: 0, explanation: 'Power rule: d/dx(xⁿ) = n·xⁿ⁻¹, so d/dx(x³) = 3x².' },
  { question: 'Evaluate lim(x→0) sin(x)/x', options: ['0', '1', '∞', 'undefined'], correct: 1, explanation: 'This is a fundamental limit: lim(x→0) sin(x)/x = 1.' },
  { question: 'The integral of 2x dx is:', options: ['x² + C', '2x² + C', 'x²/2 + C', '2 + C'], correct: 0, explanation: '∫2x dx = 2·(x²/2) + C = x² + C.' },
  { question: 'If f(x) = e^x, then f\'(x) =', options: ['x·e^(x-1)', 'e^x', '1/x', 'ln(x)'], correct: 1, explanation: 'The derivative of e^x is e^x itself.' },
  { question: 'The slope of y = 4x - 7 at x = 2 is:', options: ['4', '2', '7', '1'], correct: 0, explanation: 'The derivative y\' = 4 is constant for all x.' },
];

export function AIQuizCreator() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<GenQuestion[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setQuestions(generatedQuestions.slice(0, count));
      setGenerating(false);
    }, 1400);
  };

  const copyAll = () => {
    const text = questions.map((q, i) => `Q${i + 1}. ${q.question}\n${q.options.map((o, j) => `  ${String.fromCharCode(65 + j)}) ${o}${j === q.correct ? ' ✓' : ''}`).join('\n')}\nExplanation: ${q.explanation}`).join('\n\n');
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 text-white shadow-glow">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">AI Quiz Generator</h2>
          <p className="text-sm text-ink-400">Generate quizzes instantly from any topic</p>
        </div>
      </div>

      <GlassCard glow className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input label="Topic or concept" icon={Wand2} placeholder="e.g. Quadratic equations, Newton's laws, Organic chemistry..." value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">Difficulty</label>
            <div className="flex gap-1.5">
              {(['easy', 'medium', 'hard'] as const).map((d) => (
                <button key={d} onClick={() => setDifficulty(d)} className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all ${difficulty === d ? 'bg-primary-500 text-white' : 'border border-ink-200/40 text-ink-500 hover:bg-ink-100/50 dark:border-ink-700/40'}`}>{d}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">Number of questions</label>
            <input type="range" min={3} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-primary-500" />
            <p className="text-xs text-ink-400">{count} questions</p>
          </div>
        </div>
        <Button onClick={generate} loading={generating} className="mt-4 w-full" size="lg">
          <Sparkles className="h-4 w-4" /> {generating ? 'Generating quiz...' : 'Generate Quiz'}
        </Button>
      </GlassCard>

      {questions.length > 0 && (
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Generated Quiz</h3>
              <p className="text-sm text-ink-400">{questions.length} questions · {difficulty} difficulty</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyAll}><Copy className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy'}</Button>
              <Button size="sm"><FileText className="h-4 w-4" /> Publish to students</Button>
            </div>
          </div>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="rounded-xl border border-ink-200/10 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold"><span className="text-primary-500">Q{i + 1}.</span> {q.question}</p>
                  <button className="text-ink-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((o, j) => (
                    <div key={j} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${j === q.correct ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-ink-200/20'}`}>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded text-xs font-bold ${j === q.correct ? 'bg-emerald-500 text-white' : 'bg-ink-200/40 text-ink-500'}`}>{String.fromCharCode(65 + j)}</span>
                      <span className={j === q.correct ? 'font-semibold text-emerald-600 dark:text-emerald-400' : ''}>{o}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary-500/5 p-2.5 text-xs text-ink-500 dark:text-ink-400">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-400" />
                  <span><strong>Explanation:</strong> {q.explanation}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
