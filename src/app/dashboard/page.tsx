
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, User, Settings, LogOut, ChevronRight, Package, Heart } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) router.push('/login');
  }, [user, router]);

  if (!mounted || !user) return null;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
            {/* Sidebar */}
            <aside style={{ background: 'white', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', height: 'fit-content' }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem', fontWeight: 800, color: 'var(--dark)' }}>
                  {user.name[0].toUpperCase()}
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.2rem' }}>{user.name}</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{user.email}</p>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { href: '/dashboard', icon: <User size={18} />, label: 'Profile Overview' },
                  { href: '/dashboard/orders', icon: <Package size={18} />, label: 'My Orders' },
                  { href: '/wishlist', icon: <Heart size={18} />, label: 'My Wishlist' },
                  { href: '/cart', icon: <ShoppingBag size={18} />, label: 'My Cart' },
                ].map((item) => (
                  <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, textDecoration: 'none', color: router.pathname === item.href ? 'var(--gold)' : '#475569', background: router.pathname === item.href ? 'var(--beige)' : 'transparent', fontWeight: 600, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--beige)'; e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={e => { if(router.pathname !== item.href) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; } }}>
                    {item.icon} {item.label}
                  </Link>
                ))}
                <button onClick={() => { clearUser(); router.push('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 600, marginTop: 16 }}>
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'white', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0' }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', marginBottom: 12 }}>Welcome back, {user.name.split(' ')[0]}!</h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Manage your orders, track shipments, and update your style preferences all in one place.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <Link href="/dashboard/orders" style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', transition: 'all 0.3s' }} className="hover-glow">
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: 20 }}>
                      <Package size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>Track Orders</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20 }}>View your order history and track the status of your current shipments.</p>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>View History <ChevronRight size={16} /></span>
                  </div>
                </Link>

                <Link href="/wishlist" style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', transition: 'all 0.3s' }} className="hover-glow">
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', marginBottom: 20 }}>
                      <Heart size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>My Wishlist</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20 }}>Revisit the items you've saved and add them to your cart with ease.</p>
                    <span style={{ color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>View Wishlist <ChevronRight size={16} /></span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
