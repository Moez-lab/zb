import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { aboutSchema } from '@/lib/validators';

// GET /api/about — public
export async function GET() {
  try {
    const about = await prisma.about.findUnique({ where: { id: 'singleton' } });
    if (!about) {
      return NextResponse.json({ error: 'About not found' }, { status: 404 });
    }
    return NextResponse.json(about);
  } catch (err) {
    console.error('[GET /api/about]', err);
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
  }
}

// PUT /api/about — admin only
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = aboutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const about = await prisma.about.upsert({
      where: { id: 'singleton' },
      update: parsed.data,
      create: { id: 'singleton', ...parsed.data },
    });

    return NextResponse.json(about);
  } catch (err) {
    console.error('[PUT /api/about]', err);
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 });
  }
}
