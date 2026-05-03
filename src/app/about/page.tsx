'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--dark)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          filter: 'grayscale(100%)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif" 
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 5rem)', 
              color: 'white', 
              marginBottom: 16,
              fontWeight: 700 
            }}
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              width: 100, 
              height: 3, 
              background: 'var(--gold)', 
              margin: '0 auto' 
            }} 
          />
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '120px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 80, alignItems: 'center' }}>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: 32, color: 'var(--dark)', lineHeight: 1.1 }}>
                A Vision of <span style={{ color: 'var(--gold)' }}>Elegance</span>
              </h2>
              <p style={{ 
                fontSize: '1.25rem', 
                lineHeight: 1.8, 
                color: 'var(--text-primary)', 
                fontFamily: "'Playfair Display', serif",
                marginBottom: 40,
                borderLeft: '4px solid var(--gold)',
                paddingLeft: 30
              }}>
                Sawariya Fashion was born from a vision — to redefine contemporary style through timeless elegance and uncompromising quality. What began as a humble idea, crafted with passion and precision, has evolved into a brand that celebrates sophistication in every detail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '1.15rem', lineHeight: 2, color: 'var(--text-secondary)', marginBottom: 32 }}>
                  From the very beginning, our focus has been clear: to create garments that blend modern aesthetics with refined craftsmanship. Each collection is thoughtfully designed, each fabric carefully selected, and every stitch perfected to deliver an experience of true luxury.
                </p>
                <p style={{ fontSize: '1.15rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
                  Today, Sawariya Fashion proudly extends its presence across Ratlam, Dhar, and Manasa, with each store reflecting our commitment to excellence and our journey of growth.
                </p>
              </div>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'var(--beige)', borderRadius: '50%', zIndex: 0, opacity: 0.5 }} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              marginTop: 120, 
              background: 'var(--dark)', 
              color: 'white', 
              padding: '80px clamp(24px, 5vw, 100px)', 
              borderRadius: 30, 
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '40%', height: '200%', background: 'var(--gold)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />
            <h2 className="font-serif" style={{ fontSize: '2.8rem', marginBottom: 24, position: 'relative', zIndex: 1 }}>A Statement of Individuality</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 2, opacity: 0.8, maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
              More than a fashion label, Sawariya Fashion is a statement — of confidence, grace, and individuality. We believe style is not just worn, but experienced.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ textAlign: 'center', marginTop: 100 }}
          >
            <p style={{ 
              fontSize: '1.8rem', 
              color: 'var(--gold)', 
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: 16
            }}>
              Elegance, Redefined.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto' }}>
              And as we continue to grow, our promise remains the same — to bring you elegance, redefined.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
