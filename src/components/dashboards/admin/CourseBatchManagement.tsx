import { useState } from 'react';
import { Plus, Video, FileText, HelpCircle, BookOpen, Users, ChevronDown, ChevronRight, Pencil } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { courses as seedCourses, batchOptions } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const lessonIcon = { video: Video, pdf: FileText, quiz: HelpCircle };

export function CourseBatchManagement() {
  const [courses] = useState(seedCourses);
  const [expanded, setExpanded] = useState<string | null>(courses[0]?.id ?? null);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Course Builder</h2>
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> New Course</Button>
      </div>

      <div className="space-y-3">
        {courses.map((c) => (
          <GlassCard key={c.id} className="overflow-hidden p-0">
            <button
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              className="flex w-full items-center gap-4 p-4 text-left"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display font-semibold">{c.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-400">
                  <span>{c.teacher}</span>
                  <span>·</span>
                  <Badge tone="info">{c.batch}</Badge>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.studentsEnrolled}</span>
                </div>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <div className="text-right">
                  <p className="text-xs text-ink-400">Progress</p>
                  <p className="font-bold text-primary-500">{c.progress}%</p>
                </div>
              </div>
              {expanded === c.id ? <ChevronDown className="h-5 w-5 text-ink-400" /> : <ChevronRight className="h-5 w-5 text-ink-400" />}
            </button>

            {expanded === c.id && (
              <div className="border-t border-ink-200/10 p-4">
                <div className="space-y-3">
                  {c.chapters.map((ch) => (
                    <div key={ch.id} className="rounded-xl bg-ink-100/30 p-3 dark:bg-ink-800/20">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold">{ch.title}</p>
                        <button className="text-ink-400 hover:text-primary-500"><Pencil className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="space-y-1">
                        {ch.lessons.map((l) => {
                          const Icon = lessonIcon[l.type];
                          return (
                            <div key={l.id} className={cn('flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm', l.completed ? 'text-ink-400' : 'text-ink-600 dark:text-ink-300')}>
                              <Icon className={cn('h-4 w-4', l.type === 'video' ? 'text-primary-500' : l.type === 'pdf' ? 'text-blue-500' : 'text-amber-500')} />
                              <span className="flex-1">{l.title}</span>
                              <span className="text-xs text-ink-400">{l.duration}</span>
                              {l.completed && <span className="text-xs text-emerald-500">✓</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200/40 py-2.5 text-sm text-ink-400 hover:border-primary-400/40 hover:text-primary-500 dark:border-ink-700/40">
                    <Plus className="h-4 w-4" /> Add chapter
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Batch manager */}
      <h2 className="pt-4 font-display text-xl font-semibold">Batch Manager</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {batchOptions.map((b, i) => (
          <GlassCard key={b} hover className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">{b}</h3>
              <Badge tone={i === 0 ? 'primary' : i === 1 ? 'accent' : 'warning'}>{['42', '35', '28'][i]} students</Badge>
            </div>
            <p className="mt-2 text-sm text-ink-400">{['Mon–Fri · 8–10 AM', 'Mon–Fri · 4–6 PM', 'Sat–Sun · 10 AM–12 PM'][i]}</p>
            <div className="mt-3 flex items-center justify-between border-t border-ink-200/10 pt-3 text-sm">
              <span className="text-ink-400">{['3', '2', '2'][i]} courses</span>
              <button className="text-primary-500 hover:underline">Manage</button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Create New Course" description="Build a structured course with chapters and lessons.">
        <div className="space-y-4">
          <Input label="Course title" placeholder="Advanced Mathematics" />
          <Input label="Subject" placeholder="Mathematics" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">Assign to batch</label>
            <select className="h-11 w-full rounded-xl border border-ink-200/60 bg-white/50 px-3.5 text-sm focus:outline-none dark:border-ink-700/60 dark:bg-ink-900/40">
              {batchOptions.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}><Plus className="h-4 w-4" /> Create course</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
