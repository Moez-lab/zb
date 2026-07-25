'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setStatus('error');
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ background: 'var(--color-charcoal)' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            var(--color-gold) 0px,
            var(--color-gold) 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="card-glass p-10 rounded-2xl"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}
        >
          {/* Logo */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <Lock size={22} style={{ color: 'var(--color-gold)' }} />
            </div>
            <h1
              className="font-display text-3xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
            >
              {process.env.NEXT_PUBLIC_SITE_NAME || 'Gallery'}
            </h1>
            <p
              className="text-xs tracking-[0.2em] uppercase mt-2"
              style={{ color: 'var(--color-stone)' }}
            >
              Admin Panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                className="block text-[11px] tracking-[0.2em] uppercase mb-2"
                style={{ color: 'var(--color-stone)' }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[11px] tracking-[0.2em] uppercase mb-2"
                style={{ color: 'var(--color-stone)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--color-stone)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-center py-3 rounded-md"
                style={{
                  color: '#f87171',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                Invalid username or password
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full justify-center mt-2"
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {status === 'loading' ? 'Signing in...' : 'Sign In'}
              </span>
              <LogIn size={15} style={{ position: 'relative', zIndex: 1 }} />
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-4"
          style={{ color: 'var(--color-stone)' }}
        >
          <a href="/" className="hover:text-[#c9a84c] transition-colors">
            ← Back to Gallery
          </a>
        </p>
      </motion.div>
    </div>
  );
}
