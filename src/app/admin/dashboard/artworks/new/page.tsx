import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ArtworkForm from '@/components/admin/ArtworkForm';

export default async function NewArtworkPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-charcoal)' }}>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto max-w-3xl">
        <div className="mb-8">
          <a
            href="/admin/dashboard/artworks"
            className="text-xs tracking-widest uppercase mb-4 block transition-colors hover:text-[#c9a84c]"
            style={{ color: 'var(--color-stone)' }}
          >
            ← Back to Artworks
          </a>
          <h1
            className="font-display text-3xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
          >
            Add New Artwork
          </h1>
        </div>
        <div
          className="p-8 rounded-xl"
          style={{
            background: 'var(--color-charcoal-soft)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <ArtworkForm mode="create" />
        </div>
      </main>
    </div>
  );
}
