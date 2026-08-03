import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Video, VideoOff, Hand, PenTool, ScreenShare,
  MessageSquare, BarChart3, Users, Grid3x3, Send, MoreVertical,
  PhoneOff, Volume2, Sparkles, ExternalLink, Video as VideoIcon,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { InteractiveWhiteboard } from './InteractiveWhiteboard';
import { LivePollModal } from './LivePollModal';
import { ClassroomCanvas3D } from '@/components/3d/ClassroomCanvas3D';
import { cn } from '@/lib/utils';

// Google Meet room URL — teachers/students join the same room
const MEET_URL = 'https://meet.google.com/edusphere-live-classroom';

const participants = [
  { id: 't', name: 'Daniel Cole', role: 'Teacher', avatar: 'DC', speaking: true, mic: true, cam: true, hand: false },
  { id: 's1', name: 'Maya Rao', role: 'Student', avatar: 'MR', speaking: false, mic: true, cam: true, hand: true },
  { id: 's2', name: 'Liam Chen', role: 'Student', avatar: 'LC', speaking: false, mic: false, cam: true, hand: false },
  { id: 's3', name: 'Aisha Khan', role: 'Student', avatar: 'AK', speaking: false, mic: false, cam: false, hand: false },
  { id: 's4', name: 'Emma Wilson', role: 'Student', avatar: 'EW', speaking: false, mic: true, cam: true, hand: false },
  { id: 's5', name: 'Noah Patel', role: 'Student', avatar: 'NP', speaking: false, mic: false, cam: false, hand: false },
  { id: 's6', name: 'Ethan Brooks', role: 'Student', avatar: 'EB', speaking: false, mic: true, cam: false, hand: false },
  { id: 's7', name: 'Olivia Diaz', role: 'Student', avatar: 'OD', speaking: false, mic: false, cam: true, hand: false },
  { id: 's8', name: 'Lucas Park', role: 'Student', avatar: 'LP', speaking: false, mic: false, cam: false, hand: false },
];

const chatMsgs = [
  { id: '1', sender: 'Daniel Cole', avatar: 'DC', text: 'Welcome everyone! Today we cover quadratic functions.', time: '10:01' },
  { id: '2', sender: 'Maya Rao', avatar: 'MR', text: 'I have a question about the discriminant.', time: '10:04' },
  { id: '3', sender: 'Liam Chen', avatar: 'LC', text: 'Will vertex form be on the quiz?', time: '10:07' },
  { id: '4', sender: 'Daniel Cole', avatar: 'DC', text: 'Yes, vertex form is included. Great question!', time: '10:08' },
];

type Panel = 'participants' | 'chat' | 'polls' | null;
type View = 'video' | 'whiteboard' | '3d';

export function LiveClassroom() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [hand, setHand] = useState(false);
  const [panel, setPanel] = useState<Panel>('chat');
  const [view, setView] = useState<View>('video');
  const [pollOpen, setPollOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [chat, setChat] = useState(chatMsgs);
  const [chatInput, setChatInput] = useState('');
  const [meetJoined, setMeetJoined] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const joinMeet = () => {
    window.open(MEET_URL, '_blank', 'noopener,noreferrer');
    setMeetJoined(true);
    setView('video');
  };

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [chat]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChat([...chat, { id: `c${Date.now()}`, sender: 'You', avatar: 'ME', text: chatInput, time: 'now' }]);
    setChatInput('');
  };

  const handRaises = participants.filter((p) => p.hand).length;

  if (!meetJoined) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <div>
              <h2 className="font-display text-lg font-semibold">Advanced Mathematics — Live Class</h2>
              <p className="text-xs text-ink-400">Morning A Batch · Ready to join</p>
            </div>
          </div>
          <Badge tone="primary"><Users className="h-3 w-3" /> {participants.length} invited</Badge>
        </div>

        <GlassCard glow className="relative overflow-hidden p-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-blob bg-blob-cyan h-48 w-48 -right-8 -top-8 animate-aurora" />
            <div className="aurora-blob bg-blob-emerald h-40 w-40 -left-6 bottom-0 animate-aurora" style={{ animationDelay: '3s' }} />
          </div>
          <div className="relative flex flex-col items-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 text-white shadow-glow">
              <VideoIcon className="h-10 w-10" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">Ready to join the live class?</h3>
            <p className="mt-2 max-w-md text-ink-500 dark:text-ink-400">
              Click the button below to open Google Meet and join the classroom. Make sure your camera and microphone are enabled.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Badge tone={mic ? 'success' : 'error'} dot>{mic ? 'Mic on' : 'Mic off'}</Badge>
              <Badge tone={cam ? 'success' : 'error'} dot>{cam ? 'Camera on' : 'Camera off'}</Badge>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="btn-glow" onClick={joinMeet}>
                <VideoIcon className="h-5 w-5" /> Join Google Meet
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setMeetJoined(true)}>
                Enter Classroom Workspace
              </Button>
            </div>
            <p className="mt-4 text-xs text-ink-400">
              Google Meet will open in a new tab. The classroom workspace below stays available for whiteboard, chat, and polls.
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <div>
            <h2 className="font-display text-lg font-semibold">Advanced Mathematics — Live</h2>
            <p className="text-xs text-ink-400">Morning A Batch · {formatTime(elapsed)} elapsed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="error" dot>REC</Badge>
          <Badge tone="primary"><Users className="h-3 w-3" /> {participants.length}</Badge>
          {handRaises > 0 && <Badge tone="warning"><Hand className="h-3 w-3" /> {handRaises}</Badge>}
          <Button size="sm" variant="outline" onClick={joinMeet}><VideoIcon className="h-4 w-4" /> <span className="hidden sm:inline">Open Meet</span><ExternalLink className="h-3.5 w-3.5" /></Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Main stage */}
        <div className="lg:col-span-3 space-y-3">
          <GlassCard className="overflow-hidden p-0">
            {/* View switcher */}
            <div className="flex items-center justify-between border-b border-ink-200/10 p-2">
              <div className="flex gap-1">
                {([
                  { id: 'video' as View, icon: Grid3x3, label: 'Video' },
                  { id: 'whiteboard' as View, icon: PenTool, label: 'Whiteboard' },
                  { id: '3d' as View, icon: Sparkles, label: '3D Scene' },
                ]).map((v) => {
                  const Icon = v.icon;
                  return (
                    <button key={v.id} onClick={() => setView(v.id)} className={cn('flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all', view === v.id ? 'bg-primary-500/10 text-primary-500' : 'text-ink-400 hover:bg-ink-100/50 dark:hover:bg-ink-800/50')}>
                      <Icon className="h-4 w-4" /> <span className="hidden sm:inline">{v.label}</span>
                    </button>
                  );
                })}
              </div>
              <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-ink-100/50 dark:hover:bg-ink-800/50"><MoreVertical className="h-4 w-4" /></button>
            </div>

            <AnimatePresence mode="wait">
              {view === 'video' && (
                <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-ink-950/60 p-3">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {participants.map((p) => (
                      <div key={p.id} className={cn('relative flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-ink-800/60 to-ink-900/60 ring-1', p.speaking ? 'ring-emerald-400/60' : 'ring-white/5')}>
                        {p.cam ? (
                          <Avatar name={p.name} size="md" />
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Avatar name={p.name} size="sm" />
                          </div>
                        )}
                        <span className="absolute bottom-1.5 left-1.5 truncate rounded bg-ink-950/70 px-1.5 py-0.5 text-[10px] font-medium text-white">{p.name.split(' ')[0]}</span>
                        <div className="absolute right-1.5 top-1.5 flex gap-1">
                          {!p.mic && <MicOff className="h-3 w-3 text-red-400" />}
                          {p.hand && <Hand className="h-3 w-3 text-amber-400" />}
                        </div>
                        {p.speaking && <Volume2 className="absolute right-1.5 bottom-1.5 h-3 w-3 text-emerald-400" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {view === 'whiteboard' && (
                <motion.div key="wb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <InteractiveWhiteboard className="h-[400px]" />
                </motion.div>
              )}

              {view === '3d' && (
                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[400px]">
                  <ClassroomCanvas3D className="h-full w-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          {/* Control bar */}
          <GlassCard className="p-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => setMic(!mic)} className={cn('grid h-11 w-11 place-items-center rounded-xl transition-all', mic ? 'bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300' : 'bg-red-500 text-white')}><Mic className="h-5 w-5" /></button>
              <button onClick={() => setCam(!cam)} className={cn('grid h-11 w-11 place-items-center rounded-xl transition-all', cam ? 'bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300' : 'bg-red-500 text-white')}><Video className="h-5 w-5" /></button>
              <button onClick={() => setHand(!hand)} className={cn('grid h-11 w-11 place-items-center rounded-xl transition-all', hand ? 'bg-amber-500 text-white' : 'bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300')}><Hand className="h-5 w-5" /></button>
              <div className="mx-1 h-8 w-px bg-ink-200/20" />
              <button className="grid h-11 w-11 place-items-center rounded-xl bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300"><ScreenShare className="h-5 w-5" /></button>
              <button onClick={() => setView('whiteboard')} className="grid h-11 w-11 place-items-center rounded-xl bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300"><PenTool className="h-5 w-5" /></button>
              <button onClick={() => setPollOpen(true)} className="grid h-11 w-11 place-items-center rounded-xl bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300"><BarChart3 className="h-5 w-5" /></button>
              <button onClick={() => setPanel(panel === 'chat' ? null : 'chat')} className={cn('grid h-11 w-11 place-items-center rounded-xl transition-all', panel === 'chat' ? 'bg-primary-500 text-white' : 'bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300')}><MessageSquare className="h-5 w-5" /></button>
              <button onClick={() => setPanel(panel === 'participants' ? null : 'participants')} className={cn('grid h-11 w-11 place-items-center rounded-xl transition-all', panel === 'participants' ? 'bg-primary-500 text-white' : 'bg-ink-100/60 text-ink-600 dark:bg-ink-800/60 dark:text-ink-300')}><Users className="h-5 w-5" /></button>
              <div className="mx-1 h-8 w-px bg-ink-200/20" />
              <button className="grid h-11 w-11 place-items-center rounded-xl bg-red-500 text-white hover:bg-red-600"><PhoneOff className="h-5 w-5" /></button>
            </div>
          </GlassCard>
        </div>

        {/* Side panel */}
        <AnimatePresence>
          {panel && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="lg:col-span-1">
              <GlassCard className="flex h-full flex-col p-0">
                {/* Panel tabs */}
                <div className="flex border-b border-ink-200/10">
                  <button onClick={() => setPanel('chat')} className={cn('flex-1 py-2.5 text-sm font-medium', panel === 'chat' ? 'text-primary-500' : 'text-ink-400')}>Chat</button>
                  <button onClick={() => setPanel('participants')} className={cn('flex-1 py-2.5 text-sm font-medium', panel === 'participants' ? 'text-primary-500' : 'text-ink-400')}>People ({participants.length})</button>
                </div>

                {panel === 'chat' && (
                  <div className="flex h-[460px] flex-col">
                    <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto p-3">
                      {chat.map((m) => (
                        <div key={m.id} className="flex gap-2">
                          <Avatar name={m.sender} size="xs" className="mt-auto" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-semibold">{m.sender}</span>
                              <span className="text-[10px] text-ink-400">{m.time}</span>
                            </div>
                            <p className="text-sm text-ink-600 dark:text-ink-300">{m.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 border-t border-ink-200/10 p-2">
                      <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Message..." className="h-9 flex-1 rounded-lg border border-ink-200/40 bg-white/40 px-3 text-sm focus:outline-none dark:border-ink-700/40 dark:bg-ink-900/40" />
                      <button onClick={sendChat} className="grid h-9 w-9 place-items-center rounded-lg bg-primary-500 text-white"><Send className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}

                {panel === 'participants' && (
                  <div className="h-[460px] space-y-1 overflow-y-auto p-3">
                    {participants.map((p) => (
                      <div key={p.id} className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-ink-100/40 dark:hover:bg-ink-800/40">
                        <Avatar name={p.name} size="sm" online />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{p.name}</p>
                          <p className="text-xs text-ink-400">{p.role}</p>
                        </div>
                        <div className="flex gap-1">
                          {!p.mic ? <MicOff className="h-3.5 w-3.5 text-red-400" /> : <Mic className="h-3.5 w-3.5 text-emerald-400" />}
                          {!p.cam ? <VideoOff className="h-3.5 w-3.5 text-ink-400" /> : <Video className="h-3.5 w-3.5 text-emerald-400" />}
                          {p.hand && <Hand className="h-3.5 w-3.5 text-amber-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LivePollModal open={pollOpen} onClose={() => setPollOpen(false)} />
    </div>
  );
}
