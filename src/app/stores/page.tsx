import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function StoresPage() {
  const stores = [
    { city: 'Ratlam', address: 'Main Bazaar, Ratlam, MP', phone: '+91 7412 234567' },
    { city: 'Dhar', address: 'City Center Mall, Dhar, MP', phone: '+91 7292 234567' },
    { city: 'Manasa', address: 'Station Road, Manasa, MP', phone: '+91 7421 234567' },
  ];

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 1000 }}>
        <h1 className="font-serif" style={{ textAlign: 'center', marginBottom: 60 }}>Our Stores</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
          {stores.map(store => (
            <div key={store.city} style={{ background: 'var(--beige)', padding: 40, borderRadius: 20, textAlign: 'center' }}>
              <h2 className="font-serif" style={{ color: 'var(--gold)', marginBottom: 16 }}>{store.city}</h2>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>{store.address}</p>
              <p style={{ color: 'var(--text-secondary)' }}>{store.phone}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
