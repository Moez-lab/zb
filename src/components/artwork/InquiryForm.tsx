'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { inquirySchema, type InquiryInput } from '@/lib/validators';

interface InquiryFormProps {
  artworkId: string;
  artworkTitle: string;
}

export default function InquiryForm({ artworkId, artworkTitle }: InquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { artworkId },
  });

  const onSubmit = async (data: InquiryInput) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send inquiry');
      }

      setStatus('success');
      reset({ artworkId });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div
      className="card-glass p-8 rounded-lg"
      style={{ borderColor: 'rgba(201,168,76,0.15)' }}
    >
      <div className="mb-6">
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Inquire About This Piece
        </p>
        <h3
          className="font-display text-2xl font-light"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
        >
          Ask a Question
        </h3>
        <p
          className="text-sm mt-2"
          style={{ color: 'var(--color-stone)' }}
        >
          Regarding: <em style={{ color: 'var(--color-stone-light)' }}>{artworkTitle}</em>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle
              size={48}
              className="mx-auto mb-4"
              style={{ color: 'var(--color-gold)' }}
            />
            <p
              className="font-display text-2xl mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
            >
              Message Received
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--color-stone)' }}
            >
              Thank you for your interest. We'll be in touch shortly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn-ghost text-sm py-2 px-6"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Hidden artwork ID */}
            <input type="hidden" {...register('artworkId')} value={artworkId} />

            {/* Honeypot — hidden from users, traps bots */}
            <input
              type="text"
              {...register('website')}
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />

            {/* Name */}
            <div>
              <label
                className="block text-[11px] tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--color-stone)' }}
              >
                Your Name
              </label>
              <input
                {...register('name')}
                className="input-luxury"
                placeholder="Full name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-[11px] tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--color-stone)' }}
              >
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="input-luxury"
                placeholder="your@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-[11px] tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--color-stone)' }}
              >
                Your Message
              </label>
              <textarea
                {...register('message')}
                className="input-luxury"
                rows={5}
                placeholder="I'm interested in this artwork. Could you tell me more about..."
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div
                className="flex items-center gap-2 p-4 rounded-md"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full justify-center"
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </span>
              {status !== 'loading' && (
                <Send size={14} style={{ position: 'relative', zIndex: 1 }} />
              )}
            </button>

            <p
              className="text-xs text-center"
              style={{ color: 'var(--color-stone)' }}
            >
              Your message goes directly to the artist's studio.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
