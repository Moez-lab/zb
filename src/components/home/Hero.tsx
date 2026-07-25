'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Floating particle
function Particle({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: 2,
        height: 2,
        background: 'rgba(201, 168, 76, 0.4)',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const particles = [
  { id: 0, delay: 0.0, duration: 4.5, x: '15%', y: '25%' },
  { id: 1, delay: 0.3, duration: 5.2, x: '35%', y: '75%' },
  { id: 2, delay: 0.6, duration: 4.1, x: '60%', y: '15%' },
  { id: 3, delay: 0.9, duration: 6.0, x: '80%', y: '45%' },
  { id: 4, delay: 1.2, duration: 4.8, x: '25%', y: '60%' },
  { id: 5, delay: 1.5, duration: 5.5, x: '70%', y: '85%' },
  { id: 6, delay: 1.8, duration: 4.3, x: '45%', y: '30%' },
  { id: 7, delay: 2.1, duration: 6.2, x: '90%', y: '20%' },
  { id: 8, delay: 2.4, duration: 5.0, x: '10%', y: '80%' },
  { id: 9, delay: 2.7, duration: 4.6, x: '55%', y: '50%' },
  { id: 10, delay: 3.0, duration: 5.8, x: '30%', y: '10%' },
  { id: 11, delay: 3.3, duration: 4.4, x: '65%', y: '65%' },
  { id: 12, delay: 3.6, duration: 6.5, x: '85%', y: '75%' },
  { id: 13, delay: 3.9, duration: 5.1, x: '40%', y: '90%' },
  { id: 14, delay: 4.2, duration: 4.7, x: '20%', y: '40%' },
  { id: 15, delay: 4.5, duration: 5.9, x: '75%', y: '35%' },
  { id: 16, delay: 4.8, duration: 4.2, x: '5%', y: '50%' },
  { id: 17, delay: 5.1, duration: 6.1, x: '50%', y: '20%' },
  { id: 18, delay: 5.4, duration: 4.9, x: '95%', y: '60%' },
  { id: 19, delay: 5.7, duration: 5.4, x: '60%', y: '95%' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-charcoal)' }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.25)',
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.1) 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to top, var(--color-charcoal), transparent)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} delay={p.delay} duration={p.duration} x={p.x} y={p.y} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="container-gallery relative z-10 pt-24"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="divider-gold-left" />
            <span
              className="text-[11px] tracking-[0.4em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              Fine Art Collection
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light leading-none mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: 'var(--color-cream)',
            }}
          >
            Where Art
            <br />
            <em
              className="text-gold-gradient"
              style={{ fontStyle: 'italic' }}
            >
              Speaks
            </em>
            <br />
            to the Soul
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg mb-10 max-w-md leading-relaxed"
            style={{ color: 'var(--color-stone-light)' }}
          >
            Original paintings, mixed media, and bespoke commissions.
            Each piece a conversation between artist and canvas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/gallery" className="btn-primary">
              <span style={{ position: 'relative', zIndex: 1 }}>
                Explore the Collection
              </span>
              <ArrowRight size={16} style={{ position: 'relative', zIndex: 1 }} />
            </Link>
            <Link href="/about" className="btn-ghost">
              Meet the Artist
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-8 mt-16"
          >
            {[
              { value: '2', label: 'Available Works' },
              { value: '100%', label: 'Original Art' },
              { value: '∞', label: 'Custom Commissions' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display text-3xl font-light"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-gold)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mt-1"
                  style={{ color: 'var(--color-stone)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--color-stone)' }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
