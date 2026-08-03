import { useRef, useEffect, useState, useCallback } from 'react';
import { Pen, Eraser, Square, Circle, Triangle, Trash2, Download, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Tool = 'pen' | 'eraser' | 'rect' | 'circle' | 'triangle';
type Point = { x: number; y: number };

const colors = ['#22d3ee', '#10b981', '#f59e0b', '#ef4444', '#a78bfa', '#f8fafc'];

export function InteractiveWhiteboard({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#22d3ee');
  const [size, setSize] = useState(3);
  const drawing = useRef(false);
  const startPt = useRef<Point>({ x: 0, y: 0 });
  const snapshot = useRef<ImageData | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;
    // High-DPI
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const getPos = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const pushHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((h) => [...h.slice(-20), img]);
  }, []);

  const startDraw = (e: React.PointerEvent) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    pushHistory();
    drawing.current = true;
    startPt.current = getPos(e);
    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(startPt.current.x, startPt.current.y);
    } else {
      const canvas = canvasRef.current!;
      snapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  };

  const draw = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const pos = getPos(e);

    if (tool === 'pen') {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = size * 4;
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else {
      // Shapes: restore snapshot then draw preview
      const canvas = canvasRef.current!;
      if (snapshot.current) ctx.putImageData(snapshot.current, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.globalCompositeOperation = 'source-over';
      const s = startPt.current;
      if (tool === 'rect') {
        ctx.strokeRect(s.x, s.y, pos.x - s.x, pos.y - s.y);
      } else if (tool === 'circle') {
        const r = Math.hypot(pos.x - s.x, pos.y - s.y);
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.lineTo(s.x - (pos.x - s.x), pos.y);
        ctx.closePath();
        ctx.stroke();
      }
    }
  };

  const endDraw = () => {
    drawing.current = false;
    const ctx = ctxRef.current;
    if (ctx) ctx.beginPath();
  };

  const undo = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    setHistory((h) => {
      if (h.length === 0) return h;
      const last = h[h.length - 1];
      ctx.putImageData(last, 0, 0);
      return h.slice(0, -1);
    });
  };

  const clear = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    pushHistory();
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const tools: { id: Tool; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'rect', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'triangle', icon: Triangle, label: 'Triangle' },
  ];

  return (
    <div className={cn('flex flex-col rounded-xl bg-ink-950', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 p-2">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTool(t.id)} title={t.label} className={cn('grid h-8 w-8 place-items-center rounded-lg transition-colors', tool === t.id ? 'bg-primary-500 text-white' : 'text-white/60 hover:bg-white/10')}>
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
        <div className="mx-1 h-5 w-px bg-white/10" />
        {colors.map((c) => (
          <button key={c} onClick={() => setColor(c)} className={cn('h-6 w-6 rounded-full ring-2 transition-all', color === c ? 'ring-white scale-110' : 'ring-transparent')}>
            <span className="block h-full w-full rounded-full" style={{ background: c }} />
          </button>
        ))}
        <div className="mx-1 h-5 w-px bg-white/10" />
        <input type="range" min={1} max={10} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-20 accent-primary-500" />
        <div className="ml-auto flex gap-1">
          <button onClick={undo} title="Undo" className="grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/10"><Undo2 className="h-4 w-4" /></button>
          <button onClick={clear} title="Clear" className="grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/10"><Trash2 className="h-4 w-4" /></button>
          <button onClick={download} title="Download" className="grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/10"><Download className="h-4 w-4" /></button>
        </div>
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
        className="h-full min-h-[300px] w-full cursor-crosshair touch-none rounded-b-xl"
      />
    </div>
  );
}
