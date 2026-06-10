'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      setUser(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      router.push(res.data.user.role === 'ADMIN' ? '/admin' : '/');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, var(--cream) 0%, var(--beige) 100%)' }}>
        <div style={{ width: '100%', maxWidth: 460, background: 'white', borderRadius: 24, padding: 40, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: 8 }}>
              <span style={{ color: 'var(--dark)' }}>Radhana</span>
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}> Fashion</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 6, fontSize: '0.9rem' }}>Email</label>
              <input className="input-field" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
            </div>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 6, fontSize: '0.9rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="input-field" type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: -8 }}>
              <Link href="/forgot-password" style={{ color: 'var(--gold)', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>Forgot Password?</Link>
            </div>
            <button type="submit" className="btn-gold" disabled={loading} style={{ padding: '14px', fontSize: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <><span className="spinner" />Signing in...</> : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
