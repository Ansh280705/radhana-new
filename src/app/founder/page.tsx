'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { MapPin, Quote } from 'lucide-react';

export default function FounderPage() {
  const founders = [
    {
      name: 'Shubham Chouhan',
      role: 'Co-Founder',
      location: 'Ratlam',
      image: '/team/co-founder.jpg',
    },
    {
      name: 'Piyush Rathore',
      role: 'Founder',
      location: 'Ratlam',
      image: '/team/founder.jpg',
    }
  ];

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 0 60px', 
        background: 'linear-gradient(to bottom, var(--beige) 0%, white 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif" 
            style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', marginBottom: 16 }}
          >
            The Minds Behind <span style={{ color: 'var(--gold)' }}>Savaria</span>
          </motion.h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
            Meet the visionaries who brought Savaria Fashion to life from the heart of Ratlam.
          </p>
        </div>
      </section>

      {/* Founders Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 40,
            maxWidth: 1000,
            margin: '0 auto'
          }}>
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="card"
                style={{ overflow: 'hidden', border: 'none', background: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}
              >
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      // Fallback if image not found
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop';
                    }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '30px', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    color: 'white'
                  }}>
                    <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: 4 }}>{founder.name}</h2>
                    <p style={{ color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>{founder.role}</p>
                  </div>
                </div>
                <div style={{ padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)' }}>
                  <MapPin size={18} color="var(--gold)" />
                  <span style={{ fontWeight: 600 }}>{founder.location}, India</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section style={{ padding: '100px 0', background: 'var(--dark)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.05 }}>
          <Quote size={200} color="var(--gold)" />
        </div>
        <div className="container" style={{ maxWidth: 800, position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem' }}>A Personal Message</span>
            <h2 className="font-serif" style={{ fontSize: '3.5rem', marginTop: 16 }}>Founder’s Note</h2>
          </div>
          
          <div style={{ fontSize: '1.25rem', lineHeight: 2, opacity: 0.9, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p>
              Savaria Fashion was founded with a vision to bring refined elegance and modern style to everyday fashion. What started as a small initiative has grown into a trusted name, built on dedication, craftsmanship, and a deep understanding of style.
            </p>
            <p>
              Our journey began from the ground up, driven by passion and a commitment to quality. Today, with our presence in Ratlam, Dhar, and Manasa, we continue to evolve while staying true to our roots.
            </p>
            <p>
              Every collection we create reflects our belief — that fashion is not just about clothing, but about confidence, identity, and expression.
            </p>
            
            <div style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40 }}>
              <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '1.4rem' }}>
                — Founder, Savaria Fashion
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
