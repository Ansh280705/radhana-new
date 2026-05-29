'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Tag, Truck, Shield, RefreshCw } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { productsAPI, categoriesAPI, bannersAPI, reviewsAPI } from '@/lib/api';
import Loading from './loading';

const HERO_SLIDES = [
  { 
    title: 'Heritage Revived', 
    subtitle: 'A contemporary tribute to Indian craftsmanship. Hand-finished silhouettes for the modern soul.', 
    cta: 'Explore The Atelier', 
    ctaLink: '/products?category=ethnic-wear', 
    badge: 'HANDCRAFTED IN INDIA', 
    bg: '#0a0a0b', 
    img: '/cat-ethnic.png' 
  },
  { 
    title: 'Modern Festive', 
    subtitle: 'Celebrate tradition with our exclusive range of contemporary ethnic wear.', 
    cta: 'Shop Now', 
    ctaLink: '/products?sort=price_asc', 
    badge: 'NEW SEASON', 
    bg: '#0a0a0b', 
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200' 
  },
];

const CATEGORIES = [
  { name: "Women", slug: 'women', subtitle: 'Grace Redefined', img: '/cat-women.png' },
  { name: "Men", slug: 'men', subtitle: 'Modern Royalty', img: '/cat-men.png' },
  { name: "Accessories", slug: 'accessories', subtitle: 'Statement Luxury', img: '/cat-accessories.png' },
  { name: "Ethnic", slug: 'ethnic-wear', subtitle: 'Heritage Elegance', img: '/cat-ethnic.png' },
];

const FEATURES = [
  { icon: <Truck size={20} strokeWidth={1.5} />, title: 'Complimentary Delivery', desc: 'On all orders above ₹999' },
  { icon: <Shield size={20} strokeWidth={1.5} />, title: 'Authenticated', desc: 'Guaranteed genuine quality' },
  { icon: <RefreshCw size={20} strokeWidth={1.5} />, title: 'No Returns Policy', desc: 'Please note we do not provide returns' },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = useCallback(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      try {
        const [feat, newArr, bannerRes, reviewRes] = await Promise.all([
          productsAPI.getAll({ featured: 'true', limit: 8 }),
          productsAPI.getAll({ newArrival: 'true', limit: 8 }),
          bannersAPI.getAll(),
          reviewsAPI.getAll(),
        ]);
        
        setProducts(feat.data.products || []);
        setNewArrivals(newArr.data.products || []);
        setBanners(bannerRes.data || []);
        setReviews(reviewRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime);
        setTimeout(() => setLoading(false), remainingTime);
      }
    };

    fetchData();
  }, []);

  const slide = HERO_SLIDES[heroIdx];

  return (
    <>
      {loading && <Loading />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out', pointerEvents: loading ? 'none' : 'auto' }}>
        <Navbar />
        <main className="no-overflow" style={{ background: 'var(--cream)' }}>
          <HeroSection />
        </main>

        {/* Collections Section */}
        <section 
          style={{ 
            padding: '120px 0', 
            background: '#F8F6F2',
            position: 'relative'
          }}
        >
          {/* Subtle noise/texture background effect */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'radial-gradient(#000 1px, transparent 0), radial-gradient(#000 1px, transparent 0)', backgroundSize: '8px 8px', backgroundPosition: '0 0, 4px 4px', pointerEvents: 'none' }} />
          
          <div className="container">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', marginBottom: '64px' }}
            >
              <span 
                style={{ 
                  color: '#D4AF37', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  letterSpacing: '6px', 
                  textTransform: 'uppercase', 
                  marginBottom: 16, 
                  display: 'block' 
                }}
              >
                OUR COLLECTIONS
              </span>
              <h2 
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--dark)',
                  marginBottom: 16,
                  letterSpacing: '-0.01em'
                }}
              >
                Discover Timeless Elegance
              </h2>
              <p 
                style={{ 
                  color: 'var(--text-secondary)', 
                  maxWidth: '600px', 
                  margin: '0 auto', 
                  fontSize: '1.05rem',
                  lineHeight: 1.6
                }}
              >
                Curated ethnic couture crafted for modern celebrations and timeless traditions.
              </p>
            </motion.div>
            
            {/* Collections Grid/Slider */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '32px'
              }}
              className="collections-grid-responsive"
            >
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                >
                  <Link href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                      style={{ 
                        position: 'relative', 
                        height: '550px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        transition: 'border-color 0.4s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                        const img = e.currentTarget.querySelector('.col-img') as HTMLImageElement;
                        if (img) img.style.transform = 'scale(1.08)';
                        const line = e.currentTarget.querySelector('.col-line') as HTMLDivElement;
                        if (line) line.style.width = '60px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                        const img = e.currentTarget.querySelector('.col-img') as HTMLImageElement;
                        if (img) img.style.transform = 'scale(1)';
                        const line = e.currentTarget.querySelector('.col-line') as HTMLDivElement;
                        if (line) line.style.width = '0px';
                      }}
                    >
                      {/* Background Image with Slow Zoom transition */}
                      <img 
                        src={cat.img} 
                        alt={cat.name}
                        className="col-img"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
                        }}
                      />
                      
                      {/* Premium Luxury Gradient Overlay */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          inset: 0, 
                          background: 'linear-gradient(to top, rgba(7, 7, 8, 0.85) 0%, rgba(7, 7, 8, 0.3) 50%, transparent 100%)', 
                          transition: 'background 0.4s ease'
                        }} 
                      />
                      
                      {/* Bottom-Aligned Elegant Content */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: '40px 32px',
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center'
                        }}
                      >
                        <h3 
                          style={{ 
                            color: 'white', 
                            fontSize: '2rem', 
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 600,
                            letterSpacing: '1px',
                            marginBottom: '8px'
                          }}
                        >
                          {cat.name}
                        </h3>

                        {/* Gold Animated Underline */}
                        <div 
                          className="col-line"
                          style={{
                            width: '0px',
                            height: '1.5px',
                            background: '#D4AF37',
                            margin: '4px 0 14px',
                            transition: 'width 0.4s ease'
                          }}
                        />

                        <p 
                          style={{ 
                            color: '#D4AF37', 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            letterSpacing: '3px', 
                            textTransform: 'uppercase',
                            margin: 0
                          }}
                        >
                          {cat.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Selection */}
        <section style={{ padding: 'var(--s10) 0', background: 'white' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>The Edit</span>
                <h2 style={{ marginBottom: 0 }}>Featured Selection</h2>
              </div>
              <Link href="/products" style={{ color: 'var(--dark)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', borderBottom: '1px solid var(--gold)' }}>
                View All
              </Link>
            </div>

            {loading ? (
              <div className="products-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 400 }} />)}</div>
            ) : (
              <div className="products-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </section>


        {/* Newsletter: Exclusive Access */}
        // Premium Newsletter & Brand Experience Section
<section style={{ padding: 'var(--s12) 0', background: 'var(--dark)', color: 'white', position: 'relative' }}>
  <div className="container" style={{ maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
    {/* Left Campaign Image */}
    <div style={{ flex: '1 1 400px', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
      <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80" alt="RADHANA Couture" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)' }}
      />
    </div>
    {/* Right Content */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      viewport={{ once: true, margin: '-100px' }}
      style={{ flex: '1 1 400px', maxWidth: '500px' }}
    >
      <span style={{ color: '#D4AF37', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
        EXCLUSIVE MEMBERSHIP
      </span>
      <h2 style={{ color: 'white', marginBottom: '16px', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
        Become a Part of the RADHANA Circle
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6 }}>
        Access private sales, early arrivals, curated editorial stories, and bespoke styling tips.
      </p>
      {/* Glass‑morphic Subscription Form */}
      <form style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '16px' }}>
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          required
          style={{ flex: '1 1 200px', background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '0.9rem', padding: '12px', fontFamily: "'Inter', sans-serif" }}
        />
        <button type="submit" style={{ background: '#D4AF37', color: 'var(--dark)', border: 'none', padding: '12px 24px', fontWeight: 700, letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.3s' }}>
          SUBSCRIBE
        </button>
      </form>
    </motion.div>
  </div>
</section>

        {/* Dynamic Promotional Banners */}
        {banners.length > 0 && (
          <section style={{ padding: 'var(--s10) 0' }}>
            <div className="container">
              {banners.map((banner, i) => (
                <div key={banner.id || i} style={{ 
                  position: 'relative', 
                  borderRadius: 0, 
                  overflow: 'hidden', 
                  minHeight: 400, 
                  display: 'flex', 
                  alignItems: 'center',
                  background: 'var(--dark)',
                  marginBottom: i === banners.length - 1 ? 0 : 40
                }}>
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                  />
                  <div style={{ position: 'relative', zIndex: 2, padding: '60px', maxWidth: 600 }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16, display: 'block' }}>
                      Limited Collection
                    </span>
                    <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: 16 }}>{banner.title}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: 32 }}>{banner.subtitle}</p>
                    {banner.link && (
                      <Link href={banner.link} style={{ textDecoration: 'none' }}>
                        <button className="btn-gold" style={{ padding: '14px 40px' }}>Explore Now</button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Premium Static CTA Banner */}
        <section style={{ padding: 'var(--s12) 0', background: 'var(--dark)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', height: '80%', background: 'var(--gold)', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)', padding: '8px 24px', borderRadius: 0, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '4px', marginBottom: 32, textTransform: 'uppercase' }}>
              <Sparkles size={14} /> Season Finale
            </span>
            <h2 style={{ color: 'white', marginBottom: 24, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>The Summer Collection Sale</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', fontSize: '1.1rem' }}>
              Exceptional silhouettes for a refined wardrobe. Now available with curated seasonal pricing.
            </p>
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-gold" style={{ padding: '18px 48px', borderRadius: 0 }}>Shop the Sale</button>
            </Link>
          </div>
        </section>

        {/* The House of Sanwaria: Editorial Story */}
        <section style={{ padding: 'var(--s10) 0', background: 'white' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="mobile-stack">
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
                   <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200" alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: -30, left: -30, width: '100%', height: '100%', border: '1px solid var(--gold)', zIndex: 1 }} />
              </div>
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>The Atelier India</span>
                <h2 style={{ marginBottom: 32 }}>Legacy of the Loom</h2>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: 24, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
                  "We believe that fashion is a dialogue between the artisan and the individual. Our Indian ateliers preserve centuries of textile heritage."
                </p>
                <p style={{ marginBottom: 40, color: 'var(--text-secondary)' }}>
                  From the intricate hand-embroidery of Lucknow to the timeless silks of Varanasi, Sanwaria represents the pinnacle of Indian artisanal excellence.
                </p>
                <Link href="/about" style={{ textDecoration: 'none', color: 'var(--dark)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px solid var(--gold)', paddingBottom: 4 }}>
                  The Artisan Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Client Voices */}
        <section style={{ padding: 'var(--s12) 0', background: 'var(--cream)', textAlign: 'center' }}>
          <div className="container">
            <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>Client Voices</span>
            <h2 style={{ marginBottom: 24 }}>The Sanwaria Experience</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 64, maxWidth: 600, margin: '0 auto 64px' }}>
              Real perspectives from our global community of discerning clients.
            </p>
            
            {reviews.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginBottom: 64 }} className="mobile-stack">
                {reviews.map((r, i) => (
                  <div key={r.id || i} style={{ padding: 40, background: 'white', textAlign: 'left', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: 4, color: 'var(--gold)', marginBottom: 20 }}>
                      {[...Array(5)].map((_, idx) => (
                        <Sparkles key={idx} size={12} fill={idx < r.rating ? 'var(--gold)' : 'transparent'} opacity={idx < r.rating ? 1 : 0.2} />
                      ))}
                    </div>
                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--dark)', marginBottom: 24, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', minHeight: '80px' }}>
                      "{r.comment}"
                    </p>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--gold)', marginBottom: 4 }}>{r.user?.name?.toUpperCase()}</p>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>RE: {r.product?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '60px 0', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                <p>No reviews yet. Be the first to share your experience.</p>
              </div>
            )}

            <Link href="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-gold" style={{ padding: '16px 48px', borderRadius: 0 }}>Share Your Experience</button>
            </Link>
          </div>
        </section>

        {/* Boutique Services */}
        <section style={{ padding: 'var(--s10) 0', background: 'var(--dark)', color: 'white' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="mobile-stack">
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>Concierge</span>
                <h2 style={{ color: 'white', marginBottom: 32 }}>The Boutique Experience</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 48, fontSize: '1.1rem' }}>
                  Enjoy a personalized journey with our exclusive client services designed to bring the Sanwaria atelier to your doorstep.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {[
                    { title: 'Private Styling', desc: 'Book a session with our master stylists for a curated wardrobe update.' },
                    { title: 'Virtual Consultation', desc: 'Experience the collection from anywhere with our digital atelier services.' },
                    { title: 'Tailoring & Alterations', desc: 'Ensure the perfect fit with our bespoke hand-finishing services.' },
                  ].map((s, i) => (
                    <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 32 }}>
                      <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: 8 }}>{s.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" alt="Concierge" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Factors */}
        <section style={{ padding: 'var(--s12) 0', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', gap: 80, flexWrap: 'wrap' }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ textAlign: 'center', maxWidth: 200 }}>
                  <div style={{ color: 'var(--gold)', marginBottom: 20, display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                  <p style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8, color: 'var(--dark)' }}>{f.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'white',
            color: 'var(--dark)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            zIndex: 100,
            display: showBackToTop ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            transition: 'all 0.3s',
          }}
        >
          <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />
        </button>
      
      <Footer />
      </div>
    </>
  );
}
