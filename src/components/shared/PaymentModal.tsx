import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, CheckCircle2, Download, Wallet } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

type Phase = 'form' | 'processing' | 'success';

export function PaymentModal({ open, onClose, amount = 120, description = 'Tuition Fee — August 2026' }: { open: boolean; onClose: () => void; amount?: number; description?: string }) {
  const [phase, setPhase] = useState<Phase>('form');
  const [method, setMethod] = useState<'card' | 'upi'>('card');

  const pay = () => {
    setPhase('processing');
    setTimeout(() => setPhase('success'), 1800);
  };

  const close = () => {
    onClose();
    setTimeout(() => setPhase('form'), 300);
  };

  return (
    <Modal open={open} onClose={close} title={phase === 'success' ? undefined : 'Checkout'} size="sm">
      <AnimatePresence mode="wait">
        {phase === 'form' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Order summary */}
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-400">Payment for</p>
                  <p className="text-sm font-semibold">{description}</p>
                </div>
                <Wallet className="h-5 w-5 text-primary-500" />
              </div>
              <div className="my-3 h-px bg-ink-200/10" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-400">Total</span>
                <span className="font-display text-2xl font-bold text-primary-500">{formatCurrency(amount)}</span>
              </div>
            </div>

            {/* Method toggle */}
            <div className="flex gap-2">
              <button onClick={() => setMethod('card')} className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all ${method === 'card' ? 'border-primary-400/60 bg-primary-500/10 text-primary-500' : 'border-ink-200/40 text-ink-500'}`}>
                <CreditCard className="h-4 w-4" /> Card
              </button>
              <button onClick={() => setMethod('upi')} className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all ${method === 'upi' ? 'border-primary-400/60 bg-primary-500/10 text-primary-500' : 'border-ink-200/40 text-ink-500'}`}>
                <Wallet className="h-4 w-4" /> UPI
              </button>
            </div>

            {method === 'card' ? (
              <>
                <Input label="Card number" placeholder="4242 4242 4242 4242" icon={CreditCard} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Expiry" placeholder="12/28" />
                  <Input label="CVC" placeholder="123" icon={Lock} />
                </div>
              </>
            ) : (
              <Input label="UPI ID" placeholder="yourname@upi" />
            )}

            <div className="flex items-center gap-2 text-xs text-ink-400">
              <Lock className="h-3.5 w-3.5" /> Secured by 256-bit SSL encryption
            </div>
            <Button onClick={pay} className="w-full" size="lg">Pay {formatCurrency(amount)}</Button>
          </motion.div>
        )}

        {phase === 'processing' && (
          <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
            <p className="mt-4 text-sm font-semibold">Processing payment...</p>
            <p className="mt-1 text-xs text-ink-400">Please do not close this window</p>
          </motion.div>
        )}

        {phase === 'success' && (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
            <div>
              <h3 className="font-display text-xl font-bold">Payment Successful!</h3>
              <p className="mt-1 text-sm text-ink-400">{formatCurrency(amount)} paid for {description}</p>
            </div>
            <div className="glass rounded-xl p-4 text-left text-sm">
              <div className="flex justify-between"><span className="text-ink-400">Transaction ID</span><span className="font-mono font-semibold">TXN{Date.now().toString().slice(-8)}</span></div>
              <div className="mt-2 flex justify-between"><span className="text-ink-400">Date</span><span className="font-semibold">{new Date().toLocaleDateString()}</span></div>
              <div className="mt-2 flex justify-between"><span className="text-ink-400">Status</span><Badge tone="success" dot>Completed</Badge></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1"><Download className="h-4 w-4" /> Receipt</Button>
              <Button className="flex-1" onClick={close}>Done</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
