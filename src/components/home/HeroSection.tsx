// src/components/home/HeroSection.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    title: 'Heritage Revived',
    subtitle: 'A contemporary tribute to Indian craftsmanship. Hand-finished silhouettes for the modern soul.',
    cta: 'Explore The Atelier',
    ctaLink: '/products?category=ethnic-wear',
    badge: 'HANDCRAFTED IN INDIA',
    bg: '#0a0a0b',
    img: '/cat-ethnic.png',
  },
  {
    title: 'Modern Festive',
    subtitle: 'Celebrate tradition with our exclusive range of contemporary ethnic wear.',
    cta: 'Shop Now',
    ctaLink: '/products?sort=price_asc',
    badge: 'NEW SEASON',
    bg: '#0a0a0b',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function HeroSection() {
  const [heroIdx, setHeroIdx] = useState(0);
  const nextSlide = useCallback(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // 8 seconds for a more relaxed, luxury reading pace
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[heroIdx];

  return (
    <section 
      className="hero-section" 
      style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%',
        overflow: 'hidden',
        background: '#070708',
      }}
    >
      {/* Background Image Carousel with Ken Burns Effect */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%' 
            }}
          >
            <img 
              src={slide.img} 
              alt={slide.title} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                objectPosition: 'center 20%' 
              }} 
            />
          </motion.div>
        </AnimatePresence>

        {/* Premium Luxury Overlay */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(90deg, rgba(7,7,8,0.85) 0%, rgba(7,7,8,0.55) 45%, rgba(7,7,8,0.2) 100%)',
            pointerEvents: 'none'
          }} 
        />
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(circle at 20% 50%, transparent 20%, rgba(7,7,8,0.6) 80%)',
            pointerEvents: 'none'
          }} 
        />
      </div>

      {/* Floating Golden Particles (Very subtle luxury effect) */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 2, 
          pointerEvents: 'none',
          opacity: 0.4
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: '50%',
              background: 'var(--gold)',
              top: `${20 + i * 12}%`,
              left: `${15 + i * 14}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 3, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}
      >
        <div style={{ maxWidth: '650px', paddingTop: '40px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  }
                },
                exit: { opacity: 0 }
              }}
            >
              {/* Luxury Label / Brand Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: 'var(--gold)', 
                  marginBottom: '20px' 
                }}
              >
                <Sparkles size={13} style={{ opacity: 0.8 }} />
                <span 
                  style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    letterSpacing: '5px', 
                    textTransform: 'uppercase' 
                  }}
                >
                  ✦ {slide.badge} ✦
                </span>
              </motion.div>

              {/* Main Heading (Editorial Serif) */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{
                  color: 'white',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                  lineHeight: 1.05,
                  fontWeight: 600,
                  marginBottom: '24px',
                  letterSpacing: '-0.02em',
                }}
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  maxWidth: '500px',
                  marginBottom: '40px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Dual CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  flexWrap: 'wrap',
                  marginBottom: '60px'
                }}
              >
                <Link href={slide.ctaLink} style={{ textDecoration: 'none' }}>
                  <button 
                    className="btn-gold" 
                    style={{ 
                      padding: '16px 40px', 
                      borderRadius: 0, 
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      boxShadow: 'none',
                      backgroundColor: 'var(--gold)',
                      color: 'var(--dark)'
                    }}
                  >
                    {slide.cta}
                  </button>
                </Link>
                <Link href="/media" style={{ textDecoration: 'none' }}>
                  <button 
                    style={{ 
                      padding: '16px 36px', 
                      borderRadius: 0, 
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'white';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <Play size={12} fill="white" />
                    Watch Lookbook
                  </button>
                </Link>
              </motion.div>

              {/* Luxury Statistics Row */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '28px',
                  maxWidth: '560px',
                  flexWrap: 'wrap'
                }}
              >
                {[
                  { value: '5000+', label: 'Happy Customers' },
                  { value: '100+', label: 'Exclusive Designs' },
                  { value: '4.9★', label: 'Customer Rating' }
                ].map((stat, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span 
                      style={{ 
                        color: 'white', 
                        fontSize: '1.25rem', 
                        fontWeight: 700, 
                        letterSpacing: '1px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }}
                    >
                      {stat.value}
                    </span>
                    <span 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.45)', 
                        fontSize: '0.7rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px',
                        fontWeight: 600
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Luxury Signature & Scroll Indicator Details at Bottom */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '40px', 
          left: '0', 
          right: '0', 
          zIndex: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 var(--container-padding)',
          pointerEvents: 'none'
        }}
        className="hidden-mobile"
      >
        <span 
          style={{ 
            color: 'rgba(255, 255, 255, 0.35)', 
            fontSize: '0.7rem', 
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700
          }}
        >
          SINCE 2020
        </span>
        
        {/* Animated Scroll Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span 
            style={{ 
              color: 'rgba(255, 255, 255, 0.35)', 
              fontSize: '0.65rem', 
              letterSpacing: '2px', 
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            Scroll
          </span>
          <div 
            style={{ 
              width: '1px', 
              height: '35px', 
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', 
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div 
              animate={{
                y: [0, 35],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                width: '100%',
                height: '8px',
                background: 'var(--gold)',
                position: 'absolute',
                top: 0
              }}
            />
          </div>
        </div>

        <span 
          style={{ 
            color: 'rgba(255, 255, 255, 0.35)', 
            fontSize: '0.7rem', 
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700
          }}
        >
          ATELIER FASHION
        </span>
      </div>
    </section>
  );
}
