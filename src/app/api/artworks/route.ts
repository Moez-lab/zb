import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { artworkSchema } from '@/lib/validators';

// GET /api/artworks — public, returns all available artworks
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = Number(searchParams.get('limit')) || undefined;

    const artworks = await prisma.artwork.findMany({
      where: {
        ...(category && { category }),
        ...(featured === 'true' && { featured: true }),
        available: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(artworks);
  } catch (err) {
    console.error('[GET /api/artworks]', err);
    return NextResponse.json({ error: 'Failed to fetch artworks' }, { status: 500 });
  }
}

// POST /api/artworks — admin only, create new artwork
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = artworkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const artwork = await prisma.artwork.create({ data: parsed.data });
    return NextResponse.json(artwork, { status: 201 });
  } catch (err) {
    console.error('[POST /api/artworks]', err);
    return NextResponse.json({ error: 'Failed to create artwork' }, { status: 500 });
  }
}
