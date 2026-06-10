'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, CreditCard, Send } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer style={{ background: 'var(--dark)', color: 'white', padding: 'var(--s12) 0 var(--s6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 64, marginBottom: 80 }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
              RADHANA<span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>Klothing</span>
            </div>
            <p style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 20, opacity: 0.8 }}>
              Ethnic Couture &amp; Lehengas
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.85, marginBottom: 16 }}>
              Founded in Ratlam, MP in 2019, RADHANA Klothing is a celebration of Indian heritage and contemporary elegance. We craft lehengas, ethnic couture, and everyday silhouettes that make every woman feel extraordinary.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
              Stores in Ratlam · Dhar · Manasa
            </p>
            
            {/* Contact Info */}
            <div style={{ marginBottom: 28 }}>
              <a href="mailto:RadhanaKlothing@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 12, transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <Mail size={16} />
                RadhanaKlothing@gmail.com
              </a>
              <a href="tel:+918719922789" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <Phone size={16} />
                +91 8719922789
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 16 }}>
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" style={{ color: 'var(--gold)', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {[
            { title: 'The Collections', links: [{ label: "New Arrivals", href: '/products?newArrival=true' }, { label: "Women", href: '/products?category=women' }, { label: "Men", href: '/products?category=men' }, { label: "Accessories", href: '/products?category=accessories' }] },
            { title: 'Company', links: [{ label: "About Us", href: '/#about-us' }, { label: "Our Story", href: '/about' }, { label: "Sustainability", href: '/sustainability' }, { label: "Developers", href: '/developers' }] },
            { title: 'Client Service', links: [{ label: "Contact Us", href: '/contact' }, { label: "Shipping Policy", href: '/shipping' }, { label: "No Returns Policy", href: '/returns' }, { label: "Size Guide", href: '/sizing' }, { label: "Privacy Policy", href: '/privacy' }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 32 }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 40, marginBottom: 48, textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600, marginBottom: 12, color: 'white' }}>
            Stay in Style
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 12, maxWidth: 400, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.3s' }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              required
            />
            <button
              type="submit"
              style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--gold)', color: 'var(--dark)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 8 }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
              {!subscribed && <Send size={16} />}
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '1px' }}>
            © 2026 RADHANA KLOTHING. ALL RIGHTS RESERVED.
          </p>
          
          {/* Payment Methods */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '1px', marginRight: 8 }}>Secure Payment:</span>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {[{ name: 'Visa', color: '#1A1F71' }, { name: 'Mastercard', color: '#EB001B' }, { name: 'UPI', color: '#6F42C1' }, { name: 'Paytm', color: '#002970' }].map((method, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600 }}>
                  <CreditCard size={14} style={{ color: method.color }} />
                  {method.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '1px', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>INDIA / EN</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .container > div:first-child { grid-template-columns: repeat(2, 1fr) !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          .container > div:first-child { grid-template-columns: 1fr !important; }
          .container > div:nth-child(2) { padding: 24px !important; }
          .container > div:last-child { flex-direction: column !important; align-items: flex-start !important; }
          .container > div:last-child > div:nth-child(2) { flex-wrap: wrap !important; margin: 16px 0 !important; }
        }
      `}</style>
    </footer>
  );
}
