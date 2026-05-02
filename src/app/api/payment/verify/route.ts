import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { prisma } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();
    const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: 'PAID', paymentId: razorpay_payment_id, status: 'CONFIRMED' },
    });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
