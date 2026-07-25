import Link from 'next/link';
import ArtworkCard from '@/components/gallery/ArtworkCard';
import type { Artwork } from '@/types';

interface SimilarArtworksProps {
  artworks: Artwork[];
  currentCategory: string;
}

export default function SimilarArtworks({ artworks, currentCategory }: SimilarArtworksProps) {
  if (artworks.length === 0) return null;

  return (
    <section className="mt-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-3"
          style={{ color: 'var(--color-gold)' }}
        >
          {currentCategory} Collection
        </p>
        <h2
          className="font-display text-4xl font-light mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
        >
          You Might Also Like
        </h2>
        <div className="divider-gold mt-2" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork, i) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-12">
        <Link
          href={`/gallery?category=${encodeURIComponent(currentCategory)}`}
          className="btn-ghost"
        >
          View All {currentCategory} Works
        </Link>
      </div>
    </section>
  );
}
