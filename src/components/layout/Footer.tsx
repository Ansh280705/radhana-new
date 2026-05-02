'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';


export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white', marginTop: 100, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Newsletter */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: 'clamp(40px, 8vw, 80px) 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '40%', height: '200%', background: 'white', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', transform: 'rotate(-20deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h3 className="font-serif" style={{ color: 'var(--dark)', marginBottom: 12, fontWeight: 700 }}>Join the Savaria Club</h3>
          <p style={{ color: 'var(--dark)', opacity: 0.9, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>Be the first to receive exclusive offers, early access to new collections, and fashion insights.</p>
          <form onSubmit={e => e.preventDefault()} className="newsletter-form" style={{ display: 'flex', gap: 12, maxWidth: 540, margin: '0 auto', background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 100, backdropFilter: 'blur(10px)' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '14px 24px', borderRadius: 100, border: 'none', outline: 'none', fontSize: '1rem', background: 'white', color: 'var(--dark)', minWidth: 0 }} />
            <button type="submit" className="btn-dark" style={{ borderRadius: 100, padding: '0 32px', minHeight: 48 }}>Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '80px 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 60 }}>
          {/* Brand */}
          <div className="animate-fadeIn">
            <div className="font-serif" style={{ fontSize: '2rem', marginBottom: 20, fontWeight: 700 }}>
              <span style={{ color: 'white' }}>Savaria</span>
              <span style={{ color: 'var(--gold)', fontStyle: 'italic', marginLeft: 4 }}>Fashion</span>
            </div>
            <p style={{ color: '#a0aec0', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 32 }}>
              Redefining contemporary style with premium quality clothing crafted for the modern soul. Elegance in every stitch.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="social-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#a0aec0', textDecoration: 'none', transition: 'all 0.3s' }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {[
            { title: 'Collections', links: [{ label: "Women", href: '/products?category=women' }, { label: "Men", href: '/products?category=men' }, { label: "Kids", href: '/products?category=kids' }, { label: "Ethnic", href: '/products?category=ethnic-wear' }, { label: "New", href: '/products?newArrival=true' }] },
            { title: 'Support', links: [{ label: "Order Status", href: '/dashboard/orders' }, { label: "Shipping", href: '#' }, { label: "Returns", href: '#' }, { label: "Sizing", href: '#' }, { label: "Contact", href: '#' }] },
            { title: 'Company', links: [{ label: "Our Story", href: '#' }, { label: "Sustainability", href: '#' }, { label: "Stores", href: '#' }, { label: "Careers", href: '#' }, { label: "Media", href: '#' }] },
          ].map(({ title, links }) => (
            <div key={title} className="animate-fadeIn">
              <h4 style={{ fontWeight: 700, marginBottom: 24, color: 'white', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} style={{ color: '#a0aec0', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s' }} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ color: '#718096', fontSize: '0.85rem' }}>© 2026 Savaria Fashion.</p>
            <div className="hidden-mobile" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.5 }} />
            <p className="hidden-mobile" style={{ color: '#718096', fontSize: '0.8rem', fontStyle: 'italic' }}>Handcrafted with ❤️</p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Cookies'].map(t => (
              <a key={t} href="#" style={{ color: '#718096', textDecoration: 'none', fontSize: '0.85rem' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-icon:hover { background: var(--gold) !important; color: var(--dark) !important; transform: translateY(-3px); }
        .footer-link:hover { color: var(--gold) !important; padding-left: 4px; }
        @media (max-width: 640px) {
          .newsletter-form { flex-direction: column; border-radius: 12px !important; background: none !important; backdrop-filter: none !important; padding: 0 !important; }
          .newsletter-form input { border-radius: 8px !important; margin-bottom: 12px; width: 100%; }
          .newsletter-form button { border-radius: 8px !important; width: 100%; }
        }
      `}</style>
    </footer>
  );
}
