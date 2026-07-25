'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ruler, Frame, Palette, PenTool, CheckCircle } from 'lucide-react';
import type { Artwork } from '@/types';

interface ArtworkDetailProps {
  artwork: Artwork;
}

export default function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const specs = [
    {
      icon: <Palette size={16} />,
      label: 'Medium',
      value: artwork.medium,
    },
    {
      icon: <Ruler size={16} />,
      label: 'Dimensions',
      value: `${artwork.width} × ${artwork.height} ${artwork.unit}`,
    },
    {
      icon: <Frame size={16} />,
      label: 'Framing',
      value: artwork.framing,
    },
    {
      icon: <PenTool size={16} />,
      label: 'Category',
      value: artwork.category,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Left: Image */}
      <div ref={imageRef} className="sticky top-28 overflow-hidden rounded-lg">
        <motion.div style={{ y: imageY }}>
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              aspectRatio: '4/5',
              background: 'var(--color-charcoal-soft)',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>

      {/* Right: Details */}
      <div className="pt-4">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="badge-category">{artwork.category}</span>
          {artwork.available ? (
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: '#4ade80' }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
              Available
            </span>
          ) : (
            <span className="text-xs" style={{ color: 'var(--color-stone)' }}>
              Sold
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display font-light mb-4"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            color: 'var(--color-cream)',
            lineHeight: 1.1,
          }}
        >
          {artwork.title}
        </motion.h1>

        {/* Price */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl font-light mb-8"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            color: 'var(--color-gold)',
          }}
        >
          ${artwork.price.toLocaleString()}
          <span
            className="text-base ml-2 font-body"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--color-stone)',
              fontSize: '14px',
            }}
          >
            USD
          </span>
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="divider-gold-left mb-8"
        />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-3"
            style={{ color: 'var(--color-gold)' }}
          >
            About This Work
          </p>
          <div
            className="prose prose-invert max-w-none text-[15px] leading-relaxed space-y-3"
            style={{ color: 'var(--color-stone-light)' }}
          >
            {artwork.description.split('\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>

        {/* Specs grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="p-4 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              <div
                className="flex items-center gap-2 mb-1"
                style={{ color: 'var(--color-gold)' }}
              >
                {spec.icon}
                <span className="text-[10px] tracking-[0.2em] uppercase">
                  {spec.label}
                </span>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--color-cream)' }}
              >
                {spec.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Custom work */}
        {artwork.customWork && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-5 rounded-lg mb-8"
            style={{
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle
                size={18}
                className="shrink-0 mt-0.5"
                style={{ color: 'var(--color-gold)' }}
              />
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: 'var(--color-gold)' }}
                >
                  Custom Commission Available
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-stone-light)' }}
                >
                  Interested in a similar piece with custom dimensions, colors, or subject?
                  The artist welcomes bespoke commissions. Inquire below.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#inquiry"
            className="btn-primary w-full justify-center"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              Inquire About This Piece
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
