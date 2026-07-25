import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArtworkDetail from '@/components/artwork/ArtworkDetail';
import InquiryForm from '@/components/artwork/InquiryForm';
import SimilarArtworks from '@/components/artwork/SimilarArtworks';
import { getArtworkById, getArtworks } from '@/lib/data';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtworkById(id);
  if (!artwork) return { title: 'Artwork Not Found' };
  return {
    title: artwork.title,
    description: artwork.description.substring(0, 160),
    openGraph: {
      images: [{ url: artwork.imageUrl, width: 1200, height: 630, alt: artwork.title }],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;

  const artwork = await getArtworkById(id);
  if (!artwork) notFound();

  // Similar artworks: same category, exclude current
  const allSimilar = await getArtworks({ category: artwork.category });
  const similar = allSimilar.filter((a) => a.id !== artwork.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container-gallery">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-xs mb-12"
            style={{ color: 'var(--color-stone)' }}
          >
            <a href="/" className="hover:text-[#c9a84c] transition-colors">Home</a>
            <span>/</span>
            <a href="/gallery" className="hover:text-[#c9a84c] transition-colors">Gallery</a>
            <span>/</span>
            <span style={{ color: 'var(--color-stone-light)' }}>{artwork.title}</span>
          </nav>

          {/* Main artwork detail */}
          <ArtworkDetail artwork={artwork} />

          {/* Inquiry form section */}
          <section id="inquiry" className="mt-24 max-w-2xl mx-auto scroll-mt-28">
            <InquiryForm artworkId={artwork.id} artworkTitle={artwork.title} />
          </section>

          {/* You might also like */}
          <SimilarArtworks artworks={similar} currentCategory={artwork.category} />
        </div>
      </main>
      <Footer />
    </>
  );
}
