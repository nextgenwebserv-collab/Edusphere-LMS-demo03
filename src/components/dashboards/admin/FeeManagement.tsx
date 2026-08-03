import { useState } from 'react';
import { Search, Download, FileText, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Modal } from '@/components/ui/Modal';
import { feeRecords } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import type { FeeRecord } from '@/types';

const statusTone = { paid: 'success', pending: 'warning', overdue: 'error' } as const;

function downloadInvoice(r: FeeRecord) {
  const date = new Date().toLocaleDateString();
  const content = [
    '=====================================',
    '       EDUSPHERE LMS — INVOICE       ',
    '=====================================',
    '',
    `Invoice No:  ${r.invoice}`,
    `Date:        ${date}`,
    `Due Date:    ${r.dueDate}`,
    `Student:     ${r.student}`,
    `Status:      ${r.status.toUpperCase()}`,
    '',
    '-------------------------------------',
    `Amount Due:  ${formatCurrency(r.amount)}`,
    '-------------------------------------',
    '',
    'Description: Tuition Fee — Course Enrollment',
    '',
    'Payment Method: Online (Card / UPI)',
    '',
    '  Thank you for your payment!',
    '',
    'EduSphere LMS',
    'support@edusphere.io',
    '=====================================',
  ].join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${r.invoice}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function FeeManagement() {
  const [records] = useState<FeeRecord[]>(feeRecords);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [invoice, setInvoice] = useState<FeeRecord | null>(null);

  const filtered = records.filter((r) => {
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase()) || r.invoice.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPaid = records.filter((r) => r.status === 'paid').reduce((s, r) => s + r.amount, 0);
  const totalPending = records.filter((r) => r.status === 'pending').reduce((s, r) => s + r.amount, 0);
  const totalOverdue = records.filter((r) => r.status === 'overdue').reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected" value={formatCurrency(totalPaid)} icon={<DollarSign className="h-5 w-5" />} accent="success" />
        <StatCard label="Pending" value={formatCurrency(totalPending)} icon={<Clock className="h-5 w-5" />} accent="warning" />
        <StatCard label="Overdue" value={formatCurrency(totalOverdue)} icon={<AlertCircle className="h-5 w-5" />} accent="error" />
      </div>

      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student or invoice..." className="h-10 w-full rounded-xl border border-ink-200/40 bg-white/40 pl-10 pr-4 text-sm focus:border-primary-400/60 focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-xl border border-ink-200/40 p-1 dark:border-ink-700/40">
              {(['all', 'paid', 'pending', 'overdue'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-all ${filter === f ? 'bg-primary-500 text-white' : 'text-ink-500 hover:bg-ink-100/60 dark:hover:bg-ink-800/60'}`}>{f}</button>
              ))}
            </div>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200/10 text-left text-xs uppercase tracking-wider text-ink-400">
                <th className="px-4 py-3 font-semibold">Invoice</th>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Due Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-ink-200/5 transition-colors hover:bg-ink-100/30 dark:hover:bg-ink-800/30">
                  <td className="px-4 py-3 font-mono text-xs">{r.invoice}</td>
                  <td className="px-4 py-3 font-semibold">{r.student}</td>
                  <td className="px-4 py-3">{formatCurrency(r.amount)}</td>
                  <td className="px-4 py-3 text-ink-500">{r.dueDate}</td>
                  <td className="px-4 py-3"><Badge tone={statusTone[r.status]} dot className="capitalize">{r.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setInvoice(r)} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-500 hover:bg-primary-500/10">
                        <FileText className="h-3.5 w-3.5" /> Invoice
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/60 dark:hover:bg-ink-800/60"><Download className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <Modal open={!!invoice} onClose={() => setInvoice(null)} title="Invoice Receipt" size="sm">
        {invoice && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-400">Invoice number</p>
                  <p className="font-mono font-bold">{invoice.invoice}</p>
                </div>
                <Badge tone={statusTone[invoice.status]} dot className="capitalize">{invoice.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-ink-400">Student</p><p className="font-semibold">{invoice.student}</p></div>
              <div><p className="text-xs text-ink-400">Due date</p><p className="font-semibold">{invoice.dueDate}</p></div>
              <div><p className="text-xs text-ink-400">Amount</p><p className="font-display text-lg font-bold text-primary-500">{formatCurrency(invoice.amount)}</p></div>
              <div><p className="text-xs text-ink-400">Status</p><p className="font-semibold capitalize">{invoice.status}</p></div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-xs text-ink-400">EduSphere LMS · Tuition Fee</p>
              <p className="mt-1 text-xs text-ink-400">Thank you for your payment!</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInvoice(null)}>Close</Button>
              <Button onClick={() => downloadInvoice(invoice)}><Download className="h-4 w-4" /> Download Invoice</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
