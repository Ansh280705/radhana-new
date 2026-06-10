import Razorpay from 'razorpay';
import crypto from 'crypto';

const PLACEHOLDER_PATTERNS = ['xxxxxxxx', 'placeholder', 'your_razorpay'];

export function isRazorpayConfigured(): boolean {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  if (!keyId || !keySecret) return false;
  const combined = `${keyId} ${keySecret}`.toLowerCase();
  return !PLACEHOLDER_PATTERNS.some((p) => combined.includes(p));
}

export const razorpay = isRazorpayConfigured()
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  : null;

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex');
  return expectedSignature === signature;
}
