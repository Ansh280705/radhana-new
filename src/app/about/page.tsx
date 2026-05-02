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
      <section style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p style={{ 
                fontSize: '1.4rem', 
                lineHeight: 1.8, 
                color: 'var(--dark)', 
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', serif",
                marginBottom: 40,
                borderLeft: '4px solid var(--gold)',
                paddingLeft: 30
              }}>
                Savaria Fashion was born from a vision — to redefine contemporary style through timeless elegance and uncompromising quality. What began as a humble idea, crafted with passion and precision, has evolved into a brand that celebrates sophistication in every detail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p style={{ fontSize: '1.1rem', lineHeight: 2, color: 'var(--text-secondary)', marginBottom: 24 }}>
                From the very beginning, our focus has been clear: to create garments that blend modern aesthetics with refined craftsmanship. Each collection is thoughtfully designed, each fabric carefully selected, and every stitch perfected to deliver an experience of true luxury.
              </p>
              
              <p style={{ fontSize: '1.1rem', lineHeight: 2, color: 'var(--text-secondary)', marginBottom: 24 }}>
                Today, Savaria Fashion proudly extends its presence across Ratlam, Dhar, and Manasa, with each store reflecting our commitment to excellence and our journey of growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ background: 'var(--beige)', padding: 60, borderRadius: 20, textAlign: 'center' }}
            >
              <h2 className="font-serif" style={{ fontSize: '2.2rem', marginBottom: 24, color: 'var(--dark)' }}>A Statement of Individuality</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
                More than a fashion label, Savaria Fashion is a statement — of confidence, grace, and individuality. We believe style is not just worn, but experienced.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ textAlign: 'center', paddingTop: 40 }}
            >
              <p style={{ 
                fontSize: '1.5rem', 
                color: 'var(--gold)', 
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Elegance, Redefined.
              </p>
              <p style={{ marginTop: 16, color: 'var(--text-secondary)', maxWidth: 600, margin: '16px auto 0' }}>
                And as we continue to grow, our promise remains the same — to bring you elegance, redefined.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
