import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 1000 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', marginBottom: 16 }}>Contact Us</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>We're here to help! Reach out to us for any queries, feedback, or support.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          <div style={{ background: 'var(--beige)', padding: 40, borderRadius: 20 }}>
            <h2 className="font-serif" style={{ marginBottom: 32 }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ background: 'var(--gold)', padding: 12, borderRadius: '50%', color: 'var(--dark)' }}><Phone size={20} /></div>
                <div>
                  <p style={{ fontWeight: 700 }}>Call Us</p>
                  <p style={{ color: 'var(--text-secondary)' }}>+91 9993309453</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ background: 'var(--gold)', padding: 12, borderRadius: '50%', color: 'var(--dark)' }}><Mail size={20} /></div>
                <div>
                  <p style={{ fontWeight: 700 }}>Email Us</p>
                  <p style={{ color: 'var(--text-secondary)' }}>sanwariafashionofficial@gmail.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ background: 'var(--gold)', padding: 12, borderRadius: '50%', color: 'var(--dark)' }}><MapPin size={20} /></div>
                <div>
                  <p style={{ fontWeight: 700 }}>Visit Us</p>
                  <p style={{ color: 'var(--text-secondary)' }}>Ratlam, Dhar, and Manasa, India</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid var(--border)', padding: 40, borderRadius: 20 }}>
            <h2 className="font-serif" style={{ marginBottom: 32 }}>Send a Message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <input type="text" placeholder="Your Name" className="input-field" style={{ width: '100%', padding: '12px 20px', borderRadius: 8, border: '1px solid var(--border)' }} />
              <input type="email" placeholder="Your Email" className="input-field" style={{ width: '100%', padding: '12px 20px', borderRadius: 8, border: '1px solid var(--border)' }} />
              <textarea placeholder="Your Message" rows={4} className="input-field" style={{ width: '100%', padding: '12px 20px', borderRadius: 8, border: '1px solid var(--border)' }} />
              <button type="submit" className="btn-gold" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
