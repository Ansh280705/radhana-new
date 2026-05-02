import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: user.userId },
      include: { product: { include: { category: { select: { name: true } } } } },
    });
    return NextResponse.json(wishlist);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { productId } = await req.json();
    const existing = await prisma.wishlistItem.findFirst({ where: { userId: user.userId, productId } });
    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ added: false });
    }
    await prisma.wishlistItem.create({ data: { userId: user.userId, productId } });
    return NextResponse.json({ added: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
