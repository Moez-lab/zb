'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtworkCard from './ArtworkCard';
import type { Artwork } from '@/types';
import { ART_CATEGORIES } from '@/types';

interface GalleryGridProps {
  artworks: Artwork[];
}

export default function GalleryGrid({ artworks }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(artworks.map((a) => a.category)))];

  const filtered =
    activeCategory === 'All'
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center gap-2 mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 rounded-sm border shadow-sm ${
              activeCategory === cat
                ? 'border-[#012A4A] bg-[#012A4A] text-white font-medium shadow-md'
                : 'border-[rgba(1,42,74,0.15)] text-[#012A4A] hover:border-[#012A4A] hover:text-[#012A4A] bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm mb-8"
        style={{ color: 'var(--color-stone)' }}
      >
        {filtered.length} {filtered.length === 1 ? 'work' : 'works'} available
      </motion.p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((artwork, i) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={i}
              priority={i < 3}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p
            className="font-display text-2xl mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-stone-light)' }}
          >
            No works in this category yet
          </p>
          <p className="text-sm" style={{ color: 'var(--color-stone)' }}>
            Check back soon for new additions.
          </p>
        </motion.div>
      )}
    </div>
  );
}
