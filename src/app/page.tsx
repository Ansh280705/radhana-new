'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Tag, Truck, Shield, RefreshCw } from 'lucide-react';
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
  { name: "Women", slug: 'women', subtitle: 'Elegance Redefined', img: '/cat-women.png' },
  { name: "Men", slug: 'men', subtitle: 'Refined Classics', img: '/cat-men.png' },
  { name: "Accessories", slug: 'accessories', subtitle: 'Subtle Accents', img: '/cat-accessories.png' },
  { name: "Ethnic", slug: 'ethnic-wear', subtitle: 'Heritage', img: '/cat-ethnic.png' },
];

const FEATURES = [
  { icon: <Truck size={20} strokeWidth={1.5} />, title: 'Complimentary Delivery', desc: 'On all orders above ₹999' },
  { icon: <Shield size={20} strokeWidth={1.5} />, title: 'Authenticated', desc: 'Guaranteed genuine quality' },
  { icon: <RefreshCw size={20} strokeWidth={1.5} />, title: 'Seamless Returns', desc: '7-day boutique returns' },
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

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <main className="no-overflow" style={{ background: 'var(--cream)' }}>
        {/* Hero Section */}
        <section style={{ position: 'relative', minHeight: '75vh', background: slide.bg, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
            <img 
              key={heroIdx}
              src={slide.img} 
              alt="" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'opacity 1.5s' }} 
              className="animate-fadeIn"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.4) 50%, transparent 100%)' }} />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: 600 }} className="animate-slideInLeft">
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>
                {slide.badge}
              </span>
              <h1 style={{ color: 'white', marginBottom: 24 }}>{slide.title}</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 48, maxWidth: 450, fontSize: '1.1rem' }}>
                {slide.subtitle}
              </p>
              <div style={{ display: 'flex', gap: 24 }}>
                <Link href={slide.ctaLink} style={{ textDecoration: 'none' }}>
                  <button className="btn-gold" style={{ padding: '18px 48px', borderRadius: 0 }}>{slide.cta}</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section style={{ padding: 'var(--s10) 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--s8)' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>Collections</span>
              <h2>Shop the Aesthetic</h2>
            </div>
            
            <div className="category-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
              {CATEGORIES.map((cat, i) => (
                <Link key={cat.slug} href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                    <img 
                      src={cat.img} 
                      alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      className="hover-scale"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 40%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 24px 24px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: 8, letterSpacing: '0.5px' }}>{cat.name}</h3>
                        <p style={{ color: 'var(--gold)', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.9 }}>{cat.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Link>
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

        {/* Our Stores */}
        <section id="our-stores" style={{ padding: 'var(--s12) 0', background: 'white' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 style={{ fontSize: '3rem' }}>Our Stores</h2>
            </div>
            
            <div className="stores-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[
                { name: 'Ratlam', addr: 'Main Bazaar, Ratlam, MP', phone: '+91 7412 234567' },
                { name: 'Dhar', addr: 'City Center Mall, Dhar, MP', phone: '+91 7292 234567' },
                { name: 'Manasa', addr: 'Station Road, Manasa, MP', phone: '+91 7421 234567' },
              ].map((store, i) => (
                <div key={i} style={{ padding: 'clamp(24px, 5vw, 48px)', background: '#f5f0e8', borderRadius: 24, textAlign: 'center' }} className="hover-lift">
                  <h3 style={{ fontSize: '2.2rem', color: 'var(--gold)', marginBottom: 24, fontFamily: "'Cormorant Garamond', serif" }}>{store.name}</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 12, lineHeight: 1.6 }}>{store.addr}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{store.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter: Exclusive Access */}
        <section style={{ padding: 'var(--s12) 0', background: 'var(--dark)', color: 'white', textAlign: 'center', position: 'relative' }}>
          <div className="container" style={{ maxWidth: 600 }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>Membership</span>
            <h2 style={{ color: 'white', marginBottom: 24 }}>Join the Savaria Inner Circle</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 48 }}>
              Receive exclusive access to private sales, new arrivals, and editorial content.
            </p>
            <form style={{ display: 'flex', gap: 0, maxWidth: 500, margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 8 }}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, padding: '12px 0', fontSize: '0.8rem', letterSpacing: '1px', outline: 'none' }} 
              />
              <button style={{ background: 'transparent', border: 'none', color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer' }}>
                SUBSCRIBE
              </button>
            </form>
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

        {/* The House of Savaria: Editorial Story */}
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
                  From the intricate hand-embroidery of Lucknow to the timeless silks of Varanasi, Savaria represents the pinnacle of Indian artisanal excellence.
                </p>
                <Link href="/about" style={{ textDecoration: 'none', color: 'var(--dark)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px solid var(--gold)', paddingBottom: 4 }}>
                  The Artisan Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Minds Behind Savaria: High Editorial Version */}
        <section id="about-us" style={{ padding: 'var(--s14) 0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 100, position: 'relative' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '6px', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>The Visionaries</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: 24, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>
                The Minds Behind <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Savaria</span>
              </h2>
              <div style={{ width: 60, height: 1, background: 'var(--gold)', margin: '0 auto 32px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 700, margin: '0 auto', lineHeight: 1.8, fontStyle: 'italic' }}>
                Bridging the gap between timeless artisanry and contemporary elegance from our atelier in Central India.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 64, alignItems: 'start' }} className="mobile-stack">
              {/* Shubham Chouhan - Founder */}
              <div className="founder-card" style={{ position: 'relative' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', background: '#f9f9f9', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <img 
                    src="/team/co-founder.jpg" 
                    alt="Shubham Chouhan" 
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'transform 1.2s ease' }} 
                    className="portrait-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', opacity: 0.8 }} />
                </div>
                <div style={{ marginTop: 32, textAlign: 'left' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>Founder & Visionary</span>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: 400, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>Shubham Chouhan</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Ratlam, India</span>
                  </div>
                </div>
              </div>

              {/* Piyush Rathore - Co-Founder */}
              <div className="founder-card" style={{ position: 'relative', marginTop: 'clamp(0px, 10vw, 100px)' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', background: '#f9f9f9', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <img 
                    src="/team/founder.jpg" 
                    alt="Piyush Rathore" 
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'transform 1.2s ease' }} 
                    className="portrait-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', opacity: 0.8 }} />
                </div>
                <div style={{ marginTop: 32, textAlign: 'left' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>Co-Founder & Director</span>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: 400, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>Piyush Rathore</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Ratlam, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Note */}
        <section style={{ padding: 'var(--s12) 0', background: '#0a0a0b', color: 'white' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 20, display: 'block' }}>A Personal Message</span>
              <h2 style={{ color: 'white', fontSize: '3rem' }}>Founder's Note</h2>
            </div>
            
            <div style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              <p style={{ marginBottom: 32 }}>
                Savaria Fashion was founded with a vision to bring refined elegance and modern style to everyday fashion. What started as a small initiative has grown into a trusted name, built on dedication, craftsmanship, and a deep understanding of style.
              </p>
              <p style={{ marginBottom: 32 }}>
                Our journey began from the ground up, driven by passion and a commitment to quality. Today, with our presence in Ratlam, Dhar, and Manasa, we continue to evolve while staying true to our roots.
              </p>
              <p style={{ marginBottom: 60 }}>
                Every collection we create reflects our belief — that fashion is not just about clothing, but about confidence, identity, and expression.
              </p>
              
              <div style={{ height: '1px', width: '100px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 40px' }} />
              
              <p style={{ color: 'var(--gold)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem' }}>
                — Founder, Savaria Fashion
              </p>
            </div>
          </div>
        </section>


        {/* Real Client Experiences: Reviews */}
        <section style={{ padding: 'var(--s12) 0', background: 'var(--cream)', textAlign: 'center' }}>
          <div className="container">
            <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, display: 'block' }}>Client Voices</span>
            <h2 style={{ marginBottom: 24 }}>The Savaria Experience</h2>
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
                  Enjoy a personalized journey with our exclusive client services designed to bring the Savaria atelier to your doorstep.
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
            position: 'fixed', bottom: 40, right: 40, width: 44, height: 44, borderRadius: '50%',
            background: 'white', color: 'var(--dark)', border: '1px solid var(--border)', cursor: 'pointer', zIndex: 100, 
            display: showBackToTop ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'all 0.3s'
          }}
        >
          <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />
        </button>
      </main>
      <Footer />

      <style jsx>{`
        .hover-scale { transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-scale:hover { transform: scale(1.05); }
        .stores-grid { transition: all 0.4s ease; }
        .founder-card:hover .portrait-img { transform: scale(1.08); filter: grayscale(0%); }
        .founder-card:hover h3 { color: var(--gold); transition: color 0.4s ease; }
        @media (max-width: 1024px) {
          .category-grid, .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 991px) {
          .stores-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .stores-grid { grid-template-columns: 1fr !important; }
          .founder-card { margin-top: 0 !important; margin-bottom: 60px; }
        }
        @media (max-width: 480px) {
          .category-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </>
  );
}
