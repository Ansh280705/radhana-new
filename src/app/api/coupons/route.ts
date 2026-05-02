import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (code) {
      const coupon = await prisma.coupon.findFirst({
        where: { code: code.toUpperCase(), isActive: true, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      });
      if (!coupon) return NextResponse.json({ error: 'Invalid or expired coupon' }, { status: 404 });
      return NextResponse.json(coupon);
    }
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const data = await req.json();
    const coupon = await prisma.coupon.create({ data: { ...data, code: data.code.toUpperCase() } });
    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await req.json();
    await prisma.coupon.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
