// src/components/home/HeroSection.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    title: 'Heritage Revived',
    subtitle: 'A contemporary tribute to Indian craftsmanship. Hand-finished silhouettes for the modern soul.',
    cta: 'Explore The Atelier',
    ctaLink: '/products?category=ethnic-wear',
    badge: 'HANDCRAFTED IN INDIA',
    bg: '#0a0a0b',
    img: '/hero-new.jpg',
  },
  {
    title: 'Timeless Rose',
    subtitle: 'Draped in grace and embroidered in gold — a festive silhouette crafted for the modern muse.',
    cta: 'Shop The Collection',
    ctaLink: '/products?category=ethnic-wear',
    badge: 'FESTIVE EDIT',
    bg: '#0a0a0b',
    img: '/hero-2.jpg',
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function HeroSection() {
  const [heroIdx, setHeroIdx] = useState(0);
  const isMobile = useIsMobile();
  const nextSlide = useCallback(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[heroIdx];

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        height: '100svh',
        width: '100%',
        overflow: 'hidden',
        background: '#070708',
      }}
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isMobile ? 0.75 : 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // On mobile, show the right side of the image (the model)
                objectPosition: isMobile ? 'right center' : 'center 20%',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay — portrait/bottom on mobile, side on desktop */}
        {isMobile ? (
          <>
            {/* Strong bottom-to-top gradient for mobile readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(7,7,8,0.97) 0%, rgba(7,7,8,0.82) 35%, rgba(7,7,8,0.45) 60%, rgba(7,7,8,0.15) 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Top vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(7,7,8,0.4) 0%, transparent 20%)',
                pointerEvents: 'none',
              }}
            />
          </>
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(7,7,8,0.9) 0%, rgba(7,7,8,0.6) 45%, rgba(7,7,8,0.15) 100%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 20% 50%, transparent 20%, rgba(7,7,8,0.55) 80%)',
                pointerEvents: 'none',
              }}
            />
          </>
        )}
      </div>

      {/* Floating Golden Particles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: isMobile ? 0.25 : 0.4,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* ─── MOBILE LAYOUT ─────────────────────────────────────── */}
      {isMobile ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 24px 48px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
                exit: { opacity: 0 },
              }}
            >
              {/* Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  color: 'var(--gold)',
                  marginBottom: '14px',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                }}
              >
                <Sparkles size={11} style={{ opacity: 0.85 }} />
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {slide.badge}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{
                  color: 'white',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.6rem, 10vw, 3.4rem)',
                  lineHeight: 1.05,
                  fontWeight: 600,
                  marginBottom: '14px',
                  letterSpacing: '-0.02em',
                }}
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  fontWeight: 400,
                  marginBottom: '28px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA Buttons — full width on mobile */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}
              >
                <Link href={slide.ctaLink} style={{ textDecoration: 'none' }}>
                  <button
                    className="btn-gold"
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: 0,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '2.5px',
                      textTransform: 'uppercase',
                      backgroundColor: 'var(--gold)',
                      color: 'var(--dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {slide.cta}
                    <ChevronRight size={15} />
                  </button>
                </Link>

                <Link href="/media" style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      borderRadius: 0,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Play size={11} fill="white" />
                    Watch Lookbook
                  </button>
                </Link>
              </motion.div>

              {/* Stats Row — compact horizontal */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '20px',
                  gap: '0',
                }}
              >
                {[
                  { value: '5000+', label: 'Customers' },
                  { value: '100+', label: 'Designs' },
                  { value: '4.9★', label: 'Rating' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      alignItems: 'center',
                      borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                      padding: '0 8px',
                    }}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.58rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: 600,
                        textAlign: 'center',
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
      ) : (
        // ─── DESKTOP LAYOUT ────────────────────────────────────
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                  exit: { opacity: 0 },
                }}
              >
                {/* Badge */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--gold)',
                    marginBottom: '20px',
                  }}
                >
                  <Sparkles size={13} style={{ opacity: 0.8 }} />
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    ✦ {slide.badge} ✦
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
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

                {/* Subtitle */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{
                    color: 'rgba(255,255,255,0.75)',
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

                {/* CTAs */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}
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
                        color: 'var(--dark)',
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
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'white';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                      }}
                    >
                      <Play size={12} fill="white" />
                      Watch Lookbook
                    </button>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '28px',
                    maxWidth: '560px',
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    { value: '5000+', label: 'Happy Customers' },
                    { value: '100+', label: 'Exclusive Designs' },
                    { value: '4.9★', label: 'Customer Rating' },
                  ].map((stat, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span
                        style={{
                          color: 'white',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.45)',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          fontWeight: 600,
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
      )}

      {/* Bottom bar — desktop only */}
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
          pointerEvents: 'none',
        }}
        className="hidden-mobile"
      >
        <span
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          SINCE 2020
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.65rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 700,
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
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ y: [0, 35] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '8px',
                background: 'var(--gold)',
                position: 'absolute',
                top: 0,
              }}
            />
          </div>
        </div>

        <span
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          ATELIER FASHION
        </span>
      </div>

      {/* Mobile slide dots */}
      {isMobile && HERO_SLIDES.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            zIndex: 4,
            display: 'flex',
            gap: '6px',
          }}
        >
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              style={{
                width: i === heroIdx ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === heroIdx ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
