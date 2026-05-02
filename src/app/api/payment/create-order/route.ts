import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { authenticateRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { amount, currency = 'INR' } = await req.json();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay order error:', error);
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}
