import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedGallery from '@/components/home/FeaturedGallery';
import AboutPreview from '@/components/home/AboutPreview';
import { getArtworks, getAbout, getTotalAvailableArtworksCount } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery'} — Fine Art Collection`,
  description: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Original Art. Timeless Stories.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featuredArtworks, aboutData, totalAvailable] = await Promise.all([
    getArtworks({ featuredOnly: true, limit: 3 }),
    getAbout(),
    getTotalAvailableArtworksCount(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedGallery artworks={featuredArtworks} totalAvailable={totalAvailable} />
      {aboutData && <AboutPreview about={aboutData} />}
      <Footer />
    </main>
  );
}
