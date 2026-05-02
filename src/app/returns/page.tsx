import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AlertTriangle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Returns & Exchanges</h1>
        
        <div style={{ 
          background: 'var(--cream)', 
          padding: '40px', 
          borderRadius: '16px', 
          border: '1px solid var(--border)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24
        }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red)', padding: 16, borderRadius: '50%' }}>
            <AlertTriangle size={40} />
          </div>
          <h2 className="font-serif" style={{ fontSize: '2rem', color: 'var(--dark)' }}>Policy Update</h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-primary)', 
            fontWeight: 600,
            maxWidth: 500,
            lineHeight: 1.6
          }}>
            Please note that we do not give any return or exchange policy.
          </p>
          <div style={{ width: 60, height: 2, background: 'var(--gold)' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            All sales are final. We encourage our customers to check the product details carefully before placing an order.
          </p>
          <a href="/sizing" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'underline', fontSize: '1rem' }}>
            You can refer to our size chart here
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
