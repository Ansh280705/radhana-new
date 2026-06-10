import { NextRequest, NextResponse } from 'next/server';
import { razorpay, isRazorpayConfigured } from '@/lib/razorpay';
import { authenticateRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Please log in to continue' }, { status: 401 });

    if (!isRazorpayConfigured() || !razorpay) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured. Add your Razorpay API keys to .env.local' },
        { status: 503 }
      );
    }

    const { amount, currency = 'INR' } = await req.json();
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 1) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(parsedAmount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay order error:', error);
    const message = error?.error?.description || error?.message || 'Payment initiation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
