import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AboutForm from '@/components/admin/AboutForm';
import { prisma } from '@/lib/prisma';

export default async function AdminAboutPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const about = await prisma.about.findUnique({ where: { id: 'singleton' } });

  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-charcoal)' }}>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto max-w-3xl">
        <div className="mb-8">
          <h1
            className="font-display text-3xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
          >
            About the Artist
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-stone)' }}>
            Edit your public profile — visible on the About page
          </p>
        </div>
        <div
          className="p-8 rounded-xl"
          style={{
            background: 'var(--color-charcoal-soft)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <AboutForm about={about as any} />
        </div>
      </main>
    </div>
  );
}
