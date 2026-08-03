import { useState } from 'react';
import { Plus, FileText, Star, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { students } from '@/lib/mockData';

const submissions = [
  { id: '1', student: 'Maya Rao', avatar: 'MR', assignment: 'Quadratic Problem Set', subject: 'Mathematics', submitted: '2h ago', status: 'pending', maxMarks: 20 },
  { id: '2', student: 'Liam Chen', avatar: 'LC', assignment: 'Algebra Worksheet', subject: 'Mathematics', submitted: '5h ago', status: 'pending', maxMarks: 15 },
  { id: '3', student: 'Aisha Khan', avatar: 'AK', assignment: 'Calculus HW #3', subject: 'Mathematics', submitted: '1d ago', status: 'graded', grade: 18, maxMarks: 20 },
  { id: '4', student: 'Emma Wilson', avatar: 'EW', assignment: 'Quadratic Problem Set', subject: 'Mathematics', submitted: '1d ago', status: 'graded', grade: 16, maxMarks: 20 },
];

export function AssignmentManager() {
  const [createOpen, setCreateOpen] = useState(false);
  const [gradeId, setGradeId] = useState<string | null>(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  const grading = submissions.find((s) => s.id === gradeId);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Assignments</h2>
          <p className="text-sm text-ink-400">Create assignments and grade student submissions</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" /> Create Assignment</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {submissions.map((s) => (
          <GlassCard key={s.id} hover className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={s.student} size="md" />
                <div>
                  <p className="font-semibold">{s.student}</p>
                  <p className="text-xs text-ink-400">Submitted {s.submitted}</p>
                </div>
              </div>
              {s.status === 'graded' ? (
                <Badge tone="success" dot>Graded</Badge>
              ) : (
                <Badge tone="warning" dot>Pending</Badge>
              )}
            </div>
            <div className="mt-3 rounded-xl bg-ink-100/30 p-3 dark:bg-ink-800/20">
              <p className="text-sm font-semibold">{s.assignment}</p>
              <p className="text-xs text-ink-400">{s.subject}</p>
            </div>
            {s.status === 'graded' ? (
              <div className="mt-3 flex items-center justify-between border-t border-ink-200/10 pt-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="font-display text-lg font-bold">{s.grade}/{s.maxMarks}</span>
                </div>
                <button className="text-sm text-primary-500 hover:underline">View feedback</button>
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between border-t border-ink-200/10 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-ink-400"><Clock className="h-3.5 w-3.5" /> Awaiting grade</span>
                <Button size="sm" onClick={() => setGradeId(s.id)}>Grade now</Button>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Create modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Assignment" description="Assign work to a batch with a due date.">
        <div className="space-y-4">
          <Input label="Title" placeholder="Quadratic Problem Set" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Subject" placeholder="Mathematics" />
            <Input label="Max marks" placeholder="20" type="number" />
          </div>
          <Input label="Due date" type="date" />
          <Textarea label="Instructions" placeholder="Solve problems 1-10 from chapter 4..." rows={3} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => setCreateOpen(false)}><FileText className="h-4 w-4" /> Publish</Button>
          </div>
        </div>
      </Modal>

      {/* Grade modal */}
      <Modal open={!!gradeId} onClose={() => setGradeId(null)} title="Grade Submission" size="sm">
        {grading && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <p className="font-semibold">{grading.student}</p>
              <p className="text-sm text-ink-400">{grading.assignment}</p>
            </div>
            <Input label={`Marks (out of ${grading.maxMarks})`} type="number" max={grading.maxMarks} placeholder="18" value={marks} onChange={(e) => setMarks(e.target.value)} />
            <Textarea label="Feedback" placeholder="Great work on the discriminant section..." rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setGradeId(null)}>Cancel</Button>
              <Button onClick={() => setGradeId(null)}><CheckCircle2 className="h-4 w-4" /> Submit Grade</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
