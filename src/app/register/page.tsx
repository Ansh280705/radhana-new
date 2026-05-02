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

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await authAPI.register(form);
      setUser(res.data.user, res.data.token);
      toast.success(`Welcome to Savaria Fashion, ${res.data.user.name}!`);
      router.push('/');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, var(--cream) 0%, var(--beige) 100%)' }}>
        <div style={{ width: '100%', maxWidth: 480, background: 'white', borderRadius: 24, padding: 40, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: 8 }}>
              <span style={{ color: 'var(--dark)' }}>Savaria</span>
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}> Fashion</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Join the Savaria community</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Ansh Sharma' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6, fontSize: '0.9rem' }}>{label}</label>
                <input className="input-field" type={type} placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required={key !== 'phone'} />
              </div>
            ))}
            {['password', 'confirmPassword'].map(key => (
              <div key={key}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6, fontSize: '0.9rem' }}>{key === 'password' ? 'Password' : 'Confirm Password'}</label>
                <div style={{ position: 'relative' }}>
                  <input className="input-field" type={showPass ? 'text' : 'password'} required minLength={6} placeholder="Min 6 characters" value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ paddingRight: 44 }} />
                  {key === 'password' && (
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="submit" className="btn-gold" disabled={loading} style={{ padding: '14px', fontSize: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
              {loading ? <><span className="spinner" />Creating account...</> : <>Create Account <ArrowRight size={18} /></>}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
