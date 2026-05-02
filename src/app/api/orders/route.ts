import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateRequest, requireAdmin } from '@/lib/auth';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function GET(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const isAdmin = user.role === 'ADMIN';
    const where: any = isAdmin ? {} : { userId: user.userId };
    if (status) where.status = status;
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: { include: { product: { select: { name: true, images: true } } } },
          address: true,
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);
    return NextResponse.json({ orders, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { items, addressId, couponCode, razorpayOrderId, paymentId } = await req.json();
    
    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      totalAmount += product.price * item.quantity;
    }

    // Apply coupon
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: { code: couponCode.toUpperCase(), isActive: true, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      });
      if (coupon) {
        if (totalAmount >= coupon.minOrderValue) {
          discountAmount = coupon.discountType === 'PERCENTAGE'
            ? (totalAmount * coupon.discountValue) / 100
            : coupon.discountValue;
          await prisma.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
        }
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: user.userId,
        totalAmount: totalAmount - discountAmount,
        discountAmount,
        couponCode,
        addressId,
        razorpayOrderId,
        paymentId,
        paymentStatus: paymentId ? 'PAID' : 'PENDING',
        status: paymentId ? 'CONFIRMED' : 'PENDING',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.price,
          })),
        },
      },
      include: { items: true, address: true },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId: user.userId } });

    // Send confirmation email
    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
    if (dbUser) {
      await sendOrderConfirmationEmail(dbUser.email, dbUser.name, order.id, order.totalAmount).catch(console.error);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
