'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function StoresPage() {
  const stores = [
    { 
      city: 'Ratlam', 
      address: 'Main Bazaar, Ratlam, MP', 
      phone: '+91 9993309453',
      map: 'https://share.google/IfJM3Ie13VfwqhWUe'
    },
    { 
      city: 'Dhar', 
      address: 'City Center Mall, Dhar, MP', 
      phone: '+91 9993309453',
      map: 'https://share.google/C2xAbe7nstMekZ0gz'
    },
    { 
      city: 'Manasa', 
      address: 'Station Road, Manasa, MP', 
      phone: '+91 9131394539',
      map: 'https://share.google/gLAN0sQx1iuYNM8Ko'
    },
  ];

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 1200 }}>
        <h1 className="font-serif" style={{ textAlign: 'center', marginBottom: 20, fontSize: '3.5rem' }}>Our Stores</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 60, fontSize: '1.1rem' }}>Visit us at our physical locations for a personalized shopping experience.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {stores.map(store => (
            <a 
              key={store.city} 
              href={store.map}
              target="_blank"
              rel="noopener noreferrer"
              className="store-card"
              style={{ 
                background: 'var(--beige)', 
                padding: '48px 40px', 
                borderRadius: 24, 
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'block',
                border: '1px solid transparent'
              }}
            >
              <h2 className="font-serif" style={{ color: 'var(--gold)', marginBottom: 20, fontSize: '2.2rem' }}>{store.city}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', letterSpacing: '1px', marginBottom: 12 }}>{store.phone}</p>
              <div style={{ marginTop: 24, color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>
                View on Maps →
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .store-card:hover {
          transform: translateY(-10px);
          background: white;
          border-color: var(--gold);
          box-shadow: 0 30px 60px rgba(201, 168, 76, 0.15);
        }
      `}</style>

      <Footer />
    </main>
  );
}
