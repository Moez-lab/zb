import type { Metadata } from 'next';
import './globals.css';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Zainab Shezad Studio';
const siteTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Original Contemporary Art & Bespoke Commissions.';

// Dynamically determine exact site URL (prioritize env, then Vercel URL, then exact domain)
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://zb-two.vercel.app';
};

const siteUrl = getSiteUrl();

// WhatsApp crawler requires image size under 300KB and exact 1200x630 dimensions
const defaultOgImage = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=630&fit=crop&q=70&fm=jpg';

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
        secureUrl: defaultOgImage,
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
