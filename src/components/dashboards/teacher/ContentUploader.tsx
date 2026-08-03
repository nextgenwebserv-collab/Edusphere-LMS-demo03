import { useState } from 'react';
import { UploadCloud, FileText, Video, Link as LinkIcon, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface UploadItem { id: string; name: string; type: 'pdf' | 'video' | 'link'; size: string; progress: number }

const existing: UploadItem[] = [
  { id: '1', name: 'Algebra_Foundations.pdf', type: 'pdf', size: '2.4 MB', progress: 100 },
  { id: '2', name: 'Quadratic_Functions_Lecture.mp4', type: 'video', size: '48 MB', progress: 100 },
  { id: '3', name: 'Calculus_Reference_Notes.pdf', type: 'pdf', size: '1.8 MB', progress: 100 },
];

export function ContentUploader() {
  const [items, setItems] = useState<UploadItem[]>(existing);
  const [dragging, setDragging] = useState(false);

  const simulateUpload = (name: string, type: 'pdf' | 'video') => {
    const id = `u${Date.now()}`;
    const newItem: UploadItem = { id, name, type, size: type === 'video' ? '52 MB' : '3.1 MB', progress: 0 };
    setItems((prev) => [newItem, ...prev]);
    const interval = setInterval(() => {
      setItems((prev) => prev.map((it) => it.id === id ? { ...it, progress: Math.min(100, it.progress + 15) } : it));
    }, 200);
    setTimeout(() => clearInterval(interval), 1600);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold">Content Upload</h2>
        <p className="text-sm text-ink-400">Upload PDFs, notes, and video lectures for your courses</p>
      </div>

      {/* Drop zone */}
      <GlassCard
        glow
        className={cn('border-2 border-dashed p-10 text-center transition-colors', dragging ? 'border-primary-400/60 bg-primary-500/5' : 'border-ink-200/30')}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); simulateUpload('Uploaded_File.pdf', 'pdf'); }}
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-500">
          <UploadCloud className="h-8 w-8" />
        </div>
        <p className="mt-4 font-display text-lg font-semibold">Drag & drop files here</p>
        <p className="mt-1 text-sm text-ink-400">PDFs, MP4 videos up to 100MB</p>
        <div className="mt-4 flex justify-center gap-2">
          <Button size="sm" onClick={() => simulateUpload('New_Lecture_Notes.pdf', 'pdf')}><FileText className="h-4 w-4" /> Upload PDF</Button>
          <Button size="sm" variant="outline" onClick={() => simulateUpload('Lecture_Recording.mp4', 'video')}><Video className="h-4 w-4" /> Upload Video</Button>
        </div>
      </GlassCard>

      {/* File list */}
      <GlassCard className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Uploaded Content</h3>
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.type === 'pdf' ? FileText : item.type === 'video' ? Video : LinkIcon;
            return (
              <div key={item.id} className="flex items-center gap-3 rounded-xl border border-ink-200/10 p-3">
                <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-lg', item.type === 'pdf' ? 'bg-blue-500/15 text-blue-500' : 'bg-primary-500/15 text-primary-500')}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-ink-400">{item.size}</p>
                  {item.progress < 100 && (
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-ink-200/30 dark:bg-ink-800/50">
                      <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${item.progress}%` }} />
                    </div>
                  )}
                </div>
                {item.progress === 100 ? (
                  <div className="flex items-center gap-2">
                    <Badge tone="success" dot>Ready</Badge>
                    <button className="text-ink-400 hover:text-red-500"><X className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <Badge tone="primary">{item.progress}%</Badge>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
