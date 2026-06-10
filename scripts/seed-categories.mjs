import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Women', slug: 'women', image: '/cat-women.png' },
  { name: 'Men', slug: 'men', image: '/cat-men.png' },
  { name: 'Accessories', slug: 'accessories', image: '/cat-accessories.png' },
  { name: 'Ethnic', slug: 'ethnic-wear', image: '/cat-ethnic.png' },
];

try {
  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, image: category.image },
      create: category,
    });
    console.log(`✓ ${result.name} (${result.slug})`);
  }
  console.log('\nAll categories ready.');
} catch (error) {
  console.error('Failed:', error.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
