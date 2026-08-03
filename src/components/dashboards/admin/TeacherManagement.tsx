import { useState } from 'react';
import { Search, Plus, Star, Mail, Users } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { teachers as seedTeachers } from '@/lib/mockData';

export function TeacherManagement() {
  const [teachers] = useState(seedTeachers);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachers or subjects..."
            className="h-10 w-full rounded-xl border border-ink-200/40 bg-white/40 pl-10 pr-4 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40"
          />
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add Teacher</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <GlassCard key={t.id} hover className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="lg" online />
                <div>
                  <h3 className="font-display font-semibold">{t.name}</h3>
                  <p className="text-sm text-ink-400">{t.subject}</p>
                  <div className="mt-1 flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-semibold">{t.rating}</span>
                  </div>
                </div>
              </div>
              <Badge tone={t.salaryStatus === 'paid' ? 'success' : 'warning'} dot>
                {t.salaryStatus === 'paid' ? 'Salary Paid' : 'Pending'}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {t.batches.map((b) => (
                <Badge key={b} tone="info">{b}</Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ink-200/10 pt-3 text-sm text-ink-500 dark:text-ink-400">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {t.studentsCount} students</span>
              <button className="flex items-center gap-1.5 text-primary-500 hover:underline"><Mail className="h-4 w-4" /> Message</button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Teacher" description="Onboard a teacher and assign subjects.">
        <div className="space-y-4">
          <Input label="Full name" placeholder="John Smith" />
          <Input label="Email" placeholder="john@edusphere.io" />
          <Input label="Subject" placeholder="Mathematics" />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}><Plus className="h-4 w-4" /> Add Teacher</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
