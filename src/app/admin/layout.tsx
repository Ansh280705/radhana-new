'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Tag, Image, ShoppingCart, Users, Ticket, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { href: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/admin/products', icon: <Package size={18} />, label: 'Products' },
  { href: '/admin/categories', icon: <Tag size={18} />, label: 'Categories' },
  { href: '/admin/banners', icon: <Image size={18} />, label: 'Banners' },
  { href: '/admin/orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
  { href: '/admin/users', icon: <Users size={18} />, label: 'Users' },
  { href: '/admin/coupons', icon: <Ticket size={18} />, label: 'Coupons' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'ADMIN') { router.push('/'); toast.error('Admin access only'); }
  }, [user, isHydrated]);

  const handleLogout = async () => {
    try { await authAPI.logout(); } catch {}
    clearUser();
    router.push('/');
  };

  if (!isHydrated) return <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" style={{ width: 40, height: 40, borderColor: 'rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)' }} /></div>;
  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className="admin-wrapper" style={{ display: 'flex', width: '100%', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="sidebar-overlay"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 199 }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{ width: 240, background: 'var(--dark)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 200, transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'white', marginBottom: 4 }}>
              Sawariya <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Admin</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Control Panel</p>
          </div>
          <button className="mobile-only" onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map(({ href, icon, label }) => (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', transition: 'all 0.2s', borderLeft: '3px solid transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderLeftColor = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderLeftColor = 'transparent'; }}>
              <span style={{ color: 'var(--gold)' }}>{icon}</span> {label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 12, fontSize: '0.85rem' }}>← View Store</Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.88rem', padding: 0 }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', transition: 'margin-left 0.3s' }}>
        {/* Topbar */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button className="mobile-only" onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--dark)', cursor: 'pointer', padding: 0 }}>
              <Menu size={24} />
            </button>
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.88rem' }} className="desktop-only">Welcome back, <span style={{ color: 'var(--dark)' }}>{user.name}</span> 👋</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--dark)', fontSize: '0.9rem' }}>
              {user.name[0].toUpperCase()}
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }} className="desktop-only">{user.name}</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px)' }}>{children}</div>
      </main>

      <style jsx>{`
        .admin-sidebar { transform: translateX(0); }
        .admin-main { margin-left: 240px; }
        .mobile-only { display: none; }
        .sidebar-overlay { display: none; }

        @media (max-width: 1024px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-main { margin-left: 0; }
          .mobile-only { display: block; }
          .desktop-only { display: none; }
          .sidebar-overlay { display: block; }
        }
      `}</style>
    </div>
  );
}
