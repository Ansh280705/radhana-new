// src/app/loading.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [startShine, setStartShine] = useState(false);

  useEffect(() => {
    // Trigger the metallic shine sweep after the logo fades in (Step 6)
    const timer = setTimeout(() => {
      setStartShine(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        background: '#000000', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Step 2: Golden ambient glow in the center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.4, 0.3] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 50%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle luxury floating gold particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.25, 0],
              y: [-20, -120],
              x: [0, (i % 2 === 0 ? 20 : -20)]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#D4AF37',
              left: `${15 + i * 10}%`,
              top: '60%',
              borderRadius: '50%',
              boxShadow: '0 0 8px #D4AF37'
            }}
          />
        ))}
      </div>

      {/* Main Loader Content Area */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center' 
        }}
      >
        {/* Step 3: SVG Peacock & Woman Path Drawing Animation */}
        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '24px' }}>
          <svg 
            viewBox="0 0 100 100" 
            style={{ 
              width: '100%', 
              height: '100%',
              filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))'
            }}
          >
            {/* Peacock & Woman outline (Artistic custom gold vector) */}
            <motion.path
              d="M 50,15 
                 C 47,15 45,18 45,21 
                 C 45,24 48,26 50,28 
                 C 52,26 55,24 55,21 
                 C 55,18 53,15 50,15 Z
                 M 50,28
                 C 40,32 32,40 32,55
                 C 32,70 42,75 42,85
                 C 47,82 48,80 50,75
                 C 52,80 53,82 58,85
                 C 58,75 68,70 68,55
                 C 68,40 60,32 50,28 Z
                 M 44,52
                 C 44,48 46,46 50,46
                 C 54,46 56,48 56,52
                 C 56,58 50,62 50,68
                 C 50,62 44,58 44,52 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
            />
            {/* Elegant halo circle around the icon */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(212, 175, 55, 0.25)"
              strokeWidth="0.75"
              strokeDasharray="4, 4"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1, delay: 0.5 }
              }}
            />
          </svg>
        </div>

        {/* Step 4 & 7: RADHANA Text & Logo Fade-in from Blur */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            position: 'relative' 
          }}
        >
          {/* Main Logo Text with Shimmer Sweep effect Container */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <h1 
              style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: '3rem', 
                fontWeight: 600, 
                color: '#D4AF37', 
                letterSpacing: '8px', 
                margin: '0 0 8px 8px',
                textTransform: 'uppercase',
                position: 'relative',
              }}
            >
              RADHANA
            </h1>

            {/* Step 6: Luxury Metallic Shine Sweep effect */}
            {startShine && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(230,200,110,0.5) 50%, transparent 100%)',
                  skewX: '-25deg',
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none'
                }}
              />
            )}
          </div>

          {/* Step 5: Tagline Fade-in with Letter Spacing */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '4px' }}
            animate={{ opacity: 0.8, letterSpacing: '8px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 600,
              color: '#F8F6F2',
              textTransform: 'uppercase',
              margin: 0,
              paddingLeft: '8px', // offset for letter spacing centering
              opacity: 0.8
            }}
          >
            ETHNIC COUTURE & LEHENGAS
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
