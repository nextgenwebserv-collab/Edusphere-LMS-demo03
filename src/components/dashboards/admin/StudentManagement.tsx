import { useState } from 'react';
import { Search, Plus, Download, Upload, MoreVertical, Pencil, Trash2, Filter } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { students as seedStudents, gradeOptions, batchOptions } from '@/lib/mockData';
import type { Student } from '@/types';
import { cn } from '@/lib/utils';

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(seedStudents);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', grade: gradeOptions[0], batch: batchOptions[0] });

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchBatch = batchFilter === 'all' || s.batch === batchFilter;
    return matchSearch && matchGrade && matchBatch;
  });

  const addStudent = () => {
    if (!form.name.trim()) return;
    const newStudent: Student = {
      id: `s${Date.now()}`,
      name: form.name,
      email: form.email || `${form.name.toLowerCase().replace(/\s/g, '')}@edusphere.io`,
      grade: form.grade,
      batch: form.batch,
      avatar: form.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase(),
      attendance: 100,
      progress: 0,
      feesPaid: false,
      xp: 0,
      rank: students.length + 1,
      streak: 0,
      badges: [],
      enrolledCourses: [],
    };
    setStudents([newStudent, ...students]);
    setAddOpen(false);
    setForm({ name: '', email: '', grade: gradeOptions[0], batch: batchOptions[0] });
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    setMenuId(null);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="h-10 w-full rounded-xl border border-ink-200/40 bg-white/40 pl-10 pr-4 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-ink-400" />
              <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="h-10 rounded-xl border border-ink-200/40 bg-white/40 px-3 text-sm focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40">
                <option value="all">All Grades</option>
                {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <select value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)} className="h-10 rounded-xl border border-ink-200/40 bg-white/40 px-3 text-sm focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40">
                <option value="all">All Batches</option>
                {batchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4" /> Import</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add Student</Button>
          </div>
        </div>
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200/10 text-left text-xs uppercase tracking-wider text-ink-400">
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Grade</th>
                <th className="px-4 py-3 font-semibold">Batch</th>
                <th className="px-4 py-3 font-semibold">Attendance</th>
                <th className="px-4 py-3 font-semibold">Progress</th>
                <th className="px-4 py-3 font-semibold">Fees</th>
                <th className="px-4 py-3 font-semibold">XP</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink-200/5 transition-colors hover:bg-ink-100/30 dark:hover:bg-ink-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{s.name}</p>
                        <p className="truncate text-xs text-ink-400">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{s.grade}</td>
                  <td className="px-4 py-3"><Badge tone="info">{s.batch}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-ink-200/30 dark:bg-ink-800/50">
                        <div className={cn('h-full rounded-full', s.attendance >= 90 ? 'bg-emerald-500' : s.attendance >= 75 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-xs font-medium">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge tone={s.progress >= 75 ? 'success' : s.progress >= 50 ? 'warning' : 'error'}>{s.progress}%</Badge></td>
                  <td className="px-4 py-3"><Badge tone={s.feesPaid ? 'success' : 'error'} dot>{s.feesPaid ? 'Paid' : 'Due'}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs">{s.xp.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button onClick={() => setMenuId(menuId === s.id ? null : s.id)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuId === s.id && (
                        <div className="absolute right-0 top-9 z-10 w-36 rounded-lg glass-strong p-1 shadow-glow-lg">
                          <button className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-sm hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                          <button onClick={() => deleteStudent(s.id)} className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-sm text-red-500 hover:bg-red-500/10"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-ink-400">
            <p>No students found matching your filters.</p>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-ink-200/10 px-4 py-3 text-sm text-ink-400">
          <span>Showing {filtered.length} of {students.length} students</span>
          <div className="flex gap-1">
            <button className="rounded-lg px-3 py-1.5 hover:bg-ink-100/60 dark:hover:bg-ink-800/60" disabled>Prev</button>
            <button className="rounded-lg bg-primary-500/10 px-3 py-1.5 font-medium text-primary-500">1</button>
            <button className="rounded-lg px-3 py-1.5 hover:bg-ink-100/60 dark:hover:bg-ink-800/60">Next</button>
          </div>
        </div>
      </GlassCard>

      {/* Add modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Student" description="Create a student record and assign a batch.">
        <div className="space-y-4">
          <Input label="Full name" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email (optional)" placeholder="jane@edusphere.io" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">Grade</label>
              <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="h-11 w-full rounded-xl border border-ink-200/60 bg-white/50 px-3.5 text-sm focus:outline-none dark:border-ink-700/60 dark:bg-ink-900/40">
                {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-600 dark:text-ink-300">Batch</label>
              <select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className="h-11 w-full rounded-xl border border-ink-200/60 bg-white/50 px-3.5 text-sm focus:outline-none dark:border-ink-700/60 dark:bg-ink-900/40">
                {batchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={addStudent}><Plus className="h-4 w-4" /> Add Student</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
