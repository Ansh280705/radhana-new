'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch { toast.error('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, var(--cream) 0%, var(--beige) 100%)' }}>
        <div style={{ width: '100%', maxWidth: 440, background: 'white', borderRadius: 24, padding: 40, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid var(--border)' }}>
          <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 24, fontSize: '0.9rem' }}><ArrowLeft size={16} /> Back to Login</Link>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>📬</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: 12 }}>Check Your Email!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>We've sent a password reset link to <strong>{email}</strong>. The link expires in 1 hour.</p>
              <Link href="/login"><button className="btn-gold" style={{ width: '100%', padding: '14px' }}>Back to Login</button></Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ width: 60, height: 60, background: 'var(--beige)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--gold)' }}><Mail size={28} /></div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Forgot Password?</h1>
                <p style={{ color: 'var(--text-secondary)' }}>No worries! Enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6, fontSize: '0.9rem' }}>Email Address</label>
                  <input className="input-field" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <button type="submit" className="btn-gold" disabled={loading} style={{ padding: '14px', fontSize: '1rem', width: '100%' }}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
