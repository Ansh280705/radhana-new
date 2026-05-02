import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const [totalUsers, totalOrders, totalProducts, revenueResult, recentOrders, topProducts] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.product.count(),
      prisma.order.aggregate({ where: { paymentStatus: 'PAID' }, _sum: { totalAmount: true } }),
      prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true, email: true } }, items: true } }),
      prisma.orderItem.groupBy({
        by: ['productId'], _sum: { quantity: true }, orderBy: { _sum: { quantity: 'desc' } }, take: 5,
      }),
    ]);
    return NextResponse.json({
      stats: { totalUsers, totalOrders, totalProducts, totalRevenue: revenueResult._sum.totalAmount || 0 },
      recentOrders,
      topProducts,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
