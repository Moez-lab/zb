import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // All /admin/* routes except /admin/login require auth
  // We handle the redirect per-page for the login route
  return <>{children}</>;
}
