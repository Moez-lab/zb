import Link from 'next/link';
import { AtSign, Mail } from 'lucide-react';

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery';

  return (
    <footer
      style={{
        background: 'var(--color-charcoal-soft)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      <div className="container-gallery py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p
              className="font-display text-3xl font-light mb-3 text-gold-gradient"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {siteName}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-stone)' }}
            >
              {process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Original Art. Timeless Stories.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-4 font-medium"
              style={{ color: 'var(--color-gold)' }}
            >
              Explore
            </p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/about', label: 'About the Artist' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[#c9a84c]"
                    style={{ color: 'var(--color-stone-light)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-4 font-medium"
              style={{ color: 'var(--color-gold)' }}
            >
              Connect
            </p>
            <div className="space-y-3">
              <p className="text-sm" style={{ color: 'var(--color-stone-light)' }}>
                Commission inquiries, collaborations, and collection access
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href={`mailto:${process.env.EMAIL_TO || ''}`}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[#c9a84c]"
                  style={{ color: 'var(--color-stone-light)' }}
                  aria-label="Email"
                >
                  <Mail size={16} />
                  <span>Email Studio</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: 'var(--color-stone)' }}
          >
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-stone)' }}
          >
            All artworks are original and protected by copyright.
          </p>
        </div>
      </div>
    </footer>
  );
}
