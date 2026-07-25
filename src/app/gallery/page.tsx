import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getArtworks } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse the full collection of original artworks.',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const artworks = await getArtworks();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24" style={{ minHeight: '100vh' }}>
        <div className="container-gallery">
          {/* Header */}
          <div className="mb-16">
            <p
              className="text-[11px] tracking-[0.35em] uppercase mb-3"
              style={{ color: 'var(--color-gold)' }}
            >
              Original Works
            </p>
            <h1
              className="font-display font-light mb-4"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--color-cream)',
                lineHeight: 1.1,
              }}
            >
              The Collection
            </h1>
            <div className="divider-gold-left" />
          </div>

          <GalleryGrid artworks={artworks} />
        </div>
      </main>
      <Footer />
    </>
  );
}
