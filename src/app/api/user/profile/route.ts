import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const profile = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { id: true, name: true, email: true, phone: true, avatar: true, role: true, createdAt: true },
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { name, phone, avatar, currentPassword, newPassword } = await req.json();
    const updateData: any = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (avatar) updateData.avatar = avatar;
    if (newPassword) {
      const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
      if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      const valid = await bcrypt.compare(currentPassword, dbUser.password);
      if (!valid) return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
      updateData.password = await bcrypt.hash(newPassword, 12);
    }
    const updated = await prisma.user.update({
      where: { id: user.userId },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, avatar: true, role: true },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
