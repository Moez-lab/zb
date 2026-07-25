import type { Metadata } from 'next';
import './globals.css';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Zainab Shezad Studio';
const siteTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Original Contemporary Art & Bespoke Commissions.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zb-art.vercel.app';
const defaultOgImage = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=630&q=80';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Fine Art Collection`,
    template: `%s | ${siteName}`,
  },
  description: siteTagline,
  keywords: [
    'Zainab Shezad',
    'Art Gallery',
    'Contemporary Fine Art',
    'Original Oil Paintings',
    'Custom Commissions',
    'Luxury Art',
    'Abstract Painting',
    'Realism Art',
  ],
  authors: [{ name: 'Zainab Shezad' }],
  creator: 'Zainab Shezad',
  publisher: siteName,

  // WhatsApp, iMessage, Facebook Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${siteName} — Fine Art Collection`,
    description: siteTagline,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteName} Fine Art Collection`,
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter / X Card preview
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Fine Art Collection`,
    description: siteTagline,
    images: [defaultOgImage],
    creator: '@ZainabShezad.art',
  },

  // Robots & Search Engines
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  );
}
