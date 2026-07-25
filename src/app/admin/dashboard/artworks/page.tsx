import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ArtworkListClient from '@/components/admin/ArtworkListClient';

export default async function AdminArtworksPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const artworks = await prisma.artwork.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-charcoal)' }}>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <ArtworkListClient artworks={artworks as any} />
      </main>
    </div>
  );
}
