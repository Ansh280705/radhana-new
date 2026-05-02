import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: { product: { include: { category: { select: { name: true } } } } },
    });
    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { productId, quantity = 1, size, color } = await req.json();
    const existing = await prisma.cartItem.findFirst({
      where: { userId: user.userId, productId, size: size || null, color: color || null },
    });
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      });
      return NextResponse.json(updated);
    }
    const item = await prisma.cartItem.create({
      data: { userId: user.userId, productId, quantity, size, color },
      include: { product: true },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id, quantity } = await req.json();
    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id } });
      return NextResponse.json({ message: 'Removed' });
    }
    const item = await prisma.cartItem.update({ where: { id }, data: { quantity }, include: { product: true } });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await req.json();
    await prisma.cartItem.delete({ where: { id } });
    return NextResponse.json({ message: 'Removed' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
