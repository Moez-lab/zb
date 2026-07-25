'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Image, User, LogOut, ExternalLink } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { href: '/admin/dashboard/artworks', label: 'Artworks', icon: <Image size={16} /> },
  { href: '/admin/dashboard/about', label: 'About', icon: <User size={16} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar flex flex-col">
      {/* Logo */}
      <div
        className="px-6 py-7"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <p
          className="font-display text-xl font-light text-gold-gradient"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {process.env.NEXT_PUBLIC_SITE_NAME || 'Gallery'}
        </p>
        <p
          className="text-[10px] tracking-[0.25em] uppercase mt-1"
          style={{ color: 'var(--color-stone)' }}
        >
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin/dashboard'
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="p-4 space-y-1"
        style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        <Link
          href="/"
          target="_blank"
          className="admin-nav-item"
        >
          <ExternalLink size={16} />
          View Gallery
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="admin-nav-item w-full text-left"
          style={{ color: '#f87171' }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
