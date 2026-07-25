import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { artworkSchema } from '@/lib/validators';
import { deleteFromCloudinary } from '@/lib/cloudinary';

// GET /api/artworks/[id] — public
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const artwork = await prisma.artwork.findUnique({ where: { id } });
    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }
    return NextResponse.json(artwork);
  } catch (err) {
    console.error('[GET /api/artworks/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch artwork' }, { status: 500 });
  }
}

// PUT /api/artworks/[id] — admin only
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = artworkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const artwork = await prisma.artwork.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(artwork);
  } catch (err) {
    console.error('[PUT /api/artworks/[id]]', err);
    return NextResponse.json({ error: 'Failed to update artwork' }, { status: 500 });
  }
}

// DELETE /api/artworks/[id] — admin only
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const artwork = await prisma.artwork.findUnique({ where: { id } });
    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    // Delete image from Cloudinary before removing DB record
    if (artwork.imagePublicId) {
      await deleteFromCloudinary(artwork.imagePublicId);
    }

    await prisma.artwork.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/artworks/[id]]', err);
    return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
  }
}
