import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log('Forgot password request for:', email);
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      console.log('User not found in database:', email);
      return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' });
    }

    console.log('User found, generating token for:', user.name);
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await prisma.user.update({
      where: { email },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });

    console.log('Calling sendPasswordResetEmail...');
    await sendPasswordResetEmail(email, token, user.name);
    return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
