'use client';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      zIndex: 9999, 
      background: 'var(--cream)', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      gap: 32
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 24 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--dark)', letterSpacing: '-0.03em' }}>Sawariya</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 400, color: 'var(--gold)', fontStyle: 'italic', marginLeft: '4px' }}>Fashion</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ 
            fontSize: '1.4rem', 
            color: 'var(--gold)', 
            letterSpacing: '2px', 
            fontWeight: 500,
            marginTop: 8
          }}
        >
          नमस्ते
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ 
          width: '120px', 
          height: '1px', 
          background: 'var(--gold)', 
          transformOrigin: 'left',
          opacity: 0.3
        }} 
      />
    </div>
  );
}
