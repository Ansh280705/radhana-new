import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const email = 'radhanafashio@admin.com';
const password = 'radhana123';
const name = 'Radhana Admin';

try {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, password: hashedPassword, role: 'ADMIN' },
    create: { name, email, password: hashedPassword, role: 'ADMIN' },
    select: { id: true, name: true, email: true, role: true },
  });

  console.log('Admin user ready:', user);
} catch (error) {
  console.error('Failed:', error.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
