import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create or update About section
  await prisma.about.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: 'Zainab Shezad',
      title: 'Contemporary Fine Artist',
      bio: `Zainab Shezad is a contemporary fine artist based in New York City, whose work explores the tension between silence and movement, nature and abstraction. With over a decade of practice in oil and mixed media, her paintings have been exhibited in galleries across Europe and North America.

Her creative process is deeply meditative — each canvas begins as an act of listening, allowing texture, light, and pigment to reveal form organically. She works in large and intimate formats, always seeking that moment where a painting begins to breathe on its own.

Zainab's work is held in private collections worldwide and is available for acquisition, commission, and exhibition.`,
      photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=80',
      photoPublicId: '',
      instagram: '@ZainabShezad.art',
      email: process.env.EMAIL_TO || 'studio@ZainabShezad.art',
    },
  });

  // Create sample artworks
  const artworks = [
    {
      title: 'Whispers of the Tide',
      category: 'Abstract',
      price: 2400,
      medium: 'Oil on Canvas',
      width: 36,
      height: 48,
      unit: 'inches',
      framing: 'Unframed',
      description: `This evocative piece captures the ephemeral quality of sea foam meeting shore — a meditation on impermanence and grace. Layers of ultramarine, titanium white, and warm ochre are applied in sweeping gestures, creating a surface alive with movement and quiet tension.\n\nPainted over the course of three weeks, each session shaped by the shifting light of a studio overlooking the Hudson River. The result is a work that changes character throughout the day — luminous in morning light, deep and introspective at dusk.\n\nThis work ships unframed, rolled in archival tissue and delivered in a premium tube. Framing is available upon request.`,
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80',
      imagePublicId: '',
      customWork: true,
      featured: true,
      available: true,
    },
    {
      title: 'Still Life with Amber Light',
      category: 'Realism',
      price: 3800,
      medium: 'Oil on Linen',
      width: 24,
      height: 30,
      unit: 'inches',
      framing: 'Natural wood frame',
      description: `A contemporary take on the classical still life tradition, bathed in the warm, honeyed light of late afternoon. Rendered with meticulous attention to surface and reflection, this painting invites quiet contemplation.\n\nThe arrangement — a ceramic vessel, dried botanicals, and folded cloth — is deliberately spare, allowing light itself to become the true subject. Each object was carefully chosen for its textural resonance and chromatic harmony.\n\nShips framed in a natural oak moulding, wired and ready to hang. Certificate of authenticity included.`,
      imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&q=80',
      imagePublicId: '',
      customWork: false,
      featured: true,
      available: true,
    },
  ];

  for (const artwork of artworks) {
    await prisma.artwork.create({ data: artwork });
    console.log(`  ✓ Created: "${artwork.title}"`);
  }

  console.log('\n✅ Seed complete! Your gallery is ready.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
