import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true } },
        product: { select: { name: true, images: true } }
      }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { productId, rating, title, comment } = await req.json();
    const review = await prisma.review.upsert({
      where: { userId_productId: { userId: user.userId, productId } },
      update: { rating, title, comment },
      create: { userId: user.userId, productId, rating, title, comment },
    });
    // Update product rating
    const avg = await prisma.review.aggregate({ where: { productId }, _avg: { rating: true }, _count: true });
    await prisma.product.update({
      where: { id: productId },
      data: { rating: avg._avg.rating || 0, numReviews: avg._count },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
