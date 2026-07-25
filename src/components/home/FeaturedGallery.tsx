'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Artwork } from '@/types';

interface FeaturedGalleryProps {
  artworks: Artwork[];
  totalAvailable: number;
}

export default function FeaturedGallery({ artworks, totalAvailable }: FeaturedGalleryProps) {
  return (
    <section
      className="py-28"
      style={{ background: 'var(--color-charcoal)' }}
    >
      <div className="container-gallery">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--color-gold)' }}
            >
              Featured Works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-light"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: 'var(--color-cream)',
              }}
            >
              Selected Collection
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-end"
          >
            <p
              className="font-display text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-gold)' }}
            >
              {totalAvailable}
            </p>
            <p
              className="text-[11px] tracking-[0.25em] uppercase"
              style={{ color: 'var(--color-stone)' }}
            >
              Artworks Available
            </p>
          </motion.div>
        </div>

        {/* Works grid */}
        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {artworks.map((artwork, i) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link href={`/artwork/${artwork.id}`} className="block group">
                  <div className="card-artwork">
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: '3/4' }}
                    >
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        priority={i === 0}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                        style={{
                          background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)',
                        }}
                      >
                        <span
                          className="flex items-center gap-2 text-xs tracking-widest uppercase"
                          style={{ color: 'var(--color-gold)' }}
                        >
                          View Details <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className="font-display text-xl font-light"
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
                        className="text-[11px] tracking-widest uppercase mt-1"
                        style={{ color: 'var(--color-stone)' }}
                      >
                        {artwork.medium}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p
              className="font-display text-2xl"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-stone)' }}
            >
              Collection coming soon
            </p>
          </div>
        )}

        {/* View all */}
        <div className="flex justify-center">
          <Link href="/gallery" className="btn-ghost flex items-center gap-2">
            View Full Collection
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
