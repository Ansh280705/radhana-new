'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Github, Linkedin } from 'lucide-react';

const developers = [
  {
    name: 'Ansh Rathore',
    initial: 'A',
    role: 'Full Stack Engineer - Lead',
    tag: 'LEAD',
    skills: ['Next.js', 'React', 'UI/UX', 'APIs', 'Razorpay', 'Prisma'],
    github: 'https://github.com/Ansh280705',
    linkedin: 'https://www.linkedin.com/in/ansh-rathore-367a13272/',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    glow: 'rgba(99, 102, 241, 0.2)'
  },
  {
    name: 'Ifrah Qureshi',
    initial: 'I',
    role: 'Frontend Engineer',
    tag: null,
    skills: ['React', 'Next.js', 'UI/UX', 'Tailwind', 'Animations'],
    github: 'https://github.com/Ifrah27',
    linkedin: 'https://www.linkedin.com/in/ifrahqureshi/',
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    glow: 'rgba(16, 185, 129, 0.2)'
  }
];

const DevCard = ({ dev }: { dev: typeof developers[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="card-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{
        width: '320px',
        height: '420px',
        perspective: '1000px',
        position: 'relative'
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundColor: '#1c1c1e',
          borderRadius: '24px',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 20px 40px -10px ${dev.glow}`,
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: dev.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '32px'
          }}>
            {dev.initial}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{dev.name}</h3>
            {dev.tag && (
              <span style={{ 
                fontSize: '10px', 
                fontWeight: 'bold', 
                color: '#818cf8', 
                backgroundColor: 'rgba(129,140,248,0.1)',
                padding: '2px 8px',
                borderRadius: '10px',
                border: '1px solid rgba(129,140,248,0.2)'
              }}>
                {dev.tag}
              </span>
            )}
          </div>

          <p style={{ color: '#8e8e93', fontSize: '14px', marginBottom: '24px' }}>{dev.role}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: 'auto' }}>
            {dev.skills.map(skill => (
              <span key={skill} style={{
                fontSize: '10px',
                color: '#d1d1d6',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '4px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {skill}
              </span>
            ))}
          </div>

          <p style={{ color: '#48484a', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '20px' }}>Hover to flip</p>
        </div>

        {/* Back Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          backgroundColor: '#1c1c1e',
          borderRadius: '24px',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 20px 40px -10px ${dev.glow}`,
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px' }}>Connect with {dev.name.split(' ')[0]}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '200px' }}>
            <a href={dev.github} target="_blank" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'background 0.3s'
            }}>
              <Github size={20} /> GitHub
            </a>
            <a href={dev.linkedin} target="_blank" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'background 0.3s'
            }}>
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>

          <p style={{ color: '#48484a', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 'auto' }}>Flip back</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function DevelopersPage() {
  return (
    <main style={{ backgroundColor: '#0a0a0b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative' }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>The Dev Team</h1>
          <p style={{ color: '#8e8e93', fontSize: '18px' }}>People behind Sawariya Fashion</p>
          
          {/* Connector Line */}
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1px',
            height: '40px',
            backgroundColor: '#3a3a3c'
          }} />
        </div>

        {/* Developers Grid */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '900px' }}>
          {/* Horizontal Line */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '25%',
            right: '25%',
            height: '1px',
            backgroundColor: '#3a3a3c',
          }} className="hidden-mobile" />
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '60px',
            marginTop: '0'
          }}>
            {developers.map((dev, i) => (
              <div key={dev.name} style={{ position: 'relative', paddingTop: '40px' }}>
                {/* Vertical Connector per Card */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '1px',
                  height: '40px',
                  backgroundColor: '#3a3a3c'
                }} className="hidden-mobile" />
                
                <DevCard dev={dev} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
