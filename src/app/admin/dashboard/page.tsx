import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Image, FileText, MessageSquare, Plus } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const [artworkCount, inquiryCount, unreadCount] = await Promise.all([
    prisma.artwork.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { read: false } }),
  ]);

  const recentArtworks = await prisma.artwork.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const stats = [
    { label: 'Total Artworks', value: artworkCount, icon: <Image size={20} />, href: '/admin/dashboard/artworks' },
    { label: 'Total Inquiries', value: inquiryCount, icon: <MessageSquare size={20} />, href: '#' },
    { label: 'Unread Inquiries', value: unreadCount, icon: <FileText size={20} />, href: '#' },
  ];

  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-charcoal)' }}>
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1
              className="font-display text-3xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
            >
              Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-stone)' }}>
              Welcome back, {session.user?.name}
            </p>
          </div>
          <Link href="/admin/dashboard/artworks/new" className="btn-primary">
            <span style={{ position: 'relative', zIndex: 1 }}>Add Artwork</span>
            <Plus size={15} style={{ position: 'relative', zIndex: 1 }} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-6 rounded-xl transition-all hover:border-[rgba(201,168,76,0.3)]"
              style={{
                background: 'var(--color-charcoal-soft)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span style={{ color: 'var(--color-stone)' }}>{stat.icon}</span>
                <span
                  className="font-display text-3xl font-light"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-gold)' }}
                >
                  {stat.value}
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-stone-light)' }}>
                {stat.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent artworks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-display text-xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
            >
              Recent Artworks
            </h2>
            <Link
              href="/admin/dashboard/artworks"
              className="text-xs tracking-wider uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              View All
            </Link>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'var(--color-charcoal-soft)' }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Title', 'Category', 'Price', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[11px] tracking-[0.15em] uppercase"
                      style={{ color: 'var(--color-stone)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentArtworks.map((artwork: { id: string; title: string; category: string; price: number; available: boolean }, i: number) => (
                  <tr
                    key={artwork.id}
                    style={{
                      borderBottom: i < recentArtworks.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                    className="hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/dashboard/artworks/${artwork.id}/edit`}
                        className="text-sm hover:text-[#c9a84c] transition-colors"
                        style={{ color: 'var(--color-cream)' }}
                      >
                        {artwork.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className="badge-category text-[10px]">{artwork.category}</span>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: 'var(--color-gold)' }}>
                      ${artwork.price.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: artwork.available ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)',
                          color: artwork.available ? '#4ade80' : '#f87171',
                        }}
                      >
                        {artwork.available ? 'Available' : 'Sold'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentArtworks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-sm" style={{ color: 'var(--color-stone)' }}>
                      No artworks yet.{' '}
                      <Link href="/admin/dashboard/artworks/new" className="text-[#c9a84c]">
                        Add your first artwork
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
