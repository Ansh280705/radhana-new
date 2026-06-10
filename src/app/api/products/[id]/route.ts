import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        category: { select: { name: true, slug: true } },
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized. Please log in again as admin.' }, { status: 401 });

    const body = await req.json();
    const { name, description, categoryId, price, comparePrice, stock, images, sizes, colors, brand, isFeatured, isNewArrival } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name != null && { name: String(name).trim() }),
        ...(description != null && { description: String(description).trim() }),
        ...(categoryId != null && { categoryId }),
        ...(price != null && { price: Number(price) }),
        ...(comparePrice !== undefined && { comparePrice: comparePrice != null && comparePrice !== '' ? Number(comparePrice) : null }),
        ...(stock != null && { stock: Number(stock) }),
        ...(images != null && { images: Array.isArray(images) ? images : [] }),
        ...(sizes != null && { sizes: Array.isArray(sizes) ? sizes : [] }),
        ...(colors != null && { colors: Array.isArray(colors) ? colors : [] }),
        ...(brand !== undefined && { brand: brand?.trim() || null }),
        ...(isFeatured != null && { isFeatured: Boolean(isFeatured) }),
        ...(isNewArrival != null && { isNewArrival: Boolean(isNewArrival) }),
      },
      include: { category: true },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Products PUT error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
