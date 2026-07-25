'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { About } from '@/types';

interface AboutPreviewProps {
  about: About;
}

export default function AboutPreview({ about }: AboutPreviewProps) {
  return (
    <section
      className="py-28"
      style={{ background: 'var(--color-charcoal-soft)' }}
    >
      <div className="container-gallery">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Decorative frame */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 border-t border-l"
              style={{ borderColor: 'rgba(201,168,76,0.4)' }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r"
              style={{ borderColor: 'rgba(201,168,76,0.4)' }}
            />

            <div
              className="relative overflow-hidden rounded-lg"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={about.photoUrl}
                alt={about.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)',
                }}
              />
            </div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3"
            >
              <p
                className="text-[11px] tracking-[0.3em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                The Artist
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-light mb-2"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                color: 'var(--color-cream)',
                lineHeight: 1.1,
              }}
            >
              {about.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-sm tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-stone)' }}
            >
              {about.title}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="divider-gold-left mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--color-stone-light)' }}
            >
              {about.bio.substring(0, 280)}
              {about.bio.length > 280 && '…'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/about"
                className="btn-ghost flex items-center gap-2 w-fit"
              >
                Read the Full Story
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
