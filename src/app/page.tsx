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
    img: '/hero-new.jpg' 
  },
  { 
    title: 'Modern Festive', 
    subtitle: 'Celebrate tradition with our exclusive range of contemporary ethnic wear.', 
    cta: 'Shop Now', 
    ctaLink: '/products?sort=price_asc', 
    badge: 'NEW SEASON', 
    bg: '#0a0a0b', 
    img: '/hero-new.jpg' 
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            padding: '140px 0', 
            background: '#FAF9F6',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Elegant Background Accents */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '50%', height: '70%', background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  padding: '8px 24px',
                  borderRadius: '50px',
                  marginBottom: '24px'
                }}
              >
                <Sparkles size={14} style={{ color: '#D4AF37' }} />
                <span 
                  style={{ 
                    color: '#D4AF37', 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    letterSpacing: '4px', 
                    textTransform: 'uppercase' 
                  }}
                >
                  OUR COLLECTIONS
                </span>
              </motion.div>
              
              <h2 
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                Discover Timeless <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Elegance</span>
              </h2>
              
              <p 
                style={{ 
                  color: '#666666', 
                  maxWidth: '580px', 
                  margin: '0 auto', 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  fontWeight: 400
                }}
              >
                Curated ethnic couture crafted for modern celebrations and timeless traditions. Each piece tells a story of heritage and sophistication.
              </p>
            </motion.div>
            
            {/* Collections Grid */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '40px'
              }}
              className="collections-grid-responsive"
            >
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ 
                        y: -12,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      style={{ 
                        position: 'relative', 
                        height: '580px',
                        overflow: 'hidden',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        background: '#fff',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        transition: 'box-shadow 0.5s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 20px 60px rgba(212,175,55,0.15)';
                        const img = e.currentTarget.querySelector('.col-img') as HTMLImageElement;
                        if (img) img.style.transform = 'scale(1.1)';
                        const overlay = e.currentTarget.querySelector('.col-overlay') as HTMLDivElement;
                        if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.4) 40%, transparent 100%)';
                        const line = e.currentTarget.querySelector('.col-line') as HTMLDivElement;
                        if (line) line.style.width = '80px';
                        const arrow = e.currentTarget.querySelector('.col-arrow') as HTMLDivElement;
                        if (arrow) arrow.style.opacity = '1';
                        if (arrow) arrow.style.transform = 'translateX(0)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                        const img = e.currentTarget.querySelector('.col-img') as HTMLImageElement;
                        if (img) img.style.transform = 'scale(1)';
                        const overlay = e.currentTarget.querySelector('.col-overlay') as HTMLDivElement;
                        if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.3) 50%, transparent 100%)';
                        const line = e.currentTarget.querySelector('.col-line') as HTMLDivElement;
                        if (line) line.style.width = '0px';
                        const arrow = e.currentTarget.querySelector('.col-arrow') as HTMLDivElement;
                        if (arrow) arrow.style.opacity = '0';
                        if (arrow) arrow.style.transform = 'translateX(10px)';
                      }}
                    >
                      {/* Background Image */}
                      <img 
                        src={cat.img} 
                        alt={cat.name}
                        className="col-img"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)' 
                        }}
                      />
                      
                      {/* Premium Gradient Overlay */}
                      <div 
                        className="col-overlay"
                        style={{ 
                          position: 'absolute', 
                          inset: 0, 
                          background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.3) 50%, transparent 100%)', 
                          transition: 'background 0.5s ease'
                        }} 
                      />
                      
                      {/* Content */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: '48px 36px',
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          textAlign: 'left'
                        }}
                      >
                        <h3 
                          style={{ 
                            color: 'white', 
                            fontSize: '2.5rem', 
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            marginBottom: '12px',
                            lineHeight: 1.1
                          }}
                        >
                          {cat.name}
                        </h3>

                        {/* Gold Animated Underline */}
                        <div 
                          className="col-line"
                          style={{
                            width: '0px',
                            height: '2px',
                            background: '#D4AF37',
                            margin: '0 0 16px',
                            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <p 
                            style={{ 
                              color: '#D4AF37', 
                              fontSize: '0.8rem', 
                              fontWeight: 700, 
                              letterSpacing: '3px', 
                              textTransform: 'uppercase',
                              margin: 0
                            }}
                          >
                            {cat.subtitle}
                          </p>
                          
                          {/* Arrow Icon */}
                          <motion.div
                            className="col-arrow"
                            style={{
                              opacity: 0,
                              transform: 'translateX(10px)',
                              transition: 'all 0.4s ease',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <ChevronRight size={18} style={{ color: '#D4AF37' }} />
                          </motion.div>
                        </div>
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


        {/* Newsletter: Exclusive Access - Ultra-Premium Luxury Redesign */}
        <section style={{ padding: isMobile ? '80px 0' : '160px 0', background: '#070707', color: '#F7F3EE', position: 'relative', overflow: 'hidden' }}>
          {/* Premium Grain Texture Overlay */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 0.03, 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")',
            pointerEvents: 'none' 
          }} />
          
          {/* Soft Vignette */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(7,7,7,0.4) 100%)', 
            pointerEvents: 'none' 
          }} />
          
          {/* Luxury Spotlight Lighting */}
          <div style={{ 
            position: 'absolute', 
            top: '-30%', 
            right: '10%', 
            width: '60%', 
            height: '80%', 
            background: 'radial-gradient(ellipse at center, rgba(201,164,106,0.04) 0%, transparent 60%)', 
            filter: 'blur(100px)', 
            pointerEvents: 'none' 
          }} />
          
          <div className="container" style={{ maxWidth: 1400, display: 'flex', flexWrap: 'wrap', gap: isMobile ? '48px' : '100px', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ flex: '1 1 280px', maxWidth: isMobile ? '100%' : '580px', width: '100%' }}
            >
              {/* Exclusive Membership Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 } }}
                viewport={{ once: true }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  background: 'rgba(201,164,106,0.06)', 
                  border: '1px solid rgba(201,164,106,0.15)', 
                  padding: '12px 28px', 
                  borderRadius: '2px', 
                  marginBottom: '40px'
                }}
              >
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  background: '#C9A46A', 
                  borderRadius: '50%',
                  boxShadow: '0 0 12px rgba(201,164,106,0.4)'
                }} />
                <span style={{ 
                  color: '#C9A46A', 
                  fontSize: '0.65rem', 
                  fontWeight: 600, 
                  letterSpacing: '5px', 
                  textTransform: 'uppercase' 
                }}>
                  EXCLUSIVE MEMBERSHIP
                </span>
              </motion.div>

              {/* Editorial Heading */}
              <h1 style={{ 
                color: '#F7F3EE', 
                marginBottom: '28px', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: isMobile ? 'clamp(2.2rem, 8vw, 3rem)' : 'clamp(3rem, 6vw, 4.5rem)', 
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.03em'
              }}>
                Enter the World of <span style={{ color: '#C9A46A', fontStyle: 'italic', fontWeight: 500 }}>RADHANA</span>
              </h1>

              {/* Refined Description */}
              <p style={{ 
                color: 'rgba(247,243,238,0.6)', 
                marginBottom: '48px', 
                lineHeight: 1.9,
                fontSize: isMobile ? '0.92rem' : '1.05rem',
                fontWeight: 300,
                letterSpacing: '0.02em',
                maxWidth: isMobile ? '100%' : '520px'
              }}>
                Private access, curated experiences, exclusive collections, and timeless style reserved for members.
              </p>

              {/* Membership Benefits with Elegant Minimal Icons */}
              <div style={{ marginBottom: '48px', display: 'grid', gap: '18px' }}>
                {[
                  { icon: '◇', text: 'Private Collection Access' },
                  { icon: '◇', text: 'Priority New Arrivals' },
                  { icon: '◇', text: 'Personal Style Concierge' },
                  { icon: '◇', text: 'Members-Only Events' },
                  { icon: '◇', text: 'Birthday Privileges' },
                  { icon: '◇', text: 'Exclusive Editorial Content' }
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 + idx * 0.08 } }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                  >
                    <span style={{ 
                      color: '#C9A46A', 
                      fontSize: '0.9rem', 
                      fontWeight: 200,
                      letterSpacing: '2px'
                    }}>
                      {benefit.icon}
                    </span>
                    <span style={{ 
                      color: 'rgba(247,243,238,0.75)', 
                      fontSize: '0.9rem', 
                      fontWeight: 300,
                      letterSpacing: '0.05em'
                    }}>
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Luxury Frosted Glass Signup Component */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.7 } }}
                viewport={{ once: true }}
                style={{ position: 'relative' }}
              >
                <form style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '0' : '16px', 
                  background: 'rgba(247,243,238,0.02)', 
                  backdropFilter: 'blur(40px)', 
                  border: '1px solid rgba(201,164,106,0.12)', 
                  borderRadius: '4px', 
                  padding: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Subtle metallic reflection */}
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '1px', 
                    background: 'linear-gradient(90deg, transparent, rgba(201,164,106,0.3), transparent)',
                    pointerEvents: 'none' 
                  }} />
                  
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    style={{ 
                      flex: 1, 
                      background: 'transparent', 
                      border: 'none', 
                      outline: 'none', 
                      color: '#F7F3EE', 
                      fontSize: '0.95rem', 
                      padding: '18px 24px', 
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ 
                      backgroundColor: '#D4B078',
                      boxShadow: '0 0 30px rgba(201,164,106,0.2)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ 
                      background: '#C9A46A', 
                      color: '#070707', 
                      border: 'none', 
                      padding: isMobile ? '16px 24px' : '18px 36px', 
                      fontWeight: 500, 
                      letterSpacing: '2px', 
                      cursor: 'pointer', 
                      fontSize: '0.75rem',
                      borderRadius: '2px',
                      position: 'relative',
                      zIndex: 1,
                      textTransform: 'uppercase',
                      width: isMobile ? '100%' : 'auto'
                    }}
                  >
                    Request Membership
                  </motion.button>
                </form>
                
                {/* Privacy Note */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(247,243,238,0.3)', fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                  <div style={{ width: '4px', height: '4px', background: '#C9A46A', borderRadius: '50%', opacity: 0.5 }} />
                  <span>Private & Secure</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side: 3D Floating Black Metal Membership Card */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ 
                flex: '1 1 280px', 
                position: 'relative', 
                display: isMobile ? 'none' : 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                perspective: '1000px'
              }}
            >
              {/* Soft Spotlight Glow Behind Card */}
              <div style={{ 
                position: 'absolute', 
                width: '400px', 
                height: '500px', 
                background: 'radial-gradient(ellipse at center, rgba(201,164,106,0.08) 0%, transparent 70%)', 
                filter: 'blur(60px)',
                pointerEvents: 'none'
              }} />
              
              {/* 3D Floating Black Metal Membership Card */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateX: [0, 2, 0],
                  rotateY: [0, -2, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                style={{ 
                  position: 'relative',
                  width: '360px',
                  height: '460px',
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 50%, #070707 100%)',
                  borderRadius: '16px',
                  boxShadow: 
                    '0 50px 100px rgba(0,0,0,0.8), ' +
                    '0 30px 60px rgba(0,0,0,0.6), ' +
                    'inset 0 1px 0 rgba(255,255,255,0.05), ' +
                    'inset 0 -1px 0 rgba(0,0,0,0.3)',
                  border: '1px solid rgba(201,164,106,0.15)',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Metallic Foil Texture Overlay */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                  pointerEvents: 'none' 
                }} />
                
                {/* Subtle Grain Texture */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  opacity: 0.04,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")',
                  pointerEvents: 'none' 
                }} />
                
                {/* Elegant Decorative Lines */}
                <div style={{ 
                  position: 'absolute', 
                  top: '40px', 
                  left: '40px', 
                  right: '40px', 
                  height: '1px', 
                  background: 'linear-gradient(90deg, transparent, rgba(201,164,106,0.3), transparent)' 
                }} />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '40px', 
                  left: '40px', 
                  right: '40px', 
                  height: '1px', 
                  background: 'linear-gradient(90deg, transparent, rgba(201,164,106,0.3), transparent)' 
                }} />
                
                {/* Embossed Gold R Logo */}
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.02, 1],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: 'easeInOut' 
                    }}
                    style={{
                      fontSize: '120px',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      color: '#C9A46A',
                      letterSpacing: '-8px',
                      textShadow: 
                        '0 2px 4px rgba(0,0,0,0.8), ' +
                        '0 0 40px rgba(201,164,106,0.3), ' +
                        'inset 0 -2px 4px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                    }}
                  >
                    R
                  </motion.div>
                  
                  {/* Membership Card Text */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '0.6rem', 
                      fontWeight: 500, 
                      letterSpacing: '4px', 
                      color: 'rgba(201,164,106,0.7)', 
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}>
                      Membership Card
                    </div>
                    <div style={{ 
                      fontSize: '0.5rem', 
                      fontWeight: 300, 
                      letterSpacing: '2px', 
                      color: 'rgba(247,243,238,0.4)',
                      textTransform: 'uppercase'
                    }}>
                      Exclusive Access
                    </div>
                  </div>
                </div>
                
                {/* Corner Accents */}
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  left: '20px', 
                  width: '12px', 
                  height: '12px', 
                  borderLeft: '1px solid rgba(201,164,106,0.3)', 
                  borderTop: '1px solid rgba(201,164,106,0.3)' 
                }} />
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  width: '12px', 
                  height: '12px', 
                  borderRight: '1px solid rgba(201,164,106,0.3)', 
                  borderTop: '1px solid rgba(201,164,106,0.3)' 
                }} />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  left: '20px', 
                  width: '12px', 
                  height: '12px', 
                  borderLeft: '1px solid rgba(201,164,106,0.3)', 
                  borderBottom: '1px solid rgba(201,164,106,0.3)' 
                }} />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  right: '20px', 
                  width: '12px', 
                  height: '12px', 
                  borderRight: '1px solid rgba(201,164,106,0.3)', 
                  borderBottom: '1px solid rgba(201,164,106,0.3)' 
                }} />
              </motion.div>
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

        {/* Premium Static CTA Banner - Ultra-Premium Luxury Campaign */}
        <section style={{ padding: '200px 0', background: '#111111', color: '#F7F3EE', position: 'relative', overflow: 'hidden' }}>
          {/* Premium Grain Texture */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 0.02, 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")',
            pointerEvents: 'none' 
          }} />
          
          {/* Soft Vignette */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(17,17,17,0.6) 100%)', 
            pointerEvents: 'none' 
          }} />
          
          {/* Subtle Metallic Reflection */}
          <div style={{ 
            position: 'absolute', 
            top: '-50%', 
            left: '-20%', 
            width: '80%', 
            height: '100%', 
            background: 'linear-gradient(135deg, rgba(201,164,106,0.03) 0%, transparent 50%)', 
            filter: 'blur(80px)', 
            pointerEvents: 'none' 
          }} />
          
          <div className="container" style={{ maxWidth: 1000, position: 'relative', zIndex: 2 }}>
            {/* Elegant Divider Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true }}
              style={{ 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, #C9A46A, transparent)', 
                margin: '0 auto 60px'
              }} 
            />
            
            {/* Campaign Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 } }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <span style={{ 
                display: 'inline-block',
                color: '#C9A46A', 
                fontSize: '0.6rem', 
                fontWeight: 500, 
                letterSpacing: '6px', 
                textTransform: 'uppercase',
                opacity: 0.7
              }}>
                Summer 2026
              </span>
            </motion.div>
            
            {/* Massive Editorial Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true }}
              style={{ 
                color: '#F7F3EE', 
                marginBottom: '32px', 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                textAlign: 'center'
              }}
            >
              The Summer Edit
            </motion.h1>
            
            {/* Elegant Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.5 } }}
              viewport={{ once: true }}
              style={{ 
                color: 'rgba(247,243,238,0.5)', 
                marginBottom: '72px', 
                maxWidth: '580px',
                margin: '0 auto 72px',
                fontSize: '1.1rem',
                fontWeight: 300,
                lineHeight: 1.8,
                letterSpacing: '0.03em',
                textAlign: 'center'
              }}
            >
              A curated selection of timeless pieces crafted for the modern gentleman.
            </motion.p>
            
            {/* Elegant CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.7 } }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ 
                    backgroundColor: '#D4B078',
                    letterSpacing: '3px'
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    background: '#C9A46A', 
                    color: '#070707', 
                    border: 'none', 
                    padding: '20px 56px', 
                    fontWeight: 500, 
                    letterSpacing: '2px', 
                    cursor: 'pointer', 
                    fontSize: '0.75rem',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    transition: 'all 0.4s ease'
                  }}
                >
                  Explore Collection
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Bottom Elegant Divider Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px', transition: { duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true }}
              style={{ 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, #C9A46A, transparent)', 
                margin: '80px auto 0'
              }} 
            />
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
