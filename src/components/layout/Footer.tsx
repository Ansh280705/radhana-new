'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white', padding: 'var(--s12) 0 var(--s6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 64, marginBottom: 80 }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>
              Sawariya<span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>Fashion</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: 32 }}>
              Redefining contemporary style with premium quality clothing crafted for the modern soul.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{ color: 'var(--gold)', transition: 'opacity 0.3s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {[
            { title: 'The Collections', links: [{ label: "New Arrivals", href: '/products?newArrival=true' }, { label: "Women", href: '/products?category=women' }, { label: "Men", href: '/products?category=men' }, { label: "Accessories", href: '/products?category=accessories' }] },
            { title: 'The House', links: [{ label: "About Us", href: '/#about-us' }, { label: "Our Story", href: '/about' }, { label: "Sustainability", href: '/sustainability' }, { label: "Artisanry", href: '/artisanry' }, { label: "Careers", href: '/careers' }] },
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

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '1px' }}>
            © 2026 Sawariya FASHION. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: 'flex', gap: 32 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '1px', cursor: 'pointer' }}>INDIA / EN</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .container > div:first-child { grid-template-columns: repeat(2, 1fr) !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
