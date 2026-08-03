import { useState } from 'react';
import { Play, Pause, FileText, Download, MessageSquare, CheckCircle2, Lock, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { courses } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const tabs = ['Content', 'Notes', 'Discussion'];

export function CoursePlayer() {
  const [courseIdx, setCourseIdx] = useState(0);
  const [activeLesson, setActiveLesson] = useState('l5');
  const [tab, setTab] = useState('Content');
  const [playing, setPlaying] = useState(false);

  const course = courses[courseIdx];
  const flat = course.chapters.flatMap((ch) => ch.lessons.map((l) => ({ ...l, chapter: ch.title })));
  const current = flat.find((l) => l.id === activeLesson) ?? flat[0];
  const currentIdx = flat.findIndex((l) => l.id === activeLesson);

  const goNext = () => {
    if (currentIdx < flat.length - 1) setActiveLesson(flat[currentIdx + 1].id);
  };
  const goPrev = () => {
    if (currentIdx > 0) setActiveLesson(flat[currentIdx - 1].id);
  };

  return (
    <div className="space-y-5">
      {/* Course selector */}
      <div className="flex flex-wrap gap-2">
        {courses.map((c, i) => (
          <button key={c.id} onClick={() => setCourseIdx(i)} className={cn('rounded-xl border px-3.5 py-2 text-sm font-medium transition-all', courseIdx === i ? 'border-primary-400/60 bg-primary-500/10 text-primary-500' : 'border-ink-200/40 text-ink-500 hover:bg-ink-100/50 dark:border-ink-700/40')}>
            {c.subject}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Player */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="overflow-hidden p-0">
            {/* Video area */}
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-ink-900 to-ink-950">
              <div className="absolute inset-0 grid-bg opacity-20" />
              {current.type === 'video' ? (
                <>
                  <button onClick={() => setPlaying(!playing)} className="relative grid h-16 w-16 place-items-center rounded-full bg-white/10 backdrop-blur transition-transform hover:scale-110">
                    {playing ? <Pause className="h-7 w-7 text-white" /> : <Play className="h-7 w-7 text-white" />}
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2 h-1 rounded-full bg-white/20">
                      <div className="h-full w-1/3 rounded-full bg-primary-400" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>5:32 / {current.duration}</span>
                      <span>HD</span>
                    </div>
                  </div>
                </>
              ) : current.type === 'pdf' ? (
                <div className="text-center text-white/70">
                  <FileText className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-semibold">{current.title}</p>
                  <Button size="sm" variant="outline" className="mt-3 border-white/20 text-white"><Download className="h-4 w-4" /> Download PDF</Button>
                </div>
              ) : (
                <div className="text-center text-white/70">
                  <CheckCircle2 className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-semibold">Quiz: {current.title}</p>
                  <Button size="sm" className="mt-3">Start Quiz</Button>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-400">{current.chapter}</p>
                  <h2 className="font-display text-lg font-semibold">{current.title}</h2>
                </div>
                <Badge tone="primary" className="capitalize">{current.type}</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={goPrev} disabled={currentIdx === 0}><ChevronLeft className="h-4 w-4" /> Prev</Button>
                <Button size="sm" onClick={goNext} disabled={currentIdx === flat.length - 1}>Next <ChevronRight className="h-4 w-4" /></Button>
                <button className="ml-auto grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><Bookmark className="h-4 w-4" /></button>
              </div>
            </div>
          </GlassCard>

          {/* Tabs */}
          <GlassCard className="p-5">
            <div className="mb-4 flex gap-1 rounded-xl bg-ink-100/40 p-1 dark:bg-ink-800/40">
              {tabs.map((t) => (
                <button key={t} onClick={() => setTab(t)} className={cn('flex-1 rounded-lg py-2 text-sm font-medium transition-all', tab === t ? 'bg-white text-primary-500 shadow-sm dark:bg-ink-700' : 'text-ink-500')}>{t}</button>
              ))}
            </div>
            {tab === 'Content' && (
              <div className="prose-sm space-y-3 text-sm text-ink-600 dark:text-ink-300">
                <p>In this lesson, we explore <strong>{current.title}</strong> in depth. This is a {current.duration} {current.type} lesson that builds on the previous chapter.</p>
                <p>Key takeaways:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Understand the core concept and its applications</li>
                  <li>Work through guided examples step by step</li>
                  <li>Practice with the accompanying problem set</li>
                </ul>
                <p>Make sure to complete the practice exercises before moving to the next lesson.</p>
              </div>
            )}
            {tab === 'Notes' && (
              <div className="space-y-3">
                <textarea placeholder="Take notes while you learn..." rows={6} className="w-full rounded-xl border border-ink-200/40 bg-white/40 p-3 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40" />
                <Button size="sm">Save notes</Button>
              </div>
            )}
            {tab === 'Discussion' && (
              <div className="space-y-3">
                {[
                  { name: 'Liam Chen', avatar: 'LC', text: 'Can someone explain the vertex form again?', time: '2h ago' },
                  { name: 'Maya Rao', avatar: 'MR', text: 'It is y = a(x-h)² + k where (h,k) is the vertex.', time: '1h ago' },
                ].map((m, i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar name={m.name} size="sm" />
                    <div className="flex-1 rounded-xl bg-ink-100/40 p-3 dark:bg-ink-800/40">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{m.name}</p>
                        <span className="text-xs text-ink-400">{m.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{m.text}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input placeholder="Add to discussion..." className="h-10 flex-1 rounded-xl border border-ink-200/40 bg-white/40 px-3 text-sm focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40" />
                  <button className="grid h-10 w-10 place-items-center rounded-xl bg-primary-500 text-white"><MessageSquare className="h-4 w-4" /></button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Sidebar: lesson list */}
        <GlassCard className="h-fit p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display font-semibold">Course Content</h3>
            <Badge tone="success">{course.progress}%</Badge>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {course.chapters.map((ch) => (
              <div key={ch.id}>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">{ch.title}</p>
                <div className="space-y-1">
                  {ch.lessons.map((l) => {
                    const Icon = l.type === 'video' ? Play : l.type === 'pdf' ? FileText : CheckCircle2;
                    return (
                      <button
                        key={l.id}
                        onClick={() => setActiveLesson(l.id)}
                        className={cn('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors', activeLesson === l.id ? 'bg-primary-500/10 text-primary-600 dark:text-primary-300' : 'text-ink-600 hover:bg-ink-100/50 dark:text-ink-300 dark:hover:bg-ink-800/50', !l.completed && activeLesson !== l.id && 'opacity-60')}
                      >
                        <Icon className={cn('h-4 w-4 shrink-0', l.completed ? 'text-emerald-500' : 'text-ink-400')} />
                        <span className="min-w-0 flex-1 truncate">{l.title}</span>
                        {!l.completed && activeLesson !== l.id && <Lock className="h-3 w-3 text-ink-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
