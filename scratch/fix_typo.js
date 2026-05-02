
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.category.update({
    where: { slug: 'enthinc-wear' },
    data: {
      name: 'Ethnic Wear',
      slug: 'ethnic-wear'
    }
  });
  console.log('Fixed Category:', result);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
