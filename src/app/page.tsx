'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Tag, Truck, Shield, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { productsAPI, categoriesAPI, bannersAPI } from '@/lib/api';

const HERO_SLIDES = [
  { title: 'New Season Arrivals', subtitle: 'Discover the finest fashion crafted for modern elegance', cta: 'Shop Now', ctaLink: '/products?newArrival=true', badge: 'NEW COLLECTION 2026', color: '#1a1a2e', accent: '#c9a84c', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)', img: '/hero-2026.png' },
  { title: 'Season Sale', subtitle: 'Up to 50% off on premium clothing & accessories', cta: 'Shop Sale', ctaLink: '/products?sort=price_asc', badge: 'UP TO 50% OFF', color: '#1a1a2e', accent: '#c9a84c', bg: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)', img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format' },
  { title: 'Ethnic Elegance', subtitle: 'Celebrate tradition with contemporary ethnic wear collections', cta: 'Explore', ctaLink: '/products?category=ethnic-wear', badge: 'FESTIVAL SPECIAL', color: '#1a1a2e', accent: '#c9a84c', bg: 'linear-gradient(135deg, #4a0e0e 0%, #8b1a1a 100%)', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format' },
];

const CATEGORIES = [
  { name: "Women's Fashion", slug: 'women', subtitle: 'Modern Elegance', img: '/cat-women.png' },
  { name: "Men's Style", slug: 'men', subtitle: 'Classic & Sharp', img: '/cat-men.png' },
  { name: 'Kids Wear', slug: 'kids', subtitle: 'Playful Trends', img: '/cat-kids.png' },
  { name: 'Ethnic Wear', slug: 'ethnic-wear', subtitle: 'Heritage Fusion', img: '/cat-ethnic.png' },
  { name: 'Accessories', slug: 'accessories', subtitle: 'The Final Touch', img: '/cat-accessories.png' },
  { name: 'Western Wear', slug: 'western-wear', subtitle: 'Urban Essentials', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600&h=750' },
];

const FEATURES = [
  { icon: <Truck size={28} />, title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: <Shield size={28} />, title: '100% Authentic', desc: 'Guaranteed genuine products' },
  { icon: <RefreshCw size={28} />, title: 'Easy Returns', desc: '7-day hassle-free returns' },
  { icon: <Tag size={28} />, title: 'Best Prices', desc: 'Lowest price guaranteed' },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = useCallback(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), []);
  const prevSlide = useCallback(() => setHeroIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    Promise.all([
      productsAPI.getAll({ featured: 'true', limit: 8 }),
      productsAPI.getAll({ newArrival: 'true', limit: 8 }),
    ]).then(([feat, newArr]) => {
      setProducts(feat.data.products || []);
      setNewArrivals(newArr.data.products || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const slide = HERO_SLIDES[heroIdx];  return (
    <>
      <Navbar />
      <main className="no-overflow">
        {/* Hero Section */}
        <section style={{ position: 'relative', minHeight: 'clamp(600px, 90vh, 900px)', background: slide.bg, overflow: 'hidden', transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'center' }}>
          {/* Animated Background Blobs */}
          <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: '45%', height: '70%', background: 'var(--gold)', filter: 'blur(160px)', opacity: 0.12, borderRadius: '50%', animation: 'softFloat 12s infinite ease-in-out' }} />
          <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '35%', height: '60%', background: '#4a3aff', filter: 'blur(160px)', opacity: 0.08, borderRadius: '50%', animation: 'softFloat 15s infinite ease-in-out reverse' }} />

          <div className="container" style={{ position: 'relative', zIndex: 2, padding: 'var(--s10) var(--container-padding)' }}>
            <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div key={heroIdx} className="animate-fadeIn" style={{ maxWidth: 650 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }} className="animate-scaleIn">
                  <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
                  <span style={{ color: 'var(--gold-light)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase' }}>{slide.badge}</span>
                </div>
                <h1 className="animate-scaleIn font-serif" style={{ fontWeight: 700, lineHeight: 1.1, marginBottom: 24, color: 'white', fontSize: 'clamp(2.2rem, 10vw, 4.5rem)' }}>
                  {slide.title}
                </h1>
                <p className="animate-fadeIn" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 36, maxWidth: 520, lineHeight: 1.7, fontSize: 'clamp(1rem, 3vw, 1.15rem)' }}>
                  {slide.subtitle}
                </p>
                <div className="hero-actions" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Link href={slide.ctaLink} style={{ textDecoration: 'none', flex: '1 1 auto', minWidth: 200 }}>
                    <button className="btn-gold hover-glow" style={{ width: '100%', padding: '16px 32px' }}>{slide.cta}</button>
                  </Link>
                  <Link href="/products" style={{ textDecoration: 'none', flex: '1 1 auto', minWidth: 200 }}>
                    <button className="btn-outline hover-glow" style={{ width: '100%', padding: '16px 32px', color: 'white', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
                      Explore More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="hidden-mobile animate-scaleIn" style={{ perspective: '1200px', maxWidth: 500 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                  <img src={slide.img} alt={slide.title} onError={e => { e.currentTarget.style.display = 'none'; }} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', opacity: 0.95, boxShadow: '30px 30px 60px rgba(0,0,0,0.4)', transform: 'rotateY(-8deg) rotateX(2deg)', transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)' }} 
                    onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.02)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(-8deg) rotateX(2deg) scale(1)'}
                  />
                  <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderLeft: '2px solid var(--gold)', borderBottom: '2px solid var(--gold)', zIndex: -1 }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 3 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? 32 : 8, height: 2, background: i === heroIdx ? 'var(--gold)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.6s' }} />
            ))}
          </div>
        </section>

        {/* Features Strip */}
        <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
          <div className="container">
            <div className="features-grid">
              {FEATURES.map(({ icon, title, desc }, i) => (
                <div key={title} className="animate-fadeIn" style={{ display: 'flex', alignItems: 'center', gap: 20, animationDelay: `${i * 0.1}s` }}>
                  <span style={{ color: 'var(--gold)', background: 'var(--beige)', padding: 14, borderRadius: '4px', display: 'flex' }}>{icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2, letterSpacing: '0.5px', color: 'var(--dark)' }}>{title}</p>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Designer Quote */}
        <section className="section" style={{ background: 'var(--cream)', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <span style={{ fontSize: '4rem', color: 'var(--gold)', fontFamily: 'serif', opacity: 0.2, display: 'block', marginBottom: -20 }}>"</span>
            <p className="font-serif" style={{ fontStyle: 'italic', color: 'var(--dark)', lineHeight: 1.6, marginBottom: 32 }}>
              True fashion is not about what you wear, but the story you tell through your elegance. Every piece in our collection is a chapter of that story.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Aria Savaria, Founder</p>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="section" style={{ background: '#ffffff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 className="section-title">Shop by Category</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>Find your perfect style across our curated collections</p>
            </div>
            
            <div className="category-grid">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                      <img 
                        src={cat.img} 
                        alt={cat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        className="hover-scale"
                      />
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{cat.name}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>{cat.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: 8, paddingBottom: 4, borderBottom: '2px solid rgba(201,168,76,0.2)' }}>
                  View All Collections &nbsp; →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Top Picks</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Products</h2>
              </div>
              <Link href="/products?featured=true" style={{ textDecoration: 'none' }}>
                <button 
                  style={{ 
                    background: '#f6f8fa', 
                    border: '1px solid #d0d7de', 
                    borderRadius: '6px', 
                    padding: '8px 16px', 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: '#24292f',
                    cursor: 'pointer',
                    boxShadow: '0 1px 0 rgba(27,31,35,0.04)'
                  }}
                >
                  Explore All
                </button>
              </Link>
            </div>
            {loading ? (
              <div className="products-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 400 }} />)}</div>
            ) : products.length > 0 ? (
              <div className="products-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--cream)', borderRadius: 12 }}>
                <p style={{ color: 'var(--text-secondary)' }}>No featured products found.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', height: '80%', background: 'var(--gold)', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)', padding: '8px 20px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', marginBottom: 28, textTransform: 'uppercase' }}>
              <Sparkles size={14} /> Season Finale
            </span>
            <h2 style={{ color: 'white', marginBottom: 20 }}>Up to 50% Off on Ethnic Wear</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>Embrace the elegance of tradition with our exclusive festive range.</p>
            <Link href="/products">
              <button className="btn-gold">Shop the Sale</button>
            </Link>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Just Landed</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>New Arrivals</h2>
              </div>
              <Link href="/products?newArrival=true" style={{ textDecoration: 'none' }}>
                <button 
                  style={{ 
                    background: '#f6f8fa', 
                    border: '1px solid #d0d7de', 
                    borderRadius: '6px', 
                    padding: '8px 16px', 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: '#24292f',
                    cursor: 'pointer',
                    boxShadow: '0 1px 0 rgba(27,31,35,0.04)'
                  }}
                >
                  View Latest
                </button>
              </Link>
            </div>
            {loading ? (
              <div className="products-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 400 }} />)}</div>
            ) : newArrivals.length > 0 ? (
              <div className="products-grid">{newArrivals.map(p => <ProductCard key={p.id} product={p} />)}</div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                <p>New arrivals coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Floating Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-glow"
          style={{ 
            position: 'fixed', bottom: 30, right: 30, width: 50, height: 50, borderRadius: 4, 
            background: 'var(--dark)', color: 'white', border: 'none', cursor: 'pointer', zIndex: 100, 
            display: showBackToTop ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.3s'
          }}
        >
          <ChevronRight size={24} style={{ transform: 'rotate(-90deg)' }} />
        </button>
      </main>
      <Footer />

      <style jsx>{`
        .hover-scale { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-scale:hover { transform: scale(1.08); }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
