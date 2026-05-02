'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { productsAPI } from '@/lib/api';

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) { setLoading(false); return; }
    Promise.all(ids.map(id => productsAPI.getOne(id).catch(() => null)))
      .then(results => setProducts(results.filter(Boolean).map(r => r!.data)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <>
      <Navbar />
      <main style={{ padding: '32px 0 60px', minHeight: '80vh' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>My Wishlist</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>{ids.length} saved item{ids.length !== 1 ? 's' : ''}</p>
          {!user && (
            <div style={{ background: '#fef3cd', border: '1px solid #f59e0b', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>⚠️</span>
              <p style={{ fontSize: '0.9rem' }}>Your wishlist is saved locally. <Link href="/login" style={{ color: 'var(--gold)', fontWeight: 700 }}>Sign in</Link> to sync across devices.</p>
            </div>
          )}
          {loading ? (
            <div className="products-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 380, borderRadius: 16 }} />)}</div>
          ) : products.length > 0 ? (
            <div className="products-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
              <Heart size={60} style={{ margin: '0 auto 20px', color: '#e5e7eb' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Your wishlist is empty</h3>
              <p style={{ marginBottom: 24 }}>Save items you love and find them here easily</p>
              <Link href="/products"><button className="btn-gold" style={{ padding: '14px 32px' }}>Explore Products</button></Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
