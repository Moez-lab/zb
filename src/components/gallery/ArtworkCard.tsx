'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Artwork } from '@/types';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  priority?: boolean;
}

export default function ArtworkCard({ artwork, index = 0, priority = false }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/artwork/${artwork.id}`} className="block group">
        <div className="card-artwork">
          {/* Image */}
          <div
            className="img-reveal relative overflow-hidden"
            style={{ aspectRatio: '4/5' }}
          >
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6"
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)' }}
            >
              <span
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-[#c9a84c]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                View Artwork <ArrowRight size={14} />
              </span>
            </div>

            {/* Available badge */}
            {artwork.available && (
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 text-[10px] tracking-widest uppercase rounded-sm"
                  style={{
                    background: 'rgba(10,10,10,0.85)',
                    color: 'var(--color-gold)',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}
                >
                  Available
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className="font-display text-xl font-light leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
              >
                {artwork.title}
              </h3>
              <span
                className="font-display text-lg font-light shrink-0"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-gold)' }}
              >
                ${artwork.price.toLocaleString()}
              </span>
            </div>
            <p
              className="text-[11px] tracking-[0.15em] uppercase mb-3"
              style={{ color: 'var(--color-stone)' }}
            >
              {artwork.medium}
            </p>
            <div className="flex items-center justify-between">
              <span className="badge-category">{artwork.category}</span>
              <span
                className="text-xs"
                style={{ color: 'var(--color-stone)' }}
              >
                {artwork.width} × {artwork.height} {artwork.unit}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
