import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getAbout } from '@/lib/data';
import type { Metadata } from 'next';
import { Mail, AtSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Artist',
  description: 'Meet the artist behind the collection.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const about = await getAbout();
  const paragraphs = about.bio.split('\n').filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24" style={{ minHeight: '100vh' }}>
        <div className="container-gallery">
          {/* Hero section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
            {/* Image — 2 of 5 cols */}
            <div className="lg:col-span-2">
              <div className="relative sticky top-28">
                {/* Corner decorations */}
                <div
                  className="absolute -top-5 -left-5 w-16 h-16 border-t-2 border-l-2"
                  style={{ borderColor: 'var(--color-gold)' }}
                />
                <div
                  className="absolute -bottom-5 -right-5 w-16 h-16 border-b-2 border-r-2"
                  style={{ borderColor: 'var(--color-gold)' }}
                />
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: '3/4' }}
                >
                  <Image
                    src={about.photoUrl}
                    alt={about.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                {/* Name card overlay */}
                <div
                  className="absolute bottom-8 left-8 right-8 p-5 rounded-lg"
                  style={{
                    background: 'rgba(10,10,10,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <p
                    className="font-display text-2xl font-light"
                    style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
                  >
                    {about.name}
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mt-1"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {about.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Text — 3 of 5 cols */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p
                className="text-[11px] tracking-[0.35em] uppercase mb-4"
                style={{ color: 'var(--color-gold)' }}
              >
                The Artist
              </p>
              <h1
                className="font-display font-light mb-3"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: 'var(--color-cream)',
                  lineHeight: 1.1,
                }}
              >
                {about.name}
              </h1>
              <p
                className="text-sm tracking-[0.2em] uppercase mb-8"
                style={{ color: 'var(--color-stone)' }}
              >
                {about.title}
              </p>

              <div className="divider-gold-left mb-10" />

              {/* Bio paragraphs */}
              <div className="space-y-5">
                {paragraphs.map((para: string, i: number) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed"
                    style={{ color: i === 0 ? 'var(--color-cream)' : 'var(--color-stone-light)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Social / contact links */}
              <div className="flex items-center gap-6 mt-10">
                {about.email && (
                  <a
                    href={`mailto:${about.email}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-[#c9a84c]"
                    style={{ color: 'var(--color-stone-light)' }}
                  >
                    <Mail size={16} />
                    <span>Email the Artist</span>
                  </a>
                )}
                {about.instagram && (
                  <span
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--color-stone-light)' }}
                  >
                    <AtSign size={16} />
                    <span>{about.instagram}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CTA — Commission section */}
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(30,20,10,0.8) 100%)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              Custom Commissions
            </p>
            <h2
              className="font-display text-4xl font-light mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
            >
              A Piece Made for You
            </h2>
            <p
              className="text-base max-w-xl mx-auto mb-8"
              style={{ color: 'var(--color-stone-light)' }}
            >
              Commission an original work tailored to your space, palette, and vision.
              The artist works closely with each collector to bring their idea to life.
            </p>
            <a
              href={`mailto:${about.email || process.env.EMAIL_TO || ''}`}
              className="btn-primary"
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Start a Conversation</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
