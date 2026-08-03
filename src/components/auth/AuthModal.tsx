import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, User as UserIcon, Shield, GraduationCap, BookOpen, Users,
  ArrowRight, Eye, EyeOff, CheckCircle2, KeyRound, AlertCircle,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { useStore } from '@/store/useStore';
import type { Role } from '@/types';
import { cn } from '@/lib/utils';

const roles: { id: Role; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'admin', label: 'Admin', icon: Shield },
  { id: 'teacher', label: 'Teacher', icon: GraduationCap },
  { id: 'student', label: 'Student', icon: BookOpen },
  { id: 'parent', label: 'Parent', icon: Users },
];

type Mode = 'login' | 'signup' | 'forgot' | 'otp';

export function AuthModal() {
  const { authOpen, setAuthOpen, login } = useStore();
  const [mode, setMode] = useState<Mode>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const reset = () => {
    setMode('login');
    setShowPass(false);
    setError('');
    setOtpDigits(['', '', '', '']);
    setForm({ name: '', email: '', password: '' });
  };

  const close = () => {
    setAuthOpen(false);
    setTimeout(reset, 300);
  };

  const handleLogin = () => {
    setError('');
    if (mode === 'login') {
      if (!form.email.trim() || !form.password.trim()) {
        setError('Please enter your email and password.');
        return;
      }
    } else if (mode === 'signup') {
      if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
        setError('Please fill in all fields.');
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(selectedRole, form.name || undefined, form.email || undefined);
      reset();
    }, 900);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...otpDigits];
    next[i] = val;
    setOtpDigits(next);
  };

  return (
    <Modal open={authOpen} onClose={close} size="md" className="overflow-hidden">
      <div className="relative -m-6">
        <div className="relative grid gap-6 p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <Logo size="lg" showText={false} />
            <h2 className="mt-4 font-display text-2xl font-bold">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset password'}
              {mode === 'otp' && 'Enter verification code'}
            </h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              {mode === 'login' && 'Sign in to your EduSphere account'}
              {mode === 'signup' && 'Join thousands of learning communities'}
              {mode === 'forgot' && "We'll send a reset link to your email"}
              {mode === 'otp' && 'We sent a 4-digit code to your email'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* ---------- LOGIN ---------- */}
            {mode === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-ink-600 dark:text-ink-300">I am a...</p>
                  <div className="grid grid-cols-4 gap-2">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRole(r.id)}
                          className={cn(
                            'group flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all',
                            selectedRole === r.id
                              ? 'border-primary-400/60 bg-primary-500/10 shadow-glow-sm'
                              : 'border-ink-200/40 hover:border-primary-400/30 hover:bg-ink-100/40 dark:border-ink-700/50 dark:hover:bg-ink-800/40',
                          )}
                        >
                          <Icon className={cn('h-5 w-5', selectedRole === r.id ? 'text-primary-500' : 'text-ink-400')} />
                          <span className="text-[11px] font-semibold">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Input label="Email" icon={Mail} placeholder="you@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <div className="relative">
                  <Input
                    label="Password"
                    icon={Lock}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-[34px] text-ink-400 hover:text-ink-600"
                  >
                    {showPass ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-2.5 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" /> {error}
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-ink-500 dark:text-ink-400">
                    <input type="checkbox" className="rounded border-ink-300 text-primary-500 focus:ring-primary-400/40" />
                    Remember me
                  </label>
                  <button onClick={() => setMode('forgot')} className="font-medium text-primary-500 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Button onClick={handleLogin} loading={loading} className="w-full" size="lg">
                  Sign in as {selectedRole} <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => setMode('otp')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200/50 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100/50 dark:border-ink-700/50 dark:text-ink-300 dark:hover:bg-ink-800/50"
                >
                  <KeyRound className="h-4 w-4" /> Sign in with OTP
                </button>
                <p className="text-center text-sm text-ink-500 dark:text-ink-400">
                  New to EduSphere?{' '}
                  <button onClick={() => setMode('signup')} className="font-semibold text-primary-500 hover:underline">
                    Create account
                  </button>
                </p>
              </motion.div>
            )}

            {/* ---------- SIGNUP ---------- */}
            {mode === 'signup' && (
              <motion.div key="signup" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-ink-600 dark:text-ink-300">Choose your role</p>
                  <div className="grid grid-cols-4 gap-2">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRole(r.id)}
                          className={cn(
                            'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all',
                            selectedRole === r.id
                              ? 'border-primary-400/60 bg-primary-500/10 shadow-glow-sm'
                              : 'border-ink-200/40 hover:border-primary-400/30 dark:border-ink-700/50',
                          )}
                        >
                          <Icon className={cn('h-5 w-5', selectedRole === r.id ? 'text-primary-500' : 'text-ink-400')} />
                          <span className="text-[11px] font-semibold">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Input label="Full name" icon={UserIcon} placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Email" icon={Mail} placeholder="you@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input label="Password" icon={Lock} type="password" placeholder="Create a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-2.5 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" /> {error}
                  </div>
                )}
                <Button onClick={handleLogin} loading={loading} className="w-full" size="lg">
                  Create account <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-sm text-ink-500 dark:text-ink-400">
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="font-semibold text-primary-500 hover:underline">
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}

            {/* ---------- FORGOT ---------- */}
            {mode === 'forgot' && (
              <motion.div key="forgot" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <Input label="Email" icon={Mail} placeholder="you@example.com" />
                <Button onClick={() => setMode('otp')} className="w-full" size="lg">
                  Send reset link <ArrowRight className="h-4 w-4" />
                </Button>
                <button onClick={() => setMode('login')} className="w-full text-center text-sm text-ink-500 hover:text-primary-500">
                  Back to sign in
                </button>
              </motion.div>
            )}

            {/* ---------- OTP ---------- */}
            {mode === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
                <div className="flex justify-center gap-3">
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ''))}
                      maxLength={1}
                      inputMode="numeric"
                      className="h-14 w-14 rounded-xl border border-ink-200/60 bg-white/80 text-center font-display text-2xl font-bold text-ink-800 focus:border-primary-400/60 focus:outline-none focus:ring-2 focus:ring-primary-400/20 dark:border-ink-700/60 dark:bg-ink-900/60 dark:text-ink-100"
                    />
                  ))}
                </div>
                <Button onClick={handleLogin} loading={loading} className="w-full" size="lg">
                  <CheckCircle2 className="h-4 w-4" /> Verify & continue
                </Button>
                <p className="text-center text-sm text-ink-500 dark:text-ink-400">
                  Didn't receive it?{' '}
                  <button className="font-semibold text-primary-500 hover:underline">Resend code</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
}
