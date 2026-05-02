'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown, ChevronRight, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const categories = [
  { name: 'Women', slug: 'women' },
  { name: 'Men', slug: 'men' },
  { name: 'Kids', slug: 'kids' },
  { name: 'Ethnic Wear', slug: 'ethnic-wear' },
  { name: 'Western Wear', slug: 'western-wear' },
  { name: 'Accessories', slug: 'accessories' },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { totalItems } = useCartStore();
  const { user, clearUser } = useAuthStore();
  const { ids: wishlistIds } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch {}
    clearUser();
    toast.success('Logged out successfully');
    router.push('/');
    setUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
        width: scrolled ? '100%' : '0%',
        zIndex: 2001, transition: 'width 0.2s ease-out',
        display: scrolled ? 'block' : 'none'
      }} />

      {/* Top Bar - Hidden on Mobile */}
      <div className="hidden-mobile" style={{ background: 'var(--dark)', color: 'white', padding: '10px 0', fontSize: '0.78rem', textAlign: 'center', letterSpacing: '0.5px' }}>
        <span style={{ color: 'var(--gold)' }}>✨</span> <span style={{ opacity: 0.9 }}>Free shipping on orders above ₹999 &nbsp;|&nbsp; Use code</span> <strong className="text-shimmer" style={{ fontWeight: 800 }}>SAVARIA10</strong> <span style={{ opacity: 0.9 }}>for 10% off</span>
      </div>

      {/* Main Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'white',
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid var(--border)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? 64 : 85, transition: 'height 0.5s ease' }}>

          {/* Left: Hamburger (Mobile) */}
          <button 
            className="show-mobile"
            onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-primary)', marginRight: 16 }}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', zIndex: 10, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, transition: 'transform 0.4s' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: 'var(--dark)', letterSpacing: '-0.5px' }}>Savaria</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 400, color: 'var(--gold)', fontStyle: 'italic', marginLeft: '-2px' }}>Fashion</span>
            </div>
          </Link>

          {/* Center: Desktop Nav Links */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hidden-mobile">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="hover-glow"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px, 1vw, 10px)' }}>
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover-glow" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: 'var(--text-primary)' }}>
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="hover-glow" style={{ textDecoration: 'none', padding: 6, borderRadius: 8, color: 'var(--text-primary)', position: 'relative', display: 'flex' }}>
              <Heart size={18} />
              {mounted && wishlistIds.length > 0 && (
                <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--red)', color: 'white', borderRadius: '50%', width: 14, height: 14, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="hover-glow" style={{ textDecoration: 'none', padding: 6, borderRadius: 8, color: 'var(--text-primary)', position: 'relative', display: 'flex' }}>
              <ShoppingBag size={18} />
              {mounted && totalItems() > 0 && (
                <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--gold)', color: 'var(--dark)', borderRadius: '50%', width: 14, height: 14, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {totalItems()}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '2px solid var(--border)', borderRadius: 50, padding: '6px 12px', cursor: 'pointer', fontSize: '1rem', fontWeight: 500 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                {userMenuOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'white', borderRadius: 12, border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', minWidth: 200, overflow: 'hidden', zIndex: 100 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--beige)' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</p>
                    </div>
                    {[
                      { href: '/dashboard', icon: <LayoutDashboard size={16} />, label: 'My Dashboard' },
                      { href: '/dashboard/orders', icon: <Package size={16} />, label: 'My Orders' },
                      { href: '/wishlist', icon: <Heart size={16} />, label: 'Wishlist' },
                      ...(user.role === 'ADMIN' ? [{ href: '/admin', icon: <LayoutDashboard size={16} />, label: 'Admin Panel' }] : []),
                    ].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--gold)' }}>{item.icon}</span> {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red)', fontSize: '0.9rem', borderTop: '1px solid var(--border)' }}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden-mobile" style={{ textDecoration: 'none' }}>
                <button className="btn-gold" style={{ padding: '8px 20px', fontSize: '1rem', minHeight: 40 }}>Login</button>
              </Link>
            )}


          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '12px 0', background: 'var(--beige)' }}>
            <div className="container">
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
                <input ref={searchRef} className="input-field" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for collections..." style={{ flex: 1 }} />
                <button type="submit" className="btn-gold" style={{ padding: '0 24px', minHeight: 44 }}>Search</button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Slide-in Drawer */}
        <div className={`drawer-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
        <div className={`drawer ${menuOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--dark)' }}>Savaria</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 400, color: 'var(--gold)', fontStyle: 'italic' }}>Fashion</span>
            </div>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase' }}>Collections</p>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} onClick={() => setMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {cat.name}
                <ChevronRight size={18} opacity={0.5} />
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 40, borderTop: '1px solid var(--border)' }}>
            {!user && (
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <button className="btn-gold" style={{ width: '100%', marginBottom: 16 }}>Login / Register</button>
              </Link>
            )}
            <div style={{ display: 'flex', gap: 16, color: 'var(--text-secondary)' }}>
              <Link href="/dashboard" style={{ color: 'inherit' }}><User size={20} /></Link>
              <Link href="/wishlist" style={{ color: 'inherit' }}><Heart size={20} /></Link>
              <Link href="/cart" style={{ color: 'inherit' }}><ShoppingBag size={20} /></Link>
            </div>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
