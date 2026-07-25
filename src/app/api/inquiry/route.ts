import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendInquiryEmail } from '@/lib/email';
import { inquirySchema } from '@/lib/validators';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

// POST /api/inquiry — public (rate limited)
export async function POST(req: NextRequest) {
  // Rate limit: 3 inquiries per 15 minutes per IP
  const ip = getClientIp(req);
  const result = rateLimit(`inquiry:${ip}`, 3, 15 * 60 * 1000);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before sending another inquiry.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { artworkId, name, email, message, website } = parsed.data;

    // Honeypot check — bots fill the 'website' field
    if (website && website.length > 0) {
      // Silently succeed to fool bots
      return NextResponse.json({ success: true });
    }

    // Verify artwork exists
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
      select: { id: true, title: true },
    });

    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    // Store inquiry in DB
    await prisma.inquiry.create({
      data: { artworkId, name, email, message },
    });

    // Send email notification
    await sendInquiryEmail({
      customerName: name,
      customerEmail: email,
      message,
      artworkTitle: artwork.title,
      artworkId: artwork.id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/inquiry]', err);
    return NextResponse.json(
      { error: 'Failed to send inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
