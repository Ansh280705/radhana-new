'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { MapPin, Heart, Star, Sparkles } from 'lucide-react';

const STATS = [
  { value: '3+', label: 'Stores Across MP' },
  { value: '5K+', label: 'Happy Customers' },
  { value: '500+', label: 'Curated Styles' },
  { value: '2019', label: 'Est. Year' },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Crafted with Passion',
    desc: 'Every garment we create carries the heart of our artisans. We pour love into each stitch, ensuring the finished piece feels as extraordinary as it looks.',
  },
  {
    icon: Star,
    title: 'Uncompromising Quality',
    desc: 'We source only the finest fabrics and materials. From hand-embroidered lehengas to everyday ethnic wear, quality is never an afterthought — it is our foundation.',
  },
  {
    icon: Sparkles,
    title: 'Timeless Elegance',
    desc: 'Trends fade. Elegance endures. Our collections are designed to transcend seasons, giving you pieces you will reach for year after year.',
  },
  {
    icon: MapPin,
    title: 'Rooted in Ratlam',
    desc: 'Born in the heart of Madhya Pradesh, RADHANA Klothing carries the cultural richness of Central India in every collection — modern silhouettes with a traditional soul.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          height: '70vh',
          minHeight: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--dark)',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url("https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2127&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: 0.35,
          }}
        />

        {/* Gold glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '6px' }}
            animate={{ opacity: 1, letterSpacing: '10px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Our Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: 28,
              fontWeight: 700,
            }}
          >
            Where Tradition Meets{' '}
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Couture</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 80, height: 2, background: 'var(--gold)', margin: '0 auto' }}
          />
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--dark)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              background: 'rgba(212,175,55,0.12)',
            }}
          >
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                  background: 'var(--dark)',
                }}
              >
                <p
                  className="font-serif"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--gold)', fontWeight: 700, marginBottom: 8 }}
                >
                  {value}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: 'var(--cream)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(40px, 6vw, 100px)',
              alignItems: 'center',
            }}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -16,
                  left: -16,
                  right: 16,
                  bottom: 16,
                  border: '2px solid var(--gold)',
                  borderRadius: 20,
                  opacity: 0.35,
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=987&auto=format&fit=crop"
                alt="RADHANA Klothing atelier"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  borderRadius: 20,
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              {/* Floating tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 32,
                  right: -24,
                  zIndex: 2,
                  background: 'var(--dark)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: 16,
                  padding: '20px 28px',
                  textAlign: 'center',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
              >
                <p className="font-serif" style={{ fontSize: '2rem', color: 'var(--gold)', fontWeight: 700, lineHeight: 1 }}>Est.</p>
                <p className="font-serif" style={{ fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>2019</p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 4 }}>Ratlam, MP</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16 }}>
                Who We Are
              </p>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--dark)', lineHeight: 1.15, marginBottom: 28 }}>
                A Vision of <span style={{ color: 'var(--gold)' }}>Elegance</span>, Born in Central India
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.9,
                  color: 'var(--text-secondary)',
                  fontFamily: "'Playfair Display', serif",
                  borderLeft: '3px solid var(--gold)',
                  paddingLeft: 24,
                  marginBottom: 32,
                  fontStyle: 'italic',
                }}
              >
                "RADHANA Klothing was born from a single belief — that every woman deserves to feel extraordinary, every single day."
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-secondary)', marginBottom: 20 }}>
                Founded in 2019 in the culturally rich city of Ratlam, Madhya Pradesh, RADHANA Klothing started as a passion project with a clear mission: to blend the timeless beauty of Indian ethnic wear with the clean lines of modern couture.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-secondary)' }}>
                What began as a single studio has grown into a beloved brand with stores across Ratlam, Dhar, and Manasa — each one a curated experience built around our customers. Every collection is a conversation between heritage and the contemporary, between craft and elegance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16 }}>
              What Drives Us
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--dark)' }}>
              Our Core Values
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  padding: '40px 32px',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 20,
                  background: 'var(--cream)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(212,175,55,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(212,175,55,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                  }}
                >
                  <Icon size={22} color="var(--gold)" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: 14 }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Statement ─────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 140px) 0',
          background: 'var(--dark)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold ambient glow */}
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '100%', background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 20 }}>
              Our Promise
            </p>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'white', lineHeight: 1.2, maxWidth: 820, margin: '0 auto 32px' }}
            >
              More than fashion — a{' '}
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>statement of who you are</span>
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', maxWidth: 680, margin: '0 auto 48px' }}>
              We believe fashion is personal. It is the first thing the world sees and the last thing you take off. RADHANA Klothing exists to make that statement extraordinary — through lehengas, ethnic couture, and everyday elegance that speaks before you do.
            </p>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/products"
                style={{
                  padding: '16px 40px',
                  background: 'var(--gold)',
                  color: 'var(--dark)',
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Shop the Collection
              </a>
              <a
                href="/founder"
                style={{
                  padding: '16px 40px',
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 50,
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'white'; }}
              >
                Meet the Founders
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stores ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16 }}>
              Find Us
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--dark)' }}>
              Our Stores
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { city: 'Ratlam', desc: 'Our flagship — where it all began.', tag: 'Flagship' },
              { city: 'Dhar', desc: "Bringing Ratlam's elegance to Dhar.", tag: 'Store' },
              { city: 'Manasa', desc: 'The newest chapter in our journey.', tag: 'New' },
            ].map(({ city, desc, tag }, i) => (
              <motion.div
                key={city}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  padding: '36px 32px',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 20,
                  background: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    background: 'rgba(212,175,55,0.1)',
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  {tag}
                </span>
                <MapPin size={28} color="var(--gold)" strokeWidth={1.5} style={{ marginBottom: 16 }} />
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--dark)', marginBottom: 10 }}>{city}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
