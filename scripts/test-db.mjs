import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
  await prisma.$queryRaw`SELECT 1 as ok`;
  console.log('CONNECTION: SUCCESS');

  const tables = await prisma.$queryRaw`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;
  const names = tables.map((t) => t.table_name);
  console.log('TABLES:', names.length ? names.join(', ') : '(none)');

  if (names.includes('Product')) {
    const count = await prisma.product.count();
    console.log('PRODUCTS:', count);
  }
} catch (error) {
  console.log('CONNECTION: FAILED -', error.message.split('\n')[0]);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
