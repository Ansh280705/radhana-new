import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'RADHANA Clothing <noreply@sanwaria.com>',
      to: email,
      subject: 'Reset Your RADHANA Clothing Password',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center;">
            <h1 style="color: #d4af37; font-size: 28px; margin: 0; letter-spacing: 2px;">RADHANA CLOTHING</h1>
          </div>
          <div style="padding: 40px; background: #fafafa;">
            <h2 style="color: #1a1a2e; margin-bottom: 16px;">Hello, ${name}!</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              You requested a password reset. Click the button below to reset your password. 
              This link will expire in <strong>1 hour</strong>.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #d4af37, #f0c040); color: #1a1a2e; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #999; font-size: 13px;">If you didn't request this, please ignore this email. Your password won't change.</p>
          </div>
          <div style="background: #1a1a2e; padding: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">© 2024 RADHANA Clothing. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    console.log('Password reset email sent successfully to:', email);
  } catch (error) {
    console.error('FAILED to send password reset email:', error);
    throw error;
  }
}

export async function sendOrderConfirmationEmail(email: string, name: string, orderId: string, total: number) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'RADHANA Clothing <noreply@sanwaria.com>',
    to: email,
    subject: `Order Confirmed #${orderId.slice(-8).toUpperCase()} — RADHANA Clothing`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; text-align: center;">
          <h1 style="color: #d4af37; font-size: 28px; margin: 0; letter-spacing: 2px;">RADHANA CLOTHING</h1>
        </div>
        <div style="padding: 40px; background: #fafafa;">
          <h2 style="color: #1a1a2e;">Thank you, ${name}! 🎉</h2>
          <p style="color: #555; font-size: 16px;">Your order has been confirmed and is being processed.</p>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0; color: #666;">Order ID: <strong style="color: #1a1a2e;">#${orderId.slice(-8).toUpperCase()}</strong></p>
            <p style="margin: 8px 0 0; color: #666;">Total: <strong style="color: #d4af37; font-size: 18px;">₹${total.toLocaleString()}</strong></p>
          </div>
          <p style="color: #555;">You'll receive shipping updates via email. Track your order from your dashboard.</p>
        </div>
        <div style="background: #1a1a2e; padding: 20px; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">© 2024 RADHANA Clothing. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}
