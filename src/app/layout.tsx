import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery'}`,
  },
  description: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Original Art. Timeless Stories.',
  openGraph: {
    type: 'website',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery',
  },
  robots: { index: true, follow: true },
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
