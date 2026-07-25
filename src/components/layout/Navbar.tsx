'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0aee] backdrop-blur-xl border-b border-[#c9a84c20]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-gallery flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span
              className="font-display text-2xl font-light tracking-widest text-gold-gradient"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              {process.env.NEXT_PUBLIC_SITE_NAME || 'Art Gallery'}
            </span>
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'var(--color-stone)' }}
            >
              Fine Art Collection
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[12px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-[#c9a84c]'
                    : 'text-[#c5b8ad] hover:text-[#c9a84c]'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#c9a84c]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/gallery"
              className="btn-primary text-[11px] py-3 px-6"
              style={{ position: 'relative', zIndex: 1 }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>View Collection</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#c5b8ad] hover:text-[#c9a84c] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-y-0 right-0 w-72 z-40 flex flex-col pt-24 px-8"
            style={{
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(201,168,76,0.15)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  className={`block py-4 text-lg border-b font-display ${
                    pathname === link.href ? 'text-[#c9a84c]' : 'text-[#c5b8ad]'
                  }`}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    borderColor: 'rgba(201,168,76,0.1)',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Link href="/gallery" className="btn-primary w-full justify-center">
                <span style={{ position: 'relative', zIndex: 1 }}>View Collection</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
